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
  name: "SIDESPECIALGROUND2FORWARD",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "SIDESPECIALGROUND2FORWARD";
    _main.player[p].timer = 0;
    _main.player[p].phys.dancingBlade = false;
    _main.player[p].phys.dancingBladeDisable = false;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.dbground2forward.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.dbground2forward.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.dbground2forward.id2;
    _main.player[p].hitboxes.id[3] = _main.player[p].charHitboxes.dbground2forward.id3;
    _sfx.sounds.shout7.play();
    _index2.default.SIDESPECIALGROUND2FORWARD.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    (0, _dancingBladeCombo.dancingBladeCombo)(p, 17, 33, input);
    if (!_index2.default.SIDESPECIALGROUND2FORWARD.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
      if (_main.player[p].timer > 12 && _main.player[p].timer < 17) {
        (0, _drawVfx.drawVfx)({
          name: "swing",
          pos: new _Vec2D.Vec2D(0, 0),
          face: _main.player[p].phys.face,
          f: {
            pNum: p,
            swingType: "SIDESPECIALGROUND2FORWARD",
            frame: _main.player[p].timer - 13
          }
        });
      }
      if (_main.player[p].timer === 14) {
        _main.player[p].hitboxes.active = [true, true, true, true];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.dancingBlade2.play();
      }
      if (_main.player[p].timer > 14 && _main.player[p].timer < 17) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 17) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 40) {
      if (_main.player[p].phys.grounded) {
        _WAIT2.default.init(p, input);
      } else {
        _FALL2.default.init(p, input);
      }
      return true;
    } else if (_main.player[p].phys.dancingBlade) {
      if (input[p][0].lsY > 0.56) {
        _index2.default.SIDESPECIALGROUND3UP.init(p, input);
      } else if (input[p][0].lsY < -0.56) {
        _index2.default.SIDESPECIALGROUND3DOWN.init(p, input);
      } else {
        _index2.default.SIDESPECIALGROUND3FORWARD.init(p, input);
      }
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/SIDESPECIALGROUND2FORWARD.js
// module id = 398
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/SIDESPECIALGROUND2FORWARD.js?