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
  name: "SHIELDBREAKDOWNBOUND",
  canEdgeCancel: true,
  canBeGrabbed: true,
  init: function init(p, normal, input) {
    _main.player[p].actionState = "SHIELDBREAKDOWNBOUND";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel.y = 0;
    _main.player[p].phys.kVel.y = 0;
    (0, _drawVfx.drawVfx)({
      name: "groundBounce",
      pos: _main.player[p].phys.pos,
      face: _main.player[p].phys.face,
      f: normal
    });
    _sfx.sounds.bounce.play();
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].SHIELDBREAKDOWNBOUND.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].SHIELDBREAKDOWNBOUND.interrupt(p, input)) {
      _main.player[p].phys.intangibleTimer = 1;
      if (_main.player[p].timer === 1) {
        (0, _actionStateShortcuts.reduceByTraction)(p, true);
      } else {
        _main.player[p].phys.cVel.x = 0;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].SHIELDBREAKDOWNBOUND) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].SHIELDBREAKSTAND.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/SHIELDBREAKDOWNBOUND.js
// module id = 532
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/SHIELDBREAKDOWNBOUND.js?