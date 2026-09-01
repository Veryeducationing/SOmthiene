"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.deepCopyObject = deepCopyObject;
exports.deepCopyArray = deepCopyArray;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*eslint-disable */

function deepCopyObject(deep, object) {
  var exclusionList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (deep) {
    var result = {};
    for (var key in object) {
      // if (object.hasOwnProperty(key)) {
      if (object[key] === null || exclusionList.indexOf(key) !== -1) {
        result[key] = object[key];
      } else if (Array.isArray(object[key])) {
        result[key] = deepCopyArray(deep, object[key], exclusionList);
      } else if (_typeof(object[key]) === "object") {
        result[key] = deepCopyObject(deep, object[key], exclusionList);
      } else {
        result[key] = object[key];
      }
    }
    return result;
  } else {
    return Object.assign({}, object);
  }
};

function deepCopyArray(deep, array, exclusionList) {
  if (deep) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i] === null || exclusionList && exclusionList.indexOf(i) !== -1) {
        result[i] = array[i];
      } else if (Array.isArray(array[i])) {
        result[i] = deepCopyArray(deep, array[i], exclusionList);
      } else if (_typeof(array[i]) === "object") {
        result[i] = deepCopyObject(deep, array[i], exclusionList);
      } else {
        result[i] = array[i];
      }
    }
    result.length = array.length;
    return result;
  } else {
    return Object.assign.apply(Object, [{}].concat(_toConsumableArray(array)));
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/main/util/deepCopy.js
// module id = 85
// module chunks = 1
//# sourceURL=webpack:///./src/main/util/deepCopy.js?