"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _sfx = __webpack_require__(120);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

var _LANDING = __webpack_require__(272);

var _LANDING2 = _interopRequireDefault(_LANDING);

var _LANDINGATTACKAIRF = __webpack_require__(277);

var _LANDINGATTACKAIRF2 = _interopRequireDefault(_LANDINGATTACKAIRF);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "ATTACKAIRF",
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "ATTACKAIRF";
    _main.player[p].timer = 0;
    _main.player[p].phys.autoCancel = true;
    _main.player[p].inAerial = true;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.fair1.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.fair1.id1;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _index2.default.ATTACKAIRF.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.ATTACKAIRF.interrupt(p, input)) {
      (0, _actionStateShortcuts.fastfall)(p, input);
      (0, _actionStateShortcuts.airDrift)(p, input);

      if (_main.player[p].timer === 7) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].phys.autoCancel = false;
        _sfx.sounds.normalswing2.play();
        //needs normalswing3
      }
      if (_main.player[p].timer === 8) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 9) {
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.fair2.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.fair2.id1;
      }
      if (_main.player[p].timer > 9 && _main.player[p].timer < 23) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 23) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (_main.player[p].timer === 35) {
        _main.player[p].phys.autoCancel = true;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 39) {
      _FALL2.default.init(p, input);
      return true;
    } else if (_main.player[p].timer > 34) {
      var a = (0, _actionStateShortcuts.checkForAerials)(p, input);
      if ((0, _actionStateShortcuts.checkForMultiJump)(p, input) && _main.player[p].phys.jumpsUsed < 5) {
        _index2.default.JUMPAERIALF.init(p, input);
        return true;
      } else if (a[0]) {
        _index2.default[a[1]].init(p, input);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    if (_main.player[p].phys.autoCancel) {
      _LANDING2.default.init(p, input);
    } else {
      _LANDINGATTACKAIRF2.default.init(p, input);
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/ATTACKAIRF.js
// module id = 276
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/ATTACKAIRF.js?