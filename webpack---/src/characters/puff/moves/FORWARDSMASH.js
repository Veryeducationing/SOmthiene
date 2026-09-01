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
  name: "FORWARDSMASH",
  canEdgeCancel: false,
  canBeGrabbed: true,
  setVelocities: [0, 0, 0, 0, 0, 0.33572, 0.87287, 1.20857, 1.34283, 1.91688, 2.27501, 1.44811, 0.63219, 0.61772, 0.60393, 0.59084, 0.57844, 0.56672, 0.55570, 0.54536, 0.53572, 0.52676, 0.51849, 0.51092, 0.50402, 0.49783, 0.49232, 0.48749, 0.48336, 0.47992, 0.47717, 0.47510, 0.47373, 0.47304, 0.47304, 0.47374, 0.47512, 0.47719, 0.47995, 0.48340, 0.48754, 0.49237, 0.44503, 0.30789],
  init: function init(p, input) {
    _main.player[p].actionState = "FORWARDSMASH";
    _main.player[p].timer = 0;
    _main.player[p].phys.charging = false;
    _main.player[p].phys.chargeFrames = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.fsmash1.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.fsmash1.id1;
    _index2.default.FORWARDSMASH.main(p, input);
  },
  main: function main(p, input) {
    if (_main.player[p].timer === 4) {
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
    if (!_index2.default.FORWARDSMASH.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);

      _main.player[p].phys.cVel.x = _index2.default.FORWARDSMASH.setVelocities[_main.player[p].timer - 1] * _main.player[p].phys.face;
      if (_main.player[p].timer === 6) {
        (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
      }

      if (_main.player[p].timer === 12) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing1.play();
      }
      if (_main.player[p].timer > 12 && _main.player[p].timer < 21) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 16) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.fsmash2.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.fsmash2.id1;
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer === 21) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 44) {
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/FORWARDSMASH.js
// module id = 304
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/FORWARDSMASH.js?