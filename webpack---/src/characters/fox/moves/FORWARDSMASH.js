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
  name: "FORWARDSMASH",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "FORWARDSMASH";
    _main.player[p].timer = 0;
    _main.player[p].phys.charging = false;
    _main.player[p].phys.chargeFrames = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.fsmash1.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.fsmash1.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.fsmash1.id2;
    this.main(p, input);
  },
  main: function main(p, input) {
    if (_main.player[p].timer === 7) {
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
      if (_main.player[p].timer < 9) {
        _main.player[p].phys.cVel.x = 0;
      } else if (_main.player[p].timer < 15) {
        _main.player[p].phys.cVel.x = 1.34 * _main.player[p].phys.face;
      } else if (_main.player[p].timer < 31) {
        _main.player[p].phys.cVel.x = 1.00 * _main.player[p].phys.face;
      } else {
        _main.player[p].phys.cVel.x = 0;
      }

      if (_main.player[p].timer === 12) {
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
        (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
        _sfx.sounds.normalswing1.play();
      }
      if (_main.player[p].timer > 12 && _main.player[p].timer < 23) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 17) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.fsmash2.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.fsmash2.id1;
        _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.fsmash2.id2;
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer === 23) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 39) {
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/fox/moves/FORWARDSMASH.js
// module id = 437
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/FORWARDSMASH.js?