"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _Vec2D = __webpack_require__(22);

exports.default = {
  name: "THROWNPUFFBACK",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  reverseModel: true,
  //[1.05,7.14],[3.78,7.55],[10.37,1.56],[13.72,-6.85],[13.66,-9.95],[13.67,-10.28],[13.85,-9.92],[14.04,-9.34],[14.04,-9.34]],
  offset: [[-11.68, -1.82], [-11.98, -2.11], [-12.06, -2.42], [-11.82, -2.59], [-11.02, -2.55], [-9.76, -2.44], [-8.40, -2.20], [-7.14, -1.47], [-5.78, 0.76], [-4.08, 3.57], [-2.08, 5.30], [-0.03, 6.46], [0.79 - 0.2, 8.91], [4.93 - 1.95, 8.20], [11.49 - 5.50, -0.05], [13.42 - 7.52, -7.78], [13.20 - 7.52, -8.67], [13.34 - 7.52, -8.58], [13.56 - 7.52, -7.97], [13.56 - 7.52, -7.97]],
  //7.53
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNPUFFBACK";
    if (_main.player[p].phys.grabbedBy < p) {
      _main.player[p].timer = -1;
    } else {
      _main.player[p].timer = 0;
    }
    _main.player[p].phys.grounded = false;
    _main.player[p].phys.face *= -1;
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
// ./src/characters/falco/moves/THROWNPUFFBACK.js
// module id = 596
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/THROWNPUFFBACK.js?