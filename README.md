# zeit-client-api

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
import { API } from 'zeit-client-api';

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

Code released under the [MIT license](https://github.com/massless/zeit-client-api/blob/master/LICENSE). © Contributors

[zeit.co]: <https://zeit.co/>
