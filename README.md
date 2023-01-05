# LuMiSxh.me Website

This website is structured with the [Turborepo](https://turbo.build/) tool from [Vercel](https://vercel.com/)
and uses the [SvelteKit](https://kit.svelte.dev/) apps inside the `apps`-folder to build the different parts
of the website.

## Structure

- Master
    - Domain: `lumisxh.me`
    - Development: `http://localhost:3000`
- Destiny
    - Domain: `destiny.lumisxh.me`
    - Development: `https://localhost:3001`

- Akemi
  - Domain: `akemi.lumisxh.me`
  - Development: `http://localhost:3002`

## Commit Structure

Builds only get executed if the needed keyword is present inside the commit message.

- AKEMI for Akemi deployment
- DESTINY for Destiny deployment
- MASTER for Master deployment
