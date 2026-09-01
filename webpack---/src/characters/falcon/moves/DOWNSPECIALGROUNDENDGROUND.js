"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "DOWNSPECIALGROUNDENDGROUND",
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  canEdgeCancel: true,
  disableTeeter: true,
  airborneState: "DOWNSPECIALGROUNDENDGROUND",
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALGROUNDENDGROUND";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel.x = 2.14 * _main.player[p].phys.face;
    _main.player[p].phys.cVel.y = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _sfx.sounds.land.play();
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].phys.grounded) {
        _main.player[p].phys.cVel.x = Math.sign(_main.player[p].phys.cVel.x) * Math.max(Math.abs(_main.player[p].phys.cVel.x) - 0.128, 0);
        _main.player[p].phys.cVel.y = 0;
      } else {
        _main.player[p].phys.cVel.x = Math.sign(_main.player[p].phys.cVel.x) * Math.max(Math.abs(_main.player[p].phys.cVel.x) - _main.player[p].charAttributes.airFriction, 0);
        _main.player[p].phys.cVel.y = Math.max(_main.player[p].phys.cVel.y - _main.player[p].charAttributes.gravity, -_main.player[p].charAttributes.terminalV);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 30) {
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
// ./src/characters/falcon/moves/DOWNSPECIALGROUNDENDGROUND.js
// module id = 660
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/DOWNSPECIALGROUNDENDGROUND.js?