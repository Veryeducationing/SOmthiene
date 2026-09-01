"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _characters = __webpack_require__(119);

exports.default = {
  name: "GUARDOFF",
  canEdgeCancel: true,
  canBeGrabbed: true,
  missfoot: true,
  init: function init(p, input) {
    _main.player[p].actionState = "GUARDOFF";
    _main.player[p].timer = 0;
    _sfx.sounds.shieldoff.play();
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARDOFF.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    (0, _actionStateShortcuts.playSounds)("GUARDOFF", p);
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARDOFF.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, false);
      //shieldDepletion(p,input);
      //shieldSize(p,null,input);
    }
  },
  interrupt: function interrupt(p, input) {
    var s = void 0;
    var j = (0, _actionStateShortcuts.checkForJump)(p, input);
    if (j[0] && !_main.player[p].inCSS) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].KNEEBEND.init(p, j[1], input);
      return true;
    } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].GUARDOFF) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      return true;
    } else if (_main.player[p].phys.powerShielded) {
      if (!_main.player[p].inCSS) {
        var t = (0, _actionStateShortcuts.checkForTilts)(p, input);
        s = (0, _actionStateShortcuts.checkForSmashes)(p, input);
        if (s[0]) {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]][s[1]].init(p, input);
          return true;
        } else if (t[0]) {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]][t[1]].init(p, input);
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
        } else if (Math.abs(input[p][0].lsX) > 0.3) {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]].WALK.init(p, true, input);
          return true;
        } else {
          return false;
        }
      } else {
        s = (0, _actionStateShortcuts.checkForSmashes)(p, input);
        if (s[0]) {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]][s[1]].init(p, input);
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/GUARDOFF.js
// module id = 507
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/GUARDOFF.js?