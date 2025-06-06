# Sitecore Send TS Client (Unofficial)

This is a client for the Sitecore Send API.

## !!! WARNING !!!
Please use it only on server side, as API key is exposed to the public otherwise.

## Installation
```
npm install send-client
```

## Usage
```ts
import { SendClient } from 'send-client';

const send = new SendClient({
    apiKey: 'YOUR_API_KEY',
});

const lists = await send.lists.getAll();

const subscribers = await send.subscribers.fromList('LIST_ID');
```
