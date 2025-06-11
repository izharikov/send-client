import { apiFetch, apiUrl } from '../global/helpers'
import { ApiConfig, ApiResponse, PagingResponse, RequestOptions, Prettify } from '../global/types'
import { customFieldType, customSelectType, MailingList, mailingListStatuses } from './types'

export type MailingListsResults = Prettify<PagingResponse & { MailingLists: MailingList[] }>;

export class ListsClient {
    private readonly config: ApiConfig;
    private readonly options?: RequestOptions;

    constructor(config: ApiConfig, options?: RequestOptions) {
        this.config = config;
        this.options = options;
    }

    public async getAll(): Promise<MailingListsResults> {
        const url = apiUrl(this.config, ['lists']);
        return ListsClient.populateMailingList(await apiFetch<MailingListsResults>(this.options, url));
    }

    public async getWithPaging(page: number, pageSize: number): Promise<MailingListsResults> {
        const url = apiUrl(this.config, ['lists', page, pageSize]);
        return ListsClient.populateMailingList(await apiFetch<MailingListsResults>(this.options, url));
    }

    public async getById(id: string): Promise<MailingList> {
        const url = apiUrl(this.config, ['lists', id, 'details']);
        const resp = await apiFetch<MailingList>(this.options, url);
        if (resp !== null) {
            ListsClient.fillList(resp);
        }
        return resp;
    }

    private static populateMailingList(resp: MailingListsResults) {
        const result = resp?.MailingLists ?? [];
        for (const item of result) {
            ListsClient.fillList(item);
        }
        return resp;
    }

    private static fillList(list: MailingList) {
        list.StatusValue = mailingListStatuses.getTypeName(list.Status) ?? 'Unknown';
        const fields = list.CustomFieldsDefinition ?? [];
        for (const field of fields) {
            field.TypeValue = customFieldType.getTypeName(field.Type) ?? 'Text';
        }
        if (list.Preferences) {
            list.Preferences.SelectTypeValue = customSelectType.getTypeName(list.Preferences.SelectType) ?? 'SingleSelect';
        }
        return list;
    }
}

export * from './types';
