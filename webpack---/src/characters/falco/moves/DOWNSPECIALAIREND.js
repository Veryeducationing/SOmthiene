"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "DOWNSPECIALAIREND",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALAIREND";
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
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 18) {
      _FALL2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    _main.player[p].actionState = "DOWNSPECIALGROUNDEND";
  }
}; /* eslint-disable */

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/DOWNSPECIALAIREND.js
// module id = 583
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/DOWNSPECIALAIREND.js?