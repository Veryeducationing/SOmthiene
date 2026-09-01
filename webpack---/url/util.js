'use strict';

module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


//////////////////
// WEBPACK FOOTER
// ./~/url/util.js
// module id = 100
// module chunks = 1
//# sourceURL=webpack:///./~/url/util.js?