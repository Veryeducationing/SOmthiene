"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

var _sfx = __webpack_require__(120);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

var _JUMPAERIALB = __webpack_require__(356);

var _JUMPAERIALB2 = _interopRequireDefault(_JUMPAERIALB);

var _JUMPAERIALF = __webpack_require__(357);

var _JUMPAERIALF2 = _interopRequireDefault(_JUMPAERIALF);

var _LANDING = __webpack_require__(272);

var _LANDING2 = _interopRequireDefault(_LANDING);

var _LANDINGATTACKAIRB = __webpack_require__(273);

var _LANDINGATTACKAIRB2 = _interopRequireDefault(_LANDINGATTACKAIRB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "ATTACKAIRB",
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "ATTACKAIRB";
    _main.player[p].timer = 0;
    _main.player[p].phys.autoCancel = false;
    _main.player[p].inAerial = true;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.bair.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.bair.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.bair.id2;
    _main.player[p].hitboxes.id[3] = _main.player[p].charHitboxes.bair.id3;
    _index2.default.ATTACKAIRB.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.ATTACKAIRB.interrupt(p, input)) {
      if (_main.player[p].timer === 30) {
        _main.player[p].phys.face *= -1;
      }
      (0, _actionStateShortcuts.fastfall)(p, input);
      (0, _actionStateShortcuts.airDrift)(p, input);
      if (_main.player[p].timer > 2 && _main.player[p].timer < 12) {
        (0, _drawVfx.drawVfx)({
          name: "swing",
          pos: new _Vec2D.Vec2D(0, 0),
          face: _main.player[p].phys.face,
          f: {
            pNum: p,
            swingType: "BAIR",
            frame: _main.player[p].timer - 3
          }
        });
      }
      if (_main.player[p].timer === 7) {
        _main.player[p].hitboxes.active = [true, true, true, true];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.sword3.play();
      }
      if (_main.player[p].timer > 7 && _main.player[p].timer < 12) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 12) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (_main.player[p].timer === 32) {
        _main.player[p].phys.autoCancel = true;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 39) {
      _FALL2.default.init(p, input);
      return true;
    } else if (_main.player[p].timer > 34) {
      var a = (0, _actionStateShortcuts.checkForAerials)(p, input);
      if ((0, _actionStateShortcuts.checkForDoubleJump)(p, input) && !_main.player[p].phys.doubleJumped) {
        if (input[p][0].lsX * _main.player[p].phys.face < -0.3) {
          _JUMPAERIALB2.default.init(p, input);
        } else {
          _JUMPAERIALF2.default.init(p, input);
        }
        return true;
      } else if (a[0]) {
        _index2.default[a[1]].init(p, input);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    if (_main.player[p].phys.autoCancel) {
      _LANDING2.default.init(p, input);
    } else {
      _LANDINGATTACKAIRB2.default.init(p, input);
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/ATTACKAIRB.js
// module id = 355
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/ATTACKAIRB.js?