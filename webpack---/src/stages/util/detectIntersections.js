"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intersectsAny = intersectsAny;
exports.distanceToLine = distanceToLine;
exports.distanceToPolygon = distanceToPolygon;
exports.lineDistanceToLines = lineDistanceToLines;

var _Vec2D = __webpack_require__(22);

var _environmentalCollision = __webpack_require__(28);

var _linAlg = __webpack_require__(29);

var _extremePoint = __webpack_require__(33);

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }
/*eslint indent:0*/

function intersectsAny(newLine, lines) {
  for (var i = 0; i < lines.length; i++) {
    if (intersects(newLine, lines[i])) {
      return true;
    }
  }
  return false;
}

function intersects(line1, line2) {
  var t1 = (0, _environmentalCollision.coordinateInterceptParameter)(line1, line2);
  var t2 = (0, _environmentalCollision.coordinateInterceptParameter)(line2, line1);
  if (isNaN(t1) || isNaN(t2) || t1 === Infinity || t2 === Infinity || t1 < 0 || t2 < 0 || t1 > 1 || t2 > 1) {
    return false;
  } else {
    return true;
  }
}

function isInside(point, lines) {
  var pt = new _Vec2D.Vec2D(point.x + 0.001, point.y);
  var atInfinity = new _Vec2D.Vec2D(point.x + 0.001, point.y + 100000);
  return !evenNumberOfTrue(lines.map(function (line) {
    return intersects(line, [pt, atInfinity]);
  }));
}

function evenNumberOfTrue(list) {
  if (list.length < 1) {
    return true;
  } else {
    var _list = _toArray(list),
        head = _list[0],
        tail = _list.slice(1);

    if (head === true) {
      return !evenNumberOfTrue(tail);
    } else {
      return evenNumberOfTrue(tail);
    }
  }
}

function distanceToLines(point, lines) {
  if (isInside(point, lines)) {
    return -1;
  } else {
    return minimum(lines.map(function (line) {
      return distanceToLine(point, line);
    }));
  }
}

function distanceToLine(point, line) {
  if ((0, _linAlg.euclideanDist)(line[0], line[1]) < 0.001) {
    return (0, _linAlg.euclideanDist)(point, line[0]);
  } else {
    var projectedPoint = (0, _linAlg.orthogonalProjection)(point, line);
    var lineRight = (0, _extremePoint.extremePoint)(line, "r");
    var lineLeft = (0, _extremePoint.extremePoint)(line, "l");
    var lineTop = (0, _extremePoint.extremePoint)(line, "t");
    var lineBot = (0, _extremePoint.extremePoint)(line, "b");
    if (projectedPoint.x > lineRight.x) {
      return (0, _linAlg.euclideanDist)(point, lineRight);
    } else if (projectedPoint.x < lineLeft.x) {
      return (0, _linAlg.euclideanDist)(point, lineLeft);
    } else if (projectedPoint.y > lineTop.y) {
      return (0, _linAlg.euclideanDist)(point, lineTop);
    } else if (projectedPoint.y < lineBot.y) {
      return (0, _linAlg.euclideanDist)(point, lineBot);
    } else {
      return (0, _linAlg.euclideanDist)(point, projectedPoint);
    }
  }
}

function minimum(numbers) {
  if (numbers.length < 1) {
    return Infinity;
  } else {
    var _numbers = _toArray(numbers),
        head = _numbers[0],
        tail = _numbers.slice(1);

    var next = minimum(tail);
    if (head < next) {
      return head;
    } else {
      return next;
    }
  }
}

function distanceToPolygon(point, polygon) {
  return distanceToLines(point, linesOfPolygon(polygon));
}

function linesOfPolygon(polygon) {
  var lg = polygon.length;
  var pt = polygon[lg - 1];
  var lines = [];
  for (var i = 0; i < polygon.length; i++) {
    lines.push([pt, polygon[i]]);
    pt = polygon[i];
  }
  return lines;
}

function distanceBetweenLines(line1, line2) {
  if (intersects(line1, line2)) {
    return 0;
  } else {
    return minimum([distanceToLine(line1[0], line2), distanceToLine(line1[1], line2), distanceToLine(line2[0], line1), distanceToLine(line2[1], line1)]);
  }
}

function lineDistanceToLines(thisLine, otherLines) {
  return minimum(otherLines.map(function (otherLine) {
    return distanceBetweenLines(thisLine, otherLine);
  }));
}

//////////////////
// WEBPACK FOOTER
// ./src/stages/util/detectIntersections.js
// module id = 128
// module chunks = 1
//# sourceURL=webpack:///./src/stages/util/detectIntersections.js?