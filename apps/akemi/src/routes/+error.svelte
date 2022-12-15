<script>
	import { page } from '$app/stores';
	import { Alert } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
</script>

<main class='h-full w-full p-5'>
	<Alert visible={true}>
		<svelte:fragment slot="lead"><Icon icon="material-symbols:error" width="60" /></svelte:fragment>
		<svelte:fragment slot="title">{$page.status}</svelte:fragment>
		<span>{$page.error.message}</span>
	</Alert>
</main>