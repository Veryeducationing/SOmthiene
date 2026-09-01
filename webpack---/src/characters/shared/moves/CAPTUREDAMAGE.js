"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _characters = __webpack_require__(119);

exports.default = {
  name: "CAPTUREDAMAGE",
  canEdgeCancel: false,
  canBeGrabbed: false,
  setPositions: [9.478, 9.478, 9.478, 9.478, 9.478, 9.478, 9.478, 9.478, 9.478, 9.306, 8.920, 8.516, 8.290, 8.293, 8.410, 8.593, 8.792, 8.959, 9.043, 9.068],
  inGrab: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CAPTUREDAMAGE";
    _main.player[p].timer = 0;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].CAPTUREDAMAGE.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].CAPTUREDAMAGE.interrupt(p, input)) {
      var grabbedBy = _main.player[p].phys.grabbedBy;
      if (grabbedBy === -1) {
        return;
      }
      _main.player[p].phys.pos.x = _main.player[grabbedBy].phys.pos.x + -_actionStateShortcuts.actionStates[_main.characterSelections[p]].CAPTUREDAMAGE.setPositions[_main.player[p].timer - 1] * _main.player[p].phys.face;
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].CAPTUREDAMAGE) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].CAPTUREWAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/CAPTUREDAMAGE.js
// module id = 538
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/CAPTUREDAMAGE.js?