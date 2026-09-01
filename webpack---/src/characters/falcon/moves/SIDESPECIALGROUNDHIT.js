"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "SIDESPECIALGROUNDHIT",
  canPassThrough: false,
  canEdgeCancel: false,
  disableTeeter: true,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "SIDESPECIALGROUNDHIT";
    _main.player[p].timer = 0;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.raptorboostgroundhit.id0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].phys.timer < 18) {
        _main.player[p].phys.cVel.x = 0.30313 * _main.player[p].phys.face;
      } else {
        _main.player[p].phys.cVel.x = 0;
      }
      if (_main.player[p].timer === 4) {
        _main.player[p].hitboxes.active = [true, false, false, false];
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer > 4 && _main.player[p].timer < 9) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 9) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (_main.player[p].timer >= 4 && _main.player[p].timer < 9) {
        (0, _drawVfx.drawVfx)({
          name: "firefoxtail",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + _main.player[p].hitboxes.id[0].offset[_main.player[p].hitboxes.frame].x * _main.player[p].phys.face, _main.player[p].phys.pos.y + _main.player[p].hitboxes.id[0].offset[_main.player[p].hitboxes.frame].y),
          face: _main.player[p].phys.face
        });
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 25) {
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/SIDESPECIALGROUNDHIT.js
// module id = 653
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/SIDESPECIALGROUNDHIT.js?