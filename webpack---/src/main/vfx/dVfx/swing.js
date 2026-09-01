"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vfxQueue = __webpack_require__(183);

var _main = __webpack_require__(11);

var _swordSwings = __webpack_require__(233);

var _activeStage = __webpack_require__(18);

var _makeColour = __webpack_require__(15);

var _Vec2D = __webpack_require__(22);

exports.default = function (posInQueue, draw) {
  var shouldDraw = draw;
  shouldDraw = shouldDraw || true;
  var p = _vfxQueue.vfxQueue[posInQueue].facing.pNum;
  if (_vfxQueue.vfxQueue[posInQueue].facing.posNow === undefined || _vfxQueue.vfxQueue[posInQueue].facing.posNow === null) {
    _vfxQueue.vfxQueue[posInQueue].facing.posNow = new _Vec2D.Vec2D(_main.player[p].phys.pos.x, _main.player[p].phys.pos.y);
    _vfxQueue.vfxQueue[posInQueue].facing.posPrev = new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x, _main.player[p].phys.posPrev.y);
  }
  var frame = _vfxQueue.vfxQueue[posInQueue].facing.frame;
  var swingType = _vfxQueue.vfxQueue[posInQueue].facing.swingType;
  var swordPrev = _swordSwings.swordSwings[swingType][frame];
  if (_swordSwings.swordSwings[swingType][frame + 1] === undefined) {
    return;
  }
  var swordNow = _swordSwings.swordSwings[swingType][frame + 1];
  var scale = _main.player[p].charAttributes.charScale;
  var pos = _vfxQueue.vfxQueue[posInQueue].facing.posNow;
  var posPrev = _vfxQueue.vfxQueue[posInQueue].facing.posPrev;
  var sc = _activeStage.activeStage.scale;
  var soX = _activeStage.activeStage.offset[0];
  var soY = _activeStage.activeStage.offset[1];
  if (shouldDraw) {
    _main.fg2.fillStyle = (0, _makeColour.makeColour)(46, 217, 255, 0.7 - 0.7 / 5 * _vfxQueue.vfxQueue[posInQueue].timer);
    _main.fg2.beginPath();
    _main.fg2.moveTo((scale * (swordNow[0][0] / 4.5 * _main.player[p].phys.face) + pos.x) * sc + soX, (scale * (swordNow[0][1] / -4.5) + pos.y) * -sc + soY);
    _main.fg2.lineTo((scale * (swordNow[1][0] / 4.5 * _main.player[p].phys.face) + pos.x) * sc + soX, (scale * (swordNow[1][1] / -4.5) + pos.y) * -sc + soY);
    _main.fg2.lineTo((scale * (swordPrev[1][0] / 4.5 * _main.player[p].phys.face) + posPrev.x) * sc + soX, (scale * (swordPrev[1][1] / -4.5) + posPrev.y) * -sc + soY);
    _main.fg2.lineTo((scale * (swordPrev[0][0] / 4.5 * _main.player[p].phys.face) + posPrev.x) * sc + soX, (scale * (swordPrev[0][1] / -4.5) + posPrev.y) * -sc + soY);
    _main.fg2.closePath();
    _main.fg2.fill();
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/swing.js
// module id = 232
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/swing.js?