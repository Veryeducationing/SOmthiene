"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(555);

var _index2 = _interopRequireDefault(_index);

var _LANDING = __webpack_require__(272);

var _LANDING2 = _interopRequireDefault(_LANDING);

var _LANDINGATTACKAIRB = __webpack_require__(273);

var _LANDINGATTACKAIRB2 = _interopRequireDefault(_LANDINGATTACKAIRB);

var _JUMPAERIALB = __webpack_require__(356);

var _JUMPAERIALB2 = _interopRequireDefault(_JUMPAERIALB);

var _JUMPAERIALF = __webpack_require__(357);

var _JUMPAERIALF2 = _interopRequireDefault(_JUMPAERIALF);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "ATTACKAIRB",
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "ATTACKAIRB";
    _main.player[p].timer = 0;
    _main.player[p].phys.autoCancel = true;
    _main.player[p].inAerial = true;
    _main.player[p].IASATimer = 37;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.bair1.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.bair1.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.bair1.id2;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      (0, _actionStateShortcuts.fastfall)(p, input);
      (0, _actionStateShortcuts.airDrift)(p, input);

      if (_main.player[p].timer === 3) {
        _main.player[p].phys.autoCancel = false;
      }
      if (_main.player[p].timer === 4) {
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing2.play();
        // needs swing3
      }
      if (_main.player[p].timer > 4 && _main.player[p].timer < 20) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 8) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.bair2.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.bair2.id1;
        _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.bair2.id2;
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer === 20) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (_main.player[p].timer === 24) {
        _main.player[p].phys.autoCancel = true;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 39) {
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
      _LANDINGATTACKAIRB2.default.init(p, input);
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/ATTACKAIRB.js
// module id = 566
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/ATTACKAIRB.js?