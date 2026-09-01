"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _activeStage = __webpack_require__(18);

var _Vec2D = __webpack_require__(22);

var _actionStateShortcuts = __webpack_require__(10);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFJUMPQUICK",
  offset: [[-73.32, -8.97], [-73.81, -7.87], [-74.29, -6.36], [-74.51, -4.70], [-74.43, -2.80], [-74.13, -0.84], [-73.57, 0.48], [-72.72, 1.10], [-71.70, 1.48], [-70.62, 1.63], [-69.61, 1.60], [-68.82, 1.43], [-68.42, 0.95], [-68.36, 0.32]],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFJUMPQUICK";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 14;
    _index2.default.CLIFFJUMPQUICK.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.CLIFFJUMPQUICK.interrupt(p, input)) {
      var onLedge = _main.player[p].phys.onLedge;
      if (onLedge === -1) {
        this.canGrabLedge = false;
        return;
      }
      var l = _activeStage.activeStage.ledge[onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 15) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (_index2.default.CLIFFJUMPQUICK.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + _index2.default.CLIFFJUMPQUICK.offset[_main.player[p].timer - 1][1]);
      }
      if (_main.player[p].timer === 15) {
        _main.player[p].phys.cVel = new _Vec2D.Vec2D(1.1 * _main.player[p].phys.face, 1.8);
      }
      if (_main.player[p].timer > 15) {
        (0, _actionStateShortcuts.airDrift)(p, input);
        (0, _actionStateShortcuts.fastfall)(p, input);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 38) {
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
// ./src/characters/puff/moves/CLIFFJUMPQUICK.js
// module id = 296
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/CLIFFJUMPQUICK.js?