<script>
	import 'shared/theme-red.pcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { page } from '$app/stores';
	import { AppBar, AppShell, LightSwitch, menu } from '@skeletonlabs/skeleton';

	$: routes = [
		{
			'Name': 'Home',
			'Route': '/',
			'Active': $page.url.pathname === '/'
		},
		{
			'Name': 'About',
			'Route': '/about',
			'Active': $page.url.pathname === '/about'
		},
		{
			'Name': 'Skills',
			'Route': '/skills',
			'Active': $page.url.pathname === '/skills'
		},
		{
			'Name': 'Projects',
			'Route': '/projects',
			'Active': $page.url.pathname === '/projects'
		}
	];

</script>

<AppShell>
	<svelte:fragment slot='header'>
		<AppBar class='hidden md:flex'>
			<svelte:fragment slot='lead'>
				<h1>LuMiSxh</h1>
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
	<!--/ -->
	<!--Footer -->
	<div class='w-full h-32 grid grid-cols-2 grid-rows-1 justify-around shadow-2xl shadow-surface-800 z-50 p-2'>
		<div class='flex flex-col justify-center items-center text-center'>
			<h4>Designed by <span class='text-secondary-500'>LuMiSxh</span></h4>
			<LightSwitch class='m-3'/>
		</div>
		<div class='flex flex-col justify-center items-center text-center'>
			<h4>Social Media</h4>
			<nav class="list-nav">
				<ul class='list'>
					<li>
						<a href='https://www.bungie.net/7/de/User/Profile/2/4611686018492790408' rel='noreferrer' target='_blank'>Bungie</a>
						<a href='https://github.com/LuMiSxh' rel='noreferrer' target='_blank'>Github</a>
						<a href='https://twitter.com/LuMiSchm' rel='noreferrer' target='_blank'>Twitter</a>
						<a href='https://www.youtube.com/channel/UC4KPG6VHot-IgK7AsFxQM3g' rel='noreferrer' target='_blank'>YouTube</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
	<!--/ -->
</AppShell>
