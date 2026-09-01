"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DOWNSPECIALGROUNDLOOP = __webpack_require__(587);

var _DOWNSPECIALGROUNDLOOP2 = _interopRequireDefault(_DOWNSPECIALGROUNDLOOP);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "DOWNSPECIALGROUNDTURN",
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  canEdgeCancel: true,
  disableTeeter: true,
  airborneState: "DOWNSPECIALAIRTURN",
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALGROUNDTURN";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
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
    if (_main.player[p].timer > 3) {
      _main.player[p].phys.face *= -1;
      _DOWNSPECIALGROUNDLOOP2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
}; /* eslint-disable */

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/DOWNSPECIALGROUNDTURN.js
// module id = 589
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/DOWNSPECIALGROUNDTURN.js?