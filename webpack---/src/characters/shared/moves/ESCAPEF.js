"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

exports.default = {
  name: "ESCAPEF",
  setVelocities: [],
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "ESCAPEF";
    _main.player[p].timer = 0;
    _main.player[p].phys.shielding = false;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].ESCAPEF.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    (0, _actionStateShortcuts.playSounds)("ESCAPEF", p);
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].ESCAPEF.interrupt(p, input)) {
      _main.player[p].phys.cVel.x = _actionStateShortcuts.actionStates[_main.characterSelections[p]].ESCAPEF.setVelocities[_main.player[p].timer - 1] * _main.player[p].phys.face;
      (0, _actionStateShortcuts.executeIntangibility)("ESCAPEF", p);
      if (_main.player[p].timer === 4) {
        _sfx.sounds.roll.play();
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].ESCAPEF) {
      _main.player[p].phys.cVel.x = 0;
      _main.player[p].phys.face *= -1;
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/ESCAPEF.js
// module id = 520
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/ESCAPEF.js?