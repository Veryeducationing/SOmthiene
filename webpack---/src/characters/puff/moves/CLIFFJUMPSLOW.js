"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _activeStage = __webpack_require__(18);

var _Vec2D = __webpack_require__(22);

var _actionStateShortcuts = __webpack_require__(10);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFJUMPSLOW",
  offset: [[-73.10, -9.01], [-73.10, -8.03], [-73.09, -6.73], [-73.09, -5.37], [-73.09, -4.23], [-72.76, -3.29], [-71.98, -2.38], [-71.05, -1.58], [-70.28, -0.94], [-69.66, -0.50], [-69.05, -0.21], [-68.59, -0.05], [-68.4, 0], [-68.4, 0], [-68.4, 0], [-68.4, 0], [-68.4, 0]],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFJUMPSLOW";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 17;
    _index2.default.CLIFFJUMPSLOW.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.CLIFFJUMPSLOW.interrupt(p, input)) {
      var onLedge = _main.player[p].phys.onLedge;
      if (onLedge === -1) {
        this.canGrabLedge = false;
        return;
      }
      var l = _activeStage.activeStage.ledge[onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 18) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (_index2.default.CLIFFJUMPSLOW.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + _index2.default.CLIFFJUMPSLOW.offset[_main.player[p].timer - 1][1]);
      }
      if (_main.player[p].timer === 18) {
        _main.player[p].phys.cVel = new _Vec2D.Vec2D(1.1 * _main.player[p].phys.face, 1.8);
      }
      if (_main.player[p].timer > 18) {
        (0, _actionStateShortcuts.airDrift)(p, input);
        (0, _actionStateShortcuts.fastfall)(p, input);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 38) {
      _main.player[p].phys.onLedge = -1;
      _main.player[p].phys.ledgeRegrabCount = false;
      _FALL2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/CLIFFJUMPSLOW.js
// module id = 297
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/CLIFFJUMPSLOW.js?