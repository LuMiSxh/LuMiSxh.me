<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import type IAccessSession from '@interfaces/IAccessSession';
	import { error } from '@sveltejs/kit';

	export let data: PageData;

	let timer;

	let expires_in: number = Math.abs(
		(new Date(data.access.expires_at).getTime() - new Date().getTime()) / 1000
	);
	$: if (expires_in < 0) {
		console.log('Expired');
	}

	onMount(async () => {
		setTimeout(refresh, expires_in);
		timer = setInterval(() => {
			expires_in -= 1;
		}, 1000);
	});

	async function refresh() {
		const response = await fetch('api/auth/renew');
		if (response.status !== 200) {
			throw error(500, response.statusText);
		}
		const response_data = (await response.json()) as IAccessSession;
		expires_in = Math.abs(
			(new Date(data.access.expires_at).getTime() - new Date().getTime()) / 1000
		)
	}
</script>

<pre>{JSON.stringify(data)}</pre>
<h1>Expires in: {Math.floor(expires_in / 60)} Minutes and {Math.floor(expires_in % 60)} Seconds</h1>
<button on:click={refresh}>Refresh</button>
