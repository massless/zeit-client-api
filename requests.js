'use strict';

const fetch = require('./fetch');
const Cache = require('./cache');
const NOW_API_URL = "https://api.zeit.co/now/";

class NowRequest {
  /** @return {Promise} */
  constructor(path, options) {
    return Cache.get(Cache.TOKEN).then(token => {
      if (!token) throw "Can't make now() request without a token.";
      this.path = path;
      this.options = options || {method: 'GET'};
      this.token = token;
      return this.fetch();
    });
  }

  /** @return {Promise} */
  fetch() {
    return fetch(this.url(),
                 this.fetchOptions())
              .then(this.fetched.bind(this));
  }

  /**
   * @param  {Object} response
   * @return {Object}
   */
  fetched(response) {
    return response.text()
            .then(text => JSON.parse(text))
            .catch(err => {err: err});
  }

  /** @return {Object} */
  fetchOptions() {
    let authOptions = {
      headers: {'Authorization': 'Bearer ' + this.token}
    };

    if (this.options.method === 'POST') {
      authOptions.headers['Content-Type'] = 'application/json';
    }

    return Object.assign(authOptions, this.options);
  }

  /** @return {String} */
  url() {
    return NOW_API_URL + this.path;
  }
}

/**
 * @param  {String} path
 * @param  {Object} options
 * @return {Promise}
 */
function now(path, options) {
  return new NowRequest(path, options);
}

module.exports.now = now;
