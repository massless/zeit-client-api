# zeit-client-engine

A library for easily sharing code among Zeit clients written in Javascript.

> Zeit is a service that makes cloud software much easier to develop. See [zeit.co] for more information about Zeit.

## Install

```sh
npm install --save zeit-client-api
```
## Run

```sh
npm run start
```

#### Arguments

- `browser`: for client-side JS libraries
- `node`: for Node.JS libraries
- `reactnative`: for React Native libraries

For example:
```sh
npm run start reactnative
```

This will generate new platform-appropriate files at the root level that are imported to the zeit libraries.

## Usage
First, ```npm run start [platform]``` then use this library to help build your client.
```js
import { API } from '@massless/zeit-client-engine';

API.setToken(YOUR_ZEIT_TOKEN)
   .deployments()
   .then(console.log.bind(console))
   .catch(console.error);
```

## Testing

```sh
TOKEN=[token] npm test
```

> Tests only use the Node.JS shims for now.

## License

ISC © Contributors

[zeit.co]: <https://zeit.co/>
