"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(628);

var _index2 = _interopRequireDefault(_index);

var _LANDING = __webpack_require__(272);

var _LANDING2 = _interopRequireDefault(_LANDING);

var _LANDINGATTACKAIRU = __webpack_require__(281);

var _LANDINGATTACKAIRU2 = _interopRequireDefault(_LANDINGATTACKAIRU);

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
  name: "ATTACKAIRU",
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "ATTACKAIRU";
    _main.player[p].timer = 0;
    _main.player[p].phys.autoCancel = false;
    _main.player[p].inAerial = true;
    _main.player[p].IASATimer = 30;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.upairClean.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.upairClean.id1;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      (0, _actionStateShortcuts.fastfall)(p, input);
      (0, _actionStateShortcuts.airDrift)(p, input);
      if (_main.player[p].timer === 6) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing2.play();
      }
      if (_main.player[p].timer > 6 && _main.player[p].timer < 14) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 10) {
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.upairMid.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.upairMid.id1;
        _main.player[p].hitboxes.active = [true, true, false, false];
      }
      if (_main.player[p].timer === 14) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      } else if (_main.player[p].timer === 22) {
        _main.player[p].phys.autoCancel = true;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 33) {
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
      _LANDINGATTACKAIRU2.default.init(p, input);
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/ATTACKAIRU.js
// module id = 640
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/ATTACKAIRU.js?