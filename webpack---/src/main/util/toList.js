"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toList = toList;

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

// temporary workaround for custom stage data being objects and not arrays
function toList(list) {
  if (list.length === 0) {
    return [];
  } else {
    var _list = _toArray(list),
        head = _list[0],
        tail = _list.slice(1);

    return [head].concat(toList(tail));
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/main/util/toList.js
// module id = 260
// module chunks = 1
//# sourceURL=webpack:///./src/main/util/toList.js?