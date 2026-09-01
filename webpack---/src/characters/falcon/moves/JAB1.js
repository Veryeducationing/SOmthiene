"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(628);

var _index2 = _interopRequireDefault(_index);

var _JAB = __webpack_require__(630);

var _JAB2 = _interopRequireDefault(_JAB);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _WALK = __webpack_require__(287);

var _WALK2 = _interopRequireDefault(_WALK);

var _DASH = __webpack_require__(284);

var _DASH2 = _interopRequireDefault(_DASH);

var _KNEEBEND = __webpack_require__(283);

var _KNEEBEND2 = _interopRequireDefault(_KNEEBEND);

var _SMASHTURN = __webpack_require__(285);

var _SMASHTURN2 = _interopRequireDefault(_SMASHTURN);

var _TILTTURN = __webpack_require__(286);

var _TILTTURN2 = _interopRequireDefault(_TILTTURN);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "JAB1",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "JAB1";
    _main.player[p].timer = 0;
    _main.player[p].phys.jabCombo = false;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.jab1.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.jab1.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.jab1.id2;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);

      if (_main.player[p].timer > 2 && _main.player[p].timer < 25 && input[p][0].a && !input[p][1].a) {
        _main.player[p].phys.jabCombo = true;
      }
      if (_main.player[p].timer === 3) {
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing2.play();
      }
      if (_main.player[p].timer > 3 && _main.player[p].timer < 6) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 6) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 8 && _main.player[p].phys.jabCombo) {
      _JAB2.default.init(p, input);
      return true;
    } else if (_main.player[p].timer > 21) {
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/JAB1.js
// module id = 629
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/JAB1.js?