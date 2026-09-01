"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _Vec2D = __webpack_require__(22);

var _drawVfx = __webpack_require__(134);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "SIDESPECIALGROUND4DOWN",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  setVelocities: [0, 1.37, 1.61, 1.56, 1.20, 0.94, 0.94, 0.91, 0.83, 0.71, 0.56, 0.36, 0.13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -0.01, -0.02, -0.02, -0.02, -0.02, -0.02, -0.02, -0.01, 0, 0, 0, 0, -0.02, -0.05, -0.08, -0.09, -0.10, -0.11, -0.10, -0.09, -0.07, -0.04],
  init: function init(p, input) {
    _main.player[p].actionState = "SIDESPECIALGROUND4DOWN";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _index2.default.SIDESPECIALGROUND4DOWN.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.SIDESPECIALGROUND4DOWN.interrupt(p, input)) {
      _main.player[p].phys.cVel.x = _index2.default.SIDESPECIALGROUND4DOWN.setVelocities[_main.player[p].timer - 1] * _main.player[p].phys.face;
      /*13-15
       19-21
       25-27
       31-33
       37-38*/
      if (_main.player[p].timer > 9 && _main.player[p].timer < 40) {
        (0, _drawVfx.drawVfx)({
          name: "swing",
          pos: new _Vec2D.Vec2D(0, 0),
          face: _main.player[p].phys.face,
          f: {
            pNum: p,
            swingType: "SIDESPECIALGROUND4DOWN",
            frame: _main.player[p].timer - 10
          }
        });
      }
      if (_main.player[p].timer > 12 && _main.player[p].timer < 39) {
        switch (_main.player[p].timer % 6) {
          case 1:
            var hbName = "dbground4down" + Math.floor((_main.player[p].timer - 7) / 6);
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
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/SIDESPECIALGROUND4DOWN.js
// module id = 403
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/SIDESPECIALGROUND4DOWN.js?