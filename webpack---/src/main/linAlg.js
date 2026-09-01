"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.dotProd = dotProd;
exports.scalarProd = scalarProd;
exports.norm = norm;
exports.add = add;
exports.subtract = subtract;
exports.euclideanDist = euclideanDist;
exports.manhattanDist = manhattanDist;
exports.orthogonalProjection = orthogonalProjection;
exports.inverseMatrix = inverseMatrix;
exports.multMatVect = multMatVect;
exports.reflect = reflect;

var _Vec2D = __webpack_require__(22);

function dotProd(vec1, vec2) {
  return vec1.x * vec2.x + vec1.y * vec2.y;
};

function scalarProd(lambda, vec) {
  return new _Vec2D.Vec2D(lambda * vec.x, lambda * vec.y);
};

function norm(vec) {
  return Math.sqrt(dotProd(vec, vec));
}

function add(vec1, vec2) {
  return new _Vec2D.Vec2D(vec1.x + vec2.x, vec1.y + vec2.y);
}

function subtract(vec1, vec2) {
  return new _Vec2D.Vec2D(vec1.x - vec2.x, vec1.y - vec2.y);
}

function squaredDist(center1, center2) {
  return (center2.x - center1.x) * (center2.x - center1.x) + (center2.y - center1.y) * (center2.y - center1.y);
};

function euclideanDist(center1, center2) {
  var sqDist = squaredDist(center1, center2);
  return sqDist <= 0 ? 0 : Math.sqrt(sqDist);
}

function manhattanDist(center1, center2) {
  return Math.abs(center2.x - center1.x) + Math.abs(center2.y - center1.y);
};

// orthogonally projects a point onto a line
// line is given by two points it passes through
function orthogonalProjection(point, line) {
  var line0 = line[0];
  var _ref = [line0.x, line0.y],
      line0x = _ref[0],
      line0y = _ref[1];

  if (line0x === line[1].x && line0y === line[1].y) {
    console.log("error in function 'orthogonalProjection', line reduced to a point.");
    return line0;
  } else {
    // turn everything into relative coordinates with respect to the point line[0]
    var pointVec = new _Vec2D.Vec2D(point.x - line0x, point.y - line0y);
    var lineVec = new _Vec2D.Vec2D(line[1].x - line0x, line[1].y - line0y);
    // renormalise line vector
    var lineNorm = norm(lineVec);
    var lineElem = scalarProd(1 / lineNorm, lineVec);
    // vector projection calculation
    var factor = dotProd(pointVec, lineElem);
    var projVec = scalarProd(factor, lineElem);
    // back to absolute coordinates by adding the coordinates of line[0]
    return new _Vec2D.Vec2D(projVec.x + line0x, projVec.y + line0y);
  }
};

// Computes the inverse of a 2x2 matrix.
function inverseMatrix(_ref2) {
  var _ref3 = _slicedToArray(_ref2, 2),
      _ref3$ = _slicedToArray(_ref3[0], 2),
      x1 = _ref3$[0],
      x2 = _ref3$[1],
      _ref3$2 = _slicedToArray(_ref3[1], 2),
      y1 = _ref3$2[0],
      y2 = _ref3$2[1];

  var det = x1 * y2 - x2 * y1;
  if (Math.abs(det) < 0.00001) {
    console.log("error in inverseMatrix: determinant too small");
    return null;
  } else {
    return [[y2 / det, -x2 / det], [-y1 / det, x1 / det]];
  }
};

// Multiplication Av (A a 2x2 matrix, v a 2x1 column vector)
// Return type: [xnew,ynew]
function multMatVect(_ref4, _ref5) {
  var _ref7 = _slicedToArray(_ref4, 2),
      _ref7$ = _slicedToArray(_ref7[0], 2),
      x1 = _ref7$[0],
      x2 = _ref7$[1],
      _ref7$2 = _slicedToArray(_ref7[1], 2),
      y1 = _ref7$2[0],
      y2 = _ref7$2[1];

  var _ref6 = _slicedToArray(_ref5, 2),
      x = _ref6[0],
      y = _ref6[1];

  return [x1 * x + x2 * y, y1 * x + y2 * y];
};

function reflect(reflectee, reflector) {
  var projVec = orthogonalProjection(reflectee, [new _Vec2D.Vec2D(0, 0), reflector]);
  var moveVec = subtract(projVec, reflectee);
  return add(reflectee, scalarProd(2, moveVec));
}

//////////////////
// WEBPACK FOOTER
// ./src/main/linAlg.js
// module id = 29
// module chunks = 1
//# sourceURL=webpack:///./src/main/linAlg.js?