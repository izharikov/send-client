import { apiFetch, apiUrl, httpFetch } from '../global/helpers'
import { ApiConfig, PagingResponse, RequestOptions, Prettify } from '@/global/types'
import { subscribeMethod, Subscriber, subscriberStatusTypes, SubscriberStatus } from './types';

export type SubscribersResponse = Prettify<PagingResponse & { Subscribers: Subscriber[] }>;
export type NewSubscriberRequest = {
    Email: string;
    Name?: string;
    CustomFields?: string[];
    Tags?: string[];
    Preferences?: string[];
    HasExternalDoubleOptIn?: boolean;
}

export class SubscribersClient {
    private readonly config: ApiConfig;
    private readonly options?: RequestOptions;

    constructor(config: ApiConfig, options?: RequestOptions) {
        this.config = config;
        this.options = options;
    }

    public async fromList(listId: string, status?: SubscriberStatus): Promise<SubscribersResponse> {
        const url = apiUrl(this.config, ['lists', listId, 'subscribers', status]);
        const response = await apiFetch<SubscribersResponse>(this.options, url);
        if (response?.Subscribers) {
            for (const subscriber of response.Subscribers) {
                SubscribersClient.populateSubscriber(subscriber);
            }
        }
        return response;
    }

    public async findByEmail(listId: string, email: string): Promise<Subscriber> {
        const url = apiUrl(this.config, ['subscribers', listId, 'view'], { Email: email });
        const response = await apiFetch<Subscriber>(this.options, url);
        if (response) {
            SubscribersClient.populateSubscriber(response);
        }
        return response;
    }

    public async add(listId: string, subscriber: NewSubscriberRequest): Promise<Subscriber> {
        const url = apiUrl(this.config, ['subscribers', listId, 'subscribe']);
        const response = await httpFetch<Subscriber>(this.options, url, 'POST', subscriber);
        if (response) {
            SubscribersClient.populateSubscriber(response);
        }
        return response;
    }

    public async unsubscribe(listId: string, email: string): Promise<true> {
        const url = apiUrl(this.config, ['subscribers', listId, 'unsubscribe']);
        await httpFetch<null>(this.options, url, 'POST', { Email: email });
        return true;
    }

    private static populateSubscriber(subscriber: Subscriber) {
        subscriber.SubscribeTypeValue = subscriberStatusTypes.getTypeName(subscriber.SubscribeType)!;
        if (subscriber.SubscribeMethod) {
            subscriber.SubscribeMethodValue = subscribeMethod.getTypeName(subscriber.SubscribeMethod);
        }
    }
}

export * from './types';
