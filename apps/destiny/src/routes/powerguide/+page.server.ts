import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { SECRET_CLIENT_ID, SECTRET_API_KEY } from '$env/static/private';

export const load = (async ({ url, fetch }) => {
	if (!url.searchParams.get('code')) {
		throw redirect(
			303,
			`https://www.bungie.net/en/OAuth/Authorize?client_id=${SECRET_CLIENT_ID}&response_type=code`
		);
	}
	const response = await fetch('https://www.bungie.net/Platform/App/OAuth/Token/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'X-API-Key': SECTRET_API_KEY
			},
			body: `client_id=${SECRET_CLIENT_ID}&grant_type=authorization_code&code=${url.searchParams.get(
				'code'
			)}`
		}),
		data = await response.json();

	if (response.status !== 200) {
		throw error(response.status, response.statusText);
	}

	const auth_token = data.access_token;

	const response2 = await fetch('https://www.bungie.net/Platform/User/GetCurrentBungieAccount/', {
			method: 'GET',
			headers: {
				'X-API-Key': SECTRET_API_KEY,
				Authorization: 'Bearer ' + auth_token
			}
		}),
		player = await response2.json();

	console.log(player.Response);

	if (player.ErrorStatus !== 'Success') {
		throw error(500, player.Message);
	}

	return {
		authToken: auth_token,
		uniqueName: player.Response.bungieNetUser.uniqueName,
		membershipId: player.Response.bungieNetUser.membershipId
	};
}) satisfies PageServerLoad;
