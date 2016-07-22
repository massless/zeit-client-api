const AsyncStorage = require('./storage');

var cache = {
  TOKEN: 'token',

  get: function(name, opt_parser) {
    // Then check local storage
    return AsyncStorage.getItem(name).then((data) => {
      // Then see if we can make an object, fallback to string
      try {
        data = JSON.parse(data);
      } catch(e) {
        // Debug here if you want, but this fallback is by design.
      }
      if (opt_parser) return opt_parser(data);
      return data;
    });
  },

  set: function(name, value) {
    // Then try to force objects to strings
    try {
      if (typeof value === "string") {
        value = JSON.stringify(value);
      }
    } catch(e) {
      // TODO: when debugging, show an error
    }

    // Lastly, we send it to local storage
    return AsyncStorage.setItem(name, value);
  },

  delete: function(name) {
    return AsyncStorage.removeItem(name);
  },

  clearAll: function() {
    return AsyncStorage.clear();
  }
};

module.exports = cache;

