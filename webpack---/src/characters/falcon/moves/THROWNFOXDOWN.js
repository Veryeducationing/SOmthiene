"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec2D = __webpack_require__(22);

var _main = __webpack_require__(11);

exports.default = {
  name: "THROWNFOXDOWN",
  canEdgeCancel: false,
  reverseModel: true,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-5.22, -6.59], [-2.81, -7.81], [-2.39, -7.92], [-2.33, -7.79], [-2.33, -7.32], [-2.47, -5.14], [-1.53, -2.11], [-0.54, -1.39], [0.33, -1.23], [0.54, -1.52], [0.58, -1.98], [0.59, -1.73], [0.58, -1.54], [0.36, -1.41], [-0.93, 1.04], [-1.27, -9.58], [-1.31, -10.30], [-1.30, -9.43], [-1.26, -8.65], [-1.21, -9.00], [-1.13, -9.73], [-1.06, -9.84], [-0.99, -8.33], [-0.99, -10.59], [-0.99, -10.30], [-0.99, -9.99], [-0.99, -9.70], [-0.99, -9.43], [-0.99, -9.17], [-0.99, -8.95], [-0.99, -8.75], [-0.99, -8.58], [-0.99, -8.58]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNFOXDOWN";
    var grabbedBy = _main.player[p].phys.grabbedBy;
    if (grabbedBy === -1) {
      return;
    }
    if (grabbedBy < p) {
      _main.player[p].timer = -1;
    } else {
      _main.player[p].timer = 0;
    }
    _main.player[p].phys.grounded = false;
    _main.player[p].phys.face *= -1;
    _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[grabbedBy].phys.pos.x, _main.player[grabbedBy].phys.pos.y);
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      var timer = _main.player[p].timer;
      if (timer > 0) {
        var grabbedBy = _main.player[p].phys.grabbedBy;
        if (grabbedBy === -1) {
          return;
        }
        if (timer > this.offset.length) {
          timer = this.offset.length - 1;
        }
        _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[grabbedBy].phys.pos.x + this.offset[timer - 1][0] * _main.player[p].phys.face * -1, _main.player[grabbedBy].phys.pos.y + this.offset[timer - 1][1]);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    return false;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/THROWNFOXDOWN.js
// module id = 674
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/THROWNFOXDOWN.js?