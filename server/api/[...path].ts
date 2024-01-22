import { createError, appendHeader } from 'h3';
import { getBody, prepareHeaders } from '../utils/request';

export default defineEventHandler(async (event): Promise<unknown> => {
    const config = useRuntimeConfig();

    const { method } = event;
    const { url } = event.node.req;

    const body = method !== 'GET' && method !== 'HEAD' ? await getBody(event) : undefined;

    try {
        const response = await $fetch.raw(`${url}`, {
            method,
            ...(config.apiBaseUrl && { baseURL: config.apiBaseUrl }),
            headers: prepareHeaders(event),
            body,
        });

        for (const header of ['set-cookie', 'cache-control']) {
            const h = response.headers.get(header);

            if (h) {
                appendHeader(event, header, h);
            }
        }

        return response._data;
    } catch (error: any) {
        return createError({
            statusCode:    error.response.status,
            statusMessage: error.message,
            data:          error.data,
        });
    }
});
