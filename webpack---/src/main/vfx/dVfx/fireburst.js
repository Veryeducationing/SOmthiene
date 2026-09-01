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
  _main.fg2.strokeStyle = (0, _makeColour.makeColour)(255, 227, 79, 1 - _vfxQueue.vfxQueue[posInQueue].timer / 5);
  _main.fg2.lineWidth = 1;
  _main.fg2.beginPath();
  _main.fg2.arc(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], _vfxQueue.vfxQueue[posInQueue].face * (_vfxQueue.vfxQueue[posInQueue].timer / 5), 0, _render.twoPi);
  _main.fg2.closePath();
  _main.fg2.stroke();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/fireburst.js
// module id = 197
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/fireburst.js?