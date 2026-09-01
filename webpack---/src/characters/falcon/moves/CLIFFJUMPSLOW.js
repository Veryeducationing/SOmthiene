"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

var _main = __webpack_require__(11);

var _Vec2D = __webpack_require__(22);

var _actionStateShortcuts = __webpack_require__(10);

var _activeStage = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFJUMPSLOW",
  offset: [[-70.66608, -21.52236], [-70.45539, -19.85754], [-70.2335, -18.12355], [-70.01323, -16.34217], [-69.80743, -14.53517], [-69.62891, -12.72434], [-69.49054, -10.93145], [-69.39681, -9.05661], [-69.33996, -7.05793], [-69.31442, -5.04416], [-69.31463, -3.12407], [-69.33501, -1.40643], [-69.37, 0], [-69.51372, 0.50389], [-69.73824, 0.19807], [-69.855, 0], [-69.8101, 0.32332], [-69.65741, 0.75444]],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFJUMPSLOW";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 18;
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
      if (_main.player[p].timer < 19) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (this.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + this.offset[_main.player[p].timer - 1][1]);
      }
      if (_main.player[p].timer === 19) {
        _main.player[p].phys.cVel = new _Vec2D.Vec2D(1 * _main.player[p].phys.face, 3.3);
      }
      if (_main.player[p].timer > 19) {
        (0, _actionStateShortcuts.airDrift)(p, input);
        (0, _actionStateShortcuts.fastfall)(p, input);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 53) {
      _main.player[p].phys.onLedge = -1;
      _main.player[p].phys.ledgeRegrabCount = false;
      _FALL2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/CLIFFJUMPSLOW.js
// module id = 682
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/CLIFFJUMPSLOW.js?