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
  offset: [[-70.47, -16.12], [-70.32, -15.85], [-70.15, -15.59], [-69.99, -15.25], [-69.86, -14.72], [-69.77, -13.92], [-69.75, -12.73], [-70.06, -9.84], [-70.58, -5.60], [-70.75, -2.36], [-70.36, -0.85], [-69.83, -0.35], [-69.45, -1.06], [-69.48, -2.49], [-69.73, -3.35], [-69.88, -3.61], [-69.87, -3.72], [-69.73, -3.35], [-69.02, -1.70]],
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
      var l = _activeStage.activeStage.ledge[_main.player[p].phys.onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 20) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (this.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + this.offset[_main.player[p].timer - 1][1]);
      }
      if (_main.player[p].timer === 20) {
        _main.player[p].phys.cVel = new _Vec2D.Vec2D(1 * _main.player[p].phys.face, 3.9);
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
// ./src/characters/falco/moves/CLIFFJUMPSLOW.js
// module id = 619
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/CLIFFJUMPSLOW.js?