import type { RequestHandler } from '@sveltejs/kit';
import { SECRET_CLIENT_ID, SECRET_API_KEY, SECRET_CLIENT_SECRET } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';
import type IAccessSession from '@interfaces/IAccessSession';

function addSeconds(date: Date, seconds: number): Date {
	date.setTime(date.getTime() + seconds * 1000);
	return date;
}

export const GET = (async ({ url, cookies, fetch }) => {
	const auth_code = url.searchParams.get('code');
	const auth_token = btoa(`${SECRET_CLIENT_ID}:${SECRET_CLIENT_SECRET}`);

	if (!auth_code) {
		throw error(500, "The callback url is missing the 'code' query parameter.");
	}

	// Access Token
	const access_request = await fetch('https://www.bungie.net/platform/app/oauth/token/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${auth_token}`,
			'X-API-Key': SECRET_API_KEY
		},
		body: `grant_type=authorization_code&code=${auth_code}`
	});

	if (access_request.status !== 200) {
		throw error(
			500,
			`An error has occurred during the fetching of the bungie access token: '${access_request.statusText}'`
		);
	}

	const access_data = await access_request.json();

	const data: IAccessSession = {
		access: {
			token: access_data.access_token,
			expires_at: addSeconds(new Date(), access_data.expires_in)
		},
		refresh: {
			token: access_data.refresh_token,
			expires_at: addSeconds(new Date(), access_data.refresh_expires_in)
		}
	};

	cookies.set('AccessSession', JSON.stringify(data), {
		path: '/',
		httpOnly: true,
		maxAge: access_data.refresh_expires_in
	});

	throw redirect(303, '/');
}) satisfies RequestHandler;
