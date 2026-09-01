"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _characters = __webpack_require__(119);

exports.default = {
  name: "JUMPB",
  canPassThrough: true,
  canGrabLedge: [true, false],
  wallJumpAble: true,
  headBonk: true,
  canBeGrabbed: true,
  landType: 0,
  vCancel: true,
  init: function init(p, type, input) {
    _main.player[p].actionState = "JUMPB";
    _main.player[p].timer = 0;
    if (type) {
      _main.player[p].phys.cVel.y += _main.player[p].charAttributes.fHopInitV;
    } else {
      _main.player[p].phys.cVel.y += _main.player[p].charAttributes.sHopInitV;
    }

    _main.player[p].phys.cVel.x = _main.player[p].phys.cVel.x * _main.player[p].charAttributes.groundToAir + input[p][0].lsX * _main.player[p].charAttributes.jumpHinitV;
    if (Math.abs(_main.player[p].phys.cVel.x) > _main.player[p].charAttributes.jumpHmaxV) {
      _main.player[p].phys.cVel.x = _main.player[p].charAttributes.jumpHmaxV * Math.sign(_main.player[p].phys.cVel.x);
    }

    _main.player[p].phys.grounded = false;
    _sfx.sounds.jump2.play();
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].JUMPB.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].JUMPB.interrupt(p, input)) {
      if (_main.player[p].timer > 1) {
        (0, _actionStateShortcuts.fastfall)(p, input);
        (0, _actionStateShortcuts.airDrift)(p, input);
      }
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
    } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].JUMPB) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALL.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/JUMPB.js
// module id = 500
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/JUMPB.js?