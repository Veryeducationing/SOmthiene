"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FALLSPECIAL = __webpack_require__(319);

var _FALLSPECIAL2 = _interopRequireDefault(_FALLSPECIAL);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _LANDING = __webpack_require__(272);

var _LANDING2 = _interopRequireDefault(_LANDING);

var _main = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "FIREFOXBOUNCE",
  canPassThrough: true,
  canGrabLedge: [true, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  setVelocities: [0.00072, 0.00072, 0.00072, 6.04024, 6.25258, 2.93342, 0.07311, 0.03107, -0.00327, -0.02994, -0.04893, -0.06023, -0.06386, -2.09936],
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "FIREFOXBOUNCE";
    _main.player[p].timer = 0;
    _main.player[p].phys.grounded = false;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].phys.cVel.x !== 0) {
        _main.player[p].phys.cVel.x -= 0.03 * _main.player[p].phys.face;
        if (_main.player[p].phys.cVel.x * _main.player[p].phys.face < 0) {
          _main.player[p].phys.cVel.x = 0;
        }
      }
      _main.player[p].phys.cVel.y = this.setVelocities[_main.player[p].timer - 1];
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 14) {
      if (_main.player[p].phys.grounded) {
        _WAIT2.default.init(p, input);
      } else {
        _FALLSPECIAL2.default.init(p, input);
      }
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    _LANDING2.default.init(p, input);
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/FIREFOXBOUNCE.js
// module id = 575
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/FIREFOXBOUNCE.js?