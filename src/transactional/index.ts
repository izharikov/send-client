import { ApiConfig, ApiResponse, RequestOptions } from "@/global/types";
import { TransactionalCampaignRequest, TransactionalCampaignResponse } from "./types";
import { apiUrl, httpFetch } from "@/global/helpers";

export class TransactionalClient {
    private readonly config: ApiConfig;
    private readonly options?: RequestOptions;

    constructor(config: ApiConfig, options?: RequestOptions) {
        this.config = config;
        this.options = options;
    }

    public async sendEmail(request: TransactionalCampaignRequest): Promise<ApiResponse<TransactionalCampaignResponse>> {
        const url = apiUrl(this.config, ['campaigns', 'transactional', 'send']);
        return await httpFetch<TransactionalCampaignResponse>(this.options, url, 'POST', request);
    }
}

export * from './types';
