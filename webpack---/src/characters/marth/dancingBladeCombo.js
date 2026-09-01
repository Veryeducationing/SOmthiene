"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dancingBladeCombo = dancingBladeCombo;

var _main = __webpack_require__(11);

function dancingBladeCombo(p, min, max, input) {
  if (_main.player[p].timer > 1) {
    if (input[p][0].a && !input[p][1].a || input[p][0].b && !input[p][1].b && !_main.player[p].phys.dancingBladeDisable) {
      if (_main.player[p].timer < min) {
        _main.player[p].phys.dancingBladeDisable = true;
      } else if (_main.player[p].timer <= max) {
        _main.player[p].phys.dancingBlade = true;
      }
    }
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/dancingBladeCombo.js
// module id = 387
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/dancingBladeCombo.js?