import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { SECRET_API_KEY, SECRET_PATH } from '$env/static/private';
import type IAccessSession from '@interfaces/IAccessSession';
import type IItemManifestCookie from '@interfaces/IItemManifestCookie';
import type IItem from '@interfaces/IItem';
import type ILevelData from '@interfaces/ILevelData';

// sorting function
function power_sorter(a: [string, number], b: [string, number]): number {
	if (a[1] > b[1]) {
		return -1;
	} else if (a[1] < b[1]) {
		return 1;
	}
	return 0;
}

export const GET = (async ({ cookies, fetch, setHeaders }) => {
	// Setting cache control
	setHeaders({
		'Cache-Control': 'public, max-age=180 ' // 3 minutes
	});
	// Getting the access session
	const access_cookie = cookies.get('AccessSession');
	if (!access_cookie) {
		throw error(500, 'No access session cookie was found');
	}
	const access_data = JSON.parse(access_cookie) as IAccessSession;

	// Getting the manifest
	const manifest_request = await fetch(`${SECRET_PATH}/api/obtain/manifest`);
	if (manifest_request.status !== 200) {
		throw error(500, manifest_request.statusText);
	}
	const manifest_data = (await manifest_request.json()) as IItemManifestCookie;

	// Fetch all item instances
	const item_instances_request = await fetch(
		`https://bungie.net/Platform/Destiny2/${access_data.d2.type}/Profile/${access_data.d2.id}/?components=102,201,205,300`,
		{
			headers: {
				Authorization: `Bearer ${access_data.access.token}`,
				'X-API-Key': SECRET_API_KEY
			}
		}
	);
	if (item_instances_request.status !== 200) {
		throw error(
			500,
			`There was an error fetching items from your Destiny 2 profile: '${item_instances_request.statusText}'`
		);
	}
	const item_instances_data = (await item_instances_request.json()).Response.itemComponents
		.instances.data;

	const weapon_instances: [string, number][] = [];
	const armor_instances: [string, number][] = [];

	// Looping over instances
	for (const [instance_id, instance] of Object.entries<{
		primaryStat: { statHash: number; value: number };
	}>(item_instances_data)) {
		if (!instance.primaryStat || instance.primaryStat.value < 1600) {
			continue;
		}

		// Add to armor or weapon depending on hash
		switch (instance.primaryStat.statHash) {
			case 3897883278:
				armor_instances.push([instance_id, instance.primaryStat.value]);
				break;
			case 1480404414:
				weapon_instances.push([instance_id, instance.primaryStat.value]);
				break;
		}
	}
	// Sort them and take only slices | put them together
	const raw_instances: [string, number][] = [];
	raw_instances.push(...weapon_instances.sort(power_sorter).slice(0, 30));
	raw_instances.push(...armor_instances.sort(power_sorter).slice(0, 50));

	// Setting up data collections
	const warlock_armor: Record<string, IItem[]> = {
		helmet: [],
		gauntlet: [],
		chest: [],
		leg: [],
		class: []
	};
	const titan_armor: Record<string, IItem[]> = {
		helmet: [],
		gauntlet: [],
		chest: [],
		leg: [],
		class: []
	};
	const hunter_armor: Record<string, IItem[]> = {
		helmet: [],
		gauntlet: [],
		chest: [],
		leg: [],
		class: []
	};
	const kinetic_weapon: IItem[] = [];
	const energy_weapon: IItem[] = [];
	const power_weapon: IItem[] = [];

	// Loop over item instances and fetch their data
	for (const [instance_id, power] of raw_instances) {
		const instance_response = await fetch(
			`https://bungie.net/Platform/Destiny2/${access_data.d2.type}/Profile/${access_data.d2.id}/Item/${instance_id}/?components=307`,
			{
				headers: {
					Authorization: `Bearer ${access_data.access.token}`,
					'X-API-Key': SECRET_API_KEY
				}
			}
		);
		if (instance_response.status !== 200) {
			throw error(
				500,
				`There was an error fetching the item instance for '${instance_id}'_ '${instance_response.statusText}'`
			);
		}
		const instance_data = await instance_response.json();

		// Fetching manifest results for it
		const manifest_instance = manifest_data.manifest[instance_data.Response.item.data.itemHash];

		if (!manifest_instance) {
			continue;
		}

		// Getting the type of weapon / armor the instance belongs to
		let type = '';
		switch (manifest_instance.itemCategoryHashes['0']) {
			case 2:
				type = 'kinetic';
				break;
			case 3:
				type = 'energy';
				break;
			case 4:
				type = 'power';
				break;
			default: {
				switch (manifest_instance.itemCategoryHashes['1']) {
					case 45:
						type = 'helmet';
						break;
					case 46:
						type = 'gauntlet';
						break;
					case 47:
						type = 'chest';
						break;
					case 48:
						type = 'leg';
						break;
					case 49:
						type = 'class';
						break;
				}
			}
		}

		const instance_information = { definition: manifest_instance, power: power };
		// Safe the information acquired in the dependant collection
		switch (manifest_instance.classType) {
			case 0: // Titan
				titan_armor[type].push(instance_information);
				break;
			case 1: // Hunter
				hunter_armor[type].push(instance_information);
				break;
			case 2: // Warlock
				warlock_armor[type].push(instance_information);
				break;
			default: {
				if (type === 'kinetic') {
					kinetic_weapon.push(instance_information);
				} else if (type === 'energy') {
					energy_weapon.push(instance_information);
				} else {
					power_weapon.push(instance_information);
				}
			}
		}
	}

	const weapon_add = kinetic_weapon[0].power + energy_weapon[0].power + power_weapon[0].power;
	const titan_add =
		weapon_add +
		(titan_armor.helmet[0].power +
			titan_armor.gauntlet[0].power +
			titan_armor.chest[0].power +
			titan_armor.leg[0].power +
			titan_armor.class[0].power);
	const hunter_add =
		weapon_add +
		(hunter_armor.helmet[0].power +
			hunter_armor.gauntlet[0].power +
			hunter_armor.chest[0].power +
			hunter_armor.leg[0].power +
			hunter_armor.class[0].power);
	const warlock_add =
		weapon_add +
		(warlock_armor.helmet[0].power +
			warlock_armor.gauntlet[0].power +
			warlock_armor.chest[0].power +
			warlock_armor.leg[0].power +
			warlock_armor.class[0].power);

	const data: ILevelData = {
		kinetic: kinetic_weapon[0],
		energy: energy_weapon[0],
		power: power_weapon[0],
		Titan: {
			helmet: titan_armor.helmet[0],
			gauntlet: titan_armor.gauntlet[0],
			chest: titan_armor.chest[0],
			leg: titan_armor.leg[0],
			class: titan_armor.class[0],
			power: {
				full: Math.floor(titan_add / 8),
				partial: titan_add % 8
			}
		},
		Hunter: {
			helmet: hunter_armor.helmet[0],
			gauntlet: hunter_armor.gauntlet[0],
			chest: hunter_armor.chest[0],
			leg: hunter_armor.leg[0],
			class: hunter_armor.class[0],
			power: {
				full: Math.floor(hunter_add / 8),
				partial: hunter_add % 8
			}
		},
		Warlock: {
			helmet: warlock_armor.helmet[0],
			gauntlet: warlock_armor.gauntlet[0],
			chest: warlock_armor.chest[0],
			leg: warlock_armor.leg[0],
			class: warlock_armor.class[0],
			power: {
				full: Math.floor(warlock_add / 8),
				partial: warlock_add % 8
			}
		}
	};

	return json(data);
}) satisfies RequestHandler;
