"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

exports.default = {
  name: "WALK",
  canEdgeCancel: true,
  canBeGrabbed: true,
  init: function init(p, addInitV, input) {
    _main.player[p].actionState = "WALK";
    _main.player[p].timer = 1;
    if (addInitV) {
      var tempInit = _main.player[p].charAttributes.walkInitV * _main.player[p].phys.face;
      if (tempInit > 0 && _main.player[p].phys.cVel.x < tempInit || tempInit < 0 && _main.player[p].phys.cVel.x > tempInit) {
        _main.player[p].phys.cVel.x += _main.player[p].charAttributes.walkInitV * _main.player[p].phys.face;
      }
    }
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].WALK.main(p, input);
  },
  main: function main(p, input) {
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].WALK.interrupt(p, input)) {
      var footstep = [false, false];
      if (_main.player[p].timer < 5) {
        footstep[0] = true;
      }
      if (_main.player[p].timer < 15) {
        footstep[1] = true;
      }

      //Current Walk Acceleration = ((MaxWalkVel * Xinput) - PreviousFrameVelocity) * (1/(MaxWalkVel * 2)) * (InitWalkVel * WalkAcc)
      var tempMax = _main.player[p].charAttributes.walkMaxV * input[p][0].lsX;

      if (Math.abs(_main.player[p].phys.cVel.x) > Math.abs(tempMax)) {
        (0, _actionStateShortcuts.reduceByTraction)(p, true);
      } else {
        var tempAcc = (tempMax - _main.player[p].phys.cVel.x) * (1 / (_main.player[p].charAttributes.walkMaxV * 2)) * (_main.player[p].charAttributes.walkInitV + _main.player[p].charAttributes.walkAcc);

        _main.player[p].phys.cVel.x += tempAcc;
        if (_main.player[p].phys.cVel.x * _main.player[p].phys.face > tempMax * _main.player[p].phys.face) {
          _main.player[p].phys.cVel.x = tempMax;
        }
      }

      var time = _main.player[p].phys.cVel.x * _main.player[p].phys.face / _main.player[p].charAttributes.walkMaxV * _main.player[p].charAttributes.walkAnimSpeed;
      if (time > 0) {
        _main.player[p].timer += time;
      }
      if (footstep[0] && _main.player[p].timer >= 5 || footstep[1] && _main.player[p].timer >= 15) {
        _sfx.sounds.footstep.play();
      }
    }
  },
  interrupt: function interrupt(p, input) {
    var b = (0, _actionStateShortcuts.checkForSpecials)(p, input);
    var t = (0, _actionStateShortcuts.checkForTilts)(p, input);
    var s = (0, _actionStateShortcuts.checkForSmashes)(p, input);
    var j = (0, _actionStateShortcuts.checkForJump)(p, input);
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].WALK) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WALK.init(p, false, input);
      return true;
    }
    if (input[p][0].lsX === 0) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      return true;
    } else if (j[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].KNEEBEND.init(p, j[1], input);
      return true;
    } else if (input[p][0].l || input[p][0].r) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARDON.init(p, input);
      return true;
    } else if (input[p][0].lA > 0 || input[p][0].rA > 0) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARDON.init(p, input);
      return true;
    } else if (b[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]][b[1]].init(p, input);
      return true;
    } else if (s[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]][s[1]].init(p, input);
      return true;
    } else if (t[0]) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]][t[1]].init(p, input);
      return true;
    } else if (input[p][0].du) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].APPEAL.init(p, input);
      return true;
    } else if ((0, _actionStateShortcuts.checkForSquat)(p, input)) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].SQUAT.init(p, input);
      return true;
    } else if ((0, _actionStateShortcuts.checkForDash)(p, input)) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DASH.init(p, input);
      return true;
    } else if ((0, _actionStateShortcuts.checkForSmashTurn)(p, input)) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].SMASHTURN.init(p, input);
      return true;
    } else if ((0, _actionStateShortcuts.checkForTiltTurn)(p, input)) {
      _main.player[p].phys.dashbuffer = (0, _actionStateShortcuts.tiltTurnDashBuffer)(p, input);
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].TILTTURN.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/WALK.js
// module id = 287
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/WALK.js?