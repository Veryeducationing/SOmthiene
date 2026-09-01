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
  name: "TECHU",
  canPassThrough: true,
  canGrabLedge: [true, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 0,
  init: function init(p, input) {
    _main.player[p].actionState = "TECHU";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel.y = 0;
    _main.player[p].phys.cVel.x = 0;
    _main.player[p].phys.kVel.y = 0;
    _main.player[p].phys.kVel.x = 0;
    _main.player[p].phys.fastfalled = false;
    _main.player[p].hit.knockback = 0;
    _main.player[p].hit.hitstun = 0;
    _main.player[p].phys.intangibleTimer = Math.max(_main.player[p].phys.intangibleTimer, 14);
    (0, _drawVfx.drawVfx)({
      name: "tech",
      pos: _main.player[p].phys.ECBp[2]
    });
    _sfx.sounds.tech.play();
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].TECHU.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    (0, _actionStateShortcuts.playSounds)("TECH", p);
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].TECHU.interrupt(p, input)) {
      (0, _actionStateShortcuts.fastfall)(p, input);
      (0, _actionStateShortcuts.airDrift)(p, input);
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].TECHU) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALL.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/TECHU.js
// module id = 550
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/TECHU.js?