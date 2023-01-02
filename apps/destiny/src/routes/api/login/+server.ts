import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { SECRET_CLIENT_ID } from '$env/static/private';
import { fetchBungie, fetchParams } from '@lib/apiHelper';

export const GET = (async ({ url, cookies, fetch }) => {
	const authCode = url.searchParams.get('code');

	if (!authCode) {
		throw error(500, 'The url search parameter \'code\' is required but missing');
	}

	// Fetch the token
	const response = await fetchBungie(
		fetch,
		'https://www.bungie.net/Platform/App/OAuth/Token/',
		fetchParams({
			method: "POST",
			contentType: 'application/x-www-form-urlencoded',
			body: `client_id=${SECRET_CLIENT_ID}&grant_type=authorization_code&code=${authCode}`
		})
	);

	if (response.ResponseStatus !== 200) {
		throw error(500, 'An error has occurred during the fetching of the authorization code');
	}

	cookies.set('oAuth', JSON.stringify(response.data), {
		path: '/',
		httpOnly: true,
		maxAge: response.data.expires_in
	});

	throw redirect(303, '/');
}) satisfies RequestHandler;