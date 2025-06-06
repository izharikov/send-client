import { testApiConfig, testConfig } from '../tests/config';
import { SendClient } from '../SendClient';

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
    expect(response.Context?.Subscribers.length).toBe(0);
});
