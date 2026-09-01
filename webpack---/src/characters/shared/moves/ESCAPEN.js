"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

var _drawVfx = __webpack_require__(134);

exports.default = {
  name: "ESCAPEN",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "ESCAPEN";
    _main.player[p].timer = 0;
    _main.player[p].phys.shielding = false;
    (0, _drawVfx.drawVfx)({
      name: "circleDust",
      pos: _main.player[p].phys.pos,
      face: _main.player[p].phys.face
    });
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].ESCAPEN.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    (0, _actionStateShortcuts.playSounds)("ESCAPEN", p);
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].ESCAPEN.interrupt(p, input)) {
      if (_main.player[p].timer === 1) {
        _sfx.sounds.spotdodge.play();
      }
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
      (0, _actionStateShortcuts.executeIntangibility)("ESCAPEN", p);
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].ESCAPEN) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/ESCAPEN.js
// module id = 521
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/ESCAPEN.js?