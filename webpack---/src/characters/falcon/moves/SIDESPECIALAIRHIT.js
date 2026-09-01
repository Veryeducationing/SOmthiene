"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FALLSPECIAL = __webpack_require__(319);

var _FALLSPECIAL2 = _interopRequireDefault(_FALLSPECIAL);

var _LANDINGFALLSPECIAL = __webpack_require__(320);

var _LANDINGFALLSPECIAL2 = _interopRequireDefault(_LANDINGFALLSPECIAL);

var _article = __webpack_require__(132);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "SIDESPECIALAIRHIT",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "SIDESPECIALAIRHIT";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel.x = 0;
    _main.player[p].phys.cVel.y = 0;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.raptorboostairhit.id0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      _main.player[p].phys.cVel.y -= 0.05;
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
    if (_main.player[p].timer > 45) {
      _FALLSPECIAL2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    _LANDINGFALLSPECIAL2.default.init(p, input);
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/SIDESPECIALAIRHIT.js
// module id = 651
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/SIDESPECIALAIRHIT.js?