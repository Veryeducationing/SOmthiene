"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blendColours = blendColours;
function blendColours(start, end, opacity) {
  var blended = [];
  var difference = [];
  for (var i = 0; i < 3; i++) {
    start[i] = parseInt(start[i]);
    difference[i] = end[i] - start[i];
    blended[i] = start[i] + difference[i] * opacity;
  }
  return [Math.floor(blended[0]), Math.floor(blended[1]), Math.floor(blended[2])];
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/blendColours.js
// module id = 17
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/blendColours.js?