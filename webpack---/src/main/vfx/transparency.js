"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransparency = getTransparency;
exports.toggleTransparency = toggleTransparency;
var transparency = exports.transparency = true;

function getTransparency() {
  return transparency;
}
function toggleTransparency() {
  exports.transparency = transparency = !transparency;
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/transparency.js
// module id = 16
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/transparency.js?