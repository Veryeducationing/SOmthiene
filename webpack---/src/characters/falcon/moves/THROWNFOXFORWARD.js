"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec2D = __webpack_require__(22);

var _main = __webpack_require__(11);

exports.default = {
  name: "THROWNFOXFORWARD",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-8.23 - 0.08, -6.32], [-7.66 - 0.22, -5.58], [-7.63 - 0.24, -5.42], [-7.82, -5.41], [-7.93 + 0.68, -5.25], [-8.14 + 1.67, -5.05], [-8.55 + 2.69, -4.90], [-9.26 + 3.47, -4.83], [-10.52 + 4.04, -4.93], [-12.52 + 4.61, -5.17], [-12.52 + 4.61, -5.17]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNFOXFORWARD";
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
    _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[grabbedBy].phys.pos.x, _main.player[grabbedBy].phys.pos.y);
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      var timer = _main.player[p].timer;
      if (timer > 0) {
        if (timer > this.offset.length) {
          _main.player[p].timer = this.offset.length - 1;
        }
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
// ./src/characters/falcon/moves/THROWNFOXFORWARD.js
// module id = 676
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/THROWNFOXFORWARD.js?