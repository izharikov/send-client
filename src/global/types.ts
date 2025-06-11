export type Pagination = {
    page?: number;
    pageSize?: number;
}

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};


export type Sorting = {
    sortBy?: 'Name' | 'Subject' | 'Status' | 'CreatedOn' | 'DeliveredOn';
    sortDirection?: 'ASC' | 'DESC';
}

export type ApiConfig = {
    /**
     * API Key to access the API
     */
    apiKey: string
    /**
     * Base URL for the API (https://api.sitecoresend.io/v3 by default)
     */
    baseUrl?: string
}

export type RequestOptions = {
    fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
}

type SuccessResponse<TResult> = {
    Code: 0;
    Error: null;
    Context: TResult;
}

export type ErrorResponse = {
    Code: number;
    Error: string;
    Context: null;
    RatLimitDetails?: {
        FirstCall: string;
        Expires: string;
    }
}

type HttpErrorDetails = {
    status: number;
    statusText: string;
}

export class ApiResponseError extends Error {
    public readonly sendResponse?: ErrorResponse;
    public readonly httpErrorDetails?: HttpErrorDetails;

    constructor(originalError?: Error, response?: ErrorResponse, httpErrorDetails?: HttpErrorDetails) {
        super(originalError?.message);
        if (originalError) {
            this.stack = originalError.stack;
            this.cause = originalError.cause;
        }
        this.sendResponse = response;
        this.httpErrorDetails = httpErrorDetails;
    }
}

export type ApiResponse<TResult> = SuccessResponse<TResult>;

export type PagingResponse = {
    Paging: {
        PageSize: number;
        CurrentPage: number;
        TotalResults: number;
        TotalPageCount: number;
        SortExpression: unknown;
        SortIsAscending: boolean;
    };
};