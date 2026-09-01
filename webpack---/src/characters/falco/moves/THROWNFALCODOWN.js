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
  offset: [[-4.55, -0.25], [-2.34, -1.47], [-2.11, -1.42], [-2.11, -0.82], [-2.09, 2.57], [-0.63, 5.71], [-0.72, 6.11], [-1.18, 5.83], [1.23, 5.31], [1.24, 5.70], [1.13, 6.03], [-0.51, 8.76], [-0.91, -3.89], [-0.94, -3.84], [-0.90, -2.46], [-0.83, -2.05], [-0.72, -1.66], [-0.61, -1.72], [-0.57, -4.24], [-0.57, -4.22], [-0.57, -3.79], [-0.57, -3.39], [-0.57, -3.01], [-0.57, -2.68], [-0.57, -2.40], [-0.57, -2.19], [-0.57, -2.19]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNFALCODOWN";
    if (_main.player[p].phys.grabbedBy < p) {
      _main.player[p].timer = -1;
    } else {
      _main.player[p].timer = 0;
    }
    _main.player[p].phys.grounded = false;
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
// ./src/characters/falco/moves/THROWNFALCODOWN.js
// module id = 607
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/THROWNFALCODOWN.js?