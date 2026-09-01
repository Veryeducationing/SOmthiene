'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawHexagon = drawHexagon;

var _main = __webpack_require__(11);

function drawHexagon(r, tX, tY, width) {
  _main.fg2.save();
  _main.fg2.translate(tX, tY);
  var a = r * Math.sin(Math.PI / 6);
  var b = r * Math.cos(Math.PI / 6);
  _main.fg2.beginPath();
  _main.fg2.moveTo(0, r);
  _main.fg2.lineTo(b, r - a);
  _main.fg2.lineTo(b, -r + a);
  _main.fg2.lineTo(0, -r);
  _main.fg2.lineTo(-b, -r + a);
  _main.fg2.lineTo(-b, r - a);
  _main.fg2.lineTo(0, r);
  var rs = r - width;
  a = rs * Math.sin(Math.PI / 6);
  b = rs * Math.cos(Math.PI / 6);
  _main.fg2.moveTo(0, rs);
  _main.fg2.lineTo(-b, rs - a);
  _main.fg2.lineTo(-b, -rs + a);
  _main.fg2.lineTo(0, -rs);
  _main.fg2.lineTo(b, -rs + a);
  _main.fg2.lineTo(b, rs - a);
  _main.fg2.lineTo(0, rs);
  _main.fg2.closePath();
  _main.fg2.fill();
  _main.fg2.restore();
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/drawHexagon.js
// module id = 220
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/drawHexagon.js?