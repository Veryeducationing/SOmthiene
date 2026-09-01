"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(628);

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

var _UPSPECIALCATCH = __webpack_require__(646);

var _UPSPECIALCATCH2 = _interopRequireDefault(_UPSPECIALCATCH);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "UPSPECIAL",
  canPassThrough: true,
  canGrabLedge: [true, true],
  setVelocities: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [-0.00191, -0.00078], [-0.00464, -0.00189], [-0.00573, -0.00233], [-0.00518, -0.00211], [-0.003, -0.00122], [0.00082, 0.00033], [0.00628, 0.00255], [0.01337, 0.00544], [0.34782, 2.55553], [0.35129, 2.45635], [0.35466, 2.35818], [0.35790, 2.26101], [0.36104, 2.16485], [0.36407, 2.06970], [0.36698, 1.97556], [0.36979, 1.88242], [0.37248, 1.79029], [0.37506, 1.69916], [0.37753, 1.60904], [0.37989, 1.51993], [0.38213, 1.43183], [0.38427, 1.34473], [0.38629, 1.25863], [0.38820, 1.17355], [0.39, 1.08947], [0.39169, 1.00640], [0.39326, 0.92434], [0.39473, 0.84328], [0.39608, 0.76322], [0.39732, 0.68419], [0.39845, 0.60614], [0.39947, 0.52912], [0.40038, 0.45309], [0.40117, 0.37807], [0.40186, 0.30406], [0.40243, 0.23106], [0.40290, 0.15906], [0.40324, 0.08807], [0.40349, 0.01808], [0.40361, -0.05088], [0.40362, -0.11886], [0.40353, -0.27163], [0.40332, -0.49663], [0.40300, -0.70176], [0.40257, -0.88704], [0.40203, -1.05243], [0.40137, -1.19797], [0.40061, -1.32366], [0.39973, -1.42945], [0.39874, -1.51540], [0.39764, -1.58148], [0.39643, -1.62769], [0.39511, -1.65403], [0.39367, -1.66051], [0.39212, -1.64713], [0.39047, -1.61388], [0.38869, -1.56076], [0.38682, -1.48778], [0.38482, -1.39494]],
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
    _main.player[p].phys.landingMultiplier = 30 / 34;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.falcondive1.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.falcondive1.id1;
    (0, _drawVfx.drawVfx)({
      name: "groundBounce",
      pos: _main.player[p].phys.pos,
      face: _main.player[p].phys.face,
      f: Math.PI / 2
    });
    _index2.default.UPSPECIAL.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.UPSPECIAL.interrupt(p, input)) {
      if (_main.player[p].timer === 13) {
        _main.player[p].phys.grounded = false;
        if (input[p][0].lsX * _main.player[p].phys.face < -0.28) {
          _main.player[p].phys.face *= -1;
        }
      }
      if (_main.player[p].timer > 1) {
        _main.player[p].phys.cVel.x -= _index2.default.UPSPECIAL.setVelocities[_main.player[p].timer - 2][0] * _main.player[p].phys.face;
      }
      _main.player[p].phys.cVel.x += input[p][0].lsX * 0.044;
      if (Math.abs(input[p][0].lsX) < 0.28) {
        _main.player[p].phys.cVel.x = 0;
      }
      if (_main.player[p].phys.cVel.x < -0.952) {
        _main.player[p].phys.cVel.x = -0.952;
      }
      if (_main.player[p].phys.cVel.x > 0.952) {
        _main.player[p].phys.cVel.x = 0.952;
      }
      _main.player[p].phys.cVel.x += _index2.default.UPSPECIAL.setVelocities[_main.player[p].timer - 1][0] * _main.player[p].phys.face;
      _main.player[p].phys.cVel.y = _index2.default.UPSPECIAL.setVelocities[_main.player[p].timer - 1][1];
      if (_main.player[p].timer === 13) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer > 13 && _main.player[p].timer < 34) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 14) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.falcondive2.id0;
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].hitboxes.active = [true, false, false, false];
        _sfx.sounds.falcondive.play();
      }
      if (_main.player[p].timer === 34) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 64) {
      _FALLSPECIAL2.default.init(p, input);
      return true;
    } else if (_main.player[p].phys.grabbing !== -1) {
      _main.player[p].phys.pos.x = _main.player[_main.player[p].phys.grabbing].phys.pos.x;
      _main.player[p].phys.pos.y = _main.player[_main.player[p].phys.grabbing].phys.pos.y;
      _UPSPECIALCATCH2.default.init(p, input);
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
// ./src/characters/falcon/moves/UPSPECIAL.js
// module id = 645
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/UPSPECIAL.js?