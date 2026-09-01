'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepValue = deepValue;
function deepValue(obj, path) {
  var val = obj;
  var accessors = path.split('.');
  for (var i = 0; i < accessors.length && val !== undefined; i++) {
    val = val[accessors[i]];
  }
  return val;
};

//////////////////
// WEBPACK FOOTER
// ./src/main/util/deepValue.js
// module id = 131
// module chunks = 1
//# sourceURL=webpack:///./src/main/util/deepValue.js?