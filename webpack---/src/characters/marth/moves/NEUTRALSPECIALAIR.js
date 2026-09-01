"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _blendColours = __webpack_require__(17);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "NEUTRALSPECIALAIR",
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "NEUTRALSPECIALAIR";
    _main.player[p].timer = 0;
    _main.player[p].phys.shieldBreakerCharge = 0;
    _main.player[p].phys.shieldBreakerChargeAttempt = true;
    _main.player[p].phys.shieldBreakerCharging = false;
    _main.player[p].phys.cVel.x *= 0.8;
    _main.player[p].phys.cVel.y = Math.max(0, _main.player[p].phys.cVel.y);
    _main.player[p].phys.fastfalled = false;
    _main.player[p].colourOverlayBool = false;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.neutralspecialair.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.neutralspecialair.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.neutralspecialair.id2;
    _main.player[p].hitboxes.id[3] = _main.player[p].charHitboxes.neutralspecialair.id3;
    _sfx.sounds.jump.play();
    _index2.default.NEUTRALSPECIALAIR.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (_main.player[p].timer >= 12 && _main.player[p].timer <= 41 && _main.player[p].phys.shieldBreakerChargeAttempt) {
      if (input[p][0].b) {
        _main.player[p].phys.shieldBreakerCharging = true;
        _main.player[p].phys.shieldBreakerCharge++;
        var originalColour = _main.palettes[_main.pPal[p]][0];
        originalColour = originalColour.substr(4, originalColour.length - 5);
        var colourArray = originalColour.split(",");
        var newCol = (0, _blendColours.blendColours)(colourArray, [117, 50, 227], Math.min(1, _main.player[p].phys.shieldBreakerCharge / 120));
        _main.player[p].colourOverlay = "rgb(" + newCol[0] + "," + newCol[1] + "," + newCol[2] + ")";
        _main.player[p].colourOverlayBool = true;
        if (_main.player[p].phys.shieldBreakerCharge % 6 === 0) {
          (0, _drawVfx.drawVfx)({
            name: "dashDust",
            pos: _main.player[p].phys.pos,
            face: _main.player[p].phys.face
          });
        }
      } else {
        _main.player[p].phys.shieldBreakerCharging = false;
        _main.player[p].phys.shieldBreakerChargeAttempt = false;
        _main.player[p].colourOverlayBool = false;
        _main.player[p].timer = 42;
        _sfx.sounds.shieldbreakercharge.stop(_main.player[p].shieldBreakerID);
      }
    }
    if (_main.player[p].phys.shieldBreakerCharging) {
      if (_main.player[p].timer > 41) {
        _main.player[p].timer = 12;
      }
      if (_main.player[p].phys.shieldBreakerCharge === 122) {
        _main.player[p].timer = 42;
        _main.player[p].phys.shieldBreakerCharging = false;
        _main.player[p].phys.shieldBreakerChargeAttempt = false;
        _main.player[p].colourOverlayBool = false;
        _sfx.sounds.shieldbreakercharge.stop(_main.player[p].shieldBreakerID);
      }
    }

    if (!_index2.default.NEUTRALSPECIALAIR.interrupt(p, input)) {
      _main.player[p].phys.cVel.y -= _main.player[p].charAttributes.gravity;
      if (_main.player[p].phys.cVel.y < -_main.player[p].charAttributes.terminalV) {
        _main.player[p].phys.cVel.y = -_main.player[p].charAttributes.terminalV;
      }
      var decrease = void 0;
      if (_main.player[p].timer < 12) {
        decrease = 0.02;
      } else {
        decrease = 0.005;
      }
      var sign = Math.sign(_main.player[p].phys.cVel.x);
      _main.player[p].phys.cVel.x -= decrease * sign;
      if (_main.player[p].phys.cVel.x * sign < 0) {
        _main.player[p].phys.cVel.x = 0;
      }

      if (_main.player[p].timer === 7) {
        _sfx.sounds.shieldbreaker1.play();
      } else if (_main.player[p].timer === 11) {
        _main.player[p].shieldBreakerID = _sfx.sounds.shieldbreakercharge.play();
      } else if (_main.player[p].timer === 43) {
        _sfx.sounds.shieldbreakershout.play();
        _sfx.sounds.shieldbreaker2.play();
      } else if (_main.player[p].timer === 46) {
        _main.player[p].hitboxes.active = [true, true, true, true];
        _main.player[p].hitboxes.frame = 0;
        var newDmg = 7 + 5 * Math.floor(_main.player[p].phys.shieldBreakerCharge / 30) + 1 * Math.floor(_main.player[p].phys.shieldBreakerCharge / 120);
        _main.player[p].hitboxes.id[0].dmg = newDmg;
        _main.player[p].hitboxes.id[1].dmg = newDmg;
        _main.player[p].hitboxes.id[2].dmg = newDmg;
        _main.player[p].hitboxes.id[3].dmg = newDmg;
        if (_main.player[p].phys.shieldBreakerCharge >= 120) {
          _sfx.sounds.firestronghit.play();
        } else {
          _sfx.sounds.sword3.play();
        }
      } else if (_main.player[p].timer > 46 && _main.player[p].timer < 52) {
        _main.player[p].hitboxes.frame++;
      } else if (_main.player[p].timer === 52) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }

      if (_main.player[p].timer === 50) {
        if (_main.player[p].phys.shieldBreakerCharge >= 120) {
          (0, _drawVfx.drawVfx)({
            name: "groundBounce",
            pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 18 * _main.player[p].phys.face, _main.player[p].phys.pos.y),
            face: _main.player[p].phys.face
          });
        }
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 74) {
      _FALL2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    _main.player[p].actionState = "NEUTRALSPECIALGROUND";
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/NEUTRALSPECIALAIR.js
// module id = 384
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/NEUTRALSPECIALAIR.js?