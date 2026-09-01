"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.puffMultiJumpDrift = puffMultiJumpDrift;

var _main = __webpack_require__(11);

function puffMultiJumpDrift(p, input) {
  var tempMax = void 0;
  if (Math.abs(input[p][0].lsX) < 0.3) {
    tempMax = 0;
  } else {
    tempMax = 1.08 * input[p][0].lsX;
  }

  if (tempMax < 0 && _main.player[p].phys.cVel.x < tempMax || tempMax > 0 && _main.player[p].phys.cVel.x > tempMax) {
    if (_main.player[p].phys.cVel.x > 0) {
      _main.player[p].phys.cVel.x -= _main.player[p].charAttributes.airFriction;
      if (_main.player[p].phys.cVel.x < 0) {
        _main.player[p].phys.cVel.x = 0;
      }
    } else {
      _main.player[p].phys.cVel.x += _main.player[p].charAttributes.airFriction;
      if (_main.player[p].phys.cVel.x > 0) {
        _main.player[p].phys.cVel.x = 0;
      }
    }
  } else if (Math.abs(input[p][0].lsX) > 0.3 && (tempMax < 0 && _main.player[p].phys.cVel.x > tempMax || tempMax > 0 && _main.player[p].phys.cVel.x < tempMax)) {
    _main.player[p].phys.cVel.x += 0.072 * input[p][0].lsX;
  }

  if (Math.abs(input[p][0].lsX) < 0.3) {
    if (_main.player[p].phys.cVel.x > 0) {
      _main.player[p].phys.cVel.x -= _main.player[p].charAttributes.airFriction;
      if (_main.player[p].phys.cVel.x < 0) {
        _main.player[p].phys.cVel.x = 0;
      }
    } else {
      _main.player[p].phys.cVel.x += _main.player[p].charAttributes.airFriction;
      if (_main.player[p].phys.cVel.x > 0) {
        _main.player[p].phys.cVel.x = 0;
      }
    }
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/puffMultiJumpDrift.js
// module id = 264
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/puffMultiJumpDrift.js?