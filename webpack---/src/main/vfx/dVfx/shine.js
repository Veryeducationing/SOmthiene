"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vfxQueue = __webpack_require__(183);

var _makeColour = __webpack_require__(15);

var _main = __webpack_require__(11);

var _drawHexagon = __webpack_require__(220);

var _activeStage = __webpack_require__(18);

var _stars = __webpack_require__(221);

var _vfx = __webpack_require__(135);

var lightBlue = "rgba(196, 252, 254, 0.82)";
var white = "rgba(235, 250, 255, 0.9)";

exports.default = function (posInQueue) {
  _main.fg2.save();
  var tX = _vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0];
  var tY = _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1];
  var r = void 0;
  var a = void 0;
  var b = void 0;

  if (_vfxQueue.vfxQueue[posInQueue].timer === 1) {
    _main.fg2.fillStyle = lightBlue;
    (0, _drawHexagon.drawHexagon)(5.1 * _activeStage.activeStage.scale, tX, tY, 10);
    _main.fg2.fillStyle = white;
    (0, _drawHexagon.drawHexagon)(6 * _activeStage.activeStage.scale, tX, tY, 5);
    r = 5.1 * _activeStage.activeStage.scale;
    a = r * Math.sin(Math.PI / 6);
    b = r * Math.cos(Math.PI / 6);
    _main.fg2.translate(tX, tY);
    _main.fg2.beginPath();
    _main.fg2.moveTo(0, r);
    _main.fg2.lineTo(b, r - a);
    _main.fg2.lineTo(b, -r + a);
    _main.fg2.lineTo(0, -r);
    _main.fg2.closePath();
    _main.fg2.fill();
    (0, _stars.stars)(tX, tY, 2 + 3 * Math.floor(Math.random()), 1.5 * _activeStage.activeStage.scale, 5.5 * _activeStage.activeStage.scale);
  } else if (_vfxQueue.vfxQueue[posInQueue].timer === 2) {
    _main.fg2.fillStyle = lightBlue;
    (0, _drawHexagon.drawHexagon)(6.6 * _activeStage.activeStage.scale, tX, tY, 10);
    _main.fg2.fillStyle = white;
    (0, _drawHexagon.drawHexagon)(7.5 * _activeStage.activeStage.scale, tX, tY, 5);
    _main.fg2.translate(tX, tY);
    r = 6.6 * _activeStage.activeStage.scale;
    a = r * Math.sin(Math.PI / 6);
    b = r * Math.cos(Math.PI / 6);
    _main.fg2.beginPath();
    _main.fg2.moveTo(-b, r - a);
    _main.fg2.lineTo(0, r);
    _main.fg2.lineTo(b, r - a);
    _main.fg2.lineTo(b, -r + a);
    _main.fg2.closePath();
    _main.fg2.fill();
    (0, _stars.stars)(tX, tY, 3 + 3 * Math.floor(Math.random()), 4 * _activeStage.activeStage.scale, 7 * _activeStage.activeStage.scale);
  } else {
    _main.fg2.fillStyle = lightBlue;
    (0, _drawHexagon.drawHexagon)(8.1 * _activeStage.activeStage.scale, tX, tY, 10);
    _main.fg2.fillStyle = white;
    (0, _drawHexagon.drawHexagon)(9 * _activeStage.activeStage.scale, tX, tY, 5);
    _main.fg2.translate(tX, tY);
    r = 8.1 * _activeStage.activeStage.scale;
    a = r * Math.sin(Math.PI / 6);
    b = r * Math.cos(Math.PI / 6);
    _main.fg2.beginPath();
    _main.fg2.moveTo(-b, -r + a);
    _main.fg2.lineTo(-b, r - a);
    _main.fg2.lineTo(0, r);
    _main.fg2.lineTo(b, r - a);
    _main.fg2.closePath();
    _main.fg2.fill();
    (0, _stars.stars)(tX, tY, 2 + 3 * Math.floor(Math.random()), 6 * _activeStage.activeStage.scale, 8 * _activeStage.activeStage.scale);
  }
  _main.fg2.restore();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/shine.js
// module id = 219
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/shine.js?