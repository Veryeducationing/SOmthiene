"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

exports.default = {
  name: "DOWNWAIT",
  canEdgeCancel: true,
  disableTeeter: true,
  canBeGrabbed: false,
  downed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNWAIT";
    _main.player[p].timer = 0;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNWAIT.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNWAIT.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
      if (_main.player[p].timer > 1) {
        _main.player[p].hit.hitstun--;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].DOWNWAIT) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNWAIT.init(p, input);
      return true;
    } else if (_main.player[p].phys.jabReset) {
      if (_main.player[p].hit.hitstun <= 0) {
        if (input[p][0].lsX * _main.player[p].phys.face < -0.7) {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNSTANDB.init(p, input);
          return true;
        } else if (input[p][0].lsX * _main.player[p].phys.face > 0.7) {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNSTANDF.init(p, input);
          return true;
        } else if (input[p][0].a && !input[p][1].a || input[p][0].b && !input[p][1].b) {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNATTACK.init(p, input);
          return true;
        } else {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNSTANDN.init(p, input);
          return true;
        }
      } else {
        return false;
      }
    } else if (input[p][0].lsX * _main.player[p].phys.face < -0.7) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNSTANDB.init(p, input);
      return true;
    } else if (input[p][0].lsX * _main.player[p].phys.face > 0.7) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNSTANDF.init(p, input);
      return true;
    } else if (input[p][0].lsY > 0.7) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNSTANDN.init(p, input);
      return true;
    } else if (input[p][0].a && !input[p][1].a || input[p][0].b && !input[p][1].b) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNATTACK.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/DOWNWAIT.js
// module id = 523
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/DOWNWAIT.js?