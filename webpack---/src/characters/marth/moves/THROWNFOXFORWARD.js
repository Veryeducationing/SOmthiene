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
  name: "THROWNFOXFORWARD",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-7.32 - 0.08, -2.32], [-6.75 - 0.22, -1.58], [-6.72 - 0.24, -1.42], [-6.91, -1.41], [-7.01 + 0.68, -1.25], [-7.22 + 1.67, -1.06], [-7.63 + 2.69, -0.90], [-8.35 + 3.47, -0.83], [-9.61 + 4.04, -0.93], [-11.60 + 4.04, -1.17], [-11.60 + 4.61, -1.17]],
  //[0.08,0.22,0.24,0,-0.68,-1.67,-2.69,-3.47,-4.04,-4.61]
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
    _index2.default.THROWNFOXFORWARD.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.THROWNFOXFORWARD.interrupt(p, input)) {

      var timer = _main.player[p].timer;
      if (timer > 0) {
        if (timer > _index2.default.THROWNFOXFORWARD.offset.length) {
          timer = _index2.default.THROWNFOXFORWARD.offset.length - 1;
        }
        var grabbedBy = _main.player[p].phys.grabbedBy;
        if (grabbedBy === -1) {
          return;
        }
        _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[grabbedBy].phys.pos.x + _index2.default.THROWNFOXFORWARD.offset[timer - 1][0] * _main.player[p].phys.face, _main.player[grabbedBy].phys.pos.y + _index2.default.THROWNFOXFORWARD.offset[timer - 1][1]);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    return false;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/THROWNFOXFORWARD.js
// module id = 411
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/THROWNFOXFORWARD.js?