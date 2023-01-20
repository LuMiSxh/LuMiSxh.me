<script>
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
</script>

<main class='h-full w-full p-5 flex flex-col justify-center items-center text-center'>
	<aside class="alert">
		<!-- Icon -->
		<div><Icon icon="material-symbols:error" width="60" /></div>
		<!-- Message -->
		<div class="alert-message">
			<h3>{$page.status}</h3>
			<p>{$page.error.message}</p>
		</div>
	</aside>
</main>