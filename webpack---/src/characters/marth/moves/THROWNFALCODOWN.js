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
  offset: [[-4.47, -1.65], [-2.03, -2.99], [-1.69, -3.03], [-1.70, -2.64], [-1.88, -0.66], [-0.88, 3.40], [0.42, 4.44], [1.48, 4.62], [1.64, 4.08], [1.65, 3.84], [1.67, 4.18], [1.54, 4.48], [-0.02, 7.33], [-0.47, -5.16], [-0.52, -5.64], [-0.49, -4.32], [-0.43, -3.75], [-0.34, -3.36], [-0.24, -3.15], [-0.15, -3.52], [-0.15, -6.06], [-0.15, -5.67], [-0.15, -5.28], [-0.15, -4.91], [-0.15, -4.57], [-0.15, -4.26], [-0.15, -4.00], [-0.15, -3.79], [-0.15, -3.79]],
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
// ./src/characters/marth/moves/THROWNFALCODOWN.js
// module id = 426
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/THROWNFALCODOWN.js?