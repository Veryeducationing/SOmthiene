"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "APPEAL",
  canEdgeCancel: false,
  canBeGrabbed: true,
  setVelocities1: [-0.38101, -0.4175, -0.44566, -0.4655, -0.47702, -0.48022, -0.4751, -0.46166, -0.4399, -0.40981, -0.37141, -0.32469, -0.26964, -0.20628, -0.13459, 0],
  setVelocities2: [0.12714, 0.14992, 0.17104, 0.19052, 0.20834, 0.22450, 0.23902, 0.25188, 0.26309, 0.27265, 0.28055, 0.2868, 0.2914, 0.29434, 0.29563, 0.29527, 0.29326, 0.28959, 0.28427, 0.27729, 0.26867, 0.25839],
  init: function init(p, input) {
    _main.player[p].actionState = "APPEAL";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel.x = 0;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer > 1 && _main.player[p].timer < 18) {
        _main.player[p].phys.cVel.x = this.setVelocities1[_main.player[p].timer - 2] * _main.player[p].phys.face;
      } else if (_main.player[p].timer > 88) {
        _main.player[p].phys.cVel.x = this.setVelocities2[_main.player[p].timer - 89] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 31) {
        _sfx.sounds.foxtaunt.play();
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 110) {
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/fox/moves/APPEAL.js
// module id = 491
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/APPEAL.js?