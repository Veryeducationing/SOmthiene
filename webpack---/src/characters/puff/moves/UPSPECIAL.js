"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _Vec2D = __webpack_require__(22);

var _drawVfx = __webpack_require__(134);

var _sfx = __webpack_require__(120);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALLSPECIAL = __webpack_require__(319);

var _FALLSPECIAL2 = _interopRequireDefault(_FALLSPECIAL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "UPSPECIAL",
  canPassThrough: true,
  canGrabLedge: [true, true],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "UPSPECIAL";
    _main.player[p].timer = 0;
    //23
    //71
    //122
    if (_main.player[p].phys.grounded) {
      if (_main.player[p].phys.cVel.x > 0) {
        _main.player[p].phys.cVel.x -= 0.1;
      }
      if (_main.player[p].phys.cVel.x < 0) {
        _main.player[p].phys.cVel.x += 0.1;
      }
    } else {
      _main.player[p].phys.fastfalled = false;
      if (_main.player[p].phys.cVel.y < -_main.player[p].charAttributes.terminalV) {
        _main.player[p].phys.cVel.y = -_main.player[p].charAttributes.terminalV;
      }
    }
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.upb.id0;
    _index2.default.UPSPECIAL.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.UPSPECIAL.interrupt(p, input)) {
      if (_main.player[p].timer === 23) {
        (0, _drawVfx.drawVfx)({
          name: "sing",
          pos: new _Vec2D.Vec2D(0, 0),
          face: p
        });
      } else if (_main.player[p].timer === 71) {
        (0, _drawVfx.drawVfx)({
          name: "sing2",
          pos: new _Vec2D.Vec2D(0, 0),
          face: p
        });
      } else if (_main.player[p].timer === 122) {
        (0, _drawVfx.drawVfx)({
          name: "sing3",
          pos: new _Vec2D.Vec2D(0, 0),
          face: p
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
        _main.player[p].phys.cVel.y -= _main.player[p].charAttributes.gravity;
        if (_main.player[p].phys.cVel.y < -_main.player[p].charAttributes.terminalV) {
          _main.player[p].phys.cVel.y = -_main.player[p].charAttributes.terminalV;
        }
      }
      if (_main.player[p].timer === 18) {
        _sfx.sounds.sing1.play();
      }
      if (_main.player[p].timer === 69) {
        _sfx.sounds.sing2.play();
      }
      if (_main.player[p].timer === 28) {
        _main.player[p].hitboxes.active = [true, false, false, false];
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].hitboxes.id[0].size = 10.937;
      } else if (_main.player[p].timer === 36) {
        _main.player[p].hitboxes.id[0].size = 1;
      } else if (_main.player[p].timer === 69) {
        _main.player[p].hitboxes.id[0].size = 10.937;
      } else if (_main.player[p].timer === 77) {
        _main.player[p].hitboxes.id[0].size = 1;
      } else if (_main.player[p].timer === 113) {
        _main.player[p].hitboxes.id[0].size = 12.890;
      } else if (_main.player[p].timer === 126) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 179) {
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
  land: function land(p, input) {}
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/UPSPECIAL.js
// module id = 343
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/UPSPECIAL.js?