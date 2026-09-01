"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "THROWNFOXDOWN",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-4.30, -2.59], [-1.90, -3.81], [-1.47, -3.92], [-1.42, -3.79], [-1.41, -3.32], [-1.56, -1.14], [-0.61, 1.89], [0.37, 2.60], [1.24, 2.77], [1.46, 2.48], [1.49, 2.02], [1.50, 2.27], [1.50, 2.46], [1.28, 2.59], [-0.02, 5.04], [-0.35, -5.59], [-0.40, -6.30], [-0.39, -5.43], [-0.35, -4.66], [-0.30, -5.00], [-0.22, -5.73], [-0.14, -5.84], [-0.07, -4.33], [-0.07, -6.59], [-0.07, -6.29], [-0.07, -5.99], [-0.07, -5.70], [-0.07, -5.43], [-0.07, -5.17], [-0.07, -4.95], [-0.07, -4.75], [-0.07, -4.58], [-0.07, -4.58]],
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

    _index2.default.THROWNFOXDOWN.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.THROWNFOXDOWN.interrupt(p, input)) {
      var timer = _main.player[p].timer;
      if (timer > 0) {
        var grabbedBy = _main.player[p].phys.grabbedBy;
        if (grabbedBy === -1) {
          return;
        }
        if (timer > _index2.default.THROWNFOXDOWN.offset.length) {
          timer = _index2.default.THROWNFOXDOWN.offset.length - 1;
        }
        _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[grabbedBy].phys.pos.x + _index2.default.THROWNFOXDOWN.offset[timer - 1][0] * _main.player[p].phys.face, _main.player[grabbedBy].phys.pos.y + _index2.default.THROWNFOXDOWN.offset[timer - 1][1]);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    return false;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/THROWNFOXDOWN.js
// module id = 410
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/THROWNFOXDOWN.js?