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
  name: "CLIFFGETUPSLOW",
  offset: [[-70.43436, -24.82925], [-70.54099, -24.38749], [-70.65172, -23.92874], [-70.75835, -23.48699], [-70.85271, -23.09623], [-70.85271, -23.09623], [-70.86757, -23.3207], [-70.85271, -23.09623], [-70.78938, -22.18307], [-70.71927, -21.24123], [-70.64391, -20.27354], [-70.5648, -19.28282], [-70.48347, -18.2719], [-70.40142, -17.2436], [-70.32018, -16.20073], [-70.24126, -15.14612], [-70.16619, -14.0826], [-70.09647, -13.01298], [-70.03361, -11.94009], [-69.97914, -10.86675], [-69.93457, -9.79578], [-69.90142, -8.73], [-69.93036, -7.57019], [-70.03811, -6.29246], [-70.17525, -5.01263], [-70.29235, -3.84654], [-70.34, -2.91], [-70.34827, -2.15466], [-70.36935, -1.45602], [-70.38699, -0.81569], [-70.38494, -0.23528], [-70.34696, 0.28361], [-70.25681, 0.73936], [-70.09824, 1.13036], [-69.855, 1.455], [-68.65326, 0.81539], [-66.20674, 0]],
  setVelocities: [0.33979, 0.34951, 0.35656, 0.36092, 0.3626, 0.36159, 0.35791, 0.35154, 0.34249, 0.33075, 0.31634, 0.29924, 0.27946, 0.25699, 0.23184, 0.20402, 0.1735, 0.14031, 0.10443, 0.06587, 0.02463],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFGETUPSLOW";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 49;
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
      if (_main.player[p].timer < 38) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (this.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + this.offset[_main.player[p].timer - 1][1]);
      } else {
        _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 38] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 38) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 58) {
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
// ./src/characters/falcon/moves/CLIFFGETUPSLOW.js
// module id = 678
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/CLIFFGETUPSLOW.js?