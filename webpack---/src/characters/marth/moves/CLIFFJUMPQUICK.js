"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _activeStage = __webpack_require__(18);

var _Vec2D = __webpack_require__(22);

var _actionStateShortcuts = __webpack_require__(10);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFJUMPQUICK",
  offset: [[-70.91, -23.37], [-70.48, -22.70], [-70.03, -21.59], [-69.59, -20.23], [-69.16, -18.77], [-68.76, -17.39], [-68.82, -16.26], [-69.31, -15.57], [-69.00, -13.87], [-68.51, -8.90], [-68.4, -2.95]],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFJUMPQUICK";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 11;
    _index2.default.CLIFFJUMPQUICK.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.CLIFFJUMPQUICK.interrupt(p, input)) {
      var onLedge = _main.player[p].phys.onLedge;
      if (onLedge === -1) {
        this.canGrabLedge = false;
        return;
      }
      var l = _activeStage.activeStage.ledge[onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 12) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (_index2.default.CLIFFJUMPQUICK.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + _index2.default.CLIFFJUMPQUICK.offset[_main.player[p].timer - 1][1]);
      }
      if (_main.player[p].timer === 12) {
        _main.player[p].phys.cVel = new _Vec2D.Vec2D(1 * _main.player[p].phys.face, 2.4);
      }
      if (_main.player[p].timer > 12) {
        (0, _actionStateShortcuts.airDrift)(p, input);
        (0, _actionStateShortcuts.fastfall)(p, input);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 50) {
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
// ./src/characters/marth/moves/CLIFFJUMPQUICK.js
// module id = 370
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/CLIFFJUMPQUICK.js?