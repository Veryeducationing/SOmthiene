"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec2D = __webpack_require__(22);

var _main = __webpack_require__(11);

exports.default = {
  name: "THROWNFALCOBACK",
  canEdgeCancel: false,
  reverseModel: true,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-9.32, -0.58], [-8.27, -0.79], [-5.10, -1.66], [-1.40, -2.95], [-1.76, -3.82], [-5.99, 0.79], [-8.22, 4.80], [-8.22, 4.80]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNFALCOBACK";
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
// ./src/characters/falco/moves/THROWNFALCOBACK.js
// module id = 608
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/THROWNFALCOBACK.js?