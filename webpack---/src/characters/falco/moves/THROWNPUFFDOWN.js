"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _Vec2D = __webpack_require__(22);

exports.default = {
  name: "THROWNPUFFDOWN",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-10.26, -2.32], [-7.67, -3.61], [-4.94, -4.86], [-3.10, -5.80], [-0.94, -6.89], [-0.90, -6.87], [-1.00, -6.82], [-1.01, -6.86], [-0.94, -6.92], [-0.97, -6.90], [-1.02, -6.88], [-1.04, -6.86], [-1.00, -6.87], [-0.93, -6.88], [-0.91, -6.91], [-0.92, -6.94], [-0.91, -6.93], [-0.92, -6.90], [-0.92, -6.87], [-0.97, -6.87], [-1.00, -6.89], [-0.98, -6.92], [-0.96, -6.92], [-0.92, -6.89], [-0.89, -6.85], [-0.91, -6.84], [-0.96, -6.87], [-0.95, -6.92], [-0.93, -6.97], [-0.93, -6.95], [-0.95, -6.88], [-0.89, -6.82], [-0.84, -6.83], [-0.89, -6.89], [-0.94, -6.90], [-0.96, -6.89], [-0.96, -6.86], [-0.90, -6.84], [-0.86, -6.88], [-0.88, -6.93], [-0.88, -6.91], [-0.90, -6.88], [-0.92, -6.86], [-0.97, -6.86], [-1.00, -6.88], [-1.00, -6.92], [-0.98, -6.93], [-0.94, -6.90], [-0.91, -6.85], [-0.94, -6.83], [-0.99, -6.85], [-0.98, -6.89], [-0.98, -6.92], [-0.96, -6.91], [-0.95, -6.88], [-0.91, -6.83], [-0.90, -6.83], [-0.94, -6.89], [-0.93, -6.91], [-0.90, -6.95], [-0.93, -6.94], [-0.98, -6.92], [-0.98, -6.92]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNPUFFDOWN";
    if (_main.player[p].phys.grabbedBy < p) {
      _main.player[p].timer = -1;
    } else {
      _main.player[p].timer = 0;
    }
    _main.player[p].phys.grounded = false;

    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer > 0) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[_main.player[p].phys.grabbedBy].phys.pos.x + this.offset[_main.player[p].timer - 1][0] * _main.player[p].phys.face, _main.player[_main.player[p].phys.grabbedBy].phys.pos.y + this.offset[_main.player[p].timer - 1][1]);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    return false;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/THROWNPUFFDOWN.js
// module id = 595
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/THROWNPUFFDOWN.js?