<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte'
	const {
		needRefresh,
		updateServiceWorker,
		offlineReady
	} = useRegisterSW({
		onRegistered(r) {
			// uncomment following code if you want check for updates
			// r && setInterval(() => {
			//    console.log('Checking for sw update')
			//    r.update()
			// }, 20000 /* 20s for testing purposes */)
			console.log(`SW Registered: ${r}`)
		},
		onRegisterError(error) {
			console.log('SW registration error', error)
		},
	})
	const close = () => {
		offlineReady.set(false)
		needRefresh.set(false)
	}
	$: toast = $offlineReady || $needRefresh
</script>

{#if toast}
	<div class="fixed right-0 bottom-0 margin-[16px] padding-4 border-surface-800 border-2 rounded-lg z-50 shadow-xl shadow-surface-800 bg-surface-500 text-left" role="alert">
		<div class="m-b-[8px]">
			{#if $offlineReady}
				<span>
					App ready to work offline
				</span>
			{:else}
				<span>
					New content available, click on reload button to update.
				</span>
			{/if}
		</div>
		{#if $needRefresh}
			<button class='btn btn-secondary' on:click={() => updateServiceWorker(true)}>
				Reload
			</button>
		{/if}
		<button class='btn btn-ghost-tertiary' on:click={close}>
			Close
		</button>
	</div>
{/if}

