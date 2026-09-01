"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStageCode = createStageCode;
exports.parseStageCode = parseStageCode;

var _Box2D = __webpack_require__(21);

var _Vec2D = __webpack_require__(22);

var _deepValue = __webpack_require__(131);

var _getConnected = __webpack_require__(129);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
/* eslint indent:0*/

function createStageCode(stage) {
  var tCode = "";
  for (var i = 0; i < stage.startingPoint.length; i++) {
    tCode += stage.startingPoint[i].x.toFixed(2) + "," + stage.startingPoint[i].y.toFixed(2);
    if (i !== stage.startingPoint.length - 1) {
      tCode += "~";
    }
  }
  tCode += "&";
  if (stage.startingFace === undefined) {
    tCode += "1,1,1,1";
  } else {
    for (var _i = 0; _i < stage.startingFace.length; _i++) {
      tCode += stage.startingFace[_i];
      if (_i !== stage.startingFace.length - 1) {
        tCode += ",";
      }
    }
  }
  var types = ["ground", "ceiling", "wallL", "wallR", "platform", "background.line"];
  for (var n = 0; n < types.length; n++) {
    tCode += "&";
    var surfaces = (0, _deepValue.deepValue)(stage, types[n]);
    if (surfaces !== undefined) {
      for (var _i2 = 0; _i2 < surfaces.length; _i2++) {
        var surface = surfaces[_i2];
        tCode += surface[0].x.toFixed(2) + "," + surface[0].y.toFixed(2) + "," + surface[1].x.toFixed(2) + "," + surface[1].y.toFixed(2) + ",";
        if (_i2 !== 5) {
          if (surface[2]) {
            switch (surface[2].damageType) {
              case "fire":
                tCode += "1";
                break;
              case "electric":
                tCode += "2";
                break;
              case "slash":
                tCode += "3";
                break;
              case "darkness":
                tCode += "4";
                break;
              default:
                tCode += "0";
                break;
            }
          } else {
            tCode += "0";
          }
        }
        if (_i2 !== surfaces.length - 1) {
          tCode += "~";
        }
      }
    }
  }
  var ptypes = ["polygon", "background.polygon"];
  for (var _n = 0; _n < ptypes.length; _n++) {
    tCode += "&";
    var polys = (0, _deepValue.deepValue)(stage, ptypes[_n]);
    if (polys !== undefined) {
      for (var _i3 = 0; _i3 < polys.length; _i3++) {
        var pts = polys[_i3];
        for (var j = 0; j < pts.length; j++) {
          tCode += pts[j].x.toFixed(2) + "," + pts[j].y.toFixed(2);
          if (j !== pts.length - 1) {
            tCode += ",";
          }
        }
        if (_i3 !== polys.length - 1) {
          tCode += "~";
        }
      }
    }
  }
  tCode += "&";
  for (var _i4 = 0; _i4 < stage.ledge.length; _i4++) {
    tCode += stage.ledge[_i4][0][0] + "," + stage.ledge[_i4][1] + "," + stage.ledge[_i4][2];
    if (_i4 !== stage.ledge.length - 1) {
      tCode += "~";
    }
  }
  tCode += "&";
  if (stage.target !== undefined) {
    var targets = stage.target;
    for (var _i5 = 0; _i5 < targets.length; _i5++) {
      tCode += targets[_i5].x.toFixed(2) + "," + targets[_i5].y.toFixed(2);
      if (_i5 !== targets.length - 1) {
        tCode += "~";
      }
    }
  }
  tCode += "&" + stage.blastzone.min.x.toFixed(2) + "," + stage.blastzone.min.y.toFixed(2) + "," + stage.blastzone.max.x.toFixed(2) + "," + stage.blastzone.max.y.toFixed(2);
  tCode += "&" + stage.scale.toFixed(2);
  return tCode;
}

function parseVec2D(s1, s2) {
  return new _Vec2D.Vec2D(parseFloat(s1), parseFloat(s2));
}

function parseBox2D(s1, s2, s3, s4) {
  return new _Box2D.Box2D([parseFloat(s1), parseFloat(s2)], [parseFloat(s3), parseFloat(s4)]);
}

function parseSurface(s1, s2, s3, s4, s5) {
  var surfaceProperties = void 0;
  if (s5 !== undefined) {
    var damageType = null;
    switch (s5) {
      case "1":
        damageType = "fire";
        break;
      case "2":
        damageType = "electric";
        break;
      case "3":
        damageType = "slash";
        break;
      case "4":
        damageType = "darkness";
        break;
      default:
        break;
    }
    surfaceProperties = { damageType: damageType };
    return [parseVec2D(s1, s2), parseVec2D(s3, s4), surfaceProperties];
  }
  return [parseVec2D(s1, s2), parseVec2D(s3, s4)];
}

function parseLedge(s1, s2, s3) {
  var side = parseInt(s3);
  if (side !== 0 && side !== 1) {
    side = 0;
  }
  if (s1[0] === "p") {
    return ["platform", parseInt(s2), side];
  } else {
    return ["ground", parseInt(s2), side];
  }
}

function parseSign(s) {
  var sign = parseInt(s);
  if (sign === -1) {
    return -1;
  } else {
    return 1;
  }
}

function parsePolygon(arr) {
  var polygon = [];
  if (arr.length % 2 === 1) {
    return polygon;
  }
  for (var i = 0; 2 * i < arr.length; i++) {
    polygon.push(parseVec2D(arr[2 * i], arr[2 * i + 1]));
  }
  return polygon;
}

function sep(s, sep) {
  return s === undefined || s === '' ? [] : s.split(sep);
}

function parseStageCode(code) {
  var stage = { startingPoint: [],
    startingFace: [],
    respawnPoints: [],
    respawnFace: [],
    box: [],
    polygon: [],
    polygonMap: [],
    ground: [],
    ceiling: [],
    wallL: [],
    wallR: [],
    platform: [],
    ledge: [],
    ledgePos: [],
    target: [],
    scale: 3,
    blastzone: new _Box2D.Box2D([-250, -250], [250, 250]),
    offset: [600, 375],
    connected: [[], []],
    background: { polygon: [], line: [] }
  };

  var objects = code.split("&");

  if (code.length < 14) {
    return null;
  }

  try {

    var stageBG = stage.background;
    // to please the type-checker
    if (stageBG === null || stageBG === undefined) {
      stage.background = { polygon: [], line: [] };
      stageBG = stage.background;
    }

    stage.startingPoint = sep(objects[0], '~').map(function (s) {
      return parseVec2D.apply(undefined, _toConsumableArray(sep(s, ',')));
    });
    stage.startingFace = sep(objects[1], ',').map(function (s) {
      return parseSign(s);
    });
    stage.ground = sep(objects[2], '~').map(function (s) {
      return parseSurface.apply(undefined, _toConsumableArray(sep(s, ',')));
    });
    stage.ceiling = sep(objects[3], '~').map(function (s) {
      return parseSurface.apply(undefined, _toConsumableArray(sep(s, ',')));
    });
    stage.wallL = sep(objects[4], '~').map(function (s) {
      return parseSurface.apply(undefined, _toConsumableArray(sep(s, ',')));
    });
    stage.wallR = sep(objects[5], '~').map(function (s) {
      return parseSurface.apply(undefined, _toConsumableArray(sep(s, ',')));
    });
    stage.platform = sep(objects[6], '~').map(function (s) {
      return parseSurface.apply(undefined, _toConsumableArray(sep(s, ',')));
    });
    stageBG.line = sep(objects[7], '~').map(function (s) {
      return parseSurface.apply(undefined, _toConsumableArray(sep(s, ',')));
    });
    stage.polygon = sep(objects[8], '~').map(function (s) {
      return parsePolygon(sep(s, ','));
    });
    stageBG.polygon = sep(objects[9], '~').map(function (s) {
      return parsePolygon(sep(s, ','));
    });
    stage.ledge = sep(objects[10], '~').map(function (s) {
      return parseLedge.apply(undefined, _toConsumableArray(sep(s, ',')));
    });
    stage.target = sep(objects[11], '~').map(function (s) {
      return parseVec2D.apply(undefined, _toConsumableArray(sep(s, ',')));
    });
    stage.blastzone = parseBox2D.apply(undefined, _toConsumableArray(sep(objects[12], ','))) || new _Box2D.Box2D([-250, -250], [250, 250]);
    stage.scale = parseFloat(objects[13]) || 3;

    stage.ledgePos = stage.ledge.map(function (l) {
      return stage[l[0]][l[1]][l[2]];
    });
    stage.connected = (0, _getConnected.getConnected)(stage);
    stage.respawnPoints = stage.startingPoint;
    stage.respawnFace = stage.startingFace;
    if (stage.polygon === undefined) {
      console.log("error in 'parseStageCode': undefined polygon array");
      return null;
    }
    stage.polygonMap = stage.polygon.map(function (p) {
      return null;
    });
  } catch (error) {
    console.log("error in 'parseStageCode': " + error);
    return null;
  }

  if (stage.startingPoint === undefined || stage.startingPoint.length < 1) {
    console.log("error in 'parseStageCode': missing starting point");
    return null;
  }

  return stage;
}

//////////////////
// WEBPACK FOOTER
// ./src/stages/encode.js
// module id = 130
// module chunks = 1
//# sourceURL=webpack:///./src/stages/encode.js?