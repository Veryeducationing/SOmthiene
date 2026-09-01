"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FALLSPECIAL = __webpack_require__(319);

var _FALLSPECIAL2 = _interopRequireDefault(_FALLSPECIAL);

var _main = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "SIDESPECIALGROUNDTOAIR",
  init: function init(p, input) {
    if (Math.abs(_main.player[p].phys.cVel.x) > _main.player[p].charAttributes.aerialHmaxV) {
      _main.player[p].phys.cVel.x = Math.sign(_main.player[p].phys.cVel.x) * _main.player[p].charAttributes.aerialHmaxV;
    }
    _FALLSPECIAL2.default.init(p, input);
  },
  main: function main(p, input) {
    this.init(p, input);
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/SIDESPECIALGROUNDTOAIR.js
// module id = 654
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/SIDESPECIALGROUNDTOAIR.js?