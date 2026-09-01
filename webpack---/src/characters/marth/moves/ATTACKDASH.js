"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

var _sfx = __webpack_require__(120);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "ATTACKDASH",
  canEdgeCancel: false,
  setVelocities: [0.755, 1.962, 2.714, 3.010, 2.849, 2.232, 1.184, 0.542, 0.704, 1.325, 1.487, 1.079, 0.666, 0.631, 0.597, 0.565, 0.536, 0.508, 0.482, 0.458, 0.436, 0.416, 0.398, 0.370, 0.332, 0.299, 0.270, 0.244, 0.222, 0.205, 0.191, 0.181, 0.176, 0.165, 0.148, 0.130, 0.112, 0.093, 0.073, 0.053, 0.032, 0.011, -0.783, -0.783, 0, 0, 0.001, 0.001, 0],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "ATTACKDASH";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.dashattack.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.dashattack.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.dashattack.id2;
    _main.player[p].hitboxes.id[3] = _main.player[p].charHitboxes.dashattack.id3;
    _index2.default.ATTACKDASH.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.ATTACKDASH.interrupt(p, input)) {
      _main.player[p].phys.cVel.x = _index2.default.ATTACKDASH.setVelocities[_main.player[p].timer - 1] * _main.player[p].phys.face;

      if (_main.player[p].timer > 9 && _main.player[p].timer < 21) {
        (0, _drawVfx.drawVfx)({
          name: "swing",
          pos: new _Vec2D.Vec2D(0, 0),
          face: _main.player[p].phys.face,
          f: {
            pNum: p,
            swingType: "DASHATTACK",
            frame: _main.player[p].timer - 10
          }
        });
      }
      if (_main.player[p].timer === 12) {
        _main.player[p].hitboxes.active = [true, true, true, true];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.sword1.play();
      }
      if (_main.player[p].timer > 12 && _main.player[p].timer < 16) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 16) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 49) {
      _WAIT2.default.init(p, input);
      return true;
    } else if (_main.player[p].timer < 5 && (input[p][0].lA > 0 || input[p][0].rA > 0)) {
      if (_main.player[p].phys.cVel.x * _main.player[p].phys.face > _main.player[p].charAttributes.dMaxV) {
        _main.player[p].phys.cVel.x = _main.player[p].charAttributes.dMaxV * _main.player[p].phys.face;
      }
      _index2.default.GRAB.init(p, input);
      return true;
    } else if (_main.player[p].timer > 39) {
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
// ./src/characters/marth/moves/ATTACKDASH.js
// module id = 362
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/ATTACKDASH.js?