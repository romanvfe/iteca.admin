import { defineStore, acceptHMRUpdate } from 'pinia';
import type { GlobalStoreState } from '@/types/Store';

/**
 * Store с глобальными значениями для проекта
 */
export const useGlobalStore = defineStore('global', {
    state: (): GlobalStoreState => ({
        loading: false,
        isAuth:  false,
    }),
    actions: {
        /**
         * Начать загрузку
         */
        startLoading() {
            this.loading = true;
        },

        /**
         * Остановть загрузку
         */
        stopLoading() {
            this.loading = false;
        },

        /**
         * Установить флаг авторизации
         *
         * @param {boolean} bool - true/false
         */
        setAuthFlag(bool: boolean) {
            this.isAuth = bool;
        }
    }
});

// для работы HMR
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
}
