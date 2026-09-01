"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec2D = __webpack_require__(22);

var _main = __webpack_require__(11);

exports.default = {
  name: "THROWNFALCODOWN",
  canEdgeCancel: false,
  reverseModel: true,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-4.26, -0.39], [-2.27, -1.49], [-2.11, -1.36], [-2.17, -0.28], [-1.60, 4.25], [-0.06, 5.97], [1.11, 6.14], [1.22, 5.42], [1.23, 5.58], [1.21, 5.92], [-0.05, 8.41], [-0.89, -3.42], [-0.94, -4.01], [-0.90, -2.52], [-0.83, -2.05], [-0.71, -1.65], [-0.60, -1.79], [-0.57, -4.56], [-0.57, -4.10], [-0.57, -3.66], [-0.57, -3.23], [-0.57, -2.85], [-0.57, -2.53], [-0.57, -2.27], [-0.57, -2.27]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNFALCODOWN";
    if (_main.player[p].phys.grabbedBy < p) {
      _main.player[p].timer = -1;
    } else {
      _main.player[p].timer = 0;
    }
    _main.player[p].phys.grounded = false;
    _main.player[p].phys.face *= -1;
    _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[_main.player[p].phys.grabbedBy].phys.pos.x, _main.player[_main.player[p].phys.grabbedBy].phys.pos.y);
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer > 0) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[_main.player[p].phys.grabbedBy].phys.pos.x + this.offset[_main.player[p].timer - 1][0] * _main.player[p].phys.face * -1, _main.player[_main.player[p].phys.grabbedBy].phys.pos.y + this.offset[_main.player[p].timer - 1][1]);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    return false;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/fox/moves/THROWNFALCODOWN.js
// module id = 484
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/THROWNFALCODOWN.js?