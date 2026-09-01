"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

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
    _index2.default.DOWNATTACK.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.DOWNATTACK.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);

      if (_main.player[p].timer === 1) {
        _main.player[p].phys.intangibleTimer = 31;
      }

      if (_main.player[p].timer === 20) {
        _main.player[p].hitboxes.active = [true, true, true, true];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.sword2.play();
      }
      if (_main.player[p].timer > 20 && _main.player[p].timer < 24) {
        _main.player[p].hitboxes.frame++;
      }

      if (_main.player[p].timer === 24) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }

      if (_main.player[p].timer === 30) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.downattack2.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.downattack2.id1;
        _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.downattack2.id2;
        _main.player[p].hitboxes.id[3] = _main.player[p].charHitboxes.downattack2.id3;
        _main.player[p].hitboxes.active = [true, true, true, true];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.sword2.play();
      }
      if (_main.player[p].timer > 30 && _main.player[p].timer < 32) {
        _main.player[p].hitboxes.frame++;
      }

      if (_main.player[p].timer === 32) {
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
// ./src/characters/marth/moves/DOWNATTACK.js
// module id = 372
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/DOWNATTACK.js?