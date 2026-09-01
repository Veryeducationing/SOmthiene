"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.snowMeltTime = exports.backgroundType = exports.boxFillBG = exports.boxFill = undefined;
exports.drawStageInit = drawStageInit;
exports.calculateDamageWallColours = calculateDamageWallColours;
exports.drawDamageLine = drawDamageLine;
exports.drawStage = drawStage;
exports.setBackgroundType = setBackgroundType;
exports.bgStar = bgStar;
exports.drawBackgroundInit = drawBackgroundInit;
exports.drawBackground = drawBackground;
exports.drawTunnel = drawTunnel;
exports.drawStars = drawStars;
exports.snowBall = snowBall;
exports.createSnow = createSnow;
exports.snowCollision = snowCollision;
exports.drawSnow = drawSnow;

var _transparency = __webpack_require__(16);

var _main = __webpack_require__(11);

var _targetplay = __webpack_require__(125);

var _render = __webpack_require__(13);

var _activeStage = __webpack_require__(18);

var _Vec2D = __webpack_require__(22);

var _linAlg = __webpack_require__(29);

var bgPos = [[-30, 500, 300, 500, 900, 500, 1230, 450, 358], [-30, 400, 300, 400, 900, 400, 1230, 350, 179]];
var direction = [[1, -1, 1, -1, 1, -1, 1, -1, 1], [-1, 1, -1, 1, -1, 1, -1, 1, -1]];
var boxFill = exports.boxFill = "rgba(0, 0, 0, 0.1)";
var boxFillBG = exports.boxFillBG = "rgba(0, 0, 0, 0.1)";

var bgStars = [];
for (var p = 0; p < 20; p++) {
  bgStars[p] = new bgStar();
  bgStars[p].pos = new _Vec2D.Vec2D(600 + 100 * Math.random() * bgStars[p].velocity.x, 375 + 100 * Math.random() * bgStars[p].velocity.y);
}
var bgSparkle = 3;
var gridGrad = "rgba(94,173,255,0.2)";

var circleSize = [];
for (var i = 0; i < 5; i++) {
  circleSize[i] = i * 40;
}
var ang = 0;
var backgroundType = exports.backgroundType = 0;
var snowMeltTime = exports.snowMeltTime = 200;

var snowBalls = [];

var targetbauble = new Image();
targetbauble.src = "assets/christmas/targetbauble.png";

var scandypattern = new Image();
scandypattern.src = "assets/christmas/scandypattern.png";

var fabric = new Image();
fabric.src = "assets/christmas/fabric.png";

var randall = [new Image(), new Image(), new Image()];
randall[0].src = "assets/stage/randall1.png";
randall[1].src = "assets/stage/randall2.png";
randall[2].src = "assets/stage/randall3.png";
var randallTimer = 0;

function drawStageInit() {
  _main.fg1.strokeStyle = _main.holiday === 1 ? "white" : "#db80cc";
  _main.fg1.lineWidth = 1;

  for (var j = 0; j < _activeStage.activeStage.ground.length; j++) {
    _main.fg1.beginPath();
    _main.fg1.moveTo(_activeStage.activeStage.ground[j][0].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _activeStage.activeStage.ground[j][0].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
    _main.fg1.lineTo(_activeStage.activeStage.ground[j][1].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _activeStage.activeStage.ground[j][1].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
    _main.fg1.closePath();
    _main.fg1.stroke();
  }
  _main.fg1.strokeStyle = _main.holiday === 1 ? "white" : "#ed6767";
  for (var _j = 0; _j < _activeStage.activeStage.ceiling.length; _j++) {
    _main.fg1.beginPath();
    _main.fg1.moveTo(_activeStage.activeStage.ceiling[_j][0].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _activeStage.activeStage.ceiling[_j][0].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
    _main.fg1.lineTo(_activeStage.activeStage.ceiling[_j][1].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _activeStage.activeStage.ceiling[_j][1].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
    _main.fg1.closePath();
    _main.fg1.stroke();
  }

  if (_main.holiday === 1) {
    if (_activeStage.activeStage.box !== null && _activeStage.activeStage.box !== undefined) {
      _main.fg1.save();
      _main.fg1.globalAlpha = 1;
      _main.fg1.beginPath();
      for (var _j2 = 0; _j2 < _activeStage.activeStage.box.length; _j2++) {
        _main.fg1.rect(_activeStage.activeStage.box[_j2].min.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _activeStage.activeStage.box[_j2].max.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], (_activeStage.activeStage.box[_j2].max.x - _activeStage.activeStage.box[_j2].min.x) * _activeStage.activeStage.scale, (_activeStage.activeStage.box[_j2].max.y - _activeStage.activeStage.box[_j2].min.y) * _activeStage.activeStage.scale);
      }
      _main.fg1.clip();
      _main.fg1.drawImage(scandypattern, 0, 0, 1200, 750);
      _main.fg1.restore();
    }
    _main.fg1.save();
    _main.fg1.beginPath();
    for (var _j3 = 0; _j3 < _activeStage.activeStage.platform.length; _j3++) {
      if (_activeStage.activeStage.movingPlats === null || _activeStage.activeStage.movingPlats === undefined || _activeStage.activeStage.movingPlats.indexOf(_j3) === -1) {
        // not a moving platform
        var x1 = _activeStage.activeStage.platform[_j3][0].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0];
        var x2 = _activeStage.activeStage.platform[_j3][1].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0];
        _main.fg1.rect(x1, _activeStage.activeStage.platform[_j3][0].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], x2 - x1, 2 * _activeStage.activeStage.scale);
      }
    }
    _main.fg1.clip();
    _main.fg1.lineWidth = 6;
    _main.fg1.fillStyle = "white";
    _main.fg1.fillRect(0, 0, 1200, 750);
    _main.fg1.strokeStyle = "red";
    _main.fg1.beginPath();
    for (var _j4 = 0; _j4 < 110; _j4++) {
      _main.fg1.moveTo(_j4 * 20, 0);
      _main.fg1.lineTo(_j4 * 20 - 750, 750);
    }
    _main.fg1.stroke();
    _main.fg1.restore();
  } else {
    _main.fg1.strokeStyle = "#4794c6";
    for (var _j5 = 0; _j5 < _activeStage.activeStage.platform.length; _j5++) {
      if (_activeStage.activeStage.movingPlats === null || _activeStage.activeStage.movingPlats === undefined || _activeStage.activeStage.movingPlats.indexOf(_j5) === -1) {
        // not a moving platform
        _main.fg1.beginPath();
        _main.fg1.moveTo(_activeStage.activeStage.platform[_j5][0].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _activeStage.activeStage.platform[_j5][0].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
        _main.fg1.lineTo(_activeStage.activeStage.platform[_j5][1].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _activeStage.activeStage.platform[_j5][1].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
        _main.fg1.closePath();
        _main.fg1.stroke();
      }
    }
  }

  _main.fg1.strokeStyle = _main.holiday === 1 ? "white" : "#47c648";
  for (var k = 0; k < _activeStage.activeStage.wallL.length; k++) {
    _main.fg1.beginPath();
    _main.fg1.moveTo(_activeStage.activeStage.wallL[k][0].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _activeStage.activeStage.wallL[k][0].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
    _main.fg1.lineTo(_activeStage.activeStage.wallL[k][1].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _activeStage.activeStage.wallL[k][1].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
    _main.fg1.closePath();
    _main.fg1.stroke();
  }
  _main.fg1.strokeStyle = _main.holiday === 1 ? "white" : "#9867de";
  for (var l = 0; l < _activeStage.activeStage.wallR.length; l++) {
    _main.fg1.beginPath();
    _main.fg1.moveTo(_activeStage.activeStage.wallR[l][0].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _activeStage.activeStage.wallR[l][0].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
    _main.fg1.lineTo(_activeStage.activeStage.wallR[l][1].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _activeStage.activeStage.wallR[l][1].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
    _main.fg1.closePath();
    _main.fg1.stroke();
  }

  if (_main.holiday === 1) {
    /*let ex1 = 0;
    let ex2 = 0;
    fg1.save();
    fg1.lineCap="round";
    for (let n = 0; n < 2; n++){
      if (n === 0){
        ex1 = 0;
        ex2 = Math.floor(1.5*activeStage.scale);
        fg1.beginPath();
      }
      else {
        ex1 = Math.floor(1*activeStage.scale);
        ex2 = Math.floor(-1*activeStage.scale);
        fg1.setLineDash([Math.floor(1.5*activeStage.scale), Math.floor(3.5*activeStage.scale)]);          
      }
      for (let j = 0; j < activeStage.ledge.length; j++) {
        let e = activeStage.ledge[j];
        if (n === 1){
          fg1.lineWidth = Math.floor(0.8*activeStage.scale)+1;
          fg1.strokeStyle = "#43401D";
          fg1.beginPath();
        }
        if (e[1]) {
            fg1.moveTo(activeStage.box[e[0]].max.x * activeStage.scale + activeStage.offset[0] -ex1, (activeStage.box[e[0]].max.y - Math.min(10, (activeStage.box[e[0]].max.y - activeStage.box[e[0]].min.y) / 2)) * -activeStage.scale + activeStage.offset[1] +ex2);
            fg1.lineTo(activeStage.box[e[0]].max.x * activeStage.scale + activeStage.offset[0] -ex1, activeStage.box[e[0]].max.y * -activeStage.scale + activeStage.offset[1] +ex1);
            fg1.lineTo((activeStage.box[e[0]].max.x - Math.min(10, (activeStage.box[e[0]].max.x - activeStage.box[e[0]].min.x) / 2)) * activeStage.scale + activeStage.offset[0] -ex2, activeStage.box[e[0]].max.y * -activeStage.scale + activeStage.offset[1] +ex1);
        }
        else {
            fg1.moveTo(activeStage.box[e[0]].min.x * activeStage.scale + activeStage.offset[0] +ex1, (activeStage.box[e[0]].max.y - Math.min(10, (activeStage.box[e[0]].max.y - activeStage.box[e[0]].min.y) / 2)) * -activeStage.scale + activeStage.offset[1] +ex2);
            fg1.lineTo(activeStage.box[e[0]].min.x * activeStage.scale + activeStage.offset[0] +ex1, activeStage.box[e[0]].max.y * -activeStage.scale + activeStage.offset[1] +ex1);
            fg1.lineTo((activeStage.box[e[0]].min.x + Math.min(10, (activeStage.box[e[0]].max.x - activeStage.box[e[0]].min.x) / 2)) * activeStage.scale + activeStage.offset[0] +ex2, activeStage.box[e[0]].max.y * -activeStage.scale + activeStage.offset[1] +ex1);
        }
        if (n === 1) {
          fg1.closePath();
          fg1.stroke();
          fg1.lineWidth = Math.floor(0.8*activeStage.scale);
          fg1.strokeStyle = "white";
          fg1.stroke();
        }   
      }
      if (n === 0) {
        fg1.closePath();
        fg1.save();
        fg1.clip();
        fg1.drawImage(fabric,0,0);
        fg1.restore();
      }  
    
    }
    fg1.restore();
    fg1.lineCap = "butt";
    fg1.lineWidth = 1;*/
  } else {
    _main.fg1.strokeStyle = "#E7A44C";
    _main.fg1.lineWidth = 2;
    for (var _i = 0; _i < _activeStage.activeStage.ledge.length; _i++) {
      var e = _activeStage.activeStage.ledge[_i];
      var pA = _activeStage.activeStage[e[0]][e[1]][e[2]];
      var pB = _activeStage.activeStage[e[0]][e[1]][1 - e[2]];
      var _ang = Math.atan2(pB.y - pA.y, pB.x - pA.x);
      var magnitude = (0, _linAlg.euclideanDist)(pA, pB);
      var length = Math.min(0.4 * magnitude, 20 / _activeStage.activeStage.scale);
      var pC = new _Vec2D.Vec2D(pA.x + length * Math.cos(_ang), pA.y + length * Math.sin(_ang));
      _main.fg1.beginPath();
      _main.fg1.moveTo(pA.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], pA.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
      _main.fg1.lineTo(pC.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], pC.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
      _main.fg1.closePath();
      _main.fg1.stroke();
    }
  }
};

var swirlTimer = 0;
var swirlSwitch = false;

var wallColour = ["rgb(255,0,40)", "rgb(0,255,255)", "rgb(125,125,125)", "rgb(125,50,255)"];

function wallColourFromDamageType(damageType) {
  if (damageType === "fire") {
    return wallColour[0];
  } else if (damageType === "electric") {
    return wallColour[1];
  } else if (damageType === "slash") {
    return wallColour[2];
  } else if (damageType === "darkness") {
    return wallColour[3];
  } else {
    return "rgb(0,50,180)";
  }
};

var wallCycle = 0;

function calculateDamageWallColours() {
  var a = 0;
  if (wallCycle < 240) {
    wallCycle++;
    if (wallCycle > 120) {
      a = 240 - wallCycle;
    } else {
      a = wallCycle;
    }
  } else {
    wallCycle = 0;
  }
  var n = Math.round(255 * a / 120);
  wallColour[0] = "rgb(255," + n + ",40)";
  wallColour[1] = "rgb(" + n + ",255,255)";
  var m = Math.round(125 + n / 2);
  wallColour[2] = "rgb(" + m + "," + m + "," + m + ")";
  wallColour[3] = "rgb(" + Math.round(125 - n / 3) + ",50," + Math.round(255 - n / 3) + ")";
}

function drawDamageLine(type, can, stage) {
  for (var _i2 = 0; _i2 < stage[type].length; _i2++) {
    var surfaceProperties = stage[type][_i2][2];
    if (surfaceProperties !== undefined && surfaceProperties.damageType !== null) {
      can.strokeStyle = wallColourFromDamageType(surfaceProperties.damageType);
      can.beginPath();
      can.moveTo(stage[type][_i2][0].x * stage.scale + stage.offset[0], stage[type][_i2][0].y * -stage.scale + stage.offset[1]);
      can.lineTo(stage[type][_i2][1].x * stage.scale + stage.offset[0], stage[type][_i2][1].y * -stage.scale + stage.offset[1]);
      can.stroke();
    }
  }
}

function drawStage() {
  calculateDamageWallColours();
  if (_activeStage.activeStage.name === "ystory") {
    // Randall
    randallTimer++;
    if (randallTimer === 30) {
      randallTimer = 0;
    }
    _main.bg2.drawImage(randall[Math.floor(randallTimer / 10)], _activeStage.activeStage.platform[0][0].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0] - 20, _activeStage.activeStage.platform[0][0].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1] - 20, 100, 100);
  } else if (_activeStage.activeStage.movingPlats !== null && _activeStage.activeStage.movingPlats !== undefined && _activeStage.activeStage.movingPlats.length !== 0) {
    _main.fg2.strokeStyle = "#4794c6";
    for (var _i3 = 0; _i3 < _activeStage.activeStage.movingPlats.length; _i3++) {
      if (_activeStage.activeStage.name !== "fountain" || _activeStage.activeStage.platform[_activeStage.activeStage.movingPlats[_i3]][0].y > 0) {
        _main.fg2.beginPath();
        _main.fg2.moveTo(_activeStage.activeStage.platform[_activeStage.activeStage.movingPlats[_i3]][0].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _activeStage.activeStage.platform[_activeStage.activeStage.movingPlats[_i3]][0].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
        _main.fg2.lineTo(_activeStage.activeStage.platform[_activeStage.activeStage.movingPlats[_i3]][1].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _activeStage.activeStage.platform[_activeStage.activeStage.movingPlats[_i3]][1].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
        _main.fg2.closePath();
        _main.fg2.stroke();
      }
    }
  }
  _main.fg2.fillStyle = boxFill;

  if (_main.holiday !== 1) {
    if (_activeStage.activeStage.box !== null && _activeStage.activeStage.box !== undefined) {
      for (var j = 0; j < _activeStage.activeStage.box.length; j++) {
        _main.fg2.fillRect(_activeStage.activeStage.box[j].min.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _activeStage.activeStage.box[j].max.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], (_activeStage.activeStage.box[j].max.x - _activeStage.activeStage.box[j].min.x) * _activeStage.activeStage.scale, (_activeStage.activeStage.box[j].max.y - _activeStage.activeStage.box[j].min.y) * _activeStage.activeStage.scale);
      }
    }
    if (_activeStage.activeStage.polygon !== null && _activeStage.activeStage.polygon !== undefined) {
      for (var _j6 = 0; _j6 < _activeStage.activeStage.polygon.length; _j6++) {
        var _p = _activeStage.activeStage.polygon[_j6];
        _main.fg2.beginPath();
        _main.fg2.moveTo(_p[0].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _p[0].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
        for (var n = 1; n < _p.length; n++) {
          _main.fg2.lineTo(_p[n].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _p[n].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
        }
        _main.fg2.closePath();
        _main.fg2.fill();
      }
    }
    if (_activeStage.activeStage.background !== null && _activeStage.activeStage.background !== undefined) {
      if (_activeStage.activeStage.background.polygon !== null && _activeStage.activeStage.background.polygon !== undefined) {
        _main.bg2.save();
        _main.bg2.fillStyle = boxFillBG;
        for (var _i4 = 0; _i4 < _activeStage.activeStage.background.polygon.length; _i4++) {
          var _p2 = _activeStage.activeStage.background.polygon[_i4];
          _main.bg2.beginPath();
          _main.bg2.moveTo(_p2[0].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _p2[0].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
          for (var _n = 1; _n < _p2.length; _n++) {
            _main.bg2.lineTo(_p2[_n].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _p2[_n].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
          }
          _main.bg2.closePath();
          _main.bg2.fill();
        }
      }
      if (_activeStage.activeStage.background.line !== null && _activeStage.activeStage.background.line !== undefined) {
        _main.bg2.lineWidth = 3;
        _main.bg2.strokeStyle = boxFillBG;
        for (var _i5 = 0; _i5 < _activeStage.activeStage.background.line.length; _i5++) {
          var lL = _activeStage.activeStage.background.line[_i5][0];
          var lR = _activeStage.activeStage.background.line[_i5][1];
          _main.bg2.beginPath();
          _main.bg2.moveTo(lL.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], lL.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
          _main.bg2.lineTo(lR.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], lR.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
          _main.bg2.closePath();
          _main.bg2.stroke();
        }
        _main.bg2.restore();
      }
    }
  }
  _main.fg2.lineWidth = 4;
  var types = ["wallL", "wallR", "ground", "ceiling"];
  for (var _i6 = 0; _i6 < types.length; _i6++) {
    drawDamageLine(types[_i6], _main.fg2, _activeStage.activeStage);
  }

  _main.fg2.strokeStyle = "#e7a44c";

  var ex = 0;
  /*if (holiday !== 1){
    for (let j = 0; j < activeStage.ledge.length; j++) {
      const e = activeStage.ledge[j];   
      fg2.beginPath();
      if (e[1]) {
        fg2.moveTo(activeStage.box[e[0]].max.x * activeStage.scale + activeStage.offset[0] -ex, (activeStage.box[e[0]].max.y - Math.min(10, (activeStage.box[e[0]].max.y - activeStage.box[e[0]].min.y) / 2)) * -activeStage.scale + activeStage.offset[1] +ex);
        fg2.lineTo(activeStage.box[e[0]].max.x * activeStage.scale + activeStage.offset[0] -ex, activeStage.box[e[0]].max.y * -activeStage.scale + activeStage.offset[1] +ex);
        fg2.lineTo((activeStage.box[e[0]].max.x - Math.min(10, (activeStage.box[e[0]].max.x - activeStage.box[e[0]].min.x) / 2)) * activeStage.scale + activeStage.offset[0] -ex, activeStage.box[e[0]].max.y * -activeStage.scale + activeStage.offset[1] +ex);
      }
      else {
        fg2.moveTo(activeStage.box[e[0]].min.x * activeStage.scale + activeStage.offset[0] +ex, (activeStage.box[e[0]].max.y - Math.min(10, (activeStage.box[e[0]].max.y - activeStage.box[e[0]].min.y) / 2)) * -activeStage.scale + activeStage.offset[1] +ex);
        fg2.lineTo(activeStage.box[e[0]].min.x * activeStage.scale + activeStage.offset[0] +ex, activeStage.box[e[0]].max.y * -activeStage.scale + activeStage.offset[1] +ex);
        fg2.lineTo((activeStage.box[e[0]].min.x + Math.min(10, (activeStage.box[e[0]].max.x - activeStage.box[e[0]].min.x) / 2)) * activeStage.scale + activeStage.offset[0] +ex, activeStage.box[e[0]].max.y * -activeStage.scale + activeStage.offset[1] +ex);
      }
      fg2.closePath();
      fg2.stroke();
      fg2.fill();
      fg2.fill();
    }
  }*/

  if (typeof _activeStage.activeStage.target !== "undefined") {
    _main.fg2.strokeStyle = "rgba(255,255,255,0.4)";
    _main.fg2.lineWidth = 1;
    for (var k = 0; k < _activeStage.activeStage.target.length; k++) {
      if (!_targetplay.targetDestroyed[k]) {
        var x = _activeStage.activeStage.target[k].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0];
        var y = _activeStage.activeStage.target[k].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1];
        if (_main.holiday === 1) {
          _main.fg2.drawImage(targetbauble, x - 17, y - 25, 35, 43);
          _main.fg2.beginPath();
          _main.fg2.moveTo(x, y - 23);
          _main.fg2.lineTo(x, 0);
          _main.fg2.closePath();
          _main.fg2.stroke();
        } else {
          for (var _j7 = 0; _j7 < 5; _j7++) {
            _main.fg2.fillStyle = _j7 % 2 ? "white" : "red";
            _main.fg2.beginPath();
            _main.fg2.arc(x, y, (25 - _j7 * 5) * (_activeStage.activeStage.scale / 4.5), 0, _render.twoPi);
            _main.fg2.closePath();
            _main.fg2.fill();
          }
        }
      }
    }
  }
};

function setBackgroundType(val) {
  exports.backgroundType = backgroundType = val;
};
function bgStar() {
  var vSeed = Math.random();
  this.velocity = new _Vec2D.Vec2D(5 * vSeed * Math.sign(0.5 - Math.random()), 5 * (1 - vSeed) * Math.sign(0.5 - Math.random()));
  if ((0, _transparency.getTransparency)()) {
    this.colour = "hsl(" + 358 * Math.random() + ", 100%, 50%)";
  } else {
    this.colour = "hsl(" + 358 * Math.random() + ",100%,15%)";
  }
  this.pos = new _Vec2D.Vec2D(0, 0);
  this.life = 0;
};
function drawBackgroundInit() {
  var bgGrad = _main.bg1.createLinearGradient(0, 0, 0, 500);
  bgGrad.addColorStop(0, _main.holiday === 1 ? "rgb(46, 100, 147)" : "rgb(24, 17, 66)");
  bgGrad.addColorStop(1, "black");
  _main.bg1.fillStyle = bgGrad;
  _main.bg1.fillRect(-100, -100, _main.layers.BG1.width + 200, _main.layers.BG1.height + 200);
  ;
  if (backgroundType === 1 || _main.holiday === 1) {
    var _gridGrad = _main.bg2.createRadialGradient(600, 375, 1, 600, 375, 800);
    _gridGrad.addColorStop(0, "rgba(94, 173, 255, 0)");
    _gridGrad.addColorStop(1, "rgba(94, 173, 255, 0.2)");
    _main.bg2.strokeStyle = _gridGrad;
    exports.boxFill = boxFill = "rgba(94, 173, 255, 0.3)";
    exports.boxFillBG = boxFillBG = "rgba(94, 173, 255, 0.25)";
  }
};

function drawBackground() {
  if (_main.holiday === 1) {
    if (_main.gameMode !== 4) {
      drawSnow();
    }
  } else {
    if (backgroundType === 0) {
      drawStars();
    } else {
      drawTunnel();
    }
  }
};

function drawTunnel() {
  _main.bg2.lineWidth = 2;
  ang += 0.005;
  var angB = ang;
  _main.bg2.beginPath();
  for (var _i7 = 0; _i7 < 16; _i7++) {
    var v = (0, _render.rotateVector)(0, 800, angB);
    _main.bg2.moveTo(600, 375);
    _main.bg2.lineTo(600 + v.x, 375 + v.y);
    angB += Math.PI / 8;
  }
  _main.bg2.stroke();
  for (var _i8 = 0; _i8 < circleSize.length; _i8++) {
    circleSize[_i8]++;
    if (circleSize[_i8] > 200) {
      circleSize[_i8] = 0;
    }
    _main.bg2.lineWidth = Math.max(1, Math.round(3 * (circleSize[_i8] / 60)));
    _main.bg2.beginPath();
    _main.bg2.arc(600, 375, circleSize[_i8] * 4, 0, _render.twoPi);
    _main.bg2.closePath();
    _main.bg2.stroke();
  }
};

function drawStars() {
  bgSparkle--;
  for (var _p3 = 0; _p3 < 20; _p3++) {
    if (bgStars[_p3].pos.x > 1250 || bgStars[_p3].pos.y > 800 || bgStars[_p3].pos.x < -50 || bgStars[_p3].pos.y < -50) {
      bgStars[_p3].pos = new _Vec2D.Vec2D(600, 375);
      bgStars[_p3].life = 0;
      var vSeed = Math.random();
      bgStars[_p3].velocity = new _Vec2D.Vec2D(5 * vSeed * Math.sign(0.5 - Math.random()), 5 * (1 - vSeed) * Math.sign(0.5 - Math.random()));
    }
    bgStars[_p3].pos.x += bgStars[_p3].velocity.x;
    bgStars[_p3].pos.y += bgStars[_p3].velocity.y;

    bgStars[_p3].life++;

    if (bgSparkle === 0) {
      _main.bg2.fillStyle = bgStars[_p3].colour;
      if ((0, _transparency.getTransparency)()) {
        _main.bg2.globalAlpha = Math.min(bgStars[_p3].life / 300, 1);
      }
      _main.bg2.beginPath();
      _main.bg2.arc(bgStars[_p3].pos.x, bgStars[_p3].pos.y, 5, _render.twoPi, 0);
      ;
      _main.bg2.fill();
    }
  }
  if (bgSparkle === 0) {
    bgSparkle = 2;
  }
  _main.bg2.globalAlpha = 1;
  for (var k = 1; k > -1; k--) {
    for (var j = 0; j < 9; j++) {
      //bgPos[j] += direction[j]*5*Math.random();
      if (j === 8) {
        bgPos[k][j] += direction[k][j] * 0.2 * Math.random();
      } else {
        bgPos[k][j] += direction[k][j] * 1 * Math.random();
      }
      switch (j) {
        case 0:
          if (direction[k][j] === 1 && bgPos[k][j] > -10 || direction[k][j] === -1 && bgPos[k][j] < -200) {
            direction[k][j] *= -1;
          }
          break;
        case 1:
          if (direction[k][j] === 1 && bgPos[k][j] > 550 - k * 100 || direction[k][j] === -1 && bgPos[k][j] < 450 - k * 100) {
            direction[k][j] *= -1;
          }
          break;
        case 2:
          if (direction[k][j] === 1 && bgPos[k][j] > 550 || direction[k][j] === -1 && bgPos[k][j] < 0) {
            direction[k][j] *= -1;
          }
          break;
        case 3:
          if (direction[k][j] === 1 && bgPos[k][j] > 550 - k * 100 || direction[k][j] === -1 && bgPos[k][j] < 450 - k * 100) {
            direction[k][j] *= -1;
          }
          break;
        case 4:
          if (direction[k][j] === 1 && bgPos[k][j] > 1150 || direction[k][j] === -1 && bgPos[k][j] < 600) {
            direction[k][j] *= -1;
          }
          break;
        case 5:
          if (direction[k][j] === 1 && bgPos[k][j] > 550 - k * 100 || direction[k][j] === -1 && bgPos[k][j] < 450 - k * 100) {
            direction[k][j] *= -1;
          }
          break;
        case 6:
          if (direction[k][j] === 1 && bgPos[k][j] > 1400 || direction[k][j] === -1 && bgPos[k][j] < 1210) {
            direction[k][j] *= -1;
          }
          break;
        case 7:
          if (direction[k][j] === 1 && bgPos[k][j] > 550 - k * 100 || direction[k][j] === -1 && bgPos[k][j] < 450 - k * 100) {
            direction[k][j] *= -1;
          }
          break;
        case 8:
          if (direction[k][j] === 1 && bgPos[k][j] > 357 || direction[k][j] === -1 && bgPos[k][j] < 1) {
            direction[k][j] *= -1;
          }
          break;
        default:
          break;
      }
    }
    if ((0, _transparency.getTransparency)()) {
      exports.boxFill = boxFill = "hsla(" + bgPos[k][8] + ", 100%, 50%, " + (0.15 - k * 0.07) + ")";
      exports.boxFillBG = boxFillBG = "hsla(" + bgPos[k][8] + ", 100%, 50%, " + (0.13 - k * 0.07) + ")";
    } else {
      exports.boxFill = boxFill = "hsl(" + bgPos[k][8] + ", 100%, 7%)";
      exports.boxFillBG = boxFillBG = "hsl(" + bgPos[k][8] + ", 50%, 7%)";
    }
    _main.bg2.fillStyle = boxFill;
    _main.bg2.beginPath();
    _main.bg2.moveTo(bgPos[k][0], bgPos[k][1]);
    _main.bg2.bezierCurveTo(bgPos[k][2], bgPos[k][3], bgPos[k][4], bgPos[k][5], bgPos[k][6], bgPos[k][7]);
    if (k === 1) {
      _main.bg2.lineTo(bgPos[0][6], bgPos[0][7]);
      _main.bg2.bezierCurveTo(bgPos[0][4], bgPos[0][5], bgPos[0][2], bgPos[0][3], bgPos[0][0], bgPos[0][1]);
    } else {
      _main.bg2.lineTo(1200, 750);
      _main.bg2.lineTo(0, 750);
    }
    _main.bg2.closePath();
    _main.bg2.fill();
  }
};

function snowBall() {
  this.size = Math.random() > 0.02 ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 3) + 5;
  this.velx = this.size / 5 * (1 - Math.random() * 0.5);
  this.vely = Math.max(1, this.size / 6);
  this.landed = false;
  this.melted = 0;
  this.x = _activeStage.activeStage.blastzone.min.x + 40 + Math.random() * (_activeStage.activeStage.blastzone.max.x - _activeStage.activeStage.blastzone.min.x - 40) + (this.size >= 5 ? Math.random() * 60 : 0);
  this.y = _activeStage.activeStage.blastzone.max.y - 60;
  this.prevX = this.x;
  this.prevY = this.y;
}

function createSnow() {
  snowBalls = [];
  for (var _i9 = 0; _i9 < 1500; _i9++) {
    snowBalls.push(new snowBall());
    snowBalls[_i9].y = _activeStage.activeStage.blastzone.min.y + (_activeStage.activeStage.blastzone.max.y - _activeStage.activeStage.blastzone.min.y) * Math.random();
  }
}

function snowCollision(i) {
  var s = snowBalls[i];
  for (var j = 0; j < _activeStage.activeStage.ground.length; j++) {
    if (s.x >= _activeStage.activeStage.ground[j][0].x && s.x <= _activeStage.activeStage.ground[j][1].x && s.prevY > _activeStage.activeStage.ground[j][0].y && s.y <= _activeStage.activeStage.ground[j][0].y) {
      s.y = _activeStage.activeStage.ground[j][0].y;
      return true;
    }
  }
  for (var _j8 = 0; _j8 < _activeStage.activeStage.platform.length; _j8++) {
    if (_j8 !== _activeStage.activeStage.movingPlat && s.x >= _activeStage.activeStage.platform[_j8][0].x && s.x <= _activeStage.activeStage.platform[_j8][1].x && s.prevY > _activeStage.activeStage.platform[_j8][0].y && s.y <= _activeStage.activeStage.platform[_j8][0].y) {
      s.y = _activeStage.activeStage.platform[_j8][0].y;
      return true;
    }
  }
  for (var _j9 = 0; _j9 < _activeStage.activeStage.wallR.length; _j9++) {
    if (s.y <= _activeStage.activeStage.wallR[_j9][0].y && s.y >= _activeStage.activeStage.wallR[_j9][1].y && s.prevX > _activeStage.activeStage.wallR[_j9][0].x && s.x <= _activeStage.activeStage.wallR[_j9][0].x) {
      s.x = _activeStage.activeStage.wallR[_j9][0].x;
      return true;
    }
  }
  return false;
}

function drawSnow() {
  var melting = [];
  _main.bg2.fillStyle = "white";
  _main.fg2.fillStyle = "white";
  _main.fg2.beginPath();
  _main.bg2.beginPath();
  for (var _i10 = 0; _i10 < _main.snowCount; _i10++) {
    if (snowBalls[_i10].landed) {
      snowBalls[_i10].melted++;
      if (snowBalls[_i10].melted > snowMeltTime) {
        snowBalls[_i10] = new snowBall();
      } else {
        melting.push(_i10);
      }
    } else {
      snowBalls[_i10].prevX = snowBalls[_i10].x;
      snowBalls[_i10].prevY = snowBalls[_i10].y;
      snowBalls[_i10].x -= snowBalls[_i10].velx;
      snowBalls[_i10].y -= snowBalls[_i10].vely;
      if (snowBalls[_i10].y < _activeStage.activeStage.blastzone.min.y + 30) {
        snowBalls[_i10] = new snowBall();
      } else if (snowBalls[_i10].x < _activeStage.activeStage.blastzone.min.x + 40) {
        snowBalls[_i10] = new snowBall();
      } else {
        if (snowBalls[_i10].size >= 2 && snowBalls[_i10].size < 5) {
          if (snowCollision(_i10)) {
            snowBalls[_i10].landed = true;
            snowBalls[_i10].size += 1;
          }
        }
      }
      var x = snowBalls[_i10].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0];
      var y = snowBalls[_i10].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1];
      if (snowBalls[_i10].size >= 5) {
        _main.fg2.moveTo(x, y);
        _main.fg2.arc(x, y, snowBalls[_i10].size, 0, _render.twoPi);
      } else {
        _main.bg2.moveTo(x, y);
        _main.bg2.arc(x, y, snowBalls[_i10].size, 0, _render.twoPi);
      }
    }
  }
  _main.fg2.closePath();
  _main.fg2.fill();
  _main.bg2.closePath();
  _main.bg2.fill();
  for (var _i11 = 0; _i11 < melting.length; _i11++) {
    _main.bg2.fillStyle = "rgba(255,255,255," + (1 - snowBalls[melting[_i11]].melted / snowMeltTime) + ")";
    _main.bg2.beginPath();
    _main.bg2.arc(snowBalls[melting[_i11]].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], snowBalls[melting[_i11]].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], snowBalls[melting[_i11]].size, 0, _render.twoPi);
    _main.bg2.closePath();
    _main.bg2.fill();
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/stages/stagerender.js
// module id = 127
// module chunks = 1
//# sourceURL=webpack:///./src/stages/stagerender.js?