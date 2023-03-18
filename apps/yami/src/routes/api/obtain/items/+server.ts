import type { RequestHandler } from '@sveltejs/kit';
import { SECRET_API_KEY, SECRET_PATH } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import type IAccessSession from '@interfaces/IAccessSession';
import type IItem from '@interfaces/IItem';
import type IManifestCookie from '@interfaces/IManifestCookie';

function determine_item_type(hash: number): string {
	switch (hash) {
		case 1498876634:
			return 'kinetic';
		case 2465295065:
			return 'energy';
		case 953998645:
			return 'power';
		case 3448274439:
			return 'helmet';
		case 3551918588:
			return 'gauntlet';
		case 14239492:
			return 'chest';
		case 20886954:
			return 'leg';
		case 1585787867:
			return 'class';
	}
}

export const GET = (async ({ cookies, fetch }) => {
	const access_cookie = cookies.get('AccessSession');
	const raw_items: Array<string> = [];
	const item_data: Record<string, IItem[]> = {
		'kinetic': [],
		'energy': [],
		'power': [],
		'warlock:helmet': [],
		'warlock:gauntlet': [],
		'warlock:chest': [],
		'warlock:leg': [],
		'warlock:class': [],
		'hunter:helmet': [],
		'hunter:gauntlet': [],
		'hunter:chest': [],
		'hunter:leg': [],
		'hunter:class': [],
		'titan:helmet': [],
		'titan:gauntlet': [],
		'titan:chest': [],
		'titan:leg': [],
		'titan:class': []
	};
	//                        Consumables   Ghosts     Vehicles     Ships	       ?         Emotes     Subclass
	const forbidden_hashes = [1469714392, 4023194814, 2025709351, 284967655, 2401704334, 1107761855, 3284755031];

	if (!access_cookie) {
		throw error(500, 'No access session cookie exists');
	}
	const access_data = JSON.parse(access_cookie) as IAccessSession;
	let manifest_data: IManifestCookie;

	const manifest_request = await fetch(`${SECRET_PATH}/api/obtain/characters`)
	if (manifest_request.status !== 200) {
		throw error(500, manifest_request.statusText)
	}
	manifest_data = await manifest_request.json();

	// Retrieving all items
	const items_request = await fetch(`https://bungie.net/Platform/Destiny2/${access_data.d2.type}/Profile/${access_data.d2.id}/?components=201,102,205`, {
		headers: {
			Authorization: `Bearer ${access_data.access.token}`,
			'X-API-Key': SECRET_API_KEY
		}
	});
	if (items_request.status !== 200) {
		throw error(500, `An error occurred during the fetching of items`);
	}

	const items_data = await items_request.json();

	// Equipped items
	for (const [_, obj] of Object.entries<{ items: { itemInstanceId: string | undefined, bucketHash: number }[] }>(items_data.Response.characterEquipment.data)) {
		for (const item of obj.items) {
			if (!forbidden_hashes.includes(item.bucketHash)) {
				if (item.itemInstanceId) {
					raw_items.push(item.itemInstanceId);
				}
			}
		}
	}
	// Stored items
	for (const [_, obj] of Object.entries<{ items: { itemInstanceId: string | undefined, bucketHash: number }[] }>(items_data.Response.characterInventories.data)) {
		for (const item of obj.items) {
			if (!forbidden_hashes.includes(item.bucketHash)) {
				if (item.itemInstanceId) {
					raw_items.push(item.itemInstanceId);
				}
			}
		}
	}

	// Vault items
	for (const ritem of items_data.Response.profileInventory.data.items) {
		const item = ritem as { itemInstanceId: string | undefined, bucketHash: number };
		if (!forbidden_hashes.includes(item.bucketHash)) {
			if (item.itemInstanceId) {
				raw_items.push(item.itemInstanceId);
			}
		}
	}


	for (const item_id of raw_items) {
		const item_request = await fetch(`https://bungie.net/Platform/Destiny2/${access_data.d2.type}/Profile/${access_data.d2.id}/Item/${item_id}/?components=300,307`, {
			headers: {
				Authorization: `Bearer ${access_data.access.token}`,
				'X-API-Key': SECRET_API_KEY
			}
		});
		if (item_request.status !== 200) {
			throw error(500, `There was an error getting item '${item_id}' details: '${item_request.statusText}'`);
		}
		const item_response = await item_request.json();

		const item_type = determine_item_type(item_response.Response.item.data.bucketHash);
	}

	console.log(item_data);

	return json('');
}) satisfies RequestHandler;
