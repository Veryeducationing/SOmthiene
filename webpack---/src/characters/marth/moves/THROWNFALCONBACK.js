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
  offset: [[-3.78, 1.60], [1.86, 1.91], [4.79, 3.04], [5.79, 3.29], [6.25, 3.37], [5.91, 3.44], [4.69, 3.52], [2.92, 3.59], [-0.72, 3.59], [-1.49, 3.45], [3.06, 3.26], [11.75, 12.25], [12.35, 12.70], [12.96, 13.14], [12.36, 12.56], [11.77, 11.98], [12.37, 12.67], [12.98, 13.37], [12.38, 12.87], [12.38, 12.87]],
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
// ./src/characters/marth/moves/THROWNFALCONBACK.js
// module id = 431
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/THROWNFALCONBACK.js?