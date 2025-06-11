import { testApiConfig, testConfig } from '../tests/config';
import { SendClient } from '../SendClient';
import { TransactionalCampaignRequest } from './types';

const send = new SendClient(testApiConfig);

test('transactional email - template id - should send successfully', async () => {
    const request: TransactionalCampaignRequest = {
        Subject: "Don't miss! New Sitecore Send Features: Iterations + TS Client",
        TemplateId: testConfig.transactionalCampaignId,
        Personalizations: [
            {
                To: [{
                    Email: testConfig.existingEmail,
                }],
                Substitutions: {
                    "contentTitle": "Check those links to learn more:",
                    "content": {
                        "articles": [
                            {
                                "title": "Dynamic templates for transactional campaign",
                                "description": "In the Sitecore Send API we use the Mustache templating language to generate and render personalized content based on the data received via the API. This approach allows you to customize the recipient experience by tailoring specific elements, such as text and images, to meet individual preferences and requirements.",
                                "href": "https://doc.sitecore.com/send/en/developers/api-documentation/dynamic-templates-for-transactional-campaign.html",
                                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0SNmmTi0Sa90NKgMc-0_Xn-LupWo9rPIeTQ&s",
                                "tags": [
                                    "documentation",
                                    "official"
                                ]
                            },
                            {
                                "title": "Sitecore Blog by Igor Zharikov",
                                "description": "Stay tuned with latest Sitecore Send news.",
                                "href": "https://www.linkedin.com/in/ihar-zharykau/",
                                "image": "https://media.licdn.com/dms/image/v2/D4D03AQEaJPjE6e8iGA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1673350141031?e=1750291200&v=beta&t=BGLPFQpOrUX6UA9a0N99ucx-Lgq4G_aCl1orQaKK2xY",
                                "tags": [
                                    "blog",
                                    "tech"
                                ]
                            }
                        ]
                    }
                }
            }
        ]
    };

    const response = await send.transactional.sendEmail(request);
    expect(response.Code).toBe(0);
    expect(response.Context?.TotalAccepted).toBeGreaterThan(0);
    expect(response.Context?.TotalExcluded).toBe(0);
});


test('transactional email - manual content - should send successfully', async () => {
    try {
        const request: TransactionalCampaignRequest = {
            Subject: "Hello Sitecore Send Transactional Campaigns!",
            Personalizations: [
                {
                    To: [{
                        Email: testConfig.existingEmail,
                    }],
                },
            ],
            Content: [{
                Type: "text/html",
                Value: "<h1>Hello, World!</h1>"
            }],
            CampaignId: testConfig.transactionalCampaignId,
        };
        const response = await send.transactional.sendEmail(request);
        expect(response.Code).toBe(0);
        expect(response.Context?.TotalAccepted).toBeGreaterThan(0);
        expect(response.Context?.TotalExcluded).toBe(0);
    } catch (e) {
        console.error(e);
        expect(true).toBe(false);
    }
});
