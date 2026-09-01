"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _Vec2D = __webpack_require__(22);

var _activeStage = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFATTACKSLOW",
  offset: [[-70.4343, -24.8293], [-70.54089, -24.38752], [-70.65158, -23.92871], [-70.75817, -23.48693], [-70.85247, -23.09623], [-70.85247, -23.09623], [-70.86314, -23.09623], [-70.85247, -23.09623], [-70.80122, -21.27161], [-70.74998, -19.44699], [-70.69873, -17.62236], [-70.64748, -15.79774], [-70.59624, -13.97312], [-70.54499, -12.14849], [-70.49374, -10.32387], [-70.4425, -8.49925], [-70.39125, -6.67462], [-70.34, -4.85], [-70.26962, -2.93533], [-70.18314, -0.97231], [-70.05383, 0.62812], [-69.855, 1.455], [-69.60455, 1.68426], [-69.33985, 1.77977], [-69.06341, 1.76256], [-68.7773, 1.65361], [-68.48532, 1.47393], [-67.89203, 0]],
  setVelocities: [0.29838, 0.29761, 0.29434, 0.28856, 0.28028, 0.2695, 0.2666, 0.27256, 0.27748, 0.28139, 0.28426, 0.28611, 0.28693, 0.28672, 0.28549, 0.28323, 0.27995, 0.27563, 0.27029, 0.26393, 0.25643, 0.24811, 0.23867, 0.22819, 0.21669, 0.20416, 0.19061, 0.17603, 0.16042, 0.12121, 0.06452, 0.01601, -0.02433, -0.0565, -0.0805, -0.09632, -0.10397, -0.10344, -0.09475, -0.07788],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFATTACKSLOW";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 33;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.ledgegetupslow.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.ledgegetupslow.id1;
    _sfx.sounds.falcondoublejump.play();
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
      if (_main.player[p].timer < 29) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (this.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + this.offset[_main.player[p].timer - 1][1]);
      } else {
        _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 29] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 29) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }

      if (_main.player[p].timer === 37) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
      } else if (_main.player[p].timer > 37 && _main.player[p].timer < 41) {
        _main.player[p].hitboxes.frame++;
      } else if (_main.player[p].timer === 41) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 68) {
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
// ./src/characters/falcon/moves/CLIFFATTACKSLOW.js
// module id = 683
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/CLIFFATTACKSLOW.js?