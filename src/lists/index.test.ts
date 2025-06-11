import { ApiResponseError } from '../global/types';
import { testApiConfig, testConfig } from '../tests/config';
import { SendClient } from '../SendClient';

const send = new SendClient(testApiConfig);

test('get all - should return result', async () => {
    const response = await send.lists.getAll();
    expect(response?.MailingLists.length).toBeGreaterThan(0);
});

test('get all - should return error', async () => {
    const invalidApi = new SendClient({ apiKey: 'random' });
    try {
        await invalidApi.lists.getAll();
        expect(true).toBe(false);
    } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toBeInstanceOf(ApiResponseError);
        const error = e as ApiResponseError;
        expect(error.sendResponse?.Error).toBe('API_KEY_NOT_VALID');
    }
});

test('get by id - should return result', async () => {
    if (!testConfig.existingListId) {
        return;
    }
    const response = await send.lists.getById(testConfig.existingListId);
    expect(response?.Name).toBeDefined();
});