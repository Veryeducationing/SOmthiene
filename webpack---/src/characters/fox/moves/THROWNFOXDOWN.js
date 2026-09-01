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
  offset: [[-4.73, -1.04], [-2.33, -2.27], [-1.90, -2.37], [-1.84, -2.24], [-1.84, -1.78], [-1.98, 0.41], [-1.04, 3.44], [-0.05, 4.15], [0.82, 4.32], [1.03, 4.03], [1.07, 3.56], [1.07, 3.82], [1.07, 4.00], [0.85, 4.14], [-0.45, 6.59], [-0.78, -4.04], [-0.82, -4.75], [-0.81, -3.89], [-0.78, -3.11], [-0.72, -3.45], [-0.65, -4.18], [-0.57, -4.29], [-0.50, -2.78], [-0.50, -5.04], [-0.50, -4.74], [-0.50, -4.44], [-0.50, -4.15], [-0.50, -3.88], [-0.50, -3.63], [-0.50, -3.40], [-0.50, -3.20], [-0.50, -3.04], [-0.50, -3.04]],
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
// ./src/characters/fox/moves/THROWNFOXDOWN.js
// module id = 470
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/THROWNFOXDOWN.js?