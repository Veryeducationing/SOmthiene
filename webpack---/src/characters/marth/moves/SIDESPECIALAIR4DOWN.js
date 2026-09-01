"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

var _sfx = __webpack_require__(120);

var _dancingBladeAirMobility = __webpack_require__(388);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "SIDESPECIALAIR4DOWN",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "SIDESPECIALAIR4DOWN";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _index2.default.SIDESPECIALAIR4DOWN.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.SIDESPECIALAIR4DOWN.interrupt(p, input)) {
      if (_main.player[p].timer > 9 && _main.player[p].timer < 41) {
        (0, _drawVfx.drawVfx)({
          name: "swing",
          pos: new _Vec2D.Vec2D(0, 0),
          face: _main.player[p].phys.face,
          f: {
            pNum: p,
            swingType: "SIDESPECIALAIR4DOWN",
            frame: _main.player[p].timer - 10
          }
        });
      }
      (0, _dancingBladeAirMobility.dancingBladeAirMobility)(p, input);
      if (_main.player[p].timer > 12 && _main.player[p].timer < 39) {
        switch (_main.player[p].timer % 6) {
          case 1:
            var hbName = "dbair4down" + Math.floor((_main.player[p].timer - 7) / 6);
            _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes[hbName].id0;
            _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes[hbName].id1;
            _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes[hbName].id2;
            _main.player[p].hitboxes.id[3] = _main.player[p].charHitboxes[hbName].id3;
            _main.player[p].hitboxes.active = [true, true, true, true];
            _main.player[p].hitboxes.frame = 0;
            _sfx.sounds.dancingBlade2.play();
            if (_main.player[p].timer < 37) {
              _sfx.sounds.shout6.play();
            }
            break;
          case 2:
          case 3:
            _main.player[p].hitboxes.frame++;
            break;
          case 4:
            (0, _actionStateShortcuts.turnOffHitboxes)(p);
            break;
          default:
            break;
        }
      }
      if (_main.player[p].timer === 39) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 60) {
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
    _main.player[p].actionState = "SIDESPECIALGROUND4DOWN";
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/SIDESPECIALAIR4DOWN.js
// module id = 394
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/SIDESPECIALAIR4DOWN.js?