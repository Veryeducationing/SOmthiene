"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

exports.default = {
  name: "FALL",
  canPassThrough: true,
  canGrabLedge: [true, false],
  wallJumpAble: true,
  headBonk: true,
  canBeGrabbed: true,
  landType: 0,
  vCancel: true,
  init: function init(p, input) {
    var disableInputs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _main.player[p].actionState = "FALL";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALL.main(p, input, disableInputs);
  },
  main: function main(p, input) {
    var disableInputs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _main.player[p].timer++;
    if (disableInputs) {
      _main.player[p].phys.cVel.y -= _main.player[p].charAttributes.gravity;
      (0, _actionStateShortcuts.airDrift)(p, input);
    } else {
      if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].FALL.interrupt(p, input)) {
        (0, _actionStateShortcuts.fastfall)(p, input);
        (0, _actionStateShortcuts.airDrift)(p, input);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    var a = (0, _actionStateShortcuts.checkForAerials)(p, input);
    var b = (0, _actionStateShortcuts.checkForSpecials)(p, input);
    if (a[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]][a[1]].init(p, input);
      return true;
    } else if (input[p][0].l && !input[p][1].l || input[p][0].r && !input[p][1].r) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].ESCAPEAIR.init(p, input);
      return true;
    } else if ((0, _actionStateShortcuts.checkForDoubleJump)(p, input) && (!_main.player[p].phys.doubleJumped || _main.player[p].phys.jumpsUsed < 5 && _main.player[p].charAttributes.multiJump)) {
      if (input[p][0].lsX * _main.player[p].phys.face < -0.3) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].JUMPAERIALB.init(p, input);
      } else {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].JUMPAERIALF.init(p, input);
      }
      return true;
    } else if (b[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]][b[1]].init(p, input);
      return true;
    } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].FALL) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALL.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/FALL.js
// module id = 271
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/FALL.js?