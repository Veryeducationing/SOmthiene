"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vec2D = __webpack_require__(22);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

exports.default = {
  name: "THROWNFALCONDIVE",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  wallJumpAble: false,
  reverseModel: false,
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNFALCONDIVE";
    _main.player[p].phys.cVel.x = 0;
    _main.player[p].phys.cVel.y = 0;
    _main.player[p].phys.kVel.x = 0;
    _main.player[p].phys.kVel.y = 0;
    _main.player[p].phys.grounded = false;
    _main.player[p].timer = 0;
    (0, _drawVfx.drawVfx)({
      name: "tech",
      pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x, _main.player[p].phys.pos.y + 10)
    });
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].THROWNFALCONDIVE.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    _main.player[p].phys.kVel = new _Vec2D.Vec2D(0, 0);
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].THROWNFALCONDIVE.interrupt(p, input)) {}
  },
  interrupt: function interrupt(p, input) {
    return false;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/THROWNFALCONDIVE.js
// module id = 553
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/THROWNFALCONDIVE.js?