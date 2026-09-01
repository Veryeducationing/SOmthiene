"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

var _drawVfx = __webpack_require__(134);

exports.default = {
  name: "WALLJUMP",
  canPassThrough: true,
  canGrabLedge: [true, false],
  wallJumpAble: true,
  headBonk: false,
  canBeGrabbed: true,
  landType: 0,
  init: function init(p, input) {
    _main.player[p].actionState = "WALLJUMP";
    _main.player[p].timer = 0;
    _main.player[p].phys.fastfalled = false;
    _main.player[p].hit.hitstun = 0;
    _main.player[p].phys.cVel.x = 0;
    _main.player[p].phys.cVel.y = 0;
    _main.player[p].phys.intangibleTimer = Math.max(_main.player[p].phys.intangibleTimer, 14);
    _main.player[p].phys.cVel.x = _main.player[p].phys.face * _main.player[p].charAttributes.wallJumpVelX;
    _main.player[p].phys.cVel.y = _main.player[p].charAttributes.wallJumpVelY * Math.pow(0.97, _main.player[p].phys.wallJumpCount);
    _main.player[p].phys.wallJumpCount++;
    _main.player[p].hit.hitlag = 5;
    _main.player[p].hit.knockback = 0;
    if (_main.player[p].phys.face === 1) {
      (0, _drawVfx.drawVfx)({
        name: "tech",
        pos: _main.player[p].phys.ECBp[3]
      });
    } else {
      (0, _drawVfx.drawVfx)({
        name: "tech",
        pos: _main.player[p].phys.ECBp[1]
      });
    }
    // draw tech rotated
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].WALLJUMP.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    (0, _actionStateShortcuts.playSounds)("TECH", p);
    if (_main.player[p].timer === 2) {
      _sfx.sounds.walljump.play();
    }
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].WALLJUMP.interrupt(p, input)) {
      (0, _actionStateShortcuts.fastfall)(p, input);
      (0, _actionStateShortcuts.airDrift)(p, input);
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 1) {
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
      } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].WALLJUMP) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALL.init(p, input);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/WALLJUMP.js
// module id = 541
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/WALLJUMP.js?