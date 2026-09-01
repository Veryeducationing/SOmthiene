"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _activeStage = __webpack_require__(18);

exports.default = {
  name: "REBIRTH",
  canBeGrabbed: false,
  ignoreCollision: true,
  init: function init(p, input) {
    _main.player[p].actionState = "REBIRTH";
    _main.player[p].timer = 1;
    _main.player[p].phys.pos.x = _activeStage.activeStage.respawnPoints[p].x;
    _main.player[p].phys.pos.y = _activeStage.activeStage.respawnPoints[p].y + 135;
    //player[p].phys.grounded = true;
    _main.player[p].phys.cVel.x = 0;
    _main.player[p].phys.cVel.y = -1.5;
    _main.player[p].phys.face = _activeStage.activeStage.respawnFace[p];
    _main.player[p].phys.doubleJumped = false;
    _main.player[p].phys.fastfalled = false;
    _main.player[p].phys.jumpsUsed = 0;
    _main.player[p].phys.wallJumpCount = 0;
    _main.player[p].phys.sideBJumpFlag = true;
    _main.player[p].spawnWaitTime = 0;
    _main.player[p].percent = 0;
    _main.player[p].phys.kVel.x = 0;
    _main.player[p].phys.kVel.y = 0;
    _main.player[p].hit.hitstun = 0;
    _main.player[p].phys.shieldHP = 60;
    _main.player[p].burning = 0;
    _main.player[p].shocked = 0;
  },
  main: function main(p, input) {
    _main.player[p].timer += 1;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].REBIRTH.interrupt(p, input)) {
      _main.player[p].phys.outOfCameraTimer = 0;
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 90) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].REBIRTHWAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/REBIRTH.js
// module id = 514
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/REBIRTH.js?