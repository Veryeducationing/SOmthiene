"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec2D = __webpack_require__(22);

var _main = __webpack_require__(11);

exports.default = {
  name: "THROWNPUFFUP",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-11.67, -7.58], [-10.82, -7.98], [-9.46, -8.40], [-7.03, -8.35], [-2.82, -7.60], [1.82, -6.29], [3.94, -4.87], [3.85, -3.69], [3.85, -3.69]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNPUFFUP";
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
      if (_main.player[p].timer > 0) {
        if (_main.player[p].phys) {
          var grabbedBy = _main.player[p].phys.grabbedBy;
          if (grabbedBy === -1) {
            return;
          }
          if (grabbedBy !== -1) {
            if (_main.player[p].timer > this.offset.length) {
              _main.player[p].timer = this.offset.length - 1;
            }
            _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[grabbedBy].phys.pos.x + this.offset[_main.player[p].timer - 1][0] * _main.player[p].phys.face, _main.player[grabbedBy].phys.pos.y + this.offset[_main.player[p].timer - 1][1]);
          }
        }
      }
    }
  },
  interrupt: function interrupt(p, input) {
    return false;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/THROWNPUFFUP.js
// module id = 668
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/THROWNPUFFUP.js?