"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

exports.default = {
  name: "SHIELDBREAKSTAND",
  canEdgeCancel: true,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "SHIELDBREAKSTAND";
    _main.player[p].timer = 0;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].SHIELDBREAKSTAND.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].SHIELDBREAKSTAND.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
      _main.player[p].phys.intangibleTimer = 1;
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].SHIELDBREAKSTAND) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].FURAFURA.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/SHIELDBREAKSTAND.js
// module id = 533
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/SHIELDBREAKSTAND.js?