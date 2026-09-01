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
  offset: [[-0.77, 3.75], [8.07, 3.03], [11.38, 4.21], [13.31, 5.99], [14.22, 8.66], [9.60, 11.75], [3.59, 10.70], [-4.90, 6.82], [-9.87, 2.06], [-9.09, -3.47], [-8.58, -4.80], [-8.58, -4.27], [-8.58, -4.67], [-8.58, -4.93], [-8.58, -5.06], [-8.58, -5.06]],
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
// ./src/characters/fox/moves/THROWNFALCONDOWN.js
// module id = 488
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/THROWNFALCONDOWN.js?