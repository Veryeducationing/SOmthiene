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
  setVelocities: [-0.09, -0.16, -0.03, 0.28, 0.78, 1.13, 1.17, 0.89, 0.65, 0.65, 0.65, 0.65, 0.64, 0.64, 0.63, 0.62, 0.61, 0.59, 0.58, 0.56, 0.54, 0.52, 0.49, 0.47, 0.44, 0.41, 0, 0, 0, 0, 0, 0, 0],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWFORWARD";
    _main.player[p].timer = 0;
    _actionStateShortcuts.actionStates[_main.characterSelections[_main.player[p].phys.grabbing]].THROWNFALCOFORWARD.init(_main.player[p].phys.grabbing, input);
    var frame = _characters.framesData[_main.characterSelections[_main.player[p].phys.grabbing]].THROWNFALCOFORWARD;
    _main.player[p].phys.releaseFrame = frame + 1;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.throwforward.id0;
    (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
    this.main(p, input);
  },
  main: function main(p, input) {
    var prevFrame = _main.player[p].timer;
    _main.player[p].timer += 11 / _main.player[p].phys.releaseFrame;
    if (!this.interrupt(p, input)) {
      _main.player[p].phys.cVel.x = this.setVelocities[Math.max(0, Math.floor(_main.player[p].timer + 0.01) - 1)] * _main.player[p].phys.face;
      if (Math.floor(_main.player[p].timer + 0.01) >= 11 && Math.floor(prevFrame + 0.01) < 11) {
        _hitDetection.hitQueue.push([_main.player[p].phys.grabbing, p, 0, false, true, false]);
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      /*if (player[p].timer == 11){
        player[p].hitboxes.id[0] = player[p].charHitboxes.throwforwardextra.id0;
        player[p].hitboxes.active = [true,false,false,false];
        player[p].hitboxes.frame = 0;
      }
      if (player[p].timer == 12){
        turnOffHitboxes(p);
      }*/
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 33) {
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
// ./src/characters/falco/moves/THROWFORWARD.js
// module id = 593
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/THROWFORWARD.js?