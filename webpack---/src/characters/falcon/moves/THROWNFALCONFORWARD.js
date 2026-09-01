"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec2D = __webpack_require__(22);

var _main = __webpack_require__(11);

exports.default = {
  name: "THROWNFALCONFORWARD",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-7.94, -2.51], [-7.07, -1.90], [-6.40, -1.53], [-6.10, -1.52], [-5.86, -1.63], [-5.70, -1.80], [-5.60, -1.95], [-5.58, -2.03], [-6.44, -1.57], [-7.02, -1.48], [-7.55, -1.34], [-8.02, -1.33], [-8.34, -1.23], [-8.66, -1.13], [-8.08, -1.32], [-7.50, -1.51], [-7.77, -1.42], [-7.77, -1.42]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNFALCONFORWARD";
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
// ./src/characters/falcon/moves/THROWNFALCONFORWARD.js
// module id = 695
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/THROWNFALCONFORWARD.js?