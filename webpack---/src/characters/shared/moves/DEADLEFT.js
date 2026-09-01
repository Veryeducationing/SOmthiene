"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _drawVfx = __webpack_require__(134);

exports.default = {
  name: "DEADLEFT",
  canBeGrabbed: false,
  ignoreCollision: true,
  dead: true,
  init: function init(p, input) {
    _main.player[p].actionState = "DEADLEFT";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel.x = 0;
    _main.player[p].phys.cVel.y = 0;
    _main.player[p].phys.kVel.x = 0;
    _main.player[p].phys.kVel.y = 0;
    _main.player[p].percent = 0;
    (0, _drawVfx.drawVfx)({
      name: "blastzoneExplosion",
      pos: _main.player[p].phys.pos,
      face: 90
    });
    if (!(0, _actionStateShortcuts.isFinalDeath)()) {
      (0, _main.screenShake)(500);
      (0, _main.percentShake)(500, p);
    }
    _sfx.sounds.kill.play();
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].DEADLEFT.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    (0, _actionStateShortcuts.playSounds)("DEAD", p);
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].DEADLEFT.interrupt(p, input)) {
      _main.player[p].phys.outOfCameraTimer = 0;
      _main.player[p].phys.intangibleTimer = 2;
      _main.player[p].phys.hurtBoxState = 1;
      if (_main.player[p].timer === 4) {
        if ((0, _actionStateShortcuts.isFinalDeath)()) {
          (0, _main.finishGame)(input);
        } else {
          (0, _main.screenShake)(500);
          (0, _main.percentShake)(500, p);
        }
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 60) {
      if (_main.player[p].stocks > 0) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].REBIRTH.init(p, input);
      } else {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].SLEEP.init(p, input);
      }
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/DEADLEFT.js
// module id = 510
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/DEADLEFT.js?