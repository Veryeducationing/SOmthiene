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
  name: "CLIFFGETUPQUICK",
  canBeGrabbed: true,
  offset: [[-70.7039, -13.92], [-71.27977, -12.96], [-71.69937, -12.06755], [-72.07638, -11.06843], [-72.24, -9.6], [-72.24, -6.74401], [-72.24, -3.84], [-71.35111, -1.99111], [-69.60889, -0.56889], [-67.19112, 0]],
  setVelocities: [0.48171, 0.47829, 0.50249, 0.51401, 0.45477, 0.32475, 0.12398, 0, 0, 0, 0],
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFGETUPQUICK";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 30;
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
      var l = _activeStage.activeStage.ledge[_main.player[p].phys.onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 24) {
        if (_main.player[p].timer >= 14) {
          _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (this.offset[_main.player[p].timer - 14][0] + 68.4) * _main.player[p].phys.face, y + this.offset[_main.player[p].timer - 14][1]);
        }
      } else {
        _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 24] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 24) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 33) {
      _main.player[p].phys.onLedge = -1;
      _main.player[p].phys.ledgeRegrabCount = true;
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/fox/moves/CLIFFGETUPQUICK.js
// module id = 473
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/CLIFFGETUPQUICK.js?