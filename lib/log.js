/*jshint -W032 */
;
/*jshint +W032 */
(function(root, factory) {
  /* istanbul ignore next */
  if (typeof define === 'function') {
    define(['ajaxer'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('ajaxer'));
  } else {
    root.log = factory(root.ajaxer);
  }
}(this, function(ajaxer) {
  var
    formatDataToSent = function(type, obj) {
      return JSON.strigify({
        "type": type,
        "time": Date.now(),
        "content": obj
      });
    };

  return {
    config: function(configObject) {
      this.logLocation = configObject.location;
    },
    send: function(type, obj) {
      ajaxer.post(this.logLocation, formatDataToSent(type, obj))
    },
    error: function(obj) {
      this.send("error", obj);
    },
    fail: function(obj) {
      this.send("critical fail", obj);
    }
  };
}));
