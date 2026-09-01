"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LANDING = __webpack_require__(272);

var _LANDING2 = _interopRequireDefault(_LANDING);

var _LANDINGATTACKAIRD = __webpack_require__(275);

var _LANDINGATTACKAIRD2 = _interopRequireDefault(_LANDINGATTACKAIRD);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "ATTACKAIRD",
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "ATTACKAIRD";
    _main.player[p].timer = 0;
    _main.player[p].phys.autoCancel = true;
    _main.player[p].inAerial = true;
    _main.player[p].IASATimer = 60;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.dair.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.dair.id1;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      (0, _actionStateShortcuts.fastfall)(p, input);
      (0, _actionStateShortcuts.airDrift)(p, input);
      if (_main.player[p].timer === 4) {
        _main.player[p].phys.autoCancel = false;
      }

      if (_main.player[p].timer > 4 && _main.player[p].timer < 26) {
        switch (_main.player[p].timer % 3) {
          case 2:
            _main.player[p].hitboxes.active = [true, true, false, false];
            _main.player[p].hitboxes.frame = 0;
            _sfx.sounds.normalswing2.play();
            break;
          case 0:
            _main.player[p].hitboxes.frame++;
            break;
          case 1:
            (0, _actionStateShortcuts.turnOffHitboxes)(p);
            break;

        }
      }

      if (_main.player[p].timer === 32) {
        _main.player[p].phys.autoCancel = true;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 49) {
      _FALL2.default.init(p, input);
      return true;
    } else if ((0, _actionStateShortcuts.checkForIASA)(p, input, true)) {
      //yes I know this is pointless.
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    if (_main.player[p].phys.autoCancel) {
      _LANDING2.default.init(p, input);
    } else {
      _LANDINGATTACKAIRD2.default.init(p, input);
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/fox/moves/ATTACKAIRD.js
// module id = 443
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/ATTACKAIRD.js?