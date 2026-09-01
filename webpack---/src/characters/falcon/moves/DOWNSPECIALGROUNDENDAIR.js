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
  name: "DOWNSPECIALGROUNDENDAIR",
  setVelocities: [0, 0.51374, 0.59547, 0.60863, 0.55322, 0.42924, 0.32122],
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  canEdgeCancel: true,
  disableTeeter: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALGROUNDENDAIR";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer > 1) {
        if (_main.player.timer < 7) {
          _main.player[p].phys.cVel.x = 1.0346 * _main.player[p].phys.face;
        }
        if (_main.player.timer === 7) {
          _main.player[p].phys.cVel.x = 1.24691 * _main.player[p].phys.face;
        }
        if (_main.player[p].timer > 7) {
          _main.player[p].phys.cVel.y = Math.max(_main.player[p].phys.cVel.y - _main.player[p].charAttributes.gravity, -_main.player[p].charAttributes.terminalV);
          _main.player[p].phys.cVel.x = Math.sign(_main.player[p].phys.cVel.x) * Math.max(Math.abs(_main.player[p].phys.cVel.x) - _main.player[p].charAttributes.airFriction, 0);
        } else {
          _main.player[p].phys.cVel.y = this.setVelocities[_main.player[p].timer - 1];
        }
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
  },
  land: function land(p, input) {
    _main.player[p].actionState = "DOWNSPECIALGROUNDENDGROUND";
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/DOWNSPECIALGROUNDENDAIR.js
// module id = 659
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/DOWNSPECIALGROUNDENDAIR.js?