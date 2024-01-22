import Cookies from 'js-cookie';

const TOKEN_KEY = 'authToken';

/**
 * Проверка аутентификации
 *
 * @returns {boolean}
 */
export const authCheck = (): boolean => !!Cookies.get(TOKEN_KEY);

/**
 * Установить токен аутентификации
 *
 * @param {string} token - токен полученный с сервера
 */
export const setToken = (token: string) => Cookies.set(TOKEN_KEY, token);
