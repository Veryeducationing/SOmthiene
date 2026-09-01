"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec2D = __webpack_require__(22);

var _main = __webpack_require__(11);

exports.default = {
  name: "THROWNFALCONDOWN",
  canEdgeCancel: false,
  reverseModel: true,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-1.70, 2.27], [6.49, 1.63], [10.74, 2.04], [12.76, 3.41], [14.22, 5.07], [14.34, 7.74], [9.84, 10.25], [4.80, 9.54], [-2.32, 6.06], [-8.30, 2.55], [-9.31, -2.37], [-8.23, -6.33], [-8.15, -6.24], [-8.15, -5.85], [-8.15, -6.19], [-8.15, -6.45], [-8.15, -6.56], [-8.15, -6.56], [-8.15, -6.56], [-8.15, -6.56]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNFALCONDOWN";
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
// ./src/characters/marth/moves/THROWNFALCONDOWN.js
// module id = 430
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/THROWNFALCONDOWN.js?