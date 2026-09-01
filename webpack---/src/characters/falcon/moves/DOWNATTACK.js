"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "DOWNATTACK",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNATTACK";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.downattack1.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.downattack1.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.downattack1.id2;
    _main.player[p].hitboxes.id[3] = _main.player[p].charHitboxes.downattack1.id3;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
      if (_main.player[p].timer === 1) {
        _main.player[p].phys.intangibleTimer = 26;
      }
      if (_main.player[p].timer === 19) {
        _main.player[p].hitboxes.active = [true, true, true, true];
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer > 19 && _main.player[p].timer < 21) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 21) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (_main.player[p].timer === 28) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.downattack2.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.downattack2.id1;
        _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.downattack2.id2;
        _main.player[p].hitboxes.id[3] = _main.player[p].charHitboxes.downattack2.id3;
        _main.player[p].hitboxes.active = [true, true, true, true];
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer > 28 && _main.player[p].timer < 30) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 30) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 49) {
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/DOWNATTACK.js
// module id = 685
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/DOWNATTACK.js?