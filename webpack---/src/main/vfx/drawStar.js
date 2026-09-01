'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawStar = drawStar;

var _main = __webpack_require__(11);

function drawStar(tX, tY, rMin, rMax) {
  var m = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 4;
  var theta = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  var n = 2 * m;
  _main.fg2.save();
  _main.fg2.translate(tX, tY);
  _main.fg2.beginPath();
  _main.fg2.moveTo(rMax * Math.cos(theta), rMax * Math.sin(theta));
  for (var i = 1; i < n + 1; i++) {
    if (i % 2 === 0) {
      _main.fg2.lineTo(rMax * Math.cos(2 * Math.PI * i / n + theta), rMax * Math.sin(2 * Math.PI * i / n + theta));
    } else {
      _main.fg2.lineTo(rMin * Math.cos(2 * Math.PI * i / n + theta), rMin * Math.sin(2 * Math.PI * i / n + theta));
    }
  }
  _main.fg2.closePath();
  _main.fg2.fill();
  _main.fg2.restore();
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/drawStar.js
// module id = 223
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/drawStar.js?