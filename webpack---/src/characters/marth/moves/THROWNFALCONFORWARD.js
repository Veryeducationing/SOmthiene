"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec2D = __webpack_require__(22);

var _main = __webpack_require__(11);

exports.default = {
  name: "THROWNFALCONFORWARD",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-7.02, 1.49], [-6.15, 2.09], [-5.49, 2.47], [-5.18, 2.48], [-4.95, 2.37], [-4.78, 2.20], [-4.69, 2.05], [-4.66, 1.97], [-5.52, 2.43], [-6.11, 2.52], [-6.64, 2.66], [-7.11, 2.66], [-7.42, 2.77], [-7.74, 2.87], [-7.16, 2.68], [-6.59, 2.49], [-6.85, 2.58], [-6.85, 2.58]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNFALCONFORWARD";
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
// ./src/characters/marth/moves/THROWNFALCONFORWARD.js
// module id = 432
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/THROWNFALCONFORWARD.js?