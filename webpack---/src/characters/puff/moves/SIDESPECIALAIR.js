"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _sfx = __webpack_require__(120);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "SIDESPECIALAIR",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  groundVelocities: [1.88, 1.50792, 1.31208, 1.14561, 0.73439, 0.34986, 0.34461, 0.33943, 0.33430, 0.32924, 0.32424, 0.31930, 0.31443, 0.30961, 0.30486, 0.30017, 0.29554, 0.29097, 0.28647, 0.28202, 0.27764, 0.27332, 0.26906, 0.26487, 0.26074, 0.25666, 0.25265, 0.23230, 0.19657, 0.16230, 0.12950, 0.09816, 0.06830, 0.03990],
  airVelocities: [2.024, 1.86208, 1.71311, 1.57606, 1.44998, 1.33398, 1.22726, 1.12908, 1.03876, 0.95565, 0.87920, 0.80887, 0.74416, 0.68462, 0.62985, 0.57947, 0.53311, 0.49046, 0.45122, 0.41513, 0.38192, 0.35136, 0.32325, 0.29739, 0.27360, 0.25171, 0.23158, 0.21305],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "SIDESPECIALAIR";
    _main.player[p].timer = 0;
    if (_main.player[p].phys.grounded) {
      _main.player[p].phys.cVel.x = 0;
    } else {
      if (_main.player[p].phys.cVel.y < -_main.player[p].charAttributes.terminalV) {
        _main.player[p].phys.cVel.y = -_main.player[p].charAttributes.terminalV;
      }
    }
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.sidespecial.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.sidespecial.id1;
    _index2.default.SIDESPECIALAIR.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.SIDESPECIALAIR.interrupt(p, input)) {

      if (_main.player[p].phys.grounded) {
        if (_main.player[p].timer > 11) {
          _main.player[p].phys.cVel.x = _index2.default.SIDESPECIALAIR.groundVelocities[_main.player[p].timer - 12] * _main.player[p].phys.face;
        }
      } else {
        if (_main.player[p].timer === 12) {
          _main.player[p].phys.fastfalled = false;
          _main.player[p].phys.upbAngleMultiplier = input[p][0].lsY * Math.PI * (20 / 180);
          //decide angle
          //max 20 degrees
          _main.player[p].phys.cVel.y = 0;
        }
        if (_main.player[p].timer < 12) {
          if (_main.player[p].phys.cVel.x > 0) {
            _main.player[p].phys.cVel.x -= _main.player[p].charAttributes.airFriction;
            if (_main.player[p].phys.cVel.x < 0) {
              _main.player[p].phys.cVel.x = 0;
            }
          } else if (_main.player[p].phys.cVel.x < 0) {
            _main.player[p].phys.cVel.x += _main.player[p].charAttributes.airFriction;
            if (_main.player[p].phys.cVel.x > 0) {
              _main.player[p].phys.cVel.x = 0;
            }
          }
          _main.player[p].phys.cVel.y -= _main.player[p].charAttributes.gravity;
          if (_main.player[p].phys.cVel.y < -_main.player[p].charAttributes.terminalV) {
            _main.player[p].phys.cVel.y = -_main.player[p].charAttributes.terminalV;
          }
        } else if (_main.player[p].timer > 11 && _main.player[p].timer < 40) {
          _main.player[p].phys.cVel.x = _index2.default.SIDESPECIALAIR.airVelocities[_main.player[p].timer - 12] * _main.player[p].phys.face * Math.cos(_main.player[p].phys.upbAngleMultiplier);
          _main.player[p].phys.cVel.y = _index2.default.SIDESPECIALAIR.airVelocities[_main.player[p].timer - 12] * Math.sin(_main.player[p].phys.upbAngleMultiplier);
        } else {
          (0, _actionStateShortcuts.airDrift)(p, input);
          (0, _actionStateShortcuts.fastfall)(p, input);
        }
      }

      if (_main.player[p].timer === 12) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.puffshout1.play();
      }
      if (_main.player[p].timer > 12 && _main.player[p].timer < 28) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 28) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 45) {
      if (_main.player[p].phys.grounded) {
        _WAIT2.default.init(p, input);
      } else {
        _FALL2.default.init(p, input);
      }
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    _main.player[p].actionState = "SIDESPECIALGROUND";
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/SIDESPECIALAIR.js
// module id = 323
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/SIDESPECIALAIR.js?