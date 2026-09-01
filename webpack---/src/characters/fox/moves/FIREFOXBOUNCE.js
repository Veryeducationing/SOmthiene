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
  setVelocities: [0.00062, 0.00062, 0.00062, 5.27148, 5.4568, 2.56, 0.0638, 0.02712, -0.00286, -0.02613, -0.0427, -0.05257, -0.05573, -1.83217],
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
// ./src/characters/fox/moves/FIREFOXBOUNCE.js
// module id = 450
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/FIREFOXBOUNCE.js?