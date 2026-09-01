"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

exports.default = {
  name: "DOWNDAMAGE",
  canEdgeCancel: true,
  disableTeeter: true,
  airborneState: "DOWNDAMAGE",
  canBeGrabbed: true,
  downed: true,
  landType: 1,
  canGrabLedge: [false, false],
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNDAMAGE";
    _main.player[p].timer = 0;
    _main.player[p].phys.jabReset = true;
    _main.player[p].phys.grounded = false;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNDAMAGE.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNDAMAGE.interrupt(p, input)) {
      if (!_main.player[p].phys.grounded) {
        _main.player[p].phys.cVel.y -= _main.player[p].charAttributes.gravity;
      } else {
        (0, _actionStateShortcuts.reduceByTraction)(p, true);
      }
      if (_main.player[p].timer > 1) {
        _main.player[p].hit.hitstun--;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 13) {
      if (_main.player[p].phys.grounded) {
        if (_main.player[p].hit.hitstun <= 0) {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNSTANDN.init(p, input);
        } else {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNWAIT.init(p, input);
        }
      } else {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALL.init(p, input);
      }
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {}
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/DOWNDAMAGE.js
// module id = 524
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/DOWNDAMAGE.js?