"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _characters = __webpack_require__(119);

exports.default = {
  name: "RUNBRAKE",
  canEdgeCancel: true,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "RUNBRAKE";
    _main.player[p].timer = 0;
    _sfx.sounds.runbrake.play();
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].RUNBRAKE.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].RUNBRAKE.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
    }
  },
  interrupt: function interrupt(p, input) {
    var j = (0, _actionStateShortcuts.checkForJump)(p, input);
    if (j[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].KNEEBEND.init(p, j[1], input);
      return true;
    } else if (_main.player[p].timer > 1 && (0, _actionStateShortcuts.checkForSquat)(p, input)) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].SQUAT.init(p, input);
      return true;
    } else if (input[p][0].lsX * _main.player[p].phys.face < -0.3) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].RUNTURN.init(p, input);
      return true;
    } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].RUNBRAKE) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/RUNBRAKE.js
// module id = 497
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/RUNBRAKE.js?