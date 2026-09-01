"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DOWNSPECIALGROUND = __webpack_require__(456);

var _DOWNSPECIALGROUND2 = _interopRequireDefault(_DOWNSPECIALGROUND);

var _JUMPAERIALB = __webpack_require__(356);

var _JUMPAERIALB2 = _interopRequireDefault(_JUMPAERIALB);

var _JUMPAERIALF = __webpack_require__(357);

var _JUMPAERIALF2 = _interopRequireDefault(_JUMPAERIALF);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

var _settings = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "DOWNSPECIALAIR",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALAIR";
    _main.player[p].timer = 0;
    _main.player[p].phys.fastfalled = false;
    _main.player[p].phys.cVel.y = 0;
    _main.player[p].phys.cVel.x *= 0.5;
    _main.player[p].shineLoop = 6;
    _main.player[p].phys.inShine = 0;
    _sfx.sounds.foxshine.play();
    (0, _drawVfx.drawVfx)({
      name: "impactLand",
      pos: _main.player[p].phys.pos,
      face: _main.player[p].phys.face
    });
    (0, _drawVfx.drawVfx)({
      name: "shine",
      pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x, _main.player[p].phys.pos.y + 6)
    });
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.downspecial.id0;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    _main.player[p].phys.inShine++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].phys.grounded) {
        _main.player[p].actionState = "DOWNSPECIALGROUND";
        _main.player[p].timer--;
        _DOWNSPECIALGROUND2.default.main(p, input);
      } else {
        if (_main.player[p].phys.cVel.x > 0) {
          if (_main.player[p].phys.cVel.x > 0.85) {
            _main.player[p].phys.cVel.x -= 0.03;
          } else {
            _main.player[p].phys.cVel.x -= 0.02;
          }
          if (_main.player[p].phys.cVel.x < 0) {
            _main.player[p].phys.cVel.x = 0;
          }
        } else if (_main.player[p].phys.cVel.x < 0) {
          if (_main.player[p].phys.cVel.x < -0.85) {
            _main.player[p].phys.cVel.x += 0.03;
          } else {
            _main.player[p].phys.cVel.x += 0.02;
          }
          if (_main.player[p].phys.cVel.x > 0) {
            _main.player[p].phys.cVel.x = 0;
          }
        }
        if (_main.player[p].timer >= 5) {
          _main.player[p].phys.cVel.y -= 0.02667;
          if (_main.player[p].phys.cVel.y < -_main.player[p].charAttributes.terminalV) {
            _main.player[p].phys.cVel.y = -_main.player[p].charAttributes.terminalV;
          }
        }

        if (_main.player[p].timer >= 4 && _main.player[p].timer <= 32) {
          if (_main.player[p].shineLoop === 6) {
            _main.player[p].shineLoop = 0;
          }
          _main.player[p].shineLoop++;
          (0, _drawVfx.drawVfx)({
            name: "shineloop",
            pos: new _Vec2D.Vec2D(0, 0), face: p
          });
        }

        if (_main.player[p].timer === 35) {
          _main.player[p].phys.face *= -1;
          _main.player[p].timer = 4;
        }
        if (_main.player[p].timer >= 4 && _main.player[p].timer <= 32) {
          if (input[p][0].lsX * _main.player[p].phys.face < 0) {
            _main.player[p].timer = 32;
          } else if (_main.player[p].phys.inShine >= 22) {
            if (!input[p][0].b) {
              _main.player[p].timer = 36;
            } else if (_main.player[p].timer === 32) {
              _main.player[p].timer = 4;
            }
          }
        }

        if (_main.player[p].timer === 1) {
          _main.player[p].hitboxes.active = [true, false, false, false];
          _main.player[p].hitboxes.frame = 0;
          _main.player[p].phys.intangibleTimer = Math.max(_main.player[p].phys.intangibleTimer, 1);
        }
        if (_main.player[p].timer === 2) {
          (0, _actionStateShortcuts.turnOffHitboxes)(p);
          _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.reflector.id0;
        }
        if (_main.player[p].timer === 4) {
          _main.player[p].hitboxes.active = [true, false, false, false];
          _main.player[p].hitboxes.frame = 0;
        }
        if (_main.player[p].timer === 36) {
          (0, _actionStateShortcuts.turnOffHitboxes)(p);
        }
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer >= 4 && _main.player[p].timer <= 32) {
      if (!_main.player[p].phys.doubleJumped) {
        if (input[p][0].x && !input[p][1].x || input[p][0].y && !input[p][1].y || _settings.gameSettings["tapJumpOffp" + (p + 1)] == false && input[p][0].lsY >= 0.7 && input[p][3].lsY < 0.7) {
          if (input[p][0].lsX * _main.player[p].phys.face < -0.3) {
            _JUMPAERIALB2.default.init(p, input);
          } else {
            _JUMPAERIALF2.default.init(p, input);
          }
          (0, _actionStateShortcuts.turnOffHitboxes)(p);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else if (_main.player[p].timer > 49) {
      if (_main.player[p].phys.grounded) {
        _WAIT2.default.init(p, input);
      } else {
        _FALL2.default.init(p, input);
      }
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    _main.player[p].actionState = "DOWNSPECIALGROUND";
    if (_main.player[p].timer >= 4 && _main.player[p].timer <= 35) {
      _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.reflector.id0;
      _main.player[p].hitboxes.active = [true, false, false, false];
      _main.player[p].hitboxes.frame = 0;
    }
  }
}; /* eslint-disable */

//////////////////
// WEBPACK FOOTER
// ./src/characters/fox/moves/DOWNSPECIALAIR.js
// module id = 455
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/DOWNSPECIALAIR.js?