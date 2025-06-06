import { ApiConfig, RequestOptions } from "./global/types";
import { ListsClient } from "./lists";
import { SubscribersClient } from "./subscribers";

export class SendClient {
    private readonly config: ApiConfig;
    private readonly options?: RequestOptions;
    readonly lists: ListsClient;
    readonly subscribers: SubscribersClient;

    constructor(config: ApiConfig, options?: RequestOptions) {
        this.config = config;
        this.options = options;
        this.lists = new ListsClient(this.config, this.options);
        this.subscribers = new SubscribersClient(this.config, this.options);
    }

}