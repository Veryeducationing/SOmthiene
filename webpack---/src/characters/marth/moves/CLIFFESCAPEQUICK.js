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
  name: "CLIFFESCAPEQUICK",
  offset: [[-70.31, -23.71], [-71.33, -23.71], [-71.36, -23.71], [-71.40, -23.71], [-71.43, -23.71], [-71.44, -23.71], [-71.42, -23.71], [-71.37, -23.71], [-71.28, -23.71], [-71.13, -22.69], [-70.93, -19.99], [-70.69, -16.19], [-70.40, -11.83], [-70.04, -7.48], [-69.69, -3.68], [-69.05, -1.01], [-67.74, 0]],
  setVelocities: [4.23, 4.22, 4.21, 1.74, 1.67, 1.61, 1.56, 1.51, 1.47, 1.44, 1.41, 1.39, 1.37, 1.36, 1.36, 1.36, 1.37, 0.14, 0.22, 0.42, 0.62, 0.68, 0.63, 0.49, 0.34, 0.27, 0.21, 0.17, 0.14, 0.13, 0.13],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFESCAPEQUICK";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 38;
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
      if (_main.player[p].timer < 18) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (_index2.default.CLIFFESCAPEQUICK.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + _index2.default.CLIFFESCAPEQUICK.offset[_main.player[p].timer - 1][1]);
      } else {
        _main.player[p].phys.cVel.x = _index2.default.CLIFFESCAPEQUICK.setVelocities[_main.player[p].timer - 18] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 17) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 48) {
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
// ./src/characters/marth/moves/CLIFFESCAPEQUICK.js
// module id = 366
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/CLIFFESCAPEQUICK.js?