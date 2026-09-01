"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "NEUTRALSPECIALAIR",
  setVelocities: [1.794, 1.65048, 1.51844, 1.39697, 1.28521, 1.18239, 1.0878, 1.00078, 0.92071, 0.84706, 0.77929, 0.71695, 0.65959, 0.60683, 0.55828],
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "NEUTRALSPECIALAIR";
    _main.player[p].timer = 0;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.falconpunchair.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.falconpunchair.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.falconpunchair.id2;
    _sfx.sounds.falconpunchshout1.play();
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer >= 65) {
        (0, _actionStateShortcuts.fastfall)(p, input);
        (0, _actionStateShortcuts.airDrift)(p, input);
      } else if (_main.player[p].timer >= 50) {
        _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 50] * _main.player[p].phys.face;
        _main.player[p].phys.cVel.y = 0;
      } else {
        _main.player[p].phys.cVel.x = Math.sign(_main.player[p].phys.cVel.x) * Math.max(Math.abs(_main.player[p].phys.cVel.x) - _main.player[p].charAttributes.airFriction, 0);
        _main.player[p].phys.cVel.y = Math.max(_main.player[p].phys.cVel.y - _main.player[p].charAttributes.gravity, -_main.player[p].charAttributes.terminalV);
      }
      if (_main.player[p].timer === 52) {
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.falconpunchshout2.play();
        _sfx.sounds.falconpunchbird.play();
        _sfx.sounds.firemediumhit.play();
      }
      if (_main.player[p].timer > 52 && _main.player[p].timer < 57) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 57) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (_main.player[p].timer >= 52 && _main.player[p].timer < 57) {
        (0, _drawVfx.drawVfx)({
          name: "firefoxtail",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + (_main.player[p].hitboxes.id[0].offset[_main.player[p].hitboxes.frame].x + 2) * _main.player[p].phys.face, _main.player[p].phys.pos.y + _main.player[p].hitboxes.id[0].offset[_main.player[p].hitboxes.frame].y - 3),
          face: _main.player[p].phys.face
        });
      }
      if (_main.player[p].timer === 50) {
        (0, _drawVfx.drawVfx)({
          name: "falconpunch",
          pos: _main.player[p].phys.pos,
          face: _main.player[p].phys.face,
          f: p
        });
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 99) {
      _FALL2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    _main.player[p].actionState = "NEUTRALSPECIALGROUND";
    _main.player[p].phys.cVel.x = 0;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/NEUTRALSPECIALAIR.js
// module id = 648
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/NEUTRALSPECIALAIR.js?