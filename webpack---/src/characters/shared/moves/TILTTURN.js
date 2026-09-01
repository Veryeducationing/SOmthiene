"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

exports.default = {
  name: "TILTTURN",
  canEdgeCancel: true,
  canBeGrabbed: true,
  disableTeeter: true,
  init: function init(p, input) {
    _main.player[p].actionState = "TILTTURN";
    _main.player[p].timer = 0;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].TILTTURN.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (_main.player[p].timer === 6) {
      _main.player[p].phys.face *= -1;
    }
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].TILTTURN.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
    }
  },
  interrupt: function interrupt(p, input) {
    var t = _main.player[p].timer < 6 ? (0, _actionStateShortcuts.checkForTilts)(p, input, -1) : (0, _actionStateShortcuts.checkForTilts)(p, input);
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
      if (_main.player[p].timer < 6) {
        _main.player[p].phys.face *= -1;
      }
      _actionStateShortcuts.actionStates[_main.characterSelections[p]][t[1]].init(p, input);
    } else if (_main.player[p].timer > 11) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      return true;
    } else if (input[p][0].du) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].APPEAL.init(p, input);
      return true;
    } else if (_main.player[p].timer === 6 && input[p][0].lsX * _main.player[p].phys.face > 0.79 && _main.player[p].phys.dashbuffer) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DASH.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/TILTTURN.js
// module id = 286
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/TILTTURN.js?