'use strict';

const fs = require('fs');

/**
 * Writes new files as shims for libraries that share interfaces but not code
 * across client platforms.
 *
 * e.g. Making remote server requests requires fetch() for React Native and
 * "node-fetch" in Node.js and "whatwg-fetch" when in a browser.
 */
(() => {
  // We're assuming React Native is the default platform being used
  let platform = (process.argv[2] || 'reactnative').toLowerCase();
  makeShim(platform, 'fetch');
  makeShim(platform, 'storage');
})();

/**
 * @param  {String} platform
 * @param  {String} lib
 */
function makeShim(platform, lib) {
  console.log(`Creating the ${platform} ${lib} shim for the zeit-client-engine`);
  fs.createReadStream(`shims/${lib}.${platform}.js`).pipe(fs.createWriteStream(`${lib}.js`));
}