"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(5);

var _index2 = _interopRequireDefault(_index);

var _LANDING = __webpack_require__(272);

var _LANDING2 = _interopRequireDefault(_LANDING);

var _LANDINGATTACKAIRF = __webpack_require__(277);

var _LANDINGATTACKAIRF2 = _interopRequireDefault(_LANDINGATTACKAIRF);

var _JUMPAERIALB = __webpack_require__(356);

var _JUMPAERIALB2 = _interopRequireDefault(_JUMPAERIALB);

var _JUMPAERIALF = __webpack_require__(357);

var _JUMPAERIALF2 = _interopRequireDefault(_JUMPAERIALF);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

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
    _main.player[p].IASATimer = 52;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.fair1.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.fair1.id1;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      (0, _actionStateShortcuts.fastfall)(p, input);
      (0, _actionStateShortcuts.airDrift)(p, input);
      if (_main.player[p].timer === 5) {
        _main.player[p].phys.autoCancel = false;
      }
      if (_main.player[p].timer === 6) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing2.play();
        //needs normalswing3
      }
      if (_main.player[p].timer === 7 || _main.player[p].timer === 8) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 9) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (_main.player[p].timer === 16) {
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.fair2.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.fair2.id1;
        _main.player[p].hitboxes.active = [true, true, false, false];
        _sfx.sounds.normalswing2.play();
      }
      if (_main.player[p].timer > 16 && _main.player[p].timer < 19) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 19) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (_main.player[p].timer === 24) {
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.fair3.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.fair3.id1;
        _main.player[p].hitboxes.active = [true, true, false, false];
        _sfx.sounds.normalswing2.play();
      }
      if (_main.player[p].timer > 24 && _main.player[p].timer < 27) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 27) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (_main.player[p].timer === 33) {
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.fair4.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.fair4.id1;
        _main.player[p].hitboxes.active = [true, true, false, false];
        _sfx.sounds.normalswing2.play();
      }
      if (_main.player[p].timer > 33 && _main.player[p].timer < 36) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 36) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (_main.player[p].timer === 43) {
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.fair5.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.fair5.id1;
        _main.player[p].hitboxes.active = [true, true, false, false];
        _sfx.sounds.normalswing2.play();
      }
      if (_main.player[p].timer > 43 && _main.player[p].timer < 46) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 46) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (_main.player[p].timer === 50) {
        _main.player[p].phys.autoCancel = true;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 59) {
      _FALL2.default.init(p, input);
      return true;
    } else if ((0, _actionStateShortcuts.checkForIASA)(p, input, true)) {
      return true;
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
// ./src/characters/fox/moves/ATTACKAIRF.js
// module id = 440
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/ATTACKAIRF.js?