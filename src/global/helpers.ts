import { ApiConfig, ApiResponseError, Sorting, RequestOptions, ApiResponse, ErrorResponse } from './types'

export type ApiUrlPart = string | number | null | undefined;

export type Query = Record<string, ApiUrlPart>;

type InternalApiResponse<TResult> = ApiResponse<TResult> | ErrorResponse;

export async function httpFetch<TResponse>(options: RequestOptions | undefined, input: RequestInfo, method: 'POST' | 'PUT' | 'DELETE', body: Record<string, unknown>): Promise<TResponse> {
    return await apiFetch<TResponse>(options, input, {
        method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function apiFetch<TResponse>(options: RequestOptions | undefined, input: RequestInfo, init?: RequestInit): Promise<TResponse> {
    const computedFetch = options?.fetch ?? fetch;
    const response = await computedFetch(input, init);
    if (!response.ok) {
        throw new ApiResponseError(undefined, undefined, { status: response.status, statusText: response.statusText });
    }
    const json = await response.json() as InternalApiResponse<TResponse>;
    if (json.Code === 0) {
        return (json as ApiResponse<TResponse>).Context;
    } else {
        throw new ApiResponseError(undefined, json as ErrorResponse);
    }
}

export function apiUrl(config: ApiConfig, paths: ApiUrlPart[], query?: Query, sorting?: Sorting) {
    let result = config.baseUrl ?? 'https://api.sitecoresend.io/v3'
    paths.forEach(path => {
        if (path === null || path === undefined) {
            return
        };
        result += `/${path}`
    })


    result += '.json?';

    const queryParts: string[] = [
        'apiKey=' + config.apiKey,
    ];
    if (sorting) {
        queryParts.push(`ShortBy=${sorting.sortBy ?? 'Name'}`);
        queryParts.push(`SortMethod=${sorting.sortDirection ?? 'ASC'}`);
    }

    if (query) {
        for (const key in query) {
            const value = query[key];
            if (value === null || value === undefined) {
                continue
            }
            queryParts.push(`${key}=${value}`)
        }
    }

    return result + queryParts.join('&');
}

export function getDynamicTypes<T extends Record<string, number>>(mapping: T) {
    type TypeName = keyof T;
    type Value = typeof mapping[keyof typeof mapping];

    // Create reverse map
    const reverseMap = Object.entries(mapping).reduce((acc, [key, value]) => {
        acc[value] = key;
        return acc;
    }, {} as Record<Value, TypeName>);

    // Lookup function
    const getTypeName = (value: Value | TypeName): TypeName | undefined => {
        if (typeof value === 'string') {
            return value as TypeName;
        }
        if (typeof value === 'number') {
            return reverseMap[value as Value] as TypeName;
        }
        return undefined;
    };

    return {
        mapping,
        reverseMap,
        getTypeName,

        // Types for inference
        types: null as unknown as {
            TypeName: TypeName;
            Value: typeof mapping[keyof typeof mapping];
            Combined: keyof typeof mapping | typeof mapping[keyof typeof mapping]
        },
    };
}
