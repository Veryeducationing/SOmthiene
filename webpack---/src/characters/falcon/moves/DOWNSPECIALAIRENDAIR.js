"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

var _DOWNSPECIALAIRENDGROUND = __webpack_require__(657);

var _DOWNSPECIALAIRENDGROUND2 = _interopRequireDefault(_DOWNSPECIALAIRENDGROUND);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

var _settings = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "DOWNSPECIALAIRENDAIR",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALAIRENDAIR";
    _main.player[p].timer = 0;
    _main.player[p].phys.fastfalled = false;
    _main.player[p].phys.doubleJumped = false;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      _main.player[p].phys.cVel.y = Math.max(_main.player[p].phys.cVel.y - _main.player[p].charAttributes.gravity, -_main.player[p].charAttributes.terminalV);
      _main.player[p].phys.cVel.x = Math.sign(_main.player[p].phys.cVel.x) * Math.max(Math.abs(_main.player[p].phys.cVel.x) - _main.player[p].charAttributes.airFriction, 0);
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 29) {
      _FALL2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    _DOWNSPECIALAIRENDGROUND2.default.init(p, input);
  }
}; /* eslint-disable */

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/DOWNSPECIALAIRENDAIR.js
// module id = 656
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/DOWNSPECIALAIRENDAIR.js?