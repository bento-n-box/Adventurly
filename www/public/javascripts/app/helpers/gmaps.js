// Google Maps API

define(['config'], function(config) {
  function ApiManager() {
    this.loadGapi();
  }

  _.extend(ApiManager.prototype, Backbone.Events);

  ApiManager.prototype.init = function() {
  };

  ApiManager.prototype.loadGapi = function() {
  };

  Backbone.sync = function(method, model, options) {
    options || (options = {});

    switch (method) {
      case 'create':
      break;

      case 'update':
      break;

      case 'delete':
      break;

      case 'read':
      break;
    }
  };

  return ApiManager;
});