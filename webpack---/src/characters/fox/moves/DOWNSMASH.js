"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(5);

var _index2 = _interopRequireDefault(_index);

var _DASH = __webpack_require__(284);

var _DASH2 = _interopRequireDefault(_DASH);

var _SMASHTURN = __webpack_require__(285);

var _SMASHTURN2 = _interopRequireDefault(_SMASHTURN);

var _TILTTURN = __webpack_require__(286);

var _TILTTURN2 = _interopRequireDefault(_TILTTURN);

var _WALK = __webpack_require__(287);

var _WALK2 = _interopRequireDefault(_WALK);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _KNEEBEND = __webpack_require__(283);

var _KNEEBEND2 = _interopRequireDefault(_KNEEBEND);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "DOWNSMASH",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSMASH";
    _main.player[p].timer = 0;
    _main.player[p].phys.charging = false;
    _main.player[p].phys.chargeFrames = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.dsmash.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.dsmash.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.dsmash.id2;
    _main.player[p].hitboxes.id[3] = _main.player[p].charHitboxes.dsmash.id3;
    this.main(p, input);
  },
  main: function main(p, input) {
    if (_main.player[p].timer === 2) {
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

      if (_main.player[p].timer === 6) {
        _main.player[p].hitboxes.active = [true, true, true, true];
        _main.player[p].hitboxes.frame = 0;
        (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
        _sfx.sounds.normalswing1.play();
      }
      if (_main.player[p].timer > 6 && _main.player[p].timer < 11) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 11) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 49) {
      _WAIT2.default.init(p, input);
      return true;
    } else if (_main.player[p].timer > 45 && !_main.player[p].inCSS) {
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
// ./src/characters/fox/moves/DOWNSMASH.js
// module id = 439
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/DOWNSMASH.js?