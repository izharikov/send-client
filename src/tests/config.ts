import { ApiConfig } from "../global/types";

const testApiConfig: ApiConfig = {
    apiKey: process.env.API_KEY ?? '',
}

const testConfig = {
    existingListId: process.env.EXISTING_LIST_ID ?? '',
    existingEmail: process.env.EXISTING_EMAIL ?? '',
    transactionalCampaignId: process.env.TRANSACTIONAL_CAMPAIGN_ID ?? '',
}

export { testApiConfig, testConfig };
