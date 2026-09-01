"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _main = __webpack_require__(11);

var _Vec2D = __webpack_require__(22);

var _activeStage = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFGETUPSLOW",
  offset: [[-70.6, -16.31], [-70.6, -16.09], [-70.6, -15.85], [-70.6, -15.61], [-70.6, -15.37], [-70.6, -15.17], [-70.6, -15.00], [-70.6, -14.89], [-70.6, -14.85], [-70.6, -14.85], [-70.6, -14.85], [-70.6, -14.85], [-70.6, -14.85], [-70.6, -14.85], [-70.6, -14.85], [-70.6, -14.85], [-70.6, -14.85], [-70.6, -14.83], [-70.6, -14.79], [-70.6, -14.72], [-70.6, -14.62], [-70.6, -14.50], [-70.6, -14.36], [-70.6, -14.20], [-70.6, -14.02], [-70.6, -13.84], [-70.6, -13.64], [-70.6, -13.42], [-70.6, -13.21], [-70.6, -12.99], [-70.6, -12.76], [-70.6, -12.54], [-70.6, -12.32], [-70.6, -12.1], [-70.6, -11.85], [-70.6, -11.53], [-70.6, -11.16], [-70.6, -10.75], [-70.6, -10.33], [-70.6, -9.9], [-70.6, -9.50], [-70.6, -9.12], [-70.6, -8.75], [-70.6, -8.33], [-70.6, -7.86], [-70.6, -7.29], [-70.6, -6.6], [-70.50, -5.58], [-70.22, -4.21], [-69.82, -2.73], [-69.35, -1.37], [-68.86, -0.38], [-67.94, 0]],
  setVelocities: [0.44, 0.47, 0.49, 0.50, 0.49, 0.47],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFGETUPSLOW";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 55;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      var l = _activeStage.activeStage.ledge[_main.player[p].phys.onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 54) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (this.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + this.offset[_main.player[p].timer - 1][1]);
      } else {
        _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 54] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 54) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 59) {
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
// ./src/characters/falco/moves/CLIFFGETUPSLOW.js
// module id = 615
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/CLIFFGETUPSLOW.js?