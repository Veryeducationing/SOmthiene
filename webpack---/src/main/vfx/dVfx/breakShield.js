"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _makeColour = __webpack_require__(15);

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

var _render = __webpack_require__(13);

exports.default = function (posInQueue) {
  _main.fg2.fillStyle = (0, _makeColour.makeColour)(73, 255, 244, 0.9 * ((_vfxQueue.vfxQueue[posInQueue].frames - _vfxQueue.vfxQueue[posInQueue].timer) / _vfxQueue.vfxQueue[posInQueue].frames));
  _main.fg2.beginPath();
  _main.fg2.arc(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + 430, (10 + 3 * _vfxQueue.vfxQueue[posInQueue].timer) * (_activeStage.activeStage.scale / 4.5), _render.twoPi, 0);
  _main.fg2.fill();
  _main.fg2.fillStyle = "#cd8eff";
  for (var k = 0; k < 3; k++) {
    _main.fg2.beginPath();
    _main.fg2.arc(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + 550 + Math.random() * 100, _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + 380 + Math.random() * 100, 8 * (_activeStage.activeStage.scale / 4.5), _render.twoPi, 0);
    _main.fg2.fill();
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/breakShield.js
// module id = 185
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/breakShield.js?