"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

var _makeColour = __webpack_require__(15);

var _drawArrayPath = __webpack_require__(184);

var _main = __webpack_require__(11);

var _render = __webpack_require__(13);

exports.default = function (posInQueue) {
  _main.fg2.save();
  _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
  _main.fg2.rotate(_vfxQueue.vfxQueue[posInQueue].face * Math.PI / 180);
  var col = (0, _makeColour.makeColour)(149, 255, 163, 0.8 * ((_vfxQueue.vfxQueue[posInQueue].frames - _vfxQueue.vfxQueue[posInQueue].timer) / _vfxQueue.vfxQueue[posInQueue].frames));
  (0, _drawArrayPath.drawArrayPath)(_main.fg2, col, 1, 0, -200 - (20 + 100 * (_vfxQueue.vfxQueue[posInQueue].timer / 20)), _vfxQueue.vfxQueue[posInQueue].path1, 1.3, 1.3);
  if (_vfxQueue.vfxQueue[posInQueue].timer >= _vfxQueue.vfxQueue[posInQueue].svg2Active[0] && _vfxQueue.vfxQueue[posInQueue].timer <= _vfxQueue.vfxQueue[posInQueue].svg2Active[1]) {
    col = "rgb(166,223,255)";
    (0, _drawArrayPath.drawArrayPath)(_main.fg2, col, 1, 0, -90, _vfxQueue.vfxQueue[posInQueue].path2, _vfxQueue.vfxQueue[posInQueue].svg2Scale[_vfxQueue.vfxQueue[posInQueue].timer - 1][0] * 1.5, _vfxQueue.vfxQueue[posInQueue].svg2Scale[_vfxQueue.vfxQueue[posInQueue].timer - 1][1] * 1.5);
  }
  if (_vfxQueue.vfxQueue[posInQueue].timer >= _vfxQueue.vfxQueue[posInQueue].svg3Active[0] && _vfxQueue.vfxQueue[posInQueue].timer <= _vfxQueue.vfxQueue[posInQueue].svg3Active[1]) {
    col = "rgb(255,161,161)";
    (0, _drawArrayPath.drawArrayPath)(_main.fg2, col, 1, 0, -90, _vfxQueue.vfxQueue[posInQueue].path2, _vfxQueue.vfxQueue[posInQueue].svg3Scale[_vfxQueue.vfxQueue[posInQueue].timer - _vfxQueue.vfxQueue[posInQueue].svg3Active[0]][0] * 1.5, _vfxQueue.vfxQueue[posInQueue].svg3Scale[_vfxQueue.vfxQueue[posInQueue].timer - _vfxQueue.vfxQueue[posInQueue].svg3Active[0]][1] * 1.5);
  }
  col = (0, _makeColour.makeColour)(242, 255, 93, 0.8 * ((_vfxQueue.vfxQueue[posInQueue].frames - _vfxQueue.vfxQueue[posInQueue].timer) / _vfxQueue.vfxQueue[posInQueue].frames));
  (0, _drawArrayPath.drawArrayPath)(_main.fg2, col, 1, 0, 0, _vfxQueue.vfxQueue[posInQueue].path4, 1.5, 1.5);
  if (_vfxQueue.vfxQueue[posInQueue].timer < 10) {
    _main.fg2.fillStyle = (0, _makeColour.makeColour)(255, 255, 255, 0.8 * ((10 - _vfxQueue.vfxQueue[posInQueue].timer) / 10));
    _main.fg2.scale(0.5, 1);
    _main.fg2.beginPath();
    _main.fg2.arc(0, 0, 450 * (_vfxQueue.vfxQueue[posInQueue].timer / 10) + 170, _render.twoPi, 0);
    _main.fg2.fill();
    _main.fg2.closePath();
  }
  _main.fg2.restore();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/blastzoneExplosion.js
// module id = 182
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/blastzoneExplosion.js?