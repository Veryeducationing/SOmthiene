"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "NEUTRALSPECIALGROUND",
  setVelocities: [1.40276, 1.58423, 1.6572, 1.62165, 1.47759, 1.22502, 0.86393, 0.59178, 0.48767, 0.39373, 0.30995, 0.23633, 0.17286, 0.11956, 0.07642, 0.04343, 0.02061, 0.00795, 0.00544, 0.0071, 0.00619, 0.00532, 0.00451, 0.00375, 0.00303, 0.00238, 0.00177, 0.00121, 0.0007, 0.00025, -0.00015, -0.0005, -0.00081, -0.00106, -0.00125, -0.0014, -0.0015, -0.00154, -0.00153, -0.00148, -0.00137, -0.00121, -0.00099, -0.00073, -0.00042, -0.00005],
  canPassThrough: false,
  canEdgeCancel: false,
  disableTeeter: true,
  canBeGrabbed: true,
  airborneState: "NEUTRALSPECIALAIR",
  init: function init(p, input) {
    _main.player[p].actionState = "NEUTRALSPECIALGROUND";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel.x = 0;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.falconpunchair.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.falconpunchair.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.falconpunchair.id2;
    _sfx.sounds.falconpunchshout1.play();
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer >= 54) {
        _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 54] * _main.player[p].phys.face;
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
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/NEUTRALSPECIALGROUND.js
// module id = 649
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/NEUTRALSPECIALGROUND.js?