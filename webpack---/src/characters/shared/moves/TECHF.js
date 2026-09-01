"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _characters = __webpack_require__(119);

var _drawVfx = __webpack_require__(134);

exports.default = {
  name: "TECHF",
  canEdgeCancel: false,
  canBeGrabbed: true,
  setVelocities: [],
  init: function init(p, input) {
    _main.player[p].actionState = "TECHF";
    _main.player[p].timer = 0;
    (0, _drawVfx.drawVfx)({
      name: "tech",
      pos: _main.player[p].phys.pos
    });
    _sfx.sounds.tech.play();
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].TECHF.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    (0, _actionStateShortcuts.playSounds)("TECH", p);
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].TECHF.interrupt(p, input)) {
      (0, _actionStateShortcuts.executeIntangibility)("TECHF", p);
      _main.player[p].phys.cVel.x = _actionStateShortcuts.actionStates[_main.characterSelections[p]].TECHF.setVelocities[_main.player[p].timer - 1] * _main.player[p].phys.face;
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].TECHF) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/TECHF.js
// module id = 530
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/TECHF.js?