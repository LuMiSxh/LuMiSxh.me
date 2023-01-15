<script lang='ts'>
	import type { PageData } from './$types';
	import type IGithubRepo from '@lib/types/IGithubRepo';
	import Icon from '@iconify/svelte';
	import { Divider } from '@skeletonlabs/skeleton';

	import "shared/codelang.pcss";

	export let data: PageData;

	const repositories: IGithubRepo[] = data.repositories;

	// PostCSS Generation
</script>

<main class='h-full w-full p-5 flex flex-col justify-center items-center text-center'>
	<h1 class='m-2.5'>Projects</h1>
	<div class='w-full h-full grid md:grid-cols-3 grid-cols-2'>
		{#each repositories as repo}
		<div class='card p-4 m-2 max-h-1/12'>
			<header class='card-header'>
				<h2 class='flex flex-row'>
						<span class='text-tertiary-500'>
							{repo.Name}
						</span>
					{#if repo.Private}
						<Icon icon='material-symbols:lock' class='ml-2' />
					{/if}
				</h2>
			</header>
			<div class='p-4'>
				<h4>Description</h4>
				{#if repo.Description}
					{repo.Description}
				{:else}
					No description available
				{/if}
			</div>
			<Divider />
			<footer class='card-footer'>
				<h4>Languages</h4>
				<div class='flex flex-row flex-wrap justify-center items-center text-center'>
					{#if repo.Languages.length !== 0}
						{#each repo.Languages as lang}
							<span
								class='badge codelang-{lang.replace(" ", " ").replace("+", "_").replace("\'", "").replace("(", "").replace(")", "")} m-2'>{lang}</span>
						{/each}
					{:else}
						<span class='badge badge-filled-error m-2'>No languages detected</span>
					{/if}
				</div>
			</footer>
		</div>
		{/each}
	</div>
</main>
