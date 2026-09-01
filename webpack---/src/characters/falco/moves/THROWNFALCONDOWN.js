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
  offset: [[-1.40, 3.79], [7.22, 3.08], [10.92, 3.92], [12.89, 5.51], [14.28, 7.53], [11.90, 10.82], [6.58, 11.82], [-0.49, 8.49], [-7.85, 5.02], [-9.88, -0.17], [-8.69, -4.69], [-8.58, -4.66], [-8.58, -4.35], [-8.58, -4.72], [-8.58, -4.94], [-8.58, -4.94]],
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
// ./src/characters/falco/moves/THROWNFALCONDOWN.js
// module id = 611
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/THROWNFALCONDOWN.js?