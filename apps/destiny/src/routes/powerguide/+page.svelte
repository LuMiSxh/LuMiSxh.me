<script lang='ts'>
	import { page } from '$app/stores';
</script>

<main class='h-full w-full p-5 flex flex-col justify-center items-center text-center'>
	<!-- Page -->
	<div class='grid grid-cols-1'>
		<code>UniqueName: {$page.data.uniqueName}</code>
		<code>Auth-Token: {$page.data.authToken}</code>
		<code>Membership-ID: {$page.data.membershipId}</code>
	</div>
</main>
