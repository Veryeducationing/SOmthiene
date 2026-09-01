"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _dancingBladeCombo = __webpack_require__(387);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

var _dancingBladeAirMobility = __webpack_require__(388);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "SIDESPECIALAIR3UP",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "SIDESPECIALAIR3UP";
    _main.player[p].timer = 0;
    _main.player[p].phys.dancingBlade = false;
    _main.player[p].phys.dancingBladeDisable = false;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.dbair3up.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.dbair3up.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.dbair3up.id2;
    _main.player[p].hitboxes.id[3] = _main.player[p].charHitboxes.dbair3up.id3;
    _sfx.sounds.shout3.play();
    _index2.default.SIDESPECIALAIR3UP.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    (0, _dancingBladeCombo.dancingBladeCombo)(p, 18, 38, input);
    if (!_index2.default.SIDESPECIALAIR3UP.interrupt(p, input)) {
      if (_main.player[p].timer > 9 && _main.player[p].timer < 18) {
        (0, _drawVfx.drawVfx)({
          name: "swing",
          pos: new _Vec2D.Vec2D(0, 0),
          face: _main.player[p].phys.face,
          f: {
            pNum: p,
            swingType: "SIDESPECIALAIR3UP",
            frame: _main.player[p].timer - 10
          }
        });
      }
      (0, _dancingBladeAirMobility.dancingBladeAirMobility)(p, input);
      _main.player[p].phys.cVel.x = 0;
      if (_main.player[p].timer === 13) {
        _main.player[p].hitboxes.active = [true, true, true, true];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.dancingBlade.play();
      }
      if (_main.player[p].timer > 13 && _main.player[p].timer < 18) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 18) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 46) {
      if (_main.player[p].phys.grounded) {
        _WAIT2.default.init(p, input);
      } else {
        _FALL2.default.init(p, input);
      }
      return true;
    } else if (_main.player[p].phys.dancingBlade) {
      if (input[p][0].lsY > 0.56) {
        _index2.default.SIDESPECIALAIR4UP.init(p, input);
      } else if (input[p][0].lsY < -0.56) {
        _index2.default.SIDESPECIALAIR4DOWN.init(p, input);
      } else {
        _index2.default.SIDESPECIALAIR4FORWARD.init(p, input);
      }
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    _main.player[p].actionState = "SIDESPECIALGROUND3UP";
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/SIDESPECIALAIR3UP.js
// module id = 393
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/SIDESPECIALAIR3UP.js?