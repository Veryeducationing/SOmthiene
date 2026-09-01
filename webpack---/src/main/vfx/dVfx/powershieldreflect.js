"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

var _main = __webpack_require__(11);

var _render = __webpack_require__(13);

exports.default = function (posInQueue) {
  var frame = _vfxQueue.vfxQueue[posInQueue].timer;
  _main.fg2.save();
  _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
  _main.fg2.lineWidth = 4;
  _main.fg2.strokeStyle = "rgba(255, 127, 112," + (0.8 - 0.15 * frame) + ")";
  _main.fg2.beginPath();
  _main.fg2.arc(0, 0, (13 - frame * 1) * _activeStage.activeStage.scale, 0, _render.twoPi);
  _main.fg2.closePath();
  _main.fg2.stroke();
  var grd = _main.fg2.createRadialGradient(0, 0, 5, 0, 0, (25 - frame * 2) * _activeStage.activeStage.scale);
  grd.addColorStop(0, "rgba(255,255,255," + (1 - 0.15 * frame) + ")");
  grd.addColorStop(1, "rgba(97, 255, 250, 0)");
  if (frame < 3) {
    _main.fg2.fillStyle = grd;
    _main.fg2.beginPath();
    _main.fg2.arc(0, 0, (25 - frame * 2) * _activeStage.activeStage.scale, 0, _render.twoPi);
    _main.fg2.closePath();
    _main.fg2.fill();
  }
  //fg2.strokeStyle = "rgb(112, 212, 255)";
  _main.fg2.strokeStyle = grd;
  _main.fg2.beginPath();
  _main.fg2.arc(0, 0, (10 - frame * 1) * _activeStage.activeStage.scale, 0, _render.twoPi);
  _main.fg2.closePath();
  _main.fg2.stroke();
  for (var i = 0; i < 14; i++) {
    _main.fg2.rotate(Math.PI / 7 + (-0.3 + Math.random() * 0.6));
    _main.fg2.beginPath();
    _main.fg2.moveTo(0, (15 + Math.random() * 10 - frame * 1.5) * _activeStage.activeStage.scale);
    _main.fg2.lineTo(0, (-15 - Math.random() * 10 + frame * 1.5) * _activeStage.activeStage.scale);
    _main.fg2.closePath();
    _main.fg2.stroke();
  }
  _main.fg2.restore();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/powershieldreflect.js
// module id = 217
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/powershieldreflect.js?