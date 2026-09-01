"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _makeColour = __webpack_require__(15);

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

exports.default = function (posInQueue) {
  _main.fg2.save();
  _main.fg2.strokeStyle = (0, _makeColour.makeColour)(251, 246, 119, 0.3 * ((_vfxQueue.vfxQueue[posInQueue].frames - _vfxQueue.vfxQueue[posInQueue].timer) / _vfxQueue.vfxQueue[posInQueue].frames) + 0.7);
  _main.fg2.fillStyle = (0, _makeColour.makeColour)(255, 116, 92, 0.3 * ((_vfxQueue.vfxQueue[posInQueue].frames - _vfxQueue.vfxQueue[posInQueue].timer) / _vfxQueue.vfxQueue[posInQueue].frames) + 0.7);
  _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
  _main.fg2.lineWidth = 3;
  _main.fg2.scale(Math.min(0.2 * _vfxQueue.vfxQueue[posInQueue].timer, 1), Math.min(0.2 * _vfxQueue.vfxQueue[posInQueue].timer, 1));
  _main.fg2.rotate(_vfxQueue.vfxQueue[posInQueue].timer * Math.PI / 8);
  for (var i = 0; i < 4; i++) {
    _main.fg2.scale(0.7 + Math.random() * 0.6, 0.7 + Math.random() * 0.6);
    _main.fg2.rotate(i * Math.PI / 2);
    _main.fg2.beginPath();
    _main.fg2.arc(0, 0, 10 * (_activeStage.activeStage.scale / 4.5), 1.35 * Math.PI, 1.65 * Math.PI);
    _main.fg2.closePath();
    _main.fg2.stroke();
    _main.fg2.beginPath();
    _main.fg2.arc(0, 0, 15 * (_activeStage.activeStage.scale / 4.5), 1.35 * Math.PI, 1.65 * Math.PI);
    _main.fg2.closePath();
    _main.fg2.stroke();
    _main.fg2.beginPath();
    _main.fg2.arc(0, 0, 20 * (_activeStage.activeStage.scale / 4.5), 1.35 * Math.PI, 1.65 * Math.PI);
    _main.fg2.closePath();
    _main.fg2.stroke();
    _main.fg2.beginPath();
    _main.fg2.arc(0, 0, 23 * (_activeStage.activeStage.scale / 4.5), 1.35 * Math.PI, 1.65 * Math.PI);
    _main.fg2.closePath();
    _main.fg2.fill();
  }
  _main.fg2.restore();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/tech.js
// module id = 235
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/tech.js?