import type { H3Event } from 'h3';

/**
 * Выполняет проверку на FormData.
 *
 * @param {H3Event} event - Событие H3;
 * @returns {boolean}
 */
export const isFormData = (event: H3Event) => event.node.req.headers['content-type']?.includes('multipart/form-data');
