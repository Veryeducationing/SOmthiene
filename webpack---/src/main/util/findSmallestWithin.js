"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findSmallestWithin = findSmallestWithin;
exports.pickSmallestSweep = pickSmallestSweep;

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

// finds the smallest value t of the list with t > min, t <= max
function findSmallestWithin(list, min, max) {
  var smallestSoFar = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  if (list.length < 1) {
    return smallestSoFar;
  } else {
    var _list = _toArray(list),
        head = _list[0],
        tail = _list.slice(1);

    if (head === null) {
      return findSmallestWithin(tail, min, max, smallestSoFar);
    } else if (head >= min && head <= max) {
      if (smallestSoFar === null) {
        return findSmallestWithin(tail, min, max, head);
      } else if (head > smallestSoFar) {
        return findSmallestWithin(tail, min, max, smallestSoFar);
      } else {
        return findSmallestWithin(tail, min, max, head);
      }
    } else {
      return findSmallestWithin(tail, min, max, smallestSoFar);
    }
  }
}

;

// finds the object with smallest sweeping parameter
function pickSmallestSweep(list) {
  var smallestSoFar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (list.length < 1) {
    return smallestSoFar;
  } else {
    var _list2 = _toArray(list),
        head = _list2[0],
        tail = _list2.slice(1);

    if (head === null) {
      return pickSmallestSweep(tail, smallestSoFar);
    } else {
      if (smallestSoFar === null || head.sweep < smallestSoFar.sweep) {
        return pickSmallestSweep(tail, head);
      } else {
        return pickSmallestSweep(tail, smallestSoFar);
      }
    }
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/main/util/findSmallestWithin.js
// module id = 30
// module chunks = 1
//# sourceURL=webpack:///./src/main/util/findSmallestWithin.js?