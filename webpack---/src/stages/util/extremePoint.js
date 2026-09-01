"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extremePoint = extremePoint;

var _Vec2D = __webpack_require__(22);

function extremePoint(wall, extreme) {
  var v1 = wall[0];
  var v2 = wall[1];
  switch (extreme) {
    case "u":
    case "t":
      if (v2.y < v1.y) {
        return v1;
      } else {
        return v2;
      }
    case "d":
    case "b":
      if (v2.y > v1.y) {
        return v1;
      } else {
        return v2;
      }
    case "l":
      if (v2.x > v1.x) {
        return v1;
      } else {
        return v2;
      }
    case "r":
      if (v2.x < v1.x) {
        return v1;
      } else {
        return v2;
      }
    default:
      console.log("error in 'extremePoint': invalid parameter " + extreme + ", not up/top/down/bottom/left/right");
      return v1; // just to make the type checker happy
  }
}

;

//////////////////
// WEBPACK FOOTER
// ./src/stages/util/extremePoint.js
// module id = 33
// module chunks = 1
//# sourceURL=webpack:///./src/stages/util/extremePoint.js?