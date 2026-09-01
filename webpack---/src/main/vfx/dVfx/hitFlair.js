"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vfxQueue = __webpack_require__(183);

var _makeColour = __webpack_require__(15);

var _activeStage = __webpack_require__(18);

var _main = __webpack_require__(11);

var _render = __webpack_require__(13);

exports.default = function (posInQueue) {
  var x = _vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0];
  var y = _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1];
  _main.fg2.strokeStyle = (0, _makeColour.makeColour)(146, 217, 164, 0.7 * ((_vfxQueue.vfxQueue[posInQueue].frames - _vfxQueue.vfxQueue[posInQueue].timer) / _vfxQueue.vfxQueue[posInQueue].frames));
  _main.fg2.lineWidth = 5;
  _main.fg2.beginPath();
  _main.fg2.arc(x, y, 15, _render.twoPi, 0);
  _main.fg2.closePath();
  _main.fg2.stroke();
  _main.fg2.lineWidth = 1;
  _main.fg2.fillStyle = (0, _makeColour.makeColour)(146, 217, 164, 0.8 * ((_vfxQueue.vfxQueue[posInQueue].frames - _vfxQueue.vfxQueue[posInQueue].timer) / _vfxQueue.vfxQueue[posInQueue].frames));
  _main.fg2.beginPath();
  _main.fg2.moveTo(x + 3, y - 3);
  _main.fg2.lineTo(x + 30, y);
  _main.fg2.lineTo(x + 3, y + 3);
  _main.fg2.lineTo(x, y + 30);
  _main.fg2.lineTo(x - 3, y + 3);
  _main.fg2.lineTo(x - 30, y);
  _main.fg2.lineTo(x - 3, y - 3);
  _main.fg2.lineTo(x, y - 30);
  _main.fg2.closePath();
  _main.fg2.fill();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/hitFlair.js
// module id = 206
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/hitFlair.js?