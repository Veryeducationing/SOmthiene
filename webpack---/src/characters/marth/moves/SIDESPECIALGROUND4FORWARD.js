"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "SIDESPECIALGROUND4FORWARD",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  setVelocities: [0, 0.38, 1.33, 1.49, 1.56, 1.53, 1.41, 1.19, 0.88, 0.62, 0.50, 0.40, 0.31, 0.25, 0.21, 0.19, 0.19, 0.21, 0.22, 0.21, 0.19, 0.18, 0.16, 0.14, 0.11, 0.08, 0.05, 0.02, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -0.04, -0.11, -0.18, -0.22, -0.25, -0.27, -0.28, -0.27, -0.25, -0.22, -0.17, -0.11, -0.05],
  init: function init(p, input) {
    _main.player[p].actionState = "SIDESPECIALGROUND4FORWARD";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.dbground4forward.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.dbground4forward.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.dbground4forward.id2;
    _main.player[p].hitboxes.id[3] = _main.player[p].charHitboxes.dbground4forward.id3;
    _sfx.sounds.shout2.play();
    _index2.default.SIDESPECIALGROUND4FORWARD.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.SIDESPECIALGROUND4FORWARD.interrupt(p, input)) {
      _main.player[p].phys.cVel.x = _index2.default.SIDESPECIALGROUND4FORWARD.setVelocities[_main.player[p].timer - 1] * _main.player[p].phys.face;
      if (_main.player[p].timer > 21 && _main.player[p].timer < 30) {
        (0, _drawVfx.drawVfx)({
          name: "swing",
          pos: new _Vec2D.Vec2D(0, 0),
          face: _main.player[p].phys.face,
          f: {
            pNum: p,
            swingType: "SIDESPECIALGROUND4FORWARD",
            frame: _main.player[p].timer - 22
          }
        });
      }
      if (_main.player[p].timer === 23) {
        _main.player[p].hitboxes.active = [true, true, true, true];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.dancingBlade.play();
      }
      if (_main.player[p].timer > 23 && _main.player[p].timer < 27) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 27) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 50) {
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
// ./src/characters/marth/moves/SIDESPECIALGROUND4FORWARD.js
// module id = 404
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/SIDESPECIALGROUND4FORWARD.js?