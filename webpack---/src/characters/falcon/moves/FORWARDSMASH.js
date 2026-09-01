"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _index = __webpack_require__(628);

var _index2 = _interopRequireDefault(_index);

var _DASH = __webpack_require__(284);

var _DASH2 = _interopRequireDefault(_DASH);

var _SMASHTURN = __webpack_require__(285);

var _SMASHTURN2 = _interopRequireDefault(_SMASHTURN);

var _TILTTURN = __webpack_require__(286);

var _TILTTURN2 = _interopRequireDefault(_TILTTURN);

var _WALK = __webpack_require__(287);

var _WALK2 = _interopRequireDefault(_WALK);

var _KNEEBEND = __webpack_require__(283);

var _KNEEBEND2 = _interopRequireDefault(_KNEEBEND);

var _SQUATWAIT = __webpack_require__(303);

var _SQUATWAIT2 = _interopRequireDefault(_SQUATWAIT);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "FORWARDSMASH",
  setVelocities: [-1.11304, -0.988, -0.4595, -0.46209, -0.44062, -0.39509, -0.32551, -0.23188, -0.11419, 0.02756, 0.10871, 0.15599, 0.2674, 0.44294, 0.68261, 0.98641, 1.35433, 3.99021, 6.03557, 3.85735, 1.28591, 1.28591, -1.76748, -1.66068, 0.64071, 0.76125, 0.19715, 0.12143, 0.06216, 0.01934, -0.00704, -0.01698, -0.0159, -0.0145, -0.01268, -0.01044, -0.00777, -0.00469, -0.00118, 0.00275, 0.00561, 0.00714, 0.00872, 0.01033, 0.012, 0.0137, 0.01545, 0.01688, 0.01703, 0.01579, 0.01317, 0.00916, 0.00375, 0.00118, 0.00201, 0.00231, 0.00207, 0.00932, 0.02229, 0.03206, 0.03863, 0.04201, 0.04218, 0.03916],
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "FORWARDSMASH";
    _main.player[p].timer = 0;
    _main.player[p].phys.charging = false;
    _main.player[p].phys.chargeFrames = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.fsmash.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.fsmash.id1;
    this.main(p, input);
  },
  main: function main(p, input) {
    if (_main.player[p].timer === 10) {
      if (input[p][0].a || input[p][0].z) {
        _main.player[p].phys.charging = true;
        _main.player[p].phys.chargeFrames++;
        if (_main.player[p].phys.chargeFrames === 5) {
          _sfx.sounds.smashcharge.play();
        }
        if (_main.player[p].phys.chargeFrames === 60) {
          _main.player[p].timer++;
          _main.player[p].phys.charging = false;
        }
      } else {
        _main.player[p].timer++;
        _main.player[p].phys.charging = false;
      }
    } else {
      _main.player[p].timer++;
      _main.player[p].phys.charging = false;
    }
    if (!this.interrupt(p, input)) {
      if (_main.player[p].phys.charging) {
        _main.player[p].phys.cVel.x = 0;
      } else {
        _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 1] * _main.player[p].phys.face;
      }

      if (_main.player[p].timer === 18) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
        _sfx.sounds.fireweakhit.play();
      }
      if (_main.player[p].timer > 18 && _main.player[p].timer < 22) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 22) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (_main.player[p].timer >= 18 && _main.player[p].timer < 22) {
        (0, _drawVfx.drawVfx)({
          name: "firefoxtail",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + (_main.player[p].hitboxes.id[0].offset[_main.player[p].hitboxes.frame].x + 2) * _main.player[p].phys.face, _main.player[p].phys.pos.y + _main.player[p].hitboxes.id[0].offset[_main.player[p].hitboxes.frame].y - 3),
          face: _main.player[p].phys.face
        });
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 64) {
      _WAIT2.default.init(p, input);
      return true;
    } else if (_main.player[p].timer > 59) {
      var b = (0, _actionStateShortcuts.checkForSpecials)(p, input);
      var t = (0, _actionStateShortcuts.checkForTilts)(p, input);
      var s = (0, _actionStateShortcuts.checkForSmashes)(p, input);
      var j = (0, _actionStateShortcuts.checkForJump)(p, input);
      if (j[0]) {
        _KNEEBEND2.default.init(p, j[1], input);
        return true;
      } else if (b[0]) {
        _index2.default[b[1]].init(p, input);
        return true;
      } else if (s[0]) {
        _index2.default[s[1]].init(p, input);
        return true;
      } else if (t[0]) {
        _index2.default[t[1]].init(p, input);
        return true;
      } else if ((0, _actionStateShortcuts.checkForDash)(p, input)) {
        _DASH2.default.init(p, input);
        return true;
      } else if ((0, _actionStateShortcuts.checkForSmashTurn)(p, input)) {
        _SMASHTURN2.default.init(p, input);
        return true;
      } else if (input[p][0].lsX * _main.player[p].phys.face < -0.3 && Math.abs(input[p][0].lsX) > input[p][0].lsY * -1) {
        _main.player[p].phys.dashbuffer = (0, _actionStateShortcuts.tiltTurnDashBuffer)(p, input);
        _TILTTURN2.default.init(p, input);
        return true;
      } else if (input[p][0].lsX * _main.player[p].phys.face > 0.3 && Math.abs(input[p][0].lsX) > input[p][0].lsY * -1) {
        _WALK2.default.init(p, true, input);
        return true;
      } else {
        return false;
      }
    }
    // iasa 60
    else {
        return false;
      }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/FORWARDSMASH.js
// module id = 635
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/FORWARDSMASH.js?