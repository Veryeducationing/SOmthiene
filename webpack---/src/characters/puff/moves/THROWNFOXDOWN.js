"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "THROWNFOXDOWN",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-4.73, 2.26], [-2.33, 1.03], [-1.90, 0.93], [-1.84, 1.06], [-1.84, 1.52], [-1.98, 3.71], [-1.04, 6.74], [-0.05, 7.45], [0.82, 7.62], [1.03, 7.33], [1.07, 6.86], [1.07, 7.12], [1.07, 7.30], [0.85, 7.44], [-0.45, 9.89], [-0.78, -0.74], [-0.82, -1.45], [-0.81, -0.59], [-0.78, 0.19], [-0.72, -0.15], [-0.65, -0.88], [-0.57, -0.99], [-0.50, 0.52], [-0.50, -1.74], [-0.50, -1.44], [-0.50, -1.14], [-0.50, -0.85], [-0.50, -0.58], [-0.50, -0.33], [-0.50, -0.10], [-0.50, 0.10], [-0.50, 0.26], [-0.50, 0.26]],
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
// ./src/characters/puff/moves/THROWNFOXDOWN.js
// module id = 330
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/THROWNFOXDOWN.js?