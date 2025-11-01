import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

export function createEmotionCache() {
  return createCache({
                       key: 'mantine',
                       prepend: true,
                       container: isBrowser ? document.head : undefined
                     });
}

export const cache = createEmotionCache();

if (isBrowser && cache.compat !== undefined) {
  cache.compat = true;
}
