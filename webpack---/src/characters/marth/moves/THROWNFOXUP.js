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
  name: "THROWNFOXUP",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-6.22, -2.90], [-5.58, -2.40], [-5.10, -2.15], [-4.84, -2.89], [-4.66, 2.92], [-1.86, 9.18], [-1.86, 9.18], [-1.86, 9.18]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNFOXUP";
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
    _index2.default.THROWNFOXUP.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.THROWNFOXUP.interrupt(p, input)) {
      var timer = _main.player[p].timer;
      if (timer > 0) {
        var grabbedBy = _main.player[p].phys.grabbedBy;
        if (grabbedBy === -1) {
          return;
        }
        if (timer > _index2.default.THROWNFOXUP.offset.length) {
          timer = _index2.default.THROWNFOXUP.offset.length - 1;
        }
        _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[grabbedBy].phys.pos.x + _index2.default.THROWNFOXUP.offset[timer - 1][0] * _main.player[p].phys.face, _main.player[grabbedBy].phys.pos.y + _index2.default.THROWNFOXUP.offset[timer - 1][1]);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    return false;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/THROWNFOXUP.js
// module id = 412
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/THROWNFOXUP.js?