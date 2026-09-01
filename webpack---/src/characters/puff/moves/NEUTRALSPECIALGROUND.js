"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _drawVfx = __webpack_require__(134);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "NEUTRALSPECIALGROUND",
  canEdgeCancel: true,
  canBeGrabbed: true,
  disableTeeter: true,
  airborneState: "NEUTRALSPECIALAIR",
  specialOnHit: true,
  init: function init(p, input) {
    _main.player[p].actionState = "NEUTRALSPECIALGROUND";
    _main.player[p].timer = 0;
    _main.player[p].phys.rollOutCharging = false;
    _main.player[p].phys.rollOutCharge = 0;
    _main.player[p].phys.rollOutDistance = 0;
    _main.player[p].phys.rollOutChargeAttempt = true;
    _main.player[p].phys.rollOutVel = 0.3;
    _main.player[p].phys.rollOutPlayerHit = false;
    _main.player[p].phys.rollOutWallHit = false;
    _main.player[p].phys.rollOutPlayerHitTimer = 0;
    _main.player[p].colourOverlay = "rgba(255, 248, 88, 0.83)";
    _main.player[p].phys.cVel.x = 0.0001 * _main.player[p].phys.face;
    _sfx.sounds.rolloutshout.play();
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _index2.default.NEUTRALSPECIALGROUND.main(p, input);
  },
  main: function main(p, input) {
    if (_main.player[p].timer === 15) {
      (0, _drawVfx.drawVfx)({
        name: "dashDust",
        pos: _main.player[p].phys.pos,
        face: _main.player[p].phys.face
      });
    }
    if (_main.player[p].timer >= 16 && _main.player[p].timer <= 45 && _main.player[p].phys.rollOutChargeAttempt) {
      if (input[p][0].b) {
        _main.player[p].phys.rollOutCharging = true;
        _main.player[p].phys.rollOutCharge++;
        if (_main.player[p].phys.rollOutCharge > 44) {
          _main.player[p].phys.rollOutCharge = 44;
        }
        if (_main.player[p].phys.rollOutCharge >= 19) {
          if (_main.player[p].timer === 16) {
            (0, _drawVfx.drawVfx)({
              name: "dashDust",
              pos: _main.player[p].phys.pos,
              face: _main.player[p].phys.face
            });
          }
        }
        _main.player[p].phys.cVel.x = 0.0001 * _main.player[p].phys.face;
      } else {
        _main.player[p].timer++;
        _main.player[p].phys.rollOutCharging = false;
        _main.player[p].phys.rollOutChargeAttempt = false;
        _main.player[p].phys.rollOutVel = Math.min(4.2, 0.3 + 0.09 * _main.player[p].phys.rollOutCharge);
        _sfx.sounds.stronghit.play();
        _sfx.sounds.rolloutlaunch.play();
        _sfx.sounds.rollouttickground.play();
        if (_main.player[p].phys.rollOutCharge >= 19) {
          _main.player[p].hitboxes.frame = 0;
          _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.neutralspecialground.id0;
          _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.neutralspecialground.id1;
          _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.neutralspecialground.id2;
          _main.player[p].hitboxes.active = [true, true, true, false];
        }
      }
    }
    if (_main.player[p].phys.rollOutCharging || _main.player[p].phys.rollOutDistance < 100) {
      _main.player[p].timer += 1 + 2 * (_main.player[p].phys.rollOutCharge / 44);
      _main.player[p].colourOverlayBool = false;
      if (_main.player[p].timer >= 28 && _main.player[p].timer <= 34 && _main.player[p].phys.rollOutCharge >= 19 && !_main.player[p].phys.rollOutPlayerHit) {
        _main.player[p].colourOverlayBool = true;
      }
      if (_main.player[p].timer > 45) {
        _main.player[p].timer = 16;
        _sfx.sounds.rollouttickground.play();
      }
    } else {
      _main.player[p].timer++;
    }
    if (!_index2.default.NEUTRALSPECIALGROUND.interrupt(p, input)) {

      if (_main.player[p].timer > 15 && _main.player[p].timer < 46 && !_main.player[p].phys.rollOutCharging && !_main.player[p].phys.rollOutChargeAttempt) {
        _main.player[p].phys.rollOutDistance++;
        if (!_main.player[p].phys.rollOutPlayerHit) {
          var newDmg = 12 + Math.round((_main.player[p].phys.rollOutCharge - 19) / 4);
          _main.player[p].hitboxes.id[0].dmg = newDmg;
          _main.player[p].hitboxes.id[1].dmg = newDmg;
          _main.player[p].hitboxes.id[2].dmg = newDmg;
          if (_main.player[p].phys.rollOutCharge >= 19) {
            if (_main.player[p].phys.rollOutDistance % 10 === 0) {
              (0, _drawVfx.drawVfx)({
                name: "dashDust",
                pos: _main.player[p].phys.pos,
                face: _main.player[p].phys.face
              });
            }
          }
        }
        if (_main.player[p].phys.rollOutDistance > 100) {
          (0, _actionStateShortcuts.turnOffHitboxes)(p);
          _main.player[p].timer = 46;
          _main.player[p].phys.cVel.x *= 0.6;
          _main.player[p].colourOverlayBool = false;
        } else {
          _main.player[p].phys.cVel.x = _main.player[p].phys.rollOutVel * _main.player[p].phys.face;
          if (input[p][0].lsX * _main.player[p].phys.face < -0.49) {
            _index2.default.NEUTRALSPECIALGROUNDTURN.init(p, input);
            _main.player[p].colourOverlayBool = false;
          }
        }
      }
      if (_main.player[p].timer >= 46) {
        var sign = Math.sign(_main.player[p].phys.cVel.x);
        _main.player[p].phys.cVel.x -= 0.09 * sign;
        if (_main.player[p].phys.cVel.x * sign < 0) {
          _main.player[p].phys.cVel.x = 0;
        }
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 77) {
      _WAIT2.default.init(p, input);
      return false;
    } else {
      return false;
    }
  },
  onPlayerHit: function onPlayerHit(p) {
    _main.player[p].actionState = "NEUTRALSPECIALAIR";
    _index2.default.NEUTRALSPECIALAIR.onPlayerHit(p);
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/NEUTRALSPECIALGROUND.js
// module id = 321
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/NEUTRALSPECIALGROUND.js?