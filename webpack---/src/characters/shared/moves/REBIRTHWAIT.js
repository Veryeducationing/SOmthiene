"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _characters = __webpack_require__(119);

exports.default = {
  name: "REBIRTHWAIT",
  canBeGrabbed: false,
  init: function init(p, input) {
    _main.player[p].actionState = "REBIRTHWAIT";
    _main.player[p].timer = 1;
    _main.player[p].phys.cVel.y = 0;
  },
  main: function main(p, input) {
    _main.player[p].timer += 1;
    _main.player[p].spawnWaitTime++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].REBIRTHWAIT.interrupt(p, input)) {
      _main.player[p].phys.outOfCameraTimer = 0;
    }
  },
  interrupt: function interrupt(p, input) {
    var a = (0, _actionStateShortcuts.checkForAerials)(p, input);
    var b = (0, _actionStateShortcuts.checkForSpecials)(p, input);
    var j = (0, _actionStateShortcuts.checkForDoubleJump)(p, input);
    if (a[0]) {
      _main.player[p].phys.grounded = false;
      _main.player[p].phys.invincibleTimer = 120;
      _actionStateShortcuts.actionStates[_main.characterSelections[p]][a[1]].init(p, input);
      return true;
    } else if (input[p][0].l && !input[p][1].l || input[p][0].r && !input[p][1].r) {
      _main.player[p].phys.grounded = false;
      _main.player[p].phys.invincibleTimer = 120;
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].ESCAPEAIR.init(p, input);
      return true;
    } else if (j) {
      _main.player[p].phys.grounded = false;
      _main.player[p].phys.invincibleTimer = 120;
      if (input[p][0].lsX * _main.player[p].phys.face < -0.3) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].JUMPAERIALB.init(p, input);
      } else {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].JUMPAERIALF.init(p, input);
      }
      return true;
    } else if (b[0]) {
      _main.player[p].phys.grounded = false;
      _main.player[p].phys.invincibleTimer = 120;
      _actionStateShortcuts.actionStates[_main.characterSelections[p]][b[1]].init(p, input);
      return true;
    }
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].WAIT) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].REBIRTHWAIT.init(p, input);
      return true;
    } else if (_main.player[p].spawnWaitTime > 300) {
      _main.player[p].phys.grounded = false;
      _main.player[p].phys.invincibleTimer = 120;
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALL.init(p, input);
      return true;
    } else if (Math.abs(input[p][0].lsX) > 0.3 || Math.abs(input[p][0].lsY) > 0.3) {
      _main.player[p].phys.grounded = false;
      _main.player[p].phys.invincibleTimer = 120;
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALL.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/REBIRTHWAIT.js
// module id = 515
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/REBIRTHWAIT.js?