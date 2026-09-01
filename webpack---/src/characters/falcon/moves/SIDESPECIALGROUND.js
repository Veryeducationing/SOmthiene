"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALLSPECIAL = __webpack_require__(319);

var _FALLSPECIAL2 = _interopRequireDefault(_FALLSPECIAL);

var _article = __webpack_require__(132);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _drawVfx = __webpack_require__(134);

var _SIDESPECIALGROUNDHIT = __webpack_require__(653);

var _SIDESPECIALGROUNDHIT2 = _interopRequireDefault(_SIDESPECIALGROUNDHIT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "SIDESPECIALGROUND",
  setVelocities1: [-1.79163, -3.1017, -3.08, -1.72663],
  setVelocities2: [5.60854, 5.2283, 4.65846, 3.89902, 3.376, 3.21597, 3.05619, 2.89666, 2.73738, 2.57834, 2.41955, 2.26102, 2.10273, 1.94468, 1.78689, 1.62934, 1.47205, 1.315, 1.1582, 1.05434, 1.00404, 0.95493, 0.90701, 0.86029, 0.81476, 0.77041, 0.72726, 0.6853, 0.64453, 0.60495, 0.56656, 0.52936, 0.49336, 0.45854, 0.42492, 0.39248, 0.36124, 0.33119, 0.30233, 0.27466, 0.24818, 0.22289, 0.1988, 0.1759, 0.15417, 0.13366, 0.11432, 0.09618, 0.07923, 0.06347, 0.0489, 0.03552, 0.02333, 0.01234, 0.00253, -0.00607, -0.0135, -0.01973, -0.02478, -0.02863, -0.03128, -0.03275, -0.03303],
  canPassThrough: false,
  canEdgeCancel: false,
  disableTeeter: true,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  specialOnHit: true,
  airborneState: "SIDESPECIALGROUNDTOAIR",
  init: function init(p, input) {
    _main.player[p].actionState = "SIDESPECIALGROUND";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel.x = 0;
    _main.player[p].phys.landingMultiplier = 1.5;
    _main.player[p].phys.raptorBoost = false;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.raptorboostground.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.raptorboostground.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.raptorboostground.id2;
    this.canEdgeCancel = false;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _sfx.sounds.raptorboost.play();
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer <= 4) {
        _main.player[p].phys.cVel.x = this.setVelocities1[_main.player[p].timer - 1] * _main.player[p].phys.face;
      } else if (_main.player[p].timer <= 16) {
        _main.player[p].phys.cVel.x = 0;
      } else {
        this.canEdgeCancel = true;
        _main.player[p].phys.cVel.x = this.setVelocities2[_main.player[p].timer - 17] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 15) {
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.fireweakhit.play();
      }
      if (_main.player[p].timer === 35) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].phys.raptorBoost) {
      _SIDESPECIALGROUNDHIT2.default.init(p, input);
      return true;
    } else if (_main.player[p].timer > 79) {
      if (_main.player[p].phys.grounded) {
        _WAIT2.default.init(p, input);
      } else {
        _FALLSPECIAL2.default.init(p, input);
      }
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {},
  onPlayerHit: function onPlayerHit(p) {
    _main.player[p].phys.raptorBoost = true;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/SIDESPECIALGROUND.js
// module id = 652
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/SIDESPECIALGROUND.js?