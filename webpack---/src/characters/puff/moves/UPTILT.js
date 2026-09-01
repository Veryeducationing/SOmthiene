"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _sfx = __webpack_require__(120);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "UPTILT",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "UPTILT";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.uptilt1.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.uptilt1.id1;
    _index2.default.UPTILT.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.UPTILT.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);

      if (_main.player[p].timer === 8) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing2.play();
      }
      if (_main.player[p].timer === 9) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 10) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.uptilt2.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.uptilt2.id1;
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer > 10 && _main.player[p].timer < 15) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 15) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 23) {
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/UPTILT.js
// module id = 344
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/UPTILT.js?