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
  offset: [[-9.39 - 0.09, -5.26], [-8.74 - 0.24, -4.41], [-8.65 - 0.29, -4.19], [-8.87 - 0.07, -4.20], [-8.98 + 0.59, -4.03], [-9.18 + 1.63, -3.82], [-9.57 + 2.78, -3.63], [-10.24 + 3.75, -3.52], [-11.39 + 4.40, -3.57], [-13.29 + 5.03, -3.79], [-15.98 + 5.65, -4.05], [-15.98 + 5.65, -4.05]],
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
// ./src/characters/falcon/moves/THROWNFALCOFORWARD.js
// module id = 690
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/THROWNFALCOFORWARD.js?