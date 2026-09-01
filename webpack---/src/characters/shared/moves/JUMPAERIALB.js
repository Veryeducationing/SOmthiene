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
  name: "JUMPAERIALB",
  canPassThrough: true,
  canGrabLedge: [true, false],
  wallJumpAble: true,
  headBonk: true,
  canBeGrabbed: true,
  landType: 0,
  vCancel: true,
  init: function init(p, input) {
    _main.player[p].actionState = "JUMPAERIALB";
    _main.player[p].timer = 0;
    _main.player[p].phys.fastfalled = false;
    _main.player[p].phys.doubleJumped = true;

    _main.player[p].phys.cVel.y = _main.player[p].charAttributes.fHopInitV * _main.player[p].charAttributes.djMultiplier;

    _main.player[p].phys.cVel.x = input[p][0].lsX * _main.player[p].charAttributes.djMomentum;
    (0, _drawVfx.drawVfx)({
      name: "doubleJumpRings",
      pos: _main.player[p].phys.pos,
      face: _main.player[p].phys.face
    });
    _sfx.sounds.jump2.play();
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].JUMPAERIALB.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    (0, _actionStateShortcuts.playSounds)("JUMPAERIAL", p);
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].JUMPAERIALB.interrupt(p, input)) {
      (0, _actionStateShortcuts.fastfall)(p, input);
      (0, _actionStateShortcuts.airDrift)(p, input);
    }
  },
  interrupt: function interrupt(p, input) {
    var a = (0, _actionStateShortcuts.checkForAerials)(p, input);
    var b = (0, _actionStateShortcuts.checkForSpecials)(p, input);
    if (a[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]][a[1]].init(p, input);
      return true;
    } else if (input[p][0].l && !input[p][1].l || input[p][0].r && !input[p][1].r) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].ESCAPEAIR.init(p, input);
      return true;
    } else if (b[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]][b[1]].init(p, input);
      return true;
    } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].JUMPAERIALB) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALLAERIAL.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/JUMPAERIALB.js
// module id = 356
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/JUMPAERIALB.js?