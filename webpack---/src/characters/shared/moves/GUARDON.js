"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

var _Vec2D = __webpack_require__(22);

exports.default = {
  name: "GUARDON",
  canEdgeCancel: true,
  canBeGrabbed: true,
  missfoot: true,
  init: function init(p, input) {
    _main.player[p].actionState = "GUARDON";
    _main.player[p].timer = 0;
    _main.player[p].phys.shielding = true;
    _main.player[p].phys.shieldPosition = new _Vec2D.Vec2D(0, 0);
    _main.player[p].phys.powerShielded = false;
    (0, _actionStateShortcuts.shieldSize)(p, true, input);
    if (Math.max(input[p][0].lA, input[p][0].rA) === 1) {
      _main.player[p].phys.powerShieldActive = true;
      _main.player[p].phys.powerShieldReflectActive = true;
    } else {
      _main.player[p].phys.powerShieldActive = false;
      _main.player[p].phys.powerShieldReflectActive = false;
    }
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARDON.main(p, input);
  },
  main: function main(p, input) {
    if (_main.player[p].hit.shieldstun > 0) {
      (0, _actionStateShortcuts.reduceByTraction)(p, false);
      (0, _actionStateShortcuts.shieldTilt)(p, true, input);
    } else {
      _main.player[p].timer++;
      (0, _actionStateShortcuts.playSounds)("GUARDON", p);
      if (_main.player[p].timer === 3) {
        _main.player[p].phys.powerShieldReflectActive = false;
      }
      if (_main.player[p].timer === 5) {
        _main.player[p].phys.powerShieldActive = false;
      }
      /*if (player[p].timer == 2 && Math.max(input[p][0].lA,input[p][0].rA) == 1){
        player[p].phys.powerShieldActive = true;
      }*/
      if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARDON.interrupt(p, input)) {
        if (_main.player[p].timer === 1) {
          _sfx.sounds.shieldup.play();
        }
        if (!_main.player[p].inCSS) {
          (0, _actionStateShortcuts.reduceByTraction)(p, false);
          (0, _actionStateShortcuts.shieldDepletion)(p, input);
        }
        (0, _actionStateShortcuts.shieldTilt)(p, false, input);
        (0, _actionStateShortcuts.shieldSize)(p, null, input);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (!_main.player[p].inCSS) {
      var j = (0, _actionStateShortcuts.checkForJump)(p, input);
      if (j[0] || input[p][0].csY > 0.65) {
        _main.player[p].phys.shielding = false;
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].KNEEBEND.init(p, j[1], input);
        return true;
      } else if (input[p][0].a && !input[p][1].a) {
        _main.player[p].phys.shielding = false;
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].GRAB.init(p, input);
        return true;
      } else if (input[p][0].lsY < -0.7 && input[p][4].lsY > -0.3 || input[p][0].csY < -0.7) {
        _main.player[p].phys.shielding = false;
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].ESCAPEN.init(p, input);
        return true;
      } else if (input[p][0].lsX * _main.player[p].phys.face > 0.7 && input[p][4].lsX * _main.player[p].phys.face < 0.3 || input[p][0].csX * _main.player[p].phys.face > 0.7) {
        _main.player[p].phys.shielding = false;
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].ESCAPEF.init(p, input);
        return true;
      } else if (input[p][0].lsX * _main.player[p].phys.face < -0.7 && input[p][4].lsX * _main.player[p].phys.face > -0.3 || input[p][0].csX * _main.player[p].phys.face < -0.7) {
        _main.player[p].phys.shielding = false;
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].ESCAPEB.init(p, input);
        return true;
      } else if (_main.player[p].timer > 1 && input[p][0].lsY < -0.65 && input[p][6].lsY > -0.3 && _main.player[p].phys.onSurface[0] === 1) {
        _main.player[p].phys.shielding = false;
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].PASS.init(p, input);
        return true;
      } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].GUARDON) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARD.init(p, input);
        return true;
      } else {
        return false;
      }
    } else {
      if (_main.player[p].timer > 8) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARD.init(p, input);
        return true;
      } else {
        return false;
      }
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/GUARDON.js
// module id = 505
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/GUARDON.js?