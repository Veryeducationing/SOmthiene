"use strict";

Object.defineProperty(exports, "__esModule", {
                value: true
});

var _vfxQueue = __webpack_require__(183);

var _drawArrayPathNew = __webpack_require__(199);

var _main = __webpack_require__(11);

var _makeColour = __webpack_require__(15);

var _activeStage = __webpack_require__(18);

var _index = __webpack_require__(136);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (posInQueue) {
                if (!(_vfxQueue.vfxQueue[posInQueue].timer % 2)) {
                                _main.fg2.save();
                                (0, _drawArrayPathNew.drawArrayPathNew)(_main.fg2, (0, _makeColour.makeColour)(68, 0, 0, 0.75), _vfxQueue.vfxQueue[posInQueue].face, (_vfxQueue.vfxQueue[posInQueue].newPos.x - 0.3) * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], (_vfxQueue.vfxQueue[posInQueue].newPos.y - 0.3) * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], _index2.default.illusion.path, 0.35 * (_activeStage.activeStage.scale / 4.5), 0.35 * (_activeStage.activeStage.scale / 4.5), 0, 0, 0, setToScreen);
                                (0, _drawArrayPathNew.drawArrayPathNew)(_main.fg2, (0, _makeColour.makeColour)(0, 244, 0, 0.75), _vfxQueue.vfxQueue[posInQueue].face, _vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], _index2.default.illusion.path, 0.35 * (_activeStage.activeStage.scale / 4.5), 0.35 * (_activeStage.activeStage.scale / 4.5), 0, 0, 0, setToScreen);
                                (0, _drawArrayPathNew.drawArrayPathNew)(_main.fg2, (0, _makeColour.makeColour)(0, 0, 255, 0.75), _vfxQueue.vfxQueue[posInQueue].face, (_vfxQueue.vfxQueue[posInQueue].newPos.x + 0.3) * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], (_vfxQueue.vfxQueue[posInQueue].newPos.y + 0.3) * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], _index2.default.illusion.path, 0.35 * (_activeStage.activeStage.scale / 4.5), 0.35 * (_activeStage.activeStage.scale / 4.5), 0, 0, 0, setToScreen);
                                _main.fg2.restore();
                }
};

function setToScreen() {
                _main.fg2.globalCompositeOperation = "screen";
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/illusion.js
// module id = 209
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/illusion.js?