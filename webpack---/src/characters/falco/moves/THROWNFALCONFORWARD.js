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
  offset: [[-7.45, 3.04], [-6.58, 3.64], [-5.92, 4.02], [-5.61, 4.03], [-5.37, 3.92], [-5.21, 3.75], [-5.11, 3.60], [-5.09, 3.52], [-5.95, 3.98], [-6.53, 4.06], [-7.06, 4.21], [-7.54, 4.21], [-7.85, 4.31], [-8.17, 4.42], [-7.59, 4.23], [-7.01, 4.04], [-7.28, 4.13], [-7.28, 4.13]],
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
// ./src/characters/falco/moves/THROWNFALCONFORWARD.js
// module id = 613
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/THROWNFALCONFORWARD.js?