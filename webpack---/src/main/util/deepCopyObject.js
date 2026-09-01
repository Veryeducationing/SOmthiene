'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.deepObjectMerge = deepObjectMerge;
// warning: this function is currently buggy and does not properly deep copy objects...
// use `deepCopy` instead wherever possible
function deepObjectMerge(deep, target, object, exclusionList) {
  // warning: this function is currently buggy and does not properly deep copy objects...
  // use `deepCopy` instead wherever possible

  if (deep) {
    var result = target;
    result = result || {};

    for (var i = 2; i < arguments.length; i++) {
      var obj = arguments[i];

      if (arguments.length === 3 && obj instanceof Array) {
        result = [];
      }

      if (!obj) continue;

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (_typeof(obj[key]) === 'object' && exclusionList && exclusionList.indexOf(key) === -1) result[key] = deepObjectMerge(deep, result[key], obj[key]);else result[key] = obj[key];
        }
      }
    }

    return result;
  } else {
    return Object.assign(target, object);
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/main/util/deepCopyObject.js
// module id = 67
// module chunks = 1
//# sourceURL=webpack:///./src/main/util/deepCopyObject.js?