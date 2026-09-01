"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getXOrYCoord = getXOrYCoord;
exports.putXOrYCoord = putXOrYCoord;
exports.flipXOrY = flipXOrY;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vec2D = exports.Vec2D = function () {
  function Vec2D(x, y) {
    _classCallCheck(this, Vec2D);

    this.x = x;
    this.y = y;
  }

  _createClass(Vec2D, [{
    key: "dot",
    value: function dot(vector) {
      return this.x * vector.x + this.y * vector.y;
    }
  }]);

  return Vec2D;
}();

;

function getXOrYCoord(vec, xOrY) {
  if (xOrY === "x") {
    return vec.x;
  } else {
    return vec.y;
  }
};

function putXOrYCoord(coord, xOrY) {
  if (xOrY === "x") {
    return new Vec2D(coord, 0);
  } else {
    return new Vec2D(0, coord);
  }
};

function flipXOrY(xOrY) {
  return xOrY === "x" ? "y" : "x";
}

//////////////////
// WEBPACK FOOTER
// ./src/main/util/Vec2D.js
// module id = 22
// module chunks = 1
//# sourceURL=webpack:///./src/main/util/Vec2D.js?