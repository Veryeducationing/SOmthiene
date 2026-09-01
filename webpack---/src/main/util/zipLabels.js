"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipLabels = zipLabels;

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

// zips labelling information onto a list
function zipLabels(list, string) {
  var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (list.length === 0) {
    return [];
  } else {
    var _list = _toArray(list),
        head = _list[0],
        tail = _list.slice(1);

    return [[head, [string, start]]].concat(zipLabels(tail, string, start + 1));
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/main/util/zipLabels.js
// module id = 35
// module chunks = 1
//# sourceURL=webpack:///./src/main/util/zipLabels.js?