"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _Vec2D = __webpack_require__(22);

exports.default = {
  name: "THROWNPUFFFORWARD",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-10.52, -3.27], [-9.84, -3.27], [-9.13, -3.27], [-8.70, -3.27], [-8.60, -3.27], [-8.61, -3.27], [-8.67, -3.27], [-8.70, -3.27], [-9.78, -3.27], [-9.78, 0.01]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNPUFFFORWARD";
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
// ./src/characters/fox/moves/THROWNPUFFFORWARD.js
// module id = 461
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/THROWNPUFFFORWARD.js?