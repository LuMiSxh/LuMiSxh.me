import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type IGithubRepo from '@lib/types/IGithubRepo';
import { SECRET_GITHUB_TOKEN } from '$env/static/private';

export const load = (async ({ fetch }) => {
	const response = await fetch('https://api.github.com/search/repositories?q=user:LUMiSxh', {
		headers: {
			Authorization: `token ${SECRET_GITHUB_TOKEN}`
		}
	});
	if (response.status !== 200) {
		throw error(500, { message: 'An error occurred while fetching the GitHub api' });
	}

	const repositories: IGithubRepo[] = [];

	const repos = await response.json();

	for (const repo of repos.items) {
		const response_lang = await fetch(repo.languages_url, {
			headers: {
				Authorization: `token ${SECRET_GITHUB_TOKEN}`
			}
		});

		if (response_lang.status !== 200) {
			throw error(500, { message: 'An error occurred while fetching the GitHub api' });
		}

		const text = await response_lang.json();

		const languages = Object.keys(text);

		repositories.push({
			Name: String(repo.name),
			Private: Boolean(repo.private),
			Url: String(repo.html_url),
			CreatedAt: new Date(repo.created_at),
			LastUpdatedAt: new Date(repo.updated_at),
			Languages: languages,
			Description: repo.description
		});
	}

	return { repositories: repositories };
}) satisfies PageServerLoad;
