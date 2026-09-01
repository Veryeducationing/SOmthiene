"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vfxQueue = __webpack_require__(183);

var _main = __webpack_require__(11);

var _makeColour = __webpack_require__(15);

var _activeStage = __webpack_require__(18);

exports.default = function (posInQueue) {
  if (_vfxQueue.vfxQueue[posInQueue].timer % 2) {
    _main.fg2.save();
    _main.fg2.fillStyle = (0, _makeColour.makeColour)(255, 255, 255, 0.3);
    _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
    var seed = (Math.random() + 1.5) * (_activeStage.activeStage.scale / 4.5);
    _main.fg2.scale(seed, seed);
    for (var i = 0; i < 6; i++) {
      _main.fg2.rotate(Math.PI / 3);
      _main.fg2.beginPath();
      _main.fg2.moveTo(0, -15);
      _main.fg2.lineTo(6, -23);
      _main.fg2.lineTo(0, -40);
      _main.fg2.lineTo(-6, -23);
      _main.fg2.closePath();
      _main.fg2.fill();
    }
    _main.fg2.restore();
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/powershield.js
// module id = 216
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/powershield.js?