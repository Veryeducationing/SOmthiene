"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _makeColour = __webpack_require__(15);

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

var _drawArrayPath = __webpack_require__(184);

var _main = __webpack_require__(11);

exports.default = function (posInQueue, ang) {
    var col = (0, _makeColour.makeColour)(_vfxQueue.vfxQueue[posInQueue].colour[0], _vfxQueue.vfxQueue[posInQueue].colour[1], _vfxQueue.vfxQueue[posInQueue].colour[2], 0.8 * ((_vfxQueue.vfxQueue[posInQueue].frames - _vfxQueue.vfxQueue[posInQueue].timer) / _vfxQueue.vfxQueue[posInQueue].frames));
    _main.fg2.save();
    _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
    _main.fg2.rotate(ang);
    (0, _drawArrayPath.drawArrayPath)(_main.fg2, col, _vfxQueue.vfxQueue[posInQueue].face, 0, 0, _vfxQueue.vfxQueue[posInQueue].path[_vfxQueue.vfxQueue[posInQueue].timer - 1], 0.2 * (_activeStage.activeStage.scale / 4.5), 0.2 * (_activeStage.activeStage.scale / 4.5));
    _main.fg2.restore();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/general.js
// module id = 189
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/general.js?