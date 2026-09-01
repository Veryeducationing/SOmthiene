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

var _activeStage = __webpack_require__(18);

var _Vec2D = __webpack_require__(22);

var _FALLSPECIAL = __webpack_require__(319);

var _FALLSPECIAL2 = _interopRequireDefault(_FALLSPECIAL);

var _LANDINGFALLSPECIAL = __webpack_require__(320);

var _LANDINGFALLSPECIAL2 = _interopRequireDefault(_LANDINGFALLSPECIAL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "NEUTRALSPECIALAIR",
  canPassThrough: false,
  canGrabLedge: [true, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  specialWallCollide: true,
  specialOnHit: true,
  init: function init(p, input) {
    _main.player[p].actionState = "NEUTRALSPECIALAIR";
    _main.player[p].timer = 0;
    _main.player[p].phys.rollOutCharging = false;
    _main.player[p].phys.rollOutCharge = 0;
    _main.player[p].phys.rollOutDistance = 0;
    _main.player[p].phys.rollOutChargeAttempt = true;
    _main.player[p].phys.rollOutVel = 0.5;
    _main.player[p].phys.rollOutPlayerHit = false;
    _main.player[p].phys.rollOutWallHit = false;
    _main.player[p].phys.rollOutPlayerHitTimer = 0;
    _main.player[p].colourOverlay = "rgba(255, 248, 88, 0.83)";
    _main.player[p].phys.cVel.y = Math.max(-1.3, _main.player[p].phys.cVel.y);
    _sfx.sounds.rolloutshout.play();
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _index2.default.NEUTRALSPECIALAIR.main(p, input);
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
        if (_main.player[p].phys.rollOutCharge >= 21) {
          if (_main.player[p].timer === 16) {
            (0, _drawVfx.drawVfx)({
              name: "dashDust",
              pos: _main.player[p].phys.pos,
              face: _main.player[p].phys.face
            });
          }
        }
      } else {
        _main.player[p].timer++;
        _main.player[p].phys.rollOutCharging = false;
        _main.player[p].phys.rollOutChargeAttempt = false;
        _main.player[p].phys.rollOutVel = Math.max(0.5, Math.min(4.1, 0.2 + 0.09 * _main.player[p].phys.rollOutCharge));
        _main.player[p].phys.cVel.x = _main.player[p].phys.rollOutVel * _main.player[p].phys.face;
        _sfx.sounds.rolloutlaunch.play();
        _sfx.sounds.rollouttickair.play();
        if (_main.player[p].phys.rollOutCharge >= 21) {
          _main.player[p].hitboxes.frame = 0;
          _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.neutralspecialair.id0;
          _main.player[p].hitboxes.active = [true, false, false, false];
        }
      }
    }
    if (_main.player[p].phys.rollOutCharging || _main.player[p].phys.rollOutDistance < 100 || _main.player[p].phys.rollOutPlayerHit) {
      _main.player[p].colourOverlayBool = false;
      if (_main.player[p].timer >= 24 && _main.player[p].timer <= 28 && _main.player[p].phys.rollOutCharge >= 21 && !_main.player[p].phys.rollOutPlayerHit) {
        _main.player[p].colourOverlayBool = true;
      }
      _main.player[p].timer += 1 + 2 * (_main.player[p].phys.rollOutCharge / 44);
      if (_main.player[p].timer > 39) {
        _main.player[p].timer = 16;
        _sfx.sounds.rollouttickair.play();
      }
    } else {
      _main.player[p].timer++;
    }
    if (!_index2.default.NEUTRALSPECIALAIR.interrupt(p, input)) {
      _main.player[p].phys.cVel.y -= 0.07;
      if (_main.player[p].phys.cVel.y < -1.3) {
        _main.player[p].phys.cVel.y = -1.3;
      }
      if (_main.player[p].timer > 15 && _main.player[p].timer < 39 && !_main.player[p].phys.rollOutCharging && !_main.player[p].phys.rollOutChargeAttempt) {
        _main.player[p].phys.rollOutDistance++;
        if (!_main.player[p].phys.rollOutPlayerHit) {
          var newDmg = 12 + Math.round((_main.player[p].phys.rollOutCharge - 19) / 4);
          _main.player[p].hitboxes.id[0].dmg = newDmg;
          _main.player[p].hitboxes.id[1].dmg = newDmg;
          _main.player[p].hitboxes.id[2].dmg = newDmg;
          if (_main.player[p].phys.rollOutCharge >= 21) {
            if (_main.player[p].phys.rollOutDistance % 10 === 0) {
              (0, _drawVfx.drawVfx)({
                name: "dashDust",
                pos: _main.player[p].phys.pos,
                face: _main.player[p].phys.face
              });
            }
          }
        }
        if (_main.player[p].phys.rollOutDistance > 100 && !_main.player[p].phys.rollOutPlayerHit) {
          _main.player[p].timer = 39;
          _main.player[p].phys.cVel.x *= 0.6;
          _main.player[p].colourOverlayBool = false;
          (0, _actionStateShortcuts.turnOffHitboxes)(p);
        }
      }
      if (_main.player[p].phys.rollOutPlayerHit) {
        _main.player[p].phys.rollOutPlayerHitTimer++;
        if (_main.player[p].phys.rollOutPlayerHitTimer > 42) {
          (0, _actionStateShortcuts.airDrift)(p, input);
        }
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 70) {
      _FALLSPECIAL2.default.init(p, input);
      return false;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    if (_main.player[p].phys.rollOutPlayerHit) {
      _LANDINGFALLSPECIAL2.default.init(p, input);
    } else {
      _main.player[p].actionState = "NEUTRALSPECIALGROUND";
      if (_main.player[p].phys.rollOutCharge >= 21) {
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.neutralspecialair.id0;
        _main.player[p].hitboxes.active = [true, false, false, false];
      }
    }
  },
  onWallCollide: function onWallCollide(p, input, wallFace, wallNum) {
    if (!_main.player[p].phys.rollOutCharging && !_main.player[p].phys.rollOutChargeAttempt && !_main.player[p].phys.rollOutPlayerHit) {
      _main.player[p].phys.cVel.x *= -0.75;
      _main.player[p].phys.rollOutVel *= 0.75;
      _main.player[p].timer = 16;
      _main.player[p].phys.face *= -1;
      _sfx.sounds.rollouthit.play();
      if (wallFace === "R") {
        (0, _drawVfx.drawVfx)({
          name: "wallBounce",
          pos: new _Vec2D.Vec2D(_activeStage.activeStage.wallR[wallNum][1].x, _main.player[p].phys.ECBp[3].y),
          face: 1,
          f: 1
        });
      } else {
        (0, _drawVfx.drawVfx)({
          name: "wallBounce",
          pos: new _Vec2D.Vec2D(_activeStage.activeStage.wallL[wallNum][1].x, _main.player[p].phys.ECBp[1].y),
          face: -1,
          f: 0
        });
      }
    }
  },
  onPlayerHit: function onPlayerHit(p) {
    _main.player[p].phys.rollOutPlayerHit = true;
    _main.player[p].phys.rollOutPlayerHitTimer = 0;
    _main.player[p].phys.cVel.x *= -0.13;
    _main.player[p].phys.cVel.y = 1.6;
    _main.player[p].phys.grounded = false;
    _sfx.sounds.rollouthit.play();
    _main.player[p].colourOverlayBool = false;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/NEUTRALSPECIALAIR.js
// module id = 318
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/NEUTRALSPECIALAIR.js?