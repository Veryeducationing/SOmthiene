"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

exports.default = {
  name: "KNEEBEND",
  canEdgeCancel: true,
  disableTeeter: true,
  canBeGrabbed: true,
  init: function init(p, type, input) {
    _main.player[p].actionState = "KNEEBEND";
    _main.player[p].timer = 0;
    _main.player[p].phys.jumpType = 1;
    _main.player[p].phys.jumpSquatType = type;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].KNEEBEND.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].KNEEBEND.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
      // if jumpsquat initiated by stick
      if (_main.player[p].phys.jumpSquatType) {
        if (input[p][0].lsY < 0.67) {
          _main.player[p].phys.jumpType = 0;
        }
      }
      // else if jumpsquat initiated by button
      else {
          if (!input[p][0].x && !input[p][0].y) {
            _main.player[p].phys.jumpType = 0;
          }
        }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer === _main.player[p].charAttributes.jumpSquat) {
      // so they can be detected as above current surface instantly
      _main.player[p].phys.pos.y += 0.001;
    }
    if (_main.player[p].timer > _main.player[p].charAttributes.jumpSquat) {
      if (input[p][2].lsX * _main.player[p].phys.face >= -0.3) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].JUMPF.init(p, _main.player[p].phys.jumpType, input);
      } else {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].JUMPB.init(p, _main.player[p].phys.jumpType, input);
      }
      return true;
    } else if (input[p][0].a && !input[p][1].a && (input[p][0].lA > 0 || input[p][0].rA > 0)) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].GRAB.init(p, input);
      return true;
    } else if (input[p][0].a && !input[p][1].a && input[p][0].lsY >= 0.8 && input[p][3].lsY < 0.3 || input[p][0].csY >= 0.8 && input[p][3].csY < 0.3) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].UPSMASH.init(p, input);
      return true;
    } else if (input[p][0].b && !input[p][1].b && input[p][0].lsY > 0.58) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].UPSPECIAL.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/KNEEBEND.js
// module id = 283
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/KNEEBEND.js?