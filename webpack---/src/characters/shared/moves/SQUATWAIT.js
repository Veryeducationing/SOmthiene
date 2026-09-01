"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

exports.default = {
  name: "SQUATWAIT",
  canEdgeCancel: true,
  canBeGrabbed: true,
  crouch: true,
  disableTeeter: true,
  init: function init(p, input) {
    _main.player[p].actionState = "SQUATWAIT";
    _main.player[p].timer = 0;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].SQUATWAIT.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].SQUATWAIT.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
    }
  },
  interrupt: function interrupt(p, input) {
    var b = (0, _actionStateShortcuts.checkForSpecials)(p, input);
    var t = (0, _actionStateShortcuts.checkForTilts)(p, input);
    var s = (0, _actionStateShortcuts.checkForSmashes)(p, input);
    var j = (0, _actionStateShortcuts.checkForJump)(p, input);
    if (input[p][0].lsY > -0.61) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].SQUATRV.init(p, input);
      return true;
    } else if (j[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].KNEEBEND.init(p, j[1], input);
      return true;
    } else if (input[p][0].l || input[p][0].r) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARDON.init(p, input);
      return true;
    } else if (input[p][0].lA > 0 || input[p][0].rA > 0) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARDON.init(p, input);
      return true;
    } else if (b[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]][b[1]].init(p, input);
      return true;
    } else if (s[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]][s[1]].init(p, input);
      return true;
    } else if (t[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]][t[1]].init(p, input);
      return true;
    } else if (input[p][0].du) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].APPEAL.init(p, input);
      return true;
    } else if ((0, _actionStateShortcuts.checkForDash)(p, input)) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DASH.init(p, input);
      return true;
    } else if ((0, _actionStateShortcuts.checkForSmashTurn)(p, input)) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].SMASHTURN.init(p, input);
      return true;
    } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].SQUATWAIT) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].SQUATWAIT.init(p, input);
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/SQUATWAIT.js
// module id = 303
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/SQUATWAIT.js?