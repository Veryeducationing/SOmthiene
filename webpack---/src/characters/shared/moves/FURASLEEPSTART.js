"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _characters = __webpack_require__(119);

var _blendColours = __webpack_require__(17);

exports.default = {
  name: "FURASLEEPSTART",
  canEdgeCancel: true,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "FURASLEEPSTART";
    _main.player[p].timer = 0;
    _main.player[p].phys.stuckTimer = 95 + 2 * Math.floor(_main.player[p].percent);
    _sfx.sounds.fireweakhit.play();
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].FURASLEEPSTART.main(p, input);
  },
  main: function main(p, input) {
    var newCol = void 0;
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].FURASLEEPSTART.interrupt(p, input)) {
      _main.player[p].phys.stuckTimer--;
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
      var originalColour = _main.palettes[_main.pPal[p]][0];
      originalColour = originalColour.substr(4, originalColour.length - 5);
      var colourArray = originalColour.split(",");
      //rgb(207, 45, 190)
      var part = _main.player[p].timer % 30;
      if (part < 25) {
        _main.player[p].colourOverlayBool = true;
        if (part < 13) {
          newCol = (0, _blendColours.blendColours)(colourArray, [207, 45, 190], Math.min(1, part / 12));
        } else {
          newCol = (0, _blendColours.blendColours)(colourArray, [207, 45, 190], Math.max(0, 1 - (part - 12 / 12)));
        }
        _main.player[p].colourOverlay = "rgb(" + newCol[0] + "," + newCol[1] + "," + newCol[2] + ")";
      } else {
        _main.player[p].colourOverlayBool = false;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].phys.stuckTimer <= 0) {
      _main.player[p].colourOverlayBool = false;
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].FURASLEEPEND.init(p, input);
      return true;
    } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].FURASLEEPSTART) {
      _main.player[p].colourOverlayBool = false;
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].FURASLEEPLOOP.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/FURASLEEPSTART.js
// module id = 546
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/FURASLEEPSTART.js?