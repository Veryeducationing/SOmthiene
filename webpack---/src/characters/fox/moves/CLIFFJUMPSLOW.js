"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

var _main = __webpack_require__(11);

var _Vec2D = __webpack_require__(22);

var _actionStateShortcuts = __webpack_require__(10);

var _activeStage = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFJUMPSLOW",
  offset: [[-70.24197, -14.37161], [-70.01204, -14.25485], [-69.68486, -14.01434], [-69.31504, -13.61466], [-68.9572, -13.0204], [-68.66598, -12.19617], [-68.49598, -11.10656], [-68.49598, -8.58951], [-69.17776, -4.88456], [-68.95471, -2.05875], [-68.61933, -0.74366], [-68.49973, -0.30766], [-68.72181, -0.92297], [-69.22082, -2.17673], [-69.18517, -2.92594], [-69.0908, -3.15013], [-69.0474, -3.24815], [-69.17303, -2.92594], [-69.01739, -1.4797]],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFJUMPSLOW";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 19;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      var onLedge = _main.player[p].phys.onLedge;
      if (onLedge === -1) {
        this.canGrabLedge = false;
        return;
      }
      var l = _activeStage.activeStage.ledge[onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 20) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (this.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + this.offset[_main.player[p].timer - 1][1]);
      }
      if (_main.player[p].timer === 20) {
        _main.player[p].phys.cVel = new _Vec2D.Vec2D(1.1 * _main.player[p].phys.face, 4);
      }
      if (_main.player[p].timer > 20) {
        (0, _actionStateShortcuts.airDrift)(p, input);
        (0, _actionStateShortcuts.fastfall)(p, input);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 51) {
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
// ./src/characters/fox/moves/CLIFFJUMPSLOW.js
// module id = 478
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/CLIFFJUMPSLOW.js?