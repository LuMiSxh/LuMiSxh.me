<script>
	import { page } from '$app/stores';
</script>

<main class="h-full w-full p-5 flex flex-col justify-center items-center text-center">
	<aside class="alert alert-error">
		<!-- Message -->
		<div class="alert-message">
			<h3>{$page.status}</h3>
			<p>{$page.error.message}</p>
		</div>
	</aside>
</main>
