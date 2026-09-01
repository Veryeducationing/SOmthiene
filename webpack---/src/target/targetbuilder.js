"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stageTemp = exports.wallsTooClosePos = exports.wallsTooCloseTimer = exports.tooSmallPos = exports.tooSmallTimer = exports.badAnglePos = exports.badAngleTimer = exports.drawMode = exports.scaleScroll = exports.editingStage = exports.drawingPlatform = exports.drawingPolygon = exports.drawingWall = exports.amDrawingPolygon = exports.holdingA = exports.toolInfo = exports.toolInfoTimer = exports.showingCode = exports.dTypeReal = exports.damageTypeList = exports.damageTypeIndex = exports.damageType = exports.wallTypeList = exports.wallTypeIndex = exports.wallType = exports.targetTool = exports.targetBuilder = exports.unGriddedCrossHairPos = exports.prevRealCrossHair = exports.prevCrossHairPos = exports.crossHairPos = exports.connectPoint = exports.connectIndicatorPos = exports.drawConnectIndicator = undefined;
exports.createTargetCode = createTargetCode;
exports.undo = undo;
exports.calculateGriddedCrossHair = calculateGriddedCrossHair;
exports.targetBuilderControls = targetBuilderControls;
exports.toPixel = toPixel;
exports.drawLinesOfType = drawLinesOfType;
exports.drawTargetStage = drawTargetStage;
exports.renderTargetBuilder = renderTargetBuilder;
exports.findStartingPoint = findStartingPoint;
exports.findTarget = findTarget;
exports.findLine = findLine;
exports.findPolygon = findPolygon;
exports.centerItem = centerItem;
exports.setEditingStage = setEditingStage;
exports.setShowingCode = setShowingCode;
exports.setTargetBuilder = setTargetBuilder;
exports.resetStageTemp = resetStageTemp;
exports.setStageTemp = setStageTemp;

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _css = __webpack_require__(12);

var _render = __webpack_require__(13);

var _targetplay = __webpack_require__(125);

var _stagerender = __webpack_require__(127);

var _deepCopy = __webpack_require__(85);

var _Vec2D = __webpack_require__(22);

var _Box2D = __webpack_require__(21);

var _activeStage = __webpack_require__(18);

var _detectIntersections = __webpack_require__(128);

var _getConnected = __webpack_require__(129);

var _linAlg = __webpack_require__(29);

var _encode = __webpack_require__(130);

/* eslint-disable */

var drawConnectIndicator = exports.drawConnectIndicator = false;
var connectIndicatorPos = exports.connectIndicatorPos = new _Vec2D.Vec2D(0, 0);
var connectPoint = exports.connectPoint = false;
var crossHairPos = exports.crossHairPos = new _Vec2D.Vec2D(0, 0);
var prevCrossHairPos = exports.prevCrossHairPos = new _Vec2D.Vec2D(0, 0);
var prevRealCrossHair = exports.prevRealCrossHair = new _Vec2D.Vec2D(0, 0);
var unGriddedCrossHairPos = exports.unGriddedCrossHairPos = new _Vec2D.Vec2D(0, 0);
var targetBuilder = exports.targetBuilder = 0;
var targetTool = exports.targetTool = 0;
var wallType = exports.wallType = "ground";
var wallTypeIndex = exports.wallTypeIndex = 0;
var wallTypeList = exports.wallTypeList = ["ground", "ceiling", "wallL", "wallR"];
var damageType = exports.damageType = "fire";
var damageTypeIndex = exports.damageTypeIndex = 0;
var damageTypeList = exports.damageTypeList = ["fire", "electric", "slash", "darkness"];
var dTypeReal = exports.dTypeReal = [3, 4, 1, 5];
var showingCode = exports.showingCode = false;
var toolInfoTimer = exports.toolInfoTimer = 0;
var toolInfo = exports.toolInfo = ["Polygon", "Platform", "Wall", "Ledge", "Damage", "Target", "Move", "Delete", "Scale", "Draw Mode"];
var holdingA = exports.holdingA = false;
var amDrawingPolygon = exports.amDrawingPolygon = false;
var drawingWall = exports.drawingWall = [new _Vec2D.Vec2D(0, 0), new _Vec2D.Vec2D(0, 0)];
var drawingPolygon = exports.drawingPolygon = [];
var drawingPlatform = exports.drawingPlatform = [new _Vec2D.Vec2D(0, 0), new _Vec2D.Vec2D(0, 0)];
var editingStage = exports.editingStage = -1;
var scaleScroll = exports.scaleScroll = 0;
var drawMode = exports.drawMode = 0;

var badAngleTimer = exports.badAngleTimer = 0;
var badAnglePos = exports.badAnglePos = new _Vec2D.Vec2D(0, 0);
var tooSmallTimer = exports.tooSmallTimer = 0;
var tooSmallPos = exports.tooSmallPos = new _Vec2D.Vec2D(0, 0);
var wallsTooCloseTimer = exports.wallsTooCloseTimer = 0;
var wallsTooClosePos = exports.wallsTooClosePos = new _Vec2D.Vec2D(0, 0);

var stageTemp = exports.stageTemp = {
  polygon: [],
  polygonMap: [],
  platform: [],
  ground: [],
  ceiling: [],
  wallL: [],
  wallR: [],
  target: [],
  startingPoint: [new _Vec2D.Vec2D(-10, 0), new _Vec2D.Vec2D(10, 0), new _Vec2D.Vec2D(-30, 0), new _Vec2D.Vec2D(30, 0)],
  ledge: [],
  blastzone: new _Box2D.Box2D([-250, -250], [250, 250]),
  scale: 3,
  offset: [600, 375],
  connected: [],
  background: {
    polygon: [],
    line: []
  }
};
var grabbedItem = 0;
var hoverItem = 0;
var ledgeHoverItem = 0;
var builderPaused = false;
var builderPauseSelected = 0;
var undoList = [];
var hoverToolbar = 1;
var gridSizes = [80, 40, 20, 10, 0];
var gridType = 1;

function createTargetCode() {
  var tCode = "";
  tCode += stageTemp.startingPoint.x + "," + stageTemp.startingPoint.y + "~";
  for (var i = 0; i < stageTemp.box.length; i++) {
    tCode += stageTemp.box[i].min.x + "," + stageTemp.box[i].min.y + "," + stageTemp.box[i].max.x + "," + stageTemp.box[i].max.y;
    if (i != stageTemp.box.length - 1) {
      tCode += "#";
    }
  }
  tCode += "~";
  for (var _i = 0; _i < stageTemp.platform.length; _i++) {
    tCode += stageTemp.platform[_i][0].x + "," + stageTemp.platform[_i][1].x + "," + stageTemp.platform[_i][0].y;
    if (_i != stageTemp.platform.length - 1) {
      tCode += "#";
    }
  }
  tCode += "~";
  for (var _i2 = 0; _i2 < stageTemp.ledge.length; _i2++) {
    tCode += stageTemp.ledge[_i2][0] + "," + stageTemp.ledge[_i2][1];
    if (_i2 != stageTemp.ledge.length - 1) {
      tCode += "#";
    }
  }
  tCode += "~";
  for (var _i3 = 0; _i3 < stageTemp.target.length; _i3++) {
    tCode += stageTemp.target[_i3].x + "," + stageTemp.target[_i3].y;
    if (_i3 != stageTemp.target.length - 1) {
      tCode += "#";
    }
  }
  tCode += "~" + stageTemp.scale;
  return tCode;
}
function undo() {
  var num = undoList.length - 1;
  if (num >= 0) {
    var item = undoList[num];
    stageTemp[item].pop();
    if (item == "box") {
      stageTemp.ground.pop();
      stageTemp.ceiling.pop();
      stageTemp.wallL.pop();
      stageTemp.wallR.pop();
    }
    undoList.pop();
  }
}

var currentPolygonLines = [];
var denied = false;

function calculateGriddedCrossHair() {
  if (gridType == 4) {
    crossHairPos.x = unGriddedCrossHairPos.x;
    crossHairPos.y = unGriddedCrossHairPos.y;
  } else {
    if (unGriddedCrossHairPos.x == 0) {
      crossHairPos.x = 600 % gridSizes[gridType] / stageTemp.scale;
    } else {
      crossHairPos.x = Math.round(unGriddedCrossHairPos.x / (gridSizes[gridType] / stageTemp.scale)) * gridSizes[gridType] / stageTemp.scale + 600 % gridSizes[gridType] / stageTemp.scale;
    }
    if (unGriddedCrossHairPos.y == 0) {
      crossHairPos.y = 375 % gridSizes[gridType] / stageTemp.scale;
    } else {
      crossHairPos.y = Math.round(unGriddedCrossHairPos.y / (gridSizes[gridType] / -stageTemp.scale)) * gridSizes[gridType] / -stageTemp.scale + 375 % gridSizes[gridType] / stageTemp.scale;
    }
  }
}

var stopShowingCode = false;
function clickFunction() {
  stopShowingCode = true;
}

function targetBuilderControls(p, input) {
  exports.drawConnectIndicator = drawConnectIndicator = false;
  if (!showingCode) {
    if (!builderPaused) {
      hoverItem = 0;
      ledgeHoverItem = 0;
      /*if (input[p].z[0] && !input[p].z[1]){
        // so i can create permanent stages
        let code = createStageCode(stageTemp);
        console.log(code);
      }*/
      //hoverButton = -1;
      var multi = input[p][0].y || input[p][0].x ? 1 : 5;
      if (targetTool === 8) {
        multi = 0;
      }
      unGriddedCrossHairPos.x += input[p][0].lsX * multi * 3 / stageTemp.scale;
      unGriddedCrossHairPos.y += input[p][0].lsY * multi * 3 / stageTemp.scale;
      calculateGriddedCrossHair();
      var realCrossHair = new _Vec2D.Vec2D(crossHairPos.x * stageTemp.scale + 600, crossHairPos.y * -stageTemp.scale + 375);
      /*if (realCrossHair.x >= 700 && realCrossHair.x <= 1110 && realCrossHair.y >= 650 && realCrossHair.y <= 710){
        hoverButton = Math.floor((realCrossHair.x-695)/70);
      }*/
      if (realCrossHair.x < 0) {
        unGriddedCrossHairPos.x = -600 / stageTemp.scale;
        calculateGriddedCrossHair();
        realCrossHair.x = 0;
      }
      if (realCrossHair.x > 1200) {
        unGriddedCrossHairPos.x = 600 / stageTemp.scale;
        calculateGriddedCrossHair();
        realCrossHair.x = 1200;
      }
      if (realCrossHair.y > 750) {
        unGriddedCrossHairPos.y = 375 / -stageTemp.scale;
        calculateGriddedCrossHair();
        realCrossHair.y = 750;
      }
      if (realCrossHair.y < 0) {
        unGriddedCrossHairPos.y = -375 / -stageTemp.scale;
        calculateGriddedCrossHair();
        realCrossHair.y = 0;
      }
      if (realCrossHair.x > 600 && realCrossHair.y < 100) {
        hoverToolbar = 0.3;
      } else {
        hoverToolbar = 1;
      }
      if (input[p][0].z && !input[p][1].z) {
        gridType++;
        if (gridType > 4) {
          gridType = 0;
        }
      }
      if (input[p][0].l && !input[p][1].l || input[p][0].dl && !input[p][1].dl) {
        _sfx.sounds.menuSelect.play();
        exports.targetTool = targetTool -= 1;
        if (targetTool === -1) {
          exports.targetTool = targetTool = 9;
        }
        exports.toolInfoTimer = toolInfoTimer = 120;
        stopDrawingPolygon();
      } else if (input[p][0].r && !input[p][1].r || input[p][0].dr && !input[p][1].dr) {
        _sfx.sounds.menuSelect.play();
        exports.targetTool = targetTool += 1;
        if (targetTool === 10) {
          exports.targetTool = targetTool = 0;
        } else if (drawMode && targetTool === 2) {
          exports.targetTool = targetTool = 6;
        }
        exports.toolInfoTimer = toolInfoTimer = 120;
        stopDrawingPolygon();
      } else if (targetTool === 2) {
        if (input[p][0].du && !input[p][1].du) {
          _sfx.sounds.menuSelect.play();
          exports.wallTypeIndex = wallTypeIndex += 1;
          if (wallTypeIndex === 4) {
            exports.wallTypeIndex = wallTypeIndex = 0;
          }
          exports.wallType = wallType = wallTypeList[wallTypeIndex];
          exports.toolInfoTimer = toolInfoTimer = 120;
        } else if (input[p][0].dd && !input[p][1].dd) {
          _sfx.sounds.menuSelect.play();
          exports.wallTypeIndex = wallTypeIndex -= 1;
          if (wallTypeIndex === -1) {
            exports.wallTypeIndex = wallTypeIndex = 3;
          }
          exports.wallType = wallType = wallTypeList[wallTypeIndex];
          exports.toolInfoTimer = toolInfoTimer = 120;
        }
      } else if (targetTool === 4) {
        if (input[p][0].du && !input[p][1].du) {
          _sfx.sounds.menuSelect.play();
          exports.damageTypeIndex = damageTypeIndex += 1;
          if (damageTypeIndex === 4) {
            exports.damageTypeIndex = damageTypeIndex = 0;
          }
          exports.damageType = damageType = damageTypeList[damageTypeIndex];
          exports.toolInfoTimer = toolInfoTimer = 120;
        } else if (input[p][0].dd && !input[p][1].dd) {
          _sfx.sounds.menuSelect.play();
          exports.damageTypeIndex = damageTypeIndex -= 1;
          if (damageTypeIndex === -1) {
            exports.damageTypeIndex = damageTypeIndex = 3;
          }
          exports.damageType = damageType = damageTypeList[damageTypeIndex];
          exports.toolInfoTimer = toolInfoTimer = 120;
        }
      }
      // if bg mode
      if (drawMode) {
        if (targetTool >= 2 && targetTool <= 4) {
          exports.targetTool = targetTool = 1;
        }
      }
      switch (targetTool) {
        case 0:
          //POLYGON
          if (input[p][0].a && !input[p][1].a && !input[p][0].z) {
            // initiate build
            if (!amDrawingPolygon) {
              if (stageTemp.polygon.length < 120) {
                currentPolygonLines = [];
                exports.drawingPolygon = drawingPolygon = [new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y), new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y)];
                exports.amDrawingPolygon = amDrawingPolygon = true;
                _sfx.sounds.blunthit.play();
              } else {
                _sfx.sounds.deny.play();
                break;
              }
            } else {
              //RELEASE
              var lg = drawingPolygon.length;
              var canClosePolygon = Math.abs(realCrossHair.x - drawingPolygon[0].x) < 2 && Math.abs(realCrossHair.y - drawingPolygon[0].y) < 2;
              if (lg > 3 && !denied) {
                currentPolygonLines.push([drawingPolygon[lg - 4], drawingPolygon[lg - 3]]);
              }
              var nextLine = [drawingPolygon[lg - 2], new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y)];
              var relevantPolygonLines = canClosePolygon ? currentPolygonLines.slice(1) : currentPolygonLines;
              if ((0, _detectIntersections.intersectsAny)(nextLine, relevantPolygonLines) || nextLine[0].x === nextLine[1].x && nextLine[0].y === nextLine[1].y) {
                _sfx.sounds.deny.play();
                denied = true;
              } else {
                _sfx.sounds.blunthit.play();
                denied = false;
                // if close enough to start of polygon
                if (canClosePolygon) {
                  exports.amDrawingPolygon = amDrawingPolygon = false;
                  // remove last point because same as origin
                  drawingPolygon.pop();
                  // if has enough sides, start building walls
                  if (drawingPolygon.length >= 3) {
                    // find index direction of clockwise, also make polygon objects while we are looping
                    var area = 0;
                    for (var i = 0; i < drawingPolygon.length; i++) {
                      var nextPoint = i === drawingPolygon.length - 1 ? 0 : i + 1;
                      area += (drawingPolygon[nextPoint].x - drawingPolygon[i].x) * (drawingPolygon[nextPoint].y + drawingPolygon[i].y);
                    }
                    var direction = Math.sign(area) * -1;

                    // if not a flat line then start making
                    if (direction != 0 && direction != -0) {
                      if (drawMode) {
                        stageTemp.background.polygon.push([]);
                      } else {
                        stageTemp.polygon.push([]);
                        stageTemp.polygonMap.push([]);
                      }
                      // loop through polygon and determine type
                      var curIndex = direction === 1 ? 0 : drawingPolygon.length - 1;

                      for (var _i4 = 0; _i4 < drawingPolygon.length; _i4++) {
                        var nextIndex = curIndex + direction;
                        if (nextIndex === -1) {
                          nextIndex = drawingPolygon.length - 1;
                        } else if (nextIndex === drawingPolygon.length) {
                          nextIndex = 0;
                        }

                        if (drawMode) {
                          stageTemp.background.polygon[stageTemp.background.polygon.length - 1][_i4] = new _Vec2D.Vec2D((drawingPolygon[curIndex].x - 600) / stageTemp.scale, (drawingPolygon[curIndex].y - 375) / -stageTemp.scale);
                        } else {
                          stageTemp.polygon[stageTemp.polygon.length - 1][_i4] = new _Vec2D.Vec2D((drawingPolygon[curIndex].x - 600) / stageTemp.scale, (drawingPolygon[curIndex].y - 375) / -stageTemp.scale);

                          var drawLine = [new _Vec2D.Vec2D(drawingPolygon[curIndex].x, drawingPolygon[curIndex].y), new _Vec2D.Vec2D(drawingPolygon[nextIndex].x, drawingPolygon[nextIndex].y)];
                          var realLine = [new _Vec2D.Vec2D((drawLine[0].x - 600) / stageTemp.scale, (drawLine[0].y - 375) / -stageTemp.scale), new _Vec2D.Vec2D((drawLine[1].x - 600) / stageTemp.scale, (drawLine[1].y - 375) / -stageTemp.scale)];
                          var angle = Math.atan2(realLine[1].y - realLine[0].y, realLine[1].x - realLine[0].x);
                          if (Math.sign(angle) === -1) {
                            angle += _render.twoPi;
                          }

                          if (angle <= Math.PI / 6 || angle >= Math.PI * 11 / 6) {
                            // is ground
                            stageTemp.ground.push([new _Vec2D.Vec2D(realLine[0].x, realLine[0].y), new _Vec2D.Vec2D(realLine[1].x, realLine[1].y)]);
                            stageTemp.polygonMap[stageTemp.polygonMap.length - 1].push(["ground", stageTemp.ground.length - 1]);
                          } else if (angle >= Math.PI * 5 / 6 && angle <= Math.PI * 7 / 6) {
                            // is ceiling
                            stageTemp.ceiling.push([new _Vec2D.Vec2D(realLine[0].x, realLine[0].y), new _Vec2D.Vec2D(realLine[1].x, realLine[1].y)]);
                            stageTemp.polygonMap[stageTemp.polygonMap.length - 1].push(["ceiling", stageTemp.ceiling.length - 1]);
                          } else if (angle > Math.PI) {
                            // is wallR
                            stageTemp.wallR.push([new _Vec2D.Vec2D(realLine[0].x, realLine[0].y), new _Vec2D.Vec2D(realLine[1].x, realLine[1].y)]);
                            stageTemp.polygonMap[stageTemp.polygonMap.length - 1].push(["wallR", stageTemp.wallR.length - 1]);
                          } else {
                            // is wallL
                            stageTemp.wallL.push([new _Vec2D.Vec2D(realLine[0].x, realLine[0].y), new _Vec2D.Vec2D(realLine[1].x, realLine[1].y)]);
                            stageTemp.polygonMap[stageTemp.polygonMap.length - 1].push(["wallL", stageTemp.wallL.length - 1]);
                          }
                        }

                        curIndex = nextIndex;
                      }
                    } else {
                      exports.tooSmallTimer = tooSmallTimer = 120;
                      exports.tooSmallPos = tooSmallPos = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
                    }
                    exports.drawingPolygon = drawingPolygon = [];
                  } else {
                    exports.tooSmallTimer = tooSmallTimer = 120;
                    exports.tooSmallPos = tooSmallPos = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
                  }
                } else {
                  // continue drawing more points
                  drawingPolygon.push(new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y));
                }
              }
            }
          } else {
            if (amDrawingPolygon) {
              drawingPolygon[drawingPolygon.length - 1] = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
              var _canClosePolygon = Math.abs(realCrossHair.x - drawingPolygon[0].x) < 2 && Math.abs(realCrossHair.y - drawingPolygon[0].y) < 2;
              if (_canClosePolygon && drawingPolygon.length >= 3) {
                exports.drawConnectIndicator = drawConnectIndicator = true;
                exports.connectIndicatorPos = connectIndicatorPos = new _Vec2D.Vec2D(drawingPolygon[0].x, drawingPolygon[0].y);
              }
            }
            if (input[p][0].b && !input[p][1].b) {
              if (amDrawingPolygon) {
                if (drawingPolygon.length <= 2) {
                  exports.drawingPolygon = drawingPolygon = [];
                  exports.amDrawingPolygon = amDrawingPolygon = false;
                  currentPolygonLines = [];
                } else {
                  drawingPolygon.pop();
                  currentPolygonLines.pop();
                }
                _sfx.sounds.menuBack.play();
              }
            }
          }
          stageTemp.connected = (0, _getConnected.getConnected)(stageTemp);
          break;
        case 1:
          //PLATFORM / LINE
          if (!holdingA) {
            if (input[p][0].a && !input[p][1].a && !input[p][0].z) {
              // initiate build
              drawingPlatform[0] = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
              drawingPlatform[1] = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
              exports.holdingA = holdingA = true;
            }
          } else {
            if (input[p][0].a) {
              // stretch
              drawingPlatform[1] = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
            } else {
              //RELEASE
              drawingPlatform[1] = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
              // if width at least 10 start trying to build
              if (Math.abs(drawingPlatform[0].x - drawingPlatform[1].x) >= 10 || drawMode && (0, _linAlg.manhattanDist)(drawingPlatform[0], drawingPlatform[1]) >= 10) {
                // calculate left and right points
                var left = drawingPlatform[0].x - drawingPlatform[1].x < 0 ? 0 : 1;
                var right = 1 - left;
                var convertedLeft = new _Vec2D.Vec2D((drawingPlatform[left].x - 600) / stageTemp.scale, (drawingPlatform[left].y - 375) / -stageTemp.scale);
                var convertedRight = new _Vec2D.Vec2D((drawingPlatform[right].x - 600) / stageTemp.scale, (drawingPlatform[right].y - 375) / -stageTemp.scale);
                if (drawMode) {
                  stageTemp.background.line.push([new _Vec2D.Vec2D(convertedLeft.x, convertedLeft.y), new _Vec2D.Vec2D(convertedRight.x, convertedRight.y)]);
                } else {
                  // calculate angle
                  var _angle = Math.atan2(convertedRight.y - convertedLeft.y, convertedRight.x - convertedLeft.x);
                  // if angle is within limit, build it
                  if (Math.abs(_angle) <= Math.PI / 6 && Math.abs(_angle) >= -Math.PI / 6) {
                    stageTemp.platform.push([new _Vec2D.Vec2D(convertedLeft.x, convertedLeft.y), new _Vec2D.Vec2D(convertedRight.x, convertedRight.y)]);
                  } else {
                    exports.badAngleTimer = badAngleTimer = 120;
                    exports.badAnglePos = badAnglePos = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
                  }
                }
                //undoList.push("platform");
              } else {
                exports.tooSmallTimer = tooSmallTimer = 120;
                exports.tooSmallPos = tooSmallPos = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
              }
              exports.holdingA = holdingA = false;
              _sfx.sounds.blunthit.play();
            }
          }
          stageTemp.connected = (0, _getConnected.getConnected)(stageTemp);
          break;
        case 2:
          // WALL
          if (!holdingA) {
            if (input[p][0].a && !input[p][1].a && !input[p][0].z) {
              // initiate build
              drawingWall[0] = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
              drawingWall[1] = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
              exports.holdingA = holdingA = true;
            }
          } else {
            if (input[p][0].a) {
              // stretch
              drawingWall[1] = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
            } else {
              //RELEASE
              drawingWall[1] = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
              // if magnitude is less than 10, say too small
              if ((0, _linAlg.manhattanDist)(drawingWall[0], drawingWall[1]) >= 10) {
                var _left = drawingWall[0].x - drawingWall[1].x < 0 ? 0 : 1;
                var _right = 1 - _left;
                var _convertedLeft = new _Vec2D.Vec2D((drawingWall[_left].x - 600) / stageTemp.scale, (drawingWall[_left].y - 375) / -stageTemp.scale);
                var _convertedRight = new _Vec2D.Vec2D((drawingWall[_right].x - 600) / stageTemp.scale, (drawingWall[_right].y - 375) / -stageTemp.scale);
                var _angle2 = Math.atan2(_convertedRight.y - _convertedLeft.y, _convertedRight.x - _convertedLeft.x);
                var distanceToOtherWalls = void 0;
                if (wallType === "wallL") {
                  distanceToOtherWalls = (0, _detectIntersections.lineDistanceToLines)([_convertedLeft, _convertedRight], stageTemp.wallR);
                } else if (wallType === "wallR") {
                  distanceToOtherWalls = (0, _detectIntersections.lineDistanceToLines)([_convertedLeft, _convertedRight], stageTemp.wallL);
                }
                if (distanceToOtherWalls !== undefined && distanceToOtherWalls < 2) {
                  exports.wallsTooCloseTimer = wallsTooCloseTimer = 120;
                  exports.wallsTooClosePos = wallsTooClosePos = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
                } else if ((wallType === "ground" || wallType === "ceiling") && Math.abs(_angle2) <= Math.PI / 6 || (wallType === "wallL" || wallType === "wallR") && Math.abs(_angle2) != 0 && Math.abs(_angle2) != Math.PI) {
                  stageTemp[wallType].push([new _Vec2D.Vec2D(_convertedLeft.x, _convertedLeft.y), new _Vec2D.Vec2D(_convertedRight.x, _convertedRight.y)]);
                  // if wanting to connect, check each case
                } else {
                  exports.badAngleTimer = badAngleTimer = 120;
                  exports.badAnglePos = badAnglePos = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
                }
                //undoList.push("platform");
              } else {
                exports.tooSmallTimer = tooSmallTimer = 120;
                exports.tooSmallPos = tooSmallPos = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
              }
              exports.holdingA = holdingA = false;
              _sfx.sounds.blunthit.play();
            }
          }
          if (wallType === "ground" || wallType === "platform") {
            stageTemp.connected = (0, _getConnected.getConnected)(stageTemp);
          }
          break;
        case 3:
          //LEDGE
          ledgeHoverItem = 0;
          var found = findLine(realCrossHair, false, ["platform", "ground"], true);
          if (found) {
            var toLeft = (0, _linAlg.manhattanDist)(crossHairPos, stageTemp[hoverItem[0]][hoverItem[1]][0]);
            var toRight = (0, _linAlg.manhattanDist)(crossHairPos, stageTemp[hoverItem[0]][hoverItem[1]][1]);
            if (toRight < toLeft) {
              ledgeHoverItem = [hoverItem[0], hoverItem[1], 1];
            } else {
              ledgeHoverItem = [hoverItem[0], hoverItem[1], 0];
            }
            if (input[p][0].a && !input[p][1].a && !input[p][0].z) {
              var alreadyExist = false;
              for (var j = 0; j < stageTemp.ledge.length; j++) {
                if (stageTemp.ledge[j][0] === ledgeHoverItem[0] && stageTemp.ledge[j][1] === ledgeHoverItem[1] && stageTemp.ledge[j][2] == ledgeHoverItem[2]) {
                  stageTemp.ledge.splice(j, 1);
                  alreadyExist = true;
                  break;
                }
              }
              if (!alreadyExist) {
                stageTemp.ledge.push([ledgeHoverItem[0], ledgeHoverItem[1], ledgeHoverItem[2]]);
                //undoList.push("ledge");
              }
              _sfx.sounds.blunthit.play();
            }
          }
          break;
        case 4:
          // DAMAGE
          if (!findLine(realCrossHair, false, ["wallL", "wallR", "ceiling", "ground"], true)) {
            hoverItem = 0;
          }
          if (hoverItem != 0) {
            if (input[p][0].a && !input[p][1].a && !input[p][0].z) {
              if (stageTemp[hoverItem[0]][hoverItem[1]][2] === undefined || stageTemp[hoverItem[0]][hoverItem[1]][2].damageType !== damageType) {
                stageTemp[hoverItem[0]][hoverItem[1]][2] = { damageType: damageType };
              } else {
                stageTemp[hoverItem[0]][hoverItem[1]][2] = { damageType: null };
              }
              _sfx.sounds.menuSelect.play();
            }
          }
          break;
        case 5:
          //TARGET
          if (input[p][0].a && !input[p][1].a && !input[p][0].z) {
            if (stageTemp.target.length < 20) {
              stageTemp.target.push(new _Vec2D.Vec2D(crossHairPos.x, crossHairPos.y));
              undoList.push("target");
              _sfx.sounds.blunthit.play();
            } else {
              _sfx.sounds.deny.play();
            }
          }
          break;
        case 6:
          //MOVE
          if (grabbedItem == 0) {
            if (drawMode) {
              if (!findPolygon(crossHairPos, true)) {
                if (!findLine(realCrossHair, true, ["line"])) {
                  hoverItem = 0;
                }
              }
            } else {
              if (!findStartingPoint(realCrossHair)) {
                if (!findTarget(realCrossHair)) {
                  if (!findPolygon(crossHairPos)) {
                    if (!findLine(realCrossHair)) {
                      hoverItem = 0;
                    }
                  }
                }
              }
            }
          } else {
            hoverItem = grabbedItem;
          }
          if (hoverItem != 0) {
            if (!holdingA) {
              if (input[p][0].a && !input[p][1].a && !input[p][0].z) {
                // initiate build
                centerItem(hoverItem, realCrossHair);
                grabbedItem = hoverItem;
                exports.holdingA = holdingA = true;
              }
            } else {
              if (input[p][0].a) {
                //MOVING
                centerItem(hoverItem, realCrossHair);
              } else {
                //RELEASE
                centerItem(hoverItem, realCrossHair);
                exports.holdingA = holdingA = false;
                grabbedItem = 0;
                _sfx.sounds.blunthit.play();
                stageTemp.connected = (0, _getConnected.getConnected)(stageTemp);
              }
            }
          }

          break;
        case 7:
          //DELETE
          if (drawMode) {
            if (!findPolygon(crossHairPos, true)) {
              if (!findLine(realCrossHair, true, ["line"])) {
                hoverItem = 0;
              }
            }
          } else {
            if (!findTarget(realCrossHair)) {
              if (!findPolygon(crossHairPos)) {
                if (!findLine(realCrossHair)) {
                  hoverItem = 0;
                }
              }
            }
          }
          if (hoverItem != 0) {
            if (input[p][0].a && !input[p][1].a && !input[p][0].z) {
              switch (hoverItem[0]) {
                case "platform":
                  if (hoverItem[0] === "platform") {
                    for (var n = 0; n < stageTemp.ledge.length; n++) {
                      if (stageTemp.ledge[n][0] === "platform") {
                        if (stageTemp.ledge[n][1] > hoverItem[1]) {
                          stageTemp.ledge[n][1]--;
                        } else if (stageTemp.ledge[n][1] === hoverItem[1]) {
                          stageTemp.ledge.splice(n, 1);
                          n--;
                        }
                      }
                    }
                    stageTemp.connected[1].splice(hoverItem[1], 1);
                  }
                  stageTemp.platform.splice(hoverItem[1], 1);
                  _sfx.sounds.menuBack.play();
                  break;
                case "target":
                  stageTemp[hoverItem[0]].splice(hoverItem[1], 1);
                  _sfx.sounds.menuBack.play();
                  break;
                case "line":
                  stageTemp.background[hoverItem[0]].splice(hoverItem[1], 1);
                  _sfx.sounds.menuBack.play();
                  break;
                case "ground":
                case "ceiling":
                case "wallL":
                case "wallR":
                  stageTemp[hoverItem[0]].splice(hoverItem[1], 1);
                  for (var _p = 0; _p < stageTemp.polygonMap.length; _p++) {
                    if (stageTemp.polygonMap[_p] !== null) {
                      for (var k = 0; k < stageTemp.polygonMap[_p].length; k++) {
                        if (stageTemp.polygonMap[_p][k][0] === hoverItem[0] && stageTemp.polygonMap[_p][k][1] > hoverItem[1]) {
                          stageTemp.polygonMap[_p][k][1]--;
                        }
                      }
                    }
                  }
                  if (hoverItem[0] === "ground") {
                    for (var _n = 0; _n < stageTemp.ledge.length; _n++) {
                      if (stageTemp.ledge[_n][0] === "ground") {
                        if (stageTemp.ledge[_n][1] > hoverItem[1]) {
                          stageTemp.ledge[_n][1]--;
                        } else if (stageTemp.ledge[_n][1] === hoverItem[1]) {
                          stageTemp.ledge.splice(_n, 1);
                          _n--;
                        }
                      }
                    }
                    stageTemp.connected[0].splice(hoverItem[1], 1);
                  }
                  _sfx.sounds.menuBack.play();
                  break;
                case "polygonBG":
                  stageTemp.background.polygon.splice(hoverItem[1], 1);
                  _sfx.sounds.menuBack.play();
                  break;
                case "polygon":
                  if (stageTemp.polygonMap[hoverItem[1]] !== undefined && stageTemp.polygonMap[hoverItem[1]] !== null) {
                    for (var _j = 0; _j < stageTemp.polygonMap[hoverItem[1]].length; _j++) {
                      var type = stageTemp.polygonMap[hoverItem[1]][_j][0];
                      var index = stageTemp.polygonMap[hoverItem[1]][_j][1];
                      stageTemp[type].splice(index, 1);
                      if (type === "ground") {
                        for (var _n2 = 0; _n2 < stageTemp.ledge.length; _n2++) {
                          if (stageTemp.ledge[_n2][0] === "ground") {
                            if (stageTemp.ledge[_n2][1] > index) {
                              stageTemp.ledge[_n2][1]--;
                            } else if (stageTemp.ledge[_n2][1] === index) {
                              stageTemp.ledge.splice(_n2, 1);
                              _n2--;
                            }
                          }
                        }
                        stageTemp.connected[0].splice(index, 1);
                      }
                      for (var _p2 = 0; _p2 < stageTemp.polygonMap.length; _p2++) {
                        if (stageTemp.polygonMap[_p2] !== null) {
                          for (var _k = 0; _k < stageTemp.polygonMap[_p2].length; _k++) {
                            if (stageTemp.polygonMap[_p2][_k][0] === type && stageTemp.polygonMap[_p2][_k][1] > index) {
                              stageTemp.polygonMap[_p2][_k][1]--;
                            }
                          }
                        }
                      }
                    }
                  }
                  stageTemp.polygonMap.splice(hoverItem[1], 1);
                  stageTemp.polygon.splice(hoverItem[1], 1);
                  _sfx.sounds.menuBack.play();
                  break;
                default:
                  break;
              }
              hoverItem = 0;
              stageTemp.connected = (0, _getConnected.getConnected)(stageTemp);
            }
          }
          break;
        case 8:
          // SCALE
          if (input[p][0].lsY > 0) {
            exports.scaleScroll = scaleScroll += 1;
            if (scaleScroll > 5) {
              exports.scaleScroll = scaleScroll = 0;
              stageTemp.scale += 0.1;
              _sfx.sounds.menuSelect.play();
              if (stageTemp.scale > 6) {
                stageTemp.scale = 6;
              }
            }
          } else if (input[p][0].lsY < 0) {
            exports.scaleScroll = scaleScroll += 1;
            if (scaleScroll > 5) {
              exports.scaleScroll = scaleScroll = 0;
              stageTemp.scale -= 0.1;
              _sfx.sounds.menuSelect.play();
              if (stageTemp.scale < 2) {
                stageTemp.scale = 2;
              }
            }
          } else {
            exports.scaleScroll = scaleScroll = 0;
          }
          break;
        case 9:
          // MODE SWITCH
          if (input[p][0].a && !input[p][1].a) {
            exports.drawMode = drawMode = 1 - drawMode;
          }
          break;
        default:
          break;
      }
      if (input[p][0].s && !input[p][1].s) {
        builderPaused = true;
        _sfx.sounds.pause.play();
      }
      exports.prevRealCrossHair = prevRealCrossHair = new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y);
      exports.prevCrossHairPos = prevCrossHairPos = new _Vec2D.Vec2D(crossHairPos.x, crossHairPos.y);
    } else {
      if (input[p][0].lsY >= 0.7 && input[p][1].lsY < 0.7) {
        builderPauseSelected--;
        if (builderPauseSelected < 0) {
          builderPauseSelected = 2;
        }
        _sfx.sounds.menuSelect.play();
      } else if (input[p][0].lsY <= -0.7 && input[p][1].lsY > -0.7) {
        builderPauseSelected++;
        if (builderPauseSelected > 2) {
          builderPauseSelected = 0;
        }
        _sfx.sounds.menuSelect.play();
      }
      if (input[p][0].a && !input[p][1].a) {
        switch (builderPauseSelected) {
          case 0:
            _sfx.sounds.menuForward.play();
            (0, _targetplay.startTargetGame)(targetBuilder, true);
            break;
          case 1:
            _sfx.sounds.menuForward.play();
            exports.showingCode = showingCode = true;
            var code = (0, _encode.createStageCode)(stageTemp);
            document.getElementById('aButton').addEventListener('click', clickFunction);
            $("#customStageContainer").show();
            $("#cStageEdit").select().val(code);
            $("#cStageTitleEdit").empty().append("Share this code");

            // deep copy temp stage into custom stage array
            if (editingStage > -1) {
              (0, _main.setCookie)("custom" + editingStage, code, 36500);
              _activeStage.customTargetStages[editingStage] = (0, _deepCopy.deepCopyObject)(true, stageTemp);
              (0, _activeStage.setCustomTargetStages)(editingStage, _activeStage.customTargetStages[editingStage]);
              $("#cStageInfoEdit").empty().append("Custom stage " + (editingStage + 1) + " updated!");
            } else {
              if (_activeStage.customTargetStages.length < 10) {
                (0, _main.setCookie)("custom" + _activeStage.customTargetStages.length, code, 36500);
                _activeStage.customTargetStages.push({});
                _activeStage.customTargetStages[_activeStage.customTargetStages.length - 1] = (0, _deepCopy.deepCopyObject)(true, stageTemp);
                (0, _activeStage.setCustomTargetStages)(_activeStage.customTargetStages.length - 1, _activeStage.customTargetStages[_activeStage.customTargetStages.length - 1]);
                $("#cStageInfoEdit").empty().append("Saved as Custom stage " + _activeStage.customTargetStages.length);
              } else {
                // limit reached
                $("#cStageInfoEdit").empty().append("Stage Limit Reached! Delete stages on the target test select to free space");
              }
            }
            //console.log(customTargetStages);
            break;
          case 2:
            _sfx.sounds.menuForward.play();
            (0, _main.changeGamemode)(1);
            break;
          default:
            break;
        }
      } else if (input[p][0].s && !input[p][1].s) {
        builderPaused = false;
        builderPauseSelected = 0;
        _sfx.sounds.menuBack.play();
      }
    }
  } else {
    // showing code
    if (stopShowingCode || input[p][0].a && !input[p][1].a) {
      stopShowingCode = false;
      document.getElementById('aButton').removeEventListener('click', clickFunction);
      exports.showingCode = showingCode = false;
      $("#customStageContainer").hide();
      _sfx.sounds.menuForward.play();
    }
  }
}

function stopDrawingPolygon() {
  exports.amDrawingPolygon = amDrawingPolygon = false;
  exports.drawingPolygon = drawingPolygon = [];
  currentPolygonLines = [];
}

function toPixel(p) {
  var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "both";

  if (axis === 0) {
    return p * stageTemp.scale + stageTemp.offset[0];
  } else if (axis === 1) {
    return p * -stageTemp.scale + stageTemp.offset[1];
  } else {
    return new _Vec2D.Vec2D(p.x * stageTemp.scale + stageTemp.offset[0], p.y * -stageTemp.scale + stageTemp.offset[1]);
  }
}

function drawLinesOfType(type, colour) {
  _main.ui.strokeStyle = colour;
  for (var i = 0; i < stageTemp[type].length; i++) {
    var lL = toPixel(stageTemp[type][i][0]);
    var lR = toPixel(stageTemp[type][i][1]);
    _main.ui.beginPath();
    _main.ui.moveTo(lL.x, lL.y);
    _main.ui.lineTo(lR.x, lR.y);
    _main.ui.closePath();
    _main.ui.stroke();
  }
}

function drawTargetStage() {
  for (var i = 0; i < stageTemp.background.polygon.length; i++) {
    _main.ui.fillStyle = hoverItem[0] === "polygonBG" && hoverItem[1] === i ? "rgba(255,255,255,0.5)" : _stagerender.boxFillBG;
    var p = stageTemp.background.polygon[i];
    var pn = toPixel(p[0]);
    _main.ui.beginPath();
    _main.ui.moveTo(pn.x, pn.y);
    for (var n = 1; n < p.length; n++) {
      pn = toPixel(p[n]);
      _main.ui.lineTo(pn.x, pn.y);
    }
    _main.ui.closePath();
    _main.ui.fill();
  }
  _main.ui.strokeStyle = _stagerender.boxFillBG;
  _main.ui.lineWidth = 3;
  for (var _i5 = 0; _i5 < stageTemp.background.line.length; _i5++) {
    var lL = toPixel(stageTemp.background.line[_i5][0]);
    var lR = toPixel(stageTemp.background.line[_i5][1]);
    _main.ui.beginPath();
    _main.ui.moveTo(lL.x, lL.y);
    _main.ui.lineTo(lR.x, lR.y);
    _main.ui.closePath();
    _main.ui.stroke();
  }

  for (var _i6 = 0; _i6 < stageTemp.polygon.length; _i6++) {
    _main.ui.fillStyle = hoverItem[0] === "polygon" && hoverItem[1] === _i6 ? "rgba(255,255,255,0.5)" : _stagerender.boxFill;
    var _p3 = stageTemp.polygon[_i6];
    var _pn = toPixel(_p3[0]);
    _main.ui.beginPath();
    _main.ui.moveTo(_pn.x, _pn.y);
    for (var _n3 = 1; _n3 < _p3.length; _n3++) {
      _pn = toPixel(_p3[_n3]);
      _main.ui.lineTo(_pn.x, _pn.y);
    }
    _main.ui.closePath();
    _main.ui.fill();
  }
  for (var _i7 = 0; _i7 < stageTemp.target.length; _i7++) {
    var x = toPixel(stageTemp.target[_i7].x, 0);
    var y = toPixel(stageTemp.target[_i7].y, 1);
    for (var j = 0; j < 5; j++) {
      if (hoverItem[0] == "target" && hoverItem[1] == _i7) {
        _main.ui.fillStyle = j % 2 ? "white" : "rgb(241, 111, 111)";
      } else {
        _main.ui.fillStyle = j % 2 ? "white" : "red";
      }
      _main.ui.beginPath();
      _main.ui.arc(x, y, 25 - j * 5, 0, _render.twoPi);
      _main.ui.closePath();
      _main.ui.fill();
    }
  }
  _main.ui.lineWidth = 1;

  drawLinesOfType("ground", "#db80cc");
  drawLinesOfType("platform", "#4794c6");
  drawLinesOfType("wallL", "#47c648");
  drawLinesOfType("wallR", "#9867de");
  drawLinesOfType("ceiling", "#f04c4c");

  (0, _stagerender.calculateDamageWallColours)();
  _main.ui.lineWidth = 4;
  var types = ["wallL", "wallR", "ground", "ceiling"];
  for (var _i8 = 0; _i8 < types.length; _i8++) {
    (0, _stagerender.drawDamageLine)(types[_i8], _main.ui, stageTemp);
  }

  _main.ui.strokeStyle = "#e7a44c";
  _main.ui.lineWidth = 2;
  for (var _i9 = 0; _i9 < stageTemp.ledge.length; _i9++) {
    var e = stageTemp.ledge[_i9];
    var pA = toPixel(stageTemp[e[0]][e[1]][e[2]]);
    var pB = toPixel(stageTemp[e[0]][e[1]][1 - e[2]]);
    var ang = Math.atan2(pB.y - pA.y, pB.x - pA.x);
    var magnitude = (0, _linAlg.euclideanDist)(pA, pB);
    var length = Math.min(0.25 * magnitude, 20);
    var pC = new _Vec2D.Vec2D(pA.x + length * Math.cos(ang), pA.y + length * Math.sin(ang));
    _main.ui.beginPath();
    _main.ui.moveTo(pA.x, pA.y);
    _main.ui.lineTo(pC.x, pC.y);
    _main.ui.closePath();
    _main.ui.stroke();
  }
}

function renderTargetBuilder() {
  (0, _main.clearScreen)();
  (0, _stagerender.drawBackground)();
  _main.ui.strokeStyle = "rgba(255, 255, 255, 0.17)";
  _main.ui.lineWidth = 2;
  if (gridType != 4) {
    _main.ui.beginPath();
    for (var _i10 = 0; _i10 < 1200 / gridSizes[gridType]; _i10++) {
      _main.ui.moveTo(_i10 * gridSizes[gridType], 0);
      _main.ui.lineTo(_i10 * gridSizes[gridType], 750);
    }
    for (var _i11 = 0; _i11 < 750 / gridSizes[gridType]; _i11++) {
      _main.ui.moveTo(0, _i11 * gridSizes[gridType]);
      _main.ui.lineTo(1200, _i11 * gridSizes[gridType]);
    }
    _main.ui.closePath();
    _main.ui.stroke();
  }
  drawTargetStage();
  _main.ui.fillStyle = "rgba(255,255,255,0.5)";
  _main.ui.beginPath();
  for (var _i12 = 0; _i12 < stageTemp.connected.length; _i12++) {
    for (var j = 0; j < stageTemp.connected[_i12].length; j++) {
      for (var k = 0; k < stageTemp.connected[_i12][j].length; k++) {
        var w = stageTemp.connected[_i12][j][k];
        if (w != null) {
          var type = null;
          if (w[0] === "p") {
            type = "platform";
          } else if (w[0] === "g") {
            type = "ground";
          }
          if (type !== null) {
            var p = toPixel(stageTemp[type][w[1]][1 - k]);
            _main.ui.moveTo(p.x, p.y);
            _main.ui.arc(p.x, p.y, 5, 0, _render.twoPi);
          }
        }
      }
    }
  }
  _main.ui.closePath();
  _main.ui.fill();
  if (amDrawingPolygon) {
    _main.ui.strokeStyle = "white";
    _main.ui.lineWidth = 4;
    _main.ui.beginPath();
    _main.ui.moveTo(drawingPolygon[0].x, drawingPolygon[0].y);
    for (var n = 1; n < drawingPolygon.length; n++) {
      _main.ui.lineTo(drawingPolygon[n].x, drawingPolygon[n].y);
    }
    _main.ui.stroke();
  }
  if (holdingA) {
    switch (targetTool) {
      case 0:
        //BOX
        /*ui.strokeStyle = "white";
        ui.lineWidth = 4;
        ui.strokeRect(Math.min(drawingBox.min.x, drawingBox.max.x), Math.min(drawingBox.min.y, drawingBox.max.y),
          Math.abs(drawingBox.min.x - drawingBox.max.x), Math.abs(drawingBox.min.y - drawingBox.max.y));*/
        break;
      case 1:
        //PLATFORM / LINE
        if (drawMode) {
          _main.ui.strokeStyle = "rgb(255, 255, 255)";
        } else {
          _main.ui.strokeStyle = "rgb(79, 244, 255)";
        }
        _main.ui.lineWidth = 4;
        _main.ui.beginPath();
        _main.ui.moveTo(drawingPlatform[0].x, drawingPlatform[0].y);
        _main.ui.lineTo(drawingPlatform[1].x, drawingPlatform[1].y);
        _main.ui.stroke();
        _main.ui.closePath();
        break;
      case 2:
        //WALL
        _main.ui.strokeStyle = "rgb(255,255,255)";
        _main.ui.lineWidth = 4;
        _main.ui.beginPath();
        _main.ui.moveTo(drawingWall[0].x, drawingWall[0].y);
        _main.ui.lineTo(drawingWall[1].x, drawingWall[1].y);
        _main.ui.stroke();
        _main.ui.closePath();
        break;
      case 3:
        //LEDGE
        break;
      case 4:
        //TARGET
        break;
      case 5:
        //MOVE
        break;
      case 6:
        //DELETE
        break;
      default:
        break;
    }
  }
  _main.ui.textAlign = "center";
  _main.ui.lineWidth = 2;
  var spCol = ["rgb(0, 0, 0)", ["rgb(110, 255, 66)", "rgb(255, 74, 74)", "rgb(38, 135, 255)", "rgb(168, 31, 255)"]];
  var spColH = ["rgb(82, 82, 82)", ["rgb(171, 255, 145)", "rgb(254, 163, 163)", "rgb(168, 207, 255)", "rgb(214, 153, 255)"]];
  for (var _n4 = 0; _n4 < stageTemp.startingPoint.length; _n4++) {
    var highlight = false;
    if (hoverItem[0] === "startingPoint" && hoverItem[1] === _n4) {
      highlight = true;
    }
    _main.ui.fillStyle = highlight ? spColH[0] : spCol[0];
    var sP = toPixel(stageTemp.startingPoint[_n4]);
    _main.ui.fillRect(sP.x - 12, sP.y - 37, 24, 14);
    _main.ui.fillRect(sP.x - 4, sP.y - 12, 8, 24);
    _main.ui.fillRect(sP.x - 12, sP.y - 4, 24, 8);
    _main.ui.fillRect(sP.x - 27, sP.y - 23, 54, 13);
    _main.ui.fillStyle = highlight ? spColH[1][_n4] : spCol[1][_n4];
    _main.ui.fillRect(sP.x - 2, sP.y - 10, 4, 20);
    _main.ui.fillRect(sP.x - 10, sP.y - 2, 20, 4);
    _main.ui.font = "900 14px Arial";
    _main.ui.fillText("START", sP.x, sP.y - 12);
    _main.ui.fillText("P" + (_n4 + 1), sP.x, sP.y - 25);
  }
  var i = hoverItem[1];
  if (hoverItem[0] === "line" || hoverItem[0] === "platform" || hoverItem[0] === "ground" || hoverItem[0] === "ceiling" || hoverItem[0] === "wallL" || hoverItem[0] === "wallR") {
    _main.ui.lineWidth = 3;
    _main.ui.strokeStyle = "rgba(255,255,255,0.7)";
    var line = 0;
    if (drawMode) {
      line = stageTemp.background[hoverItem[0]][i];
    } else {
      line = stageTemp[hoverItem[0]][i];
    }
    var p0 = toPixel(line[0]);
    var p1 = toPixel(line[1]);
    _main.ui.beginPath();
    _main.ui.moveTo(p0.x, p0.y);
    _main.ui.lineTo(p1.x, p1.y);
    _main.ui.closePath();
    _main.ui.stroke();
  }

  if (ledgeHoverItem != 0) {
    _main.ui.fillStyle = "rgb(255, 148, 70)";
    _main.ui.beginPath();
    var _p4 = toPixel(stageTemp[ledgeHoverItem[0]][ledgeHoverItem[1]][ledgeHoverItem[2]]);
    _main.ui.arc(_p4.x, _p4.y, 10, 0, _render.twoPi);
    _main.ui.closePath();
    _main.ui.fill();
  }

  if (drawConnectIndicator) {
    _main.ui.strokeStyle = "rgb(128, 255, 98)";
    _main.ui.lineWidth = 3;
    _main.ui.beginPath();
    _main.ui.arc(connectIndicatorPos.x, connectIndicatorPos.y, 15, 0, _render.twoPi);
    _main.ui.arc(connectIndicatorPos.x, connectIndicatorPos.y, 20, 0, _render.twoPi);
    _main.ui.closePath();
    _main.ui.stroke();
  }

  if (toolInfoTimer > 0) {
    exports.toolInfoTimer = toolInfoTimer -= 1;
  }
  _main.ui.fillStyle = "rgb(255,255,255)";
  _main.ui.font = "13px Lucida Console, monaco, monospace";

  for (var _i13 = 0; _i13 < 10; _i13++) {
    if (targetTool == _i13) {
      if (toolInfoTimer > 0) {
        var _j2 = _i13;
        if (_i13 === 9) {
          _j2 = -1.25;
        }
        var text = toolInfo[targetTool];
        if (_i13 === 1 && drawMode) {
          text = "Line";
        }
        _main.ui.save();
        _main.ui.globalAlpha = 1 * hoverToolbar;
        _main.ui.fillStyle = "rgba(0,0,0," + Math.min(toolInfoTimer / 60, 1) + ")";
        _main.ui.fillRect(550 + _j2 * 70, 85, 80, 30);
        _main.ui.fillStyle = "rgba(255,255,255," + Math.min(toolInfoTimer / 60, 1) + ")";
        _main.ui.fillText(text, 590 + _j2 * 70, 103);
        _main.ui.restore();
      }
      _main.ui.globalAlpha = 0.6 * hoverToolbar;
      if ((targetTool === 2 || targetTool === 4) && toolInfoTimer > 0) {
        _main.ui.save();
        _main.ui.fillStyle = "rgba(255,255,255," + Math.min(toolInfoTimer / 60, 1) + ")";
        _main.ui.strokeStyle = "rgba(0,0,0," + Math.min(toolInfoTimer / 60, 1) + ")";
        _main.ui.lineWidth = 4;
        for (var _n5 = 0; _n5 < 3; _n5++) {
          var index = (targetTool === 2 ? wallTypeIndex : damageTypeIndex) + _n5 + 1;
          if (index > 3) {
            index -= 4;
          }
          _main.ui.beginPath();
          _main.ui.moveTo(560 + _i13 * 70, 30 + (_n5 + 1) * 70);
          _main.ui.arc(570 + _i13 * 70, 30 + (_n5 + 1) * 70, 10, Math.PI, Math.PI * 1.5);
          _main.ui.lineTo(610 + _i13 * 70, 20 + (_n5 + 1) * 70);
          _main.ui.arc(610 + _i13 * 70, 30 + (_n5 + 1) * 70, 10, Math.PI * 1.5, _render.twoPi);
          _main.ui.lineTo(620 + _i13 * 70, 80 + (_n5 + 1) * 70);
          _main.ui.arc(610 + _i13 * 70, 70 + (_n5 + 1) * 70, 10, 0, Math.PI / 2);
          _main.ui.lineTo(570 + _i13 * 70, 80 + (_n5 + 1) * 70);
          _main.ui.arc(570 + _i13 * 70, 70 + (_n5 + 1) * 70, 10, Math.PI / 2, Math.PI);
          _main.ui.closePath();
          _main.ui.fill();
          _main.ui.beginPath();
          switch (targetTool === 2 ? wallTypeList[index] : damageTypeList[index]) {
            case "ground":
              _main.ui.moveTo(718, 57 + (_n5 + 1) * 70);
              _main.ui.lineTo(742, 49 + (_n5 + 1) * 70);
              break;
            case "ceiling":
              _main.ui.moveTo(718, 49 + (_n5 + 1) * 70);
              _main.ui.lineTo(742, 57 + (_n5 + 1) * 70);
              break;
            case "wallL":
              _main.ui.moveTo(734, 41 + (_n5 + 1) * 70);
              _main.ui.lineTo(726, 65 + (_n5 + 1) * 70);
              break;
            case "wallR":
              _main.ui.moveTo(726, 41 + (_n5 + 1) * 70);
              _main.ui.lineTo(734, 65 + (_n5 + 1) * 70);
              break;
            case "fire":
              _main.ui.save();
              _main.ui.fillStyle = "rgba(255, 136, 49, 0.5)";
              break;
            case "electric":
              _main.ui.save();
              _main.ui.fillStyle = "rgba(0, 236, 255, 0.5)";
              break;
            case "slash":
              _main.ui.save();
              _main.ui.fillStyle = "rgba(210, 210, 210, 0.5)";
              break;
            case "darkness":
              _main.ui.save();
              _main.ui.fillStyle = "rgba(82, 23, 186, 0.5)";
              break;
            default:
              break;
          }
          if (targetTool === 2) {
            _main.ui.stroke();
          } else {
            _main.ui.arc(870, 53 + (_n5 + 1) * 70, 15, 0, _render.twoPi);
            _main.ui.fill();
            _main.ui.restore();
          }
        }
        _main.ui.restore();
      }
    } else {
      _main.ui.globalAlpha = (drawMode && _i13 >= 2 && _i13 <= 4 ? 0.1 : 0.2) * hoverToolbar;
    }
    if (_i13 === 8) {
      _main.ui.beginPath();
      _main.ui.moveTo(570 + _i13 * 70, 40);
      _main.ui.lineTo(590 + _i13 * 70, 25);
      _main.ui.lineTo(610 + _i13 * 70, 40);
      _main.ui.lineTo(605 + _i13 * 70, 40);
      _main.ui.lineTo(590 + _i13 * 70, 30);
      _main.ui.lineTo(575 + _i13 * 70, 40);
      _main.ui.closePath();
      _main.ui.fill();
      _main.ui.beginPath();
      _main.ui.moveTo(570 + _i13 * 70, 60);
      _main.ui.lineTo(590 + _i13 * 70, 75);
      _main.ui.lineTo(610 + _i13 * 70, 60);
      _main.ui.lineTo(605 + _i13 * 70, 60);
      _main.ui.lineTo(590 + _i13 * 70, 70);
      _main.ui.lineTo(575 + _i13 * 70, 60);
      _main.ui.closePath();
      _main.ui.fill();
      _main.ui.save();
      _main.ui.font = "16px Lucida Console, monaco, monospace";
      _main.ui.fillText(stageTemp.scale.toFixed(2), 590 + _i13 * 70, 56);
      _main.ui.restore();
    } else if (_i13 === 9) {
      _main.ui.save();
      _main.ui.fillStyle = "#4c4c4c";
      _main.ui.beginPath();
      _main.ui.moveTo(460, 40);
      _main.ui.arc(470, 40, 10, Math.PI, Math.PI * 1.5);
      _main.ui.lineTo(540, 30);
      _main.ui.arc(540, 40, 10, Math.PI * 1.5, _render.twoPi);
      _main.ui.lineTo(550, 70);
      _main.ui.arc(540, 60, 10, 0, Math.PI / 2);
      _main.ui.lineTo(470, 70);
      _main.ui.arc(470, 60, 10, Math.PI / 2, Math.PI);
      _main.ui.closePath();
      _main.ui.fill();
      _main.ui.restore();
      _main.ui.save();
      _main.ui.font = "14px Lucida Console, monaco, monospace";
      _main.ui.fillText(drawMode ? "Background" : "Stage", 505, 46);
      _main.ui.font = "10px Lucida Console, monaco, monospace";
      _main.ui.fillText(drawMode ? "(No Collision)" : "(Collision)", 505, 63);
      _main.ui.restore();
    } else {
      _main.ui.beginPath();
      _main.ui.moveTo(560 + _i13 * 70, 30);
      _main.ui.arc(570 + _i13 * 70, 30, 10, Math.PI, Math.PI * 1.5);
      _main.ui.lineTo(610 + _i13 * 70, 20);
      _main.ui.arc(610 + _i13 * 70, 30, 10, Math.PI * 1.5, _render.twoPi);
      _main.ui.lineTo(620 + _i13 * 70, 80);
      _main.ui.arc(610 + _i13 * 70, 70, 10, 0, Math.PI / 2);
      _main.ui.lineTo(570 + _i13 * 70, 80);
      _main.ui.arc(570 + _i13 * 70, 70, 10, Math.PI / 2, Math.PI);
      _main.ui.closePath();
      _main.ui.fill();
    }
  }
  _main.ui.lineWidth = 4;
  _main.ui.globalAlpha = 1;
  if (targetTool === 8) {
    var temX = 0 * stageTemp.scale + stageTemp.offset[0];
    var temY = 0 * -stageTemp.scale + stageTemp.offset[1];
    (0, _render.drawArrayPathCompress)(_main.ui, "rgb(250, 89, 89)", 1, temX, temY, animations[_main.characterSelections[targetBuilder]].WAIT[0], _main.player[targetBuilder].charAttributes.charScale * (stageTemp.scale / 4.5), _main.player[targetBuilder].charAttributes.charScale * (stageTemp.scale / 4.5), 0, 0, 0);
  }
  _main.ui.save();
  _main.ui.globalAlpha = 1 * hoverToolbar;
  _main.ui.fillStyle = "rgba(0,0,0,0.8)";
  _main.ui.strokeStyle = "rgba(0,0,0,0.8)";
  _main.ui.font = "600 14px Lucida Console, monaco, monospace";
  //ui.fillText(120 - stageTemp.box.length, 745, 707);
  _main.ui.beginPath();
  _main.ui.moveTo(590, 40);
  _main.ui.lineTo(602, 60);
  _main.ui.lineTo(578, 60);
  _main.ui.closePath();
  _main.ui.stroke();
  //ui.fillText(120 - stageTemp.platform.length, 815, 707);
  _main.ui.beginPath();
  _main.ui.moveTo(648, 50);
  _main.ui.lineTo(672, 50);
  _main.ui.stroke();
  _main.ui.beginPath();
  switch (wallType) {
    case "ground":
      _main.ui.moveTo(718, 57);
      _main.ui.lineTo(742, 49);
      break;
    case "ceiling":
      _main.ui.moveTo(718, 49);
      _main.ui.lineTo(742, 57);
      break;
    case "wallL":
      _main.ui.moveTo(734, 41);
      _main.ui.lineTo(726, 65);
      break;
    case "wallR":
      _main.ui.moveTo(726, 41);
      _main.ui.lineTo(734, 65);
      break;
    default:
      break;
  }
  _main.ui.stroke();
  _main.ui.closePath();
  _main.ui.save();
  _main.ui.scale(0.8, 1);
  _main.ui.fillText(wallType, 730 / 0.8, 35);
  _main.ui.restore();
  _main.ui.beginPath();
  _main.ui.moveTo(790, 60);
  _main.ui.lineTo(790, 40);
  _main.ui.lineTo(810, 40);
  _main.ui.stroke();
  _main.ui.closePath();
  _main.ui.save();
  _main.ui.beginPath();
  switch (damageType) {
    case "fire":
      _main.ui.fillStyle = "rgba(255, 136, 49, 0.8)";
      break;
    case "electric":
      _main.ui.fillStyle = "rgba(0, 236, 255, 0.8)";
      break;
    case "slash":
      _main.ui.fillStyle = "rgba(210, 210, 210, 0.8)";
      break;
    case "darkness":
      _main.ui.fillStyle = "rgba(82, 23, 186, 0.8)";
      break;
  }
  _main.ui.arc(870, 53, 15, 0, _render.twoPi);
  _main.ui.closePath();
  _main.ui.fill();
  _main.ui.scale(0.8, 1);
  _main.ui.fillText(damageType, 870 / 0.8, 35);
  _main.ui.restore();
  _main.ui.globalAlpha = (drawMode ? 0.5 : 1) * hoverToolbar;
  _main.ui.fillText(20 - stageTemp.target.length, 955, 77);
  _main.ui.fillStyle = "rgba(255,0,0,0.8)";
  _main.ui.beginPath();
  _main.ui.arc(940, 50, 15, 0, _render.twoPi);
  _main.ui.closePath();
  _main.ui.fill();
  _main.ui.fillStyle = "rgba(255,255,255,0.8)";
  _main.ui.beginPath();
  _main.ui.arc(940, 50, 10, 0, _render.twoPi);
  _main.ui.closePath();
  _main.ui.fill();
  _main.ui.fillStyle = "rgba(255,0,0,0.8)";
  _main.ui.beginPath();
  _main.ui.arc(940, 50, 5, 0, _render.twoPi);
  _main.ui.closePath();
  _main.ui.fill();
  _main.ui.globalAlpha = 1 * hoverToolbar;
  _main.ui.drawImage(_css.handOpen, 997, 33, 29, 38);
  _main.ui.font = "900 30px Arial";
  _main.ui.fillStyle = "rgba(252, 45, 45, 0.8)";
  _main.ui.fillText("X", 1080, 62);
  _main.ui.restore();
  _main.ui.font = "13px Lucida Console, monaco, monospace";
  if (tooSmallTimer > 0) {
    exports.tooSmallTimer = tooSmallTimer -= 1;
    _main.ui.fillStyle = "rgba(0,0,0," + Math.min(tooSmallTimer / 30, 1) + ")";
    _main.ui.fillRect(tooSmallPos.x + 30, tooSmallPos.y, 80, 25);
    _main.ui.fillStyle = "rgba(255,255,255," + Math.min(tooSmallTimer / 30, 1) + ")";
    _main.ui.fillText("Too small", tooSmallPos.x + 70, tooSmallPos.y + 17);
  }
  if (badAngleTimer > 0) {
    exports.badAngleTimer = badAngleTimer -= 1;
    _main.ui.fillStyle = "rgba(0,0,0," + Math.min(badAngleTimer / 30, 1) + ")";
    _main.ui.fillRect(badAnglePos.x + 30, badAnglePos.y, 80, 25);
    _main.ui.fillStyle = "rgba(255,255,255," + Math.min(badAngleTimer / 30, 1) + ")";
    _main.ui.fillText("Bad angle", badAnglePos.x + 70, badAnglePos.y + 17);
  }
  if (wallsTooCloseTimer > 0) {
    exports.wallsTooCloseTimer = wallsTooCloseTimer -= 1;
    _main.ui.fillStyle = "rgba(0,0,0," + Math.min(wallsTooCloseTimer / 30, 1) + ")";
    _main.ui.fillRect(wallsTooClosePos.x + 25, wallsTooClosePos.y, 110, 25);
    _main.ui.fillStyle = "rgba(255,255,255," + Math.min(wallsTooCloseTimer / 30, 1) + ")";
    _main.ui.fillText("Walls too close", wallsTooClosePos.x + 70, wallsTooClosePos.y + 17);
  }
  if (targetTool == 6) {
    if (grabbedItem == 0) {
      _main.ui.drawImage(_css.handOpen, crossHairPos.x * stageTemp.scale + 600 - 18, crossHairPos.y * -stageTemp.scale + 375 - 24, 36, 48);
    } else {
      _main.ui.drawImage(_css.handGrab, crossHairPos.x * stageTemp.scale + 600 - 18, crossHairPos.y * -stageTemp.scale + 375 - 24, 36, 48);
    }
  } else if (targetTool == 7) {
    _main.ui.font = "900 40px Arial";
    _main.ui.fillStyle = "rgb(255, 83, 83)";
    _main.ui.strokeStyle = "black";
    _main.ui.fillText("X", crossHairPos.x * stageTemp.scale + 600, crossHairPos.y * -stageTemp.scale + 375 + 10);
    _main.ui.strokeText("X", crossHairPos.x * stageTemp.scale + 600, crossHairPos.y * -stageTemp.scale + 375 + 10);
  } else {
    _main.ui.fillStyle = "#ffffff";
    _main.ui.fillRect(crossHairPos.x * stageTemp.scale + 600 - 2, crossHairPos.y * -stageTemp.scale + 375 - 10, 4, 20);
    _main.ui.fillRect(crossHairPos.x * stageTemp.scale + 600 - 10, crossHairPos.y * -stageTemp.scale + 375 - 2, 20, 4);
  }

  if (builderPaused) {
    _main.ui.fillStyle = "rgba(0,0,0,0.4)";
    _main.ui.fillRect(0, 0, _main.layers.UI.width, _main.layers.UI.height);
    for (var _i14 = 0; _i14 < 3; _i14++) {
      if (builderPauseSelected == _i14) {
        _main.ui.fillStyle = "rgba(255,255,255,0.9)";
      } else {
        _main.ui.fillStyle = "rgba(255,255,255,0.2)";
      }
      _main.ui.fillRect(400, 150 + _i14 * 150, 400, 100);
    }
    _main.ui.font = "900 50px Arial";
    _main.ui.fillStyle = "rgba(0,0,0,0.8)";
    _main.ui.fillText("Test stage", 600, 220);
    _main.ui.fillText("Save stage", 600, 370);
    _main.ui.fillText("Quit", 600, 520);
  }
}

function findStartingPoint(realCrossHair) {
  var found = false;
  for (var i = 0; i < stageTemp.startingPoint.length; i++) {
    if (Math.abs(crossHairPos.x - stageTemp.startingPoint[i].x) <= 5 && Math.abs(crossHairPos.y - stageTemp.startingPoint[i].y) <= 5) {
      hoverItem = ["startingPoint", i];
      found = true;
      break;
    }
  }
  return found;
}

function findTarget(realCrossHair) {
  var found = false;
  for (var i = 0; i < stageTemp.target.length; i++) {
    if (Math.abs(crossHairPos.x - stageTemp.target[i].x) <= 5 && Math.abs(crossHairPos.y - stageTemp.target[i].y) <= 5) {
      hoverItem = ["target", i];
      found = true;
      break;
    }
  }
  return found;
}

function findLine(realCrossHair) {
  var background = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var types = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ["platform", "ground", "ceiling", "wallL", "wallR"];
  var ignorePolygon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var found = false;
  var line = 0;
  var closestDist = 11;
  var closest = [];
  var tempDist = 0;
  for (var i = 0; i < types.length; i++) {
    if (background) {
      line = stageTemp.background[types[i]];
    } else {
      line = stageTemp[types[i]];
    }
    for (var j = 0; j < line.length; j++) {
      tempDist = (0, _detectIntersections.distanceToLine)(crossHairPos, line[j]);
      if (tempDist <= closestDist) {
        if (i === 0) {
          closestDist = tempDist;
          hoverItem = [background ? "line" : types[i], j];
          found = true;
        } else {
          var partOfPolygon = false;
          if (!ignorePolygon) {
            for (var p = 0; p < stageTemp.polygonMap.length; p++) {
              if (stageTemp.polygonMap[p] !== null) {
                for (var k = 0; k < stageTemp.polygonMap[p].length; k++) {
                  if (stageTemp.polygonMap[p][k][0] === types[i] && stageTemp.polygonMap[p][k][1] === j) {
                    partOfPolygon = true;
                    break;
                  }
                }
              }
              if (partOfPolygon) {
                break;
              }
            }
          }
          if (!partOfPolygon) {
            closestDist = tempDist;
            hoverItem = [types[i], j];
            found = true;
          }
        }
      }
    }
  }
  return found;
}

function findPolygon(realCrossHair) {
  var background = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var found = false;
  var poly = stageTemp.polygon;
  if (background) {
    poly = stageTemp.background.polygon;
  }
  for (var i = 0; i < poly.length; i++) {
    var d = (0, _detectIntersections.distanceToPolygon)(new _Vec2D.Vec2D(realCrossHair.x, realCrossHair.y), poly[i]);
    if (d < 5) {
      hoverItem = [background ? "polygonBG" : "polygon", i];
      found = true;
      break;
    }
  }
  return found;
}

function centerItem(item, realCrossHair) {
  var offset = new _Vec2D.Vec2D(crossHairPos.x - prevCrossHairPos.x, crossHairPos.y - prevCrossHairPos.y);
  var offsetR = new _Vec2D.Vec2D(realCrossHair.x - prevRealCrossHair.x, realCrossHair.y - prevRealCrossHair.y);
  switch (item[0]) {
    case "startingPoint":
      stageTemp.startingPoint[item[1]] = new _Vec2D.Vec2D(crossHairPos.x, crossHairPos.y);
      break;
    case "target":
      stageTemp.target[item[1]] = new _Vec2D.Vec2D(crossHairPos.x, crossHairPos.y);
      break;
    case "platform":
    case "ground":
    case "ceiling":
    case "wallL":
    case "wallR":
      stageTemp[item[0]][item[1]][0].x += offset.x;
      stageTemp[item[0]][item[1]][1].x += offset.x;
      stageTemp[item[0]][item[1]][0].y += offset.y;
      stageTemp[item[0]][item[1]][1].y += offset.y;
      break;
    case "polygon":
      for (var i = 0; i < stageTemp.polygon[item[1]].length; i++) {
        stageTemp.polygon[item[1]][i].x += offset.x;
        stageTemp.polygon[item[1]][i].y += offset.y;
        if (stageTemp.polygonMap[item[1]] !== null) {
          stageTemp[stageTemp.polygonMap[item[1]][i][0]][stageTemp.polygonMap[item[1]][i][1]][0].x += offset.x;
          stageTemp[stageTemp.polygonMap[item[1]][i][0]][stageTemp.polygonMap[item[1]][i][1]][1].x += offset.x;
          stageTemp[stageTemp.polygonMap[item[1]][i][0]][stageTemp.polygonMap[item[1]][i][1]][0].y += offset.y;
          stageTemp[stageTemp.polygonMap[item[1]][i][0]][stageTemp.polygonMap[item[1]][i][1]][1].y += offset.y;
        }
      }
      break;
    case "line":
      stageTemp.background[item[0]][item[1]][0].x += offset.x;
      stageTemp.background[item[0]][item[1]][1].x += offset.x;
      stageTemp.background[item[0]][item[1]][0].y += offset.y;
      stageTemp.background[item[0]][item[1]][1].y += offset.y;
      break;
    case "polygonBG":
      for (var _i15 = 0; _i15 < stageTemp.background.polygon[item[1]].length; _i15++) {
        stageTemp.background.polygon[item[1]][_i15].x += offset.x;
        stageTemp.background.polygon[item[1]][_i15].y += offset.y;
      }
      break;
    default:
      break;
  }
}

function setEditingStage(val) {
  exports.editingStage = editingStage = val;
}
function setShowingCode(val) {
  exports.showingCode = showingCode = val;
}
function setTargetBuilder(val) {
  exports.targetBuilder = targetBuilder = val;
}
function resetStageTemp() {
  exports.stageTemp = stageTemp = {};
}
function setStageTemp(val) {
  exports.stageTemp = stageTemp = val;
}

//////////////////
// WEBPACK FOOTER
// ./src/target/targetbuilder.js
// module id = 126
// module chunks = 1
//# sourceURL=webpack:///./src/target/targetbuilder.js?