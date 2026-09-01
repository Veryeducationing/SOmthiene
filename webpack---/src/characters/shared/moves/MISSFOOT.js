"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

exports.default = {
  name: "MISSFOOT",
  canPassThrough: true,
  canGrabLedge: [true, false],
  wallJumpAble: false,
  headBonk: true,
  canBeGrabbed: true,
  landType: 0,
  init: function init(p, input) {
    _main.player[p].actionState = "MISSFOOT";
    _main.player[p].timer = 0;
    _main.player[p].hit.hitstun = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].MISSFOOT.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].MISSFOOT.interrupt(p, input)) {
      (0, _actionStateShortcuts.fastfall)(p, input);
      (0, _actionStateShortcuts.airDrift)(p, input);
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 26) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DAMAGEFALL.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/MISSFOOT.js
// module id = 545
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/MISSFOOT.js?