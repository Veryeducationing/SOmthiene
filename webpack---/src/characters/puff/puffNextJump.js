"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.puffNextJump = puffNextJump;

var _moves = __webpack_require__(262);

var _moves2 = _interopRequireDefault(_moves);

var _main = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function puffNextJump(p, input) {
  if (Math.abs(input[p][0].lsX) > 0.3 && Math.sign(input[p][0].lsX) !== _main.player[p].phys.face) {
    _moves2.default["AERIALTURN" + (1 + _main.player[p].phys.jumpsUsed)].init(p, input);
  } else {
    _moves2.default["JUMPAERIAL" + (1 + _main.player[p].phys.jumpsUsed)].init(p, input);
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/puffNextJump.js
// module id = 311
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/puffNextJump.js?