<script>
	import 'shared/theme-yellow.pcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { page } from '$app/stores';
	import { AppBar, AppShell, menu, Toast } from '@skeletonlabs/skeleton';

	$: routes = [
		{
			'Name': 'Home',
			'Route': '/',
			'Active': $page.url.pathname === '/'
		},
		{
			'Name': 'PowerGuide',
			'Route': '/loginRequired/powerguide',
			'Active': $page.url.pathname === '/loginRequired/powerguide'
		},
	];

	// PWA
	import { onMount } from 'svelte'
	import { pwaInfo } from 'virtual:pwa-info'

	let ReloadPrompt
	onMount(async () => {
		pwaInfo && (ReloadPrompt = (await import('$lib/ReloadPrompt.svelte')).default)
	})

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''

</script>

<!-- PWA -->
<svelte:head>
	{@html webManifest}
</svelte:head>
<!-- PWA -->

<AppShell>
	<svelte:fragment slot='header'>
		<AppBar class='hidden md:flex'>
			<svelte:fragment slot='lead'>
				<h1>LuMiSxh - <span class='gradient-heading'>Destiny</span></h1>
			</svelte:fragment>
			<svelte:fragment slot='trail'>
				{#each routes as route}
					<a href={route.Route} class='btn btn-base' class:btn-ghost-surface={!route.Active}
						 class:ring-2={route.Active} class:ring-surface-500={route.Active} class:ring-inset={route.Active}
						 class:btn-ghost-tertiary={route.Active} disabled={route.Active}>{route.Name}</a>
				{/each}
			</svelte:fragment>
		</AppBar>
		<AppBar class='md:hidden'>
			<svelte:fragment slot='lead'>
				<h1>LuMiSxh</h1>
			</svelte:fragment>
			<svelte:fragment slot='trail'>
				<div class='relative'>
					<button use:menu={{ menu: 'navigation' }}
									class='btn btn-ghost-surface'>Navigation
					</button>
					<nav class='list-nav card p-4 shadow-xl' data-menu='navigation'>
						<ul>
							{#each routes as route}
								<li>
									<a href={route.Route} class='btn btn-base' class:btn-ghost-surface={!route.Active}
										 class:ring-2={route.Active} class:ring-surface-500={route.Active} class:ring-inset={route.Active}
										 class:btn-ghost-tertiary={route.Active} disabled={route.Active}>
										{route.Name}
									</a>
								</li>
							{/each}

						</ul>
					</nav>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Router -->
	<slot />
	<Toast/>
	<!--/ -->
</AppShell>

<style lang="postcss">
    .gradient-heading {
        @apply bg-gradient-to-br from-secondary-500 to-tertiary-500 bg-clip-text text-transparent box-decoration-clone;
    }
</style>