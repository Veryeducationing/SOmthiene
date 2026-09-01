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
  offset: [[-3.25, 2.28], [-2.13, 1.81], [-2.11, 2.48], [-1.60, 7.55], [0.31, 9.35], [1.18, 9.13], [1.23, 8.76], [1.21, 9.22], [-0.51, 12.06], [-0.93, -0.96], [-0.92, 0.46], [-0.83, 1.25], [-0.68, 1.69], [-0.56, 0.52], [-0.57, -0.92], [-0.57, -0.36], [-0.57, 0.16], [-0.57, 0.62], [-0.57, 0.97], [-0.57, 0.97]],
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
// ./src/characters/puff/moves/THROWNFALCODOWN.js
// module id = 346
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/THROWNFALCODOWN.js?