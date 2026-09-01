"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuMove = exports.menuHOptions = exports.menuVOptions = exports.menuIndex = undefined;
exports.getGameplayCookies = getGameplayCookies;
exports.gameplayMenuControls = gameplayMenuControls;
exports.drawGameplayMenuInit = drawGameplayMenuInit;
exports.drawGameplayMenu = drawGameplayMenu;

var _main = __webpack_require__(11);

var _settings = __webpack_require__(14);

var _sfx = __webpack_require__(120);

var _menu = __webpack_require__(124);

var _streamclient = __webpack_require__(48);

/* eslint-disable */

var menuIndex = exports.menuIndex = [0, 0];
var menuVOptions = exports.menuVOptions = 4;
var menuHOptions = exports.menuHOptions = [0, 0, 0, 0, 3];
var menuMove = exports.menuMove = false;
function getGameplayCookies() {
  var keys = Object.keys(_settings.gameSettings);
  for (var j = 0; j < keys.length; j++) {
    var c = (0, _main.getCookie)(keys[j]);
    if (c != null && c != undefined && c != "null") {
      _settings.gameSettings[keys[j]] = Number(c);
    }
  }
}
function gameplayMenuControls(i, input) {
  var menuMove = false;
  if (input[i][0].b && !input[i][1].b) {
    _sfx.sounds.menuBack.play();
    input[i][1].b = true;
    if (_streamclient.meHost) {
      var keys = Object.keys(_settings.gameSettings);
      for (var j = 0; j < keys.length; j++) {
        (0, _main.setCookie)(keys[j], _settings.gameSettings[keys[j]], 36500);
      }
    } else {
      alert("Settings not saved because you joined a host. Reload the game if this is a mistake");
    }
    (0, _main.changeGamemode)(1);
  } else if (input[i][0].a && !input[i][1].a) {
    _sfx.sounds.menuSelect.play();
    switch (menuIndex[0]) {
      case 0:
        _settings.gameSettings.turbo ^= true;
        break;
      case 1:
        _settings.gameSettings.lCancelType++;
        if (_settings.gameSettings.lCancelType > 2) {
          _settings.gameSettings.lCancelType = 0;
        }
        break;
      case 2:
        _settings.gameSettings.flashOnLCancel ^= true;
        break;
      case 3:
        _settings.gameSettings.everyCharWallJump ^= true;
        break;
      case 4:
        _settings.gameSettings["tapJumpOffp" + (menuIndex[1] + 1)] ^= true;
      default:
        break;
    }
  } else if (input[i][0].lsY > 0.7 && !Math.abs(input[i][0].lsX >= 0.7)) {
    _menu.stickHoldEach[i] = true;
    if (_menu.stickHold == 0) {
      menuIndex[0]--;
      if (menuIndex[1] > menuHOptions[menuIndex[0]]) {
        menuIndex[1] = menuHOptions[menuIndex[0]];
      }
      menuMove = true;
      (0, _menu.increaseStick)();
    } else {
      (0, _menu.increaseStick)();
      if (_menu.stickHold % 10 == 0) {
        menuIndex[0]--;
        if (menuIndex[1] > menuHOptions[menuIndex[0]]) {
          menuIndex[1] = menuHOptions[menuIndex[0]];
        }
        menuMove = true;
      }
    }
  } else if (input[i][0].lsY < -0.7 && !Math.abs(input[i][0].lsX >= 0.7)) {
    _menu.stickHoldEach[i] = true;
    if (_menu.stickHold == 0) {
      menuIndex[0]++;
      if (menuIndex[1] > menuHOptions[menuIndex[0]]) {
        menuIndex[1] = menuHOptions[menuIndex[0]];
      }
      menuMove = true;
      (0, _menu.increaseStick)();
    } else {
      (0, _menu.increaseStick)();
      if (_menu.stickHold % 10 == 0) {
        menuIndex[0]++;
        if (menuIndex[1] > menuHOptions[menuIndex[0]]) {
          menuIndex[1] = menuHOptions[menuIndex[0]];
        }
        menuMove = true;
      }
    }
  } else if (input[i][0].lsX > 0.7 && !Math.abs(input[i][0].lsY >= 0.7)) {
    _menu.stickHoldEach[i] = true;
    if (_menu.stickHold == 0) {
      menuIndex[1]++;
      //if (menuIndex[1] > menuHOptions[menuIndex[0]]) {
      //  menuIndex[1] = menuHOptions[menuIndex[0]];
      //}
      menuMove = true;
      (0, _menu.increaseStick)();
    } else {
      (0, _menu.increaseStick)();
      if (_menu.stickHold % 10 == 0) {
        menuIndex[1]++;
        //if (menuIndex[1] > menuHOptions[menuIndex[0]]) {
        //  menuIndex[1] = menuHOptions[menuIndex[0]];
        //}
        menuMove = true;
      }
    }
  } else if (input[i][0].lsX < -0.7 && !Math.abs(input[i][0].lsY >= 0.7)) {
    if (_menu.stickHold == 0) {
      menuIndex[1]--;
      //if (menuIndex[1] > menuHOptions[menuIndex[0]]) {
      //  menuIndex[1] = menuHOptions[menuIndex[0]];
      //}
      menuMove = true;
      (0, _menu.increaseStick)();
    } else {
      (0, _menu.increaseStick)();
      if (_menu.stickHold % 10 == 0) {
        menuIndex[1]--;
        //if (menuIndex[1] > menuHOptions[menuIndex[0]]) {
        //  menuIndex[1] = menuHOptions[menuIndex[0]];
        //}
        menuMove = true;
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
    menuMove = false;
    _sfx.sounds.menuSelect.play();
    if (menuIndex[0] < 0) {
      menuIndex[0] = menuVOptions;
    } else if (menuIndex[0] > menuVOptions) {
      menuIndex[0] = 0;
    }
    if (menuIndex[1] > menuHOptions[menuIndex[0]]) {
      menuIndex[1] = 0;
    } else if (menuIndex[1] < 0) {
      menuIndex[1] = menuHOptions[menuIndex[0]];
    }
  }
}

function drawGameplayMenuInit() {
  var bgGrad = _main.bg1.createLinearGradient(0, 0, 1200, 750);
  bgGrad.addColorStop(0, "rgb(11, 65, 39)");
  bgGrad.addColorStop(1, "rgb(8, 20, 61)");
  _main.bg1.fillStyle = bgGrad;
  _main.bg1.fillRect(0, 0, _main.layers.BG1.width, _main.layers.BG1.height);
  _main.fg1.textAlign = "center";
  _main.fg1.fillStyle = "rgba(255, 255, 255, 0.65)";
  _main.fg1.font = "italic 900 80px Arial";
  _main.fg1.fillText("Gameplay", 600, 100);
  _main.fg1.font = "italic 900 50px Arial";
  _main.fg1.textAlign = "start";
  _main.fg1.fillText("Turbo Mode", 75, 275);
  _main.fg1.fillText("L-Cancel", 75, 335);
  _main.fg1.fillText("Flash on L-Cancel", 75, 395);
  _main.fg1.fillText("Everyone Walljumps", 75, 465);
  _main.fg1.fillText("Tapjump off", 75, 535);
}

function drawGameplayMenu() {
  (0, _main.clearScreen)();
  _main.fg1.lineWidth = 3;
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
  for (var _i = 0; _i < menuVOptions + 1; _i++) {
    for (var x = 0; x < menuHOptions[_i] + 1; x++) {
      _main.ui.strokeStyle = "rgba(255, 255, 255, 0.72)";
      if (_i == menuIndex[0] && x == menuIndex[1]) {
        _main.ui.fillStyle = "rgba(255, 255, 255, 0.6)";
      } else {
        _main.ui.fillStyle = "rgba(255, 255, 255, 0.2)";
      }
      if (menuHOptions[_i] > 0) {
        _main.ui.fillRect(650 + x * (300 / (menuHOptions[_i] + 1)), 235 + _i * 60, 300 / (menuHOptions[_i] + 1), 50);
        _main.ui.strokeRect(650 + x * (300 / (menuHOptions[_i] + 1)), 235 + _i * 60, 300 / (menuHOptions[_i] + 1), 50);
      } else {
        _main.ui.fillRect(650, 235 + _i * 60, 300, 50);
        _main.ui.strokeRect(650, 235 + _i * 60, 300, 50);
      }
      _main.ui.font = "900 " + 30 / Math.min(1, menuHOptions[_i] - 1) + "px Arial";
      _main.ui.textAlign = "center";
      _main.ui.fillStyle = "white";
      _main.ui.strokeStyle = "black";
      var text = "";
      switch (_i) {
        case 0:
          text = _settings.gameSettings.turbo ? "On" : "Off";
          break;
        case 1:
          text = _settings.gameSettings.lCancelType ? _settings.gameSettings.lCancelType == 1 ? "Auto" : "Smash 64" : "Normal";
          break;
        case 2:
          text = _settings.gameSettings.flashOnLCancel ? "On" : "Off";
          break;
        case 3:
          text = _settings.gameSettings.everyCharWallJump ? "On" : "Off";
          break;
        case 4:
          text = _settings.gameSettings["tapJumpOffp" + (x + 1)] ? "On" : "Off";
        default:
          break;
      }
      if (menuHOptions[_i] == 0) {
        _main.ui.strokeText(text, 800, 270 + _i * 60);
        _main.ui.fillText(text, 800, 270 + _i * 60);
      } else {
        _main.ui.strokeText(text, 650 + x * (300 / (menuHOptions[_i] + 1)) + 300 / (menuHOptions[_i] + 1) / 2, 270 + _i * 60);
        _main.ui.fillText(text, 650 + x * (300 / (menuHOptions[_i] + 1)) + 300 / (menuHOptions[_i] + 1) / 2, 270 + _i * 60);
      }
    }
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/menus/gameplaymenu.js
// module id = 254
// module chunks = 1
//# sourceURL=webpack:///./src/menus/gameplaymenu.js?