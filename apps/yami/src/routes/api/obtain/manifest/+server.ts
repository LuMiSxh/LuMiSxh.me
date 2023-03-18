import type { RequestHandler } from '@sveltejs/kit';
import {
	SECRET_API_KEY,
	SECRET_DB_CONN_STRING,
	SECRET_DB_NAME,
	SECRET_MANIFEST_COLLECTION_NAME
} from '$env/static/private';
import { MongoClient } from 'mongodb';
import { error, json } from '@sveltejs/kit';
import type IAccessSession from '@interfaces/IAccessSession';
import type IManifestItemDefinition from '@interfaces/IManifestItemDefinition';

export const GET = (async ({ cookies, fetch, setHeaders }) => {
	const access_cookie = cookies.get('AccessSession');
	const client = new MongoClient(SECRET_DB_CONN_STRING);

	if (!access_cookie) {
		throw error(500, 'No access session cookie exists');
	}
	const access_data = JSON.parse(access_cookie) as IAccessSession;

	// Set header to cache for 1 week
	setHeaders({
		'cache-control': 'max-age=14400'
	});

	// Getting the Manifest paths
	const manifest_path_response = await fetch('https://bungie.net/Platform/Destiny2/Manifest/', {
		headers: {
			Authorization: `Bearer ${access_data.access.token}`,
			'X-API-Key': SECRET_API_KEY
		}
	});
	if (manifest_path_response.status !== 200) {
		throw error(
			500,
			`There was an error fetching the manifest paths: '${manifest_path_response.statusText}'`
		);
	}
	const manifest_path_data = await manifest_path_response.json();

	// Trying to get current manifest
	try {
		const database = client.db(SECRET_DB_NAME);
		const manifest_collection = database.collection(SECRET_MANIFEST_COLLECTION_NAME);
		// Trying to get the current version stored
		const query = { version: manifest_path_data.Response.version };
		const version = await manifest_collection.findOne(query);

		if (version) {
			const found_manifest = await manifest_collection.find({}).toArray();

			// Transform in correct JSON format
			const raw_json = {};

			for (const obj of found_manifest) {
				// @ts-ignore
				raw_json[obj.hash] = obj.data;
			}
			return json(raw_json);
		} else {
			// clear the collection
			await manifest_collection.deleteMany({});

			// Replace with new Manifest
			// Getting the DestinyInventoryItemDefinition manifest
			const manifest_response = await fetch(
				`https://bungie.net${manifest_path_data.Response.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition}`,
				{
					headers: {
						Authorization: `Bearer ${access_data.access.token}`,
						'X-API-Key': SECRET_API_KEY
					}
				}
			);
			if (manifest_response.status !== 200) {
				throw error(
					500,
					`There was an error fetching the DestinyInventoryItemDefinition manifest: '${manifest_response.statusText}'`
				);
			}
			const manifest_data = await manifest_response.json();

			// Transform dict into array
			const raw_array = [];
			for (const item_hash of Object.keys(manifest_data)) {
				raw_array.push({ hash: item_hash, data: manifest_data[item_hash] });
			}

			await manifest_collection.insertOne({ version: manifest_path_data.Response.version });
			await manifest_collection.insertMany(raw_array);
			return json(manifest_data);
		}
	} finally {
		await client.close();
	}
}) satisfies RequestHandler;
