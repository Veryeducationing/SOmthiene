"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

exports.default = {
  name: "ESCAPEAIR",
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  vCancel: true,
  init: function init(p, input) {
    _main.player[p].actionState = "ESCAPEAIR";
    _main.player[p].timer = 0;
    if (Math.abs(input[p][0].lsX) > 0 || Math.abs(input[p][0].lsY) > 0) {
      var ang = (0, _actionStateShortcuts.getAngle)(input[p][0].lsX, input[p][0].lsY);
      _main.player[p].phys.cVel.x = 3.1 * Math.cos(ang);
      _main.player[p].phys.cVel.y = 3.1 * Math.sin(ang);
    } else {
      _main.player[p].phys.cVel.x = 0;
      _main.player[p].phys.cVel.y = 0;
    }
    _main.player[p].phys.fastfalled = false;
    _main.player[p].phys.landingMultiplier = 3;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].ESCAPEAIR.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].ESCAPEAIR.interrupt(p, input)) {
      if (_main.player[p].timer < 30) {
        _main.player[p].phys.cVel.x *= 0.9;
        _main.player[p].phys.cVel.y *= 0.9;
      } else {
        (0, _actionStateShortcuts.airDrift)(p, input);
        (0, _actionStateShortcuts.fastfall)(p, input);
      }
      (0, _actionStateShortcuts.executeIntangibility)("ESCAPEAIR", p);
      (0, _actionStateShortcuts.playSounds)("ESCAPEAIR", p);
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 49) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALLSPECIAL.init(p, input);
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    _main.player[p].phys.intangibleTimer = 0;
    _main.player[p].phys.hurtBoxState = 0;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].LANDINGFALLSPECIAL.init(p, input);
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/ESCAPEAIR.js
// module id = 265
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/ESCAPEAIR.js?