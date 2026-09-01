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
  offset: [[-8.68 - 0.13, -0.58], [-8.13 - 0.29, 1.33], [-8.37 - 0.11, 1.34], [-8.53 + 0.78, 1.56], [-8.85 + 2.21, 1.83], [-9.59 + 3.58, 2.01], [-11.06 + 4.46, 1.97], [-13.78 + 5.28, 1.65], [-13.78 + 5.28, 1.65]],
  //[0.08,0.22,0.24,0,-0.68,-1.67,-2.69,-3.47,-4.04,-4.61]
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
// ./src/characters/falco/moves/THROWNFALCOFORWARD.js
// module id = 609
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/THROWNFALCOFORWARD.js?