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
  _main.fg2.strokeStyle = (0, _makeColour.makeColour)(99, 100, 255, 0.7 * ((_vfxQueue.vfxQueue[posInQueue].frames - _vfxQueue.vfxQueue[posInQueue].timer) / _vfxQueue.vfxQueue[posInQueue].frames));
  for (var n = 0; n < _vfxQueue.vfxQueue[posInQueue].rings.length; n++) {
    _main.fg2.save();
    _main.fg2.scale(1, 0.25);
    _main.fg2.beginPath();
    _main.fg2.arc(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], (_vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]) * 4, _vfxQueue.vfxQueue[posInQueue].timer * (40 / 8) + n * _activeStage.activeStage.scale, _render.twoPi, 0);
    _main.fg2.lineWidth = 3;
    _main.fg2.stroke();
    _main.fg2.closePath();
    _main.fg2.restore();
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/doubleJumpRings.js
// module id = 194
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/doubleJumpRings.js?