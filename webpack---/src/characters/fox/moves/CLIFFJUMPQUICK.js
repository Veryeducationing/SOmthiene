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
  name: "CLIFFJUMPQUICK",
  offset: [[-70.8428, -14.38776], [-71.49446, -14.32052], [-72.19153, -14.1652], [-72.85054, -13.88868], [-73.38803, -13.45787], [-73.72054, -12.83965], [-73.76461, -12.00094], [-73.50131, -10.89611], [-73.00593, -9.5458], [-72.33633, -8.01628], [-71.55035, -6.37383], [-70.70587, -4.6847], [-69.86075, -3.01518], [-69.07284, -1.43152]],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFJUMPQUICK";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 14;
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
      if (_main.player[p].timer < 15) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (this.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + this.offset[_main.player[p].timer - 1][1]);
      }
      if (_main.player[p].timer === 15) {
        _main.player[p].phys.cVel = new _Vec2D.Vec2D(1.1 * _main.player[p].phys.face, 4);
      }
      if (_main.player[p].timer > 15) {
        (0, _actionStateShortcuts.airDrift)(p, input);
        (0, _actionStateShortcuts.fastfall)(p, input);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 51) {
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
// ./src/characters/fox/moves/CLIFFJUMPQUICK.js
// module id = 477
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/CLIFFJUMPQUICK.js?