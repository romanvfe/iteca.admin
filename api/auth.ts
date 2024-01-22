import { apiInstance } from '@/helpers/fetch';
import { API_KEY } from '@/config/config';
import type { AuthData } from '@/types/Auth';

/**
 * Запрос для авторизации
 *
 * @param {string} login - login пользователя
 * @param {string} pass - пароль от кабинета
 */
export const authenticated = (login: string, pass: string) => {
    apiInstance<AuthData>('/login/', {
        method: 'POST',
        body:   {
            apiKey: API_KEY,
            login,
            pass
        }
    })
        .then((data: AuthData) => data);
};
