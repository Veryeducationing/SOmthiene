"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec2D = __webpack_require__(22);

var _main = __webpack_require__(11);

exports.default = {
  name: "THROWNFALCONBACK",
  canEdgeCancel: false,
  reverseModel: true,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-4.70, -2.40], [0.94, -2.09], [3.88, -0.96], [4.88, -0.71], [5.34, -0.63], [4.99, -0.56], [3.77, -0.48], [2.00, -0.41], [-1.63, -0.41], [-2.40, -0.55], [2.15, -0.74], [10.83, -8.25], [11.44, 8.70], [12.05, 9.14], [11.45, 8.56], [10.85, 7.98], [11.46, 8.67], [12.07, 9.37], [11.47, 8.87], [11.47, 8.87]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNFALCONBACK";
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
// ./src/characters/falcon/moves/THROWNFALCONBACK.js
// module id = 694
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/THROWNFALCONBACK.js?