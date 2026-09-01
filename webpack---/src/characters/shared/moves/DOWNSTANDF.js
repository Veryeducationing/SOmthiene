"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

exports.default = {
  name: "DOWNSTANDF",
  canEdgeCancel: false,
  canBeGrabbed: true,
  setVelocities: [],
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSTANDF";
    _main.player[p].timer = 0;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNSTANDF.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNSTANDF.interrupt(p, input)) {
      _main.player[p].phys.cVel.x = _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNSTANDF.setVelocities[_main.player[p].timer - 1] * _main.player[p].phys.face;
      (0, _actionStateShortcuts.executeIntangibility)("DOWNSTANDF", p);
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].DOWNSTANDF) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/DOWNSTANDF.js
// module id = 527
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/DOWNSTANDF.js?