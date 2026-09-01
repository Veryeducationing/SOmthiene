"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

exports.default = {
  name: "CAPTURECUT",
  canEdgeCancel: false,
  canGrabLedge: [true, false],
  wallJumpAble: false,
  canBeGrabbed: true,
  inGrab: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CAPTURECUT";
    _main.player[p].timer = 0;
    _main.player[p].phys.grabbedBy = -1;
    _main.player[p].phys.cVel.x = -1 * _main.player[p].phys.face;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].CAPTURECUT.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].CAPTURECUT.interrupt(p, input)) {
      if (_main.player[p].timer === 2) {
        _main.player[p].phys.grabTech = false;
      }
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].CAPTURECUT) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/CAPTURECUT.js
// module id = 537
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/CAPTURECUT.js?