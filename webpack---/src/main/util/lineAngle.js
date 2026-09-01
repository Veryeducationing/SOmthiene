"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lineAngle = lineAngle;

var _Vec2D = __webpack_require__(22);

function lineAngle(line) {
  // returns angle of line from the positive x axis, in radians, from 0 to pi
  var v1 = line[0];
  var v2 = line[1];
  var theta = Math.atan2(v2.y - v1.y, v2.x - v1.x);
  if (theta < 0) {
    return theta + Math.PI;
  } else {
    return theta;
  }
}

;

//////////////////
// WEBPACK FOOTER
// ./src/main/util/lineAngle.js
// module id = 32
// module chunks = 1
//# sourceURL=webpack:///./src/main/util/lineAngle.js?