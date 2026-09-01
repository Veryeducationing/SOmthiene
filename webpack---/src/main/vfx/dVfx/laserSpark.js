"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vfxQueue = __webpack_require__(183);

var _main = __webpack_require__(11);

var _makeColour = __webpack_require__(15);

var _activeStage = __webpack_require__(18);

var _chromaticAberration = __webpack_require__(213);

var _Vec2D = __webpack_require__(22);

exports.default = function (posInQueue) {
  var x = _vfxQueue.vfxQueue[posInQueue].newPos.x;
  var y = _vfxQueue.vfxQueue[posInQueue].newPos.y;
  var t = _vfxQueue.vfxQueue[posInQueue].timer / _vfxQueue.vfxQueue[posInQueue].frames;
  var dir = _vfxQueue.vfxQueue[posInQueue].direction;
  var col = _vfxQueue.vfxQueue[posInQueue].color;
  var offset = _vfxQueue.vfxQueue[posInQueue].offset;
  var u = 8 * offset + 12 * t;
  var px = (x + u * dir.x) * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0],
      py = (y + u * dir.y) * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1];
  ;

  (0, _chromaticAberration.chromaticAberration)(_main.fg2, function (c1, c2) {
    return drawSpark(px, py, dir, c1);
  }, col, col, 0.75 * (3 - 4 * t), new _Vec2D.Vec2D(0.3 * dir.y * _activeStage.activeStage.scale, 0.3 * dir.x * _activeStage.activeStage.scale));
};

function drawSpark(px, py, dir, col) {
  _main.fg2.lineWidth = 2;
  _main.fg2.strokeStyle = col;
  _main.fg2.beginPath();
  _main.fg2.moveTo(px, py);
  _main.fg2.lineTo(px + 4 * _activeStage.activeStage.scale * dir.x, py - 4 * _activeStage.activeStage.scale * dir.y);
  _main.fg2.stroke();
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/laserSpark.js
// module id = 214
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/laserSpark.js?