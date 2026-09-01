"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sweepCircleVsSweepCircle = sweepCircleVsSweepCircle;
exports.sweepCircleVsAABB = sweepCircleVsAABB;

var _Vec2D = __webpack_require__(22);

var _linAlg = __webpack_require__(29);

var _solveQuadraticEquation = __webpack_require__(31);

var _detectIntersections = __webpack_require__(128);

var _findSmallestWithin = __webpack_require__(30);

var _environmentalCollision = __webpack_require__(28);

// computes the first point of intersection between two sweeping circles
// circle 1 sweeps from p1 to p2 with radius going from r1 to r2
// circle 2 sweeps from q1 to q2 with radius going from s1 to s2

/*eslint indent:0*/

function sweepCircleVsSweepCircle(p1, r1, p2, r2, q1, s1, q2, s2) {
  if ((0, _linAlg.euclideanDist)(p1, q1) < r1 + s1) {
    return new _Vec2D.Vec2D(0.5 * p1.x + 0.5 * q1.x, 0.5 * p1.y + 0.5 * q1.y);
  } else {
    var u = p1.x + q2.x - p2.x - q1.x;
    var v = p1.y + q2.y - p2.y - q1.y;
    var w = r1 + s1 - r2 - s2;
    var a0 = Math.pow(p1.x - q1.x, 2) + Math.pow(p1.y - q1.y, 2) - Math.pow(r1 + s1, 2);
    var a1 = -2 * ((p1.x - q1.x) * u + (p1.y - q1.y) * v - (r1 + s1) * w);
    var a2 = Math.pow(u, 2) + Math.pow(v, 2) - Math.pow(w, 2);
    var t1 = (0, _solveQuadraticEquation.solveQuadraticEquation)(a0, a1, a2);

    var t = null;
    if (t1 !== null && !isNaN(t1)) {
      var t2 = a0 / (a2 * t1);
      if (t1 < 0 || t1 > 1) {
        if (t2 < 0 || t2 > 1 || isNaN(t2)) {
          t = null;
        } else {
          t = t2;
        }
      } else {
        if (t2 < 0 || t2 > 1 || isNaN(t2)) {
          t = t1;
        } else {
          t = Math.min(t1, t2);
        }
      }
    }

    if (t === null) {
      return null;
    } else {
      var r = (1 - t) * r1 + t * r2;
      var s = (1 - t) * s1 + t * s2;
      var p = new _Vec2D.Vec2D((1 - t) * p1.x + t * p2.x, (1 - t) * p1.y + t * p2.y);
      var q = new _Vec2D.Vec2D((1 - t) * q1.x + t * q2.x, (1 - t) * q1.y + t * q2.y);
      var wp = s / (r + s);
      var wq = r / (r + s);
      return new _Vec2D.Vec2D(wp * p.x + wq * q.x, wp * p.y + wq * q.y);
    }
  }
}

// computes the first point of collision between:
//  - sweeping circle, going from p1 with radius r1 to p2 with radius r2
//  - fixed AABB with bottom left point bl and top right point tr
function sweepCircleVsAABB(p1, r1, p2, r2, bl, tr) {
  var br = new _Vec2D.Vec2D(tr.x, bl.y);
  var tl = new _Vec2D.Vec2D(bl.x, tr.y);
  if ((0, _detectIntersections.distanceToPolygon)(p1, [bl, br, tr, tl]) <= r1) {
    return p1;
  } else if (p1.x + r1 < bl.x && p2.x + r2 < bl.x || p1.x - r1 > tr.x && p2.x - r2 > tr.x || p1.y + r1 < bl.y && p2.y + r2 < bl.y || p1.y - r1 > tr.y && p2.y - r2 > tr.y) {
    return null;
  } else {
    var checks = void 0;
    if (p1.x <= bl.x) {
      if (p1.y <= bl.y) {
        // bottom left corner
        checks = [{ case: "corner", corner: bl, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "corner", corner: tl, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "corner", corner: br, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "line", line1: (0, _environmentalCollision.vLineThrough)(bl), line2: [(0, _linAlg.add)(p1, new _Vec2D.Vec2D(r1, 0)), (0, _linAlg.add)(p2, new _Vec2D.Vec2D(r2, 0))] }, { case: "line", line1: (0, _environmentalCollision.hLineThrough)(bl), line2: [(0, _linAlg.add)(p1, new _Vec2D.Vec2D(0, r1)), (0, _linAlg.add)(p2, new _Vec2D.Vec2D(0, r2))] }];
      } else if (p1.y >= tr.y) {
        // top left corner
        checks = [{ case: "corner", corner: tl, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "corner", corner: bl, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "corner", corner: tr, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "line", line1: (0, _environmentalCollision.vLineThrough)(bl), line2: [(0, _linAlg.add)(p1, new _Vec2D.Vec2D(r1, 0)), (0, _linAlg.add)(p2, new _Vec2D.Vec2D(r2, 0))] }, { case: "line", line1: (0, _environmentalCollision.hLineThrough)(tr), line2: [(0, _linAlg.add)(p1, new _Vec2D.Vec2D(0, -r1)), (0, _linAlg.add)(p2, new _Vec2D.Vec2D(0, -r2))] }];
      } else {
        // left side
        checks = [{ case: "corner", corner: bl, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "corner", corner: tl, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "line", line1: (0, _environmentalCollision.vLineThrough)(bl), line2: [(0, _linAlg.add)(p1, new _Vec2D.Vec2D(r1, 0)), (0, _linAlg.add)(p2, new _Vec2D.Vec2D(r2, 0))] }];
      }
    } else if (p1.x >= tr.x) {
      if (p1.y <= bl.y) {
        // bottom right corner
        checks = [{ case: "corner", corner: br, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "corner", corner: bl, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "corner", corner: tr, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "line", line1: (0, _environmentalCollision.vLineThrough)(tr), line2: [(0, _linAlg.add)(p1, new _Vec2D.Vec2D(-r1, 0)), (0, _linAlg.add)(p2, new _Vec2D.Vec2D(-r2, 0))] }, { case: "line", line1: (0, _environmentalCollision.hLineThrough)(bl), line2: [(0, _linAlg.add)(p1, new _Vec2D.Vec2D(0, r1)), (0, _linAlg.add)(p2, new _Vec2D.Vec2D(0, r2))] }];
      } else if (p1.y >= tr.y) {
        // top right corner
        checks = [{ case: "corner", corner: tr, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "corner", corner: tl, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "corner", corner: br, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "line", line1: (0, _environmentalCollision.vLineThrough)(tr), line2: [(0, _linAlg.add)(p1, new _Vec2D.Vec2D(-r1, 0)), (0, _linAlg.add)(p2, new _Vec2D.Vec2D(-r2, 0))] }, { case: "line", line1: (0, _environmentalCollision.hLineThrough)(tr), line2: [(0, _linAlg.add)(p1, new _Vec2D.Vec2D(0, -r1)), (0, _linAlg.add)(p2, new _Vec2D.Vec2D(0, -r2))] }];
      } else {
        // right side
        checks = [{ case: "corner", corner: tr, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "corner", corner: br, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "line", line1: (0, _environmentalCollision.vLineThrough)(tr), line2: [(0, _linAlg.add)(p1, new _Vec2D.Vec2D(-r1, 0)), (0, _linAlg.add)(p2, new _Vec2D.Vec2D(-r2, 0))] }];
      }
    } else {
      if (p1.y <= bl.y) {
        // bottom side
        checks = [{ case: "corner", corner: bl, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "corner", corner: br, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "line", line1: (0, _environmentalCollision.hLineThrough)(bl), line2: [(0, _linAlg.add)(p1, new _Vec2D.Vec2D(0, r1)), (0, _linAlg.add)(p2, new _Vec2D.Vec2D(0, r2))] }];
      } else {
        // top side, all other cases have been ruled out
        checks = [{ case: "corner", corner: tl, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "corner", corner: tr, p1: p1, p2: p2, r1: r1, r2: r2 }, { case: "line", line1: (0, _environmentalCollision.hLineThrough)(tr), line2: [(0, _linAlg.add)(p1, new _Vec2D.Vec2D(0, -r1)), (0, _linAlg.add)(p2, new _Vec2D.Vec2D(0, -r2))] }];
      }
    }

    var first = (0, _findSmallestWithin.pickSmallestSweep)(checks.map(aabbChecker));
    if (first === null) {
      return null;
    } else {
      return first.point;
    }
  }
}

// this function computes the sweeping parameter and collision location between a sweeping circle and an AABB
// there are two cases:
//   - corner case: sweeping circle against corner of AABB
//   - line case: sweeping circle against edge of AABB, in which case it is a simple line-line intersection test
function aabbChecker(check) {
  if (check.case === "corner") {
    var c = check.corner;
    var _p = check.p1;
    var _p2 = check.p2;
    var _r = check.r1;
    var _r2 = check.r2;
    if ((0, _linAlg.euclideanDist)(c, _p) < _r) {
      return { sweep: 0, point: c };
    } else {
      var a0 = Math.pow(_p.x - c.x, 2) + Math.pow(_p.y - c.y, 2) - Math.pow(_r, 2);
      var a1 = -2 * ((_p.x - c.x) * (_p.x - _p2.x) + (_p.y - c.y) * (_p.y - _p2.y) - _r * (_r - _r2));
      var a2 = Math.pow(_p.x - _p2.x, 2) + Math.pow(_p.y - _p2.y, 2) - Math.pow(_r - _r2, 2);
      var t1 = (0, _solveQuadraticEquation.solveQuadraticEquation)(a0, a1, a2);

      var t = null;
      if (t1 !== null && !isNaN(t1)) {
        var t2 = a0 / (a2 * t1);
        if (t1 < 0 || t1 > 1) {
          if (t2 < 0 || t2 > 1 || isNaN(t2)) {
            t = null;
          } else {
            t = t2;
          }
        } else {
          if (t2 < 0 || t2 > 1 || isNaN(t2)) {
            t = t1;
          } else {
            t = Math.min(t1, t2);
          }
        }
      }

      if (t === null) {
        return null;
      } else {
        return { sweep: t, point: c };
      }
    }
  } else {
    var p = check.line1[0];
    var q = check.line1[1];
    var s = (0, _environmentalCollision.coordinateInterceptParameter)(check.line2, check.line1);
    if (s < 0 || s > 1 || isNaN(s) || s === Infinity) {
      return null;
    } else {
      var pt = new _Vec2D.Vec2D((1 - s) * p.x + s * q.x, (1 - s) * p.y + s * q.y);
      if (pt.x < Math.min(check.line2[0].x, check.line2[1].x) || pt.x > Math.max(check.line2[0].x, check.line2[1].x) || pt.y < Math.min(check.line2[0].y, check.line2[1].y) || pt.y > Math.max(check.line2[0].y, check.line2[1].y)) {
        return null;
      } else {
        return { sweep: s, point: pt };
      }
    }
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/physics/interpolatedCollision.js
// module id = 239
// module chunks = 1
//# sourceURL=webpack:///./src/physics/interpolatedCollision.js?