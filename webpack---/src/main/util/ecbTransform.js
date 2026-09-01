"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveECB = moveECB;
exports.squashECBAt = squashECBAt;
exports.ecbFocusFromAngularParameter = ecbFocusFromAngularParameter;
exports.interpolateECB = interpolateECB;
exports.makeECB = makeECB;

var _Vec2D = __webpack_require__(22);

var _linAlg = __webpack_require__(29);

/*eslint indent:0*/

function moveECB(ecb, vec) {
  return [new _Vec2D.Vec2D(ecb[0].x + vec.x, ecb[0].y + vec.y), new _Vec2D.Vec2D(ecb[1].x + vec.x, ecb[1].y + vec.y), new _Vec2D.Vec2D(ecb[2].x + vec.x, ecb[2].y + vec.y), new _Vec2D.Vec2D(ecb[3].x + vec.x, ecb[3].y + vec.y)];
};

function squashECBAt(ecb, squashDatum) {
  var pos = ecbFocusFromAngularParameter(ecb, squashDatum.location);
  var t = squashDatum.factor;
  return [new _Vec2D.Vec2D(t * ecb[0].x + (1 - t) * pos.x, t * ecb[0].y + (1 - t) * pos.y), new _Vec2D.Vec2D(t * ecb[1].x + (1 - t) * pos.x, t * ecb[1].y + (1 - t) * pos.y), new _Vec2D.Vec2D(t * ecb[2].x + (1 - t) * pos.x, t * ecb[2].y + (1 - t) * pos.y), new _Vec2D.Vec2D(t * ecb[3].x + (1 - t) * pos.x, t * ecb[3].y + (1 - t) * pos.y)];
};

function ecbFocusFromAngularParameter(ecb, t) {
  var focus = null;
  if (t === null) {
    focus = new _Vec2D.Vec2D(ecb[0].x, (ecb[0].y + ecb[2].y) / 2);
  } else if (t <= 1) {
    focus = new _Vec2D.Vec2D((1 - t) * ecb[0].x + t * ecb[1].x, (1 - t) * ecb[0].y + t * ecb[1].y);
  } else if (t <= 2) {
    focus = new _Vec2D.Vec2D((1 - (t - 1)) * ecb[1].x + (t - 1) * ecb[2].x, (1 - (t - 1)) * ecb[1].y + (t - 1) * ecb[2].y);
  } else if (t <= 3) {
    focus = new _Vec2D.Vec2D((1 - (t - 2)) * ecb[2].x + (t - 2) * ecb[3].x, (1 - (t - 2)) * ecb[2].y + (t - 2) * ecb[3].y);
  } else {
    focus = new _Vec2D.Vec2D((1 - (t - 3)) * ecb[3].x + (t - 3) * ecb[0].x, (1 - (t - 3)) * ecb[3].y + (t - 3) * ecb[0].y);
  }
  return focus;
}

function interpolateECB(srcECB, tgtECB, s) {
  return [new _Vec2D.Vec2D((1 - s) * srcECB[0].x + s * tgtECB[0].x, (1 - s) * srcECB[0].y + s * tgtECB[0].y), new _Vec2D.Vec2D((1 - s) * srcECB[1].x + s * tgtECB[1].x, (1 - s) * srcECB[1].y + s * tgtECB[1].y), new _Vec2D.Vec2D((1 - s) * srcECB[2].x + s * tgtECB[2].x, (1 - s) * srcECB[2].y + s * tgtECB[2].y), new _Vec2D.Vec2D((1 - s) * srcECB[3].x + s * tgtECB[3].x, (1 - s) * srcECB[3].y + s * tgtECB[3].y)];
}

function makeECB(pos, halfWidth, height) {
  return [pos, (0, _linAlg.add)(pos, new _Vec2D.Vec2D(halfWidth, 0)), (0, _linAlg.add)(pos, new _Vec2D.Vec2D(0, height)), (0, _linAlg.add)(pos, new _Vec2D.Vec2D(-halfWidth, 0))];
}

//////////////////
// WEBPACK FOOTER
// ./src/main/util/ecbTransform.js
// module id = 34
// module chunks = 1
//# sourceURL=webpack:///./src/main/util/ecbTransform.js?