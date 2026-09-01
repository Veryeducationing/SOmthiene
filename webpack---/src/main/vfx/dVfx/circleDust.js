"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

var _makeColour = __webpack_require__(15);

var _main = __webpack_require__(11);

var _render = __webpack_require__(13);

exports.default = function (posInQueue) {
  for (var n = 0; n < _vfxQueue.vfxQueue[posInQueue].circles.length; n++) {
    var x = (_vfxQueue.vfxQueue[posInQueue].newPos.x + _vfxQueue.vfxQueue[posInQueue].circles[n] * (1 + _vfxQueue.vfxQueue[posInQueue].timer / _vfxQueue.vfxQueue[posInQueue].frames)) * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0];
    var y = (_vfxQueue.vfxQueue[posInQueue].newPos.y + 4 * (0 + _vfxQueue.vfxQueue[posInQueue].timer / _vfxQueue.vfxQueue[posInQueue].frames)) * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1];
    _main.fg2.fillStyle = (0, _makeColour.makeColour)(255, 255, 255, 0.7 * ((_vfxQueue.vfxQueue[posInQueue].frames - _vfxQueue.vfxQueue[posInQueue].timer) / _vfxQueue.vfxQueue[posInQueue].frames));
    _main.fg2.beginPath();
    _main.fg2.arc(x, y, 12 * (_activeStage.activeStage.scale / 4.5), _render.twoPi, 0);
    _main.fg2.fill();
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/circleDust.js
// module id = 190
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/circleDust.js?