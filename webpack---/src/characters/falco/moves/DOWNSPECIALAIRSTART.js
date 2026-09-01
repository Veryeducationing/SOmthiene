"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DOWNSPECIALAIRLOOP = __webpack_require__(582);

var _DOWNSPECIALAIRLOOP2 = _interopRequireDefault(_DOWNSPECIALAIRLOOP);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
exports.default = {
  name: "DOWNSPECIALAIRSTART",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALAIRSTART";
    _main.player[p].timer = 0;
    _main.player[p].phys.fastfalled = false;
    _main.player[p].phys.inShine = 0;
    _main.player[p].shineLoop = 6;
    _main.player[p].phys.cVel.y = 0;
    _main.player[p].phys.cVel.x *= 0.5;
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

      if (_main.player[p].timer === 1) {
        _main.player[p].hitboxes.active = [true, false, false, false];
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].phys.intangibleTimer = Math.max(_main.player[p].phys.intangibleTimer, 1);
      }
      if (_main.player[p].timer === 2) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 3) {
      _DOWNSPECIALAIRLOOP2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    _main.player[p].actionState = "DOWNSPECIALGROUNDSTART";
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/DOWNSPECIALAIRSTART.js
// module id = 581
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/DOWNSPECIALAIRSTART.js?