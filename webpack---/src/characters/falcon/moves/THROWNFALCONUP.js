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
  offset: [[-8.50, -1.98], [-8.44, -1.96], [-7.98, -1.11], [-7.47, -0.71], [-6.93, -0.36], [-6.40, -0.03], [-5.92, 0.32], [-5.52, 0.72], [-5.94, 1.57], [-6.60, 0.62], [-9.12, -2.76], [-9.12, -1.99], [-9.12, -1.23], [-9.12, -1.97], [-9.12, -1.97]],
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
// ./src/characters/falcon/moves/THROWNFALCONUP.js
// module id = 692
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/THROWNFALCONUP.js?