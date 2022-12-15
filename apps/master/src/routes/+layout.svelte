<script>
	import 'shared/theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { AppRail, AppRailTile, AppShell } from '@skeletonlabs/skeleton';
	import { appRailValue } from '@lib/stores';

	function checkNumber() {
		let name = String($page.url).split('/');
		name = name[name.length - 1];

		if (name === "") {
			return 1;
		}
		if (name === "about") {
			return 2;
		}
		if (name === "skills") {
			return 3;
		}
		if (name === "projects") {
			return 4;
		}

	}

	appRailValue.set(checkNumber());

	let val = 0;
	appRailValue.subscribe(v => val = v);

</script>

<AppShell>
	<svelte:fragment slot='sidebarLeft'>
		<AppRail selected={appRailValue}>
			<svelte:fragment slot='lead'>
				<AppRailTile tag='button'>
					<Icon icon="mdi:anonymous-circle" width="60" />
				</AppRailTile>
			</svelte:fragment>
			<!--AppRail Tiles -->
			<AppRailTile tag='a' href='/' label="Home" title="Home" value={1}>
				{#if val === 1}
					<Icon icon="mdi:package-variant" width="35" />
				{:else}
					<Icon icon="mdi:package-variant-closed" width="35" />
				{/if}
			</AppRailTile>
			<AppRailTile tag='a' href='/about' label="About" title="About" value={2}>
				{#if val === 2}
					<Icon icon="mdi:package-variant" width="35" />
				{:else}
					<Icon icon="mdi:package-variant-closed" width="35" />
				{/if}
			</AppRailTile>
			<AppRailTile tag='a' href='/skills' label="Skills" title="Skills" value={3}>
				{#if val === 3}
					<Icon icon="mdi:package-variant" width="35" />
				{:else}
					<Icon icon="mdi:package-variant-closed" width="35" />
				{/if}
			</AppRailTile>
			<AppRailTile tag='a' href='/projects' label="Projects" title="Projects" value={4}>
				{#if val === 4}
					<Icon icon="mdi:package-variant" width="35" />
				{:else}
					<Icon icon="mdi:package-variant-closed" width="35" />
				{/if}
			</AppRailTile>
			<svelte:fragment slot='trail'>
				<AppRailTile tag='a' href='https://github.com/LuMiSxh'>
					<Icon icon="mdi:github" width="45" />
				</AppRailTile>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>
	<!-- Router -->
	<slot />
	<!--/ -->
	<svelte:fragment slot='pageFooter'>Page Footer</svelte:fragment>
</AppShell>
