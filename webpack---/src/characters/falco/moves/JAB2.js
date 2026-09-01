"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(555);

var _index2 = _interopRequireDefault(_index);

var _JAB = __webpack_require__(558);

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

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _main = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "JAB2",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "JAB2";
    _main.player[p].timer = 0;
    _main.player[p].phys.jabCombo = false;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.jab2.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.jab2.id1;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer === 1) {
        _main.player[p].phys.cVel.x = 0;
      } else if (_main.player[p].timer === 2) {
        _main.player[p].phys.cVel.x = 3.85 * _main.player[p].phys.face;
      } else if (_main.player[p].timer === 4) {
        _main.player[p].phys.cVel.x = 0;
      }
      if (_main.player[p].timer > 0 && _main.player[p].timer < 21 && input[p][0].a && !input[p][1].a) {
        _main.player[p].phys.jabCombo = true;
      }
      if (_main.player[p].timer === 3) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing2.play();
      }
      if (_main.player[p].timer > 3 && _main.player[p].timer < 5) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 5) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 6 && _main.player[p].phys.jabCombo) {
      _JAB2.default.init(p, input);
      return true;
    } else if (_main.player[p].timer > 20) {
      _WAIT2.default.init(p, input);
      return true;
    } else if (_main.player[p].timer > 18) {
      var b = (0, _actionStateShortcuts.checkForSpecials)(p, input);
      var t = (0, _actionStateShortcuts.checkForTilts)(p, input);
      var s = (0, _actionStateShortcuts.checkForSmashes)(p, input);
      var j = (0, _actionStateShortcuts.checkForJump)(p, input);
      if (j[0]) {
        _KNEEBEND2.default.init(p, j[1], input);
        return true;
      } else if (b[0]) {
        _index2.default[b[1]].init(p, input);
        return true;
      } else if (s[0]) {
        _index2.default[s[1]].init(p, input);
        return true;
      } else if (t[0]) {
        _index2.default[t[1]].init(p, input);
        return true;
      } else if ((0, _actionStateShortcuts.checkForDash)(p, input)) {
        _DASH2.default.init(p, input);
        return true;
      } else if ((0, _actionStateShortcuts.checkForSmashTurn)(p, input)) {
        _SMASHTURN2.default.init(p, input);
        return true;
      } else if ((0, _actionStateShortcuts.checkForTiltTurn)(p, input)) {
        _main.player[p].phys.dashbuffer = (0, _actionStateShortcuts.tiltTurnDashBuffer)(p, input);
        _TILTTURN2.default.init(p, input);
        return true;
      } else if (Math.abs(input[p][0].lsX) > 0.3) {
        _WALK2.default.init(p, true, input);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/JAB2.js
// module id = 557
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/JAB2.js?