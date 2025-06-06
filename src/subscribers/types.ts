import { getDynamicTypes } from "../global/helpers";

export const subscriberStatusTypes = getDynamicTypes({
    Subscribed: 1,
    Unsubscribed: 2,
    Bounced: 3,
    Removed: 4,
} as const);

export type SubscriberStatus = typeof subscriberStatusTypes.types.TypeName;

export const subscribeMethod = getDynamicTypes({
    Unknown: 0,
    Ui: 1,
    Api: 2,
    Form: 3,
    Import: 4,
    Automation: 5,
    ZapierPlugin: 6,
    MailchimpPlugin: 7,
    WebsiteIdentified: 8,
    SmtpDispatching: 9,
    SitecoreConnectPlugin: 10,
    OtherPlugin: 100,
} as const);


export type SubscriberCustomField = {
    CustomFieldID?: string | null;
    Name: string;
    Value?: any | null;
};

export type Subscriber = {
    ID: string; // Guid serialized as string
    Name?: string | null;
    Email: string;
    CreatedOn: string; // DateTimeOffset serialized as string
    UnsubscribedOn?: string | null;
    UnsubscribedFromID?: string | null; // Guid serialized as string
    SubscribeType: typeof subscriberStatusTypes.types.Value;
    SubscribeTypeValue: typeof subscriberStatusTypes.types.TypeName;
    SubscribeMethod?: typeof subscribeMethod.types.Value;
    SubscribeMethodValue?: typeof subscribeMethod.types.TypeName;
    CustomFields: SubscriberCustomField[];
    RemovedOn?: string | null;
    Tags: string[];
    Preferences: string[];
};