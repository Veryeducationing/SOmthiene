"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

var _Vec2D = __webpack_require__(22);

exports.default = {
  name: "CAPTUREWAIT",
  canEdgeCancel: false,
  canBeGrabbed: false,
  inGrab: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CAPTUREWAIT";
    _main.player[p].timer = 0;
    var grabbedBy = _main.player[p].phys.grabbedBy;
    if (grabbedBy === -1) {
      return;
    }
    _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[grabbedBy].phys.pos.x + -9.04298 * _main.player[p].phys.face, _main.player[grabbedBy].phys.pos.y);
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].CAPTUREWAIT.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].CAPTUREWAIT.interrupt(p, input)) {
      _main.player[p].phys.stuckTimer--;
      if ((0, _actionStateShortcuts.mashOut)(p, input)) {
        _main.player[p].phys.stuckTimer -= 3;
        _main.player[p].phys.pos.x += 0.5 * Math.sign(Math.random() - 0.5);
      } else {
        var grabbedBy = _main.player[p].phys.grabbedBy;
        if (grabbedBy === -1) {
          return;
        }
        _main.player[p].phys.pos.x = _main.player[grabbedBy].phys.pos.x + -9.04298 * _main.player[p].phys.face;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].phys.stuckTimer < 0) {
      var grabbedBy = _main.player[p].phys.grabbedBy;
      if (grabbedBy === -1) {
        return;
      }
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].CATCHCUT.init(grabbedBy, input);
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].CAPTURECUT.init(p, input);
      return true;
    } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].CAPTUREWAIT) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].CAPTUREWAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/CAPTUREWAIT.js
// module id = 536
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/CAPTUREWAIT.js?