"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stickHold = exports.stickHoldEach = undefined;
exports.menuMove = menuMove;
exports.drawMainMenuInit = drawMainMenuInit;
exports.drawMainMenu = drawMainMenu;
exports.increaseStick = increaseStick;
exports.resetStick = resetStick;

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _targetplay = __webpack_require__(125);

var _targetselect = __webpack_require__(241);

var _targetbuilder = __webpack_require__(126);

var _render = __webpack_require__(13);

var _streamclient = __webpack_require__(48);

var _spectatorclient = __webpack_require__(243);

var _music = __webpack_require__(121);

var _gamepadCalibration = __webpack_require__(244);

/* eslint-disable */

var menuSelected = 0;

var menuText = [["VS. Melee", "Target Test", "Target Builder", "Options"], ["Audio", "Gameplay", "Keyboard Controls", "Credits"], ["Local VS", "Spectate", "P2P", "Server"], ["Controller", "Keyboard"]];
var menuExplanation = [["Multiplayer Battles!", "Smash ten targets!", "Build target test stages!", "Game setup."], ["Select audio levels.", "Change gameplay settings.", "Customize & calibrate controls.", "Who did this?"], ["One box this screen.", "Ranked Mode", "Hostless Muliplayer", "Hosted Multiplayer"], ["Customize & calibrate controller.", "Customize keyboard controls."]];
var menuCount = [4, 4, 4, 2];
var menuTitle = ["Main Menu", "Options", "Battle Mode", "Controls"];
var menuColourOffset = 0;
var menuColours = [238, 358, 117, 55];
var menuCurColour = 238;
//hsl(55, 100%, 50%)
var menuCycle = 0;
var menuTimer = 0;
var menuMode = 0;
var menuGlobalTimer = 0;
var menuAngle = 0;
var menuRandomBox = [Math.random(), Math.random(), Math.random(), Math.random()];
//menu modes
var TOPLEVEL = 0;
var SECONDLEVELOPTIONS = 1;
var MPMENU = 2;
var CONTROLLERCALIB = 3;
//top level
var VSMODE = 0;
var TARGETTEST = 1;
var TARGETBUILDER = 2;
var OPTIONS = 3;
//second level
var AUDIOOPTIONS = 0;
var GAMEPLAYOPTIONS = 1;
var KEYBOARDOPTIONS = 2;
var CREDITS = 3;
//mp level
var LOCALVS = 0;
var SPECTATING = 1;
var P2PMP = 2;
var SERVERMP = 3;

var stickHoldEach = exports.stickHoldEach = [];
var stickHold = exports.stickHold = 0;
function menuMove(i, input) {
  var menuMove = false;
  var previousMenuS = menuSelected;
  if (input[i][0].a && !input[i][1].a) {
    _sfx.sounds.menuForward.play();

    if (menuMode == TOPLEVEL) {
      if (menuSelected == VSMODE) {
        menuSelected = LOCALVS;
        menuMode = MPMENU;
      } else {
        if (menuSelected == TARGETTEST) {
          (0, _targetplay.setTargetPlayer)(i);

          (0, _targetselect.setTargetPointerPos)([178.5, 137]);
          //input[i].a[1] = true;
          _music.MusicManager.stopWhatisPlaying();
          _music.MusicManager.playTargetTestLoop();
          (0, _main.changeGamemode)(7);
        } else {
          if (menuSelected == TARGETBUILDER) {
            (0, _targetbuilder.setEditingStage)(-1);
            (0, _targetbuilder.setTargetBuilder)(i);
            //input[i].a[1] = true;
            (0, _main.changeGamemode)(4);
          } else {

            if (menuSelected == OPTIONS) {
              // options
              menuMode = SECONDLEVELOPTIONS;
              menuSelected = AUDIOOPTIONS;
              menuMove = true;
            }
          }
        }
      }
    } else if (menuMode === MPMENU) {

      if (menuSelected == LOCALVS) {
        (0, _main.changeGamemode)(2);
        (0, _main.positionPlayersInCSS)();
      } else {
        if (menuSelected == SPECTATING) {
          (0, _spectatorclient.connectAsSpectator)();
          (0, _main.changeGamemode)(2);
          (0, _main.positionPlayersInCSS)();
        } else {
          if (menuSelected == P2PMP) {
            //  connectToMPRoom();
            // changeGamemode(2);
            // positionPlayersInCSS();
          } else {
            if (menuSelected == SERVERMP) {
              (0, _streamclient.connectToMPServer)();
              (0, _main.changeGamemode)(2);
              (0, _main.positionPlayersInCSS)();
            }
          }
        }
      }
    } else if (menuMode === SECONDLEVELOPTIONS) {

      if (menuSelected == AUDIOOPTIONS) {
        //audio menu
        (0, _main.changeGamemode)(10);
      } else {

        if (menuSelected == GAMEPLAYOPTIONS) {
          //gameplay menu
          (0, _main.changeGamemode)(11);
        } else {

          if (menuSelected == KEYBOARDOPTIONS) {
            menuMode = CONTROLLERCALIB;
            menuSelected = 0;
            menuMove = true;
          } else {

            if (menuSelected == CREDITS) {
              //credits
              (0, _main.setCreditsPlayer)(i);
              (0, _main.changeGamemode)(13);
            }
          }
        }
      }
    } else if (menuMode === CONTROLLERCALIB) {
      if (menuSelected === 0) {
        // map controller
        (0, _main.setCalibrationPlayer)(i);
        (0, _main.changeGamemode)(14);
        (0, _gamepadCalibration.runCalibration)(i);
      } else {
        (0, _main.changeGamemode)(12);
        //keyboard menu
        (0, _main.setKeyBinding)(false);
      }
    }
  } else if (input[i][0].b && !input[i][1].b) {

    if (menuMode == CONTROLLERCALIB) {
      menuMode = SECONDLEVELOPTIONS;
      menuSelected = AUDIOOPTIONS;
      menuMove = true;
      _sfx.sounds.menuBack.play();
    } else if (menuMode == SECONDLEVELOPTIONS) {
      menuMode = TOPLEVEL;
      menuSelected = OPTIONS;
      menuMove = true;
      _sfx.sounds.menuBack.play();
    } else if (menuMode == MPMENU) {
      menuMode = TOPLEVEL;
      menuSelected = VSMODE;
      menuMove = true;
      _sfx.sounds.menuBack.play();
    } else if (menuMode === 2) {
      menuMode = 1;
      menuSelected = 2;
      menuMove = true;
      _sfx.sounds.menuBack.play();
    } else if (menuMode === 2) {
      menuMode = 1;
      menuSelected = 2;
      menuMove = true;
      _sfx.sounds.menuBack.play();
    }
  } else if (input[i][0].lsY > 0.7) {
    stickHoldEach[i] = true;
    if (stickHold == 0) {
      menuSelected--;
      menuMove = true;
      exports.stickHold = stickHold += 1;
    } else {
      exports.stickHold = stickHold += 1;
      if (stickHold % 10 == 0) {
        menuSelected--;
        menuMove = true;
      }
    }
  } else if (input[i][0].lsY < -0.7) {
    stickHoldEach[i] = true;
    if (stickHold == 0) {
      menuSelected++;
      menuMove = true;
      exports.stickHold = stickHold += 1;
    } else {
      exports.stickHold = stickHold += 1;
      if (stickHold % 10 == 0) {
        menuSelected++;
        menuMove = true;
      }
    }
  } else {
    stickHoldEach[i] = false;
    if (i == _main.ports - 1) {
      var stickHoldAll = false;
      for (var j = 0; j < _main.ports; j++) {
        if (stickHoldEach[j]) {
          stickHoldAll = true;
          break;
        }
      }
      if (!stickHoldAll) {
        exports.stickHold = stickHold = 0;
      }
    }
  }
  if (menuMove) {
    menuCycle = 0;
    menuTimer = 0;
    _sfx.sounds.menuSelect.play();
    if (menuSelected == -1) {
      menuSelected = menuCount[menuMode] - 1;
    }
    if (menuSelected == menuCount[menuMode]) {
      menuSelected = 0;
    }
    if (previousMenuS == TARGETTEST && menuSelected == TARGETBUILDER || previousMenuS == TARGETBUILDER && menuSelected == TARGETTEST) {
      if (menuSelected == TARGETTEST) {
        menuColours[menuSelected] = 0;
      } else {
        menuCurColour = 0;
      }
    } else if (previousMenuS == TARGETTEST) {
      menuCurColour = 358;
      menuColours[1] = 358;
    }
    menuColourOffset = menuColours[menuSelected] - menuCurColour;
  }
}

function drawMainMenuInit() {
  var bgGrad = _main.bg1.createLinearGradient(0, 0, 1200, 750);
  bgGrad.addColorStop(0, "rgba(12, 11, 54, 1)");
  bgGrad.addColorStop(1, "rgba(1, 2, 15, 1)");
  _main.bg1.fillStyle = bgGrad;
  _main.bg1.fillRect(0, 0, _main.layers.BG1.width, _main.layers.BG1.height);

  _main.fg1.lineWidth = 5;
  /*
   fg1.strokeStyle = "rgb(0, 0, 0)";
   for (var i = 0; i < 60; i++) {
   fg1.beginPath();
   fg1.moveTo(0, 900 - (i * 15));
   fg1.lineTo(1200, 750 - (i * 15));
   fg1.stroke();
   }
   */
  _main.fg1.strokeStyle = "rgba(3, 31, 219,0.5)";
  _main.fg1.fillStyle = "hsla(" + menuCurColour + ",100%,50%,0.5)";
  _main.fg1.save();
  _main.fg1.translate(800, 400);
  _main.fg1.rotate(0.7);
  _main.fg1.scale(0.4, 1);
  _main.fg1.beginPath();
  _main.fg1.arc(0, 0, 400, 0, _render.twoPi);
  _main.fg1.closePath();
  _main.fg1.stroke();
  _main.fg1.restore();
  _main.fg1.save();
  _main.fg1.translate(800, 400);
  _main.fg1.rotate(0.8);
  _main.fg1.scale(0.4, 1);
  _main.fg1.beginPath();
  _main.fg1.arc(0, 0, 400, 0, _render.twoPi);
  _main.fg1.closePath();
  _main.fg1.stroke();
  _main.fg1.restore();

  _main.fg1.lineWidth = 3;
  _main.fg1.strokeStyle = "rgba(255,255,255,0.13)";
  _main.fg1.beginPath();
  for (var i = 0; i < 60; i++) {
    _main.fg1.moveTo(0 + i * 30, 0);
    _main.fg1.lineTo(0 + i * 30, 750);
    _main.fg1.moveTo(0, 0 + i * 30);
    _main.fg1.lineTo(1200, 0 + i * 30);
  }
  _main.fg1.stroke();
}

function drawMainMenu() {
  (0, _main.clearScreen)();
  menuGlobalTimer++;
  if (menuGlobalTimer > 600) {
    menuGlobalTimer = 0;
  }
  _main.bg2.save();
  _main.bg2.fillStyle = "rgba(18, 16, 85, 0.4)";
  _main.bg2.translate(400, 400);
  _main.bg2.rotate(0.7);
  _main.bg2.fillRect(-150, 800 - menuGlobalTimer * 10, 40, 70);
  _main.bg2.fillRect(-350, 1200 - menuGlobalTimer * 9, 30, 170);
  _main.bg2.fillRect(-320, 1900 - menuGlobalTimer * 10, 40, 120);
  _main.bg2.fillRect(-420, 1000 - menuGlobalTimer * 5, 90, 210);
  _main.bg2.fillRect(-100, 1600 - menuGlobalTimer * 6, 95, 200);
  _main.bg2.fillRect(-80, 2100 - menuGlobalTimer * 6, 65, 260);
  _main.bg2.fillRect(-170, 2200 - menuGlobalTimer * 8, 65, 80);
  _main.bg2.fillRect(-400, 2700 - menuGlobalTimer * 10, 30, 130);
  _main.bg2.fillRect(-300, 3000 - menuGlobalTimer * 7, 40, 90);
  _main.bg2.fillRect(-50, 4400 - menuGlobalTimer * 10, 80, 90);
  _main.bg2.fillRect(-220, 4500 - menuGlobalTimer * 9, 50, 180);
  _main.bg2.fillRect(-500, 4900 - menuGlobalTimer * 10, 20, 220);
  _main.bg2.fillRect(-480, 5100 - menuGlobalTimer * 15, 50, 80);
  _main.bg2.fillRect(-300, 5500 - menuGlobalTimer * 10, 30, 90);
  _main.bg2.fillRect(-50, 5900 - menuGlobalTimer * 12, 40, 110);

  if (menuGlobalTimer % 130 == 0) {
    menuRandomBox = [Math.random(), Math.random(), Math.random(), Math.random()];
  }
  if (menuGlobalTimer % 130 < 50) {
    _main.bg2.fillStyle = "rgba(118, 113, 255," + Math.max(0.5 - menuGlobalTimer % 130 * 0.01, 0) + ")";
    _main.bg2.fillRect(menuRandomBox[0] * -450, menuRandomBox[1] * 800 - 400, menuRandomBox[2] * 50 + 30, menuRandomBox[3] * 60 + 30);
  }
  _main.bg2.restore();
  _main.fg2.fillStyle = "hsla(" + menuCurColour + ", 60%, 41%,0.75)";
  _main.fg2.save();
  _main.fg2.translate(800, 400);
  _main.fg2.rotate(0.7);
  menuAngle += 0.015;
  if (menuAngle >= _render.twoPi) {
    menuAngle = 0;
  }
  _main.fg2.beginPath();
  _main.fg2.arc(400 * Math.cos(menuAngle) * 0.4, 400 * Math.sin(menuAngle), 15, 0, _render.twoPi);
  _main.fg2.closePath();
  _main.fg2.fill();
  _main.fg2.restore();

  if (menuCurColour != menuColours[menuSelected]) {
    menuCurColour += menuColourOffset * 0.05;
    if (menuTimer == 19) {
      menuCurColour = Math.round(menuCurColour);
    }
  }
  _main.ui.lineWidth = 3;
  _main.ui.fillStyle = "hsla(" + menuCurColour + ", 60%, 41%,0.75)";
  _main.ui.strokeStyle = "hsl(" + menuCurColour + ", 60%, 41%)";
  _main.ui.beginPath();
  _main.ui.moveTo(300, 620);
  _main.ui.lineTo(180, 620);
  _main.ui.bezierCurveTo(130, 620, 130, 620, 130, 570);
  _main.ui.lineTo(130, 200);
  _main.ui.bezierCurveTo(130, 150, 130, 150, 180, 150);
  _main.ui.lineTo(550, 150);
  _main.ui.lineTo(600, 80);
  _main.ui.lineTo(1020, 80);
  _main.ui.bezierCurveTo(1070, 80, 1070, 80, 1070, 130);
  _main.ui.lineTo(1070, 570);
  _main.ui.bezierCurveTo(1070, 620, 1070, 620, 1020, 620);
  _main.ui.lineTo(900, 620);
  _main.ui.lineTo(900, 680);
  _main.ui.lineTo(1050, 680);
  _main.ui.bezierCurveTo(1100, 680, 1100, 680, 1100, 630);
  _main.ui.lineTo(1100, 110);
  _main.ui.bezierCurveTo(1100, 60, 1100, 60, 1050, 60);
  _main.ui.lineTo(590, 60);
  _main.ui.lineTo(540, 130);
  _main.ui.lineTo(150, 130);
  _main.ui.bezierCurveTo(100, 130, 100, 130, 100, 180);
  _main.ui.lineTo(100, 630);
  _main.ui.bezierCurveTo(100, 680, 100, 680, 150, 680);
  _main.ui.lineTo(300, 680);
  _main.ui.closePath();
  _main.ui.fill();
  _main.ui.stroke();
  _main.ui.beginPath();
  _main.ui.moveTo(590, 60);
  _main.ui.lineTo(570, 60);
  _main.ui.lineTo(520, 130);
  _main.ui.lineTo(540, 130);
  _main.ui.closePath();
  _main.ui.fill();
  _main.ui.stroke();
  _main.ui.beginPath();
  _main.ui.moveTo(570, 60);
  _main.ui.lineTo(550, 60);
  _main.ui.lineTo(500, 130);
  _main.ui.lineTo(520, 130);
  _main.ui.closePath();
  _main.ui.fill();
  _main.ui.stroke();
  _main.ui.beginPath();
  _main.ui.moveTo(550, 60);
  _main.ui.lineTo(530, 60);
  _main.ui.lineTo(480, 130);
  _main.ui.lineTo(500, 130);
  _main.ui.closePath();
  _main.ui.fill();
  _main.ui.stroke();
  _main.ui.fillStyle = "rgba(0,0,0,0.7)";
  _main.ui.strokeStyle = "white";
  _main.ui.beginPath();
  _main.ui.moveTo(330, 610);
  _main.ui.lineTo(870, 610);
  _main.ui.bezierCurveTo(890, 610, 890, 610, 890, 630);
  _main.ui.lineTo(890, 670);
  _main.ui.bezierCurveTo(890, 690, 890, 690, 870, 690);
  _main.ui.lineTo(330, 690);
  _main.ui.bezierCurveTo(310, 690, 310, 690, 310, 670);
  _main.ui.lineTo(310, 630);
  _main.ui.bezierCurveTo(310, 610, 310, 610, 330, 610);
  _main.ui.closePath();
  _main.ui.fill();
  _main.ui.stroke();
  _main.ui.save();
  _main.ui.textAlign = "center";
  _main.ui.fillStyle = "rgba(255, 255, 255, 0.8)";
  _main.ui.font = "700 35px Arial";
  _main.ui.fillText(menuExplanation[menuMode][menuSelected], 600, 660);
  _main.ui.fillStyle = "rgba(255, 255, 255, 0.5)";
  _main.ui.font = "italic 900 48px Arial";
  _main.ui.fillText(menuTitle[menuMode], 300, 120);

  _main.ui.fillStyle = "rgba(0, 0, 0, 0.76)";
  _main.ui.lineWidth = 5;
  _main.ui.strokeStyle = "rgba(255, 214, 0, 0.95)";
  for (var i = 0; i < menuCount[menuMode]; i++) {
    _main.ui.beginPath();
    _main.ui.moveTo(420 - i * 65, 200 + i * 100);
    _main.ui.lineTo(970 - i * 65, 200 + i * 100);
    _main.ui.arc(970 - i * 65, 235 + i * 100, 35, Math.PI * 1.5, Math.PI * 0.5);
    _main.ui.lineTo(970 - i * 65, 262 + i * 100);
    _main.ui.arc(970 - i * 65, 235 + i * 100, 20, Math.PI * 0.5, Math.PI * 1.5, true);
    _main.ui.lineTo(970 - i * 65, 225 + i * 100);
    _main.ui.arc(970 - i * 65, 235 + i * 100, 10, Math.PI * 1.5, Math.PI * 0.5);
    _main.ui.lineTo(970 - i * 65, 270 + i * 100);
    _main.ui.lineTo(415 - i * 65, 270 + i * 100);
    _main.ui.lineTo(405 - i * 65, 250 + i * 100);
    _main.ui.closePath();
    _main.ui.fill();
    _main.ui.stroke();
  }
  _main.ui.fillStyle = "rgb(254, 238, 27)";
  for (var i = 0; i < menuCount[menuMode]; i++) {
    var x = 1000;
    if (menuSelected == i) {
      x = 0;
    }
    _main.ui.beginPath();
    _main.ui.moveTo(420 - i * 65 + x, 200 + i * 100);
    _main.ui.lineTo(970 - i * 65 + x, 200 + i * 100);
    _main.ui.arc(970 - i * 65 + x, 235 + i * 100, 35, Math.PI * 1.5, Math.PI * 0.5);
    _main.ui.lineTo(970 - i * 65 + x, 262 + i * 100);
    _main.ui.arc(970 - i * 65 + x, 235 + i * 100, 20, Math.PI * 0.5, Math.PI * 1.5, true);
    _main.ui.lineTo(970 - i * 65 + x, 225 + i * 100);
    _main.ui.arc(970 - i * 65 + x, 235 + i * 100, 10, Math.PI * 1.5, Math.PI * 0.5);
    _main.ui.lineTo(970 - i * 65 + x, 270 + i * 100);
    _main.ui.lineTo(415 - i * 65 + x, 270 + i * 100);
    _main.ui.lineTo(405 - i * 65 + x, 250 + i * 100);
    _main.ui.closePath();
    _main.ui.fill();
    _main.ui.stroke();
    if (menuSelected == i) {
      _main.ui.save();
      _main.ui.fillStyle = "black";
      _main.ui.textAlign = "center";
      _main.ui.fillText(menuText[menuMode][i], 680 - i * 65, 250 + i * 100);
      _main.ui.globalAlpha = 0.7;
      _main.ui.strokeStyle = "rgb(255, 247, 144)";
      _main.ui.lineWidth = 8;
      _main.ui.beginPath();
      _main.ui.arc(970 - i * 65, 235 + i * 100, 35, 0, _render.twoPi);
      _main.ui.closePath();
      _main.ui.stroke();
      _main.ui.lineWidth = 15;
      _main.ui.beginPath();
      _main.ui.arc(970 - i * 65, 235 + i * 100, 13, 0, _render.twoPi);
      _main.ui.closePath();
      _main.ui.stroke();
      menuTimer++;
      if (menuTimer > 60) {
        menuTimer = 0;
        menuCycle = 1 - menuCycle;
      }
      _main.ui.fillStyle = "rgb(255, 247, 144)";
      _main.ui.globalAlpha = Math.abs(1 - menuTimer * 0.033);
      _main.ui.beginPath();
      _main.ui.arc(970 - i * 65, 235 + i * 100, 25, 0, _render.twoPi);
      _main.ui.closePath();
      _main.ui.fill();
      _main.ui.lineWidth = 3;
      _main.ui.globalAlpha = 0.5;
      _main.ui.beginPath();
      _main.ui.arc(970 - i * 65, 235 + i * 100, Math.max(13, 100 - menuTimer * 2), 0, _render.twoPi);
      _main.ui.closePath();
      _main.ui.stroke();
      if (menuCycle == 1 && menuTimer > 10) {
        _main.ui.beginPath();
        _main.ui.arc(970 - i * 65, 235 + i * 100, Math.max(13, 130 - menuTimer * 2), 0, _render.twoPi);
        _main.ui.closePath();
        _main.ui.stroke();
      }
      _main.ui.restore();
      _main.ui.fillStyle = "rgb(254, 238, 27)";
    } else {
      _main.ui.fillText(menuText[menuMode][i], 680 - i * 65, 250 + i * 100);
    }
  }
  _main.ui.restore();
}
function increaseStick() {
  exports.stickHold = stickHold += 1;
}
function resetStick() {
  exports.stickHold = stickHold = 0;
}

//////////////////
// WEBPACK FOOTER
// ./src/menus/menu.js
// module id = 124
// module chunks = 1
//# sourceURL=webpack:///./src/menus/menu.js?