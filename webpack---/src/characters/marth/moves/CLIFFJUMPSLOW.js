"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _activeStage = __webpack_require__(18);

var _actionStateShortcuts = __webpack_require__(10);

var _Vec2D = __webpack_require__(22);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFJUMPSLOW",
  offset: [[-71.27, -23.71], [-71.15, -23.55], [-70.96, -23.07], [-70.73, -22.26], [-70.48, -21.16], [-70.21, -19.81], [-69.94, -18.28], [-69.70, -16.60], [-69.45, -14.12], [-69.19, -10.70], [-69.37, -7.08], [-68.97, -3.53], [-68.59, -1.00], [-68.40, 0], [-68.4, 0], [-68.4, 0], [-68.4, 0], [-68.4, 0]],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFJUMPSLOW";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 18;
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
      if (_main.player[p].timer < 19) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (_index2.default.CLIFFJUMPSLOW.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + _index2.default.CLIFFJUMPSLOW.offset[_main.player[p].timer - 1][1]);
      }
      if (_main.player[p].timer === 19) {
        _main.player[p].phys.cVel = new _Vec2D.Vec2D(1 * _main.player[p].phys.face, 2.4);
      }
      if (_main.player[p].timer > 19) {
        (0, _actionStateShortcuts.airDrift)(p, input);
        (0, _actionStateShortcuts.fastfall)(p, input);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 57) {
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
// ./src/characters/marth/moves/CLIFFJUMPSLOW.js
// module id = 371
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/CLIFFJUMPSLOW.js?