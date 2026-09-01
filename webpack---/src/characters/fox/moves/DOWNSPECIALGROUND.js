"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DOWNSPECIALAIR = __webpack_require__(455);

var _DOWNSPECIALAIR2 = _interopRequireDefault(_DOWNSPECIALAIR);

var _KNEEBEND = __webpack_require__(283);

var _KNEEBEND2 = _interopRequireDefault(_KNEEBEND);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "DOWNSPECIALGROUND",
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  canEdgeCancel: true,
  disableTeeter: true,
  airborneState: "DOWNSPECIALAIR",
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALGROUND";
    _main.player[p].timer = 0;
    _main.player[p].phys.inShine = 0;
    _sfx.sounds.foxshine.play();
    _main.player[p].shineLoop = 6;
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
      if (_main.player[p].phys.onSurface[0] === 1 && _main.player[p].timer > 1) {
        if (input[p][0].lsY < -0.66 && input[p][6].lsY >= 0) {
          _main.player[p].phys.grounded = false;
          _main.player[p].phys.passing = true;
          _main.player[p].phys.cVel.y = -0.5;
        }
      }
      if (_main.player[p].phys.grounded) {
        (0, _actionStateShortcuts.reduceByTraction)(p);
        if (_main.player[p].timer >= 3) {
          //shine turn
          // takes 3 frames, act on 4th
        }
        if (_main.player[p].timer >= 4 && _main.player[p].timer <= 35) {
          if (_main.player[p].shineLoop === 6) {
            _main.player[p].shineLoop = 0;
          }
          _main.player[p].shineLoop++;
          (0, _drawVfx.drawVfx)({
            name: "shineloop",
            pos: new _Vec2D.Vec2D(0, 0),
            face: p
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
      } else {
        _main.player[p].actionState = "DOWNSPECIALAIR";
        _main.player[p].timer--;
        _DOWNSPECIALAIR2.default.main(p, input);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer >= 4 && _main.player[p].timer <= 32) {
      var j = (0, _actionStateShortcuts.checkForJump)(p, input);
      if (j[0]) {
        _KNEEBEND2.default.init(p, j[1], input);
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
        return true;
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
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/fox/moves/DOWNSPECIALGROUND.js
// module id = 456
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/DOWNSPECIALGROUND.js?