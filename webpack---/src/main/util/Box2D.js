"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Box2D = undefined;

var _Vec2D = __webpack_require__(22);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Box2D = exports.Box2D = function Box2D(min, max) {
  _classCallCheck(this, Box2D);

  this.min = new _Vec2D.Vec2D(min[0], min[1]);
  this.max = new _Vec2D.Vec2D(max[0], max[1]);
};

//////////////////
// WEBPACK FOOTER
// ./src/main/util/Box2D.js
// module id = 21
// module chunks = 1
//# sourceURL=webpack:///./src/main/util/Box2D.js?