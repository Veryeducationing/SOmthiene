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
  name: "DOWNSPECIALGROUND",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALGROUND";
    _main.player[p].timer = 0;
    if (_main.player[p].phys.grounded) {
      if (_main.player[p].phys.cVel.x > 0) {
        _main.player[p].phys.cVel.x -= 0.1;
      }
      if (_main.player[p].phys.cVel.x < 0) {
        _main.player[p].phys.cVel.x += 0.1;
      }
    } else {
      _main.player[p].phys.fastfalled = false;
      if (_main.player[p].phys.cVel.y < -_main.player[p].charAttributes.terminalV) {
        _main.player[p].phys.cVel.y = -_main.player[p].charAttributes.terminalV;
      }
    }
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.downspecial.id0;
    _index2.default.DOWNSPECIALGROUND.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.DOWNSPECIALGROUND.interrupt(p, input)) {
      if (_main.player[p].phys.grounded) {
        (0, _actionStateShortcuts.reduceByTraction)(p);
      } else {
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
      }

      if (_main.player[p].timer === 1) {
        _main.player[p].hitboxes.active = [true, false, false, false];
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].phys.intangibleTimer = 26;
      }
      if (_main.player[p].timer === 2) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (_main.player[p].timer === 10) {
        _sfx.sounds.rest1.play();
        _sfx.sounds.restbubbles.play();
      }
      if (_main.player[p].timer === 210) {
        _sfx.sounds.rest2.play();
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 249) {
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
    //player[p].actionState = 109;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/DOWNSPECIALGROUND.js
// module id = 301
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/DOWNSPECIALGROUND.js?