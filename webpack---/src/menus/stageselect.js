"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sssControls = sssControls;
exports.drawSSSInit = drawSSSInit;
exports.drawSSS = drawSSS;

var _sfx = __webpack_require__(120);

var _main = __webpack_require__(11);

var _render = __webpack_require__(13);

var _streamclient = __webpack_require__(48);

/* eslint-disable */

/*
should be able to add levels by just adding to smallboxstagenames, bigboxnames and stageimages
 */
var smallBoxStageNames = ["BATTLEFIELD", "Y-STORY", "P-STADIUM", "DREAMLAND", "F-DEST", "FOUNTAIN"];

var bigBoxNames = ["Battlefield", "Yoshi's Story", "Pokemon Stadium", "Dreamland", "Final Destination", "Fountain Of Dreams"];

var stageImages = {
  0: retrieveImage("assets/stage-icons/bf.png"),
  1: retrieveImage("assets/stage-icons/ys.png"),
  2: retrieveImage("assets/stage-icons/ps.png"),
  3: retrieveImage("assets/stage-icons/dl.png"),
  4: retrieveImage("assets/stage-icons/fd.png"),
  5: retrieveImage("assets/stage-icons/fod.png")
};

function retrieveImage(src) {
  var box = new Image();
  box.src = src;
  box.onerror = function () {
    box.onError = null;
    box.src = "assets/stage-icons/Icon_transparent_Question.png";
  };

  return box;
}
var stageSelected = smallBoxStageNames.length;
var stageSelectTimer = 0;

var stagePointerPos = [600, 635];
var xRowOffset = 175;

function sssControls(i, input) {
  stagePointerPos[0] += input[i][0].lsX * 15;
  stagePointerPos[1] += input[i][0].lsY * -15;
  if (stagePointerPos[1] >= 450 && stagePointerPos[1] <= 540) {
    for (var j = 0; j < smallBoxStageNames.length; j++) {
      if (stagePointerPos[0] >= 87.5 + j * xRowOffset && stagePointerPos[0] <= 237.5 + j * xRowOffset) {
        if (stageSelected != j) {
          _sfx.sounds.menuSelect.play();
        }
        stageSelected = j;
        break;
      }
    }
  } else if (stagePointerPos[0] >= 525 && stagePointerPos[0] <= 675 && stagePointerPos[1] >= 590 && stagePointerPos[1] <= 680) {
    if (stageSelected != smallBoxStageNames.length) {
      _sfx.sounds.menuSelect.play();
    }
    stageSelected = smallBoxStageNames.length;
  }
  if (input[i][0].b && !input[i][1].b) {
    _sfx.sounds.menuBack.play();
    (0, _main.changeGamemode)(2);
  } else if (input[i][0].a && !input[i][1].a) {
    _sfx.sounds.menuForward.play();
    if (stageSelected == smallBoxStageNames.length) {
      stageSelected = Math.floor(Math.random() * (smallBoxStageNames.length - 0.01));
    }
    (0, _main.setStageSelect)(stageSelected);
    (0, _streamclient.syncStartGame)(stageSelected);
    (0, _main.startGame)();
  }
}

function drawSSSInit() {
  var bgGrad = _main.bg1.createLinearGradient(0, 0, 1200, 750);
  bgGrad.addColorStop(0, "rgb(17, 11, 65)");
  bgGrad.addColorStop(1, "rgb(61, 8, 37)");
  _main.bg1.fillStyle = bgGrad;
  _main.bg1.fillRect(0, 0, _main.layers.BG1.width, _main.layers.BG1.height);

  _main.fg1.lineWidth = 4;
  _main.fg1.strokeStyle = "rgba(255, 255, 255, 0.57)";
  _main.fg1.strokeRect(198, 98, 804, 304);
  _main.fg1.fillStyle = "black";
  stageSelectTimer++;
  for (var i = 0; i < smallBoxStageNames.length; i++) {
    _main.fg1.fillRect(87.5 + i * xRowOffset, 450, 150, 90);
  }
  _main.fg1.fillRect(525, 590, 150, 90);

  _main.fg1.fillStyle = "white";
  _main.fg1.font = "500 16px Arial";
  _main.fg1.textAlign = "center";

  for (var _i = 0; _i < smallBoxStageNames.length; _i++) {
    _main.fg1.fillText(smallBoxStageNames[_i], _i * xRowOffset + 162.5, 530);
    _main.fg1.drawImage(stageImages[_i], _i * xRowOffset + 87.5, 452, 146, 55);
  }
}

function drawBigBox() {
  if (stageSelected < smallBoxStageNames.length) {
    _main.ui.drawImage(stageImages[stageSelected], 200, 100, 800, 300);
    _main.ui.fillText(bigBoxNames[stageSelected], 220, 380);
  } else if (stageSelected == smallBoxStageNames.length) {
    _main.ui.textAlign = "center";
    _main.ui.lineWidth = 9;
    _main.ui.fillStyle = "rgba(0,0,0,0.7)";
    _main.ui.fillRect(202, 102, 796, 296);
    _main.ui.fillStyle = "rgb(255, 161, 84)";
    _main.ui.strokeStyle = "rgb(255, 161, 84)";
    _main.ui.font = "900 100px Arial";
    _main.ui.fillText("?", 600, 230);
    _main.ui.fillText("RANDOM", 600, 355);
    _main.ui.beginPath();
    _main.ui.arc(600, 192, 55, 0, _render.twoPi);
    _main.ui.closePath();
    _main.ui.stroke();
  }
}
function drawSSS() {
  (0, _main.clearScreen)();
  _main.bg2.lineWidth = 3;
  (0, _main.addShine)(0.01);
  if (_main.shine > 1.8) {
    (0, _main.setShine)(-0.8);
  }
  var opacity = _main.shine < 0 ? 0.05 + 0.25 / 0.8 * (0.8 + _main.shine) : _main.shine > 1 ? 0.3 - 0.25 / 0.8 * (_main.shine - 1) : 0.3;
  var bgGrad = _main.bg2.createLinearGradient(0, 0, 1200, 750);
  bgGrad.addColorStop(0, "rgba(255, 255, 255,0.05)");
  bgGrad.addColorStop(Math.min(Math.max(0, _main.shine), 1), "rgba(255,255,255," + opacity + ")");
  bgGrad.addColorStop(1, "rgba(255, 255, 255,0.05)");
  //ui.strokeStyle = "rgba(255,255,255,0.13)";
  _main.bg2.strokeStyle = bgGrad;
  _main.bg2.beginPath();
  for (var i = 0; i < 60; i++) {
    _main.bg2.moveTo(0 + i * 30, 0);
    _main.bg2.lineTo(0 + i * 30, 750);
    _main.bg2.moveTo(0, 0 + i * 30);
    _main.bg2.lineTo(1200, 0 + i * 30);
  }
  _main.bg2.stroke();
  _main.ui.textAlign = "center";
  _main.ui.lineWidth = 3;
  stageSelectTimer++;
  for (var i = 0; i < smallBoxStageNames.length; i++) {
    if (stageSelected == i) {
      if (stageSelectTimer % 8 > 4) {
        _main.ui.strokeStyle = "rgb(251, 116, 155)";
      } else {
        _main.ui.strokeStyle = "rgb(255, 182, 204)";
      }
    } else {
      _main.ui.strokeStyle = "rgb(166, 166, 166)";
    }
    _main.ui.strokeRect(87.5 + i * xRowOffset, 450, 150, 90);
  }
  _main.ui.fillStyle = "rgb(245, 144, 61)";
  _main.ui.strokeStyle = "rgb(245, 144, 61)";
  if (stageSelected === smallBoxStageNames.length) {
    if (stageSelectTimer % 8 > 4) {
      _main.ui.fillStyle = "rgb(251, 195, 149)";
      _main.ui.strokeStyle = "rgb(251, 195, 149)";
    }
  }
  _main.ui.font = "700 25px Arial";
  _main.ui.lineWidth = 4;
  _main.ui.strokeRect(525, 590, 150, 90);
  _main.ui.fillText("RANDOM", 600, 665);
  _main.ui.font = "700 32px Arial";
  _main.ui.fillText("?", 600, 630);
  _main.ui.beginPath();
  _main.ui.arc(600, 618, 18, 0, _render.twoPi);
  _main.ui.closePath();
  _main.ui.stroke();
  _main.ui.textAlign = "start";
  _main.ui.fillStyle = "rgba(255,255,255,0.6)";
  _main.ui.font = "900 48px Arial";
  drawBigBox();
  _main.ui.textAlign = "center";
  _main.ui.lineWidth = 8;
  _main.ui.strokeStyle = "rgba(255,255,255,0.8)";
  _main.ui.beginPath();
  _main.ui.arc(stagePointerPos[0], stagePointerPos[1], 40, 0, _render.twoPi);
  _main.ui.closePath();
  _main.ui.stroke();
}

//////////////////
// WEBPACK FOOTER
// ./src/menus/stageselect.js
// module id = 252
// module chunks = 1
//# sourceURL=webpack:///./src/menus/stageselect.js?