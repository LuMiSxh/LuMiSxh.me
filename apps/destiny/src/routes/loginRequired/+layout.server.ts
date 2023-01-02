import { SECRET_CLIENT_ID } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (({ locals }) => {
	if (!locals.user) {
		throw redirect(
			303,
			`https://www.bungie.net/en/OAuth/Authorize?client_id=${SECRET_CLIENT_ID}&response_type=code`
		);
	}
}) satisfies LayoutServerLoad;
