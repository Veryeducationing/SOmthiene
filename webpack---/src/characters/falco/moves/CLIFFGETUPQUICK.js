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
  offset: [[-71.04, -15.95], [-71.70, -14.85], [-72.18, -13.83], [-72.61, -12.68], [-72.8, -11], [-72.8, -7.73], [-72.8, -4.4], [-71.78, -2.28], [-69.79, -0.65], [-67.01, 0]],
  setVelocities: [0.55, 0.55, 0.58, 0.59, 0.52, 0.37, 0.14, 0, 0, 0, 0],
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFGETUPQUICK";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 30;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
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
// ./src/characters/falco/moves/CLIFFGETUPQUICK.js
// module id = 614
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/CLIFFGETUPQUICK.js?