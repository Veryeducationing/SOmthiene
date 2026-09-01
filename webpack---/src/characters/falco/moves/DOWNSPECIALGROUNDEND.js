"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "DOWNSPECIALGROUNDEND",
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  canEdgeCancel: true,
  disableTeeter: true,
  airborneState: "DOWNSPECIALAIREND",
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALGROUNDEND";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p);
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 18) {
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
}; /* eslint-disable */

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/DOWNSPECIALGROUNDEND.js
// module id = 588
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/DOWNSPECIALGROUNDEND.js?