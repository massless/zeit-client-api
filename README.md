# zeit-client-api

A library for easily sharing code among Zeit clients written in Javascript.

> Zeit is a company making `now()` – which deploys Node.js cloud apps very easily. See [zeit.co] for more information about it.

## Install for Node
```sh
npm install --save zeit-client-api
npm explore zeit-client-api -- npm run start node
```
## Install for React Native
```sh
npm install --save zeit-client-api
npm explore zeit-client-api -- npm run start reactnative
```
## Multiple platform support because...
Universal / isomorphic apps are amazing! So this API is built so that it's easy to maintain going forward. To this end it generates the appropriate dependencies for each major platform. For example, if ```reactnative``` is requested then this will use [React Native's fetch] instead of [node-fetch].

It also relies on local storage to store the API token.

## Usage

```js
const Zeit = require('zeit-client-api');

Zeit.API.setToken(YOUR_ZEIT_TOKEN)
        .deployments()
        .then(console.log.bind(console))
        .catch(console.error);
```

## API Examples
All methods return Promises.

```js
Zeit.API.setToken(TOKEN).aliases();
```

```js
Zeit.API.setToken(TOKEN).deployments();
```

```js
Zeit.API.setToken(TOKEN).deployment(DEPLOY_ID);
```
```js
Zeit.API.setToken(TOKEN).deleteDeployment(DEPLOY_ID);
```
```js
Zeit.API.setToken(TOKEN).files(DEPLOY_ID);
```
```js
# A brief example of how to deploy to Zeit.
const DEPLOY_CONTENTS = {
    package: {
    name: DEPLOY_NAME,
    scripts: { start: 'node index' }
  },
  'index.js':
    'require("http").Server((req, res) => {' +
      'res.end("zeit-client-api-test");' +
    '}).listen();'
};
Zeit.API.setToken(TOKEN).deploy(DEPLOY_CONTENTS);
```

## Testing
If you're using it as a module and want to run the tests, try this:
```sh
TOKEN=[token] npm explore zeit-client-api -- npm test
```

> Tests only use the Node.JS shims for now.

## License

Code released under the [MIT license]. © Contributors

[zeit.co]: <https://zeit.co/>
[node-fetch]: <https://www.npmjs.com/package/node-fetch>
[React Native's fetch]: <https://facebook.github.io/react-native/docs/network.html>
[MIT license]: <https://github.com/massless/zeit-client-api/blob/master/LICENSE>
