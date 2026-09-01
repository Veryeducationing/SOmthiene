"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _characters = __webpack_require__(119);

var _hitDetection = __webpack_require__(133);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _CATCHCUT = __webpack_require__(326);

var _CATCHCUT2 = _interopRequireDefault(_CATCHCUT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "THROWFORWARD",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "THROWFORWARD";
    _main.player[p].timer = 0;
    var grabbing = _main.player[p].phys.grabbing;
    if (grabbing === -1) {
      return;
    }
    _actionStateShortcuts.actionStates[_main.characterSelections[grabbing]].THROWNMARTHFORWARD.init(grabbing, input);
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.throwforward.id0;
    (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
    var frame = _characters.framesData[_main.characterSelections[grabbing]].THROWNMARTHFORWARD;
    _main.player[p].phys.releaseFrame = frame + 1;
    _index2.default.THROWFORWARD.main(p, input);
  },
  main: function main(p, input) {
    var prevFrame = _main.player[p].timer;
    _main.player[p].timer += 13 / _main.player[p].phys.releaseFrame;
    if (!_index2.default.THROWFORWARD.interrupt(p, input)) {
      if (Math.floor(_main.player[p].timer + 0.01) >= 13 && Math.floor(prevFrame + 0.01) < 13) {
        _hitDetection.hitQueue.push([_main.player[p].phys.grabbing, p, 0, false, true, true]);
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 27) {
      _main.player[p].phys.grabbing = -1;
      _WAIT2.default.init(p, input);
      return true;
    } else {
      var grabbing = _main.player[p].phys.grabbing;
      if (grabbing === -1) {
        return;
      }
      if (_main.player[p].timer < 13 && _main.player[grabbing].phys.grabbedBy !== p) {
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
// ./src/characters/marth/moves/THROWFORWARD.js
// module id = 408
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/THROWFORWARD.js?