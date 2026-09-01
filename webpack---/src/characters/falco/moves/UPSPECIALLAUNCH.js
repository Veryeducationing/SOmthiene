"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALLSPECIAL = __webpack_require__(319);

var _FALLSPECIAL2 = _interopRequireDefault(_FALLSPECIAL);

var _FIREFOXBOUNCE = __webpack_require__(575);

var _FIREFOXBOUNCE2 = _interopRequireDefault(_FIREFOXBOUNCE);

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "UPSPECIALLAUNCH",
  canPassThrough: true,
  canGrabLedge: [true, true],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  canEdgeCancel: true,
  disableTeeter: true,
  airborneState: "UPSPECIALLAUNCH",
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "UPSPECIALLAUNCH";
    _main.player[p].timer = 0;
    _sfx.sounds.firebirdlaunch.play();
    _sfx.sounds.falcofirebird.play();
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.upspecial.id0;
    _main.player[p].hitboxes.active = [true, false, false, false];
    _main.player[p].hitboxes.frame = 0;
    _main.player[p].rotation = Math.PI / 2 - _main.player[p].phys.upbAngleMultiplier;
    if (_main.player[p].phys.upbAngleMultiplier !== Math.PI / 2) {
      if (Math.abs(_main.player[p].phys.upbAngleMultiplier) > Math.PI / 2) {
        _main.player[p].phys.face = -1;
      } else {
        _main.player[p].phys.face = 1;
      }
    }
    _main.player[p].rotationPoint = new _Vec2D.Vec2D(0, 40);
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer < 23) {
        if (_main.player[p].timer % 2) {
          (0, _drawVfx.drawVfx)({
            name: "firefoxtail",
            pos: _main.player[p].phys.posPrev,
            face: _main.player[p].phys.face
          });
        }
        (0, _drawVfx.drawVfx)({
          name: "firefoxlaunch",
          pos: _main.player[p].phys.pos,
          face: _main.player[p].phys.face,
          f: p
        });
      }
      if (_main.player[p].phys.grounded) {
        (0, _actionStateShortcuts.reduceByTraction)(p);
      } else {
        if (_main.player[p].phys.cVel.x > 0) {
          _main.player[p].phys.cVel.x -= _main.player[p].charAttributes.airFriction;
          if (_main.player[p].phys.cVel.x < 0) {
            _main.player[p].phys.cVel.x = 0;
          }
        } else if (_main.player[p].phys.cVel.x < 0) {
          _main.player[p].phys.cVel.x += _main.player[p].charAttributes.airFriction;
          if (_main.player[p].phys.cVel.x > 0) {
            _main.player[p].phys.cVel.x = 0;
          }
        }
      }
      if (_main.player[p].timer >= 23) {
        if (_main.player[p].phys.grounded) {
          (0, _actionStateShortcuts.reduceByTraction)(p);
        } else {
          (0, _actionStateShortcuts.fastfall)(p, input);
          (0, _actionStateShortcuts.airDrift)(p, input);
        }
      } else if (_main.player[p].timer >= 4) {
        _main.player[p].phys.cVel.y -= 0.17 * Math.sin(_main.player[p].phys.upbAngleMultiplier);
        _main.player[p].phys.cVel.x -= 0.17 * Math.cos(_main.player[p].phys.upbAngleMultiplier);
      } else if (_main.player[p].timer >= 1) {
        _main.player[p].phys.grounded = false;
        _main.player[p].phys.cVel.y = 4.2 * Math.sin(_main.player[p].phys.upbAngleMultiplier);
        _main.player[p].phys.cVel.x = 4.2 * Math.cos(_main.player[p].phys.upbAngleMultiplier);
      }
      if (_main.player[p].timer > 1 && _main.player[p].timer < 23) {
        _main.player[p].hitboxes.frame++;
      } else if (_main.player[p].timer === 23) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
        _main.player[p].rotation = 0;
        _main.player[p].rotationPoint = new _Vec2D.Vec2D(0, 0);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 42) {
      if (_main.player[p].phys.grounded) {
        _WAIT2.default.init(p, input);
      } else {
        _FALLSPECIAL2.default.init(p, input);
      }
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    if (_main.player[p].timer < 23) {
      // BOUNCE
      (0, _drawVfx.drawVfx)({
        name: "groundBounce",
        pos: _main.player[p].phys.pos,
        face: _main.player[p].phys.face
      });
      _FIREFOXBOUNCE2.default.init(p, input);
    } else {
      (0, _drawVfx.drawVfx)({
        name: "impactLand",
        pos: _main.player[p].phys.pos,
        face: _main.player[p].phys.face
      });
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/UPSPECIALLAUNCH.js
// module id = 574
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/UPSPECIALLAUNCH.js?