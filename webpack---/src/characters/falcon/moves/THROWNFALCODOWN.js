"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec2D = __webpack_require__(22);

var _main = __webpack_require__(11);

exports.default = {
  name: "THROWNFALCODOWN",
  canEdgeCancel: false,
  reverseModel: true,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-6.04, -5.52], [-3.24, -6.90], [-2.69, -7.05], [-2.60, -6.95], [-2.61, -6.51], [-2.80, -4.59], [-2.00, -1.07], [-0.90, 0.29], [0.14, 0.55], [0.66, 0.47], [0.73, -0.07], [0.74, -0.14], [0.76, 0.15], [0.71, 0.42], [-0.11, 1.68], [-1.25, -1.01], [-1.41, -9.57], [-1.43, -9.58], [-1.41, -8.46], [-1.37, -7.84], [-1.30, -7.53], [-1.21, -7.23], [-1.13, -7.17], [-1.06, -7.62], [-1.06, -10.10], [-1.06, -9.77], [-1.06, -9.44], [-1.06, -9.12], [-1.06, -8.82], [-1.06, -8.53], [-1.06, -8.28], [-1.06, -8.05], [-1.06, -7.86], [-1.06, -7.71], [-1.06, -7.71]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNFALCODOWN";
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
// ./src/characters/falcon/moves/THROWNFALCODOWN.js
// module id = 688
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/THROWNFALCODOWN.js?