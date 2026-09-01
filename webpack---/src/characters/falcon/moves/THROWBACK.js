"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _CATCHCUT = __webpack_require__(326);

var _CATCHCUT2 = _interopRequireDefault(_CATCHCUT);

var _characters = __webpack_require__(119);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _article = __webpack_require__(132);

var _actionStateShortcuts = __webpack_require__(10);

var _hitDetection = __webpack_require__(133);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "THROWBACK",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "THROWBACK";
    _main.player[p].timer = 0;
    var grabbing = _main.player[p].phys.grabbing;
    if (grabbing === -1) {
      return;
    }
    _actionStateShortcuts.actionStates[_main.characterSelections[grabbing]].THROWNFALCONBACK.init(grabbing);
    var frame = _characters.framesData[_main.characterSelections[grabbing]].THROWNFALCONBACK;
    _main.player[p].phys.releaseFrame = frame + 1;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.throwback.id0;
    (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
    this.main(p, input);
  },
  main: function main(p, input) {
    var prevFrame = _main.player[p].timer;
    _main.player[p].timer += 20 / _main.player[p].phys.releaseFrame;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer >= 12 && prevFrame < 12) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.throwbackextra.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.throwbackextra.id1;
        _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.throwbackextra.id2;
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer >= 20 && prevFrame < 20) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (Math.floor(_main.player[p].timer + 0.01) >= 20 && Math.floor(prevFrame + 0.01) < 20) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.throwback.id0;
        _main.player[p].hitboxes.active = [true, false, false, false];
        _hitDetection.hitQueue.push([_main.player[p].phys.grabbing, p, 0, false, true, false]);
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 49) {
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
// ./src/characters/falcon/moves/THROWBACK.js
// module id = 661
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/THROWBACK.js?