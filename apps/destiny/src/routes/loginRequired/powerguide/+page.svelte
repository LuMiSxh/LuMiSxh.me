<script lang='ts'>

	import { Alert } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
</script>

<main class='h-full w-full p-5 flex flex-col justify-center items-center text-center'>
	<Alert visible='{true}' background='bg-primary-500/20' border='border-primary-700'>
		<svelte:fragment slot="lead"><Icon icon="wpf:maintenance" width="45" /></svelte:fragment>
		<svelte:fragment slot="title">WARNING: Maintenance</svelte:fragment>
		<span>Logged in!</span>
	</Alert>
</main>
