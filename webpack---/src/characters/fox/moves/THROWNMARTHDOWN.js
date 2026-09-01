"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec2D = __webpack_require__(22);

var _main = __webpack_require__(11);

exports.default = {
  name: "THROWNMARTHDOWN",
  canEdgeCancel: false,
  reverseModel: true,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-9.91, 4.76], [-11.99, 5.49], [-13.10, 5.88], [-13.10, 5.88], [-13.10, 5.88], [-13.33, 5.45], [-13.76, 3.95], [-13.44, 2.14], [-12.48, -0.03], [-10.43, -3.03], [-10.43, -3.03]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNMARTHDOWN";
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
// ./src/characters/fox/moves/THROWNMARTHDOWN.js
// module id = 466
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/THROWNMARTHDOWN.js?