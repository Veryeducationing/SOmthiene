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
  offset: [[-4.21, 3.15], [1.43, 3.46], [4.36, 4.59], [5.37, 4.84], [5.82, 4.92], [5.48, 4.99], [4.26, 5.07], [2.49, 5.14], [-1.14, 5.14], [-1.91, 5.00], [2.63, 4.81], [11.32, 13.80], [11.93, 14.24], [12.53, 14.69], [11.94, 14.11], [11.34, 13.53], [11.95, 14.22], [12.55, 14.91], [11.96, 14.42], [11.96, 14.42]],
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
// ./src/characters/fox/moves/THROWNFALCONBACK.js
// module id = 489
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/THROWNFALCONBACK.js?