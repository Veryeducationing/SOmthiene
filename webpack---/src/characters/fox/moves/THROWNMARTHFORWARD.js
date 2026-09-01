"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec2D = __webpack_require__(22);

var _main = __webpack_require__(11);

exports.default = {
  name: "THROWNMARTHFORWARD",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-11.08, 3.81], [-10.84, 5.65], [-10.05, 6.53], [-9.79, 6.65], [-9.70, 6.58], [-9.90, 6.41], [-11.24, 6.09], [-13.48, 4.96], [-11.16, 1.54], [-8.89, -3.65], [-8.89, -3.65]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNMARTHFORWARD";
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
          timer = this.offset.length - 1;
        }
        var grabbedBy = _main.player[p].phys.grabbedBy;
        if (grabbedBy === -1) {
          return;
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
// ./src/characters/fox/moves/THROWNMARTHFORWARD.js
// module id = 468
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/THROWNMARTHFORWARD.js?