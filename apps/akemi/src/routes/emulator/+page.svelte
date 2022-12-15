<script lang="ts">
	import { filedrop } from "filedrop-svelte";
	import type { Files, FileDropOptions } from "filedrop-svelte";
	import { browser } from "$app/environment";
	import * as chip8 from "tomo";
	import { onMount } from "svelte";
	import { getKeyNumber } from '@lib/keyHandler';
	import { Divider, SlideToggle } from '@skeletonlabs/skeleton';

	// CUP
	let emu: chip8.Processor;
	let running = false;
	if (browser) {
		emu = new chip8.Processor();
	}
	// Display
	let innerWidth: number;
	let scale = 30;
	$: scale = Math.abs(Math.ceil(innerWidth / 70));
	if (scale % 2 !== 0) {
		scale += 1;
	}
	let canv: HTMLCanvasElement;
	let colorOn = "white";
	let colorOff = "black";
	function cls() {
		const ctx = canv.getContext("2d");
		ctx.beginPath();
		ctx.rect(0, 0, 64 * scale, 32 * scale);
		ctx.fillStyle = colorOff;
		ctx.fill();
	}
	onMount(() => {
		setTimeout(() => {
			cls();
		}, 100);
	});
	// Audio and Misc
	let audio;
	let options: FileDropOptions = { fileLimit: 1, disabled: running };
	$: options.disabled = running;
	// Handle loading a rom
	async function loadData(e) {
		let files: Files = e.detail.files;
		const file: File = files.accepted[0];
		const text = await file.arrayBuffer();
		const bytes = new Uint8Array(text);
		let length = emu.load(bytes);
		alert("ROM was loaded successfully. \nDEBUG: Loaded data has a length of " + length + " bytes");
	}
	// Handle starting and stopping the emulator
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function startStop() {
		if (running) {
			running = false;
			if (emu) {
				emu.reset();
				cls();
			}
		} else {
			running = true;
		}
	}
	// Main game loop
	$: if (running) {
		gameLoop();
	}
	function gameLoop() {
		if (!running) return;
		let output = emu.tick();
		if (!output.success) {
			running = false;
			alert(
				"Something went wrong processing the latest opcode. \nDEBUG: The faulty opcode is '" +
				output.opcode.toString(16) +
				"'"
			);
		}
		if (emu.should_beep()) {
			audio.play();
		}
		const ctx = canv.getContext("2d");
		for (let y = 0; y < 32; y++) {
			for (let x = 0; x < 64; x++) {
				ctx.beginPath();
				ctx.rect(x * scale, y * scale, x + scale, y + scale);
				if (emu.display.get_pixel(y, x)) {
					ctx.fillStyle = colorOn;
				} else {
					ctx.fillStyle = colorOff;
				}
				ctx.fill();
			}
		}
		if (running) window.requestAnimationFrame(gameLoop);
	}
	function handleKeyEventDown(e) {
		const num = getKeyNumber(e);
		if (num === 27) {
			startStop()
		} else {
			emu.key_press(num);
		}
	}

	function handleKeyEventUp(e) {
		const num = getKeyNumber(e);
		emu.key_up(num);
	}
</script>

<svelte:window bind:innerWidth on:keydown={handleKeyEventDown} on:keyup={handleKeyEventUp} />


<main class="h-full w-full p-5 flex flex-col items-center content-center justify-center text-center">
	<audio src="https://www.soundjay.com/buttons/beep-02.mp3" bind:this={audio}></audio>
	<div class="flex flex-col items-center content-center justify-center text-center mb-3">
		<canvas bind:this={canv} width={64 * scale} height={32 * scale}></canvas>
	</div>
	<Divider />
	<div class="flex flex-col items-center content-center justify-center text-center min-h-6rem mt-3">
		<h1 class="mb-2">Settings</h1>
		<div class="grid grid-cols-2 justify-around">
			<div use:filedrop={options} on:filedrop={loadData}
				 class="flex flex-col items-center m-2 content-center justify-center text-center w-3/4 border-dashed border-2 border-accent-500 rounded-[8px]"
				 class:border-surface-800={running} class:cursor-no-drop={running}
			>
				Upload a ROM to play
			</div>
				<label for="colorON" class='m-2'>
					{running ? 'Resetting' : 'Starting'} the emulator (Or press `Escape` for the same action)
					<SlideToggle bind:checked={running} />
				</label>
				<label for="colorON" class="m-2">
					Set a color for active pixels
					<input bind:value={colorOn} id="colorON" on:keydown disabled="{running}"
					class='bg-surface-200 border-[2px] dark:border-none border-surface-600 dark:bg-surface-800 p-1 rounded-[8px] focus:outline-none focus:outline-accent-500'/>
				</label>
				<label for="colorOFF" class="m-2">
					Set a color for inactive pixels
					<input bind:value={colorOff} id="colorOFF" on:keydown disabled="{running}"
							 class='bg-surface-200 border-[2px] dark:border-none border-surface-600 dark:bg-surface-800 p-1 rounded-[8px] focus:outline-none focus:outline-accent-500'/>
				</label>
		</div>
	</div>
</main>
