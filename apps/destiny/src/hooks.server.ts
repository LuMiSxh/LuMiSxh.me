import { SECRET_CLIENT_ID } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	// Exclude API routes
	if (event.url.pathname.startsWith('/api')) {
		return resolve(event);
	}

	const oAuth = event.cookies.get('oAuth');

	if (oAuth && !event.locals.user) {
		const parsed = JSON.parse(oAuth);
		event.locals.user = {
			oAuth: {
				accessToken: parsed.access_token,
				accessExpiresIn: parsed.expires_in
			},
			membershipId: parsed.membership_id
		};
	}

	if (event.url.pathname.startsWith('/loginRequired') && !oAuth) {
		throw redirect(
			303,
			`https://www.bungie.net/en/OAuth/Authorize?client_id=${SECRET_CLIENT_ID}&response_type=code`
		);
	}

	return resolve(event);
}) satisfies Handle;
