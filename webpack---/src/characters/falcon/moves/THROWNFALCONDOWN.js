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
  offset: [[-3.83, -1.75], [3.24, -2.20], [8.47, -2.48], [10.62, -1.52], [12.15, -0.31], [13.33, 1.11], [13.67, 3.29], [10.51, 5.72], [6.51, 6.35], [1.40, 4.20], [-4.81, 1.50], [-9.35, -1.63], [-10.37, -5.72], [-9.45, -9.45], [-9.06, -10.44], [-9.06, -10.06], [-9.06, -9.92], [-9.06, -10.21], [-9.06, -10.44], [-9.06, -10.53], [-9.06, -10.53]],
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
// ./src/characters/falcon/moves/THROWNFALCONDOWN.js
// module id = 693
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/THROWNFALCONDOWN.js?