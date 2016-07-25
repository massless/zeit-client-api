'use strict';

const fs = require('fs');

/**
 * Writes new files as shims for libraries that share interfaces but not code
 * across client platforms.
 *
 * e.g. Making remote server requests requires fetch() for React Native and
 * "node-fetch" in Node.js and "whatwg-fetch" when in a browser.
 */

/**
 * @param  {String} platform
 */
function makeShims(platform) {
  makeShim(platform, 'fetch');
  makeShim(platform, 'storage');
};

/*
* @param  {String} platform
* @param  {String} lib
*/
function makeShim(platform, lib) {
  console.log(`Creating the ${platform} ${lib} shim for the zeit-client-api`);

  let destFilePath = `${__dirname}/${lib}.js`;
  let sourceFilePath = `${__dirname}/shims/${lib}.${platform}.js`;
  fs.writeFileSync(destFilePath, fs.readFileSync(sourceFilePath));
};

if (!module.parent) {
    // We're assuming Node is the default platform being used
  (() => { makeShims((process.argv[2] || 'node').toLowerCase()); })();
}

module.exports = makeShims;
