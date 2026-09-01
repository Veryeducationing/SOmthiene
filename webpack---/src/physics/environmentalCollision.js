"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smallestECBHeight = exports.smallestECBWidth = exports.additionalOffset = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
/*eslint indent:0*/ // get stuffed

exports.hLineThrough = hLineThrough;
exports.hLineAt = hLineAt;
exports.vLineThrough = vLineThrough;
exports.vLineAt = vLineAt;
exports.lineThrough = lineThrough;
exports.outwardsWallNormal = outwardsWallNormal;
exports.coordinateInterceptParameter = coordinateInterceptParameter;
exports.coordinateIntercept = coordinateIntercept;
exports.findCollision = findCollision;
exports.getSameAndOther = getSameAndOther;
exports.moveAlongGround = moveAlongGround;
exports.groundedECBSquashFactor = groundedECBSquashFactor;
exports.runCollisionRoutine = runCollisionRoutine;

var _Vec2D = __webpack_require__(22);

var _linAlg = __webpack_require__(29);

var _findSmallestWithin = __webpack_require__(30);

var _solveQuadraticEquation = __webpack_require__(31);

var _lineAngle = __webpack_require__(32);

var _extremePoint = __webpack_require__(33);

var _ecbTransform = __webpack_require__(34);

var _zipLabels = __webpack_require__(35);

var _drawECB = __webpack_require__(36);

// eslint-disable-next-line no-duplicate-imports

// eslint-disable-next-line no-duplicate-imports

// eslint-disable-next-line no-duplicate-imports
var additionalOffset = exports.additionalOffset = 0.00001;
var smallestECBWidth = exports.smallestECBWidth = 1.95;
var smallestECBHeight = exports.smallestECBHeight = 1.95;
var maxRecursion = 6;

// -----------------------------------------------------
// various utility functions

// horizontal line through a point
function hLineThrough(point) {
  return [point, new _Vec2D.Vec2D(point.x + 1, point.y)];
};

function hLineAt(y) {
  return hLineThrough(new _Vec2D.Vec2D(0, y));
}

// vertical line through a point
function vLineThrough(point) {
  return [point, new _Vec2D.Vec2D(point.x, point.y + 1)];
};

function vLineAt(x) {
  return vLineThrough(new _Vec2D.Vec2D(x, 0));
}

// either horizontal or vertical line through a point
function lineThrough(point, xOrY) {
  if (xOrY === "x") {
    return hLineThrough(point);
  } else {
    return vLineThrough(point);
  }
};

// next ECB point index, counterclockwise or clockwise (with respect to the ECB)
function turn(number) {
  var counterclockwise = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (counterclockwise) {
    if (number === 3) {
      return 0;
    } else {
      return number + 1;
    }
  } else {
    if (number === 0) {
      return 3;
    } else {
      return number - 1;
    }
  }
};

function outwardsWallNormal(wallBottomOrLeft, wallTopOrRight, wallType) {
  var sign = 1;
  switch (wallType) {
    case "l": // left wall
    case "g": // ground
    case "b":
    case "d":
    case "p":
      // platform
      sign = -1;
      break;
    default:
      // right wall, ceiling
      break;
  }
  return new _Vec2D.Vec2D(sign * (wallTopOrRight.y - wallBottomOrLeft.y), sign * (wallBottomOrLeft.x - wallTopOrRight.x));
}

// returns true if the vector is moving into the wall, false otherwise
// need to be careful that arguments 2 and 3 are given in the correct order to get the expected result
function movingInto(vec, wallTopOrRight, wallBottomOrLeft, wallType) {
  return (0, _linAlg.dotProd)(vec, outwardsWallNormal(wallBottomOrLeft, wallTopOrRight, wallType)) < 0;
};

// returns true if point is to the right of a "left" wall, or to the left of a "right" wall,
// and false otherwise
function isOutside(point, wallTopOrRight, wallBottomOrLeft, wallType) {
  //const vec = new Vec2D ( point.x - wallBottom.x, point.y - wallBottom.y );
  //return ( !movingInto(vec, wallTop, wallBottom, wallType ) );
  return !movingInto(new _Vec2D.Vec2D(point.x - wallBottomOrLeft.x, point.y - wallBottomOrLeft.y), wallTopOrRight, wallBottomOrLeft, wallType);
};

// say line1 passes through the two points p1 = (x1,y1), p2 = (x2,y2)
// and line2 by the two points p3 = (x3,y3) and p4 = (x4,y4)
// this function returns the parameter t, such that p3 + t*(p4-p3) is the intersection point of the two lines
// please ensure this function is not called on parallel lines
function coordinateInterceptParameter(line1, line2) {
  // const x1 = line1[0].x;
  // const x2 = line1[1].x;
  // const x3 = line2[0].x;
  // const x4 = line2[1].x;
  // const y1 = line1[0].y;
  // const y2 = line1[1].y;
  // const y3 = line2[0].y;
  // const y4 = line2[1].y;
  // const t = ( (x1-x3)*(y2-y1) + (x1-x2)*(y1-y3) ) / ( (x4-x3)*(y2-y1) + (x2-x1)*(y3-y4) );
  // return t;
  return ((line1[0].x - line2[0].x) * (line1[1].y - line1[0].y) + (line1[0].x - line1[1].x) * (line1[0].y - line2[0].y)) / ((line2[1].x - line2[0].x) * (line1[1].y - line1[0].y) + (line1[1].x - line1[0].x) * (line2[0].y - line2[1].y));
};

// find the intersection of two lines
// please ensure this function is not called on parallel lines
function coordinateIntercept(line1, line2) {
  var t = coordinateInterceptParameter(line1, line2);
  return new _Vec2D.Vec2D(line2[0].x + t * (line2[1].x - line2[0].x), line2[0].y + t * (line2[1].y - line2[0].y));
};

// ----------------------------------------------------------------------------------------------------------------------------------
// basic collision detection functions

// first: point sweeping functions

// finds whether the ECB impacted a surface on one of its vertices
function runPointSweep(ecb1, ecbp, same, wall, wallType, wallIndex, wallBottomOrLeft, wallTopOrRight, xOrY) {

  var result = null;

  var wallAngle = (0, _lineAngle.lineAngle)([wallBottomOrLeft, wallTopOrRight]);

  if (wallType === "l" || wallType === "r") {
    // left or right wall, need to check top or bottom ECB vertex too
    var sameResult = pointSweepingCheck(ecb1, ecbp, same, wall, wallType, wallIndex, wallTopOrRight, wallBottomOrLeft, xOrY);
    var other = wallType === "l" && wallAngle < Math.PI / 2 || wallType === "r" && wallAngle > Math.PI / 2 ? 0 : 2;
    var otherResult = pointSweepingCheck(ecb1, ecbp, other, wall, wallType, wallIndex, wallTopOrRight, wallBottomOrLeft, xOrY);
    result = (0, _findSmallestWithin.pickSmallestSweep)([sameResult, otherResult]);
  } else if (wallType === "c") {
    // for ceilings, need to check side ECB vertex too
    var topResult = pointSweepingCheck(ecb1, ecbp, 2, wall, wallType, wallIndex, wallTopOrRight, wallBottomOrLeft, xOrY);
    var side = wallAngle < Math.PI / 2 ? 3 : 1;
    var sideResult = pointSweepingCheck(ecb1, ecbp, side, wall, wallType, wallIndex, wallTopOrRight, wallBottomOrLeft, xOrY);
    result = (0, _findSmallestWithin.pickSmallestSweep)([topResult, sideResult]);
  } else {
    // can only collide grounds on the bottom ECB vertex
    result = pointSweepingCheck(ecb1, ecbp, same, wall, wallType, wallIndex, wallTopOrRight, wallBottomOrLeft, xOrY);
  }

  return result;
};

function pointSweepingCheck(ecb1, ecbp, pt, wall, wallType, wallIndex, wallTopOrRight, wallBottomOrLeft, xOrY) {
  var result = null;

  if (isOutside(ecb1[pt], wallTopOrRight, wallBottomOrLeft, wallType) && !isOutside(ecbp[pt], wallTopOrRight, wallBottomOrLeft, wallType)) {
    var s = coordinateInterceptParameter(wall, [ecb1[pt], ecbp[pt]]); // need to put wall first
    if (!(isNaN(s) || s === Infinity || s > 1 || s < 0)) {
      var intersection = new _Vec2D.Vec2D((1 - s) * ecb1[pt].x + s * ecbp[pt].x, (1 - s) * ecb1[pt].y + s * ecbp[pt].y);
      if ((0, _Vec2D.getXOrYCoord)(intersection, xOrY) <= (0, _Vec2D.getXOrYCoord)(wallTopOrRight, xOrY) && (0, _Vec2D.getXOrYCoord)(intersection, xOrY) >= (0, _Vec2D.getXOrYCoord)(wallBottomOrLeft, xOrY)) {
        result = { sweep: s, kind: "surface", surface: wall, type: wallType, index: wallIndex, pt: pt };
      }
    }
  }

  return result;
};

// second: edge sweeping functions

// in this next function, we are considering a line that is sweeping,
// from the initial line 'line1' passing through the two points p1 = (x1,y1), p2 = (x2,y2)
// to the final line 'line2' passing through the two points p3 = (x3,y3) and p4 = (x4,y4)
// there are two sweeping parameters: 
//   't', which indicates how far along each line we are
//   's', which indicates how far we are sweeping between line1 and line2 (the main sweeping parameter)
// for instance:
//  s=0 means we are on line1,
//  s=1 means we are on line2,
//  t=0 means we are on the line between p1 and p3,
//  t=1 means we are on the line between p2 and p4
// this function returns a specific value for each of t and s,
// which correspond to when the swept line hits the origin O (at coordinates (0,0))
// if either of the parameters is not between 0 and 1, this function instead returns null
// see '/doc/linesweep.png' for a visual representation of the situation
function lineSweepParameters(line1, line2) {
  var flip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var sign = 1;
  if (flip) {
    sign = -1;
  }
  var x1 = line1[0].x;
  var x2 = line1[1].x;
  var x3 = line2[0].x;
  var x4 = line2[1].x;
  var y1 = line1[0].y;
  var y2 = line1[1].y;
  var y3 = line2[0].y;
  var y4 = line2[1].y;

  var a0 = x2 * y1 - x1 * y2;
  var a1 = x4 * y1 - 2 * x2 * y1 + 2 * x1 * y2 - x3 * y2 + x2 * y3 - x1 * y4;
  var a2 = x2 * y1 - x4 * y1 - x1 * y2 + x3 * y2 - x2 * y3 + x4 * y3 + x1 * y4 - x3 * y4;

  // s satisfies the equation:   a0 + a1*s + a2*s^2 = 0
  var s = (0, _solveQuadraticEquation.solveQuadraticEquation)(a0, a1, a2, sign);

  if (s === null || isNaN(s) || s === Infinity || s < 0 || s > 1) {
    return null; // no real solution
  } else {
    var t = (s * (x1 - x3) - x1) / (x2 - x1 + s * (x1 - x2 - x3 + x4));

    if (isNaN(t) || t === Infinity || t < 0 || t > 1) {
      return null;
    } else {
      return [t, s];
    }
  }
};

// finds whether the ECB impacted a surface on one of its edges
function runEdgeSweep(ecb1, ecbp, same, wallType, wallLeft, wallRight, wallBottomOrLeft, wallTopOrRight, xOrY, damageType) {

  var other = 0; // other ECB point
  var counterclockwise = true; // whether (same ECB point -> other ECB point) is counterclockwise (w.r.t. the ECB)

  var corner = null;
  var otherCorner = null;

  var edgeSweepResult = null;
  var otherEdgeSweepResult = null;

  var flip = wallType === "r" || wallType === "c" ? false : true;

  // case 1
  if ((0, _Vec2D.getXOrYCoord)(ecb1[same], xOrY) > (0, _Vec2D.getXOrYCoord)(wallTopOrRight, xOrY)) {
    counterclockwise = !flip;
    other = turn(same, counterclockwise);
    if ((0, _Vec2D.getXOrYCoord)(ecbp[other], xOrY) < (0, _Vec2D.getXOrYCoord)(wallTopOrRight, xOrY)) {
      corner = wallTopOrRight;
    }
  }

  // case 2
  else if ((0, _Vec2D.getXOrYCoord)(ecb1[same], xOrY) < (0, _Vec2D.getXOrYCoord)(wallBottomOrLeft, xOrY)) {
      counterclockwise = flip;
      other = turn(same, counterclockwise);
      if ((0, _Vec2D.getXOrYCoord)(ecbp[other], xOrY) > (0, _Vec2D.getXOrYCoord)(wallBottomOrLeft, xOrY)) {
        corner = wallBottomOrLeft;
      }
    }

  if (corner !== null) {
    // the relevant ECB edge, that might collide with the corner, is the edge between ECB points 'same' and 'other'
    var interiorECBside = "l";
    if (counterclockwise === false) {
      interiorECBside = "r";
    }

    if (!isOutside(corner, ecbp[same], ecbp[other], interiorECBside) && isOutside(corner, ecb1[same], ecb1[other], interiorECBside)) {
      edgeSweepResult = edgeSweepingCheck(ecb1, ecbp, same, other, counterclockwise, corner, damageType);
    }
  }

  if ((wallType === "l" || wallType === "r") && other === 0) {
    // if dealing with a wall, we might also want to check the top ECB point for collision if we aren't already doing so
    var otherCounterclockwise = false; // whether ( same ECB point -> top ECB point) is counterclockwise
    otherCorner = wallRight;
    if (wallType === "l") {
      otherCounterclockwise = true;
      otherCorner = wallLeft;
    }

    var otherInteriorECBside = "l";
    if (otherCounterclockwise === false) {
      otherInteriorECBside = "r";
    }

    if (!isOutside(otherCorner, ecbp[same], ecbp[2], otherInteriorECBside) && isOutside(otherCorner, ecb1[same], ecb1[2], otherInteriorECBside)) {
      otherEdgeSweepResult = edgeSweepingCheck(ecb1, ecbp, same, 2, otherCounterclockwise, otherCorner, damageType);
    }
  }

  return (0, _findSmallestWithin.pickSmallestSweep)([edgeSweepResult, otherEdgeSweepResult]);
};

// determines whether the given ECB edge (same--other) has collided with the corner, using the lineSweepParameters function
function edgeSweepingCheck(ecb1, ecbp, same, other, counterclockwise, corner, damageType) {

  var output = null;

  // the relevant ECB edge, that might collide with the corner, is the edge between ECB points 'same' and 'other'
  var interiorECBside = "l";
  if (counterclockwise === false) {
    interiorECBside = "r";
  }

  if (!isOutside(corner, ecbp[same], ecbp[other], interiorECBside) && isOutside(corner, ecb1[same], ecb1[other], interiorECBside)) {

    // we sweep a line,
    // starting from the relevant ECB1 edge, and ending at the relevant ECBp edge,
    // and figure out where this would intersect the corner

    // first we recenter everything around the corner,
    // as the 'lineSweepParameters' function calculates collision with respect to the origin

    var recenteredECB1Edge = [new _Vec2D.Vec2D(ecb1[same].x - corner.x, ecb1[same].y - corner.y), new _Vec2D.Vec2D(ecb1[other].x - corner.x, ecb1[other].y - corner.y)];
    var recenteredECBpEdge = [new _Vec2D.Vec2D(ecbp[same].x - corner.x, ecbp[same].y - corner.y), new _Vec2D.Vec2D(ecbp[other].x - corner.x, ecbp[other].y - corner.y)];

    // in the line sweeping, some tricky orientation checks show that a minus sign is required precisely in the counterclockwise case
    // this is what the third argument to 'lineSweepParameters' corresponds to
    var lineSweepResult = lineSweepParameters(recenteredECB1Edge, recenteredECBpEdge, counterclockwise);

    if (lineSweepResult !== null) {
      var _lineSweepResult = _slicedToArray(lineSweepResult, 2),
          t = _lineSweepResult[0],
          s = _lineSweepResult[1];

      var angularParameter = getAngularParameter(t, same, other);
      output = { kind: "corner", corner: corner, sweep: s, angular: angularParameter, damageType: damageType };
    }
  }

  return output;
};

// ----------------------------------------------------------------------------------------------------------------------------------
// main collision detection routine

// this function finds the first collision that happens as the old ECB moves to the projected ECB
// the sweeping parameter s corresponds to the location of this first collision
// terminology in the comments: a wall is a segment with an inside and an outside (could be a ground or ceiling )
// which is contained in an infinite line, extending both ways, which also has an inside and an outside
function findCollision(ecb1, ecbp, labelledSurface) {

  // STANDING ASSUMPTIONS
  // the ECB can only collide a ground/platform surface on its bottom point (or a bottom edge)
  // the ECB can only collide a ceiling surface on a top or side point (or a top edge)
  // the ECB cannot collide a left wall on its left vertex
  // the ECB cannot collide a right wall on its right vertex
  var _labelledSurface = _slicedToArray(labelledSurface, 2),
      wall = _labelledSurface[0],
      _labelledSurface$ = _slicedToArray(_labelledSurface[1], 2),
      wallType = _labelledSurface$[0],
      wallIndex = _labelledSurface$[1];

  var damageType = wall[2] !== undefined ? wall[2].damageType : null;

  // start defining useful constants/variables
  var wallTop = (0, _extremePoint.extremePoint)(wall, "t");
  var wallBottom = (0, _extremePoint.extremePoint)(wall, "b");
  var wallLeft = (0, _extremePoint.extremePoint)(wall, "l");
  var wallRight = (0, _extremePoint.extremePoint)(wall, "r");

  // right wall by default
  var wallTopOrRight = wallTop;
  var wallBottomOrLeft = wallBottom;
  var same = 3;
  var xOrY = "y";
  var isPlatform = false;

  switch (wallType) {
    case "l":
      // left wall
      same = 1;
      break;
    case "p":
      // platform
      isPlatform = true;
    case "g":
      // ground
      same = 0;
      wallTopOrRight = wallRight;
      wallBottomOrLeft = wallLeft;
      xOrY = "x";
      break;
    case "c":
      // ceiling
      same = 2;
      wallTopOrRight = wallRight;
      wallBottomOrLeft = wallLeft;
      xOrY = "x";
      break;
    default:
      // right wall by default
      break;
  }

  // first check if player ECB was even near the wall
  if (ecbp[0].y > wallTop.y && ecb1[0].y > wallTop.y || // player ECB stayed above the wall
  ecbp[2].y < wallBottom.y && ecb1[2].y < wallBottom.y // played ECB stayed below the wall
  || ecbp[3].x > wallRight.x && ecb1[3].x > wallRight.x // player ECB stayed to the right of the wall
  || ecbp[1].x < wallLeft.x && ecb1[1].x < wallLeft.x // player ECB stayed to the left of the wall
  ) {
      return null;
    } else {

    // if the surface is a platform, and the bottom ECB point is below the platform, we shouldn't do anything
    if (isPlatform) {
      if (!isOutside(ecb1[same], wallTopOrRight, wallBottomOrLeft, wallType)) {
        return null;
      }
    }

    var closestEdgeCollision = runEdgeSweep(ecb1, ecbp, same, wallType, wallLeft, wallRight, wallBottomOrLeft, wallTopOrRight, xOrY, damageType);
    var closestPointCollision = runPointSweep(ecb1, ecbp, same, wall, wallType, wallIndex, wallBottomOrLeft, wallTopOrRight, xOrY, damageType);

    var finalCollision = null;

    // if we have only one collision type (point/edge), take that one
    if (closestEdgeCollision === null) {
      finalCollision = closestPointCollision;
    } else if (closestPointCollision === null) {
      finalCollision = closestEdgeCollision;
    }
    // otherwise choose the collision with smallest sweeping parameter
    else if (closestEdgeCollision.sweep > closestPointCollision.sweep) {
        finalCollision = closestPointCollision;
      } else {
        finalCollision = closestEdgeCollision;
      }

    return finalCollision;
  }
};

// ----------------------------------------------------------------------------------------------------------------------------------
// some helper functions to return the closest collision (collision with smallest sweeping parameter)

// this function finds the first (non-ignored) collision as the ECB1 moves to the ECBp
function findClosestCollision(ecb1, ecbp, labelledSurfaces) {
  var touchingData = [null]; // initialise list of new collisions
  var collisionData = labelledSurfaces.map(function (labelledSurface) {
    return findCollision(ecb1, ecbp, labelledSurface);
  });
  for (var i = 0; i < collisionData.length; i++) {
    var collisionDatum = collisionData[i];
    if (collisionDatum !== null) {
      if (collisionDatum.kind === "surface") {
        touchingData.push({
          sweep: collisionDatum.sweep, object: {
            kind: "surface",
            surface: collisionDatum.surface,
            type: collisionDatum.type,
            index: collisionDatum.index,
            pt: collisionDatum.pt
          }
        });
      } else if (collisionDatum.kind === "corner") {
        touchingData.push({
          sweep: collisionDatum.sweep, object: {
            kind: "corner",
            corner: collisionDatum.corner,
            angular: collisionDatum.angular,
            damageType: collisionDatum.damageType
          }
        });
      }
    }
  }
  return (0, _findSmallestWithin.pickSmallestSweep)(touchingData);
};

// ----------------------------------------------------------------------------------------------------------------------------------
// ECB sliding
// we attempt to move the ECB1 to the ECBp, sliding it against surfaces/corners as it encounters them

function resolveECB(ecb1, ecbp, playerStatusInfo, labelledSurfaces) {
  return runSlideRoutine(ecb1, ecbp, ecbp, playerStatusInfo, labelledSurfaces, null, {
    type: null,
    angular: null
  }, false, true, 0);
}

function runSlideRoutine(srcECB, tgtECB, ecbp, playerStatusInfo, labelledSurfaces, oldTouchingDatum, slidingAgainst, squashed, final, recursionCounter) {
  var output = void 0;
  if (recursionCounter > maxRecursion) {
    console.log("'runSlideRoutine': excessive recursion, aborting.");
    (0, _drawECB.drawECB)(srcECB, "#286ee0");
    (0, _drawECB.drawECB)(tgtECB, "#f49930");
    (0, _drawECB.drawECB)(ecbp, "#fff9ad");
    output = { ecb: srcECB, touching: null, squashed: squashed };
  } else {
    var slideDatum = slideECB(srcECB, tgtECB, labelledSurfaces, slidingAgainst, playerStatusInfo);
    var newECBp = ecbp;

    if (slideDatum.event === "end") {
      output = { ecb: slideDatum.finalECB, touching: slideDatum.touching, squashed: squashed };
    } else if (slideDatum.event === "continue") {
      if (final) {
        output = { ecb: tgtECB, touching: oldTouchingDatum, squashed: squashed };
      } else {
        newECBp = updateECBp(srcECB, tgtECB, ecbp, slidingAgainst.type, 0);
        output = runSlideRoutine(tgtECB, newECBp, newECBp, playerStatusInfo, labelledSurfaces, oldTouchingDatum, slidingAgainst, squashed, true, recursionCounter + 1);
      }
    } else {
      // slideDatum.event === "transfer" || slideDatum.event === "squash"
      var newSrcECB = slideDatum.midECB;
      var slideObject = slideDatum.object;

      var newTouchingDatum = void 0;
      var _angular = void 0;
      var newFinal = void 0;
      var newTgtECB = void 0;
      var newSlidingType = null;
      var same = void 0;
      var other = void 0;

      if (slideObject.kind === "surface") {
        var _surface = slideObject.surface;
        var surfaceType = slideObject.type;
        if (surfaceType === "l" || surfaceType === "r" || surfaceType === "c") {
          newSlidingType = surfaceType;
        }
        same = surfaceType === "l" ? 1 : 3;
        _angular = slideObject.pt;
        newECBp = updateECBp(srcECB, slideDatum.midECB, ecbp, newSlidingType, same);
        newTouchingDatum = { kind: "surface", type: surfaceType, index: slideObject.index, pt: _angular };

        var _findNextTargetFromSu = findNextTargetFromSurface(newSrcECB, newECBp, _surface, surfaceType, _angular);

        var _findNextTargetFromSu2 = _slicedToArray(_findNextTargetFromSu, 2);

        newTgtECB = _findNextTargetFromSu2[0];
        newFinal = _findNextTargetFromSu2[1];
      } else {
        var _corner = slideObject.corner;
        _angular = slideObject.angular;
        if (_angular < 2 && _angular > 0) {
          newSlidingType = "l";
        } else if (_angular > 2) {
          newSlidingType = "r";
        }

        var _getSameAndOther = getSameAndOther(_angular);

        var _getSameAndOther2 = _slicedToArray(_getSameAndOther, 2);

        same = _getSameAndOther2[0];
        other = _getSameAndOther2[1];

        newECBp = updateECBp(srcECB, slideDatum.midECB, ecbp, newSlidingType, same);

        var _findNextTargetFromCo = findNextTargetFromCorner(newSrcECB, newECBp, _corner, _angular);

        var _findNextTargetFromCo2 = _slicedToArray(_findNextTargetFromCo, 2);

        newTgtECB = _findNextTargetFromCo2[0];
        newFinal = _findNextTargetFromCo2[1];

        newTouchingDatum = { kind: "corner", angular: _angular };
      }

      if (slideDatum.event === "transfer") {
        output = runSlideRoutine(newSrcECB, newTgtECB, newECBp, playerStatusInfo, labelledSurfaces, newTouchingDatum, {
          type: newSlidingType,
          angular: _angular
        }, squashed, newFinal, recursionCounter + 1);
      } else {
        var otherTgtECB = slideDatum.tgtECB;

        var _agreeOnTargetECB = agreeOnTargetECB(newSrcECB, otherTgtECB, newTgtECB, newECBp, same, playerStatusInfo.grounded),
            _agreeOnTargetECB2 = _slicedToArray(_agreeOnTargetECB, 2),
            squashTgtECB = _agreeOnTargetECB2[0],
            abort = _agreeOnTargetECB2[1];

        if (abort) {
          output = { ecb: srcECB, touching: oldTouchingDatum, squashed: squashed };
        } else {
          output = runSlideRoutine(newSrcECB, squashTgtECB, newECBp, playerStatusInfo, labelledSurfaces, newTouchingDatum, {
            type: newSlidingType,
            angular: _angular
          }, true, newFinal && final, recursionCounter + 1);
        }
      }
    }
  }
  return output;
};

// this function figures out if we can move the ECB, from the source ECB to the target ECB
function slideECB(srcECB, tgtECB, labelledSurfaces, slidingAgainst, playerStatusInfo) {
  var output = void 0;

  // figure our whether a collision occured while moving srcECB -> tgtECB
  var touchingDatum = findClosestCollision(srcECB, tgtECB, labelledSurfaces);

  if (touchingDatum === null) {
    //console.log("'slideECB': sliding.");
    output = { event: "continue" };
  } else {
    var s = touchingDatum.sweep;
    var r = Math.max(0, s - additionalOffset / 10); // to account for floating point errors
    var _midECB = (0, _ecbTransform.interpolateECB)(srcECB, tgtECB, r);
    var collisionObject = touchingDatum.object;

    // ------------------------------------------------------------------------------------------------------------------------------
    // damaging objects cause premature end to sliding

    var _damageType = null;
    if (!playerStatusInfo.immune) {
      if (collisionObject.kind === "surface") {
        var surfaceProperties = collisionObject.surface[2];
        if (surfaceProperties !== null && surfaceProperties !== undefined) {
          _damageType = surfaceProperties.damageType;
        }
      } else if (collisionObject.kind === "corner") {
        _damageType = collisionObject.damageType;
      }
    }

    if (_damageType !== null && _damageType !== undefined) {
      if (collisionObject.kind === "surface") {
        //console.log("'slideECB': sliding interrupted by collision with damaging surface.");
        output = {
          event: "end",
          finalECB: _midECB,
          touching: {
            kind: "surface",
            type: collisionObject.type,
            index: collisionObject.index,
            pt: collisionObject.pt,
            damageType: _damageType
          }
        };
      } else {
        //console.log("'slideECB': sliding interrupted by collision with damaging corner.");
        output = {
          event: "end",
          finalECB: _midECB,
          touching: {
            kind: "corner",
            angular: collisionObject.angular,
            damageType: _damageType
          }
        };
      }
    }

    // ------------------------------------------------------------------------------------------------------------------------------

    else if (slidingAgainst.type === null) {
        if (collisionObject.kind === "surface") {
          if (collisionObject.type === "g" || collisionObject.type === "p") {
            //console.log("'slideECB': sliding interrupted by landing.");
            output = {
              event: "end",
              finalECB: _midECB,
              touching: {
                kind: "surface",
                type: collisionObject.type,
                index: collisionObject.index,
                pt: collisionObject.pt
              }
            };
          } else {
            //console.log("'slideECB': beginning slide on surface.");
            output = {
              event: "transfer",
              midECB: _midECB,
              object: {
                kind: "surface",
                surface: collisionObject.surface,
                type: collisionObject.type,
                pt: collisionObject.pt,
                index: collisionObject.index
              }
            };
          }
        } else {
          //console.log("'slideECB': beginning slide on corner.");
          output = {
            event: "transfer",
            midECB: _midECB,
            object: {
              kind: "corner",
              corner: collisionObject.corner,
              angular: collisionObject.angular
            }
          };
        }
      } else {
        var slidingType = slidingAgainst.type;
        if (collisionObject.kind === "surface") {
          var surfaceType = collisionObject.type;
          if (surfaceType === slidingType) {
            //console.log("'slideECB': transferring slide to new surface.");
            output = {
              event: "transfer",
              midECB: _midECB,
              object: {
                kind: "surface",
                surface: collisionObject.surface,
                type: collisionObject.type,
                pt: collisionObject.pt,
                index: collisionObject.index
              }
            };
          } else if (slidingType === "c" || surfaceType === "c" || surfaceType === "g" || surfaceType === "p") {
            // no way to continue when one of the involved surfaces is a ceiling or a ground
            //console.log("'slideECB': interrupting sliding because of conflicting surface collision.");
            output = {
              event: "end",
              finalECB: _midECB,
              touching: {
                kind: "surface",
                type: collisionObject.type,
                index: collisionObject.index,
                pt: collisionObject.pt
              }
            };
          } else {
            //console.log("'slideECB': beginning ECB squashing because of conflicting horizontal surface pushout.");
            output = {
              event: "squash",
              midECB: _midECB,
              tgtECB: tgtECB,
              object: collisionObject,
              pt: collisionObject.pt
            };
          }
        } else {
          var angularParameter = collisionObject.angular;
          var side = getSameAndOther(angularParameter)[0];
          if (slidingType === "c") {
            //console.log("'slideECB': interrupting sliding because of conflicting corner collision.");
            output = {
              event: "end",
              finalECB: _midECB,
              touching: {
                kind: "corner",
                angular: angularParameter
              }
            };
          } else if (slidingType === null || side === 3 && slidingType === "r" || side === 1 && slidingType === "l") {
            //console.log("'slideECB': transferring slide to new corner.");
            output = {
              event: "transfer",
              midECB: _midECB, object: {
                kind: "corner",
                corner: collisionObject.corner,
                angular: angularParameter
              }
            };
          } else {
            //console.log("'slideECB': beginning ECB squashing because of conflicting horizontal corner pushout.");
            output = {
              event: "squash",
              midECB: _midECB,
              tgtECB: tgtECB,
              side: side,
              object: collisionObject
            };
          }
        }
      }
  }
  return output;
};

function findNextTargetFromSurface(srcECB, ecbp, wall, wallType, pt) {
  var wallForward = void 0;
  var s = 1;
  var tgtECB = ecbp;
  var pushout = 0;
  var final = true;

  var sign = wallType === "l" || wallType === "c" ? -1 : 1;
  var additionalPushout = sign * additionalOffset;
  var xOrY = wallType === "l" || wallType === "r" ? "x" : "y";

  if (wallType === "c") {
    var wallLeft = (0, _extremePoint.extremePoint)(wall, "l");
    var wallRight = (0, _extremePoint.extremePoint)(wall, "r");
    if (ecbp[pt].x <= wallRight.x && ecbp[pt].x >= wallLeft.x) {
      var intercept = coordinateIntercept(vLineThrough(ecbp[pt]), wall);
      pushout = intercept.y - ecbp[pt].y;
    } else {
      wallForward = ecbp[pt].x < srcECB[pt].x ? wallLeft : wallRight;
      s = (wallForward.x - srcECB[pt].x) / (ecbp[pt].x - srcECB[pt].x);
      s = Math.min(Math.max(s, 0), 1);
      tgtECB = (0, _ecbTransform.interpolateECB)(srcECB, ecbp, s);
      pushout = wallForward.y - tgtECB[pt].y;
    }
  } else {
    var wallBottom = (0, _extremePoint.extremePoint)(wall, "b");
    var wallTop = (0, _extremePoint.extremePoint)(wall, "t");
    if (ecbp[pt].y <= wallTop.y && ecbp[pt].y >= wallBottom.y) {
      var _intercept = coordinateIntercept(hLineThrough(ecbp[pt]), wall);
      pushout = _intercept.x - ecbp[pt].x;
    } else {
      wallForward = ecbp[pt].y < srcECB[pt].y ? wallBottom : wallTop;
      s = (wallForward.y - srcECB[pt].y) / (ecbp[pt].y - srcECB[pt].y);
      s = Math.min(Math.max(s, 0), 1);
      tgtECB = (0, _ecbTransform.interpolateECB)(srcECB, ecbp, s);
      pushout = wallForward.x - tgtECB[pt].x;
    }
  }

  if (s < 1 || sign * pushout < 0) {
    final = false;
  }

  tgtECB = (0, _ecbTransform.moveECB)(tgtECB, (0, _Vec2D.putXOrYCoord)(pushout + additionalPushout, xOrY));

  (0, _drawECB.drawECB)(ecbp, "#8f54ff");
  (0, _drawECB.drawECB)(tgtECB, "#35f4ab");

  return [tgtECB, final];
};

function findNextTargetFromCorner(srcECB, ecbp, corner, angularParameter) {
  var _getSameAndOther3 = getSameAndOther(angularParameter),
      _getSameAndOther4 = _slicedToArray(_getSameAndOther3, 2),
      same = _getSameAndOther4[0],
      other = _getSameAndOther4[1];

  var LRSign = same === 1 ? -1 : 1;
  var UDSign = other === 2 ? -1 : 1;
  var additionalPushout = LRSign * additionalOffset;

  var tgtECB = ecbp;
  var s = 1;
  var pushout = 0;
  var final = true;

  if (UDSign * ecbp[same].y < UDSign * corner.y) {
    s = (corner.y - srcECB[same].y) / (ecbp[same].y - srcECB[same].y);
    s = Math.min(Math.max(s, 0), 1);
    tgtECB = (0, _ecbTransform.interpolateECB)(srcECB, ecbp, s);
    pushout = corner.x - tgtECB[same].x;
  } else if (UDSign * ecbp[other].y < UDSign * corner.y) {
    var intercept = coordinateIntercept(hLineThrough(corner), [ecbp[same], ecbp[other]]);
    pushout = corner.x - intercept.x + additionalPushout;
  } else {
    s = (corner.y - srcECB[other].y) / (ecbp[other].y - srcECB[other].y);
    s = Math.min(Math.max(s, 0), 1);
    tgtECB = (0, _ecbTransform.interpolateECB)(srcECB, ecbp, s);
    pushout = corner.x - tgtECB[other].x;
  }

  if (s < 1 || LRSign * pushout < 0) {
    final = false;
  }

  tgtECB = (0, _ecbTransform.moveECB)(tgtECB, (0, _Vec2D.putXOrYCoord)(pushout + additionalPushout, "x"));

  (0, _drawECB.drawECB)(ecbp, "#1098c9");
  (0, _drawECB.drawECB)(tgtECB, "#5cbc12");

  return [tgtECB, final];
};

function updateECBp(startECB, endECB, ecbp, slidingType, pt) {
  if (slidingType === null) {
    return ecbp;
  } else {
    var xOrY = slidingType === "l" || slidingType === "r" ? "y" : "x";
    var t = void 0;
    if ((0, _Vec2D.getXOrYCoord)(ecbp[pt], xOrY) - (0, _Vec2D.getXOrYCoord)(startECB[pt], xOrY) === 0) {
      xOrY = xOrY === "x" ? "y" : "x";
      if ((0, _Vec2D.getXOrYCoord)(ecbp[pt], xOrY) - (0, _Vec2D.getXOrYCoord)(startECB[pt], xOrY) === 0) {
        t = 1;
      } else {
        t = ((0, _Vec2D.getXOrYCoord)(endECB[pt], xOrY) - (0, _Vec2D.getXOrYCoord)(startECB[pt], xOrY)) / ((0, _Vec2D.getXOrYCoord)(ecbp[pt], xOrY) - (0, _Vec2D.getXOrYCoord)(startECB[pt], xOrY));
      }
    } else {
      t = ((0, _Vec2D.getXOrYCoord)(endECB[pt], xOrY) - (0, _Vec2D.getXOrYCoord)(startECB[pt], xOrY)) / ((0, _Vec2D.getXOrYCoord)(ecbp[pt], xOrY) - (0, _Vec2D.getXOrYCoord)(startECB[pt], xOrY));
    }

    var _midECB2 = void 0;
    if (t <= 0) {
      _midECB2 = startECB;
    } else if (t >= 1) {
      _midECB2 = ecbp;
    } else {
      _midECB2 = (0, _ecbTransform.interpolateECB)(startECB, ecbp, t);
    }
    return [(0, _linAlg.add)(ecbp[0], (0, _linAlg.subtract)(endECB[0], _midECB2[0])), (0, _linAlg.add)(ecbp[1], (0, _linAlg.subtract)(endECB[1], _midECB2[1])), (0, _linAlg.add)(ecbp[2], (0, _linAlg.subtract)(endECB[2], _midECB2[2])), (0, _linAlg.add)(ecbp[3], (0, _linAlg.subtract)(endECB[3], _midECB2[3]))];
  }
};

// this function gets called when two walls (or corners) are trying to push horizontally in opposite directions
// this function computes a squashed ECB that will fit in between the two objects that are squeezing it
function agreeOnTargetECB(srcECB, fstTgtECB, sndTgtECB, ecbp, pt, grounded) {
  var output = void 0;

  var flipPt = pt === 1 ? 3 : 1;

  var _ref = Math.abs(fstTgtECB[pt].y - srcECB[pt].y) < Math.abs(sndTgtECB[flipPt].y - srcECB[flipPt].y) ? [fstTgtECB, sndTgtECB, pt] : [sndTgtECB, fstTgtECB, flipPt],
      _ref2 = _slicedToArray(_ref, 3),
      closestTgtECB = _ref2[0],
      furthestTgtECB = _ref2[1],
      same = _ref2[2];

  var diff = same === 1 ? 3 : 1;
  var otherTgtECB = void 0;
  if (furthestTgtECB[diff].y === srcECB[diff].y) {
    otherTgtECB = furthestTgtECB;
  } else {
    var t = (closestTgtECB[same].y - srcECB[same].y) / (furthestTgtECB[diff].y - srcECB[diff].y);
    if (t <= 0) {
      otherTgtECB = srcECB;
    } else if (t >= 1) {
      otherTgtECB = furthestTgtECB;
    } else {
      otherTgtECB = (0, _ecbTransform.interpolateECB)(srcECB, furthestTgtECB, t);
    }
  }

  var tgtECB = [new _Vec2D.Vec2D(0, 0), new _Vec2D.Vec2D(0, 0), new _Vec2D.Vec2D(0, 0), new _Vec2D.Vec2D(0, 0)]; // initialising
  var abort = void 0;
  var squashFactor = 1;

  var sign = Math.sign(closestTgtECB[same].x - closestTgtECB[diff].x);

  // ideally we would now squash the ECB, so that it has side points otherTgtECB[same] and closestTgtECB[diff]
  // however we can't do that if these points are too close together, or, even worse, have moved past eachother
  if (Math.abs(otherTgtECB[same].x - closestTgtECB[diff].x) > smallestECBWidth && Math.sign(otherTgtECB[same].x - closestTgtECB[diff].x) === sign) {
    if (Math.abs(otherTgtECB[same].x - closestTgtECB[diff].x) > Math.abs(closestTgtECB[same].x - closestTgtECB[diff].x)) {
      abort = false;
      console.log("'agreeOnTargetECB' warning: function called when no squashing was required.");
      output = [closestTgtECB, abort];
    } else {
      abort = false;
      squashFactor = (otherTgtECB[same].x - closestTgtECB[diff].x) / (closestTgtECB[same].x - closestTgtECB[diff].x);
      tgtECB[same] = new _Vec2D.Vec2D(otherTgtECB[same].x - sign * additionalOffset, otherTgtECB[same].y);
      tgtECB[diff] = new _Vec2D.Vec2D(closestTgtECB[diff].x + sign * additionalOffset, closestTgtECB[diff].y);
      tgtECB[2].y = tgtECB[same].y + squashFactor * (closestTgtECB[2].y - closestTgtECB[same].y);
      tgtECB[0].y = grounded ? srcECB[0].y : tgtECB[same].y + squashFactor * (closestTgtECB[0].y - closestTgtECB[same].y);
      tgtECB[2].x = (tgtECB[1].x + tgtECB[3].x) / 2;
      tgtECB[0].x = (tgtECB[1].x + tgtECB[3].x) / 2;
      output = [tgtECB, abort];
    }
  } else {
    // can't directly squash, so we need to find the closest allowable height

    var sameLine = [srcECB[same], otherTgtECB[same]];
    var diffLine = [srcECB[diff], closestTgtECB[diff]];
    var offsetDiffLine = [(0, _linAlg.add)(diffLine[0], new _Vec2D.Vec2D(sign * smallestECBWidth, 0)), (0, _linAlg.add)(diffLine[1], new _Vec2D.Vec2D(sign * smallestECBWidth, 0))];
    var intercept = coordinateIntercept(sameLine, offsetDiffLine);
    if (Math.abs(closestTgtECB[same].y - srcECB[same].y) >= Math.abs(intercept.y - srcECB[same].y)) {
      abort = true;
      tgtECB[same] = new _Vec2D.Vec2D(intercept.x + sign * additionalOffset, intercept.y);
      tgtECB[diff] = new _Vec2D.Vec2D(intercept.x - sign * smallestECBWidth - sign * additionalOffset, intercept.y);
      squashFactor = (tgtECB[same].x - tgtECB[diff].x) / (closestTgtECB[same].x - closestTgtECB[diff].x);
      tgtECB[2].y = tgtECB[same].y + squashFactor * (closestTgtECB[2].y - closestTgtECB[same].y);
      tgtECB[0].y = grounded ? srcECB[0].y : tgtECB[same].y + squashFactor * (closestTgtECB[0].y - closestTgtECB[same].y);
      tgtECB[2].x = (tgtECB[1].x + tgtECB[3].x) / 2;
      tgtECB[0].x = (tgtECB[1].x + tgtECB[3].x) / 2;
      output = [tgtECB, abort];
    } else {
      abort = false;
      squashFactor = (otherTgtECB[same].x - closestTgtECB[diff].x - 2 * sign * additionalOffset) / (closestTgtECB[same].x - closestTgtECB[diff].x);
      if (squashFactor >= 1) {
        output = [closestTgtECB, abort];
      } else {
        tgtECB[same] = new _Vec2D.Vec2D(otherTgtECB[same].x - sign * additionalOffset, otherTgtECB[same].y);
        tgtECB[diff] = new _Vec2D.Vec2D(closestTgtECB[diff].x + sign * additionalOffset, closestTgtECB[diff].y);
        tgtECB[2].y = tgtECB[same].y + squashFactor * (closestTgtECB[2].y - closestTgtECB[same].y);
        tgtECB[0].y = grounded ? srcECB[0].y : tgtECB[same].y + squashFactor * (closestTgtECB[0].y - closestTgtECB[same].y);
        tgtECB[2].x = (tgtECB[1].x + tgtECB[3].x) / 2;
        tgtECB[0].x = (tgtECB[1].x + tgtECB[3].x) / 2;
        output = [tgtECB, abort];
      }
    }
  }
  (0, _drawECB.drawECB)(tgtECB, "#f9482c");
  return output;
}

// ----------------------------------------------------------------------------------------------------------------------------------
// convert between angular parameters and "same/other" data

function getAngularParameter(t, same, other) {
  if (same === 3 && other === 0) {
    return (1 - t) * 3 + t * 4;
  } else if (same === 0 && other === 3) {
    return (1 - t) * 4 + t * 3;
  } else {
    return (1 - t) * same + t * other;
  }
};

function getSameAndOther(a) {
  if (a < 1) {
    return [1, 0];
  } else if (a < 2) {
    return [1, 2];
  } else if (a < 3) {
    return [3, 2];
  } else {
    return [3, 0];
  }
};

// ----------------------------------------------------------------------------------------------------------------------------------
// function to check whether grounded movement is permissible (no low ceilings)

function moveAlongGround(pos, posNext, ecbHeight, ground, ceilings) {
  if (pos.x === posNext.x) {
    return null;
  } else {
    var dir = posNext.x < pos.x ? "l" : "r";
    var groundLeft = (0, _extremePoint.extremePoint)(ground, "l");
    var groundRight = (0, _extremePoint.extremePoint)(ground, "r");
    if (dir === "l" && pos.x < groundLeft.x || dir === "r" && pos.x > groundRight.x) {
      return null;
    } else {
      var start = dir === "l" ? Math.min(pos.x, groundRight.x) : Math.max(pos.x, groundLeft.x);
      var end = dir === "l" ? Math.max(posNext.x, groundLeft.x) : Math.min(posNext.x, groundRight.x);

      var groundStart = coordinateIntercept(ground, vLineAt(start));
      var groundEnd = coordinateIntercept(ground, vLineAt(end));

      var startECB = (0, _ecbTransform.makeECB)(groundStart, additionalOffset, smallestECBHeight);
      var endECB = (0, _ecbTransform.makeECB)(groundEnd, additionalOffset, smallestECBHeight);

      var labelledCeilings = (0, _zipLabels.zipLabels)(ceilings, "c"); // should not recalculate this every time...
      var firstCeilingCollision = findClosestCollision(startECB, endECB, labelledCeilings);
      if (firstCeilingCollision === null) {
        if (ecbHeight > smallestECBHeight) {
          return null;
        } else {
          // do a second collision check, in case the player squeezed themselves into a location they should not have
          startECB = (0, _ecbTransform.makeECB)(groundStart, additionalOffset / 10, ecbHeight);
          endECB = (0, _ecbTransform.makeECB)(groundEnd, additionalOffset / 10, ecbHeight);
          firstCeilingCollision = findClosestCollision(startECB, endECB, labelledCeilings);
          if (firstCeilingCollision === null || firstCeilingCollision.object.kind === "corner") {
            return null;
          } else {
            var ceiling = firstCeilingCollision.object.surface;
            // find where to reposition the player by intersecting the offset ground with the ceiling
            var intercept = coordinateIntercept(ceiling, [(0, _linAlg.add)(groundStart, new _Vec2D.Vec2D(0, smallestECBHeight)), (0, _linAlg.add)(groundEnd, new _Vec2D.Vec2D(0, smallestECBHeight))]);
            /*
             if ((dir === "l" && intercept.x > pos.x) || (dir === "r" && intercept.x < pos.x)) {
             return pos.x;
             }
             else {
             return intercept.x;
             }
             */
            return intercept.x + (dir === "l" ? additionalOffset : -additionalOffset);
          }
        }
      } else {
        var s = firstCeilingCollision.sweep;
        return (1 - s) * pos.x + s * posNext.x + (dir === "l" ? additionalOffset : -additionalOffset);
      }
    }
  }
}

// ----------------------------------------------------------------------------------------------------------------------------------
// ECB squashing and re-inflating

// finds the ECB squash factor for a grounded ECB
function groundedECBSquashFactor(ecbTop, ecbBottom, ceilings) {
  var ceilingYValues = ceilings.map(function (ceil) {
    if (ecbTop.x < (0, _extremePoint.extremePoint)(ceil, "l").x || ecbTop.x > (0, _extremePoint.extremePoint)(ceil, "r").x) {
      return null;
    } else {
      return coordinateIntercept([ecbBottom, ecbTop], ceil).y;
    }
  });
  var lowestCeilingYValue = (0, _findSmallestWithin.findSmallestWithin)(ceilingYValues, ecbBottom.y, ecbTop.y);
  var offset = additionalOffset / 10;
  if (lowestCeilingYValue === null) {
    return null;
  } else {
    return Math.max(offset, (lowestCeilingYValue - ecbBottom.y) / (ecbTop.y - ecbBottom.y) - offset);
  }
};

// finds the ECB squash factor by inflating the ECB from the point on the ECB given by the angular parameter t
// if angular parameter is null, instead inflates the ECB from its center
function inflateECB(ecb, t, focus, relevantSurfaces) {
  var offset = additionalOffset / 10;
  var pointlikeECB = [new _Vec2D.Vec2D(focus.x, focus.y - offset), new _Vec2D.Vec2D(focus.x + offset, focus.y), new _Vec2D.Vec2D(focus.x, focus.y + offset), new _Vec2D.Vec2D(focus.x - offset, focus.y)];

  var closestCollision = findClosestCollision(pointlikeECB, ecb, relevantSurfaces);

  if (closestCollision === null) {
    return { location: t, factor: 1 };
  } else {
    var newLocation = t === null ? closestCollision.object.kind === "surface" ? closestCollision.object.pt : closestCollision.object.angular : t;
    return { location: newLocation, factor: Math.max(additionalOffset, closestCollision.sweep - additionalOffset) }; // ECB angular parameter, sweeping parameter
  }
}

function reinflateECB(ecb, position, relevantSurfaces, oldecbSquashDatum, grounded) {
  var q = 1;
  var angularParameter = oldecbSquashDatum.location;
  if (oldecbSquashDatum.factor < 1) {
    q = 1 / oldecbSquashDatum.factor + additionalOffset / 20;
    var focus = (0, _ecbTransform.ecbFocusFromAngularParameter)(ecb, angularParameter);
    var fullsizeecb = [new _Vec2D.Vec2D(q * ecb[0].x + (1 - q) * focus.x, q * ecb[0].y + (1 - q) * focus.y), new _Vec2D.Vec2D(q * ecb[1].x + (1 - q) * focus.x, q * ecb[1].y + (1 - q) * focus.y), new _Vec2D.Vec2D(q * ecb[2].x + (1 - q) * focus.x, q * ecb[2].y + (1 - q) * focus.y), new _Vec2D.Vec2D(q * ecb[3].x + (1 - q) * focus.x, q * ecb[3].y + (1 - q) * focus.y)];
    var ecbSquashDatum = inflateECB(fullsizeecb, angularParameter, focus, relevantSurfaces);
    var squashedecb = (0, _ecbTransform.squashECBAt)(fullsizeecb, { factor: ecbSquashDatum.factor, location: angularParameter });
    var newPosition = new _Vec2D.Vec2D(position.x + squashedecb[0].x - ecb[0].x, grounded ? position.y : position.y + squashedecb[0].y - ecb[0].y);
    var newAngular = ecbSquashDatum.location;
    (0, _drawECB.drawECB)(squashedecb, "#ffff00");
    return [newPosition, ecbSquashDatum, squashedecb];
  } else {
    return [position, { location: angularParameter, factor: 1 }, ecb];
  }
};

// ----------------------------------------------------------------------------------------------------------------------------------
// main collision routine

// recall: type PlayerStatusInfo = { grounded : bool, ignoringPlatforms : bool, immune : bool };

// this function initialises necessary data and then calls the main collision routine loop
function runCollisionRoutine(ecb1, ecbp, position, ecbSquashDatum, playerStatusInfo, stage) {

  // --------------------------------------------------------------
  // BELOW: this is recomputed every frame and should be avoided

  var stageWalls = (0, _zipLabels.zipLabels)(stage.wallL, "l").concat((0, _zipLabels.zipLabels)(stage.wallR, "r"));
  var stageGrounds = (0, _zipLabels.zipLabels)(stage.ground, "g");
  var stageCeilings = (0, _zipLabels.zipLabels)(stage.ceiling, "c");
  var stagePlatforms = (0, _zipLabels.zipLabels)(stage.platform, "p");

  // ABOVE: this is recomputed every frame and should be avoided
  // --------------------------------------------------------------

  var grounded = playerStatusInfo.grounded;

  var horizIgnore = "none"; // ignore no horizontal surfaces by default
  if (grounded) {
    horizIgnore = "all"; // ignore all horizontal surfaces when grounded
  } else {
    horizIgnore = playerStatusInfo.ignoringPlatforms ? "platforms" : "none";
  }

  var allSurfacesMinusPlatforms = stageWalls.concat(stageGrounds).concat(stageCeilings);
  var relevantSurfaces = [];
  switch (horizIgnore) {
    case "platforms":
      relevantSurfaces = stageWalls.concat(stageGrounds).concat(stageCeilings);
      break;
    case "none":
    default:
      relevantSurfaces = stageWalls.concat(stageGrounds).concat(stageCeilings).concat(stagePlatforms);
      break;
    case "all":
      relevantSurfaces = stageWalls;
      break;
  }

  var resolution = resolveECB(ecb1, ecbp, playerStatusInfo, relevantSurfaces);
  var newTouching = resolution.touching;
  var newECBp = resolution.ecb;
  var newSquashFactor = resolution.squashed ? Math.min(1, (newECBp[1].x - newECBp[3].x) / (ecbp[1].x - ecbp[3].x)) : 1;
  var newSquashLocation = null;
  if (newTouching !== null) {
    if (newTouching.kind === "surface") {
      newSquashLocation = newTouching.pt;
    } else {
      newSquashLocation = newTouching.angular;
    }
  }
  var newSquashDatum = { location: newSquashLocation, factor: newSquashFactor };
  newSquashDatum.factor *= ecbSquashDatum.factor;
  var newPosition = (0, _linAlg.subtract)((0, _linAlg.add)(position, newECBp[0]), ecbp[0]);

  if (newSquashDatum.factor < 1) {
    var squashingLocation = null;
    if (grounded) {
      squashingLocation = 0;
    }

    var _reinflateECB = reinflateECB(newECBp, newPosition, allSurfacesMinusPlatforms, { factor: newSquashDatum.factor, location: squashingLocation }, grounded);

    var _reinflateECB2 = _slicedToArray(_reinflateECB, 3);

    newPosition = _reinflateECB2[0];
    newSquashDatum = _reinflateECB2[1];
    newECBp = _reinflateECB2[2];

    if (!grounded && newSquashDatum.factor < 1) {
      var _reinflateECB3 = reinflateECB(newECBp, newPosition, allSurfacesMinusPlatforms, newSquashDatum, false);
      // reinflate a second time if it might help


      var _reinflateECB4 = _slicedToArray(_reinflateECB3, 3);

      newPosition = _reinflateECB4[0];
      newSquashDatum = _reinflateECB4[1];
      newECBp = _reinflateECB4[2];
    }
  }

  return { position: newPosition, touching: newTouching, squashDatum: newSquashDatum, ecb: newECBp };
};

//////////////////
// WEBPACK FOOTER
// ./src/physics/environmentalCollision.js
// module id = 28
// module chunks = 1
//# sourceURL=webpack:///./src/physics/environmentalCollision.js?