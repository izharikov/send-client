import { testApiConfig, testConfig } from '../tests/config';
import { SendClient } from '../SendClient';
import { ApiResponseError } from '@/global/types';

const send = new SendClient(testApiConfig);

test('get all - should return result', async () => {
    const response = await send.subscribers.fromList(testConfig.existingListId);
    expect(response.Code).toBe(0);
    expect(response.Context?.Subscribers.length).toBeGreaterThan(0);
});

test('get subscribed - should return result', async () => {
    const response = await send.subscribers.fromList(testConfig.existingListId, 'Subscribed');
    expect(response.Code).toBe(0);
    expect(response.Context?.Subscribers.length).toBeGreaterThan(0);
});


test('get unsubscribed - should return empty result', async () => {
    const response = await send.subscribers.fromList(testConfig.existingListId, 'Unsubscribed');
    expect(response.Code).toBe(0);
    for (const subscriber of response.Context?.Subscribers ?? []) {
        expect(subscriber.SubscribeTypeValue).toBe('Unsubscribed');
    }
});

test('find by existing email - should return result', async () => {
    const response = await send.subscribers.findByEmail(testConfig.existingListId, testConfig.existingEmail);
    expect(response.Code).toBe(0);
    expect(response.Context?.Email).toBe(testConfig.existingEmail);
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
        expect(response.Code).toBe(0);
        expect(response.Context?.Email).toBe(testEmail);

        const response2 = await send.subscribers.unsubscribe(testConfig.existingListId, response.Context.Email);
        expect(response2.Code).toBe(0);

    } catch (e) {
        console.error(e);
        expect(true).toBe(false);
    }
});
