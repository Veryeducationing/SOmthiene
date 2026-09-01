"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGamepad = getGamepad;
var nullGamepad = exports.nullGamepad = { buttons: [], axes: [], id: "null gamepad" };

function getGamepad(j) {
  return navigator.getGamepads ? navigator.getGamepads()[j] : navigator.webkitGetGamepads ? navigator.webkitGetGamepads()[j] : nullGamepad;
}

//////////////////
// WEBPACK FOOTER
// ./src/input/gamepad/gamepad.js
// module id = 248
// module chunks = 1
//# sourceURL=webpack:///./src/input/gamepad/gamepad.js?