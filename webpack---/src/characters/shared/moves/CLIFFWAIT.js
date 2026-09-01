"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _characters = __webpack_require__(119);

exports.default = {
  name: "CLIFFWAIT",
  canGrabLedge: false,
  canBeGrabbed: false,
  wallJumpAble: false,
  posOffset: [],
  landType: 0,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFWAIT";
    _main.player[p].timer = 0;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].CLIFFWAIT.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].CLIFFWAIT.interrupt(p, input)) {
      _main.player[p].phys.ledgeHangTimer++;
    }
  },
  interrupt: function interrupt(p, input) {
    if (input[p][0].lsX * _main.player[p].phys.face < -0.2 && input[p][1].lsX * _main.player[p].phys.face >= -0.2 || input[p][0].lsY < -0.2 && input[p][1].lsY >= -0.2 || input[p][0].csX * _main.player[p].phys.face < -0.2 && input[p][1].csX * _main.player[p].phys.face >= -0.2 || input[p][0].csY < -0.2 && input[p][1].csY >= -0.2) {
      _main.player[p].phys.onLedge = -1;
      _main.player[p].phys.ledgeRegrabCount = true;
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALL.init(p, input, true);
      return true;
    } else if (input[p][0].x && !input[p][1].x || input[p][0].y && !input[p][1].y || input[p][0].lsY > 0.65 && input[p][1].lsY <= 0.65) {
      if (_main.player[p].percent < 100) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].CLIFFJUMPQUICK.init(p, input);
      } else {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].CLIFFJUMPSLOW.init(p, input);
      }
      return true;
    } else if (input[p][0].lsX * _main.player[p].phys.face > 0.2 && input[p][1].lsX * _main.player[p].phys.face <= 0.2 || input[p][0].lsY > 0.2 && input[p][1].lsY <= 0.2) {
      if (_main.player[p].percent < 100) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].CLIFFGETUPQUICK.init(p, input);
      } else {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].CLIFFGETUPSLOW.init(p, input);
      }
      return true;
    } else if (input[p][0].a && !input[p][1].a || input[p][0].b && !input[p][1].b || input[p][0].csY > 0.65 && input[p][1].csY <= 0.65) {
      if (_main.player[p].percent < 100) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].CLIFFATTACKQUICK.init(p, input);
      } else {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].CLIFFATTACKSLOW.init(p, input);
      }
      return true;
    } else if (input[p][0].lA > 0.3 && input[p][1].lA <= 0.3 || input[p][0].rA > 0.3 && input[p][1].rA <= 0.3 || input[p][0].csX * _main.player[p].phys.face > 0.8 && input[p][1].csX * _main.player[p].phys.face <= 0.8) {
      if (_main.player[p].percent < 100) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].CLIFFESCAPEQUICK.init(p, input);
      } else {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].CLIFFESCAPESLOW.init(p, input);
      }
      return true;
    } else if (_main.player[p].phys.ledgeHangTimer > 600) {
      _main.player[p].phys.onLedge = -1;
      _main.player[p].phys.ledgeRegrabCount = true;
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DAMAGEFALL.init(p, input);
      return true;
    } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].CLIFFWAIT) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].CLIFFWAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/CLIFFWAIT.js
// module id = 509
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/CLIFFWAIT.js?