import { apiFetch, apiUrl } from '../global/helpers'
import { ApiConfig, ApiResponse, PagingResponse, RequestOptions, Prettify } from '../global/types'
import { subscribeMethod, Subscriber, subscriberStatusTypes, SubscriberStatus } from './types';

export type SubscribersResponse = Prettify<PagingResponse<Subscriber, 'Subscribers'>>;

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

    private static populateSubscriber(subscriber: Subscriber) {
        subscriber.SubscribeTypeValue = subscriberStatusTypes.getTypeName(subscriber.SubscribeType)!;
        if (subscriber.SubscribeMethod) {
            subscriber.SubscribeMethodValue = subscribeMethod.getTypeName(subscriber.SubscribeMethod);
        }
    }
}