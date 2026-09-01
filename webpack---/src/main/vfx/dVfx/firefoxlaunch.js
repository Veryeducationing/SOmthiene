"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vfxQueue = __webpack_require__(183);

var _main = __webpack_require__(11);

var _activeStage = __webpack_require__(18);

var _makeColour = __webpack_require__(15);

var _drawArrayPathNew = __webpack_require__(199);

var _index = __webpack_require__(136);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (posInQueue) {
  var p = _vfxQueue.vfxQueue[posInQueue].facing;
  if (_main.player[p].actionState === "UPSPECIALLAUNCH") {
    _main.fg2.save();
    var frame = (_main.player[p].timer - 1) % 4;

    _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);

    var fireGrad = _main.fg2.createLinearGradient(0, -130, 0, 20);
    var col = void 0;
    if (frame % 2) {
      col = "rgb(255, 218, 163)";
      fireGrad.addColorStop(0, "rgb(255, 232, 198)");
      fireGrad.addColorStop(0.6, (0, _makeColour.makeColour)(251, 187, 90, 0.9));
      fireGrad.addColorStop(1, (0, _makeColour.makeColour)(182, 45, 9, 0.3));
    } else {
      col = "rgb(223, 83, 39)";
      fireGrad.addColorStop(0, "rgb(223, 83, 39)");
      fireGrad.addColorStop(0.6, (0, _makeColour.makeColour)(210, 59, 26, 0.9));
      fireGrad.addColorStop(1, (0, _makeColour.makeColour)(158, 34, 12, 0.3));
    }
    (0, _drawArrayPathNew.drawArrayPathNew)(_main.fg2, fireGrad, _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _index2.default.firefoxlaunch.path[frame], 0.35 * (_activeStage.activeStage.scale / 4.5), 0.35 * (_activeStage.activeStage.scale / 4.5), _main.player[p].rotation, _main.player[p].rotationPoint.x, _main.player[p].rotationPoint.y);
    _main.fg2.restore();
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/firefoxlaunch.js
// module id = 200
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/firefoxlaunch.js?