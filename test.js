'use strict';

import API from './api';
import test from 'ava';

test.before(t => {
  console.log("Starting tests...");
  t.truthy(TOKEN, "Zeit token is missing. Make sure you run `TOKEN=[token] npm test`");
});

test.serial('deploy', t => {
  t.plan(3);

  return deploy().then(data => {
    t.truthy(data.uid);
    t.truthy(data.host);
    t.truthy(data.state);
  }).catch(e => error(e, t));
});

test('aliases', t => {
  t.plan(1);

  return API.setToken(TOKEN)
            .aliases()
            .then(data => t.true(Array.isArray(data)))
            .catch(e => error(e, t));
});

test('deployments', t => {
  t.plan(1);

  return API.setToken(TOKEN)
            .deployments()
            .then(data => t.true(data.length > 0))
            .catch(e => error(e, t));
});

test('deployment', t => {
  t.plan(1);

  return API.setToken(TOKEN)
            .deployment(DEPLOY_ID)
            .then(data => t.is(data.uid, DEPLOY_ID))
            .catch(e => error(e, t));
});

test('files', t => {
  t.plan(1);

  return API.setToken(TOKEN)
            .files(DEPLOY_ID)
            .then(data => t.is(data.length, 2))
            .catch(e => error(e, t));
});

test('file', t => {
  t.plan(1);

  return getFileIdByName('package.json')
    .then(fileId => API.setToken(TOKEN).file(DEPLOY_ID, fileId))
    .then(data => t.is(data.name, DEPLOY_NAME))
    .catch(e => error(e, t));
});

test.after('delete deployment', t => {
  t.plan(1);

  return API.setToken(TOKEN)
            .deleteDeployment(DEPLOY_ID)
            .then(data => t.is(data.state, API.DEPLOY_STATUS.DELETED))
            .catch(e => error(e, t));
});

test('ok', t => {
  t.plan(1);

  return API.setToken(TOKEN)
            .ok()
            .then(ok => t.true(ok))
            .catch(e => error(e, t));
});

/**
 * ----- HELPERS -----
 */

const TOKEN = process.env.TOKEN;
const DEPLOY_NAME = "zeit-client-engine-test";
const DEPLOY_CONTENTS = {
    package: {
    name: DEPLOY_NAME,
    scripts: { start: 'node index' }
  },
  'index.js':
    'require("http").Server((req, res) => {' +
      'res.end("zeit-client-engine-test");' +
    '}).listen();'
};
let DEPLOY_ID = null;

function deploy() {
  return API.setToken(TOKEN)
            .deploy(DEPLOY_CONTENTS)
            .then(data => {
              DEPLOY_ID = data && data.uid || null;
              return data;
            });
}

/**
 * @param  {Error} e
 * @param  {Object} t test
 */
function error(e, t) {
  t.fail(e.toString());
}

/**
 * @param  {String} fileName
 * @return {Promise}
 */
function getFileIdByName(fileName) {
  return API.setToken(TOKEN)
            .files(DEPLOY_ID)
            .then(files => getFileByName(files, fileName).uid);
}

/**
 * @param  {Array.<Object>} files
 * @param  {String} fileName
 * @return {Promise}
 */
function getFileByName(files, fileName) {
  if (!files || !files.length) return null;
  return files.filter(file => file.name === fileName)[0];
}
