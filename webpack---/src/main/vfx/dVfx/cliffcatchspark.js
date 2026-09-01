"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

var _render = __webpack_require__(13);

exports.default = function (posInQueue) {
  _main.fg2.save();
  _main.fg2.strokeStyle = "rgb(47, 194, 214)";
  _main.fg2.lineWidth = 10 - _vfxQueue.vfxQueue[posInQueue].timer / 3;
  _main.fg2.beginPath();
  _main.fg2.arc(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], (12 * (_vfxQueue.vfxQueue[posInQueue].timer / _vfxQueue.vfxQueue[posInQueue].frames) + 3) * (_activeStage.activeStage.scale / 4.5), _render.twoPi, 0);
  _main.fg2.stroke();
  _main.fg2.restore();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/cliffcatchspark.js
// module id = 192
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/cliffcatchspark.js?