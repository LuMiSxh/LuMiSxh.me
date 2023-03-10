import { sveltekit } from '@sveltejs/kit/vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import * as path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), wasm(), topLevelAwait()],
	resolve: {
		alias: {
			'@lib': path.resolve('./src/lib'),
			'@sass': path.resolve('./src/sass'),
			'@components': path.resolve('./src/components'),
			'@assets': path.resolve('./src/assets')
		}
	}
};

export default config;
