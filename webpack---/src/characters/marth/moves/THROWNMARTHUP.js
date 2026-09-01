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
  name: "THROWNMARTHUP",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-9.42, 2.73], [-10.14, 2.56], [-10.83, 2.00], [-10.97, 1.82], [-10.74, 1.85], [-10.44, 1.95], [-10.17, 2.05], [-10.08, 2.08], [-11.07, 2.81], [-8.94, 11.00], [-8.94, 11.00]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNMARTHUP";
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
    _index2.default.THROWNMARTHUP.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.THROWNMARTHUP.interrupt(p, input)) {
      if (_main.player[p].timer > 0) {
        var playerTimer = _main.player[p].timer;
        if (playerTimer > _index2.default.THROWNMARTHUP.offset.length) {
          playerTimer = _index2.default.THROWNMARTHUP.offset.length - 1;
        }
        var grabbedBy = _main.player[p].phys.grabbedBy;
        if (grabbedBy === -1) {
          return;
        }
        _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[grabbedBy].phys.pos.x + _index2.default.THROWNMARTHUP.offset[playerTimer - 1][0] * _main.player[p].phys.face, _main.player[grabbedBy].phys.pos.y + _index2.default.THROWNMARTHUP.offset[playerTimer - 1][1]);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    return false;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/THROWNMARTHUP.js
// module id = 416
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/THROWNMARTHUP.js?