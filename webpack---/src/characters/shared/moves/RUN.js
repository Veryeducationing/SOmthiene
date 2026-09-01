"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

exports.default = {
  name: "RUN",
  canEdgeCancel: true,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "RUN";
    _main.player[p].timer = 1;
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].RUN.main(p, input);
  },
  main: function main(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].RUN) {
      _main.player[p].timer = 1;
    }
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].RUN.interrupt(p, input)) {
      var footstep = [false, false];
      if (_main.player[p].timer < 2) {
        footstep[0] = true;
      }
      if (_main.player[p].timer < 10) {
        footstep[1] = true;
      }
      var tempMax = input[p][0].lsX * _main.player[p].charAttributes.dMaxV;

      //Current Run Acceleration = ((MaxRunVel * Xinput) - PreviousFrameVelocity) * (1/(MaxRunVel * 2.5)) * (DRAA + (DRAB/Math.abs(Xinput)))

      _main.player[p].phys.cVel.x += (_main.player[p].charAttributes.dMaxV * input[p][0].lsX - _main.player[p].phys.cVel.x) * (1 / (_main.player[p].charAttributes.dMaxV * 2.5)) * (_main.player[p].charAttributes.dAccA + _main.player[p].charAttributes.dAccB / Math.abs(input[p][0].lsX));
      if (_main.player[p].phys.cVel.x * _main.player[p].phys.face > tempMax * _main.player[p].phys.face) {
        _main.player[p].phys.cVel.x = tempMax;
      }

      var time = _main.player[p].phys.cVel.x * _main.player[p].phys.face / _main.player[p].charAttributes.dMaxV * _main.player[p].charAttributes.runAnimSpeed;
      if (time > 0) {
        _main.player[p].timer += time;
      }
      if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].RUN) {
        _main.player[p].timer = 1;
      }
      if (footstep[0] && _main.player[p].timer >= 2 || footstep[1] && _main.player[p].timer >= 10) {
        _sfx.sounds.footstep.play();
      }
    }
  },
  interrupt: function interrupt(p, input) {
    var j = (0, _actionStateShortcuts.checkForJump)(p, input);
    if (input[p][0].a && !input[p][1].a) {
      if (input[p][0].lA > 0 || input[p][0].rA > 0) {
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
    } else if (input[p][0].b && !input[p][1].b && input[p][0].lsY < -0.58) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNSPECIALGROUND.init(p, input);
      return true;
    } else if (input[p][0].l || input[p][0].r) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARDON.init(p, input);
      return true;
    } else if (input[p][0].lA > 0 || input[p][0].rA > 0) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].GUARDON.init(p, input);
      return true;
    } else if (input[p][0].du) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].APPEAL.init(p, input);
      return true;
    } else if (Math.abs(input[p][0].lsX) < 0.62) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].RUNBRAKE.init(p, input);
      return true;
    } else if (input[p][0].lsX * _main.player[p].phys.face < -0.3) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].RUNTURN.init(p, input);
      return true;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/RUN.js
// module id = 496
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/RUN.js?