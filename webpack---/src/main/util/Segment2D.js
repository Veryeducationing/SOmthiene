"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Segment2D = Segment2D;

var _Vec2D = __webpack_require__(22);

function Segment2D(x, y, vecx, vecy) {
  this.x = x;
  this.y = y;
  this.vecx = vecx;
  this.vecy = vecy;
  this.segLength = function () {
    var dx = this.vecx;
    var dy = this.vecy;
    return Math.sqrt(dx * dx + dy * dy);
  };
  this.project = function (segOnto) {
    var vec = new _Vec2D.Vec2D(this.vecx, this.vecy);
    var onto = new _Vec2D.Vec2D(segOnto.vecx, segOnto.vecy);
    var d = onto.dot(onto);
    if (0 < d) {
      var dp = vec.dot(onto);
      var multiplier = dp / d;
      var rx = onto.x * multiplier;
      var ry = onto.y * multiplier;
      return new _Vec2D.Vec2D(rx, ry);
    }
    return new _Vec2D.Vec2D(0, 0);
  };
}

//////////////////
// WEBPACK FOOTER
// ./src/main/util/Segment2D.js
// module id = 238
// module chunks = 1
//# sourceURL=webpack:///./src/main/util/Segment2D.js?