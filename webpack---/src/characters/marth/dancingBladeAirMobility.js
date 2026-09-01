"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dancingBladeAirMobility = undefined;

var _main = __webpack_require__(11);

var dancingBladeAirMobility = exports.dancingBladeAirMobility = function dancingBladeAirMobility(p) {
  _main.player[p].phys.cVel.y -= 0.06;
  if (_main.player[p].phys.cVel.y < -1.5) {
    _main.player[p].phys.cVel.y = -1.5;
  }
  if (_main.player[p].phys.cVel.x > 0) {
    _main.player[p].phys.cVel.x -= 0.0025;
    if (_main.player[p].phys.cVel.x < 0) {
      _main.player[p].phys.cVel.x = 0;
    }
  } else {
    _main.player[p].phys.cVel.x += 0.0025;
    if (_main.player[p].phys.cVel.x > 0) {
      _main.player[p].phys.cVel.x = 0;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/dancingBladeAirMobility.js
// module id = 388
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/dancingBladeAirMobility.js?