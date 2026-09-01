"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _activeStage = __webpack_require__(18);

var _Vec2D = __webpack_require__(22);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFESCAPESLOW",
  offset: [[-73.10, -9.44], [-73.09, -9.56], [-73.09, -9.71], [-73.09, -9.87], [-73.09, -10.01], [-73.09, -10.12], [-73.09, -10.19], [-73.09, -10.23], [-73.09, -10.24], [-73.09, -10.21], [-73.09, -10.14], [-73.09, -10.04], [-73.09, -9.94], [-73.09, -9.89], [-73.09, -9.87], [-73.09, -9.87], [-73.09, -9.87], [-73.09, -9.63], [-73.09, -9.04], [-73.09, -8.28], [-73.09, -7.52], [-73.09, -6.76], [-73.09, -5.93], [-73.09, -5.07], [-73.09, -4.23], [-72.78, -3.37], [-72.02, -2.48], [-71.10, -1.64], [-70.28, -0.94], [-69.52, -0.43], [-68.80, -0.11], [-68, 0]],
  setVelocities: [0.63, 1.31, 1.52, 1.24, 0.96, 1.01, 1.05, 1.08, 1.11, 1.14, 1.16, 1.18, 1.20, 1.21, 1.22, 1.22, 1.22, 1.21, 1.20, 1.19, 1.17, 1.15, 1.12, 1.09, 1.06, 1.02, 0.98, 0.93, 0.88, 0.82, 0.77, 0.70, 0.63, 0.56, 0.49, 0.41, 0.32, 0.24, 0.15, 0.05, 0],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFESCAPESLOW";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 53;
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
      if (_main.player[p].timer < 33) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (_index2.default.CLIFFESCAPESLOW.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + _index2.default.CLIFFESCAPESLOW.offset[_main.player[p].timer - 1][1]);
      } else if (_main.player[p].timer < 74) {
        _main.player[p].phys.cVel.x = _index2.default.CLIFFESCAPESLOW.setVelocities[_main.player[p].timer - 33] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 32) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 79) {
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
// ./src/characters/puff/moves/CLIFFESCAPESLOW.js
// module id = 293
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/CLIFFESCAPESLOW.js?