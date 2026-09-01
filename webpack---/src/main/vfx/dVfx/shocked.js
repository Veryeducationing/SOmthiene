"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _activeStage = __webpack_require__(18);

var _vfxQueue = __webpack_require__(183);

var _main = __webpack_require__(11);

var _render = __webpack_require__(13);

var _Vec2D = __webpack_require__(22);

exports.default = function (posInQueue) {
  var s = _activeStage.activeStage.scale / 4.5;
  _main.fg2.save();
  _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
  _main.fg2.fillStyle = "rgb(209, 181, 255)";
  for (var i = 0; i < 1; i++) {
    _main.fg2.beginPath();
    _main.fg2.arc((-30 + 60 * Math.random()) * s, (-30 + 60 * Math.random()) * s, 4 * s, 0, _render.twoPi);
    _main.fg2.closePath();
    _main.fg2.fill();
  }
  _main.fg2.strokeStyle = "rgb(209, 181, 255)";
  _main.fg2.lineWidth = 2;
  _main.fg2.beginPath();
  // dropped loop since it only iterates once
  var start = new _Vec2D.Vec2D(-30 + 60 * Math.random(), -30 + 60 * Math.random());
  _main.fg2.moveTo(start.x * s, start.y * s);
  var next1 = new _Vec2D.Vec2D(start.x + (-10 + Math.random() * 20), start.y + (-10 + Math.random() * 20));
  var next2 = new _Vec2D.Vec2D(next1.x + (-10 + Math.random() * 20), next1.y + (-10 + Math.random() * 20));
  var next3 = new _Vec2D.Vec2D(next2.x + (-10 + Math.random() * 20), next2.y + (-10 + Math.random() * 20));
  _main.fg2.lineTo(next1.x * s, next1.y * s);
  _main.fg2.lineTo(next2.x * s, next2.y * s);
  _main.fg2.lineTo(next3.x * s, next3.y * s);

  _main.fg2.closePath();
  _main.fg2.stroke();
  _main.fg2.restore();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/shocked.js
// module id = 225
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/shocked.js?