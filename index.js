const createShimsForPlatform = require('./shims.js');

/**
 * @param  {String} platform e.g. 'node' or 'reactnative' or 'browser`'
 * @return {Object}
 */
module.exports = platform => {
  createShimsForPlatform(platform);

  return {
    API: require('./api.js'),
    Cache: require('./cache.js')
  };
};