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
  name: "CLIFFGETUPSLOW",
  offset: [[-73.10, -9.44], [-73.10, -9.56], [-73.09, -9.71], [-73.09, -9.87], [-73.09, -10.01], [-73.09, -10.12], [-73.09, -10.19], [-73.09, -10.23], [-73.09, -10.24], [-73.09, -10.21], [-73.09, -10.14], [-73.09, -10.04], [-73.09, -9.94], [-73.09, -9.89], [-73.09, -9.87], [-73.09, -9.87], [-73.09, -9.87], [-73.09, -9.63], [-73.09, -9.04], [-73.09, -8.28], [-73.09, -7.52], [-73.09, -6.76], [-73.09, -5.93], [-73.09, -5.07], [-73.09, -4.23], [-72.76, -3.35], [-71.98, -2.44], [-71.05, -1.60], [-70.28, -0.94], [-69.68, -0.50], [-69.11, -0.21], [-68.66, -0.05], [-68.14, 0]],
  setVelocities: [0.12, 0.10, 0.08, 0.07, 0.06, 0.05, 0.05, 0.06, 0.07, 0.08, 0.09, 0.12, 0.16, 0.20, 0.23, 0.25, 0.25, 0.24, 0.21, 0.17, 0.12, 0.05, 0.004],
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
      var l = _activeStage.activeStage.ledge[onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 34) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (_index2.default.CLIFFGETUPSLOW.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + _index2.default.CLIFFGETUPSLOW.offset[_main.player[p].timer - 1][1]);
      } else if (_main.player[p].timer < 57) {
        _main.player[p].phys.cVel.x = _index2.default.CLIFFGETUPSLOW.setVelocities[_main.player[p].timer - 34] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 34) {
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
// ./src/characters/puff/moves/CLIFFGETUPSLOW.js
// module id = 295
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/CLIFFGETUPSLOW.js?