"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _hitDetection = __webpack_require__(133);

var _characters = __webpack_require__(119);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _CATCHCUT = __webpack_require__(326);

var _CATCHCUT2 = _interopRequireDefault(_CATCHCUT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "THROWBACK",
  canEdgeCancel: false,
  canBeGrabbed: true,
  setVelocities: [-0.12755, -1.24035, -3.10533, -2.72023, -0.32654, 0, 0, 0, 0.00357, 0.09035, 0.22531, 0.37797, 0.54831, 1.35048, 1.60332, 1.04371, 0.81257, 0.60621, 0.42461, 0.26777, 0.1357, 0.03, 0],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWBACK";
    _main.player[p].timer = 0;
    var grabbing = _main.player[p].phys.grabbing;
    if (grabbing === -1) {
      return;
    }
    _actionStateShortcuts.actionStates[_main.characterSelections[grabbing]].THROWNPUFFBACK.init(grabbing, input);
    var frame = _characters.framesData[_main.characterSelections[grabbing]].THROWNPUFFBACK;
    _main.player[p].phys.releaseFrame = frame + 1;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.throwback.id0;
    (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
    _index2.default.THROWBACK.main(p, input);
  },
  main: function main(p, input) {
    var prevFrame = _main.player[p].timer;
    _main.player[p].timer += 22 / _main.player[p].phys.releaseFrame;
    if (!_index2.default.THROWBACK.interrupt(p, input)) {
      if (Math.floor(_main.player[p].timer + 0.01) > 13 && Math.floor(_main.player[p].timer + 0.01 < 37)) {
        _main.player[p].phys.cVel.x = _index2.default.THROWBACK.setVelocities[Math.floor(_main.player[p].timer + 0.01) - 14] * _main.player[p].phys.face;
      }
      if (Math.floor(_main.player[p].timer + 0.01) >= 22 && prevFrame < 22) {
        if (_main.player[p].phys.grabbing === -1) return;
        _hitDetection.hitQueue.push([_main.player[p].phys.grabbing, p, 0, false, true, true]);
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 43) {
      _main.player[p].phys.grabbing = -1;
      _WAIT2.default.init(p, input);
      return true;
    } else {
      var grabbing = _main.player[p].phys.grabbing;
      if (grabbing === -1) {
        return;
      }
      if (_main.player[p].timer < _main.player[p].phys.releaseFrame && _main.player[grabbing].phys.grabbedBy !== p) {
        _CATCHCUT2.default.init(p, input);
        return true;
      } else {
        return false;
      }
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/THROWBACK.js
// module id = 325
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/THROWBACK.js?