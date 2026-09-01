"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lines = lines;

var _Vec2D = __webpack_require__(22);

var _drawVfx = __webpack_require__(134);

function lines(additionalProps, pos, n, minAngle, maxAngle, c) {
  for (var i = 0; i < n; i++) {
    var theta = c === 1 ? Math.random() * (maxAngle - minAngle) + minAngle : powWithSign(Math.random() * 2 - 1, c) * 0.5 * (maxAngle - minAngle) + 0.5 * (minAngle + maxAngle);
    var offset = Math.random();
    (0, _drawVfx.drawVfx)(Object.assign({ timer: 0, pos: pos, face: 0, direction: new _Vec2D.Vec2D(Math.cos(theta), Math.sin(theta)), offset: offset }, additionalProps));
  }
}

function powWithSign(x, d) {
  return x < 0 ? -Math.pow(-x, d) : Math.pow(x, d);
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/lines.js
// module id = 212
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/lines.js?