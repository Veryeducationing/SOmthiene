"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

exports.default = {
  name: "SLEEP",
  canBeGrabbed: false,
  init: function init(p, input) {
    _main.player[p].actionState = "SLEEP";
    _main.player[p].timer = 0;
    _main.player[p].hit.hitstun = 0;
    _main.player[p].phys.kVel.y = 0;
    _main.player[p].phys.kVel.x = 0;
    _main.player[p].phys.cVel.x = 0;
    _main.player[p].phys.cVel.y = 0;
    _main.player[p].phys.pos.x = 300;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].SLEEP.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].phys.outOfCameraTimer = 0;
  },
  interrupt: function interrupt(p, input) {
    return false;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/SLEEP.js
// module id = 551
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/SLEEP.js?