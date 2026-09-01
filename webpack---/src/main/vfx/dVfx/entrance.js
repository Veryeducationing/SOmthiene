"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

var _makeColour = __webpack_require__(15);

var _main = __webpack_require__(11);

var _render = __webpack_require__(13);

var _Vec2D = __webpack_require__(22);

exports.default = function (posInQueue) {
  _main.fg2.save();
  _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
  var ellipseOffset = 0;
  var anglePos = _vfxQueue.vfxQueue[posInQueue].timer * Math.PI / 32;
  for (var i = 0; i < 8; i++) {
    var seed = Math.random() - 0.5;
    ellipseOffset = new _Vec2D.Vec2D(35 * Math.cos(anglePos), 35 * Math.sin(anglePos) * 0.4);
    var pillarGrad = _main.fg2.createLinearGradient(0, 0, 0, -_vfxQueue.vfxQueue[posInQueue].timer * 2 - seed * 60);
    pillarGrad.addColorStop(0, (0, _makeColour.makeColour)(255, 255, 255, 0.3));
    pillarGrad.addColorStop(0.5, (0, _makeColour.makeColour)(255, 255, 255, 0.3));
    pillarGrad.addColorStop(1, (0, _makeColour.makeColour)(255, 255, 255, 0));
    _main.fg2.fillStyle = pillarGrad;
    _main.fg2.fillRect(ellipseOffset.x, ellipseOffset.y - (_vfxQueue.vfxQueue[posInQueue].timer * 2 + seed * 60), 10 * (_activeStage.activeStage.scale / 4.5), (_vfxQueue.vfxQueue[posInQueue].timer * 2 + seed * 60) * (_activeStage.activeStage.scale / 4.5));
    anglePos += Math.PI / 4;
  }
  _main.fg2.fillStyle = (0, _makeColour.makeColour)(163, 255, 203, 0.3);
  _main.fg2.fillRect(-35, -(_vfxQueue.vfxQueue[posInQueue].timer % 15) * 5, 80 * (_activeStage.activeStage.scale / 4.5), 15 * (_activeStage.activeStage.scale / 4.5));
  _main.fg2.restore();
  _main.fg2.save();
  _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
  _main.fg2.strokeStyle = (0, _makeColour.makeColour)(255, 149, 149, 0.8);
  _main.fg2.lineWidth = 8;
  _main.fg2.scale(0.8 + Math.random() * 0.3, 0.2 + 0.2 * Math.random());
  _main.fg2.beginPath();
  _main.fg2.arc(5, -_vfxQueue.vfxQueue[posInQueue].timer * 3, (35 + _vfxQueue.vfxQueue[posInQueue].timer % 2 * 10) * (_activeStage.activeStage.scale / 4.5), 0, _render.twoPi);
  _main.fg2.closePath();
  _main.fg2.stroke();
  _main.fg2.restore();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/entrance.js
// module id = 196
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/entrance.js?