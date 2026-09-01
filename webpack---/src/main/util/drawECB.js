"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawECB = drawECB;

var _main = __webpack_require__(11);

var _activeStage = __webpack_require__(18);

var _Vec2D = __webpack_require__(22);

function drawECB(ecb, color) {
  _main.fg2.strokeStyle = color;
  _main.fg2.lineWidth = 1;
  _main.fg2.beginPath();
  _main.fg2.moveTo(ecb[0].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], ecb[0].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
  _main.fg2.lineTo(ecb[1].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], ecb[1].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
  _main.fg2.lineTo(ecb[2].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], ecb[2].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
  _main.fg2.lineTo(ecb[3].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], ecb[3].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
  _main.fg2.closePath();
  _main.fg2.stroke();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/util/drawECB.js
// module id = 36
// module chunks = 1
//# sourceURL=webpack:///./src/main/util/drawECB.js?