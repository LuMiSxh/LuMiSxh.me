<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="p-4">
	<h2>AccessSession</h2>
	<pre>{JSON.stringify(data.access)}</pre>
</div>

<div class="p-4">
	<h2>CharacterSession</h2>
	<pre>{JSON.stringify(data.character)}</pre>
</div>

<div class="p-4">
	<h2>LevelingData</h2>
	<pre>{JSON.stringify(data.level)}</pre>
</div>
