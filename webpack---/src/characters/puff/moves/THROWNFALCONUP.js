"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec2D = __webpack_require__(22);

var _main = __webpack_require__(11);

exports.default = {
  name: "THROWNFALCONUP",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-8.01, 6.87], [-7.95, 6.89], [-7.49, 7.74], [-6.98, 8.14], [-6.44, 8.49], [-5.91, 8.82], [-5.43, 9.17], [-5.03, 9.57], [-5.45, 10.42], [-6.11, 9.47], [-8.63, 6.09], [-8.63, 6.85], [-8.63, 7.61], [-8.63, 6.88], [-8.63, 6.88]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNFALCONUP";
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
// ./src/characters/puff/moves/THROWNFALCONUP.js
// module id = 349
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/THROWNFALCONUP.js?