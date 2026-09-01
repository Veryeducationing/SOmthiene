"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _drawVfx = __webpack_require__(134);

var _drawArrayPath = __webpack_require__(184);

var _makeColour = __webpack_require__(15);

var _index = __webpack_require__(136);

var _index2 = _interopRequireDefault(_index);

var _activeStage = __webpack_require__(18);

var _vfxQueue = __webpack_require__(183);

var _main = __webpack_require__(11);

var _render = __webpack_require__(13);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (posInQueue) {
  _main.fg2.save();
  _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
  switch (_vfxQueue.vfxQueue[posInQueue].timer) {
    case 1:
    case 2:
      _main.fg2.fillStyle = (0, _makeColour.makeColour)(255, 255, 255, 0.62);
      _main.fg2.beginPath();
      _main.fg2.arc(0, 0, 20, 0, _render.twoPi);
      _main.fg2.closePath();
      _main.fg2.fill();
      _main.fg2.beginPath();
      _main.fg2.moveTo(0, 30);
      _main.fg2.lineTo(5, 5);
      _main.fg2.lineTo(30, 0);
      _main.fg2.lineTo(5, -5);
      _main.fg2.lineTo(0, -30);
      _main.fg2.lineTo(-5, -5);
      _main.fg2.lineTo(-30, 0);
      _main.fg2.lineTo(-5, 5);
      _main.fg2.closePath();
      _main.fg2.fill();
      for (var n = 0; n < _index2.default.normalhit.path3.length; n++) {
        (0, _drawArrayPath.drawArrayPath)(_main.fg2, (0, _makeColour.makeColour)(255, 164, 56, 0.8), _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _index2.default.normalhit.path3[n], 0.15 * (_activeStage.activeStage.scale / 4.5), 0.15 * (_activeStage.activeStage.scale / 4.5));
      }
      break;
    case 3:
      for (var m = 0; m < _index2.default.normalhit.path3.length; m++) {
        (0, _drawArrayPath.drawArrayPath)(_main.fg2, (0, _makeColour.makeColour)(255, 164, 56, 0.8), _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _index2.default.normalhit.path3[m], 0.2 * (_vfxQueue.vfxQueue[posInQueue].timer / 7) * (_activeStage.activeStage.scale / 4.5), 0.2 * (_vfxQueue.vfxQueue[posInQueue].timer / 7) * (_activeStage.activeStage.scale / 4.5));
      }
      break;
    case 4:
    case 5:
    case 6:
    case 7:
      for (var k = 0; k < _index2.default.normalhit.path3.length; k++) {
        (0, _drawArrayPath.drawArrayPath)(_main.fg2, (0, _makeColour.makeColour)(255, 227, 79, 4 / _vfxQueue.vfxQueue[posInQueue].timer), _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _index2.default.normalhit.path3[k], 0.1 * (_vfxQueue.vfxQueue[posInQueue].timer / 7) * (_activeStage.activeStage.scale / 4.5), 0.1 * (_vfxQueue.vfxQueue[posInQueue].timer / 7) * (_activeStage.activeStage.scale / 4.5));
      }
      break;
    default:
      break;
  }
  (0, _drawVfx.drawVfx)({
    name: "fireburst",
    pos: new _Vec2D.Vec2D(-10 + 20 * Math.random() + _vfxQueue.vfxQueue[posInQueue].newPos.x, -10 + 20 * Math.random() + _vfxQueue.vfxQueue[posInQueue].y),
    face: 8
  });
  _main.fg2.restore();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/firehit.js
// module id = 202
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/firehit.js?