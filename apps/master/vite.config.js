import { sveltekit } from '@sveltejs/kit/vite';
import * as path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@lib': path.resolve('./src/lib'),
			'@components': path.resolve('./src/components'),
			'@assets': path.resolve('./src/assets')
		}
	}
};

export default config;
