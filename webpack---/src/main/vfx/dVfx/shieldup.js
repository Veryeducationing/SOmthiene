"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _main = __webpack_require__(11);

var _makeColour = __webpack_require__(15);

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

var _render = __webpack_require__(13);

exports.default = function (posInQueue) {
    _main.fg2.strokeStyle = (0, _makeColour.makeColour)(255, 255, 255, 0.8 * ((_vfxQueue.vfxQueue[posInQueue].frames - _vfxQueue.vfxQueue[posInQueue].timer) / _vfxQueue.vfxQueue[posInQueue].frames));
    _main.fg2.lineWidth = 10;
    _main.fg2.beginPath();
    _main.fg2.arc(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], _vfxQueue.vfxQueue[posInQueue].facing * _activeStage.activeStage.scale + 10 + 5 * (_vfxQueue.vfxQueue[posInQueue].timer - 1), _render.twoPi, 0);
    _main.fg2.stroke();
    _main.fg2.lineWidth = 5;
    _main.fg2.beginPath();
    _main.fg2.arc(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _vfxQueue.vfxQueue[posInQueue].newPos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], _vfxQueue.vfxQueue[posInQueue].facing * _activeStage.activeStage.scale + 5 * (_vfxQueue.vfxQueue[posInQueue].timer - 1), _render.twoPi, 0);
    _main.fg2.stroke();
    _main.fg2.lineWidth = 1;
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/shieldup.js
// module id = 218
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/shieldup.js?