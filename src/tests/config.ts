import { ApiConfig } from "../global/types";

const testApiConfig: ApiConfig = {
    apiKey: process.env.API_KEY ?? '',
}

const testConfig = {
    existingListId: process.env.EXISTING_LIST_ID ?? '',
}

export { testApiConfig, testConfig };
