/**
 * Конфигурация приложения
 *
 * @link https://nuxt.com/docs/api/configuration/nuxt-config
 */
export default defineNuxtConfig({
    app: {
        head: {
            charset:  'utf-8',
            viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
            title:    'Iteca - Кабинет участника',
        },
    },
    css: [
        '@/styles/common.scss',
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use "@/styles/_variables.scss" as *;
                        @use "@/styles/_mixins.scss" as *;
                    `,
                },
            },
        },
    },
    runtimeConfig: {
        apiBaseUrl: process.env.API_URL,
        public:     {
            mode: process.env.MODE,
        },
    },
    modules: [
        '@pinia/nuxt',
        [
            '@nuxtjs/i18n',
            {
                locales: [
                    {
                        code: 'ru',
                        name: 'Русский',
                    },
                    {
                        code: 'kz',
                        name: 'Қазақша',
                    },
                    {
                        code: 'en',
                        name: 'English',
                    }
                ],
                defaultLocale: 'ru',
                strategy:      'prefix_except_default',
            },
        ],
    ],
    postcss: {
        plugins: {
            'postcss-preset-env': {},
        },
    },
    devtools: {
        enabled: true
    },
});
