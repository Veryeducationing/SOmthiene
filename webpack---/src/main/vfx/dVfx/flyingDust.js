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
  _main.fg2.fillStyle = (0, _makeColour.makeColour)(255, 255, 255, 0.7 * ((_vfxQueue.vfxQueue[posInQueue].frames - _vfxQueue.vfxQueue[posInQueue].timer) / _vfxQueue.vfxQueue[posInQueue].frames));
  _main.fg2.beginPath();
  _main.fg2.arc(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], 12 * (_activeStage.activeStage.scale / 4.5), _render.twoPi, 0);
  _main.fg2.fill();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/flyingDust.js
// module id = 203
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/flyingDust.js?