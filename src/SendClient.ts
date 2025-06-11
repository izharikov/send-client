import { ApiConfig, RequestOptions } from "./global/types";
import { ListsClient } from "./lists";
import { SubscribersClient } from "./subscribers";
import { TransactionalClient } from "./transactional";

export class SendClient {
    private readonly config: ApiConfig;
    private readonly options?: RequestOptions;
    readonly lists: ListsClient;
    readonly subscribers: SubscribersClient;
    readonly transactional: TransactionalClient;

    constructor(config: ApiConfig, options?: RequestOptions) {
        this.config = config;
        this.options = options;
        this.lists = new ListsClient(this.config, this.options);
        this.subscribers = new SubscribersClient(this.config, this.options);
        this.transactional = new TransactionalClient(this.config, this.options);
    }
}