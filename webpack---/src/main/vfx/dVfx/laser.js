"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawLaserLine = drawLaserLine;

var _vfxQueue = __webpack_require__(183);

var _main = __webpack_require__(11);

var _Vec2D = __webpack_require__(22);

var _makeColour = __webpack_require__(15);

var _activeStage = __webpack_require__(18);

var _lines = __webpack_require__(212);

var _chromaticAberration = __webpack_require__(213);

var _render = __webpack_require__(13);

exports.default = function (posInQueue) {
  if (_vfxQueue.vfxQueue[posInQueue].timer === 1) {
    var n = 8 + Math.floor(6 * Math.random());
    var midAngle = _vfxQueue.vfxQueue[posInQueue].face === 1 ? _vfxQueue.vfxQueue[posInQueue].facing : Math.PI - _vfxQueue.vfxQueue[posInQueue].facing;
    (0, _lines.lines)({ name: "laserSpark", color: _vfxQueue.vfxQueue[posInQueue].color1 }, _vfxQueue.vfxQueue[posInQueue].newPos, n, midAngle - 0.75 * Math.PI / 2, midAngle + 0.75 * Math.PI / 2, 2);
  }
  _main.fg2.save();
  _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
  _main.fg2.rotate(-_vfxQueue.vfxQueue[posInQueue].facing * _vfxQueue.vfxQueue[posInQueue].face);

  _main.fg2.lineWidth = 3;
  if (_vfxQueue.vfxQueue[posInQueue].timer > 3) {
    var color1 = _vfxQueue.vfxQueue[posInQueue].color1;
    _main.fg2.globalCompositeOperation = "screen";
    var t = _vfxQueue.vfxQueue[posInQueue].timer;
    drawCircle((0, _makeColour.makeColour)(0, 0, color1.b, 1 - (t - 4) / 6), t, -0.25);
    drawCircle((0, _makeColour.makeColour)(0, color1.g, 0, 1 - (t - 4) / 6), t, -0.1);
    drawCircle((0, _makeColour.makeColour)(color1.r, 0, 0, 1 - (t - 4) / 6), t, 0.05);
  }
  var color2 = _vfxQueue.vfxQueue[posInQueue].color2;
  (0, _chromaticAberration.chromaticAberration)(_main.fg2, function (c1, c2) {
    return drawEnergyLine(c1, posInQueue);
  }, color2, color2, Math.min(1, 1 - (_vfxQueue.vfxQueue[posInQueue].timer - 4) / 6), new _Vec2D.Vec2D(0.3 * _activeStage.activeStage.scale, 0));
  _main.fg2.restore();
};

function drawCircle(col, t, offset) {
  _main.fg2.strokeStyle = col;
  _main.fg2.beginPath();
  _main.fg2.arc(0, 0, (offset + t * 0.6) * _activeStage.activeStage.scale, 0, _render.twoPi);
  _main.fg2.closePath();
  _main.fg2.stroke();
}

function drawEnergyLine(col, posInQueue) {
  _main.fg2.fillStyle = col;
  _main.fg2.beginPath();
  _main.fg2.moveTo(-_vfxQueue.vfxQueue[posInQueue].timer * 1 * _vfxQueue.vfxQueue[posInQueue].face * _activeStage.activeStage.scale, (-1.6 - _vfxQueue.vfxQueue[posInQueue].timer * 1.6) * _activeStage.activeStage.scale);
  _main.fg2.lineTo((-2.3 - _vfxQueue.vfxQueue[posInQueue].timer * 1) * _vfxQueue.vfxQueue[posInQueue].face * _activeStage.activeStage.scale, (-2.4 - _vfxQueue.vfxQueue[posInQueue].timer * 1.6) * _activeStage.activeStage.scale);
  _main.fg2.lineTo((-2.3 - _vfxQueue.vfxQueue[posInQueue].timer * 1) * _vfxQueue.vfxQueue[posInQueue].face * _activeStage.activeStage.scale, (2.4 + _vfxQueue.vfxQueue[posInQueue].timer * 1.6) * _activeStage.activeStage.scale);
  _main.fg2.lineTo(-_vfxQueue.vfxQueue[posInQueue].timer * 1 * _vfxQueue.vfxQueue[posInQueue].face * _activeStage.activeStage.scale, (1.6 + _vfxQueue.vfxQueue[posInQueue].timer * 1.6) * _activeStage.activeStage.scale);
  _main.fg2.closePath();
  _main.fg2.fill();
}

function drawLaserLine(h, t, v1, v2, v3, v4, d, col1, col2) {
  _main.fg2.lineWidth = 2;
  _main.fg2.strokeStyle = col1;
  _main.fg2.fillStyle = col2;
  _main.fg2.beginPath();
  _main.fg2.moveTo(h.x, h.y);
  _main.fg2.lineTo(h.x + v1.x * d, h.y + v1.y);
  _main.fg2.lineTo(t.x + v2.x * d, t.y + v2.y);
  _main.fg2.lineTo(t.x, t.y);
  _main.fg2.lineTo(t.x + v3.x * d, t.y + v3.y);
  _main.fg2.lineTo(h.x + v4.x * d, h.y + v4.y);
  _main.fg2.closePath();
  _main.fg2.fill();
  _main.fg2.stroke();
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/laser.js
// module id = 211
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/laser.js?