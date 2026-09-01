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
  offset: [[-4.21, 6.45], [1.43, 6.76], [4.36, 7.89], [5.37, 8.14], [5.82, 8.22], [5.48, 8.29], [4.26, 8.37], [2.49, 8.44], [-1.14, 8.44], [-1.91, 8.30], [2.63, 8.11], [11.32, 17.10], [11.93, 17.54], [12.53, 17.99], [11.94, 17.41], [11.34, 16.83], [11.95, 17.52], [12.55, 18.21], [11.96, 17.72], [11.96, 17.72]],
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
// ./src/characters/puff/moves/THROWNFALCONBACK.js
// module id = 351
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/THROWNFALCONBACK.js?