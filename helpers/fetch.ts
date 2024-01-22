/**
 * Инстанс Fetch
 */
export const apiInstance = $fetch.create({
    baseURL: '/api',
    onRequest({ options }) {
        const { $i18n } = useNuxtApp();

        options.headers = {
            ...options.headers,
            'X-language': $i18n.locale.value,
        };
    }
});
