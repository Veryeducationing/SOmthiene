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
  offset: [[-70.32, -14.23684], [-70.32, -14.04406], [-70.32, -13.83467], [-70.32, -13.62174], [-70.32, -13.41828], [-70.32, -13.23734], [-70.32, -13.09195], [-70.32, -12.99516], [-70.32, -12.96], [-70.32, -12.96], [-70.32, -12.96], [-70.32, -12.96], [-70.32, -12.96], [-70.32, -12.96], [-70.32, -12.96], [-70.32, -12.96], [-70.32, -12.96], [-70.32, -12.94646], [-70.32, -12.90716], [-70.32, -12.84404], [-70.32, -12.75909], [-70.32, -12.65426], [-70.32, -12.53151], [-70.32, -12.3928], [-70.32, -12.24], [-70.32, -12.07538], [-70.32, -11.90058], [-70.32, -11.71768], [-70.32, -11.52864], [-70.32, -11.33542], [-70.32, -11.13999], [-70.32, -10.94429], [-70.32, -10.75031], [-70.32, -10.56], [-70.32, -10.33863], [-70.32, -10.05937], [-70.32, -9.73605], [-70.32, -9.3825], [-70.32, -9.01255], [-70.32, -8.64], [-70.32, -8.29058], [-70.32, -7.96354], [-70.32, -7.63306], [-70.32, -7.27329], [-70.32, -6.85842], [-70.32, -6.3626], [-70.32, -5.76], [-70.22906, -4.87181], [-69.98633, -3.67591], [-69.63692, -2.38155], [-69.22598, -1.19796], [-68.79863, -0.33436], [-68.00137, 0]],
  setVelocities: [0.38672, 0.41407, 0.42994, 0.43436, 0.42731, 0.40879],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFGETUPSLOW";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 55;
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
      if (_main.player[p].timer < 54) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (this.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + this.offset[_main.player[p].timer - 1][1]);
      } else {
        _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 54] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 54) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 59) {
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
// ./src/characters/fox/moves/CLIFFGETUPSLOW.js
// module id = 474
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/CLIFFGETUPSLOW.js?