<script>
	import 'shared/theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { AppRail, AppRailTile, AppShell, LightSwitch } from '@skeletonlabs/skeleton';
	import { appRailValue } from '@lib/stores';

	function checkNumber() {
		let name = String($page.url).split('/');
		name = name[name.length - 1];

		if (name === "") {
			return 1;
		}
		if (name === "emulator") {
			return 2;
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
			<AppRailTile tag='a' href='/emulator' label="Emulator" title="Emulator" value={2}>
				{#if val === 2}
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
	<svelte:fragment slot='pageFooter'>
		<div class='flex flex-row justify-around items-center bg-surface-50 dark:bg-surface-800 p-4'>
			<LightSwitch />
			<h4>Designed by <span class='text-primary-400'>LuMiSxh</span></h4>
		</div>
	</svelte:fragment>
</AppShell>
