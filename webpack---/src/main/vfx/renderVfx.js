"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderVfx = renderVfx;

var _vfxQueue = __webpack_require__(183);

var _vfx = __webpack_require__(135);

function renderVfx(otherFrame) {
  var altFrame = otherFrame;
  altFrame = altFrame || false;
  var popQueue = [];
  for (var posInQueue = 0; posInQueue < _vfxQueue.vfxQueue.length; posInQueue++) {
    _vfxQueue.vfxQueue[posInQueue].timer++;
    if (_vfxQueue.vfxQueue[posInQueue].frames >= _vfxQueue.vfxQueue[posInQueue].timer) {
      if ((0, _vfx.isShowSFX)() || _vfxQueue.vfxQueue[posInQueue].name === "start") {
        if (!altFrame) {
          _vfx.dVfx[_vfxQueue.vfxQueue[posInQueue].name](posInQueue);
        }
        // if 30fps mode on the other frame, still call swing function but just don't draw
        else if (_vfxQueue.vfxQueue[posInQueue].name === "swing") {
            _vfx.dVfx.swing(posInQueue, false);
          }
      }
    } else {
      popQueue.push(posInQueue);
    }
  }
  for (var k = 0; k < popQueue.length; k++) {
    (0, _vfxQueue.dropFromVfxQueue)(popQueue[k] - k, 1);
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/renderVfx.js
// module id = 261
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/renderVfx.js?