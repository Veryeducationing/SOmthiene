"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _characters = __webpack_require__(119);

var _drawVfx = __webpack_require__(134);

exports.default = {
  name: "DASH",
  canEdgeCancel: true,
  disableTeeter: true,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "DASH";
    _main.player[p].timer = 0;
    _sfx.sounds.dash.play();
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].DASH.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].DASH.interrupt(p, input)) {
      if (_main.player[p].timer === 2) {
        _main.player[p].phys.cVel.x += _main.player[p].charAttributes.dInitV * _main.player[p].phys.face;
        if (Math.abs(_main.player[p].phys.cVel.x) > _main.player[p].charAttributes.dMaxV) {
          _main.player[p].phys.cVel.x = _main.player[p].charAttributes.dMaxV * _main.player[p].phys.face;
        }
      }
      if (_main.player[p].timer === 4) {
        (0, _drawVfx.drawVfx)({
          name: "dashDust",
          pos: _main.player[p].phys.pos,
          face: _main.player[p].phys.face
        });
      }
      if (_main.player[p].timer > 1) {
        if (Math.abs(input[p][0].lsX) < 0.3) {
          (0, _actionStateShortcuts.reduceByTraction)(p, false);
        } else {
          var tempMax = input[p][0].lsX * _main.player[p].charAttributes.dMaxV;
          //var tempAcc = (player[p].charAttributes.dAcc - (1 - Math.abs(input[p][0].lsX))*(player[p].charAttributes.dAcc))*player[p].phys.face;
          var tempAcc = input[p][0].lsX * _main.player[p].charAttributes.dAccA;

          _main.player[p].phys.cVel.x += tempAcc;
          if (tempMax > 0 && _main.player[p].phys.cVel.x > tempMax || tempMax < 0 && _main.player[p].phys.cVel.x < tempMax) {
            (0, _actionStateShortcuts.reduceByTraction)(p, false);
            if (tempMax > 0 && _main.player[p].phys.cVel.x < tempMax || tempMax < 0 && _main.player[p].phys.cVel.x > tempMax) {
              _main.player[p].phys.cVel.x = tempMax;
            }
          } else {
            _main.player[p].phys.cVel.x += tempAcc;
            if (tempMax > 0 && _main.player[p].phys.cVel.x > tempMax || tempMax < 0 && _main.player[p].phys.cVel.x < tempMax) {
              _main.player[p].phys.cVel.x = tempMax;
            }
          }
        }
      }
    }
  },
  interrupt: function interrupt(p, input) {
    var j = (0, _actionStateShortcuts.checkForJump)(p, input);
    if (input[p][0].l || input[p][0].r) {
      _main.player[p].phys.cVel.x *= 0.25;
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARDON.init(p, input);
      return true;
    } else if (input[p][0].lA > 0 || input[p][0].rA > 0) {
      _main.player[p].phys.cVel.x *= 0.25;
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARDON.init(p, input);
      return true;
    } else if (input[p][0].a && !input[p][1].a) {
      if (_main.player[p].timer < 4 && input[p][0].lsX * _main.player[p].phys.face >= 0.8) {
        _main.player[p].phys.cVel.x *= 0.25;
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].FORWARDSMASH.init(p, input);
      } else if (input[p][0].lA > 0 || input[p][0].rA > 0) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].GRAB.init(p, input);
      } else {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].ATTACKDASH.init(p, input);
      }
      return true;
    } else if (j[0]) {
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
    } else if (input[p][0].du) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].APPEAL.init(p, input);
      return true;
    } else if (_main.player[p].timer > 4 && (0, _actionStateShortcuts.checkForSmashTurn)(p, input)) {
      _main.player[p].phys.cVel.x *= 0.25;
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].SMASHTURN.init(p, input);
      return true;
    } else if (_main.player[p].timer > _main.player[p].charAttributes.dashFrameMax && input[p][0].lsX * _main.player[p].phys.face > 0.79 && input[p][2].lsX * _main.player[p].phys.face < 0.3) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DASH.init(p, input);
      return true;
    } else if (_main.player[p].timer > _main.player[p].charAttributes.dashFrameMin && input[p][0].lsX * _main.player[p].phys.face > 0.62) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].RUN.init(p, input);
      return true;
    } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].DASH) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/DASH.js
// module id = 284
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/DASH.js?