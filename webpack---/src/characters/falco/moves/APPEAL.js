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
  init: function init(p, input) {
    _main.player[p].actionState = "APPEAL";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel.x = 0;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer === 3) {
        _sfx.sounds.falcotaunt.play();
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 115) {
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/APPEAL.js
// module id = 624
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/APPEAL.js?