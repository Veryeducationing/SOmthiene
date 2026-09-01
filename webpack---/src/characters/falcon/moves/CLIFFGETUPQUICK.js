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
  offset: [[-70.40894, -24.65279], [-70.49549, -24.19316], [-70.59016, -23.76442], [-70.68344, -23.28989], [-70.76582, -22.69287], [-70.82779, -21.89668], [-70.85985, -20.82461], [-70.85247, -19.4], [-70.82135, -17.47271], [-70.78225, -15.05862], [-70.72578, -12.33002], [-70.64259, -9.45922], [-70.52329, -6.61851], [-70.35851, -3.98021], [-70.13887, -1.71661], [-69.855, 0], [-69.44187, 0.27703], [-68.88137, 0.35459], [-67.58757, 0]],
  setVelocities: [0.67232, 0.63676, 0.54022, 0.50953, 0.56807, 0.60068, 0.60737, 0.58812, 0.54294, 0.47183, 0.37479, 0.25182, 0.10292],
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFGETUPQUICK";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 22;
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
      if (_main.player[p].timer < 20) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (this.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + this.offset[_main.player[p].timer - 1][1]);
      } else {
        _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 20] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 20) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 32) {
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
// ./src/characters/falcon/moves/CLIFFGETUPQUICK.js
// module id = 677
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/CLIFFGETUPQUICK.js?