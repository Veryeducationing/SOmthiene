"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALLSPECIAL = __webpack_require__(319);

var _FALLSPECIAL2 = _interopRequireDefault(_FALLSPECIAL);

var _LANDINGFALLSPECIAL = __webpack_require__(320);

var _LANDINGFALLSPECIAL2 = _interopRequireDefault(_LANDINGFALLSPECIAL);

var _SIDESPECIALAIRHIT = __webpack_require__(651);

var _SIDESPECIALAIRHIT2 = _interopRequireDefault(_SIDESPECIALAIRHIT);

var _article = __webpack_require__(132);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _drawVfx = __webpack_require__(134);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "SIDESPECIALAIR",
  setVelocities: [2.27937, 1.82957, 1.65988, 1.77032, 2.16086, 2.40854, 2.32754, 2.24791, 2.16967, 2.09282, 2.01735, 1.94326, 1.87056, 1.79924, 1.72931, 1.66076, 1.59359, 1.52782, 1.46342, 1.4004, 1.33878, 1.27853, 1.21968, 1.1622, 1.10611, 1.05141, 0.99808, 0.94615, 0.89559, 0.84642, 0.79864, 0.75225, 0.70722, 0.66359, 0.62135, 0.58048, 0.541, 0.50291, 0.46619, 0.43089, 0.39694, 0.36437, 0.3332, 0.30343, 0.275, 0.248, 0.22235, 0.19812, 0.17523, 0.15378, 0.13364, 0.11496, 0.09761, 0.08167, 0.06713, 0.05394, 0.04214, 0.03175, 0.02271, 0.01509, 0.00881, 0.00396, 0.00046, -0.00165],
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  specialOnHit: true,
  init: function init(p, input) {
    _main.player[p].actionState = "SIDESPECIALAIR";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel.x = 0;
    _main.player[p].phys.cVel.y = 0;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.raptorboostair.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.raptorboostair.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.raptorboostair.id2;
    _main.player[p].phys.raptorBoost = false;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _sfx.sounds.raptorboost.play();
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer >= 16) {
        _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 16] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer >= 30) {
        _main.player[p].phys.cVel.y -= 0.05;
      }
      if (_main.player[p].timer === 17) {
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
      _SIDESPECIALAIRHIT2.default.init(p, input);
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
  land: function land(p, input) {
    _LANDINGFALLSPECIAL2.default.init(p, input);
  },
  onPlayerHit: function onPlayerHit(p) {
    _main.player[p].phys.raptorBoost = true;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/SIDESPECIALAIR.js
// module id = 650
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/SIDESPECIALAIR.js?