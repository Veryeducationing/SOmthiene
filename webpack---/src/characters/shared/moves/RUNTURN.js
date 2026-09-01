"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

exports.default = {
  name: "RUNTURN",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "RUNTURN";
    _main.player[p].timer = 0;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].RUNTURN.main(p, input);
  },
  main: function main(p, input) {
    var tempAcc = void 0;
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].RUNTURN.interrupt(p, input)) {
      if (_main.player[p].timer === _main.player[p].charAttributes.runTurnBreakPoint + 1) {
        _main.player[p].phys.face *= -1;
      }

      if (_main.player[p].timer <= _main.player[p].charAttributes.runTurnBreakPoint && input[p][0].lsX * _main.player[p].phys.face < -0.3) {
        tempAcc = (_main.player[p].charAttributes.dAccA - (1 - Math.abs(input[p][0].lsX)) * _main.player[p].charAttributes.dAccA) * _main.player[p].phys.face;
        _main.player[p].phys.cVel.x -= tempAcc;
      } else if (_main.player[p].timer > _main.player[p].charAttributes.runTurnBreakPoint && input[p][0].lsX * _main.player[p].phys.face > 0.3) {
        tempAcc = (_main.player[p].charAttributes.dAccA - (1 - Math.abs(input[p][0].lsX)) * _main.player[p].charAttributes.dAccA) * _main.player[p].phys.face;
        _main.player[p].phys.cVel.x += tempAcc;
      } else {
        (0, _actionStateShortcuts.reduceByTraction)(p, true);
      }

      /* if make more chars add this, but marth cant have it for a boost run
      if (player[p].timer > 18 && player[p].phys.cVel.x * player[p].phys.face > player[p].charAttributes.dMaxV){
        reduceByTraction(p,true);
      }*/

      if (_main.player[p].timer === _main.player[p].charAttributes.runTurnBreakPoint) {
        if (_main.player[p].phys.cVel.x * _main.player[p].phys.face > 0) {
          _main.player[p].timer--;
        }
      }
    }
  },
  interrupt: function interrupt(p, input) {
    var j = (0, _actionStateShortcuts.checkForJump)(p, input);
    if (j[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].KNEEBEND.init(p, j[1], input);
      return true;
    } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].RUNTURN) {
      if (input[p][0].lsX * _main.player[p].phys.face > 0.6) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].RUN.init(p, input);
      } else {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      }
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/RUNTURN.js
// module id = 498
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/RUNTURN.js?