"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.updateControllerMenu = updateControllerMenu;
exports.drawControllerMenuInit = drawControllerMenuInit;
exports.setCustomInUse = setCustomInUse;
exports.drawControllerMenu = drawControllerMenu;

var _main = __webpack_require__(11);

var _render = __webpack_require__(13);

var _drawGamepad = __webpack_require__(246);

var _gamepadCalibration = __webpack_require__(244);

var _sfx = __webpack_require__(120);

/* eslint-disable */

var controllerTimer = 0;
var controllerTimerMax = 3000;
var prevTime = 0;

function updateControllerMenu(quit, texts, interval) {
  _main.fg1.clearRect(0, 0, _main.layers.FG1.width, _main.layers.FG1.height);
  _main.fg1.fillStyle = "rgba(255,255,255,0.8)";
  _main.fg1.font = "700 36px Arial";
  _main.fg1.textAlign = "center";

  var _texts = _slicedToArray(texts, 3),
      text1 = _texts[0],
      text2 = _texts[1],
      text3 = _texts[2];

  if (text1 !== undefined) {
    if (text2 === undefined) {
      _main.fg1.fillText(text1, 600, 580);
    } else {
      _main.fg1.fillText(text1, 600, 540);
      if (text2 !== undefined) {
        _main.fg1.fillText(text2, 600, 580);
        if (text3 !== undefined) {
          _main.fg1.fillText(text3, 600, 620);
        }
      }
    }
  }
  if (quit) {
    setTimeout(function () {
      document.getElementById("gamepadSVGCalibration").style.display = "none";
      var canvas = document.getElementById('uiCanvas');
      var context = canvas.getContext('2d');
      canvas.removeEventListener('mousemove', hoverFunction);
      canvas.removeEventListener('mousedown', pressFunction);
      canvas.removeEventListener('click', clickFunction);
      (0, _main.changeGamemode)(1);
    }, 16);
  } else {
    controllerTimer = interval;
    controllerTimerMax = interval;
    prevTime = performance.now();
  }
}

function drawControllerMenuInit() {
  (0, _drawGamepad.updateGamepadSVGColour)(_main.calibrationPlayer, "gamepadSVGCalibration");
  document.getElementById("gamepadSVGCalibration").style.display = "";
  var bgGrad = _main.bg1.createLinearGradient(0, 0, 1200, 750);
  bgGrad.addColorStop(0, "rgb(11, 65, 39)");
  bgGrad.addColorStop(1, "rgb(8, 20, 61)");
  _main.bg1.fillStyle = bgGrad;
  _main.bg1.fillRect(0, 0, _main.layers.BG1.width, _main.layers.BG1.height);
  _main.bg1.fillStyle = "rgba(0,0,0,0.5)";
  _main.fg2.fillStyle = "rgba(255,255,255,0.2)";
  var newTime = performance.now();
  controllerTimer -= newTime - prevTime;
  prevTime = newTime;
  if (controllerTimer > 0) {
    _main.fg2.fillRect(300, 600, 600, 30);
    _main.fg2.fillStyle = "rgba(255,255,255,0.8)";
    _main.fg2.fillRect(300, 600, 600 * Math.max(0, controllerTimer / controllerTimerMax), 30);
    _main.fg2.fillRect(296, 585, 4, 60);
  }
}

var baseFill = "rgba(255, 255, 255, 0.6)";
var baseStroke = "rgba(255, 255, 255, 0.72)";
var redFill = "rgba(242, 120, 106, 0.6)";
var redStroke = "rgba(242, 120, 106, 0.72)";
var greenFill = "rgba(175, 232, 155, 0.6)";
var greenStroke = "rgba(175, 232, 155, 0.72)";
var highlightFill = "rgba(249, 255, 193, 0.6)";
var highlightStroke = "rgba(249, 255, 193, 0.72)";
var inUseStroke = "rgba(249, 255, 193, 0.9)";
var pressedFill = "rgba(145, 145, 145, 0.6)";
var pressedStroke = "rgba(249, 255, 193, 0.72)";

var centerState = "none";
var exitState = "none";
var resetState = "none";
var customState = "none";
var customInteract = null;
var customInUse = 0;
var saveOrLoad = "load";

function setCustomInUse(k) {
  customInUse = k;
}

function fillColour(state, k) {
  if (k === undefined || _gamepadCalibration.customGamepadInfoIsUsable[k] === null) {
    if (state === "pressed") {
      return pressedFill;
    } else if (state === "highlight") {
      return highlightFill;
    } else {
      return baseFill;
    }
  } else if (_gamepadCalibration.customGamepadInfoIsUsable[k] === false) {
    return redFill;
  } else {
    return greenFill;
  }
}

function strokeColour(state, k) {
  if (state === "pressed") {
    return pressedStroke;
  } else if (state === "highlight") {
    return highlightStroke;
  } else {
    if (k === undefined || _gamepadCalibration.customGamepadInfoIsUsable[k] === null) {
      return baseStroke;
    } else if (_gamepadCalibration.customGamepadInfoIsUsable[k] === false) {
      return redStroke;
    } else {
      return greenStroke;
    }
  }
}

function drawControllerMenu() {
  (0, _main.clearScreen)();
  drawControllerMenuInit();
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

  _main.ui.fillRect(30, 60, 120, 60);
  _main.ui.strokeRect(30, 60, 120, 60);
  _main.ui.fillRect(180, 60, 120, 60);
  _main.ui.strokeRect(180, 60, 120, 60);
  _main.ui.strokeStyle = inUseStroke;
  if (saveOrLoad === "load") {
    _main.ui.strokeRect(27, 57, 126, 66);
  } else {
    _main.ui.strokeRect(177, 57, 126, 66);
  }

  // draw custom controller binding boxes
  for (var _i = 0; _i < 4; _i++) {
    if (customInteract !== 2 * _i) {
      _main.ui.fillStyle = fillColour("none", 2 * _i);
      _main.ui.strokeStyle = strokeColour("none", 2 * _i);;
    } else {
      _main.ui.fillStyle = fillColour(customState, 2 * _i);
      _main.ui.strokeStyle = strokeColour(customState, 2 * _i);
    }
    _main.ui.fillRect(30, 150 + 90 * _i, 120, 60);
    _main.ui.strokeRect(30, 150 + 90 * _i, 120, 60);
    if (customInUse === 2 * _i) {
      _main.ui.strokeStyle = inUseStroke;
      _main.ui.strokeRect(27, 147 + 90 * _i, 126, 66);
    }
    if (customInteract !== 2 * _i + 1) {
      _main.ui.fillStyle = fillColour("none", 2 * _i + 1);
      _main.ui.strokeStyle = strokeColour("none", 2 * _i + 1);;
    } else {
      _main.ui.fillStyle = fillColour(customState, 2 * _i + 1);
      _main.ui.strokeStyle = strokeColour(customState, 2 * _i + 1);
    }
    _main.ui.fillRect(180, 150 + 90 * _i, 120, 60);
    _main.ui.strokeRect(180, 150 + 90 * _i, 120, 60);
    if (customInUse === 2 * _i + 1) {
      _main.ui.strokeStyle = inUseStroke;
      _main.ui.strokeRect(177, 147 + 90 * _i, 126, 66);
    }
  }

  _main.ui.font = "700 36px Arial";
  _main.ui.textAlign = "center";
  _main.ui.fillStyle = "rgba(255,255,255,0.8)";
  _main.ui.fillText("Center", 1035, 190);
  _main.ui.fillText("Reset", 1035, 280);
  _main.ui.fillText("Quit", 1035, 370);
  _main.ui.font = "700 28px Arial";
  _main.ui.fillText("Load", 90, 100);
  _main.ui.fillText("Save", 240, 100);
  _main.ui.fillText("Default", 90, 190);
  _main.ui.font = "700 20px Arial";
  _main.ui.fillText("Custom 1", 240, 186);
  for (var _i2 = 1; _i2 < 4; _i2++) {
    _main.ui.fillText("Custom " + 2 * _i2, 90, 186 + 90 * _i2);
    _main.ui.fillText("Custom " + (2 * _i2 + 1), 240, 186 + 90 * _i2);
  }

  _main.ui.fillStyle = fillColour(centerState);
  _main.ui.strokeStyle = strokeColour(centerState);
  _main.ui.fillRect(960, 150, 150, 60);
  _main.ui.strokeRect(960, 150, 150, 60);
  _main.ui.fillStyle = fillColour(resetState);
  _main.ui.strokeStyle = strokeColour(resetState);
  _main.ui.fillRect(960, 240, 150, 60);
  _main.ui.strokeRect(960, 240, 150, 60);
  _main.ui.fillStyle = fillColour(exitState);
  _main.ui.strokeStyle = strokeColour(exitState);
  _main.ui.fillRect(960, 330, 150, 60);
  _main.ui.strokeRect(960, 330, 150, 60);

  var canvas = document.getElementById('uiCanvas');
  var context = canvas.getContext('2d');
  canvas.addEventListener('mousemove', hoverFunction);
  canvas.addEventListener('mousedown', pressFunction);
  canvas.addEventListener('click', clickFunction);
}

function hoverFunction(e) {
  var x = e.offsetX;
  var y = e.offsetY;
  if (x >= 30 && x <= 150) {
    centerState = "none";
    resetState = "none";
    exitState = "none";
    if (y >= 60 && y <= 120) {
      if (customState === "none") {
        _sfx.sounds.menuSelect.play();
        customState = "highlight";
      }
      customInteract = -2;
    } else if (y >= 150 && y <= 210) {
      if (customState === "none") {
        _sfx.sounds.menuSelect.play();
        customState = "highlight";
      }
      customInteract = 0;
    } else if (y >= 240 && y <= 300) {
      if (customState === "none") {
        _sfx.sounds.menuSelect.play();
        customState = "highlight";
      }
      customInteract = 2;
    } else if (y >= 330 && y <= 390) {
      if (customState === "none") {
        _sfx.sounds.menuSelect.play();
        customState = "highlight";
      }
      customInteract = 4;
    } else if (y >= 420 && y <= 480) {
      if (customState === "none") {
        _sfx.sounds.menuSelect.play();
        customState = "highlight";
      }
      customInteract = 6;
    } else {
      customState = "none";
      customInteract = null;
    }
  } else if (x >= 180 && x <= 300) {
    centerState = "none";
    resetState = "none";
    exitState = "none";
    if (y >= 60 && y <= 120) {
      if (customState === "none") {
        _sfx.sounds.menuSelect.play();
        customState = "highlight";
      }
      customInteract = -1;
    } else if (y >= 150 && y <= 210) {
      if (customState === "none") {
        _sfx.sounds.menuSelect.play();
        customState = "highlight";
      }
      customInteract = 1;
    } else if (y >= 240 && y <= 300) {
      if (customState === "none") {
        _sfx.sounds.menuSelect.play();
        customState = "highlight";
      }
      customInteract = 3;
    } else if (y >= 330 && y <= 390) {
      if (customState === "none") {
        _sfx.sounds.menuSelect.play();
        customState = "highlight";
      }
      customInteract = 5;
    } else if (y >= 420 && y <= 480) {
      if (customState === "none") {
        _sfx.sounds.menuSelect.play();
        customState = "highlight";
      }
      customInteract = 7;
    } else {
      customState = "none";
      customInteract = null;
    }
  } else if (x >= 960 && x <= 1110) {
    customState = "none";
    customInteract = null;
    if (y >= 150 && y <= 210) {
      if (centerState === "none") {
        _sfx.sounds.menuSelect.play();
        centerState = "highlight";
      }
      resetState = "none";
      exitState = "none";
    } else if (y >= 240 && y <= 300) {
      centerState = "none";
      if (resetState === "none") {
        _sfx.sounds.menuSelect.play();
        resetState = "highlight";
      }
      exitState = "none";
    } else if (y >= 330 && y <= 390) {
      centerState = "none";
      resetState = "none";
      if (exitState === "none") {
        _sfx.sounds.menuSelect.play();
        exitState = "highlight";
      }
    } else {
      centerState = "none";
      exitState = "none";
      resetState = "none";
    }
  } else {
    customState = "none";
    customInteract = null;
    centerState = "none";
    exitState = "none";
    resetState = "none";
  }
}

function pressFunction(e) {
  var x = e.offsetX;
  var y = e.offsetY;
  if (x >= 30 && x <= 150) {
    if (y >= 60 && y <= 120) {
      customState = "pressed";
      customInteract = -2;
    } else if (y >= 150 && y <= 210) {
      customState = "pressed";
      customInteract = 0;
    } else if (y >= 240 && y <= 300) {
      customState = "pressed";
      customInteract = 2;
    } else if (y >= 330 && y <= 390) {
      customState = "pressed";
      customInteract = 4;
    } else if (y >= 420 && y <= 480) {
      customState = "pressed";
      customInteract = 6;
    }
  } else if (x >= 180 && x <= 300) {
    if (y >= 60 && y <= 120) {
      customState = "pressed";
      customInteract = -1;
    } else if (y >= 150 && y <= 210) {
      customState = "pressed";
      customInteract = 1;
    } else if (y >= 240 && y <= 300) {
      customState = "pressed";
      customInteract = 3;
    } else if (y >= 330 && y <= 390) {
      customState = "pressed";
      customInteract = 5;
    } else if (y >= 420 && y <= 480) {
      customState = "pressed";
      customInteract = 7;
    }
  } else if (x >= 960 && x <= 1110) {
    if (y >= 150 && y <= 210) {
      centerState = "pressed";
    } else if (y >= 240 && y <= 300) {
      resetState = "pressed";
    } else if (y >= 330 && y <= 390) {
      exitState = "pressed";
    }
  }
}

function clickFunction(e) {
  var x = e.offsetX;
  var y = e.offsetY;
  if (x >= 30 && x <= 150) {
    if (y >= 60 && y <= 120) {
      saveOrLoad = "load";
    } else if (y >= 150 && y <= 210) {
      (0, _gamepadCalibration.setClickObjectNumber)(0);
      (0, _gamepadCalibration.setClickObject)(saveOrLoad + "Custom");
    } else if (y >= 240 && y <= 300) {
      (0, _gamepadCalibration.setClickObjectNumber)(2);
      (0, _gamepadCalibration.setClickObject)(saveOrLoad + "Custom");
    } else if (y >= 330 && y <= 390) {
      (0, _gamepadCalibration.setClickObjectNumber)(4);
      (0, _gamepadCalibration.setClickObject)(saveOrLoad + "Custom");
    } else if (y >= 420 && y <= 480) {
      (0, _gamepadCalibration.setClickObjectNumber)(6);
      (0, _gamepadCalibration.setClickObject)(saveOrLoad + "Custom");
    }
  } else if (x >= 180 && x <= 300) {
    if (y >= 60 && y <= 120) {
      saveOrLoad = "save";
    }
    if (y >= 150 && y <= 210) {
      (0, _gamepadCalibration.setClickObjectNumber)(1);
      (0, _gamepadCalibration.setClickObject)(saveOrLoad + "Custom");
    } else if (y >= 240 && y <= 300) {
      (0, _gamepadCalibration.setClickObjectNumber)(3);
      (0, _gamepadCalibration.setClickObject)(saveOrLoad + "Custom");
    } else if (y >= 330 && y <= 390) {
      (0, _gamepadCalibration.setClickObjectNumber)(5);
      (0, _gamepadCalibration.setClickObject)(saveOrLoad + "Custom");
    } else if (y >= 420 && y <= 480) {
      (0, _gamepadCalibration.setClickObjectNumber)(7);
      (0, _gamepadCalibration.setClickObject)(saveOrLoad + "Custom");
    }
  } else if (x >= 960 && x <= 1110) {
    if (y >= 150 && y <= 210) {
      (0, _gamepadCalibration.setClickObject)("center");
    } else if (y >= 240 && y <= 300) {
      (0, _gamepadCalibration.setClickObject)("reset");
    } else if (y >= 330 && y <= 390) {
      _sfx.sounds.menuSelect.play();
      (0, _gamepadCalibration.setClickObject)("exit");
    }
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/menus/controllermenu.js
// module id = 245
// module chunks = 1
//# sourceURL=webpack:///./src/menus/controllermenu.js?