"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vfxQueue = __webpack_require__(183);

var _main = __webpack_require__(11);

var _drawHexagon = __webpack_require__(220);

var _activeStage = __webpack_require__(18);

exports.default = function (posInQueue) {
  _main.fg2.save();
  var part = Math.round(_vfxQueue.vfxQueue[posInQueue].timer / 2);
  var tX = _main.player[_vfxQueue.vfxQueue[posInQueue].face].phys.pos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0];
  var tY = (_main.player[_vfxQueue.vfxQueue[posInQueue].face].phys.pos.y + 6) * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1];
  part = Math.round(_main.player[_vfxQueue.vfxQueue[posInQueue].face].shineLoop / 2);
  _main.fg2.globalCompositeOperation = "screen";
  if (part === 1) {
    _main.fg2.fillStyle = "rgb(0, 0, 229)";
    (0, _drawHexagon.drawHexagon)(3.5 * _activeStage.activeStage.scale, tX, tY, 7);
    _main.fg2.fillStyle = "rgb(0, 189, 0)";
    (0, _drawHexagon.drawHexagon)(4 * _activeStage.activeStage.scale, tX, tY, 7);
    _main.fg2.fillStyle = "rgb(52, 0, 0)";
    (0, _drawHexagon.drawHexagon)(4.5 * _activeStage.activeStage.scale, tX, tY, 7);
  } else if (part === 2) {
    _main.fg2.fillStyle = "rgb(0, 0, 229)";
    (0, _drawHexagon.drawHexagon)(5.5 * _activeStage.activeStage.scale, tX, tY, 11);
    _main.fg2.fillStyle = "rgb(0, 189, 0)";
    (0, _drawHexagon.drawHexagon)(6 * _activeStage.activeStage.scale, tX, tY, 11);
    _main.fg2.fillStyle = "rgb(52, 0, 0)";
    (0, _drawHexagon.drawHexagon)(6.5 * _activeStage.activeStage.scale, tX, tY, 11);
  } else if (part === 3) {
    _main.fg2.fillStyle = "rgb(0, 0, 229)";
    (0, _drawHexagon.drawHexagon)(7.5 * _activeStage.activeStage.scale, tX, tY, 15);
    _main.fg2.fillStyle = "rgb(0, 189, 0)";
    (0, _drawHexagon.drawHexagon)(8 * _activeStage.activeStage.scale, tX, tY, 15);
    _main.fg2.fillStyle = "rgb(52, 0, 0)";
    (0, _drawHexagon.drawHexagon)(8.5 * _activeStage.activeStage.scale, tX, tY, 15);
  } else {
    console.log(_vfxQueue.vfxQueue[posInQueue].face);
  }
  _main.fg2.restore();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/shineloop.js
// module id = 224
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/shineloop.js?