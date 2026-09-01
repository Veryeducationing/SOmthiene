"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(5);

var _index2 = _interopRequireDefault(_index);

var _GRAB = __webpack_require__(446);

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
  setVelocities: [0.99874, 1.82126, 2.22815, 2.43704, 1.91481, 1.39379, 1.36213, 1.33162, 1.30228, 1.27408, 1.24704, 1.22115, 1.19642, 1.17284, 1.15042, 1.12915, 1.10902, 1.09006, 1.06475, 1.01691, 0.94598, 0.85192, 0.73477, 0.59452, 0.43115, 0.32167, 0.28310, 0.24695, 0.21323, 0.18194, 0.15309, 0.12666, 0.10266, 0.08109, 0.06194, 0.04524, 0.03096, 0.0191, 0.00968],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "ATTACKDASH";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.dashattack1.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.dashattack1.id1;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 1] * _main.player[p].phys.face;

      if (_main.player[p].timer === 4) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing2.play();
        // needs 3
      }
      if (_main.player[p].timer > 4 && _main.player[p].timer < 18) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 8) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.dashattack2.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.dashattack2.id1;
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer === 18) {
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
    } else if (_main.player[p].timer > 35) {
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
// ./src/characters/fox/moves/ATTACKDASH.js
// module id = 445
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/ATTACKDASH.js?