import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import * as path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [basicSsl(), sveltekit(), SvelteKitPWA()],
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
