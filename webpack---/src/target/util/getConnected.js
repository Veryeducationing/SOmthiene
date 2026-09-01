"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConnected = getConnected;

var _extremePoint = __webpack_require__(33);

var _linAlg = __webpack_require__(29);

function getConnected(stage) {
  var lg = stage.ground.length;
  var lp = stage.platform.length;
  var connected = [[], []];
  for (var i = 0; i < lg; i++) {
    connected[0].push([null, null]);
    var broke = [false, false];
    if (broke[0] && broke[1]) {
      break;
    }
    for (var j = 0; j < lg; j++) {
      if (!broke[0] && (0, _linAlg.manhattanDist)((0, _extremePoint.extremePoint)(stage.ground[i], "l"), (0, _extremePoint.extremePoint)(stage.ground[j], "r")) < 0.001) {
        connected[0][i][0] = ["g", j];
        broke[0] = true;
      }
      if (!broke[1] && (0, _linAlg.manhattanDist)((0, _extremePoint.extremePoint)(stage.ground[i], "r"), (0, _extremePoint.extremePoint)(stage.ground[j], "l")) < 0.001) {
        connected[0][i][1] = ["g", j];
        broke[1] = true;
      }
    }
    for (var _j = 0; _j < lp; _j++) {
      if (!broke[0] && (0, _linAlg.manhattanDist)((0, _extremePoint.extremePoint)(stage.ground[i], "l"), (0, _extremePoint.extremePoint)(stage.platform[_j], "r")) < 0.001) {
        connected[0][i][0] = ["p", _j];
        broke[0] = true;
      }
      if (!broke[1] && (0, _linAlg.manhattanDist)((0, _extremePoint.extremePoint)(stage.ground[i], "r"), (0, _extremePoint.extremePoint)(stage.platform[_j], "l")) < 0.001) {
        connected[0][i][1] = ["p", _j];
        broke[1] = true;
      }
    }
    for (var _j2 = 0; _j2 < stage.wallR.length; _j2++) {
      if (!broke[0] && (0, _linAlg.manhattanDist)((0, _extremePoint.extremePoint)(stage.ground[i], "l"), (0, _extremePoint.extremePoint)(stage.wallR[_j2], "r")) < 0.001) {
        connected[0][i][0] = ["r", _j2];
        broke[0] = true;
      }
    }
    for (var _j3 = 0; _j3 < stage.wallL.length; _j3++) {
      if (!broke[1] && (0, _linAlg.manhattanDist)((0, _extremePoint.extremePoint)(stage.ground[i], "r"), (0, _extremePoint.extremePoint)(stage.wallL[_j3], "l")) < 0.001) {
        connected[0][i][1] = ["l", _j3];
        broke[1] = true;
      }
    }
  }
  for (var _i = 0; _i < lp; _i++) {
    connected[1].push([null, null]);
    var _broke = [false, false];
    if (_broke[0] && _broke[1]) {
      break;
    }
    for (var _j4 = 0; _j4 < lg; _j4++) {
      if (!_broke[0] && (0, _linAlg.manhattanDist)((0, _extremePoint.extremePoint)(stage.platform[_i], "l"), (0, _extremePoint.extremePoint)(stage.ground[_j4], "r")) < 0.001) {
        connected[1][_i][0] = ["g", _j4];
        _broke[0] = true;
      }
      if (!_broke[1] && (0, _linAlg.manhattanDist)((0, _extremePoint.extremePoint)(stage.platform[_i], "r"), (0, _extremePoint.extremePoint)(stage.ground[_j4], "l")) < 0.001) {
        connected[1][_i][1] = ["g", _j4];
        _broke[1] = true;
      }
    }
    for (var _j5 = 0; _j5 < lp; _j5++) {
      if (!_broke[0] && (0, _linAlg.manhattanDist)((0, _extremePoint.extremePoint)(stage.platform[_i], "l"), (0, _extremePoint.extremePoint)(stage.platform[_j5], "r")) < 0.001) {
        connected[1][_i][0] = ["p", _j5];
        _broke[0] = true;
      }
      if (!_broke[1] && (0, _linAlg.manhattanDist)((0, _extremePoint.extremePoint)(stage.platform[_i], "r"), (0, _extremePoint.extremePoint)(stage.platform[_j5], "l")) < 0.001) {
        connected[1][_i][1] = ["p", _j5];
        _broke[1] = true;
      }
    }
    for (var _j6 = 0; _j6 < stage.wallR.length; _j6++) {
      if (!_broke[0] && (0, _linAlg.manhattanDist)((0, _extremePoint.extremePoint)(stage.platform[_i], "l"), (0, _extremePoint.extremePoint)(stage.wallR[_j6], "r")) < 0.001) {
        connected[1][_i][0] = ["r", _j6];
        _broke[0] = true;
      }
    }
    for (var _j7 = 0; _j7 < stage.wallL.length; _j7++) {
      if (!_broke[1] && (0, _linAlg.manhattanDist)((0, _extremePoint.extremePoint)(stage.platform[_i], "r"), (0, _extremePoint.extremePoint)(stage.wallL[_j7], "l")) < 0.001) {
        connected[1][_i][1] = ["l", _j7];
        _broke[1] = true;
      }
    }
  }
  return connected;
}

//////////////////
// WEBPACK FOOTER
// ./src/target/util/getConnected.js
// module id = 129
// module chunks = 1
//# sourceURL=webpack:///./src/target/util/getConnected.js?