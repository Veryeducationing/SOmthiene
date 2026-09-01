"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DOWNSPECIALAIRENDAIR = __webpack_require__(656);

var _DOWNSPECIALAIRENDAIR2 = _interopRequireDefault(_DOWNSPECIALAIRENDAIR);

var _DOWNSPECIALAIRENDGROUND = __webpack_require__(657);

var _DOWNSPECIALAIRENDGROUND2 = _interopRequireDefault(_DOWNSPECIALAIRENDGROUND);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

var _settings = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
exports.default = {
  name: "DOWNSPECIALAIR",
  setVelocities: [[-0.31605, 0.20183], [-0.36565, 0.27723], [-0.21252, 0.33551], [0.24607, 0.37668], [0.24607, 0.40073], [0.24607, 0.40766], [0.24607, 0.39748], [0.24607, 0.37018], [0.24607, 0.32577], [0.24607, 0.26424], [0.24607, 0.18559], [0.24607, 0.08983], [0.24607, -0.02305], [0.24607, -0.15304], [0.24607, -0.30015], [0.24607, -0.46438]],
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALAIR";
    _main.player[p].timer = 0;
    _main.player[p].phys.fastfalled = false;
    _main.player[p].phys.cVel.y = 0;
    _main.player[p].phys.cVel.x = 0;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.falconkickairClean.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.falconkickairClean.id1;
    _sfx.sounds.falconkickshout.play();
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer < 17) {
        _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 1][0] * _main.player[p].phys.face;
        _main.player[p].phys.cVel.y = this.setVelocities[_main.player[p].timer - 1][1];
      } else {
        _main.player[p].phys.cVel.x = 1.22542 * _main.player[p].phys.face;
        _main.player[p].phys.cVel.y = -3.81748;
        if (_main.player[p].timer % 2) {
          (0, _drawVfx.drawVfx)({
            name: "firefoxtail",
            pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 3 * _main.player[p].phys.face, _main.player[p].phys.pos.y - 7),
            face: _main.player[p].phys.face
          });
        }
      }
      if (_main.player[p].timer === 15) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.falconkick.play();
      }
      if (_main.player[p].timer > 15 && _main.player[p].timer < 30) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 18) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.falconkickairMid.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.falconkickairMid.id1;
      }
      if (_main.player[p].timer === 26) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.falconkickairLate.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.falconkickairLate.id1;
      }
      if (_main.player[p].timer === 30) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 29) {
      _DOWNSPECIALAIRENDAIR2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    _DOWNSPECIALAIRENDGROUND2.default.init(p, input);
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/DOWNSPECIALAIR.js
// module id = 655
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/DOWNSPECIALAIR.js?