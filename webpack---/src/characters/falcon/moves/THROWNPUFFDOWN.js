"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _Vec2D = __webpack_require__(22);

exports.default = {
  name: "THROWNPUFFDOWN",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-10.75, -7.86], [-8.16, -9.15], [-5.43, -10.41], [-3.59, -11.35], [-1.43, -12.44], [-1.39, -12.42], [-1.49, -12.37], [-1.50, -12.41], [-1.43, -12.46], [-1.46, -12.45], [-1.51, -12.42], [-1.53, -12.41], [-1.48, -12.42], [-1.42, -12.43], [-1.40, -12.46], [-1.40, -12.49], [-1.40, -12.48], [-1.41, -12.44], [-1.41, -12.42], [-1.46, -12.41], [-1.49, -12.43], [-1.47, -12.47], [-1.45, -12.47], [-1.41, -12.44], [-1.37, -12.40], [-1.40, -12.39], [-1.45, -12.42], [-1.44, -12.47], [-1.42, -12.52], [-1.42, -12.50], [-1.44, -12.43], [-1.38, -12.37], [-1.33, -12.38], [-1.38, -12.44], [-1.43, -12.45], [-1.45, -12.43], [-1.45, -12.41], [-1.39, -12.40], [-1.35, -12.43], [-1.37, -12.48], [-1.37, -12.46], [-1.39, -12.43], [-1.41, -12.41], [-1.46, -12.41], [-1.49, -12.42], [-1.48, -12.46], [-1.47, -12.47], [-1.43, -12.45], [-1.40, -12.40], [-1.43, -12.38], [-1.48, -12.39], [-1.47, -12.44], [-1.46, -12.47], [-1.45, -12.46], [-1.44, -12.43], [-1.40, -12.38], [-1.39, -12.38], [-1.43, -12.44], [-1.41, -12.46], [-1.39, -12.50], [-1.39, -12.50]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNPUFFDOWN";
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
        _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[grabbedBy].phys.pos.x + this.offset[timer - 1][0] * _main.player[p].phys.face, _main.player[grabbedBy].phys.pos.y + this.offset[timer - 1][1]);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    return false;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/THROWNPUFFDOWN.js
// module id = 666
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/THROWNPUFFDOWN.js?