"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _activeStage = __webpack_require__(18);

var _Vec2D = __webpack_require__(22);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFESCAPESLOW",
  offset: [[-71.27, -23.58], [-71.21, -23.27], [-71.14, -22.72], [-71.05, -21.97], [-70.96, -21.05], [-70.86, -20.0], [-70.76, -18.83], [-70.65, -17.58], [-70.55, -16.29], [-70.45, -14.97], [-70.37, -13.67], [-70.29, -12.40], [-70.23, -11.21], [-70.18, -10.07], [-70.13, -8.90], [-70.01, -6.95], [-69.12, -2.82], [-67.68, 0]],
  setVelocities: [0, 0, 0, 0, 0, 0, 0, 0, 0.02, 2.76, 2.65, 2.55, 2.44, 2.34, 2.23, 2.12, 2.01, 1.90, 1.79, 1.68, 1.56, 1.45, 1.34, 1.24, 1.15, 1.07, 0.99, 0.91, 0.85, 0.79, 0.64, 0.42, 0.25, 0.14, 0.08, 0.07, 0.08, 0.07, 0.06, 0.05, 0.05, 0.04, 0.03, 0.02, 0.02, 0.01, 0.01, 0, 0, 0, -0.01],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFESCAPESLOW";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 56;
    _index2.default.CLIFFESCAPESLOW.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.CLIFFESCAPESLOW.interrupt(p, input)) {
      var onLedge = _main.player[p].phys.onLedge;
      if (onLedge === -1) {
        this.canGrabLedge = false;
        return;
      }
      var l = _activeStage.activeStage.ledge[onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 28) {
        if (_main.player[p].timer > 9) {
          _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (_index2.default.CLIFFESCAPESLOW.offset[_main.player[p].timer - 10][0] + 68.4) * _main.player[p].phys.face, y + _index2.default.CLIFFESCAPESLOW.offset[_main.player[p].timer - 10][1]);
        } else {
          _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (-71.31 + 68.4) * _main.player[p].phys.face, y - 23.71);
        }
      } else {
        _main.player[p].phys.cVel.x = _index2.default.CLIFFESCAPESLOW.setVelocities[_main.player[p].timer - 28] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 27) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 78) {
      _main.player[p].phys.onLedge = -1;
      _main.player[p].phys.ledgeRegrabCount = false;
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/CLIFFESCAPESLOW.js
// module id = 367
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/CLIFFESCAPESLOW.js?