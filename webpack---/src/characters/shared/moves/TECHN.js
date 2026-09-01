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
  name: "TECHN",
  canEdgeCancel: true,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "TECHN";
    _main.player[p].timer = 0;
    (0, _drawVfx.drawVfx)({
      name: "tech",
      pos: _main.player[p].phys.pos
    });
    _sfx.sounds.tech.play();
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].TECHN.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    (0, _actionStateShortcuts.playSounds)("TECH", p);
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].TECHN.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
      (0, _actionStateShortcuts.executeIntangibility)("TECHN", p);
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].TECHN) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/TECHN.js
// module id = 528
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/TECHN.js?