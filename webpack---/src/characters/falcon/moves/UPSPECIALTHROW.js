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

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "UPSPECIALTHROW",
  canPassThrough: true,
  canGrabLedge: [true, false],
  setVelocities: [[0, 0], [-0.65273, 6.17333], [-0.65273, 3.41661], [-0.65273, 3.25598], [-0.65273, 3.03272], [-0.65273, 2.83681], [-0.65273, 2.63826], [-0.65273, 2.43708], [-0.65273, 2.23325], [-0.65273, 2.02678], [-0.65273, 1.81767], [-0.65273, 1.60591], [-0.65273, 1.39153], [-0.65273, 1.17448], [-0.65273, 0.95481], [-0.65273, 0.7325], [-0.72509, 0.59599], [-0.67937, 0.5477], [-0.63528, 0.50043], [-0.59311, 0.45418], [-0.55256, 0.40895], [-0.51373, 0.36472], [-0.47661, 0.3125], [-0.44122, 0.27931], [-0.40755, 0.23812], [-0.3756, 0.19794], [-0.34537, 0.15879], [-0.31686, 0.12064], [-0.29007, 0.08351], [-0.265, 0.04739], [-0.24165, 0.01228], [-0.22003, -0.02181], [-0.20012, -0.05488], [-0.18193, -0.08695], [-0.16547, -0.11801], [-0.15071, -0.14804], [-0.13769, -0.17707], [-0.12639, -0.20508], [-0.1168, -0.23207], [-0.10894, -0.25807], [-0.10279, -0.28303], [-0.09896, -0.307], [-0.09616, -0.32994], [-0.09319, -0.35187], [-0.09003, -0.37279], [-0.08668, -0.6927], [-0.08315, -1.01158], [-0.07944, -1.32946], [-0.07555, -1.64633], [-0.07146, -1.96218], [-0.06721, -2.27702], [-0.06276, -2.59084], [-0.05813, -2.9], [-0.05331, -2.9], [-0.04832, -2.9], [-0.04313, -2.9], [-0.03777, -2.9], [-0.03223, -2.9], [-0.02649, -2.9], [-0.02058, -2.9]],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 0,
  init: function init(p, input) {
    _main.player[p].actionState = "UPSPECIALTHROW";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel = new _Vec2D.Vec2D(0, 0);
    _main.player[p].phys.fastfalled = false;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _sfx.sounds.falconyes.play();
    for (var n = 0; n < 3; n++) {
      (0, _drawVfx.drawVfx)({
        name: "firefoxtail",
        pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + (-0.5 + Math.random()) * 17, _main.player[p].phys.pos.y + 5 + (-0.5 + Math.random()) * 17),
        face: _main.player[p].phys.face
      });
    }
    _index2.default.UPSPECIALTHROW.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.UPSPECIALTHROW.interrupt(p, input)) {
      _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 1][0] * _main.player[p].phys.face;
      _main.player[p].phys.cVel.y = this.setVelocities[_main.player[p].timer - 1][1];
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 60) {
      _FALL2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/UPSPECIALTHROW.js
// module id = 647
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/UPSPECIALTHROW.js?