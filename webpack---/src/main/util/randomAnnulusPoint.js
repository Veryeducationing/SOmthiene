"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomAnnulusPoint = randomAnnulusPoint;
function randomAnnulusPoint(x, y, rMin, rMax) {
  var t = Math.random() * 2 * Math.PI;
  var r = (rMax - rMin) * Math.sqrt(Math.random()) + rMin; // sqrt needed for the distribution to be uniform
  return [x + r * Math.cos(t), y + r * Math.sin(t)];
}

//////////////////
// WEBPACK FOOTER
// ./src/main/util/randomAnnulusPoint.js
// module id = 222
// module chunks = 1
//# sourceURL=webpack:///./src/main/util/randomAnnulusPoint.js?