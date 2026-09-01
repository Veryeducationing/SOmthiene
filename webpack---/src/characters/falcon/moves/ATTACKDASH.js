"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(628);

var _index2 = _interopRequireDefault(_index);

var _GRAB = __webpack_require__(644);

var _GRAB2 = _interopRequireDefault(_GRAB);

var _KNEEBEND = __webpack_require__(283);

var _KNEEBEND2 = _interopRequireDefault(_KNEEBEND);

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

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "ATTACKDASH",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "ATTACKDASH";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.dashattackClean.id0;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {

      if (_main.player[p].timer < 27) {
        _main.player[p].phys.cVel.x = 1.30577 * _main.player[p].phys.face;
      } else {
        _main.player[p].phys.cVel.x = 0.34643 * _main.player[p].phys.face;
      }

      if (_main.player[p].timer === 7) {
        _main.player[p].hitboxes.active = [true, false, false, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing2.play();
      }
      if (_main.player[p].timer > 7 && _main.player[p].timer < 17) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 10) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.dashattackLate.id0;
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer === 17) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 39) {
      _WAIT2.default.init(p, input);
      return true;
    } else if (_main.player[p].timer < 5 && (input[p][0].lA > 0 || input[p][0].rA > 0)) {
      if (_main.player[p].phys.cVel.x * _main.player[p].phys.face > _main.player[p].charAttributes.dMaxV) {
        _main.player[p].phys.cVel.x = _main.player[p].charAttributes.dMaxV * _main.player[p].phys.face;
      }
      _GRAB2.default.init(p, input);
      return true;
    } else if (_main.player[p].timer > 37) {
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
// ./src/characters/falcon/moves/ATTACKDASH.js
// module id = 643
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/ATTACKDASH.js?