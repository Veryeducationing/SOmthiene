"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _index = __webpack_require__(628);

var _index2 = _interopRequireDefault(_index);

var _DASH = __webpack_require__(284);

var _DASH2 = _interopRequireDefault(_DASH);

var _SMASHTURN = __webpack_require__(285);

var _SMASHTURN2 = _interopRequireDefault(_SMASHTURN);

var _TILTTURN = __webpack_require__(286);

var _TILTTURN2 = _interopRequireDefault(_TILTTURN);

var _WALK = __webpack_require__(287);

var _WALK2 = _interopRequireDefault(_WALK);

var _KNEEBEND = __webpack_require__(283);

var _KNEEBEND2 = _interopRequireDefault(_KNEEBEND);

var _SQUATWAIT = __webpack_require__(303);

var _SQUATWAIT2 = _interopRequireDefault(_SQUATWAIT);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "JAB3",
  setVelocities: [0, 0.00024, 0.00024, -0.00047, 3.76443, 3.40589, 0.00972, 0.00748, 0.00538, 0.00342, 0.0016, -0.0007, -0.0016, -0.00299, -0.00423, -0.00533, -0.00629, -0.0071, 0.00051, 0.00051, 0.0005, 0.0005, 0.00051, 0.00051, 0.0005, 0.0005, 0.0005, 0.00051, 0.0005, 0.0005, 0.0005, 0.00051],
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "JAB3";
    _main.player[p].timer = 0;
    _main.player[p].phys.jabCombo = false;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.jab3Clean.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.jab3Clean.id1;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 1] * _main.player[p].phys.face;
      if (_main.player[p].timer === 6) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing2.play();
      }
      if (_main.player[p].timer > 6 && _main.player[p].timer < 13) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 9) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.jab3Late.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.jab3Late.id1;
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer === 13) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 32) {
      _WAIT2.default.init(p, input);
      return true;
    } else if (_main.player[p].timer > 22) {
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
      } else if (input[p][0].lsX * _main.player[p].phys.face < -0.3 && Math.abs(input[p][0].lsX) > input[p][0].lsY * -1) {
        _main.player[p].phys.dashbuffer = (0, _actionStateShortcuts.tiltTurnDashBuffer)(p, input);
        _TILTTURN2.default.init(p, input);
        return true;
      } else if (input[p][0].lsX * _main.player[p].phys.face > 0.3 && Math.abs(input[p][0].lsX) > input[p][0].lsY * -1) {
        _WALK2.default.init(p, true, input);
        return true;
      } else {
        return false;
      }
    }
    // iasa 23
    else {
        return false;
      }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/JAB3.js
// module id = 631
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/JAB3.js?