"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

exports.default = {
  name: "ENTRANCE",
  canBeGrabbed: false,
  init: function init(p, input) {
    _main.player[p].actionState = "ENTRANCE";
    _main.player[p].timer = 0;
    _main.player[p].phys.grounded = false;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].ENTRANCE.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].ENTRANCE.interrupt(p, input);
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 60) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALL.init(p, input);
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/ENTRANCE.js
// module id = 552
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/ENTRANCE.js?