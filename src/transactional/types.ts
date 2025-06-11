import { Prettify } from "@/global/types";

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];
export type JObject = { [key: string]: Json };

export type NonEmptyArray<T> = [T, ...T[]];

export type TemplatePart = {
    TemplateId: string;
    TemplateName?: string;
}

export type ContentType = {
    Content: NonEmptyArray<{
        Type: string;
        Value: string;
        WebLocation?: string;
    }>;
    CampaignId: string;
}

export type TransactionalCampaignRequest = Prettify<{
    Subject?: string;
    Personalizations: NonEmptyArray<{
        To: {
            Email: string;
            Name?: string;
        }[];
        Substitutions?: JObject;
    }>;
    MailSettings?: {
        BypassUnsubscribeManagement?: {
            Enable: boolean;
        }
    }
} & (ContentType | TemplatePart)>;

export type TransactionalCampaignResponse = {
    ExcludedRecipients: {
        Email: string;
        Reason: string;
    };
    TotalAccepted: number;
    TotalExcluded: number;
}
