"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.circlePos = exports.mlDir = exports.mlPos = exports.mlVel = exports.angles = exports.angR = exports.angB = undefined;
exports.drawStartScreenInit = drawStartScreenInit;
exports.drawStartScreen = drawStartScreen;

var _main = __webpack_require__(11);

var _render = __webpack_require__(13);

/* eslint-disable */

var angB = exports.angB = 0;
var angR = exports.angR = 0;
var angles = exports.angles = [0, Math.PI];
var mlVel = exports.mlVel = 0;
var mlPos = exports.mlPos = 0;
var mlDir = exports.mlDir = 1;
var circlePos = exports.circlePos = [[200, 0, 0.4, 1, 200], [600, 240, 0.21, 1, 250], [10, 600, 0.7, -1, 150], [350, 500, 0.65, -1, 270], [1000, 50, 0.9, 1, 200], [900, 400, 0.1, -1, 260]];

var lightDust = [];
for (var k = 0; k < 20; k++) {
  lightDust[k] = [Math.random() * 3 + 2, 330 + (k * 26 + 26 * Math.random()), 520, 0.2];
}

function drawStartScreenInit() {
  _main.bg1.fillStyle = "rgba(46, 8, 154, 1)";
  var grd = _main.bg1.createRadialGradient(600, 375, 5, 600, 375, 750);
  grd.addColorStop(0, "#27005b");
  grd.addColorStop(0.25, "#2b0170");
  grd.addColorStop(0.5, "#2b005b");
  grd.addColorStop(0.75, "#35005b");
  grd.addColorStop(1, "#38005b");
  _main.bg1.fillStyle = grd;
  _main.bg1.fillRect(0, 0, _main.layers.BG1.width, _main.layers.BG1.height);
  _main.bg1.save();
  _main.bg1.scale(1.5, 1);
  _main.bg1.shadowBlur = 60;
  _main.bg1.shadowColor = "rgba(147, 14, 42, 1)";
  _main.bg1.shadowOffsetX = -3150;
  _main.bg1.fillStyle = "rgba(147, 14, 42, 0.5)";
  _main.bg1.translate(2440, 380);
  var ang = 0;
  for (var i = 0; i < 10; i++) {
    _main.bg1.beginPath();
    _main.bg1.arc(0, 0, 720, ang, ang + Math.PI / 20);
    _main.bg1.lineTo(0, 0);
    _main.bg1.closePath();
    _main.bg1.fill();
    ang += Math.PI / 5;
  }
  _main.bg1.restore();
}

function drawStartScreen() {
  (0, _main.clearScreen)();
  _main.bg2.save();
  _main.bg2.lineWidth = 60;
  _main.bg2.strokeStyle = "rgba(92, 18, 18, 0.2)";
  for (var j = 0; j < 6; j++) {
    circlePos[j][0] += circlePos[j][2] * circlePos[j][3];
    circlePos[j][1] += circlePos[j][2] * circlePos[j][3];
    if (circlePos[j][0] > 1300 || circlePos[j][1] > 850) {
      circlePos[j][0] -= 1;
      circlePos[j][1] -= 1;
      circlePos[j][3] *= -1;
    }
    if (circlePos[j][0] < -100 || circlePos[j][1] < -100) {
      circlePos[j][0] += 1;
      circlePos[j][1] += 1;
      circlePos[j][3] *= -1;
    }
    _main.bg2.beginPath();
    _main.bg2.arc(Math.round(circlePos[j][0]), Math.round(circlePos[j][1]), circlePos[j][4], 0, _render.twoPi);
    _main.bg2.closePath();
    _main.bg2.stroke();
  }
  _main.bg2.restore();
  _main.bg2.save();
  _main.bg2.fillStyle = "#333236";
  _main.bg2.translate(600, 375);
  exports.angB = angB += 0.001;
  var ang = angB;
  for (var i = 0; i < 30; i++) {
    _main.bg2.beginPath();
    _main.bg2.arc(0, 0, 720, ang, ang + Math.PI / 30);
    _main.bg2.lineTo(0, 0);
    _main.bg2.closePath();
    _main.bg2.fill();
    ang += Math.PI / 15;
  }
  _main.bg2.restore();
  var grd = _main.bg2.createRadialGradient(600, 375, 5, 600, 375, 300);
  grd.addColorStop(0, "rgb(51, 51, 51)");
  grd.addColorStop(1, "rgba(51, 51, 51, 0)");
  _main.bg2.fillStyle = grd;
  _main.bg2.fillRect(0, 0, _main.layers.BG2.width, _main.layers.BG2.height);
  _main.bg2.save();
  _main.bg2.lineWidth = 3;
  _main.bg2.strokeStyle = "rgba(149, 255, 131, 0.12)";
  _main.bg2.scale(1.3, 1.1);
  var rad = 20;
  for (var n = 0; n < 15; n++) {
    _main.bg2.beginPath();
    _main.bg2.arc(515, 530 + n * 10, rad, 0, _render.twoPi);
    _main.bg2.closePath();
    _main.bg2.stroke();
    rad += 30 + n * 5;
  }
  _main.bg2.restore();
  _main.bg2.save();
  _main.bg2.lineWidth = 3;
  _main.bg2.strokeStyle = "rgba(149, 255, 131, 0.12)";
  _main.bg2.translate(670, 580);
  exports.angR = angR += 0.001;
  _main.bg2.rotate(angR);
  var ang = 0;
  _main.bg2.beginPath();
  for (var m = 0; m < 25; m++) {
    ang += Math.PI / 12;
    _main.bg2.moveTo(0, 0);
    _main.bg2.lineTo(0, 850);
    _main.bg2.rotate(ang);
  }
  _main.bg2.stroke();
  _main.bg2.restore();
  _main.ui.save();
  _main.ui.strokeStyle = "rgba(0, 0, 0, 0.3)";
  _main.ui.strokeStyle = "rgba(255, 255, 255, 0.6)";
  _main.ui.lineWidth = 5;
  _main.ui.globalCompositeOperation = "xor";
  var bgGrad = _main.ui.createLinearGradient(0, 200, 0, 390);
  bgGrad.addColorStop(0, "rgba(0, 0, 0, 1)");
  bgGrad.addColorStop(1, "rgba(0, 0, 0, 0.5)");
  _main.ui.fillStyle = bgGrad;
  _main.ui.textAlign = "center";
  _main.ui.font = "900 250px Arial";
  _main.ui.strokeText("Melee", 600, 350);
  _main.ui.fillText("Melee", 600, 350);
  _main.ui.globalCompositeOperation = "lighter";
  var bgGrad = _main.ui.createLinearGradient(0, 440 + mlPos, 0, 500 + mlPos);
  bgGrad.addColorStop(0, "rgba(255, 255, 255,0.45)");
  bgGrad.addColorStop(1, "rgba(255, 255, 255,0.2)");
  _main.ui.fillStyle = bgGrad;
  _main.ui.shadowBlur = 30;
  _main.ui.shadowColor = "rgba(255, 255, 255, 0.7)";
  _main.ui.font = "900 150px Arial";
  _main.ui.fillText("LIGHT", 600, 500 + mlPos);
  exports.mlVel = mlVel += 0.05 * mlDir;
  exports.mlPos = mlPos += mlVel;
  if (Math.abs(mlVel) > 0.8) {
    exports.mlDir = mlDir *= -1;
    if (mlDir == -1) {
      for (var k = 0; k < 10; k++) {}
    }
  }
  _main.ui.restore();
  for (var k = 0; k < 20; k++) {
    if (lightDust[k][2] < 410) {
      lightDust[k] = [Math.random() * 3 + 2, 330 + (k * 26 + 26 * Math.random()), 520, 0.2];
    }
    lightDust[k][2] -= lightDust[k][0];
    lightDust[k][3] = Math.max(0, lightDust[k][3] - 0.01);
    _main.ui.fillStyle = "rgba(155,155,255," + lightDust[k][3] + ")";
    _main.ui.beginPath();
    _main.ui.arc(lightDust[k][1], lightDust[k][2], 10, 0, _render.twoPi);
    _main.ui.closePath();
    _main.ui.fill();
  }
  _main.ui.save();
  _main.ui.fillStyle = "#989898";
  _main.ui.beginPath();
  _main.ui.arc(600, 580, 30, 0, _render.twoPi);
  _main.ui.closePath();
  _main.ui.fill();
  _main.ui.fillStyle = "#6c6b6b";
  _main.ui.beginPath();
  _main.ui.arc(600, 580, 15, 0, _render.twoPi);
  _main.ui.closePath();
  _main.ui.fill();
  _main.ui.lineWidth = 7;
  _main.ui.font = "900 40px monospace";
  _main.ui.textAlign = "center";
  _main.ui.fillStyle = "#f0c900";
  _main.ui.strokeStyle = "black";
  _main.ui.strokeText("PRESS START", 600, 600);
  _main.ui.fillText("PRESS START", 600, 600);
  _main.ui.fillStyle = "rgba(0,0,0,0.6)";
  _main.ui.beginPath();
  _main.ui.arc(600, -2900, 3000, Math.PI * 0.05, Math.PI * 0.95);
  _main.ui.closePath();
  _main.ui.fill();
  _main.ui.beginPath();
  _main.ui.arc(600, 3650, 3000, Math.PI * 1.05, Math.PI * 1.95);
  _main.ui.closePath();
  _main.ui.fill();
  _main.ui.restore();
}

//////////////////
// WEBPACK FOOTER
// ./src/menus/startscreen.js
// module id = 251
// module chunks = 1
//# sourceURL=webpack:///./src/menus/startscreen.js?