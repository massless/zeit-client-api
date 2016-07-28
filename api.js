'use strict';

const Cache = require('./cache');
const now = require('./requests').now;

let API = {
  /**
   * @param  {String} deployId
   * @param  {String} alias
   * @return {Promise<Object, Object>}
   */
  alias: (deployId, alias) => now(`deployments/${deployId}/aliases`, {
    method: 'POST',
    body: JSON.stringify({alias: alias})
  }),

  /** @return {Promise<Array, Object>} */
  aliases: () => now('aliases').then(data => data && data.aliases || []),

  /**
   * @param  {String} aliasId
   * @return {Promise<Object, Object>}
   */
  deleteAlias: aliasId => now(`aliases/${aliasId}`, {method: 'DELETE'}),

  /**
   * @param  {Object} contents
   * @return {Promise<Object, Object>}
   */
  deploy: contents => now('deployments', {
    method: 'POST',
    body: JSON.stringify(contents)
  }),

  /** @return {Promise<Array, Object>} */
  deployments: () => now('deployments').then(data => data && data.deployments || []),

  /**
   * @param  {String} deployId
   * @return {Promise<Object, Object>}
   */
  deployment: deployId => now(`deployments/${deployId}`),

  /**
   * @param  {String} deployId
   * @return {Promise<Object, Object>}
   */
  deleteDeployment: deployId => now(`deployments/${deployId}`, {method: 'DELETE'}),

  /**
   * @param  {String} deployId
   * @param  {String} fileId
   * @return {Promise<Object, Object>}
   */
  file: (deployId, fileId) => now(`deployments/${deployId}/files/${fileId}`),

  /**
   * @param  {String} deployId
   * @return {Promise<Array, Object>}
   */
  files: deployId => now(`deployments/${deployId}/files`),

  /** @return {Promise<Boolean, Object>} */
  ok: () => now('aliases').then(() => true),

  /**
   * @param  {String} token
   * @return {Object} the API itself
   */
  setToken: token => {
    // Guarantee that the token is set before moving on.
    (function* setToken() {
      yield Cache.set(Cache.TOKEN, token);
    })().next();

    return API;
  }
}

API.RESPONSE_STATUS = {
  SUCCESS: 'SUCCESS'
};

API.DEPLOY_STATUS = {
  BOOTED: 'BOOTED',
  BOOTING: 'BOOTING',
  DELETED: 'DELETED',
  READY: 'READY',
  FROZEN: 'FROZEN'
};

module.exports = API;
