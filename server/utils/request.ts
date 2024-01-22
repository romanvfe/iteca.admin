import { readFormData, getHeaders, readBody } from 'h3';
import type { H3Event } from 'h3';
import { isFormData } from './formData';

/**
 * Возвращает подготовленные заголовки для запроса.
 *
 * @param {H3Event} event - Событие H3.
 * @param {Object}
 */
export const prepareHeaders = (event: H3Event) => {
    const headers = getHeaders(event);

    return {
        ...(headers.cookie && { cookie: headers.cookie }),
        ...(!isFormData(event) && { 'content-type': 'application/json' }),
    };
};

/**
 * Возвращает тело запроса.
 *
 * @param {H3Event} event - Событие H3.
 * @returns {Promise<unknown>}
 */
export const getBody = async (event: H3Event): Promise<BodyInit | FormData> => {
    if (isFormData(event)) {
        return readFormData(event);
    }

    return readBody(event);
};
