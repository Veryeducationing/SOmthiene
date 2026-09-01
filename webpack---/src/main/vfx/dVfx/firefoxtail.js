"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

var _main = __webpack_require__(11);

var _makeColour = __webpack_require__(15);

var _render = __webpack_require__(13);

exports.default = function (posInQueue) {
    if (_vfxQueue.vfxQueue[posInQueue].randomTail === undefined || _vfxQueue.vfxQueue[posInQueue].randomTail === null) {
        _vfxQueue.vfxQueue[posInQueue].randomTail = [Math.random(), Math.random(), Math.random(), Math.random()];
    }
    _main.fg2.save();
    _main.fg2.translate(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], (_vfxQueue.vfxQueue[posInQueue].newPos.y + 4) * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
    _main.fg2.fillStyle = (0, _makeColour.makeColour)(Math.max(149, 251 - _vfxQueue.vfxQueue[posInQueue].timer * 5), Math.max(149, 187 - _vfxQueue.vfxQueue[posInQueue].timer * 5), Math.min(149, 90 + _vfxQueue.vfxQueue[posInQueue].timer * 5), 1 - _vfxQueue.vfxQueue[posInQueue].timer / 15);
    _main.fg2.beginPath();
    _main.fg2.arc((-2 + _vfxQueue.vfxQueue[posInQueue].randomTail[0] * 4) * _activeStage.activeStage.scale, (-2 + _vfxQueue.vfxQueue[posInQueue].randomTail[1] * 4) * _activeStage.activeStage.scale, 4 * _activeStage.activeStage.scale, 0, _render.twoPi);
    _main.fg2.closePath();
    _main.fg2.fill();
    _main.fg2.fillStyle = (0, _makeColour.makeColour)(Math.max(149, 223 - _vfxQueue.vfxQueue[posInQueue].timer * 5), Math.min(149, 83 + _vfxQueue.vfxQueue[posInQueue].timer * 5), Math.min(149, 39 + _vfxQueue.vfxQueue[posInQueue].timer * 5), 1 - _vfxQueue.vfxQueue[posInQueue].timer / 15);
    _main.fg2.beginPath();
    _main.fg2.arc((-2 + _vfxQueue.vfxQueue[posInQueue].randomTail[2] * 4) * _activeStage.activeStage.scale, (-2 + _vfxQueue.vfxQueue[posInQueue].randomTail[3] * 4) * _activeStage.activeStage.scale, 2 * _activeStage.activeStage.scale, 0, _render.twoPi);
    _main.fg2.closePath();
    _main.fg2.fill();
    _main.fg2.restore();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/firefoxtail.js
// module id = 201
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/firefoxtail.js?