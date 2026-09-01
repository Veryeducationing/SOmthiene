"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _drawVfx = __webpack_require__(134);

exports.default = {
  name: "LANDING",
  canEdgeCancel: true,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "LANDING";
    _main.player[p].timer = 0;
    (0, _drawVfx.drawVfx)({
      name: "impactLand",
      pos: _main.player[p].phys.pos,
      face: _main.player[p].phys.face
    });
    (0, _drawVfx.drawVfx)({
      name: "circleDust",
      pos: _main.player[p].phys.pos,
      face: _main.player[p].phys.face
    });
    _sfx.sounds.land.play();
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].LANDING.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].LANDING.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 4 && _main.player[p].timer <= 30) {
      var b = (0, _actionStateShortcuts.checkForSpecials)(p, input);
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
      } else if (input[p][0].du) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].APPEAL.init(p, input);
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
      } else if (_main.player[p].timer === 5 && input[p][0].lsY < -0.5) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].SQUATWAIT.init(p, input);
        return true;
      } else {
        return false;
      }
    } else if (_main.player[p].timer > 30) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/LANDING.js
// module id = 272
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/LANDING.js?