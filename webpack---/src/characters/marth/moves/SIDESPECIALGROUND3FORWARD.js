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

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "SIDESPECIALGROUND3FORWARD",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  setVelocities: [0, 0.41, 0.80, 0.58, 0.20, 0.10, 0.03, 0, -0.01, 0, 0, 0, 0, 1.10, 2.75, 3.58, 3.58, 2.76, 1.11, 0.01, 0, 0, 0, 0, 0, -0.01, -0.01, 0, 0, 0, 0, 0.01, 0.01, 0.03, -0.01, -0.18, -0.48, -0.99, -1.39, -1.43, -1.12, -0.45, 0, 0, 0, 0],
  init: function init(p, input) {
    _main.player[p].actionState = "SIDESPECIALGROUND3FORWARD";
    _main.player[p].timer = 0;
    _main.player[p].phys.dancingBlade = false;
    _main.player[p].phys.dancingBladeDisable = false;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.dbground3forward.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.dbground3forward.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.dbground3forward.id2;
    _main.player[p].hitboxes.id[3] = _main.player[p].charHitboxes.dbground3forward.id3;
    _sfx.sounds.shout5.play();
    _index2.default.SIDESPECIALGROUND3FORWARD.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    (0, _dancingBladeCombo.dancingBladeCombo)(p, 16, 37, input);
    if (!_index2.default.SIDESPECIALGROUND3FORWARD.interrupt(p, input)) {
      _main.player[p].phys.cVel.x = _index2.default.SIDESPECIALGROUND3FORWARD.setVelocities[_main.player[p].timer - 1] * _main.player[p].phys.face;
      if (_main.player[p].timer > 10 && _main.player[p].timer < 18) {
        (0, _drawVfx.drawVfx)({
          name: "swing",
          pos: new _Vec2D.Vec2D(0, 0),
          face: _main.player[p].phys.face,
          f: {
            pNum: p,
            swingType: "SIDESPECIALGROUND3FORWARD",
            frame: _main.player[p].timer - 11
          }
        });
      }
      if (_main.player[p].timer === 11) {
        _main.player[p].hitboxes.active = [true, true, true, true];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.dancingBlade.play();
      }
      if (_main.player[p].timer > 11 && _main.player[p].timer < 15) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 15) {
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
        _index2.default.SIDESPECIALGROUND4UP.init(p, input);
      } else if (input[p][0].lsY < -0.56) {
        _index2.default.SIDESPECIALGROUND4DOWN.init(p, input);
      } else {
        _index2.default.SIDESPECIALGROUND4FORWARD.init(p, input);
      }
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/SIDESPECIALGROUND3FORWARD.js
// module id = 401
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/SIDESPECIALGROUND3FORWARD.js?