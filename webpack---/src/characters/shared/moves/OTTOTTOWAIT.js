"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _characters = __webpack_require__(119);

var _sfx = __webpack_require__(120);

var _main = __webpack_require__(11);

exports.default = {
  name: "OTTOTTOWAIT",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "OTTOTTOWAIT";
    _main.player[p].timer = 1;
    if (_main.characterSelections[p] !== 1 && _main.characterSelections[p] !== 4) {
      _sfx.sounds[_characters.actionSounds[_main.characterSelections[p]].OTTOTTOWAIT[0][1]].play();
    }
    _main.player[p].phys.cVel.x = 0;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].OTTOTTOWAIT.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].OTTOTTOWAIT) {
      _main.player[p].timer = 0;
    }
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].OTTOTTOWAIT.interrupt(p, input)) {}
  },
  interrupt: function interrupt(p, input) {
    var b = (0, _actionStateShortcuts.checkForSpecials)(p, input);
    var t = (0, _actionStateShortcuts.checkForTilts)(p, input);
    var s = (0, _actionStateShortcuts.checkForSmashes)(p, input);
    var j = (0, _actionStateShortcuts.checkForJump)(p, input);
    if (j[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].KNEEBEND.init(p, j[1], input);
      return true;
    } else if (input[p][0].l || input[p][0].r) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARDON.init(p, input);
      return true;
    } else if (input[p][0].lA > 0 || input[p][0].rA > 0) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARDON.init(p, input);
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
    } else if ((0, _actionStateShortcuts.checkForSquat)(p, input)) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].SQUAT.init(p, input);
      return true;
    } else if ((0, _actionStateShortcuts.checkForDash)(p, input)) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DASH.init(p, input);
      return true;
    } else if ((0, _actionStateShortcuts.checkForSmashTurn)(p, input)) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].SMASHTURN.init(p, input);
      return true;
    } else if ((0, _actionStateShortcuts.checkForTiltTurn)(p, input)) {
      _main.player[p].phys.dashbuffer = (0, _actionStateShortcuts.tiltTurnDashBuffer)(p, input);
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].TILTTURN.init(p, input);
      return true;
    } else if (Math.abs(input[p][0].lsX) > 0.6) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WALK.init(p, true, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/OTTOTTOWAIT.js
// module id = 544
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/OTTOTTOWAIT.js?