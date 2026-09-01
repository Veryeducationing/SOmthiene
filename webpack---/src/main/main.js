'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.layerSwitches = exports.layers = exports.canvasMain = exports.c = exports.ui = exports.fg2 = exports.fg1 = exports.bg2 = exports.bg1 = exports.keyBinding = exports.keyBind = exports.keys = exports.usingLocalStorage = exports.matchTimer = exports.startTimer = exports.starting = exports.blastzone = exports.stageSelect = exports.respawnPoints = exports.edgeOrientation = exports.edgeOffset = exports.edges = exports.wallsR = exports.wallsL = exports.platforms = exports.ground = exports.startingFace = exports.startingPoint = exports.frameAdvance = exports.pause = exports.colours = exports.costumeTimeout = exports.pPal = exports.tagText = exports.hasTag = exports.palettes = exports.randomTags = exports.versusMode = exports.gameMode = exports.showDebug = exports.findingPlayers = exports.frameByFrameRender = exports.wasFrameByFrame = exports.frameByFrame = exports.playing = exports.activePorts = exports.ports = exports.cpuDifficulty = exports.playerType = exports.playerAmount = exports.currentPlayers = exports.mType = exports.firstTimeDetected = exports.usingCustomControls = exports.controllerResetCountdowns = exports.gameEnd = exports.calibrationPlayer = exports.creditsPlayer = exports.endTargetGame = exports.shine = exports.characterSelections = exports.framerate = exports.gamelogicTime = exports.renderTime = exports.player = exports.snowCount = exports.holiday = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable */


exports.setControllerReset = setControllerReset;
exports.setUsingCustomControls = setUsingCustomControls;
exports.setMtype = setMtype;
exports.setCurrentPlayer = setCurrentPlayer;
exports.setTagText = setTagText;
exports.setStageSelect = setStageSelect;
exports.setStarting = setStarting;
exports.setStartTimer = setStartTimer;
exports.getStartTimer = getStartTimer;
exports.addMatchTimer = addMatchTimer;
exports.setMatchTimer = setMatchTimer;
exports.getMatchTimer = getMatchTimer;
exports.setCookie = setCookie;
exports.setVersusMode = setVersusMode;
exports.getCookie = getCookie;
exports.setKeyBinding = setKeyBinding;
exports.overrideKeyboardEvent = overrideKeyboardEvent;
exports.disabledEventPropagation = disabledEventPropagation;
exports.SVG = SVG;
exports.matchTimerTick = matchTimerTick;
exports.screenShake = screenShake;
exports.percentShake = percentShake;
exports.findPlayers = findPlayers;
exports.setPlayerType = setPlayerType;
exports.addPlayer = addPlayer;
exports.togglePort = togglePort;
exports.positionPlayersInCSS = positionPlayersInCSS;
exports.changeGamemode = changeGamemode;
exports.interpretInputs = interpretInputs;
exports.renderToMain = renderToMain;
exports.update = update;
exports.gameTick = gameTick;
exports.clearScreen = clearScreen;
exports.renderTick = renderTick;
exports.buildPlayerObject = buildPlayerObject;
exports.initializePlayers = initializePlayers;
exports.startGame = startGame;
exports.endGame = endGame;
exports.finishGame = finishGame;
exports.start = start;
exports.customDeadzone = customDeadzone;
exports.addShine = addShine;
exports.setShine = setShine;
exports.setFindingPlayers = setFindingPlayers;
exports.setPlaying = setPlaying;
exports.setEndTargetGame = setEndTargetGame;
exports.setCreditsPlayer = setCreditsPlayer;
exports.setCalibrationPlayer = setCalibrationPlayer;
exports.cacheDom = cacheDom;
exports.setCS = setCS;

var _css = __webpack_require__(12);

var _player = __webpack_require__(122);

var _settings = __webpack_require__(14);

var _startup = __webpack_require__(123);

var _menu = __webpack_require__(124);

var _sfx = __webpack_require__(120);

var _startscreen = __webpack_require__(251);

var _stagerender = __webpack_require__(127);

var _stageselect = __webpack_require__(252);

var _audiomenu = __webpack_require__(253);

var _gameplaymenu = __webpack_require__(254);

var _keyboardmenu = __webpack_require__(255);

var _controllermenu = __webpack_require__(245);

var _credits = __webpack_require__(257);

var _render = __webpack_require__(13);

var _actionStateShortcuts = __webpack_require__(10);

var _hitDetection = __webpack_require__(133);

var _targetplay = __webpack_require__(125);

var _targetselect = __webpack_require__(241);

var _targetbuilder = __webpack_require__(126);

var _article = __webpack_require__(132);

var _ai = __webpack_require__(258);

var _physics = __webpack_require__(259);

var _jquery = __webpack_require__(1);

var _jquery2 = _interopRequireDefault(_jquery);

var _transparency = __webpack_require__(16);

var _drawVfx = __webpack_require__(134);

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

var _music = __webpack_require__(121);

var _vfx = __webpack_require__(135);

var _renderVfx = __webpack_require__(261);

var _Box2D = __webpack_require__(21);

var _Vec2D = __webpack_require__(22);

var _streamclient = __webpack_require__(48);

var _replay = __webpack_require__(66);

var _input = __webpack_require__(49);

var _meleeInputs = __webpack_require__(65);

var _findGamepadInfo = __webpack_require__(250);

var _custom = __webpack_require__(249);

var _retrieveGamepadInputs = __webpack_require__(50);

var _drawGamepad = __webpack_require__(246);

var _deepCopy = __webpack_require__(85);

var _deepCopyObject = __webpack_require__(67);

var _css2 = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*globals performance*/

var holiday = exports.holiday = 0;
var snowCount = exports.snowCount = 150;

var player = exports.player = [0, 0, 0, 0];
var renderTime = exports.renderTime = [10, 0, 100, 0];
var gamelogicTime = exports.gamelogicTime = [5, 0, 100, 0];
var framerate = exports.framerate = [0, 0, 0];
var characterSelections = exports.characterSelections = [0, 0, 0, 0];

var shine = exports.shine = 0.5;

var endTargetGame = exports.endTargetGame = false;

var creditsPlayer = exports.creditsPlayer = 0;
var calibrationPlayer = exports.calibrationPlayer = 0;

var gameEnd = exports.gameEnd = false;
var controllerResetCountdowns = exports.controllerResetCountdowns = [0, 0, 0, 0];
function setControllerReset(i) {
  controllerResetCountdowns[i] = 0;
}

var keyboardOccupied = false;

var usingCustomControls = exports.usingCustomControls = [false, false, false, false];

function setUsingCustomControls(i, bool, info) {
  usingCustomControls[i] = bool;
  if (bool) {
    mType[i] = _custom.customGamepadInfo[currentPlayers[i]];
  } else {
    mType[i] = info;
  }
}

var firstTimeDetected = exports.firstTimeDetected = [true, true, true, true];

window.mType = [null, null, null, null];

var mType = exports.mType = [null, null, null, null];

function setMtype(index, val) {
  mType[index] = val;
}

var currentPlayers = exports.currentPlayers = [];

function setCurrentPlayer(index, val) {
  currentPlayers[index] = val;
}

var playerAmount = exports.playerAmount = 0;

var playerType = exports.playerType = [-1, -1, -1, -1];

var cpuDifficulty = exports.cpuDifficulty = [3, 3, 3, 3];

var ports = exports.ports = 0;
var activePorts = exports.activePorts = [];

var playing = exports.playing = false;

var frameByFrame = exports.frameByFrame = false;
var wasFrameByFrame = exports.wasFrameByFrame = false;
var frameByFrameRender = exports.frameByFrameRender = false;

var findingPlayers = exports.findingPlayers = true;

var showDebug = exports.showDebug = false;

var gameMode = exports.gameMode = 20;
// 20:Startup
// 13:Data Menu
// 12:Keyboard Controls
// 11:Gameplay Menu
// 10:Sound Menu
// 9: -
// 8: -
// 7:Target Select
// 6:Stage Select (VS)
// 5:Target Playing
// 4:Target Builder
// 3:Playing (VS)
// 2:CSS
// 1:Main Menu
// 0:Title Screen
var versusMode = exports.versusMode = 0;

var randomTags = exports.randomTags = ["NEO!", "SELF", "NOVA", "PNDA", "Panda", "LFFN", "Scorp", "AZ", "AXE", "Tempo", "TMPO", "[A]rmada", "WBALLZ", "Westballz", "PPMD", "Kreygasm", "M2K", "Mang0", "USA", "SCAR", "TOPH", "(.Y.)", "HBOX", "HungryBox", "PLUP", "Shroomed", "SFAT", "Wizz", "Lucky", "S2J", "SilentWolf", "aMSa", "S2J", "Hax$"];

var palettes = exports.palettes = [["rgb(250, 89, 89)", "rgb(255, 170, 170)", "rgba(255, 206, 111, ", "rgb(244, 68, 68)", "rgba(255, 225, 167, "], ["rgb(95, 216, 84)", "rgb(184, 253, 154)", "rgba(252, 95, 95, ", "rgb(255, 182, 96)", "rgba(254, 141, 141, "], ["rgb(5, 195, 255)", "rgb(121, 223, 255)", "rgba(218, 96, 254, ", "rgb(231, 134, 255)", "rgba(230, 144, 255, "], ["rgb(255, 187, 70)", "rgb(248, 255, 122)", "rgba(80, 182, 255, ", "rgb(255, 142, 70)", "rgba(139, 203, 249, "], ["rgb(177, 89, 255)", "rgb(203, 144, 255)", "rgba(144, 255, 110, ", "rgb(247, 126, 250)", "rgba(190, 255, 170, "], ["rgb(182, 131, 70)", "rgb(252, 194, 126)", "rgba(47, 186, 123, ", "rgb(255, 112, 66)", "rgba(111, 214, 168, "], ["rgb(232, 232, 208)", "rgb(255, 255, 255)", "rgba(244, 255, 112, ", "rgb(191, 119, 119)", "rgba(255, 255, 200, "]];

var hasTag = exports.hasTag = [false, false, false, false];
var tagText = exports.tagText = ["", "", "", ""];
function setTagText(index, value) {
  tagText[index] = value;
  hasTag[index] = true;
}
var pPal = exports.pPal = [0, 1, 2, 3];

var costumeTimeout = exports.costumeTimeout = [];

var colours = exports.colours = ["rgba(4, 255, 82, 0.62)", "rgba(117, 20, 255, 0.63)", "rgba(255, 20, 20, 0.63)", "rgba(255, 232, 20, 0.63)"];

var pause = exports.pause = [[true, true], [true, true], [true, true], [true, true]];
var frameAdvance = exports.frameAdvance = [[true, true], [true, true], [true, true], [true, true]];

var startingPoint = exports.startingPoint = [[-50, 50], [50, 50], [-25, 5], [25, 5]];
var startingFace = exports.startingFace = [1, -1, 1, -1];

var ground = exports.ground = [[-68.4, 0], [68.4, 0]];

var platforms = exports.platforms = [[[-57.6, 27.2], [-20, 27.2]], [[20, 27.2], [57.6, 27.2]], [[-18.8, 54.4], [18.8, 54.4]]];

var wallsL = exports.wallsL = [[[-68.4, 0], [-68.4, -108.8]]];
var wallsR = exports.wallsR = [[[68.4, 0], [68.4, -108.8]]];

var edges = exports.edges = [[[-68.4, 0], [-63.4, 0]], [[68.4, 0], [63.4, 0]]];

//edgeOffset = [[-71.3,-23.7],[71.3,-23.7]];
var edgeOffset = exports.edgeOffset = [[-2.9, -23.7], [2.9, -23.7]];

var edgeOrientation = exports.edgeOrientation = [1, -1];

var respawnPoints = exports.respawnPoints = [[-50, 50, 1], [50, 50, -1], [25, 35, 1], [-25, 35, -1]];

var stageSelect = exports.stageSelect = 0;

function setStageSelect(val) {
  exports.stageSelect = stageSelect = val;
}

var blastzone = exports.blastzone = new _Box2D.Box2D([-224, 200], [224, -108.8]);

var starting = exports.starting = true;
function setStarting(val) {
  exports.starting = starting = val;
}
var startTimer = exports.startTimer = 1.5;
function setStartTimer(val) {
  exports.startTimer = startTimer = val;
}
function getStartTimer() {
  return startTimer;
}
//matchTimer = 5999.99;
var matchTimer = exports.matchTimer = 480;

function addMatchTimer(val) {
  exports.matchTimer = matchTimer += val;
}
function setMatchTimer(val) {
  exports.matchTimer = matchTimer = val;
}

function getMatchTimer() {
  return matchTimer;
}

var usingLocalStorage = exports.usingLocalStorage = false;
if (typeof Storage !== "undefined") {
  // Code for localStorage/sessionStorage.
  exports.usingLocalStorage = usingLocalStorage = true;
  console.log("local storage works");
} else {
  // Sorry! No Web Storage support..
  console.log("local storage does not work");
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var exp = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + exp;
  localStorage.setItem(cname, cvalue);
}
function setVersusMode(val) {
  exports.versusMode = versusMode = val;
}
function getCookie(cname) {
  if (usingLocalStorage) {
    return localStorage.getItem(cname);
  } else {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  }
}

var keys = exports.keys = {};
var keyBind = exports.keyBind = 0;
var keyBinding = exports.keyBinding = false;
function setKeyBinding(val) {
  exports.keyBinding = keyBinding = val;
}
function overrideKeyboardEvent(e) {
  if (!_targetbuilder.showingCode && _css.choosingTag == -1 && e.keyCode != 122 && e.keyCode != 116) {
    switch (e.type) {
      case "keydown":
        if (!keys[e.keyCode]) {
          keys[e.keyCode] = true;
          exports.keyBind = keyBind = e.keyCode;
          exports.keyBinding = keyBinding = true;
          // do key down stuff here
        }
        break;
      case "keyup":
        delete keys[e.keyCode];
        // do key up stuff here
        break;
    }
    disabledEventPropagation(e);
    e.preventDefault();
    return false;
  } else {
    if (_css.choosingTag > -1) {
      if (e.keyCode == 13) {
        switch (e.type) {
          case "keydown":
            keys[13] = true;
            break;
          case "keyup":
            delete keys[13];
            break;
          default:
            break;
        }
      }
    }
    return true;
  }
};

function disabledEventPropagation(e) {
  if (e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (event) {
      event.cancelBubble = true;
    }
  }
};

document.onkeydown = overrideKeyboardEvent;
document.onkeyup = overrideKeyboardEvent;

/*var keys = [];
export const onkeyup (e) {
  keys[e.keyCode]=false;
}
export const onkeydown (e) {
  keys[e.keyCode]=true;
}*/

function SVG(tag) {
  return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

/*if (Gamepad.supported) {
    console.log("gamepad supported");
} else {
    console.log("gamepad not supported");
}*/

window.addEventListener("gamepadconnected", function (e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);
});
if (navigator.getGamepads) console.log(navigator.getGamepads());

function matchTimerTick(input) {
  exports.matchTimer = matchTimer -= 0.016667;

  if (dom.matchMinutes && dom.matchSeconds) {
    var sec = (matchTimer % 60).toFixed(2);
    dom.matchMinutes.innerHTML = Math.floor(matchTimer / 60);
    dom.matchSeconds.innerHTML = sec.length < 5 ? '0' + sec : sec;
  }

  if (matchTimer <= 0) {
    finishGame(input);
  }
}

function screenShake(kb) {
  var seed = [Math.random(), Math.random(), Math.random(), Math.random()];
  fg1.translate(kb * 0.1 * seed[0], kb * 0.1 * seed[1]);
  setTimeout(function () {
    fg1.translate(-kb * 0.05 * seed[0], -kb * 0.05 * seed[1]);
  }, 20);
  setTimeout(function () {
    fg1.translate(-kb * 0.05 * seed[0], -kb * 0.05 * seed[1]);fg1.translate(-kb * 0.1 * seed[2], -kb * 0.1 * seed[3]);
  }, 40);
  setTimeout(function () {
    fg1.translate(kb * 0.05 * seed[2], kb * 0.05 * seed[3]);
  }, 60);
  setTimeout(function () {
    fg1.translate(kb * 0.05 * seed[2], kb * 0.05 * seed[3]);
  }, 80);
}

function percentShake(kb, i) {
  player[i].percentShake = new _Vec2D.Vec2D(kb * 0.1 * Math.random(), kb * 0.1 * Math.random());
  setTimeout(function () {
    player[i].percentShake = new _Vec2D.Vec2D(kb * 0.05 * Math.random(), kb * 0.05 * Math.random());
  }, 20);
  setTimeout(function () {
    player[i].percentShake = new _Vec2D.Vec2D(-kb * 0.1 * Math.random(), -kb * 0.1 * Math.random());
  }, 40);
  setTimeout(function () {
    player[i].percentShake = new _Vec2D.Vec2D(-kb * 0.05 * Math.random(), -kb * 0.05 * Math.random());
  }, 60);
  setTimeout(function () {
    player[i].percentShake = new _Vec2D.Vec2D(0, 0);
  }, 80);
}

function findPlayers() {
  var gps = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : [];
  /*if (typeof gps != "undefined"){
    console.log(gps);
  }*/
  if (!keyboardOccupied) {
    if (gameMode < 2 || gameMode == 20) {
      if (keys[13] || keys[_settings.keyMap.s[0]] || keys[_settings.keyMap.s[1]]) {
        if (ports < 4) {
          changeGamemode(1);
          (0, _jquery2.default)("#keyboardPrompt").hide();
          keyboardOccupied = true;
          _sfx.sounds.menuForward.play();
          if (ports == 0) {
            _music.MusicManager.playMenuLoop();
          }
          addPlayer(ports, "keyboard");
        }
      }
    } else {
      if (keys[_settings.keyMap.a[0]] || keys[_settings.keyMap.a[1]]) {
        if (ports < 4) {
          keyboardOccupied = true;
          addPlayer(ports, "keyboard");
        }
      }
    }
  }
  for (var i = 0; i < gps.length; i++) {
    var gamepad = navigator.getGamepads ? navigator.getGamepads()[i] : navigator.webkitGetGamepads ? navigator.webkitGetGamepads()[i] : null;
    if (playerType[i] === 2) {
      var alreadyIn = false;
      for (var k = 0; k < ports; k++) {
        if (currentPlayers[k] === i) {
          alreadyIn = true;
        }
      }
      if (!alreadyIn) {
        if (ports < 4) {
          addPlayer(i, 99);
        }
      }
      continue;
    }

    var gamepad = navigator.getGamepads ? navigator.getGamepads()[i] : navigator.webkitGetGamepads ? navigator.webkitGetGamepads()[i] : null;
    if (typeof gamepad != "undefined" && gamepad != null) {
      var detected = false;
      var gpdName;
      var gpdInfo;
      if (usingCustomControls[i] && _custom.customGamepadInfo[i] !== null) {
        gpdName = "custom controls";
        gpdInfo = _custom.customGamepadInfo[i];
        detected = true;
      } else {
        var maybeNameAndInfo = (0, _findGamepadInfo.getGamepadNameAndInfo)(gamepad.id);
        if (maybeNameAndInfo === null) {
          console.log("Error in 'findPlayers': controller " + (i + 1) + " detected but not supported.");
          console.log("Try manual calibration of your controller.");
        } else {
          detected = true;

          var _maybeNameAndInfo = _slicedToArray(maybeNameAndInfo, 2);

          gpdName = _maybeNameAndInfo[0];
          gpdInfo = _maybeNameAndInfo[1];
        }
      }
      if (detected) {
        if (firstTimeDetected[i]) {
          console.log("Controller " + (i + 1) + " is: " + gpdName + ".");
          firstTimeDetected[i] = false;
        }
        if (gameMode < 2 || gameMode == 20) {
          if ((0, _retrieveGamepadInputs.buttonState)(gamepad, gpdInfo, "s")) {
            var alreadyIn = false;
            for (var k = 0; k < ports; k++) {
              if (currentPlayers[k] == i) {
                alreadyIn = true;
              }
            }
            if (!alreadyIn) {
              if (ports < 4) {
                changeGamemode(1);
                (0, _jquery2.default)("#keyboardPrompt").hide();
                _sfx.sounds.menuForward.play();
                if (ports === 0) {
                  _music.MusicManager.playMenuLoop();
                }
                addPlayer(i, gpdInfo);
              }
            }
          }
        } else {
          if ((0, _retrieveGamepadInputs.buttonState)(gamepad, gpdInfo, "a")) {
            var alreadyIn = false;
            for (var k = 0; k < ports; k++) {
              if (currentPlayers[k] == i) {
                alreadyIn = true;
              }
            }
            if (!alreadyIn) {
              if (ports < 4) {
                addPlayer(i, gpdInfo);
              }
            }
          }
        }
      } else {
        console.log("No controller detected by browser");
      }
    }
  }
}

function setPlayerType(playerSlot, type) {
  playerType[playerSlot] = type;
}

function addPlayer(i, controllerInfo) {
  if (controllerInfo === 99) {
    exports.ports = ports += 1;
    currentPlayers[ports - 1] = i;
    playerType[ports - 1] = 2;
    mType[ports - 1] = controllerInfo;
  } else {
    exports.ports = ports += 1;
    currentPlayers[ports - 1] = i;
    playerType[ports - 1] = 0;
    mType[ports - 1] = controllerInfo;
    if (showDebug) {
      (0, _drawGamepad.updateGamepadSVGColour)(i, "gamepadSVG" + i);
      document.getElementById("gamepadSVG" + i).style.display = "";
    }
  }
}

function togglePort(i) {
  playerType[i]++;
  if (playerType[i] == 3) {
    playerType[i] = -1;
    if (showDebug) {
      document.getElementById("gamepadSVG" + i).style.display = "none";
    }
  }
  if (playerType[i] == 0 && ports <= i) {
    playerType[i] = 1;
    (0, _drawGamepad.setGamepadSVGColour)(i, "black");
    if (showDebug) {
      (0, _drawGamepad.updateGamepadSVGColour)(i, "gamepadSVG" + i);
      document.getElementById("gamepadSVG" + i).style.display = "";
    }
  }
}

function positionPlayersInCSS() {
  for (var i = 0; i < 4; i++) {
    var x = (-80 + i * 50) * 2 / 3;
    var y = -30;
    player[i].phys.pos = new _Vec2D.Vec2D(x, y);
    player[i].phys.hurtbox = new _Box2D.Box2D([-4 + x, 18 + y], [4 + x, y]);
  }
}

// 20:Startup
// 14:Controller Menu
// 13:Data Menu
// 12:Keyboard Controls
// 11:Gameplay Menu
// 10:Sound Menu
// 9: -
// 8: -
// 7:Target Select
// 6:Stage Select (VS)
// 5:Target Playing
// 4:Target Builder
// 3:Playing (VS)
// 2:CSS
// 1:Main Menu
// 0:Title Screen

function changeGamemode(newGamemode) {
  bg1.fillStyle = "black";
  bg1.fillRect(0, 0, layers.BG1.width, layers.BG1.height);
  fg1.clearRect(0, 0, layers.FG1.width, layers.FG1.height);

  exports.gameMode = gameMode = newGamemode;
  switch (newGamemode) {
    // TITLESCREEN
    case 0:
      (0, _startscreen.drawStartScreenInit)();
      break;
    // MAIN MENU
    case 1:
      (0, _jquery2.default)("#logoVid").remove();
      (0, _menu.drawMainMenuInit)();
      break;
    // CSS
    case 2:
      (0, _css.drawCSSInit)();
      break;
    // Playing (VS)
    case 3:
      (0, _stagerender.drawBackgroundInit)();
      (0, _stagerender.drawStageInit)();
      break;
    // Target Builder
    case 4:
      break;
    // Target Playing
    case 5:
      (0, _stagerender.drawBackgroundInit)();
      (0, _stagerender.drawStageInit)();
      break;
    // Stage select (vs)
    case 6:
      (0, _stageselect.drawSSSInit)();
      break;
    // Target Select
    case 7:
      (0, _targetselect.drawTSSInit)();
      break;
    // sound menu
    case 10:
      (0, _audiomenu.drawAudioMenuInit)();
      break;
    // gameplay menu
    case 11:
      (0, _gameplaymenu.drawGameplayMenuInit)();
      break;
    // keyboard menu
    case 12:
      (0, _keyboardmenu.drawKeyboardMenuInit)();
      break;
    // credits
    case 13:
      (0, _credits.drawCreditsInit)();
      break;
    // Multiplayer Modes
    case 14:
      (0, _controllermenu.drawControllerMenuInit)();

      break;
    case 15:
      (0, _css.drawCSSInit)();
      (0, _streamclient.connectToMPServer)();

      break;

    // startup
    case 20:
      break;
    default:
      break;
  }
}

/*export const addPlayer (i,gType,pType){
  console.log(i,gType,pType);

  currentPlayers.push(i);
  if (pType == 0){
    ports++;
    mType[ports-1] = gType;
    playerType[ports-1] = pType;

    costumeTimeout.push(false);
    pPal.push(ports-1);
    buildPlayerObject(ports-1);
    player[playerAmount-1].phys.pos = new Vec2D(-100+25*(playerAmount=1),-40);
    player[ports-1].phys.face = 1;
    player[ports-1].actionState = 0;
    $("#currentPlayers").append('<div class="pBoxBox"><div class="playerBox" id="pBox'+(ports-1)+'" style="background-color:'+palettes[pPal[ports-1]][0]+';border:5px solid '+palettes[pPal[ports-1]][2]+'0.8)"><p>P'+ports+'<br><span class="cont">(Cont. '+i+')</span></p></div><div id="pTag'+(ports-1)+'" class="pTag"><textarea id="pTagEdit'+(ports-1)+'" class="pTagEdit" maxlength="10"></textarea></div></div>');
  }
  else {
    mType[i] = gType;

    costumeTimeout.push(false);
    pPal.push(i);
    buildPlayerObject(i);
    player[playerAmount-1].phys.pos = new Vec2D(-100+25*(playerAmount=1),-40);
    player[i].phys.face = 1;
    player[i].actionState = 0;
    $("#currentPlayers").append('<div class="pBoxBox"><div class="playerBox" id="pBox'+i+'" style="background-color:'+palettes[pPal[i]][0]+';border:5px solid '+palettes[pPal[i]][2]+'0.8)"><p>P'+(i+1)+'<br><span class="cont">(Cont. '+i+')</span></p></div><div id="pTag'+i+'" class="pTag"><textarea id="pTagEdit'+i+'" class="pTagEdit" maxlength="10"></textarea></div></div>');
  }
  playerAmount++;
}

export const removePlayer (i){
  playerType[i] = -1;
  playerAmount--;
}*/

function interpretInputs(i, active, playertype, inputBuffer) {

  var tempBuffer = (0, _input.nullInputs)();

  // keep updating Z and Start all the time, even when paused
  for (var k = 0; k < 7; k++) {
    tempBuffer[7 - k].z = inputBuffer[6 - k].z;
    tempBuffer[7 - k].s = inputBuffer[6 - k].s;
  }

  tempBuffer[0] = (0, _input.pollInputs)(gameMode, frameByFrame, mType[i], i, currentPlayers[i], keys, playertype);

  var pastOffset = 0;
  if (gameMode !== 3 && gameMode !== 5 || playing && (pause[i][1] || !pause[i][0]) || wasFrameByFrame || !playing && pause[i][0] && !pause[i][1]) {
    pastOffset = 1;
  }

  pause[i][1] = pause[i][0];
  exports.wasFrameByFrame = wasFrameByFrame = false;
  frameAdvance[i][1] = frameAdvance[i][0];

  for (var k = 0; k < 7; k++) {
    tempBuffer[7 - k].lsX = inputBuffer[7 - k - pastOffset].lsX;
    tempBuffer[7 - k].lsY = inputBuffer[7 - k - pastOffset].lsY;
    tempBuffer[7 - k].rawX = inputBuffer[7 - k - pastOffset].rawX;
    tempBuffer[7 - k].rawY = inputBuffer[7 - k - pastOffset].rawY;
    tempBuffer[7 - k].csX = inputBuffer[7 - k - pastOffset].csX;
    tempBuffer[7 - k].csY = inputBuffer[7 - k - pastOffset].csY;
    tempBuffer[7 - k].rawcsX = inputBuffer[7 - k - pastOffset].rawcsX;
    tempBuffer[7 - k].rawcsY = inputBuffer[7 - k - pastOffset].rawcsY;
    tempBuffer[7 - k].lA = inputBuffer[7 - k - pastOffset].lA;
    tempBuffer[7 - k].rA = inputBuffer[7 - k - pastOffset].rA;
    tempBuffer[7 - k].a = inputBuffer[7 - k - pastOffset].a;
    tempBuffer[7 - k].b = inputBuffer[7 - k - pastOffset].b;
    tempBuffer[7 - k].x = inputBuffer[7 - k - pastOffset].x;
    tempBuffer[7 - k].y = inputBuffer[7 - k - pastOffset].y;
    tempBuffer[7 - k].r = inputBuffer[7 - k - pastOffset].r;
    tempBuffer[7 - k].l = inputBuffer[7 - k - pastOffset].l;
    tempBuffer[7 - k].dl = inputBuffer[7 - k - pastOffset].dl;
    tempBuffer[7 - k].dd = inputBuffer[7 - k - pastOffset].dd;
    tempBuffer[7 - k].dr = inputBuffer[7 - k - pastOffset].dr;
    tempBuffer[7 - k].du = inputBuffer[7 - k - pastOffset].du;
  }

  if (mType !== null) {
    if (mType[i] === "keyboard" && (tempBuffer[0].z || tempBuffer[1].z) || mType[i] !== "keyboard" && tempBuffer[0].z && !tempBuffer[1].z) {
      frameAdvance[i][0] = true;
    } else {
      frameAdvance[i][0] = false;
    }
  }

  if (frameAdvance[i][0] && !frameAdvance[i][1] && !playing && gameMode !== 4) {
    exports.frameByFrame = frameByFrame = true;
  }

  if (mType[i] === "keyboard") {
    // keyboard controls

    if (tempBuffer[0].s || tempBuffer[1].s || gameMode === 5 && (tempBuffer[0].du || tempBuffer[1].du)) {
      pause[i][0] = true;
    } else {
      pause[i][0] = false;
    }

    if (!playing && (gameMode == 3 || gameMode == 5) && (tempBuffer[0].a || tempBuffer[1].a) && (tempBuffer[0].l || tempBuffer[1].l) && (tempBuffer[0].r || tempBuffer[1].r) && (tempBuffer[0].s || tempBuffer[1].s)) {
      if (tempBuffer[0].b || tempBuffer[1].b) {
        startGame();
      } else {
        endGame(inputBuffer);
      }
    }

    interpretPause(pause[i][0], pause[i][1]);
  } else if (mType[i] !== null) {
    // gamepad controls

    if (!playing && (gameMode == 3 || gameMode == 5) && tempBuffer[0].a && tempBuffer[0].l && tempBuffer[0].r && tempBuffer[0].s && !(tempBuffer[1].a && tempBuffer[1].l && tempBuffer[1].r && tempBuffer[1].s)) {
      if (tempBuffer[0].b) {
        startGame();
      } else {
        endGame(inputBuffer);
      }
    }

    if (tempBuffer[0].s || tempBuffer[0].du && gameMode == 5) {
      pause[i][0] = true;
    } else {
      pause[i][0] = false;
    }

    // Controller reset functionality
    if ((tempBuffer[0].z || tempBuffer[0].du) && tempBuffer[0].x && tempBuffer[0].y) {
      controllerResetCountdowns[i] -= 1;
      if (controllerResetCountdowns[i] === 0) {
        // triggers code in input.js
        console.log("Controller #" + (i + 1) + " was reset!");
        (0, _jquery2.default)("#resetIndicator" + i).fadeIn(100);
        (0, _jquery2.default)("#resetIndicator" + i).fadeOut(500);
      }
    } else {
      controllerResetCountdowns[i] = 125;
    }

    interpretPause(pause[i][0], pause[i][1]);
  } else {
    // AI
    tempBuffer[0].rawX = tempBuffer[0].lsX;
    tempBuffer[0].rawY = tempBuffer[0].lsY;
    tempBuffer[0].rawcsX = tempBuffer[0].csX;
    tempBuffer[0].rawcsY = tempBuffer[0].csY;
    tempBuffer[0].lsX = (0, _meleeInputs.deaden)(tempBuffer[0].rawX);
    tempBuffer[0].lsY = (0, _meleeInputs.deaden)(tempBuffer[0].rawY);
    tempBuffer[0].csX = (0, _meleeInputs.deaden)(tempBuffer[0].rawcsX);
    tempBuffer[0].csY = (0, _meleeInputs.deaden)(tempBuffer[0].rawcsY);
  }

  if (showDebug) {
    (0, _jquery2.default)("#lsAxisX" + i).empty().append(tempBuffer[0].lsX.toFixed(3));
    (0, _jquery2.default)("#lsAxisY" + i).empty().append(tempBuffer[0].lsY.toFixed(3));
    (0, _jquery2.default)("#csAxisX" + i).empty().append(tempBuffer[0].csX.toFixed(3));
    (0, _jquery2.default)("#csAxisY" + i).empty().append(tempBuffer[0].csY.toFixed(3));
    (0, _jquery2.default)("#lAnalog" + i).empty().append(tempBuffer[0].lA.toFixed(3));
    (0, _jquery2.default)("#rAnalog" + i).empty().append(tempBuffer[0].rA.toFixed(3));
    (0, _drawGamepad.updateGamepadSVGState)(i, "gamepadSVG" + i, tempBuffer[0]);
  }

  if (gameMode === 14) {
    // controller calibration screen
    (0, _drawGamepad.updateGamepadSVGState)(i, "gamepadSVGCalibration", tempBuffer[0]);
  }

  if (showDebug || gameMode === 14) {
    var which = showDebug && gameMode === 14 ? "both" : showDebug ? "debug" : "calibration";
    if (tempBuffer[0].x && !tempBuffer[1].x && tempBuffer[0].du) {
      (0, _drawGamepad.cycleGamepadColour)(i, which, true);
    }
    if (tempBuffer[0].y && !tempBuffer[1].y && tempBuffer[0].du) {
      (0, _drawGamepad.cycleGamepadColour)(i, which, false);
    }
  }

  if (_streamclient.giveInputs[i] === true) {
    //turns out keyboards leave gaps in the input buffer
    (0, _deepCopyObject.deepObjectMerge)(true, (0, _input.nullInput)(), tempBuffer[0]);
    (0, _streamclient.updateNetworkInputs)(tempBuffer[0], i);
  }
  if (active) {
    if (tempBuffer[0].dl && !tempBuffer[1].dl) {
      player[i].showLedgeGrabBox ^= true;
    }
    if (tempBuffer[0].dd && !tempBuffer[1].dd) {
      player[i].showECB ^= true;
    }
    if (tempBuffer[0].dr && !tempBuffer[1].dr) {
      player[i].showHitbox ^= true;
    }
  }

  if (frameByFrame) {
    tempBuffer[0].z = false;
  }

  return tempBuffer;
}

function interpretPause(pause0, pause1) {
  if (pause0 && !pause1) {
    if (gameMode == 3 || gameMode == 5) {
      exports.playing = playing ^= true;
      if (!playing) {
        _sfx.sounds.pause.play();
        changeVolume(_music.MusicManager, _audiomenu.masterVolume[1] * 0.3, 1);
        (0, _render.renderForeground)();
      } else {
        changeVolume(_music.MusicManager, _audiomenu.masterVolume[1], 1);
      }
    }
  }
}

var bg1 = exports.bg1 = 0;
var bg2 = exports.bg2 = 0;
var fg1 = exports.fg1 = 0;
var fg2 = exports.fg2 = 0;
var ui = exports.ui = 0;
var c = exports.c = 0;
var canvasMain = exports.canvasMain = 0;
var layers = exports.layers = {
  BG1: 0,
  BG2: 0,
  FG1: 0,
  FG2: 0,
  UI: 0
};
var layerSwitches = exports.layerSwitches = {
  BG1: true,
  BG2: true,
  FG1: true,
  FG2: true,
  UI: true
};

function renderToMain() {
  var keys = Object.keys(layers);
  for (var i = 0; i < keys.length; i++) {
    if (layerSwitches[keys[i]]) {
      c.drawImage(layers[keys[i]], 0, 0);
    }
  }
}

function update(i, inputBuffers) {
  if (!starting) {
    if (currentPlayers[i] != -1) {
      if (playerType[i] == 0) {
        // do nothing, use the provided player i inputs
      } else if (playerType[i] === 1) {
        if (player[i].actionState != "SLEEP") {
          (0, _ai.runAI)(i); // no need to return input since polling returns ai input if they are active
        }
      }
    }
  }
  (0, _physics.physics)(i, inputBuffers);
}

var delta = 0;
var lastFrameTimeMs = 0;
var lastUpdate = performance.now();

function gameTick(oldInputBuffers) {
  var start = performance.now();
  var diff = 0;

  var input = [(0, _input.nullInputs)(), (0, _input.nullInputs)(), (0, _input.nullInputs)(), (0, _input.nullInputs)()];

  if (gameMode == 0 || gameMode == 20) {
    findPlayers();
  } else if (gameMode == 1) {
    //console.log(playerType);
    for (var i = 0; i < ports; i++) {
      input[i] = interpretInputs(i, true, playerType[i], oldInputBuffers[i]);
      (0, _menu.menuMove)(i, input);
    }
  } else if (gameMode == 10) {
    for (var i = 0; i < ports; i++) {
      input[i] = interpretInputs(i, true, playerType[i], oldInputBuffers[i]);
      (0, _audiomenu.audioMenuControls)(i, input);
    }
  } else if (gameMode == 11) {
    for (var i = 0; i < ports; i++) {
      input[i] = interpretInputs(i, true, playerType[i], oldInputBuffers[i]);
      (0, _gameplaymenu.gameplayMenuControls)(i, input);
    }
  } else if (gameMode == 12) {
    for (var i = 0; i < ports; i++) {
      input[i] = interpretInputs(i, true, playerType[i], oldInputBuffers[i]);
      (0, _keyboardmenu.keyboardMenuControls)(i, input);
    }
  } else if (gameMode == 13) {
    input[creditsPlayer] = interpretInputs(creditsPlayer, true, playerType[creditsPlayer], oldInputBuffers[creditsPlayer]);
    (0, _credits.credits)(creditsPlayer, input);
  } else if (gameMode == 14) {
    // controller calibration
    input[calibrationPlayer] = interpretInputs(calibrationPlayer, true, playerType[calibrationPlayer], oldInputBuffers[calibrationPlayer]);
  } else if (gameMode == 15) {
    for (var i = 0; i < ports; i++) {
      input[i] = interpretInputs(i, true, playerType[i], oldInputBuffers[i]);
      (0, _menu.menuMove)(i, input);
    }
  } else if (gameMode == 2) {
    for (var i = 0; i < 4; i++) {
      if (i < ports) {
        input[i] = interpretInputs(i, true, playerType[i], oldInputBuffers[i]);
        (0, _css.cssControls)(i, input);
      }

      _actionStateShortcuts.actionStates[characterSelections[i]][player[i].actionState].main(i, input);
    }
    for (var i = 0; i < 4; i++) {
      if (playerType[i] > -1) {
        (0, _hitDetection.hitDetect)(i, input);
      }
    }
    (0, _hitDetection.executeHits)(input);
    (0, _hitDetection.resetHitQueue)();
    findPlayers();
  } else if (gameMode == 6) {
    // stage select
    for (var i = 0; i < 4; i++) {
      if (i < ports) {
        input[i] = interpretInputs(i, true, playerType[i], oldInputBuffers[i]);
        (0, _stageselect.sssControls)(i, input);
      }
    }
  } else if (gameMode == 7) {
    // stage select
    input[_targetplay.targetPlayer] = interpretInputs(_targetplay.targetPlayer, true, playerType[_targetplay.targetPlayer], oldInputBuffers[_targetplay.targetPlayer]);
    (0, _targetselect.tssControls)(_targetplay.targetPlayer, input);
  } else if (gameMode == 4) {
    input[_targetbuilder.targetBuilder] = interpretInputs(_targetbuilder.targetBuilder, true, playerType[_targetbuilder.targetBuilder], oldInputBuffers[_targetbuilder.targetBuilder]);
    (0, _targetbuilder.targetBuilderControls)(_targetbuilder.targetBuilder, input);
  } else if (gameMode == 5) {
    if (endTargetGame) {
      finishGame(input);
    }
    if (playing || frameByFrame) {

      var now = performance.now();
      var dt = now - lastUpdate;
      lastUpdate = now;
      (0, _hitDetection.resetHitQueue)();
      (0, _article.destroyArticles)();
      (0, _article.executeArticles)();
      if (!starting) {
        input[_targetbuilder.targetBuilder] = interpretInputs(_targetbuilder.targetBuilder, true, playerType[_targetbuilder.targetBuilder], oldInputBuffers[_targetbuilder.targetBuilder]);
      }
      update(_targetbuilder.targetBuilder, input);
      (0, _hitDetection.executeHits)(input);
      (0, _targetplay.targetHitDetection)(_targetbuilder.targetBuilder);
      if (!starting) {
        (0, _targetplay.targetTimerTick)();
      } else {
        exports.startTimer = startTimer -= 0.01666667;
        if (startTimer < 0) {
          exports.starting = starting = false;
        }
      }
      if (input[_targetbuilder.targetBuilder][0].s && !input[_targetbuilder.targetBuilder][1].s) {
        endGame(input);
      }
      if (frameByFrame) {
        exports.frameByFrameRender = frameByFrameRender = true;
        exports.wasFrameByFrame = wasFrameByFrame = true;
      }
      exports.frameByFrame = frameByFrame = false;

      if (showDebug) {
        diff = performance.now() - start;
        gamelogicTime[0] += diff;
        gamelogicTime[0] /= 2;
        if (diff >= 10) {
          gamelogicTime[3]++;
        }
        if (diff < gamelogicTime[2]) {
          gamelogicTime[2] = diff;
        }
        if (diff > gamelogicTime[1]) {
          gamelogicTime[1] = diff;
        }
        dom.gamelogicAvg.innerHTML = Math.round(gamelogicTime[0]);
        dom.gamelogicHigh.innerHTML = Math.round(gamelogicTime[1]);
        dom.gamelogicLow.innerHTML = Math.round(gamelogicTime[2]);
        dom.gamelogicPeak.innerHTML = gamelogicTime[3];
      }
    } else {
      if (!gameEnd) {
        input[_targetbuilder.targetBuilder] = interpretInputs(_targetbuilder.targetBuilder, false, playerType[_targetbuilder.targetBuilder], oldInputBuffers[_targetbuilder.targetBuilder]);
      }
    }
  } else if (playing || frameByFrame) {
    //console.log("test0");
    /*delta = timestamp - lastFrameTimeMs; // get the delta time since last frame
    lastFrameTimeMs = timestamp;
    console.log(delta);*/
    var now = performance.now();
    var dt = now - lastUpdate;

    //console.log(now);
    //console.log(dt);
    lastUpdate = now;

    (0, _hitDetection.resetHitQueue)();
    (0, _activeStage.getActiveStage)().movingPlatforms();
    (0, _article.destroyArticles)();
    (0, _article.executeArticles)();

    for (var i = 0; i < 4; i++) {
      if (playerType[i] > -1) {
        if (!starting) {
          input[i] = interpretInputs(i, true, playerType[i], oldInputBuffers[i]);
        }
        update(i, input);
      }
    }
    (0, _hitDetection.checkPhantoms)();
    for (var i = 0; i < 4; i++) {
      if (playerType[i] > -1) {
        (0, _hitDetection.hitDetect)(i, input);
      }
    }
    (0, _hitDetection.executeHits)(input);
    (0, _article.articlesHitDetection)();
    (0, _article.executeArticleHits)(input);
    if (!starting && !versusMode) {
      matchTimerTick(input);
    } else {
      exports.startTimer = startTimer -= 0.01666667;
      if (startTimer < 0) {
        exports.starting = starting = false;
      }
    }
    if (frameByFrame) {
      exports.frameByFrameRender = frameByFrameRender = true;
      exports.wasFrameByFrame = wasFrameByFrame = true;
    }
    exports.frameByFrame = frameByFrame = false;
    if (showDebug) {
      diff = performance.now() - start;
      gamelogicTime[0] += diff;
      gamelogicTime[0] /= 2;
      if (diff >= 10) {
        gamelogicTime[3]++;
      }
      if (diff < gamelogicTime[2]) {
        gamelogicTime[2] = diff;
      }
      if (diff > gamelogicTime[1]) {
        gamelogicTime[1] = diff;
      }
      dom.gamelogicAvg.innerHTML = Math.round(gamelogicTime[0]);
      dom.gamelogicHigh.innerHTML = Math.round(gamelogicTime[1]);
      dom.gamelogicLow.innerHTML = Math.round(gamelogicTime[2]);
      dom.gamelogicPeak.innerHTML = gamelogicTime[3];
    }
  } else if (findingPlayers) {
    findPlayers();
  } else {
    if (!gameEnd) {
      for (var i = 0; i < 4; i++) {
        if (playerType[i] == 0 || playerType[i] == 2) {
          if (currentPlayers[i] != -1) {
            input[i] = interpretInputs(i, false, playerType[i], oldInputBuffers[i]);
          }
        }
      }
    }
  }
  /*
    var beforeWaster = performance.now();
  // neeed to waste 0.666ms
  var timeWasted = false;
  var t = 0;
  var o = performance.now();
  while(!timeWasted){
    var n = performance.now();
    t += n - o;
    //console.log(t);
    if (t > 0.6666){
      timeWasted = true;
    }
    o = n;
    //console.log(".");
  }
  //console.log(performance.now() - beforeWaster);*/

  (0, _replay.saveGameState)(input, ports);

  setTimeout(gameTick, 16, input);
}

function clearScreen() {
  //bg1.fillStyle = "rgb(0, 0, 0)";
  //bg1.fillRect(0,0,layers.BG1.width,layers.BG1.height);
  bg2.clearRect(0, 0, layers.BG2.width, layers.BG2.height);
  //fg1.clearRect(0,0,layers.FG1.width,layers.FG1.height);
  fg2.clearRect(0, 0, layers.FG2.width, layers.FG2.height);
  ui.clearRect(0, 0, layers.UI.width, layers.UI.height);
}

var otherFrame = true;
var fps30 = false;
function renderTick() {
  window.requestAnimationFrame(renderTick);
  otherFrame ^= true;
  if (fps30 && otherFrame || !fps30) {
    //console.log("------");
    if (gameMode == 20) {
      (0, _startup.drawStartUp)();
    } else if (gameMode == 10) {
      (0, _audiomenu.drawAudioMenu)();
    } else if (gameMode == 11) {
      (0, _gameplaymenu.drawGameplayMenu)();
    } else if (gameMode == 12) {
      (0, _keyboardmenu.drawKeyboardMenu)();
    } else if (gameMode == 13) {
      (0, _credits.drawCredits)();
    } else if (gameMode == 14) {
      (0, _controllermenu.drawControllerMenu)();
    } else if (gameMode == 0) {
      (0, _startscreen.drawStartScreen)();
    } else if (gameMode == 1) {
      (0, _menu.drawMainMenu)();
    } else if (gameMode == 2) {
      (0, _css.drawCSS)();
      //renderVfx();
    } else if (gameMode == 6) {
      (0, _stageselect.drawSSS)();
    } else if (gameMode == 7) {
      (0, _targetselect.drawTSS)();
    } else if (gameMode == 4) {
      (0, _targetbuilder.renderTargetBuilder)();
    } else if (gameMode == 5) {
      if (playing || frameByFrameRender) {
        var rStart = performance.now();
        clearScreen();
        if ((0, _vfx.isShowSFX)()) {
          (0, _stagerender.drawBackground)();
        }
        (0, _stagerender.drawStage)();
        (0, _render.renderPlayer)(_targetbuilder.targetBuilder);
        (0, _article.renderArticles)();
        (0, _renderVfx.renderVfx)();
        (0, _render.renderOverlay)(false);

        if (showDebug) {
          var diff = performance.now() - rStart;
          renderTime[0] += diff;
          renderTime[0] /= 2;
          if (diff >= 10) {
            renderTime[3]++;
          }
          if (diff > renderTime[1]) {
            renderTime[1] = diff;
          }
          if (diff < renderTime[2]) {
            renderTime[2] = diff;
          }
          dom.renderAvg.innerHTML = Math.round(renderTime[0]);
          dom.renderHigh.innerHTML = Math.round(renderTime[1]);
          dom.renderLow.innerHTML = Math.round(renderTime[2]);
          dom.renderPeak.innerHTML = renderTime[3];
        }
      } else if (!gameEnd) {
        clearScreen();
        if (!starting) {
          (0, _targetplay.targetTimerTick)();
        }
        if ((0, _vfx.isShowSFX)()) {
          (0, _stagerender.drawBackground)();
        }
        (0, _stagerender.drawStage)();
        (0, _render.renderPlayer)(_targetbuilder.targetBuilder);
        (0, _article.renderArticles)();
        (0, _renderVfx.renderVfx)();
        (0, _render.renderOverlay)(false);
        (0, _render.renderForeground)();
      }
    } else if (playing || frameByFrameRender) {
      /*delta = timestamp - lastFrameTimeMs; // get the delta time since last frame
      lastFrameTimeMs = timestamp;
      console.log(delta);*/
      //console.log("test2");
      var rStart = performance.now();
      clearScreen();
      if ((0, _vfx.isShowSFX)()) {
        (0, _stagerender.drawBackground)();
      }
      (0, _stagerender.drawStage)();
      for (var i = 0; i < 4; i++) {
        if (playerType[i] > -1) {
          (0, _render.renderPlayer)(i);
        }
      }
      (0, _article.renderArticles)();
      (0, _renderVfx.renderVfx)();
      (0, _render.renderOverlay)(true);

      if (showDebug) {
        var diff = performance.now() - rStart;
        renderTime[0] += diff;
        renderTime[0] /= 2;
        if (diff >= 10) {
          renderTime[3]++;
        }
        if (diff > renderTime[1]) {
          renderTime[1] = diff;
        }
        if (diff < renderTime[2]) {
          renderTime[2] = diff;
        }

        dom.renderAvg.innerHTML = Math.round(renderTime[0]);
        dom.renderHigh.innerHTML = Math.round(renderTime[1]);
        dom.renderLow.innerHTML = Math.round(renderTime[2]);
        dom.renderPeak.innerHTML = renderTime[3];
      }
    }
    if (frameByFrameRender) {
      (0, _render.renderForeground)();
    }
    exports.frameByFrameRender = frameByFrameRender = false;
    //renderToMain();
    //console.log(performance.now());
  } else {
    if (playing) {
      (0, _renderVfx.renderVfx)(true);
    }
  }
}

function buildPlayerObject(i) {
  player[i] = new _player.playerObject(characterSelections[i], startingPoint[i], startingFace[i]);
  player[i].phys.ECB1 = [new _Vec2D.Vec2D(startingPoint[i].x, startingPoint[i].y), new _Vec2D.Vec2D(startingPoint[i].x, startingPoint[i].y), new _Vec2D.Vec2D(startingPoint[i].x, startingPoint[i].y), new _Vec2D.Vec2D(startingPoint[i].x, startingPoint[i].y)];
  player[i].phys.ECBp = [new _Vec2D.Vec2D(startingPoint[i].x, startingPoint[i].y), new _Vec2D.Vec2D(startingPoint[i].x, startingPoint[i].y), new _Vec2D.Vec2D(startingPoint[i].x, startingPoint[i].y), new _Vec2D.Vec2D(startingPoint[i].x, startingPoint[i].y)];
  player[i].difficulty = cpuDifficulty[i];
}

function initializePlayers(i, target) {
  buildPlayerObject(i);
  if (target) {
    (0, _drawVfx.drawVfx)({
      name: "entrance",
      pos: new _Vec2D.Vec2D(_activeStage.activeStage.startingPoint[0].x, _activeStage.activeStage.startingPoint[0].y)
    });
  } else {
    (0, _drawVfx.drawVfx)({
      name: "entrance",
      pos: new _Vec2D.Vec2D(startingPoint[i][0], startingPoint[i][1])
    });
  }
}

function startGame() {
  (0, _activeStage.setVsStage)(stageSelect);
  (0, _stagerender.setBackgroundType)(Math.round(Math.random()));
  if (holiday == 1) {
    (0, _stagerender.createSnow)();
  }
  changeGamemode(3);
  (0, _vfxQueue.resetVfxQueue)();
  for (var n = 0; n < 4; n++) {
    if (playerType[n] > -1) {
      initializePlayers(n, false);
      (0, _render.renderPlayer)(n);
      player[n].inCSS = false;
    }
    if (versusMode) {
      player[n].stocks = 1;
    }
  }
  exports.matchTimer = matchTimer = 480;
  exports.startTimer = startTimer = 1.5;
  exports.starting = starting = true;
  _music.MusicManager.stopWhatisPlaying();
  switch (stageSelect) {
    case 0:
      _music.MusicManager.playBattleFieldLoop();
      break;
    case 1:
      _music.MusicManager.playyStoryLoop();
      break;
    case 2:
      _music.MusicManager.playpStadiumLoop();
      break;
    case 3:
      _music.MusicManager.playDreamLandLoop();
      break;
    case 4:
      _music.MusicManager.playfinaldLoop();
      break;
    case 5:
      _music.MusicManager.playfodLoop();
      break;
    default:
      break;
  }
  (0, _drawVfx.drawVfx)({
    name: "start",
    pos: new _Vec2D.Vec2D(0, 0)
  });
  exports.findingPlayers = findingPlayers = false;
  exports.playing = playing = true;
}

function endGame(input) {
  exports.gameEnd = gameEnd = false;
  (0, _render.resetLostStockQueue)();
  (0, _hitDetection.setPhantonQueue)([]);
  (0, _article.resetAArticles)();
  _music.MusicManager.stopWhatisPlaying();
  changeVolume(_music.MusicManager, _audiomenu.masterVolume[1], 1);
  exports.playing = playing = false;
  clearScreen();
  (0, _stagerender.drawStage)();
  (0, _css2.setTokenPosSnapToChar)(0);
  (0, _css2.setTokenPosSnapToChar)(1);
  (0, _css2.setTokenPosSnapToChar)(2);
  (0, _css2.setTokenPosSnapToChar)(3);
  if (gameMode == 3) {
    changeGamemode(2);
    _music.MusicManager.playMenuLoop();
  } else if (gameMode == 5) {
    if (_targetplay.targetTesting) {
      changeGamemode(4);
    } else {
      changeGamemode(7);
    }
  }
  exports.pause = pause = [[true, true], [true, true], [true, true], [true, true]];
  exports.frameAdvance = frameAdvance = [[true, true], [true, true], [true, true], [true, true]];
  exports.findingPlayers = findingPlayers = true;
  positionPlayersInCSS();
  for (var i = 0; i < 4; i++) {
    if (playerType[i] > -1) {
      if (player[i].actionState == "FURAFURA") {
        _sfx.sounds.furaloop.stop(player[i].furaLoopID);
      }
      //input[i][0].a = true; // do
      //input[i][1].a = true; // not
      player[i].inCSS = true;
      player[i].phys.face = 1;
      player[i].actionState = "WAIT";
      player[i].timer = 0;
    }
  }
}

function finishGame(input) {
  setEndTargetGame(false);
  exports.gameEnd = gameEnd = true;
  exports.playing = playing = false;
  fg2.save();
  fg2.textAlign = "center";
  var text = "Game!";
  var size = 300;
  var textScale = 1;
  var textGrad = fg2.createLinearGradient(0, 200, 0, 520);
  if (gameMode == 5 || gameMode == 8) {
    if (_activeStage.activeStage.target.length == _targetplay.targetsDestroyed) {
      if (!_targetplay.targetTesting) {
        if (_targetplay.targetStagePlaying < 10) {
          for (var i = 0; i < 3; i++) {
            if (!_targetplay.medalsEarned[characterSelections[_targetplay.targetPlayer]][_targetplay.targetStagePlaying][i]) {
              if (Math.round(matchTimer * 100) / 100 <= _targetplay.medalTimes[characterSelections[_targetplay.targetPlayer]][_targetplay.targetStagePlaying][i]) {
                _targetplay.medalsEarned[characterSelections[_targetplay.targetPlayer]][_targetplay.targetStagePlaying][i] = true;
              }
            }
          }
        }
        if (matchTimer < _targetplay.targetRecords[characterSelections[_targetplay.targetPlayer]][_targetplay.targetStagePlaying] || _targetplay.targetRecords[characterSelections[_targetplay.targetPlayer]][_targetplay.targetStagePlaying] == -1) {
          _targetplay.targetRecords[characterSelections[_targetplay.targetPlayer]][_targetplay.targetStagePlaying] = matchTimer;
          _sfx.sounds.newRecord.play();
          setCookie(characterSelections[_targetplay.targetPlayer] + "target" + _targetplay.targetStagePlaying, _targetplay.targetRecords[characterSelections[_targetplay.targetPlayer]][_targetplay.targetStagePlaying], 36500);
        } else {
          _sfx.sounds.complete.play();
        }
      } else {
        _sfx.sounds.complete.play();
      }
      text = "Complete!";
      size = 200;
      textScale = 1.5;
      var textGrad = fg2.createLinearGradient(0, 200 / textScale, 0, 520 / textScale);
      textGrad.addColorStop(0, "black");
      textGrad.addColorStop(0.4, "black");
      textGrad.addColorStop(0.8, "rgb(150, 86, 46)");
      textGrad.addColorStop(1, "rgb(205, 108, 45)");
    } else {
      _sfx.sounds.failure.play();
      text = "Failure";
      size = 250;
      textGrad.addColorStop(0, "black");
      textGrad.addColorStop(0.5, "black");
      textGrad.addColorStop(0.7, "rgb(51, 34, 251)");
      textGrad.addColorStop(1, "rgb(107, 71, 250)");
    }
  } else {
    if (matchTimer <= 0) {
      text = "Time!";
      _sfx.sounds.time.play();
      textGrad.addColorStop(0, "black");
      textGrad.addColorStop(0.5, "black");
      textGrad.addColorStop(0.7, "rgb(21, 51, 180)");
      textGrad.addColorStop(1, "rgb(71, 94, 250)");
    } else {
      _sfx.sounds.game.play();
      textGrad.addColorStop(0, "black");
      textGrad.addColorStop(0.4, "black");
      textGrad.addColorStop(0.7, "rgb(167, 27, 40)");
      textGrad.addColorStop(1, "rgb(255, 31, 52)");
    }
  }
  fg2.scale(1, textScale);
  fg2.fillStyle = textGrad;
  fg2.lineWidth = 40;
  fg2.strokeStyle = "black";
  fg2.font = "900 " + size + "px Arial";
  fg2.strokeText(text, 600, 470 / textScale);
  fg2.lineWidth = 20;
  fg2.strokeStyle = "white";
  fg2.font = "900 " + size + "px Arial";
  fg2.strokeText(text, 600, 470 / textScale);
  fg2.font = "900 " + size + "px Arial";
  fg2.fillText(text, 600, 470 / textScale);
  fg2.restore();
  _music.MusicManager.stopWhatisPlaying();
  setTimeout(function () {
    endGame(input);
  }, 2500);
}

function onFullScreenChange() {
  var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

  // if in fullscreen mode fullscreenElement won't be null
  var cont = document.getElementById("topButtonContainer");
  var icn = document.querySelectorAll(".topButton");
  if (fullscreenElement != null) {
    cont.style.transition = "opacity 0.5s linear 0s";
    cont.style.opacity = 0;;
    setTimeout(function () {
      var i;
      for (i = 0; i < icn.length; i++) {
        icn[i].style.height = "5px";
      }
      cont.style.height = "5px";
      resize();
    }, 500);
    (0, _jquery2.default)("#keyboardPrompt").hide();
    (0, _jquery2.default)("#keyboardControlsImg").hide();
    (0, _jquery2.default)("#controllerSupportContainer").hide();
    (0, _jquery2.default)("#debugButtonEdit").empty().append("OFF");
    (0, _jquery2.default)("#debug").hide();
    (0, _jquery2.default)("#players").hide();
    (0, _jquery2.default)("body").css("overflow", "hidden");
    showHeader = false;
  } else {
    var i;
    for (i = 0; i < icn.length; i++) {
      icn[i].style.height = "25px";
    }
    cont.style.height = "31px";
    cont.style.transition = "opacity 0.5s linear 0s";
    cont.style.opacity = 1;
  }
}

function start() {
  if (holiday === 1) {
    (0, _jquery2.default)("#layerButton").after('<div id="snowButton" class="gameButton" style="width:90px"><img src="assets/christmas/snowflake.png" height=17 width=17 style="display:inline-block"/><p style="width:30px;display:inline-block"><span id="snowButtonEdit">150</span></p><div id="snowMinus" class="snowControl" style="display:inline-block;padding:3px"><p style="padding:0;font-size:20px">-</p></div><div id="snowPlus" style="display:inline-block;padding:3px"><p style="padding:0;font-size:17px">+</p></div></div>');
  }
  for (var i = 0; i < 4; i++) {
    buildPlayerObject(i);
    player[i].phys.face = 1;
    player[i].actionState = "WAIT";
  }
  cacheDom();
  (0, _keyboardmenu.getKeyboardCookie)();
  (0, _targetplay.getTargetCookies)();
  (0, _targetplay.giveMedals)();
  (0, _targetselect.getTargetStageCookies)();
  (0, _audiomenu.getAudioCookies)();
  (0, _gameplaymenu.getGameplayCookies)();
  (0, _jquery2.default)("#keyboardButton").click(function () {
    (0, _jquery2.default)("#keyboardControlsImg").toggle();
    (0, _jquery2.default)("#keyboardPrompt").hide();
  });
  (0, _jquery2.default)("#controllerButton").click(function () {
    (0, _jquery2.default)("#controllerSupportContainer").toggle();
  });
  layers.BG1 = document.getElementById("background1Canvas");
  exports.bg1 = bg1 = layers.BG1.getContext("2d");
  layers.BG2 = document.getElementById("background2Canvas");
  exports.bg2 = bg2 = layers.BG2.getContext("2d");
  layers.FG1 = document.getElementById("foreground1Canvas");
  exports.fg1 = fg1 = layers.FG1.getContext("2d");
  layers.FG2 = document.getElementById("foreground2Canvas");
  exports.fg2 = fg2 = layers.FG2.getContext("2d");
  layers.UI = document.getElementById("uiCanvas");
  exports.ui = ui = layers.UI.getContext("2d");
  bg1.fillStyle = "rgb(0, 0, 0)";
  bg1.fillRect(0, 0, layers.BG1.width, layers.BG1.height);
  var nullInputBuffers = [(0, _input.nullInputs)(), (0, _input.nullInputs)(), (0, _input.nullInputs)(), (0, _input.nullInputs)()];
  gameTick(nullInputBuffers);
  renderTick();

  (0, _jquery2.default)("#effectsButton").click(function () {
    if ((0, _vfx.isShowSFX)()) {
      (0, _jquery2.default)("#effectsButtonEdit").empty().append("OFF");
    } else {
      (0, _jquery2.default)("#effectsButtonEdit").empty().append("ON");
    }
    (0, _vfx.toggleShowSFX)();
  });

  (0, _jquery2.default)("#fpsButton").click(function () {
    if (fps30) {
      (0, _jquery2.default)("#fpsButtonEdit").empty().append("60");
    } else {
      (0, _jquery2.default)("#fpsButtonEdit").empty().append("30");
    }
    fps30 ^= true;
  });

  (0, _jquery2.default)("#alphaButton").click(function () {
    if ((0, _transparency.getTransparency)()) {
      (0, _jquery2.default)("#alphaButtonEdit").empty().append("OFF");
    } else {
      (0, _jquery2.default)("#alphaButtonEdit").empty().append("ON");
    }
    (0, _transparency.toggleTransparency)();
  });

  (0, _jquery2.default)("#layerButton").hover(function () {
    (0, _jquery2.default)("#layerDropdown").toggle();
  });

  (0, _jquery2.default)(".layer").click(function () {
    var id = (0, _jquery2.default)(this).attr("id");
    switch (id) {
      case "layer1":
        layerSwitches.BG1 ^= true;
        (0, _jquery2.default)("#background1Canvas").toggle();
        break;
      case "layer2":
        layerSwitches.BG2 ^= true;
        (0, _jquery2.default)("#background2Canvas").toggle();
        break;
      case "layer3":
        layerSwitches.FG1 ^= true;
        (0, _jquery2.default)("#foreground1Canvas").toggle();
        break;
      case "layer4":
        layerSwitches.FG2 ^= true;
        (0, _jquery2.default)("#foreground2Canvas").toggle();
        break;
      case "layer5":
        layerSwitches.UI ^= true;
        (0, _jquery2.default)("#uiCanvas").toggle();
        break;
      default:
        break;
    }
    (0, _jquery2.default)(this).toggleClass("layerOn");
  });

  (0, _jquery2.default)("#debugButton").click(function () {
    if (showDebug) {
      for (var _i = 0; _i < 4; _i++) {
        document.getElementById("gamepadSVG" + _i).style.display = "none";
      }
      (0, _jquery2.default)("#debugButtonEdit").empty().append("OFF");
      (0, _jquery2.default)("#debug").hide();
      (0, _jquery2.default)("#players").hide();
      (0, _jquery2.default)("body").css("overflow", "hidden");
      //var mY = Math.max(($(window).height()-750)/2,0);
      //$("#display").css("margin",mY+"px 0px 0px "+mX+"px");
    } else {
      for (var _i2 = 0; _i2 < 4; _i2++) {
        if (playerType[_i2] !== -1) {
          (0, _drawGamepad.updateGamepadSVGColour)(_i2, "gamepadSVG" + _i2);
          document.getElementById("gamepadSVG" + _i2).style.display = "";
        }
      }
      (0, _jquery2.default)("#debugButtonEdit").empty().append("ON");
      (0, _jquery2.default)("#debug").show();
      (0, _jquery2.default)("#players").show();
      (0, _jquery2.default)("body").css("overflow", "scroll");
      //var mY = Math.max(($(window).height()-900)/2,0);
      //$("#display").css("margin",mY+" 0px 0px px "+mX+"px");
    }
    exports.showDebug = showDebug ^= true;
    resize();
  });

  (0, _jquery2.default)("#hideButton").click(function () {
    (0, _jquery2.default)("#header").toggle();
    showHeader ^= true;
    resize();
  });

  (0, _jquery2.default)("#fullscreenButton").click(function () {
    if (document.fullScreenElement && document.fullScreenElement !== null || !document.mozFullScreen && !document.webkitIsFullScreen) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
    // resize();
  });

  document.addEventListener("fullscreenchange", onFullScreenChange, false);
  document.addEventListener("webkitfullscreenchange", onFullScreenChange, false);
  document.addEventListener("mozfullscreenchange", onFullScreenChange, false);

  (0, _jquery2.default)(".topButton").hover(function () {
    (0, _jquery2.default)(this).children(".buttonDetails").toggle();
  });

  if (mobile === false) {
    (0, _jquery2.default)(".button").hover(function () {
      (0, _jquery2.default)(this).toggleClass("buttonhighlighted");
    });
    (0, _jquery2.default)(".socialmedia").hover(function () {
      (0, _jquery2.default)(this).toggleClass("socialmediahighlight");
    });
    (0, _jquery2.default)(".sugbtn").hover(function () {
      (0, _jquery2.default)(this).toggleClass("sugbtnhighlight");
    });
  }
  (0, _jquery2.default)("#appsButton").hover(function () {
    (0, _jquery2.default)("#appsDropdown").show();
  }, function () {
    (0, _jquery2.default)("#appsDropdown").hide();
  });
  if (holiday === 1) {
    (0, _jquery2.default)("#snowMinus").click(function () {
      exports.snowCount = snowCount -= 20;
      if (snowCount < 0) {
        exports.snowCount = snowCount = 0;
      }
      (0, _jquery2.default)("#snowButtonEdit").text(snowCount);
    });
    (0, _jquery2.default)("#snowPlus").click(function () {
      exports.snowCount = snowCount += 20;
      if (snowCount > 1200) {
        exports.snowCount = snowCount = 1200;
      }
      (0, _jquery2.default)("#snowButtonEdit").text(snowCount);
    });
  }

  (0, _jquery2.default)("#replay").change(function () {

    // grab the first image in the FileList object and pass it to the function
    (0, _replay.loadReplay)(this.files[0]);
  });

  resize();
}
window.start = start;

function customDeadzone() {
  this.ls = new _Vec2D.Vec2D(0, 0);
  this.cs = new _Vec2D.Vec2D(0, 0);
  this.l = 0;
  this.r = 0;
}

function addShine(val) {
  exports.shine = shine += val;
}
function setShine(val) {
  exports.shine = shine = val;
}
function setFindingPlayers(val) {
  exports.findingPlayers = findingPlayers = val;
}
function setPlaying(val) {
  exports.playing = playing = val;
}
function setEndTargetGame(val) {
  exports.endTargetGame = endTargetGame = val;
}
function setCreditsPlayer(val) {
  exports.creditsPlayer = creditsPlayer = val;
}
function setCalibrationPlayer(val) {
  exports.calibrationPlayer = calibrationPlayer = val;
}

var dom = {};

function cacheDom() {
  var elementIds = ["matchMinutes", "matchSeconds", "gamelogicAvg", "gamelogicHigh", "gamelogicLow", "gamelogicPeak", "renderAvg", "renderHigh", "renderLow", "renderPeak"];

  elementIds.forEach(function (id) {
    dom[id] = document.getElementById(id);
  });
};

function setCS(index, val) {
  characterSelections[index] = val;
}

//////////////////
// WEBPACK FOOTER
// ./src/main/main.js
// module id = 11
// module chunks = 1
//# sourceURL=webpack:///./src/main/main.js?