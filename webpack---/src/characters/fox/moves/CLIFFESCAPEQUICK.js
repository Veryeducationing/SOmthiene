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
  offset: [[-70.67906, -13.98], [-71.27813, -12.96], [-71.87907, -11.55], [-72.24, -9.6], [-72.24, -6.62999], [-72.24, -3.84], [-71.35111, -1.99114], [-69.60889, -0.5689], [-67.19112, 0]],
  setVelocities: [0.7218, 1.0418, 1.11641, 1.55599, 1.324, 0.93156, 1.16625, 0.78219, 0.37686, 0.33425, 0.24889, 0.27022, 0.35558, 0.3342, 1.92, 2.4414, 2.54756, 2.57555, 2.52538, 2.39703, 2.19051, 1.90581, 1.54296, 1.10192, 0.73904, 0.52734, 0.34701, 0.19804],
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
      var onLedge = _main.player[p].phys.onLedge;
      if (onLedge === -1) {
        this.canGrabLedge = false;
        return;
      }
      var l = _activeStage.activeStage.ledge[onLedge];
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
// ./src/characters/fox/moves/CLIFFESCAPEQUICK.js
// module id = 475
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/CLIFFESCAPEQUICK.js?