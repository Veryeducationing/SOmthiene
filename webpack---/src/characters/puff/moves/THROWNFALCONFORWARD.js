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
  offset: [[-7.45, 6.34], [-6.58, 6.94], [-5.92, 7.32], [-5.61, 7.33], [-5.37, 7.22], [-5.21, 7.05], [-5.11, 6.90], [-5.09, 6.82], [-5.95, 7.28], [-6.53, 7.36], [-7.06, 7.51], [-7.54, 7.51], [-7.85, 7.61], [-8.17, 7.72], [-7.59, 7.53], [-7.01, 7.34], [-7.28, 7.43], [-7.28, 7.43]],
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
// ./src/characters/puff/moves/THROWNFALCONFORWARD.js
// module id = 352
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/THROWNFALCONFORWARD.js?