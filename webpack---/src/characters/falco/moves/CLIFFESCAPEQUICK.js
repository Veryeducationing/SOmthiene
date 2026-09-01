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
  name: "CLIFFESCAPEQUICK",
  offset: [[-71.01, -16.02], [-71.70, -14.85], [-72.39, -13.23], [-72.8, -11], [-72.8, -7.60], [-72.8, -4.4], [-71.78, -2.28], [-69.79, -0.65], [-67.01, 0]],
  setVelocities: [0.83, 1.19, 1.28, 1.78, 1.52, 1.07, 1.34, 0.90, 0.43, 0.38, 0.29, 0.31, 0.41, 0.38, 2.2, 2.80, 2.92, 2.95, 2.89, 2.75, 2.51, 2.18, 1.77, 1.26, 0.85, 0.60, 0.40, 0.23],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFESCAPEQUICK";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 34;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      var l = _activeStage.activeStage.ledge[_main.player[p].phys.onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 22) {
        if (_main.player[p].timer >= 13) {
          _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (this.offset[_main.player[p].timer - 13][0] + 68.4) * _main.player[p].phys.face, y + this.offset[_main.player[p].timer - 13][1]);
        }
      } else if (_main.player[p].timer < 50) {
        _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 22] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 22) {
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
// ./src/characters/falco/moves/CLIFFESCAPEQUICK.js
// module id = 616
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/CLIFFESCAPEQUICK.js?