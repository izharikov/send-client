import { getDynamicTypes } from "../global/helpers";

export const customFieldType = getDynamicTypes({
    Text: 0,
    Number: 1,
    DateTime: 2,
    SingleSelectDropdown: 3,
    CheckBox: 4,
} as const);

export type CustomFieldDefinition = {
    Id: string;
    Name: string;
    IsRequired: boolean;
    Type: typeof customFieldType.types.Combined;
    TypeValue: typeof customFieldType.types.TypeName;
    Options: string[];
    IsHidden: boolean;
    FallBackValue?: string;
}

export const customSelectType = getDynamicTypes({
    SingleSelect: 0,
    MultiSelect: 1,
} as const);

export type MailingListPreferences = {
    FallbackValue?: string;
    IsRequired: boolean;
    Options: string[];
    SelectType: typeof customSelectType.types.Combined;
    SelectTypeValue: typeof customSelectType.types.TypeName;
}

export const mailingListStatuses = getDynamicTypes({
    Unknown: -1,
    Created: 0,
    Imported: 1,
    Importing: 2,
    Deleted: 3,
} as const);

export type MailingList = {
    ID: string;
    Name: string;
    ActiveMemberCount: number;
    BouncedMemberCount: number;
    RemovedMemberCount: number;
    UnsubscribedMemberCount: number;
    Status: typeof mailingListStatuses.types.Combined;
    StatusValue: typeof mailingListStatuses.types.TypeName;
    CustomFieldsDefinition: CustomFieldDefinition[];
    CreatedBy?: string;
    CreatedOn: string;
    UpdatedBy?: string;
    UpdatedOn: string;
    ImportOperation?: Record<string, any>;
    Preferences?: MailingListPreferences;
}