"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DOWNSPECIALAIRLOOP = __webpack_require__(582);

var _DOWNSPECIALAIRLOOP2 = _interopRequireDefault(_DOWNSPECIALAIRLOOP);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "DOWNSPECIALAIRTURN",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALAIRTURN";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].phys.cVel.x > 0) {
        if (_main.player[p].phys.cVel.x > 0.85) {
          _main.player[p].phys.cVel.x -= 0.03;
        } else {
          _main.player[p].phys.cVel.x -= 0.02;
        }
        if (_main.player[p].phys.cVel.x < 0) {
          _main.player[p].phys.cVel.x = 0;
        }
      } else if (_main.player[p].phys.cVel.x < 0) {
        if (_main.player[p].phys.cVel.x < -0.85) {
          _main.player[p].phys.cVel.x += 0.03;
        } else {
          _main.player[p].phys.cVel.x += 0.02;
        }
        if (_main.player[p].phys.cVel.x > 0) {
          _main.player[p].phys.cVel.x = 0;
        }
      }

      _main.player[p].phys.cVel.y -= 0.02667;
      if (_main.player[p].phys.cVel.y < -_main.player[p].charAttributes.terminalV) {
        _main.player[p].phys.cVel.y = -_main.player[p].charAttributes.terminalV;
      }

      if (_main.player[p].shineLoop === 6) {
        _main.player[p].shineLoop = 0;
      }
      _main.player[p].shineLoop++;
      (0, _drawVfx.drawVfx)({
        name: "shineloop",
        pos: new _Vec2D.Vec2D(0, 0),
        face: p });
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 3) {
      _main.player[p].phys.face *= -1;
      _DOWNSPECIALAIRLOOP2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    _main.player[p].actionState = "DOWNSPECIALGROUNDTURN";
  }
}; /* eslint-disable */

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/DOWNSPECIALAIRTURN.js
// module id = 584
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/DOWNSPECIALAIRTURN.js?