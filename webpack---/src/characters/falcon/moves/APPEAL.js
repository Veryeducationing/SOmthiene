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
    _sfx.sounds.falcontaunt.play();
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {}
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 60) {
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/APPEAL.js
// module id = 691
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/APPEAL.js?