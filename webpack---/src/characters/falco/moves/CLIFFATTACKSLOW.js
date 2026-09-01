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
  offset: [[-70.6, -16.31], [-70.6, -16.09], [-70.6, -15.85], [-70.6, -15.61], [-70.6, -15.38], [-70.6, -15.17], [-70.6, -15.00], [-70.6, -14.89], [-70.6, -14.85], [-70.6, -14.85], [-70.6, -14.85], [-70.6, -14.85], [-70.6, -14.85], [-70.6, -14.85], [-70.6, -14.85], [-70.6, -14.85], [-70.6, -14.85], [-70.6, -14.84], [-70.6, -14.80], [-70.6, -14.74], [-70.6, -14.66], [-70.6, -14.56], [-70.6, -14.44], [-70.6, -14.30], [-70.6, -14.14], [-70.6, -13.97], [-70.6, -13.78], [-70.6, -13.58], [-70.6, -13.36], [-70.6, -13.13], [-70.6, -12.89], [-70.6, -12.63], [-70.6, -12.37], [-70.6, -12.1], [-70.6, -11.82], [-70.6, -11.52], [-70.6, -11.21], [-70.6, -10.87], [-70.6, -10.52], [-70.6, -10.14], [-70.6, -9.73], [-70.6, -9.30], [-70.6, -8.83], [-70.6, -8.33], [-70.6, -7.79], [-70.6, -7.22], [-70.6, -6.6], [-70.44, -5.67], [-70.02, -4.32], [-69.49, -2.82], [-68.96, -1.43], [-68.56, -0.40], [-68.24, 0]],
  setVelocities: [0.40, 1.02, 1.33, 1.33, 1.02, 0.41, 0, 0, 0, 0, 0, -0.18, -0.37, -0.40, -0.44, -0.43],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFATTACKSLOW";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 53;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.ledgegetupslow.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.ledgegetupslow.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.ledgegetupslow.id1;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      var l = _activeStage.activeStage.ledge[_main.player[p].phys.onLedge];
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

      if (_main.player[p].timer === 57) {
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing2.play();
        (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
      } else if (_main.player[p].timer > 57 && _main.player[p].timer < 60) {
        _main.player[p].hitboxes.frame++;
      } else if (_main.player[p].timer === 60) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 69) {
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
// ./src/characters/falco/moves/CLIFFATTACKSLOW.js
// module id = 620
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/CLIFFATTACKSLOW.js?