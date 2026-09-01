"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _makeColour = __webpack_require__(15);

var _main = __webpack_require__(11);

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

var _render = __webpack_require__(13);

exports.default = function (posInQueue) {
  _main.fg2.save();
  var col = (0, _makeColour.makeColour)(255, 255, 255, 0.8);
  _main.fg2.fillStyle = col;
  _main.fg2.strokeStyle = col;
  _main.fg2.lineWidth = 3;
  _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
  _main.fg2.beginPath();
  _main.fg2.arc(0, 0, _vfxQueue.vfxQueue[posInQueue].timer * 2, 0, _render.twoPi);
  _main.fg2.closePath;
  _main.fg2.stroke();
  _main.fg2.scale(_activeStage.activeStage.scale / 4.5, _activeStage.activeStage.scale / 4.5);
  for (var i = 0; i < 6; i++) {
    _main.fg2.rotate(Math.PI / 3);
    _main.fg2.beginPath();
    _main.fg2.moveTo(0, -14 - _vfxQueue.vfxQueue[posInQueue].timer * 2);
    _main.fg2.lineTo(6, -22 - _vfxQueue.vfxQueue[posInQueue].timer * 2);
    _main.fg2.lineTo(0, -40 - _vfxQueue.vfxQueue[posInQueue].timer * 2);
    _main.fg2.lineTo(-6, -22 - _vfxQueue.vfxQueue[posInQueue].timer * 2);
    _main.fg2.closePath();
    _main.fg2.fill();
  }
  if (_main.holiday === 1) {
    _main.fg2.lineWidth = 1;
    _main.fg2.strokeStyle = "rgba(255,255,255,0.4)";
    _main.fg2.beginPath();
    _main.fg2.moveTo(0, -_vfxQueue.vfxQueue[posInQueue].timer * 100);
    _main.fg2.lineTo(0, -1250);
    _main.fg2.closePath();
    _main.fg2.stroke();
  }
  _main.fg2.restore();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/targetDestroy.js
// module id = 234
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/targetDestroy.js?