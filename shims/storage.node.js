'use strict';

let LocalStorage = require( 'node-localstorage').LocalStorage;
let localStorage = new LocalStorage('.zeit-localstorage');

module.exports = {
  getItem: (name) => {
    return new Promise(resolve => {
      resolve(localStorage.getItem(name));
    });
  },
  setItem: (name, value) => {
    return new Promise(resolve => {
      resolve(localStorage.setItem(name, value));
    });
  },
  removeItem: (name) => {
    return new Promise(resolve => {
      resolve(localStorage.removeItem(name));
    });
  },
  clearAll: () => {
    return new Promise(resolve => {
      resolve(localStorage.clear());
    });
  }
};
