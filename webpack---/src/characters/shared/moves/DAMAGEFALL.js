"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

exports.default = {
  name: "DAMAGEFALL",
  canPassThrough: false,
  canGrabLedge: [true, false],
  wallJumpAble: false,
  headBonk: true,
  canBeGrabbed: true,
  landType: 2,
  vCancel: true,
  init: function init(p, input) {
    _main.player[p].actionState = "DAMAGEFALL";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].DAMAGEFALL.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].DAMAGEFALL.interrupt(p, input)) {
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
    } else if ((0, _actionStateShortcuts.checkForDoubleJump)(p, input) && (!_main.player[p].phys.doubleJumped || _main.player[p].phys.jumpsUsed < 5 && _main.player[p].charAttributes.multiJump)) {
      if (input[p][0].lsX * _main.player[p].phys.face < -0.3) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].JUMPAERIALB.init(p, input);
      } else {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].JUMPAERIALF.init(p, input);
      }
      return true;
    } else if (b[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]][b[1]].init(p, input);
      return true;
    } else if (input[p][0].lsX > 0.7 && input[p][1].lsX < 0.7 || input[p][0].lsX < -0.7 && input[p][1].lsX > -0.7 || input[p][0].lsY > 0.7 && input[p][1].lsY < 0.7 || input[p][0].lsY < -0.7 && input[p][1].lsY > -0.7) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALL.init(p, input);
      return true;
    } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].DAMAGEFALL) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DAMAGEFALL.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/DAMAGEFALL.js
// module id = 517
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/DAMAGEFALL.js?