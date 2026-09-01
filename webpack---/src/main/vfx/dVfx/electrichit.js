"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _activeStage = __webpack_require__(18);

var _vfxQueue = __webpack_require__(183);

var _main = __webpack_require__(11);

var _makeColour = __webpack_require__(15);

var _render = __webpack_require__(13);

var _drawArrayPath = __webpack_require__(184);

var _index = __webpack_require__(136);

var _index2 = _interopRequireDefault(_index);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (posInQueue) {
  var s = _activeStage.activeStage.scale / 4.5;
  _main.fg2.save();
  _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
  switch (_vfxQueue.vfxQueue[posInQueue].timer) {
    case 1:
      _main.fg2.fillStyle = (0, _makeColour.makeColour)(133, 122, 250, 0.62);
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
      (0, _drawArrayPath.drawArrayPath)(_main.fg2, "rgb(50,252,162)", _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _index2.default.normalhit.path1, 0.2 * (_activeStage.activeStage.scale / 4.5), 0.2 * (_activeStage.activeStage.scale / 4.5));
      break;
    case 3:
      (0, _drawArrayPath.drawArrayPath)(_main.fg2, "rgb(0,0,0)", _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _index2.default.normalhit.path2, 0.2 * (_activeStage.activeStage.scale / 4.5), 0.2 * (_activeStage.activeStage.scale / 4.5));
      break;
    case 4:
      (0, _drawArrayPath.drawArrayPath)(_main.fg2, "rgb(198,222,255)", _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _index2.default.normalhit.path2, 0.2 * (_activeStage.activeStage.scale / 4.5), 0.2 * (_activeStage.activeStage.scale / 4.5));
      break;
    case 5:
      for (var n = 0; n < _index2.default.normalhit.path3.length; n++) {
        (0, _drawArrayPath.drawArrayPath)(_main.fg2, "rgb(0,0,0)", _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _index2.default.normalhit.path3[n], 0.2 * (_vfxQueue.vfxQueue[posInQueue].timer / 7) * (_activeStage.activeStage.scale / 4.5), 0.2 * (_vfxQueue.vfxQueue[posInQueue].timer / 7) * (_activeStage.activeStage.scale / 4.5));
      }
      break;
    case 6:
      for (var m = 0; m < _index2.default.normalhit.path3.length; m++) {
        (0, _drawArrayPath.drawArrayPath)(_main.fg2, "rgb(139,130,242)", _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _index2.default.normalhit.path3[m], 0.2 * (_vfxQueue.vfxQueue[posInQueue].timer / 7) * (_activeStage.activeStage.scale / 4.5), 0.2 * (_vfxQueue.vfxQueue[posInQueue].timer / 7) * (_activeStage.activeStage.scale / 4.5));
      }
      break;
    default:
      break;
  }
  _main.fg2.fillStyle = "rgb(209, 181, 255)";
  if (_vfxQueue.vfxQueue[posInQueue].timer < 13) {
    for (var i = 0; i < 2; i++) {
      _main.fg2.beginPath();
      _main.fg2.arc((-30 + 60 * Math.random()) * s, (-30 + 60 * Math.random()) * s, 4 * s, 0, _render.twoPi);
      _main.fg2.closePath();
      _main.fg2.fill();
    }
  }
  _main.fg2.strokeStyle = "rgb(209, 181, 255)";
  _main.fg2.lineWidth = 2;
  _main.fg2.beginPath();
  //updated j to avoid off by one error. this may not be correct
  for (var j = 0; _vfxQueue.vfxQueue[posInQueue] && j < 4 - Math.round(_vfxQueue.vfxQueue[posInQueue].timer / 4); j++) {
    var start = new _Vec2D.Vec2D(-30 + 60 * Math.random(), -30 + 60 * Math.random());
    _main.fg2.moveTo(start.x * s, start.y * s);
    var next1 = new _Vec2D.Vec2D(start.x + (-10 + Math.random() * 20), start.y + (-10 + Math.random() * 20));
    var next2 = new _Vec2D.Vec2D(next1.x + (-10 + Math.random() * 20), next1.y + (-10 + Math.random() * 20));
    var next3 = new _Vec2D.Vec2D(next2.x + (-10 + Math.random() * 20), next2.y + (-10 + Math.random() * 20));
    _main.fg2.lineTo(next1.x * s, next1.y * s);
    _main.fg2.lineTo(next2.x * s, next2.y * s);
    _main.fg2.lineTo(next3.x * s, next3.y * s);
  }
  _main.fg2.closePath();
  _main.fg2.stroke();

  _main.fg2.restore();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/electrichit.js
// module id = 195
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/electrichit.js?