"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.masterVolume = undefined;
exports.audioMenuControls = audioMenuControls;
exports.drawAudioMenuInit = drawAudioMenuInit;
exports.drawAudioMenu = drawAudioMenu;
exports.getAudioCookies = getAudioCookies;

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _render = __webpack_require__(13);

var _menu = __webpack_require__(124);

var _music = __webpack_require__(121);

/* eslint-disable */

// sounds, music
var masterVolume = exports.masterVolume = [0.5, 0.3];
var audioMenuNames = ["Sounds", "Music"];
var audioMenuSelected = 0;
function audioMenuControls(i, input) {
  var menuMove = false;
  var audioLevelMoveUp = false;
  var audioLevelMoveDown = false;
  if (input[i][0].b && !input[i][1].b) {
    _main.bg1.textAlign = "left";
    _sfx.sounds.menuBack.play();
    //input[i].b[1] = true;
    (0, _main.setCookie)("soundsLevel", masterVolume[0], 36500);
    (0, _main.setCookie)("musicLevel", masterVolume[1], 36500);
    (0, _main.changeGamemode)(1);
  } else if (input[i][0].lsY > 0.7) {
    _menu.stickHoldEach[i] = true;
    if (_menu.stickHold == 0) {
      audioMenuSelected--;
      menuMove = true;
      (0, _menu.increaseStick)();
    } else {
      (0, _menu.increaseStick)();
      if (_menu.stickHold % 10 == 0) {
        audioMenuSelected--;
        menuMove = true;
      }
    }
  } else if (input[i][0].lsY < -0.7) {
    _menu.stickHoldEach[i] = true;
    if (_menu.stickHold == 0) {
      audioMenuSelected++;
      menuMove = true;
      (0, _menu.increaseStick)();
    } else {
      (0, _menu.increaseStick)();
      if (_menu.stickHold % 10 == 0) {
        audioMenuSelected++;
        menuMove = true;
      }
    }
  } else if (input[i][0].lsX > 0.7) {
    _menu.stickHoldEach[i] = true;
    if (_menu.stickHold == 0) {
      audioLevelMoveUp = true;
      (0, _menu.increaseStick)();
    } else {
      (0, _menu.increaseStick)();
      if (_menu.stickHold % 10 == 0) {
        audioLevelMoveUp = true;
      }
    }
  } else if (input[i][0].lsX < -0.7) {
    _menu.stickHoldEach[i] = true;
    if (_menu.stickHold == 0) {
      audioLevelMoveDown = true;
      (0, _menu.increaseStick)();
    } else {
      (0, _menu.increaseStick)();
      if (_menu.stickHold % 10 == 0) {
        audioLevelMoveDown = true;
      }
    }
  } else {
    _menu.stickHoldEach[i] = false;
    if (i == _main.ports - 1) {
      var stickHoldAll = false;
      for (var j = 0; j < _main.ports; j++) {
        if (_menu.stickHoldEach[j]) {
          stickHoldAll = true;
          break;
        }
      }
      if (!stickHoldAll) {
        (0, _menu.resetStick)();
      }
    }
  }
  if (menuMove) {
    _sfx.sounds.menuSelect.play();
    if (audioMenuSelected == -1) {
      audioMenuSelected = 1;
    } else if (audioMenuSelected == 2) {
      audioMenuSelected = 0;
    }
  } else if (audioLevelMoveUp) {
    _sfx.sounds.menuSelect.play();
    masterVolume[audioMenuSelected] += 0.1;
    if (masterVolume[audioMenuSelected] > 1) {
      masterVolume[audioMenuSelected] = 1;
    }
  } else if (audioLevelMoveDown) {
    _sfx.sounds.menuSelect.play();
    masterVolume[audioMenuSelected] -= 0.1;
    if (masterVolume[audioMenuSelected] < 0) {
      masterVolume[audioMenuSelected] = 0;
    }
  }
  if (audioLevelMoveDown || audioLevelMoveUp) {
    if (audioMenuSelected == 0) {
      changeVolume(_sfx.sounds, masterVolume[0], 0);
    } else {
      changeVolume(_music.MusicManager, masterVolume[1], 1);
    }
  }
}

function drawAudioMenuInit() {
  var bgGrad = _main.bg1.createLinearGradient(0, 0, 1200, 750);
  bgGrad.addColorStop(0, "rgb(11, 65, 39)");
  bgGrad.addColorStop(1, "rgb(8, 20, 61)");
  _main.bg1.fillStyle = bgGrad;
  _main.bg1.fillRect(0, 0, _main.layers.BG1.width, _main.layers.BG1.height);

  _main.bg1.fillStyle = "rgba(0,0,0,0.5)";
  _main.bg1.lineWidth = 10;
  _main.bg1.strokeStyle = "rgba(255, 255, 255, 0.3)";
  _main.bg1.strokeRect(95, 125, 1010, 650);
  _main.bg1.fillRect(95, 125, 1010, 650);
  _main.bg1.textAlign = "center";
  _main.bg1.fillStyle = "rgba(255, 255, 255, 0.5)";
  _main.bg1.font = "italic 900 80px Arial";
  _main.bg1.fillText("Audio", 600, 100);
  _main.bg1.font = "italic 900 50px Arial";
  _main.bg1.fillText("Sounds", 225, 275);
  _main.bg1.fillText("Music", 225, 525);
}

function drawAudioMenu() {
  (0, _main.clearScreen)();
  drawAudioMenuInit();
  _main.fg2.lineWidth = 3;
  (0, _main.addShine)(0.01);
  if (_main.shine > 1.8) {
    (0, _main.setShine)(-0.8);
  }
  var opacity = _main.shine < 0 ? 0.05 + 0.25 / 0.8 * (0.8 + _main.shine) : _main.shine > 1 ? 0.3 - 0.25 / 0.8 * (_main.shine - 1) : 0.3;
  var bgGrad = _main.fg2.createLinearGradient(0, 0, 1200, 750);
  bgGrad.addColorStop(0, "rgba(255, 255, 255,0.05)");
  bgGrad.addColorStop(Math.min(Math.max(0, _main.shine), 1), "rgba(255,255,255," + opacity + ")");
  bgGrad.addColorStop(1, "rgba(255, 255, 255,0.05)");
  //ui.strokeStyle = "rgba(255,255,255,0.13)";
  _main.fg2.strokeStyle = bgGrad;
  _main.fg2.beginPath();
  for (var i = 0; i < 60; i++) {
    _main.fg2.moveTo(0 + i * 30, 0);
    _main.fg2.lineTo(0 + i * 30, 750);
    _main.fg2.moveTo(0, 0 + i * 30);
    _main.fg2.lineTo(1200, 0 + i * 30);
  }
  _main.fg2.stroke();
  for (var i = 0; i < 2; i++) {
    if (i == audioMenuSelected) {
      //ui.fillStyle = "rgba(255, 255, 255, 0.7)";
      _main.bg1.fillStyle = "rgba(255, 255, 255,0.3)";
    } else {
      _main.bg1.fillStyle = "rgba(255, 255, 255,0.1)";
      //ui.fillStyle = "rgba(0, 0, 0, 0.8)";
    }
    _main.bg1.beginPath();
    _main.bg1.moveTo(200, 350 + i * 250);
    _main.bg1.lineTo(1000, 200 + i * 250);
    _main.bg1.lineTo(1000, 350 + i * 250);
    _main.bg1.closePath();
    _main.bg1.fill();
    if (i == 0) {
      var bgGrad = _main.bg1.createLinearGradient(200, 0, 1200, 0);
      bgGrad.addColorStop(0, "rgb(12, 75, 13)");
      bgGrad.addColorStop(1, "rgb(15, 75, 255)");
      _main.bg1.fillStyle = bgGrad;
    } else {
      var bgGrad = _main.bg1.createLinearGradient(200, 0, 1200, 0);
      bgGrad.addColorStop(0, "rgb(11, 13, 65)");
      bgGrad.addColorStop(1, "rgb(255, 15, 73)");
      _main.bg1.fillStyle = bgGrad;
    }
    _main.bg1.beginPath();
    _main.bg1.moveTo(200, 350 + i * 250);
    _main.bg1.lineTo(200 + masterVolume[i] * 800, 350 + i * 250 - masterVolume[i] * 150);
    _main.bg1.lineTo(200 + masterVolume[i] * 800, 350 + i * 250);
    _main.bg1.closePath();
    _main.bg1.fill();
    if (i == audioMenuSelected) {
      _main.bg1.fillStyle = "rgba(255, 255, 255, 1)";
    } else {
      _main.bg1.fillStyle = "rgba(136, 136, 136, 1)";
    }
    _main.bg1.beginPath();
    _main.bg1.arc(200 + masterVolume[i] * 800, 350 + i * 250 - masterVolume[i] * 75, 15 + masterVolume[i] * 65, 0, _render.twoPi);
    _main.bg1.closePath();
    _main.bg1.fill();
  }
}

function getAudioCookies() {
  var s = (0, _main.getCookie)("soundsLevel");
  if (s != null && s != undefined && s != "null") {
    masterVolume[0] = Number(s);
    changeVolume(_sfx.sounds, masterVolume[0], 0);
  }
  var m = (0, _main.getCookie)("musicLevel");
  if (m != null && m != undefined && m != "null") {
    masterVolume[1] = Number(m);
    changeVolume(_music.MusicManager, masterVolume[1], 1);
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/menus/audiomenu.js
// module id = 253
// module chunks = 1
//# sourceURL=webpack:///./src/menus/audiomenu.js?