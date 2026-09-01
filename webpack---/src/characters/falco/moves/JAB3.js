"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "JAB3",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "JAB3";
    _main.player[p].timer = 0;
    _main.player[p].phys.jabCombo = false;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
      if (_main.player[p].timer > 6 && _main.player[p].timer < 43 && input[p][0].a && !input[p][1].a) {
        _main.player[p].phys.jabCombo = true;
      }

      if (_main.player[p].timer === 9) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.jab3_1.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.jab3_1.id1;
        _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.jab3_1.id2;
      } else if (_main.player[p].timer === 16) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.jab3_2.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.jab3_2.id1;
        _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.jab3_2.id2;
      } else if (_main.player[p].timer === 23) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.jab3_3.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.jab3_3.id1;
        _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.jab3_3.id2;
      } else if (_main.player[p].timer === 30) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.jab3_4.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.jab3_4.id1;
        _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.jab3_4.id2;
      } else if (_main.player[p].timer === 37) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.jab3_5.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.jab3_5.id1;
        _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.jab3_5.id2;
      }

      if (_main.player[p].timer > 8 && _main.player[p].timer < 40) {
        switch (_main.player[p].timer % 7) {
          case 2:
            _main.player[p].hitboxes.active = [true, true, true, false];
            _main.player[p].hitboxes.frame = 0;
            _sfx.sounds.normalswing2.play();
            break;
          case 3:
            _main.player[p].hitboxes.frame++;
            break;
          case 4:
            (0, _actionStateShortcuts.turnOffHitboxes)(p);
            break;

        }
      }
      if (_main.player[p].timer === 43 && _main.player[p].phys.jabCombo) {
        _main.player[p].phys.jabCombo = false;
        _main.player[p].timer = 7;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 51) {
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/JAB3.js
// module id = 558
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/JAB3.js?