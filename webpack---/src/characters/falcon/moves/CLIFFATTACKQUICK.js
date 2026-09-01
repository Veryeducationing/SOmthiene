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
  name: "CLIFFATTACKQUICK",
  offset: [[-70.79152, -21.52067], [-70.72434, -19.80744], [-70.65362, -18.01121], [-70.58200, -16.18664], [-70.51216, -14.38838], [-70.44677, -12.67110], [-70.38850, -11.08945], [-70.34000, -9.69811], [-70.31597, -8.92615], [-70.31864, -8.75587], [-70.33199, -8.57171], [-70.34, -7.75811], [-70.38042, -5.80589], [-70.44778, -3.15836], [-70.46126, -0.62868], [-70.34, 0.97], [-70.12101, 1.43812], [-69.86411, 1.30101], [-69.52269, 0.83284], [-69.05019, 0.30778], [-67.74982, 0]],
  setVelocities: [1.00038, 1.31691, 1.37077, 1.16194, 0.79036, 0.57482, 0.57482, 0.74247, 0.74248, 0.45505, 0],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFATTACKQUICK";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 20;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.ledgegetupquick.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.ledgegetupquick.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.ledgegetupquick.id2;
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
      if (_main.player[p].timer < 22) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (this.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + this.offset[_main.player[p].timer - 1][1]);
      } else {
        if (_main.player[p].timer < 33) {
          _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 22] * _main.player[p].phys.face;
        }
      }
      if (_main.player[p].timer === 22) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }

      if (_main.player[p].timer === 24) {
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
      } else if (_main.player[p].timer > 24 && _main.player[p].timer < 30) {
        _main.player[p].hitboxes.frame++;
      } else if (_main.player[p].timer === 30) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 54) {
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
// ./src/characters/falcon/moves/CLIFFATTACKQUICK.js
// module id = 684
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/CLIFFATTACKQUICK.js?