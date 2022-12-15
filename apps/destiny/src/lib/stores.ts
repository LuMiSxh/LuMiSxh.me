import { writable, type Writable } from 'svelte/store';

export const appRailValue: Writable<number> = writable(1);
