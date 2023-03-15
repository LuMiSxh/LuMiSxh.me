import type { PageServerLoad } from './$types';
import type IAccessSession from '@interfaces/IAccessSession';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ cookies }) => {
	const access_session = cookies.get('AccessSession');

	if (!access_session) {
		throw redirect(303, 'api/auth/login');
	}

	return JSON.parse(access_session) as IAccessSession;
}) satisfies PageServerLoad;
