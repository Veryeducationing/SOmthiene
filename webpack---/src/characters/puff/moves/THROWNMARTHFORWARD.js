"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _Vec2D = __webpack_require__(22);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "THROWNMARTHFORWARD",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-11.71, 7.06], [-10.22, 9.68], [-9.84, 9.94], [-9.70, 9.88], [-10.01, 9.67], [-14.00, 8.67], [-11.76, 5.89], [-8.89, -0.35], [-8.89, -0.35]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNMARTHFORWARD";
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
    _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[grabbedBy].phys.pos.x, _main.player[grabbedBy].phys.pos.y);
    _index2.default.THROWNMARTHFORWARD.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.THROWNMARTHFORWARD.interrupt(p, input)) {
      var timer = _main.player[p].timer;
      if (timer > 0) {
        if (timer > _index2.default.THROWNMARTHFORWARD.offset.length) {
          timer = _index2.default.THROWNMARTHFORWARD.offset.length - 1;
        }
        var grabbedBy = _main.player[p].phys.grabbedBy;
        if (grabbedBy === -1) {
          return;
        }
        _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[grabbedBy].phys.pos.x + _index2.default.THROWNMARTHFORWARD.offset[timer - 1][0] * _main.player[p].phys.face, _main.player[grabbedBy].phys.pos.y + _index2.default.THROWNMARTHFORWARD.offset[timer - 1][1]);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    return false;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/THROWNMARTHFORWARD.js
// module id = 335
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/THROWNMARTHFORWARD.js?