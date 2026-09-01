"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

exports.default = {
  name: "WAIT",
  canEdgeCancel: true,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "WAIT";
    _main.player[p].timer = 1;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer += 1;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, false);
      if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].WAIT) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    var b = void 0;
    var t = void 0;
    var s = (0, _actionStateShortcuts.checkForSmashes)(p, input);
    var j = (0, _actionStateShortcuts.checkForJump)(p, input);

    if (_main.player[p].inCSS) {
      b = [false, false];
      t = [false, false];
    } else {
      b = (0, _actionStateShortcuts.checkForSpecials)(p, input);
      t = (0, _actionStateShortcuts.checkForTilts)(p, input);
    }

    if (j[0] && !_main.player[p].inCSS) {
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
    } else if ((0, _actionStateShortcuts.checkForSquat)(p, input) && !_main.player[p].inCSS) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].SQUAT.init(p, input);
      return true;
    } else if ((0, _actionStateShortcuts.checkForDash)(p, input) && !_main.player[p].inCSS) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DASH.init(p, input);
      return true;
    } else if ((0, _actionStateShortcuts.checkForSmashTurn)(p, input) && !_main.player[p].inCSS) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].SMASHTURN.init(p, input);
      return true;
    } else if ((0, _actionStateShortcuts.checkForTiltTurn)(p, input) && !_main.player[p].inCSS) {
      _main.player[p].phys.dashbuffer = (0, _actionStateShortcuts.tiltTurnDashBuffer)(p, input);
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].TILTTURN.init(p, input);
      return true;
    } else if (Math.abs(input[p][0].lsX) > 0.3 && !_main.player[p].inCSS) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WALK.init(p, true, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/WAIT.js
// module id = 9
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/WAIT.js?