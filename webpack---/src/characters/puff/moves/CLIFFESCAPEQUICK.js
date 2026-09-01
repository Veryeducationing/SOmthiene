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
  name: "CLIFFESCAPEQUICK",
  offset: [[-74.04, -8.78], [-74.48, -7.21], [-74.42, -5.16], [-74.24, -3.09], [-73.97, -1.28], [-73.59, 0.24], [-73.14, 1.46], [-72.61, 2.35], [-72.01, 2.87], [-71.36, 3.00], [-70.66, 2.72], [-69.93, 1.80], [-69.17, 0.60], [-67.63, 0]],
  setVelocities: [0.64, 0.40, 0.21, 0.08, -0.003, -0.03, 0.002, 0.09, 0.23, 0.42, 0.67, 0.97, 1.27, 1.52, 1.76, 1.99, 2.21, 2.42, 2.62, 2.81, 2.99, 3.16, 3.32, 3.48, 0.12, 0.33, 0.49, 0.59, 0.65, 0.65, 0.60, 0.49, 0.34, 0.13, 0.002],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFESCAPEQUICK";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 28;
    _index2.default.CLIFFESCAPEQUICK.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.CLIFFESCAPEQUICK.interrupt(p, input)) {
      var onLedge = _main.player[p].phys.onLedge;
      if (onLedge === -1) {
        this.canGrabLedge = false;
        return;
      }
      var l = _activeStage.activeStage.ledge[onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 15) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (_index2.default.CLIFFESCAPEQUICK.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + _index2.default.CLIFFESCAPEQUICK.offset[_main.player[p].timer - 1][1]);
      } else if (_main.player[p].timer < 50) {
        _main.player[p].phys.cVel.x = _index2.default.CLIFFESCAPEQUICK.setVelocities[_main.player[p].timer - 15] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 15) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 49) {
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
// ./src/characters/puff/moves/CLIFFESCAPEQUICK.js
// module id = 292
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/CLIFFESCAPEQUICK.js?