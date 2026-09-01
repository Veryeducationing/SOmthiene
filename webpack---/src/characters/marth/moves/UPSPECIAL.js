"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _Vec2D = __webpack_require__(22);

var _drawVfx = __webpack_require__(134);

var _FALLSPECIAL = __webpack_require__(319);

var _FALLSPECIAL2 = _interopRequireDefault(_FALLSPECIAL);

var _LANDINGFALLSPECIAL = __webpack_require__(320);

var _LANDINGFALLSPECIAL2 = _interopRequireDefault(_LANDINGFALLSPECIAL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "UPSPECIAL",
  canPassThrough: true,
  canGrabLedge: [true, false],
  setVelocities: [[0.75685, 14.41555], [0.71450, 15.51062], [0.67334, 8.65633], [0.63338, 2.42162], [0.59462, 2.11897], [0.55706, 1.83569], [0.52069, 1.57181], [0.48552, 1.32731], [0.45155, 1.10218], [0.41878, 0.89645], [0.38720, 0.71010], [0.35682, 0.54314], [0.32765, 0.39556], [0.29966, 0.26735], [0.27288, 0.15855], [0.24729, 0.06912], [0.22290, -0.00093]],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "UPSPECIAL";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel = new _Vec2D.Vec2D(0, 0);
    _main.player[p].phys.fastfalled = false;
    _main.player[p].phys.upbAngleMultiplier = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.upb1.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.upb1.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.upb1.id2;
    _main.player[p].phys.landingMultiplier = 30 / 34;
    _sfx.sounds.dolphinSlash.play();
    _sfx.sounds.dolphinSlash2.play();
    _index2.default.UPSPECIAL.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.UPSPECIAL.interrupt(p, input)) {
      if (_main.player[p].phys.cVel.y <= 0) {
        _main.player[p].phys.canWallJump = true;
      }
      if (_main.player[p].timer < 6) {
        if (Math.abs(input[p][0].lsX) > 0.7) {
          _main.player[p].phys.upbAngleMultiplier = -input[p][0].lsX * Math.PI / 16;
        }
      }
      if (_main.player[p].timer === 6) {
        _main.player[p].phys.grounded = false;
        if (input[p][0].lsX * _main.player[p].phys.face < -0.28) {
          _main.player[p].phys.face *= -1;
        }
      }
      if (_main.player[p].timer > 5 && _main.player[p].timer < 23) {
        _main.player[p].phys.cVel = new _Vec2D.Vec2D(_index2.default.UPSPECIAL.setVelocities[_main.player[p].timer - 6][0] * _main.player[p].phys.face * Math.cos(_main.player[p].phys.upbAngleMultiplier) - _index2.default.UPSPECIAL.setVelocities[_main.player[p].timer - 6][1] * Math.sin(_main.player[p].phys.upbAngleMultiplier), _index2.default.UPSPECIAL.setVelocities[_main.player[p].timer - 6][0] * _main.player[p].phys.face * Math.sin(_main.player[p].phys.upbAngleMultiplier) + _index2.default.UPSPECIAL.setVelocities[_main.player[p].timer - 6][1] * Math.cos(_main.player[p].phys.upbAngleMultiplier));
      } else if (_main.player[p].timer > 22) {
        (0, _actionStateShortcuts.fastfall)(p, input);
        (0, _actionStateShortcuts.airDrift)(p, input);
        if (Math.abs(_main.player[p].phys.cVel.x) > 0.36) {
          _main.player[p].phys.cVel.x = 0.36 * Math.sign(_main.player[p].phys.cVel.x);
        }
      }

      if (_main.player[p].timer === 5) {
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer === 6) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.upb2.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.upb2.id1;
        _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.upb2.id2;
      }
      if (_main.player[p].timer > 6 && _main.player[p].timer < 11) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 11) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (_main.player[p].timer > 2 && _main.player[p].timer < 12) {
        (0, _drawVfx.drawVfx)({
          name: "swing",
          pos: new _Vec2D.Vec2D(0, 0),
          face: _main.player[p].phys.face,
          f: {
            pNum: p,
            swingType: "UPSPECIAL",
            frame: _main.player[p].timer - 3
          }
        });
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 39) {
      _FALLSPECIAL2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    if (_main.player[p].phys.cVel.y + _main.player[p].phys.kVel.y <= 0 || _main.player[p].phys.ECBp[0].y <= _main.player[p].phys.ECB1[0].y || _main.player[p].phys.pos.y <= _main.player[p].phys.posPrev.y) {
      _LANDINGFALLSPECIAL2.default.init(p, input);
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/UPSPECIAL.js
// module id = 423
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/UPSPECIAL.js?