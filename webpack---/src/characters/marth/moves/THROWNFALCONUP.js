"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec2D = __webpack_require__(22);

var _main = __webpack_require__(11);

exports.default = {
  name: "THROWNFALCONUP",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-7.58, 2.02], [-7.52, 2.04], [-7.07, 2.89], [-6.56, 3.29], [-6.02, 3.64], [-5.49, 3.97], [-5.00, 4.32], [-4.61, 4.72], [-5.02, 5.57], [-5.68, 4.62], [-8.21, 1.24], [-8.21, 2.00], [-8.21, 2.77], [-8.21, 2.03], [-8.21, 2.03]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNFALCONUP";
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
// ./src/characters/marth/moves/THROWNFALCONUP.js
// module id = 429
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/THROWNFALCONUP.js?