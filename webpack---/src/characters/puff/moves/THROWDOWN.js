"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _characters = __webpack_require__(119);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _hitDetection = __webpack_require__(133);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _CATCHCUT = __webpack_require__(326);

var _CATCHCUT2 = _interopRequireDefault(_CATCHCUT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "THROWDOWN",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "THROWDOWN";
    _main.player[p].timer = 0;
    var grabbing = _main.player[p].phys.grabbing;
    if (grabbing === -1) {
      return;
    }
    _actionStateShortcuts.actionStates[_main.characterSelections[grabbing]].THROWNPUFFDOWN.init(grabbing, input);
    var frame = _characters.framesData[_main.characterSelections[grabbing]].THROWNPUFFDOWN;
    _main.player[p].phys.releaseFrame = frame + 1;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.throwdownextra.id0;
    (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
    _index2.default.THROWDOWN.main(p, input);
  },
  main: function main(p, input) {
    var prevFrame = _main.player[p].timer;
    _main.player[p].timer += 61 / _main.player[p].phys.releaseFrame;
    if (!_index2.default.THROWDOWN.interrupt(p, input)) {
      //10,23,36,49
      if (_main.player[p].timer < 51) {
        if (_main.player[p].timer % 13 === 10) {
          _main.player[p].hitboxes.active = [true, false, false, false];
          _main.player[p].hitboxes.frame = 0;
        }
        if (_main.player[p].timer % 13 === 11) {
          (0, _actionStateShortcuts.turnOffHitboxes)(p);
        }
      }
      if (Math.floor(_main.player[p].timer + 0.01) >= 61 && prevFrame < 61) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.throwdown.id0;
        _hitDetection.hitQueue.push([_main.player[p].phys.grabbing, p, 0, false, true, true]);
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 84) {
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
// ./src/characters/puff/moves/THROWDOWN.js
// module id = 327
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/THROWDOWN.js?