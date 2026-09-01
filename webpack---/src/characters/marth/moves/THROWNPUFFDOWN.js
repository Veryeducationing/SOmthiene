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
  name: "THROWNPUFFDOWN",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-9.84, -3.86], [-7.24, -5.16], [-4.52, -6.41], [-2.68, -7.35], [-0.51, -8.44], [-0.48, -8.42], [-0.58, -8.37], [-0.59, -8.41], [-0.51, -8.47], [-0.54, -8.45], [-0.59, -8.42], [-0.61, -8.41], [-0.57, -8.42], [-0.50, -8.43], [-0.48, -8.46], [-0.49, -8.49], [-0.49, -8.48], [-0.49, -8.44], [-0.50, -8.42], [-0.54, -8.41], [-0.57, -8.44], [-0.56, -8.47], [-0.54, -8.47], [-0.50, -8.44], [-0.46, -8.40], [-0.49, -8.39], [-0.54, -8.42], [-0.52, -8.47], [-0.51, -8.52], [-0.50, -8.50], [-0.52, -8.43], [-0.46, -8.37], [-0.41, -8.38], [-0.47, -8.44], [-0.51, -8.45], [-0.53, -8.43], [-0.54, -8.41], [-0.47, -8.39], [-0.44, -8.43], [-0.45, -8.48], [-0.46, -8.46], [-0.48, -8.43], [-0.49, -8.41], [-0.55, -8.41], [-0.57, -8.43], [-0.57, -8.46], [-0.55, -8.47], [-0.51, -8.45], [-0.48, -8.40], [-0.51, -8.38], [-0.57, -8.39], [-0.55, -8.44], [-0.55, -8.47], [-0.54, -8.46], [-0.53, -8.43], [-0.48, -8.38], [-0.48, -8.38], [-0.52, -8.44], [-0.50, -8.46], [-0.48, -8.50], [-0.51, -8.49], [-0.55, -8.47], [-0.55, -8.47]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNPUFFDOWN";
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

    _index2.default.THROWNPUFFDOWN.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.THROWNPUFFDOWN.interrupt(p, input)) {
      var timer = _main.player[p].timer;
      if (timer > 0) {
        var grabbedBy = _main.player[p].phys.grabbedBy;
        if (grabbedBy === -1) {
          return;
        }
        if (timer > _index2.default.THROWNPUFFDOWN.offset.length) {
          timer = _index2.default.THROWNPUFFDOWN.offset.length - 1;
        }
        _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[grabbedBy].phys.pos.x + _index2.default.THROWNPUFFDOWN.offset[timer - 1][0] * _main.player[p].phys.face, _main.player[grabbedBy].phys.pos.y + _index2.default.THROWNPUFFDOWN.offset[timer - 1][1]);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    return false;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/THROWNPUFFDOWN.js
// module id = 418
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/THROWNPUFFDOWN.js?