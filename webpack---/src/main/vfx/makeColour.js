"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeColour = makeColour;
exports.unmakeColour = unmakeColour;

var _transparency = __webpack_require__(16);

function makeColour(r, g, b, a) {
  // maybe some hsl too
  if ((0, _transparency.getTransparency)()) {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  } else {
    return "rgb(" + r + "," + g + "," + b + ")";
  }
}

function unmakeColour(string) {
  var regexp = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
  var list = regexp.exec(string);
  return { r: parseInt(list[1]) || 0, g: parseInt(list[2]) || 0, b: parseInt(list[3]) || 0, a: parseFloat(list[4]) || 1 };
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/makeColour.js
// module id = 15
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/makeColour.js?