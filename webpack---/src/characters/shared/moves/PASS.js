"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

exports.default = {
  name: "PASS",
  canPassThrough: true,
  canGrabLedge: [true, false],
  wallJumpAble: true,
  headBonk: true,
  canBeGrabbed: true,
  landType: 0,
  init: function init(p, input) {
    _main.player[p].actionState = "PASS";
    _main.player[p].timer = 0;
    _main.player[p].phys.grounded = false;
    _main.player[p].phys.passFastfall = false;
    _main.player[p].phys.cVel.y = -0.5;
    _main.player[p].phys.passing = true;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].PASS.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (_main.player[p].timer > 1) {
      if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].PASS.interrupt(p, input)) {
        if (_main.player[p].phys.passFastfall) {
          (0, _actionStateShortcuts.fastfall)(p, input);
        } else {
          _main.player[p].phys.cVel.y -= _main.player[p].charAttributes.gravity;
          if (_main.player[p].phys.cVel.y < -_main.player[p].charAttributes.terminalV) {
            _main.player[p].phys.cVel.y = -_main.player[p].charAttributes.terminalV;
          }
          if (input[p][0].lsY > -0.3) {
            _main.player[p].phys.passFastfall = true;
          }
        }
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
    } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].PASS) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALL.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/PASS.js
// module id = 504
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/PASS.js?