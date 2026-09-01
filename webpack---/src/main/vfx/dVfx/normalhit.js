"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

var _makeColour = __webpack_require__(15);

var _main = __webpack_require__(11);

var _render = __webpack_require__(13);

var _drawArrayPath = __webpack_require__(184);

var _index = __webpack_require__(136);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (posInQueue) {
  _main.fg2.save();
  _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
  switch (_vfxQueue.vfxQueue[posInQueue].timer) {
    case 1:
      _main.fg2.fillStyle = (0, _makeColour.makeColour)(255, 188, 14, 0.62);
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
      break;
    case 2:
      (0, _drawArrayPath.drawArrayPath)(_main.fg2, "rgb(255,61,61)", _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _index2.default.normalhit.path1, 0.2 * (_activeStage.activeStage.scale / 4.5), 0.2 * (_activeStage.activeStage.scale / 4.5));
      break;
    case 3:
      (0, _drawArrayPath.drawArrayPath)(_main.fg2, "rgb(150, 208, 255)", _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _index2.default.normalhit.path2, 0.2 * (_activeStage.activeStage.scale / 4.5), 0.2 * (_activeStage.activeStage.scale / 4.5));
      break;
    case 4:
    case 5:
    case 6:
    case 7:
      for (var n = 0; n < _index2.default.normalhit.path3.length; n++) {
        (0, _drawArrayPath.drawArrayPath)(_main.fg2, (0, _makeColour.makeColour)(120, 255, 99, 4 / _vfxQueue.vfxQueue[posInQueue].timer), _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _index2.default.normalhit.path3[n], 0.2 * (_vfxQueue.vfxQueue[posInQueue].timer / 7) * (_activeStage.activeStage.scale / 4.5), 0.2 * (_vfxQueue.vfxQueue[posInQueue].timer / 7) * (_activeStage.activeStage.scale / 4.5));
      }
      break;
    default:
      break;
  }
  _main.fg2.restore();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/normalhit.js
// module id = 215
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/normalhit.js?