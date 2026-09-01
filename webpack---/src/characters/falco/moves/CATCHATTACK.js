"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CATCHWAIT = __webpack_require__(289);

var _CATCHWAIT2 = _interopRequireDefault(_CATCHWAIT);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CATCHATTACK",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CATCHATTACK";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.pummel.id0;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer === 10) {
        _main.player[p].hitboxes.active = [true, false, false, false];
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer === 11) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 24) {
      _CATCHWAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/CATCHATTACK.js
// module id = 623
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/CATCHATTACK.js?