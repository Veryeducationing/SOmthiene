"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _drawVfx = __webpack_require__(134);

var _activeStage = __webpack_require__(18);

var _Vec2D = __webpack_require__(22);

var _characters = __webpack_require__(119);

exports.default = {
  name: "CLIFFCATCH",
  canGrabLedge: false,
  canBeGrabbed: false,
  posOffset: [],
  landType: 0,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFCATCH";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel.x = 0;
    _main.player[p].phys.cVel.y = 0;
    _main.player[p].phys.kVel.x = 0;
    _main.player[p].phys.kVel.y = 0;
    _main.player[p].phys.thrownHitbox = false;
    _main.player[p].phys.fastfalled = false;
    _main.player[p].phys.doubleJumped = false;
    _main.player[p].phys.jumpsUsed = 0;
    _main.player[p].phys.intangibleTimer = 38;
    _main.player[p].phys.ledgeHangTimer = 0;
    _main.player[p].rotation = 0;
    _main.player[p].rotationPoint = new _Vec2D.Vec2D(0, 0);
    _main.player[p].colourOverlayBool = false;
    _main.player[p].phys.chargeFrames = 0;
    _main.player[p].phys.charging = false;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    var l = _activeStage.activeStage.ledge[_main.player[p].phys.onLedge];
    (0, _drawVfx.drawVfx)({
      name: "cliffcatchspark",
      pos: new _Vec2D.Vec2D(_activeStage.activeStage[l[0]][l[1]][l[2]].x, _activeStage.activeStage[l[0]][l[1]][l[2]].y),
      face: _main.player[p].phys.face
    });
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].CLIFFCATCH.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    (0, _actionStateShortcuts.playSounds)("CLIFFCATCH", p);
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].CLIFFCATCH.interrupt(p, input)) {
      var onLedge = _main.player[p].phys.onLedge;
      if (onLedge === -1) {
        return;
      }
      var l = _activeStage.activeStage.ledge[onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (_actionStateShortcuts.actionStates[_main.characterSelections[p]].CLIFFCATCH.posOffset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + _actionStateShortcuts.actionStates[_main.characterSelections[p]].CLIFFCATCH.posOffset[_main.player[p].timer - 1][1]);
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].CLIFFCATCH) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].CLIFFWAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/CLIFFCATCH.js
// module id = 508
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/CLIFFCATCH.js?