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
  name: "UPSMASH",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "UPSMASH";
    _main.player[p].timer = 0;
    _main.player[p].phys.charging = false;
    _main.player[p].phys.chargeFrames = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.upsmash1.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.upsmash1.id1;
    this.main(p, input);
  },
  main: function main(p, input) {
    if (_main.player[p].timer === 2) {
      if (input[p][0].a || input[p][0].z) {
        _main.player[p].phys.charging = true;
        _main.player[p].phys.chargeFrames++;
        if (_main.player[p].phys.chargeFrames === 5) {
          _sfx.sounds.smashcharge.play();
        }
        if (_main.player[p].phys.chargeFrames === 60) {
          _main.player[p].timer++;
          _main.player[p].phys.charging = false;
        }
      } else {
        _main.player[p].timer++;
        _main.player[p].phys.charging = false;
      }
    } else {
      _main.player[p].timer++;
      _main.player[p].phys.charging = false;
    }
    if (!this.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);

      if (_main.player[p].timer === 7) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
        _sfx.sounds.normalswing1.play();
      }
      if (_main.player[p].timer > 7 && _main.player[p].timer < 18) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 11) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.upsmash2.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.upsmash2.id1;
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer === 16) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 41) {
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/UPSMASH.js
// module id = 563
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/UPSMASH.js?