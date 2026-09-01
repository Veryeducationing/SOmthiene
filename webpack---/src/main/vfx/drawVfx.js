"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawVfx = drawVfx;

var _deepCopy = __webpack_require__(85);

var _vfx = __webpack_require__(135);

var _activeStage = __webpack_require__(18);

var _vfxQueue = __webpack_require__(183);

var _Vec2D = __webpack_require__(22);

function drawVfx(vfxConfig) {
  var facing = vfxConfig.f;
  if (typeof vfxConfig.f === 'undefined') {
    facing = -1;
  }
  var instance = (0, _deepCopy.deepCopyObject)(true, _vfx.vfx[vfxConfig.name]);
  if (instance.name === "circleDust") {
    instance.circles[0] = Math.random() * -2;
    instance.circles[1] = Math.random() * -_activeStage.activeStage.scale - 2;
    instance.circles[2] = Math.random() * 2;
    instance.circles[3] = Math.random() * _activeStage.activeStage.scale + 2;
  }
  instance = Object.assign(instance, vfxConfig);
  var x = vfxConfig.pos.x;
  var y = vfxConfig.pos.y;
  instance.face = vfxConfig.face;
  instance.newPos = new _Vec2D.Vec2D(x, y);
  instance.facing = facing;
  instance.timer = 0;
  (0, _vfxQueue.addToVfxQueue)(instance);
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/drawVfx.js
// module id = 134
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/drawVfx.js?