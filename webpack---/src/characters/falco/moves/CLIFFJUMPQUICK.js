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
  offset: [[-71.20, -16.23], [-71.95, -16.05], [-72.74, -15.89], [-72.50, -15.66], [-74.12, -15.28], [-74.50, -14.67], [-74.55, -13.75], [-74.25, -12.49], [-73.68, -10.94], [-72.91, -9.19], [-72.01, -7.30], [-71.04, -5.37], [-70.07, -3.45], [-69.17, -1.64]],
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
      var l = _activeStage.activeStage.ledge[_main.player[p].phys.onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 15) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (this.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + this.offset[_main.player[p].timer - 1][1]);
      }
      if (_main.player[p].timer === 15) {
        _main.player[p].phys.cVel = new _Vec2D.Vec2D(1 * _main.player[p].phys.face, 3.9);
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
// ./src/characters/falco/moves/CLIFFJUMPQUICK.js
// module id = 618
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/CLIFFJUMPQUICK.js?