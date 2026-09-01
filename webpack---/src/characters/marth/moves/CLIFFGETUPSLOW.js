"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _activeStage = __webpack_require__(18);

var _Vec2D = __webpack_require__(22);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFGETUPSLOW",
  offset: [[-71.28, -23.58], [-71.24, -23.27], [-71.18, -22.72], [-71.11, -21.97], [-71.04, -21.05], [-70.96, -20.00], [-70.87, -18.83], [-70.77, -17.58], [-70.67, -16.29], [-70.58, -14.97], [-70.48, -13.67], [-70.38, -12.40], [-70.28, -11.21], [-70.19, -10.05], [-70.10, -8.66], [-69.99, -6.99], [-69.86, -5.26], [-69.76, -3.64], [-69.74, -2.33], [-69.85, -1.49], [-70.07, -1.06], [-70.35, -0.79], [-70.62, -0.59], [-70.83, -0.41], [-70.92, -0.23], [-70.84, -0.1], [-70.66, -0.02], [-70.48, 0.03], [-70.28, 0.05], [-70.08, 0.05], [-69.87, 0.04], [-69.64, 0.02], [-69.40, 0.01], [-69.15, 0], [-68.87, 0], [-68.58, 0], [-67.95, 0]],
  setVelocities: [0.34, 0.36, 0.39, 0.40, 0.41, 0.41, 0.41, 0.41, 0.40, 0.40, 0.39, 0.39, 0.38],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFGETUPSLOW";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 55;
    _index2.default.CLIFFGETUPSLOW.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.CLIFFGETUPSLOW.interrupt(p, input)) {
      var onLedge = _main.player[p].phys.onLedge;
      if (onLedge === -1) {
        this.canGrabLedge = false;
        return;
      }
      var l = _activeStage.activeStage.ledge[_main.player[p].phys.onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 46) {
        if (_main.player[p].timer > 8) {
          _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (_index2.default.CLIFFGETUPSLOW.offset[_main.player[p].timer - 9][0] + 68.4) * _main.player[p].phys.face, y + _index2.default.CLIFFGETUPSLOW.offset[_main.player[p].timer - 9][1]);
        } else {
          _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (-71.31 + 68.4) * _main.player[p].phys.face, y - 23.71);
        }
      } else {
        _main.player[p].phys.cVel.x = _index2.default.CLIFFGETUPSLOW.setVelocities[_main.player[p].timer - 46] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 45) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 58) {
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
// ./src/characters/marth/moves/CLIFFGETUPSLOW.js
// module id = 369
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/CLIFFGETUPSLOW.js?