"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _activeStage = __webpack_require__(18);

var _Vec2D = __webpack_require__(22);

var _sfx = __webpack_require__(120);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFATTACKSLOW",
  offset: [[-71.27, -23.58], [-71.22, -23.27], [-71.16, -22.72], [-71.09, -21.97], [-71.00, -21.05], [-70.91, -20.00], [-70.82, -18.83], [-70.72, -17.58], [-70.62, -16.29], [-70.52, -14.97], [-70.43, -13.67], [-70.34, -12.40], [-70.25, -11.21], [-70.18, -10.11], [-70.1, -8.54], [-70.00, -6.96], [-69.87, -5.72], [-69.72, -4.66], [-69.53, -3.63], [-69.31, -2.56], [-69.05, -1.55], [-68.75, -0.66], [-67.85, 0]],
  setVelocities: [0.66, 0.79, 0.76, 0.65, 0.56, 0.51, 0.47, 0.47, 0.46, 0.42, 0.34, 0.24, 0.11, 0.03, 0.03, 0.03, 0.02, 0.01, 0, -0.01, -0.02, -0.04, -0.06, -0.08, -0.10, -0.13, -0.16, -0.19, -0.21, -0.21, -0.21, -0.20, -0.18, -0.16, -0.13, -0.09],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFATTACKSLOW";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 34;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.ledgegetupslow.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.ledgegetupslow.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.ledgegetupslow.id2;
    _index2.default.CLIFFATTACKSLOW.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.CLIFFATTACKSLOW.interrupt(p, input)) {
      var onLedge = _main.player[p].phys.onLedge;
      if (onLedge === -1) {
        this.canGrabLedge = false;
        return;
      }
      var l = _activeStage.activeStage.ledge[onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 33) {
        if (_main.player[p].timer > 9) {
          _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (_index2.default.CLIFFATTACKSLOW.offset[_main.player[p].timer - 10][0] + 68.4) * _main.player[p].phys.face, y + _index2.default.CLIFFATTACKSLOW.offset[_main.player[p].timer - 10][1]);
        } else {
          _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (-71.31 + 68.4) * _main.player[p].phys.face, y - 23.71);
        }
      } else {
        _main.player[p].phys.cVel.x = _index2.default.CLIFFATTACKSLOW.setVelocities[_main.player[p].timer - 33] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 32) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }

      if (_main.player[p].timer === 38) {
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing2.play();
        (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
      } else if (_main.player[p].timer > 38 && _main.player[p].timer < 42) {
        _main.player[p].hitboxes.frame++;
      } else if (_main.player[p].timer === 42) {
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
// ./src/characters/marth/moves/CLIFFATTACKSLOW.js
// module id = 365
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/CLIFFATTACKSLOW.js?