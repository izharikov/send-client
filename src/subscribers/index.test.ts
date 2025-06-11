import { testApiConfig, testConfig } from '../tests/config';
import { SendClient } from '../SendClient';
import { ApiResponseError } from '@/global/types';

const send = new SendClient(testApiConfig);

test('get all - should return result', async () => {
    const response = await send.subscribers.fromList(testConfig.existingListId);
    expect(response?.Subscribers.length).toBeGreaterThan(0);
});

test('get subscribed - should return result', async () => {
    const response = await send.subscribers.fromList(testConfig.existingListId, 'Subscribed');
    expect(response?.Subscribers.length).toBeGreaterThan(0);
});


test('get unsubscribed - should return empty result', async () => {
    const response = await send.subscribers.fromList(testConfig.existingListId, 'Unsubscribed');
    for (const subscriber of response?.Subscribers ?? []) {
        expect(subscriber.SubscribeTypeValue).toBe('Unsubscribed');
    }
});

test('find by existing email - should return result', async () => {
    const response = await send.subscribers.findByEmail(testConfig.existingListId, testConfig.existingEmail);
    expect(response?.Email).toBe(testConfig.existingEmail);
});

test('find by non-existing email - should throw error', async () => {
    try {
        await send.subscribers.findByEmail(testConfig.existingListId, 'non-existing@email.com');
        expect(true).toBe(false);
    } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toBeInstanceOf(ApiResponseError);
        const error = e as ApiResponseError;
        expect(error.sendResponse?.Error).toMatch(/^MEMBER_NOT_FOUND.*/);
    }
});

test('add - unsubscribe - should return result', async () => {
    const testEmail = 'i.zharikov-test@brimit.com';
    try {
        const response = await send.subscribers.add(testConfig.existingListId, {
            Email: testEmail,
            Name: 'Test',
            CustomFields: ['CustomField1', 'CustomField2'],
            Tags: ['Tag1', 'Tag2'],
            HasExternalDoubleOptIn: true,
        });
        expect(response?.Email).toBe(testEmail);

        const response2 = await send.subscribers.unsubscribe(testConfig.existingListId, response.Email);
        expect(response2).toBe(true);

    } catch (e) {
        console.error(e);
        expect(true).toBe(false);
    }
});
