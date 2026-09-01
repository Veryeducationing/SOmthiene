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
  name: "THROWNPUFFUP",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-10.63, -3.65], [-9.46, -4.14], [-7.29, -4.39], [-2.98, -3.79], [2.65, -2.33], [4.95, -0.64], [4.95, -0.64]],
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
    _index2.default.THROWNPUFFUP.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.THROWNPUFFUP.interrupt(p, input)) {
      var timer = _main.player[p].timer;
      if (timer > 0) {
        if (_main.player[p].phys) {
          var grabbedBy = _main.player[p].phys.grabbedBy;
          if (grabbedBy !== -1) {
            if (timer > _index2.default.THROWNPUFFUP.offset.length) {
              timer = _index2.default.THROWNPUFFUP.offset.length - 1;
            }
            _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[grabbedBy].phys.pos.x + _index2.default.THROWNPUFFUP.offset[timer - 1][0] * _main.player[p].phys.face, _main.player[grabbedBy].phys.pos.y + _index2.default.THROWNPUFFUP.offset[timer - 1][1]);
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
// ./src/characters/marth/moves/THROWNPUFFUP.js
// module id = 420
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/THROWNPUFFUP.js?