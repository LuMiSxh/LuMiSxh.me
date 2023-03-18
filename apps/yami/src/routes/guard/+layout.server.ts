import type { LayoutServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { SECRET_PATH } from '$env/static/private';

export const load = (async ({ cookies, fetch }) => {
	const access_session = cookies.get('AccessSession');
	if (!access_session) {
		throw redirect(303, '${SECRET_PATH}/api/auth/bungie-login');
	}

	const access_request = await fetch(`${SECRET_PATH}/api/auth/token-renewal`);
	if (access_request.status !== 200) {
		throw error(500, access_request.statusText);
	}

	const character_request = await fetch(`${SECRET_PATH}/api/obtain/characters`);
	if (character_request.status !== 200) {
		throw error(500, character_request.statusText);
	}

	return {
		access: { ...(await access_request.json()) },
		character: { ...(await character_request.json()) }
	};
}) satisfies LayoutServerLoad;
