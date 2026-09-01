"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _characters = __webpack_require__(119);

exports.default = {
  name: "CATCHWAIT",
  canEdgeCancel: false,
  canBeGrabbed: true,
  inGrab: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CATCHWAIT";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].CATCHWAIT.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].CATCHWAIT.interrupt(p, input)) {}
  },
  interrupt: function interrupt(p, input) {
    if (input[p][0].a && !input[p][1].a) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].CATCHATTACK.init(p, input);
      return true;
    } else if (input[p][0].lsY > 0.7 && input[p][1].lsY <= 0.7 || input[p][0].csY > 0.7 && input[p][1].csY <= 0.7) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].THROWUP.init(p, input);
      return true;
    } else if (input[p][0].lsY < -0.7 && input[p][1].lsY >= -0.7 || input[p][0].csY < -0.7) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].THROWDOWN.init(p, input);
      return true;
    } else if (input[p][0].lsX * _main.player[p].phys.face < -0.7 && input[p][1].lsX * _main.player[p].phys.face >= -0.7 || input[p][0].csX * _main.player[p].phys.face < -0.7 && input[p][1].csX * _main.player[p].phys.face >= -0.7) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].THROWBACK.init(p, input);
      return true;
    } else if (input[p][0].lsX * _main.player[p].phys.face > 0.7 && input[p][1].lsX * _main.player[p].phys.face <= 0.7 || input[p][0].csX * _main.player[p].phys.face > 0.7 && input[p][1].csX * _main.player[p].phys.face <= 0.7) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].THROWFORWARD.init(p, input);
      return true;
    } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].CATCHWAIT) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].CATCHWAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/CATCHWAIT.js
// module id = 289
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/CATCHWAIT.js?