"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

exports.default = {
  name: "CATCHCUT",
  canEdgeCancel: false,
  canGrabLedge: [true, false],
  canBeGrabbed: true,
  inGrab: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CATCHCUT";
    _main.player[p].timer = 0;
    _main.player[p].phys.grabbing = -1;
    _main.player[p].phys.cVel.x = -1 * _main.player[p].phys.face;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].CATCHCUT.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].CATCHCUT.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].CATCHCUT) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/CATCHCUT.js
// module id = 326
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/CATCHCUT.js?