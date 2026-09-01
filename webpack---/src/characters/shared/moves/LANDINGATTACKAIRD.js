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
  name: "LANDINGATTACKAIRD",
  canEdgeCancel: true,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "LANDINGATTACKAIRD";
    _main.player[p].timer = 0;
    if (_main.player[p].phys.lCancel) {
      _main.player[p].phys.landingLagScaling = 2;
    } else {
      _main.player[p].phys.landingLagScaling = 1;
    }
    (0, _drawVfx.drawVfx)({
      name: "circleDust",
      pos: _main.player[p].phys.pos,
      face: _main.player[p].phys.face
    });
    _sfx.sounds.land.play();
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].LANDINGATTACKAIRD.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer += _main.player[p].phys.landingLagScaling;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].LANDINGATTACKAIRD.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].LANDINGATTACKAIRD) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/LANDINGATTACKAIRD.js
// module id = 275
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/LANDINGATTACKAIRD.js?