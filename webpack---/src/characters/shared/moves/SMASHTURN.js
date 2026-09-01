"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

exports.default = {
  name: "SMASHTURN",
  canEdgeCancel: true,
  reverseModel: true,
  canBeGrabbed: true,
  disableTeeter: true,
  init: function init(p, input) {
    _main.player[p].actionState = "SMASHTURN";
    _main.player[p].timer = 0;
    _main.player[p].phys.face *= -1;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].SMASHTURN.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].SMASHTURN.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
    }
  },
  interrupt: function interrupt(p, input) {
    var t = (0, _actionStateShortcuts.checkForTilts)(p, input);
    var s = (0, _actionStateShortcuts.checkForSmashes)(p, input);
    var j = (0, _actionStateShortcuts.checkForJump)(p, input);
    if (j[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].KNEEBEND.init(p, j[1], input);
      return true;
    } else if (input[p][0].b && !input[p][1].b && Math.abs(input[p][0].lsX) > 0.6) {
      _main.player[p].phys.face = Math.sign(input[p][0].lsX);
      if (_main.player[p].phys.grounded) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].SIDESPECIALGROUND.init(p, input);
      } else {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].SIDESPECIALAIR.init(p, input);
      }
      return true;
    } else if (input[p][0].l || input[p][0].r) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARDON.init(p, input);
      return true;
    } else if (input[p][0].lA > 0 || input[p][0].rA > 0) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARDON.init(p, input);
      return true;
    } else if (s[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]][s[1]].init(p, input);
      return true;
    } else if (t[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]][t[1]].init(p, input);
    } else if (input[p][0].du) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].APPEAL.init(p, input);
      return true;
    } else if (_main.player[p].timer === 2 && input[p][0].lsX * _main.player[p].phys.face > 0.79) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DASH.init(p, input);
      return true;
    } else if (_main.player[p].timer > 11) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/SMASHTURN.js
// module id = 285
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/SMASHTURN.js?