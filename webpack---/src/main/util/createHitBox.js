"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHitbox = createHitbox;
function createHitbox(offset, size, dmg, angle, kg, bk, sk, type, clank, hG, hA) {
  var throwex = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : false;

  this.offset = offset;
  this.size = size;
  this.dmg = dmg;
  this.angle = angle;
  this.kg = kg;
  this.bk = bk;
  this.sk = sk;
  this.type = type;
  // 0:normal , 1:slash ,2:grab , 3:fire , 4:eletric , 5:sleep, 6:reactOnClank, 7:reflect, 8:inert
  this.clank = clank;
  this.hitGrounded = hG;
  this.hitAirborne = hA;
  this.throwextra = throwex;
}

//////////////////
// WEBPACK FOOTER
// ./src/main/util/createHitBox.js
// module id = 240
// module chunks = 1
//# sourceURL=webpack:///./src/main/util/createHitBox.js?