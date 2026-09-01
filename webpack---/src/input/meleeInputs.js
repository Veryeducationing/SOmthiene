"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/*eslint indent:0*/
/*eslint prefer-const:0*/

exports.scaleToGCTrigger = scaleToGCTrigger;
exports.scaleToUnitAxes = scaleToUnitAxes;
exports.meleeRound = meleeRound;
exports.scaleToMeleeAxes = scaleToMeleeAxes;
exports.deaden = deaden;
exports.tasRescale = tasRescale;

var _linAlg = __webpack_require__(29);

var _Vec2D = __webpack_require__(22);

// ----------------------------------------------------------------------------------------------------
// Melee input simulation

function fromCardinals(_ref, l, r, d, u) {
  var _ref2 = _slicedToArray(_ref, 2),
      origx = _ref2[0],
      origy = _ref2[1];

  return [[origx, origy], [l, origy], [r, origy], [origx, d], [origx, u]];
};

// parameters for GC controller simulation
// the following function gives an approximation to the extreme raw axis data for a given controller
// of course, this varies between controllers, but this serves as a useful first approximation
// function output: [[origx, origy], [lx, ly], [rx, ry], [dx, dy], [ux, uy]]
function stickExtremePoints(stickCardinals) {
  if (stickCardinals === null || stickCardinals === undefined) {
    return fromCardinals([0, 0], -1, 1, 1, -1);
  } else {
    return fromCardinals([stickCardinals.center.x, stickCardinals.center.y], stickCardinals.left, stickCardinals.right, stickCardinals.down, stickCardinals.up);
  }
};

// The following function renormalises axis input,
// so that corners (l = left, r = right, d=down, u=up) are mapped to the respective corners of the unit square.
// This function assumes that ALL coordinates have already been centered.
// Return type: [xnew,ynew]
function renormaliseAxisInput(_ref3, _ref4, _ref5, _ref6, _ref7) {
  var _ref12 = _slicedToArray(_ref3, 2),
      lx = _ref12[0],
      ly = _ref12[1];

  var _ref11 = _slicedToArray(_ref4, 2),
      rx = _ref11[0],
      ry = _ref11[1];

  var _ref10 = _slicedToArray(_ref5, 2),
      dx = _ref10[0],
      dy = _ref10[1];

  var _ref9 = _slicedToArray(_ref6, 2),
      ux = _ref9[0],
      uy = _ref9[1];

  var _ref8 = _slicedToArray(_ref7, 2),
      x = _ref8[0],
      y = _ref8[1];

  var invMat = void 0;
  if (x * ry - y * rx <= 0 && x * uy - y * ux >= 0) {
    // quadrant 1
    invMat = (0, _linAlg.inverseMatrix)([[rx, ux], [ry, uy]]);
  } else if (x * uy - y * ux <= 0 && x * ly - y * lx >= 0) {
    // quadrant 2
    invMat = (0, _linAlg.inverseMatrix)([[-lx, ux], [-ly, uy]]);
  } else if (x * ly - y * lx <= 0 && x * dy - y * dx >= 0) {
    // quadrant 3
    invMat = (0, _linAlg.inverseMatrix)([[-lx, -dx], [-ly, -dy]]);
  } else {
    // quadrant 4
    invMat = (0, _linAlg.inverseMatrix)([[rx, -dx], [ry, -dy]]);
  }

  if (invMat === null || invMat === undefined) {
    return [x, y];
  } else {
    return (0, _linAlg.multMatVect)(invMat, [x, y]);
  }
};

// clamps a value between -1 and 1
function toInterval(x) {
  if (x < -1) {
    return -1;
  } else if (x > 1) {
    return 1;
  } else {
    return x;
  }
};

// Analog triggers.

// t = trigger input
function scaleToGCTrigger(t, offset, scale) {
  var tnew = Math.abs(scale) < 0.001 ? 0 : (t + offset) / scale;
  if (tnew > 1) {
    return 1;
  } else if (tnew < 0.3) {
    return 0;
  } else {
    return tnew;
  }
};

// ---------------------------
// GC controller simulation

var steps = 80;
var deadzoneConst = 0.28;
var leniency = 10;

var meleeOrig = 128;
var meleeMin = meleeOrig - (steps + leniency); // lowest  0 -- 255 input the controller will give
var meleeMax = meleeOrig + (steps + leniency); // highest 0 -- 255 input the controller will give

// rescales -1 -- 0 -- 1 to min -- orig -- max, and rounds to nearest integer
function discretise(x, min, orig, max) {
  if (x < 0) {
    return Math.round(x * (orig - min) + orig);
  } else if (x > 0) {
    return Math.round(x * (max - orig) + orig);
  } else {
    return orig;
  }
};

// Rescales controller input to -1 -- 0 -- 1 in both axes
function scaleToUnitAxes(x, y, stickCardinals, customCenterX, customCenterY) {
  var _stickExtremePoints = stickExtremePoints(stickCardinals),
      _stickExtremePoints2 = _slicedToArray(_stickExtremePoints, 5),
      _stickExtremePoints2$ = _slicedToArray(_stickExtremePoints2[0], 2),
      origx = _stickExtremePoints2$[0],
      origy = _stickExtremePoints2$[1],
      _stickExtremePoints2$2 = _slicedToArray(_stickExtremePoints2[1], 2),
      lx = _stickExtremePoints2$2[0],
      ly = _stickExtremePoints2$2[1],
      _stickExtremePoints2$3 = _slicedToArray(_stickExtremePoints2[2], 2),
      rx = _stickExtremePoints2$3[0],
      ry = _stickExtremePoints2$3[1],
      _stickExtremePoints2$4 = _slicedToArray(_stickExtremePoints2[3], 2),
      dx = _stickExtremePoints2$4[0],
      dy = _stickExtremePoints2$4[1],
      _stickExtremePoints2$5 = _slicedToArray(_stickExtremePoints2[4], 2),
      ux = _stickExtremePoints2$5[0],
      uy = _stickExtremePoints2$5[1];

  origx += customCenterX;
  origy += customCenterY;

  var _renormaliseAxisInput = renormaliseAxisInput([lx - origx, ly - origy], [rx - origx, ry - origy], [dx - origx, dy - origy], [ux - origx, uy - origy], [x - origx, y - origy]),
      _renormaliseAxisInput2 = _slicedToArray(_renormaliseAxisInput, 2),
      xnew = _renormaliseAxisInput2[0],
      ynew = _renormaliseAxisInput2[1];

  return [toInterval(xnew), toInterval(ynew)];
};

// Rescales -1 -- 1 input to 0 -- 255 values to simulate a GC controller
function scaleUnitToGCAxes(x, y) {
  var xnew = discretise(x, meleeMin, meleeOrig, meleeMax);
  var ynew = discretise(y, meleeMin, meleeOrig, meleeMax);
  return [xnew, ynew];
};

// Rescales controller input to 0 -- 255 values to simulate a GC controller
function scaleToGCAxes(x, y, stickCardinals, customCenterX, customCenterY) {
  var _scaleToUnitAxes = scaleToUnitAxes(x, y, stickCardinals, customCenterX, customCenterY),
      _scaleToUnitAxes2 = _slicedToArray(_scaleToUnitAxes, 2),
      xnew = _scaleToUnitAxes2[0],
      ynew = _scaleToUnitAxes2[1];

  return scaleUnitToGCAxes(xnew, ynew);
}

// ---------------------------------
// Melee input rescaling functions


// basic mapping from 0 -- 255 back to -1 -- 1 done by Melee
function axisRescale(x) {
  var orig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : meleeOrig;

  return (x - orig) / steps;
};

function unitRetract(_ref13) {
  var _ref14 = _slicedToArray(_ref13, 2),
      x = _ref14[0],
      y = _ref14[1];

  var norm = Math.sqrt(x * x + y * y);
  if (norm < 1) {
    return [x, y];
  } else {
    return [x / norm, y / norm];
  }
};

function meleeRound(x) {
  return Math.round(steps * x) / steps;
};

function meleeAxesRescale(_ref15) {
  var _ref16 = _slicedToArray(_ref15, 2),
      x = _ref16[0],
      y = _ref16[1];

  var xnew = axisRescale(x, meleeOrig);
  var ynew = axisRescale(y, meleeOrig);

  var _unitRetract = unitRetract([xnew, ynew]),
      _unitRetract2 = _slicedToArray(_unitRetract, 2),
      xnew2 = _unitRetract2[0],
      ynew2 = _unitRetract2[1];

  return [xnew2, ynew2].map(meleeRound);
}

// this is the main input rescaling function
// it scales raw input data to the data Melee uses for the simulation
// number : controller ID, to rescale axes dependent on controller raw input
// bool == false means no deadzone, bool == true means deadzone
function scaleToMeleeAxes(x, y, isGC, stickCardinals) {
  var customCenterX = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var customCenterY = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  var xnew = x;
  var ynew = y;
  if (isGC) {
    // gamecube controllers, don't mess up the raw data
    xnew = (x - customCenterX + 1) * 255 / 2; // convert raw input to 0 -- 255 values in obvious way
    ynew = (-y + customCenterY + 1) * 255 / 2; // y incurs a sign flip
    //console.log("You are using raw GC controller data.");
  } else {
    //console.log("You are using GC controller simulation.");
    var _scaleToGCAxes = scaleToGCAxes(x, y, stickCardinals, customCenterX, customCenterY); // convert raw input to 0 -- 255 by GC controller simulation


    var _scaleToGCAxes2 = _slicedToArray(_scaleToGCAxes, 2);

    xnew = _scaleToGCAxes2[0];
    ynew = _scaleToGCAxes2[1];
  }
  return meleeAxesRescale([xnew, ynew]);
};

function deaden(x) {
  var dead = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : deadzoneConst;

  return Math.abs(x) < dead ? 0 : x;
};

// scales -1 -- 1 TAS data to the data Melee uses for the simulation
function tasRescale(x, y) {
  var isDeadzoned = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var xnew = (x + 1) * 255 / 2;
  var ynew = (y + 1) * 255 / 2;
  return meleeAxesRescale([xnew, ynew], isDeadzoned);
};

//////////////////
// WEBPACK FOOTER
// ./src/input/meleeInputs.js
// module id = 65
// module chunks = 1
//# sourceURL=webpack:///./src/input/meleeInputs.js?