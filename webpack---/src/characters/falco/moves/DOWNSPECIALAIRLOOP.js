"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DOWNSPECIALAIREND = __webpack_require__(583);

var _DOWNSPECIALAIREND2 = _interopRequireDefault(_DOWNSPECIALAIREND);

var _DOWNSPECIALAIRTURN = __webpack_require__(584);

var _DOWNSPECIALAIRTURN2 = _interopRequireDefault(_DOWNSPECIALAIRTURN);

var _JUMPAERIALB = __webpack_require__(356);

var _JUMPAERIALB2 = _interopRequireDefault(_JUMPAERIALB);

var _JUMPAERIALF = __webpack_require__(357);

var _JUMPAERIALF2 = _interopRequireDefault(_JUMPAERIALF);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
exports.default = {
  name: "DOWNSPECIALAIRLOOP",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALAIRLOOP";
    _main.player[p].timer = 0;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.reflector.id0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.active = [true, false, false, false];
    _main.player[p].hitboxes.frame = 0;
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

      if (_main.player[p].timer >= 1) {
        _main.player[p].phys.cVel.y -= 0.02667;
        if (_main.player[p].phys.cVel.y < -_main.player[p].charAttributes.terminalV) {
          _main.player[p].phys.cVel.y = -_main.player[p].charAttributes.terminalV;
        }
      }

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
  },
  interrupt: function interrupt(p, input) {
    if (input[p][0].lsX * _main.player[p].phys.face < 0) {
      _DOWNSPECIALAIRTURN2.default.init(p, input);
      return true;
    } else if (_main.player[p].phys.inShine >= 22 && !input[p][0].b) {
      _DOWNSPECIALAIREND2.default.init(p, input);
      return true;
    } else if ((0, _actionStateShortcuts.checkForDoubleJump)(p, input) && (!_main.player[p].phys.doubleJumped || _main.player[p].phys.jumpsUsed < 5 && _main.player[p].charAttributes.multiJump)) {
      (0, _actionStateShortcuts.turnOffHitboxes)(p);
      if (input[p][0].lsX * _main.player[p].phys.face < -0.3) {
        _JUMPAERIALB2.default.init(p, input);
      } else {
        _JUMPAERIALF2.default.init(p, input);
      }
      return true;
    } else if (_main.player[p].timer > 28) {
      this.init(p, input);
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    _main.player[p].actionState = "DOWNSPECIALGROUNDLOOP";
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/DOWNSPECIALAIRLOOP.js
// module id = 582
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/DOWNSPECIALAIRLOOP.js?