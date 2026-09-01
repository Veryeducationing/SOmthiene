"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _characters = __webpack_require__(119);

exports.default = {
  name: "SHIELDBREAKFALL",
  canPassThrough: false,
  canBeGrabbed: true,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "SHIELDBREAKFALL";
    _main.player[p].timer = 0;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].SHIELDBREAKFALL.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].SHIELDBREAKFALL.interrupt(p, input)) {
      _main.player[p].phys.intangibleTimer = 1;
      _main.player[p].phys.cVel.y -= _main.player[p].charAttributes.gravity;
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].SHIELDBREAKFALL) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].SHIELDBREAKFALL.init(p, input);
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, normal, input) {
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].SHIELDBREAKDOWNBOUND.init(p, normal, input);
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/SHIELDBREAKFALL.js
// module id = 531
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/SHIELDBREAKFALL.js?