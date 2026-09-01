"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

exports.default = {
  name: "FALLSPECIAL",
  canPassThrough: true,
  canGrabLedge: [true, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  vCancel: true,
  init: function init(p, input) {
    _main.player[p].actionState = "FALLSPECIAL";
    _main.player[p].timer = 0;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALLSPECIAL.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].FALLSPECIAL.interrupt(p, input)) {
      (0, _actionStateShortcuts.fastfall)(p, input);
      (0, _actionStateShortcuts.airDrift)(p, input);
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].FALLSPECIAL) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALLSPECIAL.init(p, input);
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].LANDINGFALLSPECIAL.init(p, input);
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/FALLSPECIAL.js
// module id = 319
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/FALLSPECIAL.js?