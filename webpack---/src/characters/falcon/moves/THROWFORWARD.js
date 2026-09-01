"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _CATCHCUT = __webpack_require__(326);

var _CATCHCUT2 = _interopRequireDefault(_CATCHCUT);

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

var _hitDetection = __webpack_require__(133);

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
    _actionStateShortcuts.actionStates[_main.characterSelections[grabbing]].THROWNFALCONFORWARD.init(grabbing, input);
    var frame = _characters.framesData[_main.characterSelections[grabbing]].THROWNFALCONFORWARD;
    _main.player[p].phys.releaseFrame = frame + 1;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.throwforward.id0;
    (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
    this.main(p, input);
  },
  main: function main(p, input) {
    var prevFrame = _main.player[p].timer;
    _main.player[p].timer += 18 / _main.player[p].phys.releaseFrame;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer >= 11 && prevFrame < 11) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.throwforwardextra.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.throwforwardextra.id1;
        _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.throwforwardextra.id2;
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer >= 18 && prevFrame < 18) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (Math.floor(_main.player[p].timer + 0.01) >= 18 && Math.floor(prevFrame + 0.01) < 18) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.throwforward.id0;
        _main.player[p].hitboxes.active = [true, false, false, false];
        _hitDetection.hitQueue.push([_main.player[p].phys.grabbing, p, 0, false, true, false]);
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 39) {
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
// ./src/characters/falcon/moves/THROWFORWARD.js
// module id = 664
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/THROWFORWARD.js?