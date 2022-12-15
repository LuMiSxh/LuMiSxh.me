import { l as get_store_value, w as writable } from './index.js';

// Source: https://github.com/joshnuss/svelte-local-storage-store
const stores = {};
function localStorageStore(key, initialValue, options) {
    const browser = typeof localStorage != 'undefined' && typeof window != 'undefined';
    const serializer = options?.serializer || JSON;
    function updateStorage(key, value) {
        if (!browser)
            return;
        localStorage.setItem(key, serializer.stringify(value));
    }
    if (!stores[key]) {
        const store = writable(initialValue, (set) => {
            const json = browser ? localStorage.getItem(key) : null;
            if (json) {
                set(serializer.parse(json));
            }
            if (browser) {
                const handleStorage = (event) => {
                    if (event.key === key)
                        set(event.newValue ? serializer.parse(event.newValue) : null);
                };
                window.addEventListener('storage', handleStorage);
                return () => window.removeEventListener('storage', handleStorage);
            }
        });
        const { subscribe, set } = store;
        stores[key] = {
            set(value) {
                updateStorage(key, value);
                set(value);
            },
            update(updater) {
                const value = updater(get_store_value(store));
                updateStorage(key, value);
                set(value);
            },
            subscribe
        };
    }
    return stores[key];
}

// OS Prefers Dark Scheme - TRUE: dark | FALSE: light
const storePrefersDarkScheme = localStorageStore('storePrefersDarkScheme', false);
// User Selected Mode - TRUE: dark | FALSE: light | undefined: use system preference
const storeLightSwitch = localStorageStore('storeLightSwitch', undefined);

const AccordionItem_svelte_svelte_type_style_lang = '';

const FileDropzone_svelte_svelte_type_style_lang = '';

const ProgressBar_svelte_svelte_type_style_lang = '';

export { storePrefersDarkScheme as a, storeLightSwitch as s };
