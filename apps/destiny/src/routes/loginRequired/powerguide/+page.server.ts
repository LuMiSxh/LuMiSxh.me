import type { PageServerLoad } from './$types';
import { fetchBungie, fetchParams } from '@lib/apiHelper';

export const load = (async ({ parent, fetch, locals }) => {
	// Check auth state
	await parent();

	/*
	const responseMembershipInfo = await fetch(`https://www.bungie.net/Platform/User/GetMembershipsById/${locals.user.membershipId}/-1`,
		fetchParams({})
	), membershipInfo = await responseMembershipInfo.json();

	 */

	const membershipInfo = await fetchBungie(
		fetch,
		`https://www.bungie.net/Platform/User/GetMembershipsById/${locals.user.membershipId}/-1`,
		fetchParams({})
	);

	const membershipType = membershipInfo.data.Response.destinyMemberships[0].membershipType;
	const membershipId = membershipInfo.data.Response.destinyMemberships[0].membershipId;

	/*

	const profileInfo = await getProfile(createHttpClient(fetch),
		{
			components: [DestinyComponentType.Profiles, DestinyComponentType.Characters],
			destinyMembershipId: String(membershipInfo.Response.bungieNetUser.membershipId),
			membershipType: membershipInfo.Response.bungieNetUser.
		});

	console.log(profileInfo);

	*/
}) satisfies PageServerLoad;
