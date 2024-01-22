import { HeaderID } from '@/config/constants';
import type { RouterConfig } from '@nuxt/schema';

/**
 * Флаг о том что страница загружена
 */
let isPageFinished = false;

/**
 * Получаем фиксированный header на странице
 */
const getHeader = () => document.getElementById(HeaderID);

export default<RouterConfig> {
    /**
     * Меняем дефолтное поведение скролла для роутера.
     *
     * @link https://router.vuejs.org/guide/advanced/scroll-behavior.html
     */
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve) => {
            const nuxtApp = useNuxtApp();

            const header = getHeader();

            const optionsWithHash = {
                el:       to.hash,
                behavior: 'smooth' as const,
                top:      header?.clientHeight ?? 0,
            };

            const defaultOptions = savedPosition || { top: 0 };

            // Если переходим на активную страницу с hash, мы должны убедиться что страница загружена.
            if (isPageFinished && to.hash && to.path === from.path) {
                resolve(optionsWithHash);
            }

            nuxtApp.hook('page:finish', () => {
                isPageFinished = true;

                if (to.hash) {
                    resolve(optionsWithHash);

                    return;
                }

                resolve(defaultOptions);
            });
        });
    }
};
