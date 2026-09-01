"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _makeColour = __webpack_require__(15);

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

var _render = __webpack_require__(13);

var _blendColours = __webpack_require__(17);

exports.default = function (posInQueue) {
  //rgb(253,255,161)
  //rgb(198, 57, 5)
  var col = (0, _blendColours.blendColours)([253, 255, 161], [198, 57, 5], _vfxQueue.vfxQueue[posInQueue].timer / 9);
  _main.fg2.fillStyle = (0, _makeColour.makeColour)(col[0], col[1], col[2], 1 - _vfxQueue.vfxQueue[posInQueue].timer / 9);
  _main.fg2.beginPath();
  _main.fg2.arc(_vfxQueue.vfxQueue[posInQueue].newPos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], (_vfxQueue.vfxQueue[posInQueue].newPos.y + _vfxQueue.vfxQueue[posInQueue].timer) * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], 3 * _activeStage.activeStage.scale, 0, _render.twoPi);
  _main.fg2.closePath();
  _main.fg2.fill();
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/burnCircle.js
// module id = 186
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/burnCircle.js?