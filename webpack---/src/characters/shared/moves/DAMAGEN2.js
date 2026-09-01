"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

var _Vec2D = __webpack_require__(22);

exports.default = {
  name: "DAMAGEN2",
  canEdgeCancel: true,
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  missfoot: true,
  init: function init(p, input) {
    _main.player[p].actionState = "DAMAGEN2";
    _main.player[p].timer = 0;
    _main.player[p].phys.grabbing = -1;
    _main.player[p].phys.grabbedBy = -1;
    _main.player[p].phys.fastfalled = false;
    _main.player[p].rotation = 0;
    _main.player[p].rotationPoint = new _Vec2D.Vec2D(0, 0);
    _main.player[p].colourOverlayBool = false;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].DAMAGEN2.main(p, input);
  },
  main: function main(p, input) {
    if (_main.player[p].inCSS) {
      _main.player[p].timer += 0.7;
    } else {
      _main.player[p].timer++;
    }
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].DAMAGEN2.interrupt(p, input)) {
      if (_main.player[p].timer > 1) {
        _main.player[p].hit.hitstun--;
        if (!_main.player[p].phys.grounded) {
          _main.player[p].phys.cVel.y -= _main.player[p].charAttributes.gravity;
          if (_main.player[p].phys.cVel.y < -_main.player[p].charAttributes.terminalV) {
            _main.player[p].phys.cVel.y = -_main.player[p].charAttributes.terminalV;
          }
        } else {
          (0, _actionStateShortcuts.reduceByTraction)(p, false);
        }
      }
    }
  },
  interrupt: function interrupt(p, input) {
    var b = void 0;
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].DAMAGEN2) {
      if (_main.player[p].hit.hitstun > 0) {
        _main.player[p].timer--;
        return false;
      } else {
        if (_main.player[p].phys.grounded || _main.player[p].inCSS) {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
        } else {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALL.init(p, input);
        }
        return true;
      }
    } else if (_main.player[p].hit.hitstun <= 0 && !_main.player[p].inCSS) {
      if (_main.player[p].phys.grounded) {
        b = (0, _actionStateShortcuts.checkForSpecials)(p, input);
        var t = (0, _actionStateShortcuts.checkForTilts)(p, input);
        var s = (0, _actionStateShortcuts.checkForSmashes)(p, input);
        var j = (0, _actionStateShortcuts.checkForJump)(p, input);
        if (j[0]) {
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
        } else if (Math.abs(input[p][0].lsX) > 0.3) {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]].WALK.init(p, true, input);
          return true;
        } else {
          return false;
        }
      } else {
        var a = (0, _actionStateShortcuts.checkForAerials)(p, input);
        b = (0, _actionStateShortcuts.checkForSpecials)(p, input);
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
        } else if (input[p][0].lsX > 0.7 && input[p][1].lsX < 0.7 || input[p][0].lsX < -0.7 && input[p][1].lsX > -0.7 || input[p][0].lsY > 0.7 && input[p][1].lsY < 0.7 || input[p][0].lsY < -0.7 && input[p][1].lsY > -0.7) {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALL.init(p, input);
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    if (_main.player[p].hit.hitstun <= 0) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].LANDING.init(p, input);
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/DAMAGEN2.js
// module id = 518
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/DAMAGEN2.js?