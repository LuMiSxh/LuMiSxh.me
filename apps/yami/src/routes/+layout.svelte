<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { navigating } from '$app/stores';
</script>

{#if $navigating}
	Loading...
	<slot />
{:else}
	<slot />
{/if}
