"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DOWNSPECIALGROUNDEND = __webpack_require__(588);

var _DOWNSPECIALGROUNDEND2 = _interopRequireDefault(_DOWNSPECIALGROUNDEND);

var _DOWNSPECIALGROUNDTURN = __webpack_require__(589);

var _DOWNSPECIALGROUNDTURN2 = _interopRequireDefault(_DOWNSPECIALGROUNDTURN);

var _KNEEBEND = __webpack_require__(283);

var _KNEEBEND2 = _interopRequireDefault(_KNEEBEND);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "DOWNSPECIALGROUNDLOOP",
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  canEdgeCancel: true,
  disableTeeter: true,
  airborneState: "DOWNSPECIALAIRLOOP",
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALGROUNDLOOP";
    _main.player[p].timer = 0;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.reflector.id0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.active = [true, false, false, false];
    _main.player[p].hitboxes.frame = 0;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    _main.player[p].phys.inShine++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].phys.onSurface[0] === 1) {
        if (input[p][0].lsY < -0.66 && input[p][6].lsY >= 0) {
          _main.player[p].phys.grounded = false;
          _main.player[p].phys.passing = true;
          _main.player[p].phys.cVel.y = -0.5;
          _main.player[p].actionState = "DOWNSPECIALAIRLOOP";
        }
      }
      (0, _actionStateShortcuts.reduceByTraction)(p);

      if (_main.player[p].shineLoop === 6) {
        _main.player[p].shineLoop = 0;
      }
      _main.player[p].shineLoop++;
      (0, _drawVfx.drawVfx)({
        name: "shineloop",
        pos: new _Vec2D.Vec2D(0, 0),
        face: p
      });
    }
  },
  interrupt: function interrupt(p, input) {
    var j = (0, _actionStateShortcuts.checkForJump)(p, input);
    if (input[p][0].lsX * _main.player[p].phys.face < 0) {
      _DOWNSPECIALGROUNDTURN2.default.init(p, input);
      return true;
    } else if (_main.player[p].phys.inShine >= 22 && !input[p][0].b) {
      _DOWNSPECIALGROUNDEND2.default.init(p, input);
      return true;
    } else if (j[0]) {
      (0, _actionStateShortcuts.turnOffHitboxes)(p);
      _KNEEBEND2.default.init(p, j[1], input);
      return true;
    } else if (_main.player[p].timer > 28) {
      this.init(p, input);
      return true;
    } else {
      return false;
    }
  }
}; /* eslint-disable */

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/DOWNSPECIALGROUNDLOOP.js
// module id = 587
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/DOWNSPECIALGROUNDLOOP.js?