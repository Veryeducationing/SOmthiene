"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

var _makeColour = __webpack_require__(15);

var _drawArrayPathNew = __webpack_require__(199);

var _main = __webpack_require__(11);

var _index = __webpack_require__(136);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (posInQueue) {
    _main.fg2.save();
    _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
    var secondFrame = (_vfxQueue.vfxQueue[posInQueue].facing + 4) % 10;
    (0, _drawArrayPathNew.drawArrayPathNew)(_main.fg2, (0, _makeColour.makeColour)(237, 219, 53, 0.3), _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _index2.default.firefoxcharge.path[secondFrame], 0.35 * (_activeStage.activeStage.scale / 4.5), 0.5 * (_activeStage.activeStage.scale / 4.5), 0, 0, 0);
    (0, _drawArrayPathNew.drawArrayPathNew)(_main.fg2, "rgb(255, 218, 163)", _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _index2.default.firefoxcharge.path[_vfxQueue.vfxQueue[posInQueue].facing], 0.35 * (_activeStage.activeStage.scale / 4.5), 0.5 * (_activeStage.activeStage.scale / 4.5), 0, 0, 0);
    _main.fg2.restore();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/firefoxcharge.js
// module id = 198
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/firefoxcharge.js?