"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vfxQueue = __webpack_require__(183);

var _drawArrayPath = __webpack_require__(184);

var _main = __webpack_require__(11);

var _activeStage = __webpack_require__(18);

var _drawVfx = __webpack_require__(134);

var _index = __webpack_require__(136);

var _index2 = _interopRequireDefault(_index);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (posInQueue) {
  if (_vfxQueue.vfxQueue[posInQueue].timer === 1) {
    (0, _drawArrayPath.drawArrayPath)(_main.fg2, "rgb(253,255,161)", _vfxQueue.vfxQueue[posInQueue].face, _vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], (_vfxQueue.vfxQueue[posInQueue].newPos.y + 7) * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], _index2.default.normalhit.path2, 0.2 * (_activeStage.activeStage.scale / 4.5), 0.2 * (_activeStage.activeStage.scale / 4.5));
  }
  (0, _drawVfx.drawVfx)({
    name: "fireburst",
    pos: new _Vec2D.Vec2D(-10 + 20 * Math.random() + _vfxQueue.vfxQueue[posInQueue].newPos.x, -10 + 20 * Math.random() + _vfxQueue.vfxQueue[posInQueue].y),
    face: 6
  });
  (0, _drawVfx.drawVfx)({
    name: "burncircle",
    pos: new _Vec2D.Vec2D(-10 + 20 * Math.random() + _vfxQueue.vfxQueue[posInQueue].newPos.x, -10 + 20 * Math.random() + _vfxQueue.vfxQueue[posInQueue].newPos.y),
    face: 1
  });
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/burning.js
// module id = 187
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/burning.js?