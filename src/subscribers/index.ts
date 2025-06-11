import { apiFetch, apiUrl, httpFetch } from '../global/helpers'
import { ApiConfig, ApiResponse, PagingResponse, RequestOptions, Prettify } from '@/global/types'
import { subscribeMethod, Subscriber, subscriberStatusTypes, SubscriberStatus } from './types';

export type SubscribersResponse = Prettify<PagingResponse<Subscriber, 'Subscribers'>>;
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

    public async fromList(listId: string, status?: SubscriberStatus): Promise<ApiResponse<SubscribersResponse>> {
        const url = apiUrl(this.config, ['lists', listId, 'subscribers', status]);
        const response = await apiFetch<SubscribersResponse>(this.options, url);
        if (response.Context?.Subscribers) {
            for (const subscriber of response.Context.Subscribers) {
                SubscribersClient.populateSubscriber(subscriber);
            }
        }
        return response;
    }

    public async findByEmail(listId: string, email: string): Promise<ApiResponse<Subscriber>> {
        const url = apiUrl(this.config, ['subscribers', listId, 'view'], { Email: email });
        const response = await apiFetch<Subscriber>(this.options, url);
        if (response.Context) {
            SubscribersClient.populateSubscriber(response.Context);
        }
        return response;
    }

    public async add(listId: string, subscriber: NewSubscriberRequest): Promise<ApiResponse<Subscriber>> {
        const url = apiUrl(this.config, ['subscribers', listId, 'subscribe']);
        const response = await httpFetch<Subscriber>(this.options, url, 'POST', subscriber);
        if (response.Context) {
            SubscribersClient.populateSubscriber(response.Context);
        }
        return response;
    }

    public async unsubscribe(listId: string, email: string): Promise<ApiResponse<null>> {
        const url = apiUrl(this.config, ['subscribers', listId, 'unsubscribe']);
        return await httpFetch<null>(this.options, url, 'POST', { Email: email });
    }

    private static populateSubscriber(subscriber: Subscriber) {
        subscriber.SubscribeTypeValue = subscriberStatusTypes.getTypeName(subscriber.SubscribeType)!;
        if (subscriber.SubscribeMethod) {
            subscriber.SubscribeMethodValue = subscribeMethod.getTypeName(subscriber.SubscribeMethod);
        }
    }
}

export * from './types';
