"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec2D = __webpack_require__(22);

var _main = __webpack_require__(11);

exports.default = {
  name: "THROWNFALCOFORWARD",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-8.33 - 0.12, -1.07], [-7.71 - 0.28, -0.26], [-7.87 - 0.20, -0.21], [-8.04 + 0.40, -0.08], [-8.26 + 1.61, 0.17], [-8.74 + 2.97, 0.39], [-9.67 + 4.00, 0.49], [-11.45 + 4.75, 0.32], [-14.34 + 5.50, 0.01], [-14.34 + 5.50, 0.01]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNFALCOFORWARD";
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
// ./src/characters/marth/moves/THROWNFALCOFORWARD.js
// module id = 428
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/THROWNFALCOFORWARD.js?