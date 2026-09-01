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
  offset: [[-70.79060, -21.52081], [-70.72351, -19.80777], [-70.65291, -18.01173], [-70.58144, -16.18735], [-70.51176, -14.38925], [-70.44653, -12.67208], [-70.38839, -11.09046], [-70.34, -9.69905], [-70.34, -9.21382], [-70.34, -8.72858], [-70.34, -8.24334], [-70.34, -7.75811], [-70.34, -5.57608], [-70.34, -3.39405], [-70.34, -1.21203], [-70.34, 0.97], [-63.20602, 0]],
  setVelocities: [5.16816, 3.87485, 2.33059, 2.43843, 2.50638, 2.53443, 2.52258, 2.47085, 2.37922, 2.24769, 2.07626, 1.86494, 1.61374, 1.32262, 0.99162, 0.62073, 0.20993, -0.00709, -0.00405, -0.00148, 0.00062, 0.00226, 0.00343, 0.00413, 0.00436, 0.00413, 0.00343, 0.00226, 0.00062, -0.00148, -0.00405, 0],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFESCAPEQUICK";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 24;
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
      if (_main.player[p].timer < 18) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (this.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + this.offset[_main.player[p].timer - 1][1]);
      } else {
        _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 18] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 18) {
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
// ./src/characters/falcon/moves/CLIFFESCAPEQUICK.js
// module id = 679
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/CLIFFESCAPEQUICK.js?