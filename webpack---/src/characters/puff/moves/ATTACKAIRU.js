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

var _LANDINGATTACKAIRU = __webpack_require__(281);

var _LANDINGATTACKAIRU2 = _interopRequireDefault(_LANDINGATTACKAIRU);

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
    _main.player[p].phys.autoCancel = true;
    _main.player[p].inAerial = true;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.upair.id0;
    _index2.default.ATTACKAIRU.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.ATTACKAIRU.interrupt(p, input)) {
      (0, _actionStateShortcuts.fastfall)(p, input);
      (0, _actionStateShortcuts.airDrift)(p, input);

      if (_main.player[p].timer === 9) {
        _main.player[p].hitboxes.active = [true, false, false, false];
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].phys.autoCancel = false;
        _sfx.sounds.normalswing2.play();
        // needs normalswing3
      }
      if (_main.player[p].timer > 9 && _main.player[p].timer < 13) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 13) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (_main.player[p].timer === 38) {
        _main.player[p].phys.autoCancel = true;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 39) {
      _FALL2.default.init(p, input);
      return true;
    } else if (_main.player[p].timer > 37) {
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
      _LANDINGATTACKAIRU2.default.init(p, input);
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/ATTACKAIRU.js
// module id = 280
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/ATTACKAIRU.js?