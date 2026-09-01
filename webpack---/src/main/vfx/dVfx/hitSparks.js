"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _makeColour = __webpack_require__(15);

var _drawArrayPath = __webpack_require__(184);

var _main = __webpack_require__(11);

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

exports.default = function (posInQueue) {
    var col = (0, _makeColour.makeColour)(143, 128, 233, 0.7);
    (0, _drawArrayPath.drawArrayPath)(_main.fg2, col, _vfxQueue.vfxQueue[posInQueue].face, _vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0] + 10, _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], _vfxQueue.vfxQueue[posInQueue].path1, 0.2 * (_activeStage.activeStage.scale / 4.5), 0.2 * (_activeStage.activeStage.scale / 4.5));
    (0, _drawArrayPath.drawArrayPath)(_main.fg2, col, _vfxQueue.vfxQueue[posInQueue].face, _vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0] + 10, _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], _vfxQueue.vfxQueue[posInQueue].path2, 0.2 * (_activeStage.activeStage.scale / 4.5), 0.2 * (_activeStage.activeStage.scale / 4.5));
    _main.fg2.save();
    _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
    _main.fg2.rotate(Math.PI);
    (0, _drawArrayPath.drawArrayPath)(_main.fg2, col, _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _vfxQueue.vfxQueue[posInQueue].path1, 0.2 * (_activeStage.activeStage.scale / 4.5), 0.2 * (_activeStage.activeStage.scale / 4.5));
    (0, _drawArrayPath.drawArrayPath)(_main.fg2, col, _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _vfxQueue.vfxQueue[posInQueue].path2, 0.2 * (_activeStage.activeStage.scale / 4.5), 0.2 * (_activeStage.activeStage.scale / 4.5));
    _main.fg2.restore();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/hitSparks.js
// module id = 207
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/hitSparks.js?