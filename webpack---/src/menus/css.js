"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rtfFlashD = exports.rtfFlash = exports.readyToFight = exports.occupiedCpu = exports.whichCpuGrabbed = exports.cpuGrabbed = exports.cpuSlider = exports.bHold = exports.occupiedToken = exports.whichTokenGrabbed = exports.tokenGrabbed = exports.chosenChar = exports.tokenPos = exports.handPos = exports.handType = exports.choosingTag = exports.handGrab = exports.handOpen = exports.handPoint = exports.falconPic = exports.falcoPic = exports.foxPic = exports.puffPic = exports.marthPic = undefined;
exports.setChoosingTag = setChoosingTag;
exports.setChosenChar = setChosenChar;
exports.setTokenPosSnapToChar = setTokenPosSnapToChar;
exports.setTokenPosValue = setTokenPosValue;
exports.changeCharacter = changeCharacter;
exports.cssControls = cssControls;
exports.drawCSSInit = drawCSSInit;
exports.drawCSS = drawCSS;

var _main = __webpack_require__(11);

var _render = __webpack_require__(13);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _main2 = __webpack_require__(11);

var _characters = __webpack_require__(119);

var _Vec2D = __webpack_require__(22);

var _streamclient = __webpack_require__(48);

var _settings = __webpack_require__(14);

/* eslint-disable */

var marthPic = exports.marthPic = new Image();
marthPic.src = "assets/css/marth.png";
var puffPic = exports.puffPic = new Image();
puffPic.src = "assets/css/puff.png";
var foxPic = exports.foxPic = new Image();
foxPic.src = "assets/css/fox.png";
var falcoPic = exports.falcoPic = new Image();
falcoPic.src = "assets/css/falco.png";
var falconPic = exports.falconPic = new Image();
falconPic.src = "assets/css/falcon.png";
var handPoint = exports.handPoint = new Image();
handPoint.src = "assets/hand/handpoint.png";
var handOpen = exports.handOpen = new Image();
handOpen.src = "assets/hand/handopen.png";
var handGrab = exports.handGrab = new Image();
handGrab.src = "assets/hand/handgrab.png";

var choosingTag = exports.choosingTag = -1;

function setChoosingTag(val) {
  exports.choosingTag = choosingTag = val;
}

var handType = exports.handType = [0, 0, 0, 0];
var handPos = exports.handPos = [new _Vec2D.Vec2D(140, 700), new _Vec2D.Vec2D(365, 700), new _Vec2D.Vec2D(590, 700), new _Vec2D.Vec2D(815, 700)];
var tokenPos = exports.tokenPos = [new _Vec2D.Vec2D(475 - 54, 268), new _Vec2D.Vec2D(515 - 54, 268), new _Vec2D.Vec2D(475 - 54, 308), new _Vec2D.Vec2D(515 - 54, 308)];
var chosenChar = exports.chosenChar = [0, 0, 0, 0];
var tokenGrabbed = exports.tokenGrabbed = [false, false, false, false];
var whichTokenGrabbed = exports.whichTokenGrabbed = [-1, -1, -1, -1];
var occupiedToken = exports.occupiedToken = [false, false, false, false];
var bHold = exports.bHold = [0, 0, 0, 0];

var cpuSlider = exports.cpuSlider = [new _Vec2D.Vec2D(152 + 15 + 166 + 0 - 50, 595), new _Vec2D.Vec2D(152 + 15 + 166 + 225 - 50, 595), new _Vec2D.Vec2D(152 + 15 + 166 + 450 - 50, 595), new _Vec2D.Vec2D(152 + 15 + 166 + 675 - 50, 595)];

var cpuGrabbed = exports.cpuGrabbed = [false, false, false, false];
var whichCpuGrabbed = exports.whichCpuGrabbed = [-1, -1, -1, -1];
var occupiedCpu = exports.occupiedCpu = [false, false, false, false];

var readyToFight = exports.readyToFight = false;

var rtfFlash = exports.rtfFlash = 25;
var rtfFlashD = exports.rtfFlashD = 1;
var gameSettingsText = {
  turbo: "Turbo Mode",
  lCancelType: "L-Cancel Type", // 0- normal | 1 - Auto | 2 - smash 64
  blastzoneWrapping: "",
  flashOnLCancel: "Flash on L-Cancel",
  dustLessPerfectWavedash: "",
  phantomThreshold: "",
  everyCharWallJump: "Everyone Walljumps", //0 - off | 1 - on
  tapJumpOffp1: "Player 1 tap-jump",
  tapJumpOffp2: "Player 2 tap-jump",
  tapJumpOffp3: "Player 3 tap-jump",
  tapJumpOffp4: "Player 4 tap-jump"
};

var gameSettingsValueTranslation = {
  turbo: function turbo(value) {
    return value === 0 ? "OFF" : "ON";
  },
  lCancelType: function lCancelType(value) {
    return value === 0 ? "NORMAL" : value === 1 ? "AUTO" : "SMASH 64";
  }, // 0- normal | 1 - Auto | 2 - smash 64
  blastzoneWrapping: "",
  flashOnLCancel: function flashOnLCancel(value) {
    return value === 0 ? "OFF" : "ON";
  },
  dustLessPerfectWavedash: "",
  phantomThreshold: "",
  everyCharWallJump: function everyCharWallJump(value) {
    return value === 0 ? "OFF" : "ON";
  }, //0 - off | 1 - on
  tapJumpOffp1: function tapJumpOffp1(value) {
    return value === 0 ? "OFF" : "ON";
  },
  tapJumpOffp2: function tapJumpOffp2(value) {
    return value === 0 ? "OFF" : "ON";
  },
  tapJumpOffp3: function tapJumpOffp3(value) {
    return value === 0 ? "OFF" : "ON";
  },
  tapJumpOffp4: function tapJumpOffp4(value) {
    return value === 0 ? "OFF" : "ON";
  }
};
//in order


var charIconPos = [
//marth
new _Vec2D.Vec2D(475, 268),
//puff
new _Vec2D.Vec2D(568, 268),
//fox
new _Vec2D.Vec2D(663, 268),
//falco
new _Vec2D.Vec2D(733, 268),
//falcon
new _Vec2D.Vec2D(803, 268)];

function setChosenChar(index, charSelected) {
  (0, _main2.setCS)(index, charSelected);
  chosenChar[index] = charSelected;
  tokenGrabbed[index] = false;
  occupiedToken[index] = false;
  setTokenPosSnapToChar(index, charSelected);
  _main.player[index].actionState = "WAIT";
  _main.player[index].timer = 0;
  _main.player[index].charAttributes = _characters.chars[_main.characterSelections[index]].attributes;
  _main.player[index].charHitboxes = _characters.chars[_main.characterSelections[index]].hitboxes;
  whichTokenGrabbed[index] = -1;
}

function setTokenPosSnapToChar(index) {
  tokenPos[index] = charIconPos[index];
}

function setTokenPosValue(index, val) {
  if (typeof val === 'undefined') {
    debugger;
  }
  tokenPos[index] = val;
}

function changeCharacter(i, c) {
  (0, _main2.setCS)(i, c);
  (0, _streamclient.syncCharacter)(i, c);
  _main.player[i].actionState = "WAIT";
  _main.player[i].timer = 0;
  _main.player[i].charAttributes = _characters.chars[_main.characterSelections[i]].attributes;
  _main.player[i].charHitboxes = _characters.chars[_main.characterSelections[i]].hitboxes;
}

function cancelSetTag() {
  _sfx.sounds.menuSelect.play();
  _main.tagText[choosingTag] = $("#pTagEdit" + choosingTag).val();
  (0, _streamclient.syncTagText)(choosingTag, _main.tagText[choosingTag]);
  $("#pTagEdit" + choosingTag).hide();
  exports.choosingTag = choosingTag = -1;
}

function cssControls(i, input) {
  var allowRegrab = true;
  var o = 54;
  if (choosingTag == -1) {
    if (input[i][0].b) {
      bHold[i]++;
      if (bHold[i] == 30) {
        _sfx.sounds.menuBack.play();
        (0, _main.changeGamemode)(1);
      }
    } else {
      bHold[i] = 0;
    }
    handPos[i].x += input[i][0].lsX * 12;
    handPos[i].y += -input[i][0].lsY * 12;
    if (handPos[i].x > 1200) {
      handPos[i].x = 1200;
    } else if (handPos[i].x < 0) {
      handPos[i].x = 0;
    }
    if (handPos[i].y > 750) {
      handPos[i].y = 750;
    } else if (handPos[i].y < 0) {
      handPos[i].y = 0;
    }
    if (handPos[i].y < 400 && handPos[i].y > 160) {
      handType[i] = 1;
      if (input[i][0].b && !input[i][1].b && _main.playerType[i] == 0 && whichTokenGrabbed[i] == -1) {
        handType[i] = 2;
        setTokenPosValue(i, new _Vec2D.Vec2D(handPos[i].x, handPos[i].y));
        tokenGrabbed[i] = true;
        whichTokenGrabbed[i] = i;
        occupiedToken[i] = true;
      }
      if (tokenGrabbed[whichTokenGrabbed[i]]) {
        handType[i] = 2;
        setTokenPosValue(whichTokenGrabbed[i], new _Vec2D.Vec2D(handPos[i].x, handPos[i].y));
        if (handPos[i].y > 240 && handPos[i].y < 335) {
          // - 43
          if (handPos[i].x > 452 - o && handPos[i].x < 547 - o) {
            if (chosenChar[whichTokenGrabbed[i]] != 0) {
              chosenChar[whichTokenGrabbed[i]] = 0;
              changeCharacter(whichTokenGrabbed[i], 0);
              _sfx.sounds.menuSelect.play();
            }
            if (input[i][0].a && !input[i][1].a) {
              tokenGrabbed[whichTokenGrabbed[i]] = false;
              occupiedToken[whichTokenGrabbed[i]] = false;
              setTokenPosValue(whichTokenGrabbed[i], new _Vec2D.Vec2D(473 - o + whichTokenGrabbed[i] % 2 * 40, 268 + (whichTokenGrabbed[i] > 1 ? 40 : 0)));
              whichTokenGrabbed[i] = -1;
              _sfx.sounds.marth.play();
            }
          } else if (handPos[i].x > 547 - o && handPos[i].x < 642 - o) {
            if (chosenChar[whichTokenGrabbed[i]] != 1) {
              chosenChar[whichTokenGrabbed[i]] = 1;
              changeCharacter(whichTokenGrabbed[i], 1);
              _sfx.sounds.menuSelect.play();
            }
            if (input[i][0].a && !input[i][1].a) {

              tokenGrabbed[whichTokenGrabbed[i]] = false;
              occupiedToken[whichTokenGrabbed[i]] = false;
              setTokenPosValue(whichTokenGrabbed[i], new _Vec2D.Vec2D(568 - o + whichTokenGrabbed[i] % 2 * 40, 268 + (whichTokenGrabbed[i] > 1 ? 40 : 0)));
              whichTokenGrabbed[i] = -1;
              _sfx.sounds.jigglypuff.play();
            }
          } else if (handPos[i].x > 642 - o && handPos[i].x < 737 - o) {
            if (chosenChar[whichTokenGrabbed[i]] != 2) {
              chosenChar[whichTokenGrabbed[i]] = 2;
              changeCharacter(whichTokenGrabbed[i], 2);
              _sfx.sounds.menuSelect.play();
            }
            if (input[i][0].a && !input[i][1].a) {

              tokenGrabbed[whichTokenGrabbed[i]] = false;
              occupiedToken[whichTokenGrabbed[i]] = false;
              setTokenPosValue(whichTokenGrabbed[i], new _Vec2D.Vec2D(663 - o + whichTokenGrabbed[i] % 2 * 40, 268 + (whichTokenGrabbed[i] > 1 ? 40 : 0)));
              whichTokenGrabbed[i] = -1;
              _sfx.sounds.fox.play();
            }
          } else if (handPos[i].x > 737 - o && handPos[i].x < 832 - o) {
            if (chosenChar[whichTokenGrabbed[i]] != 3) {
              chosenChar[whichTokenGrabbed[i]] = 3;
              changeCharacter(whichTokenGrabbed[i], 3);
              _sfx.sounds.menuSelect.play();
            }
            if (input[i][0].a && !input[i][1].a) {

              tokenGrabbed[whichTokenGrabbed[i]] = false;
              occupiedToken[whichTokenGrabbed[i]] = false;
              setTokenPosValue(whichTokenGrabbed[i], new _Vec2D.Vec2D(758 - o + whichTokenGrabbed[i] % 2 * 40, 268 + (whichTokenGrabbed[i] > 1 ? 40 : 0)));
              whichTokenGrabbed[i] = -1;
              _sfx.sounds.falco.play();
            }
          } else if (handPos[i].x > 832 - o && handPos[i].x < 927 - o) {
            if (chosenChar[whichTokenGrabbed[i]] != 4) {
              chosenChar[whichTokenGrabbed[i]] = 4;
              changeCharacter(whichTokenGrabbed[i], 4);
              _sfx.sounds.menuSelect.play();
            }
            if (input[i][0].a && !input[i][1].a) {

              tokenGrabbed[whichTokenGrabbed[i]] = false;
              occupiedToken[whichTokenGrabbed[i]] = false;
              setTokenPosValue(whichTokenGrabbed[i], new _Vec2D.Vec2D(853 - o + whichTokenGrabbed[i] % 2 * 40, 268 + (whichTokenGrabbed[i] > 1 ? 40 : 0)));
              whichTokenGrabbed[i] = -1;
              _sfx.sounds.falcon.play();
            }
          }
        }
      } else {
        for (var j = 0; j < 4; j++) {
          //console.log(j+" "+occupiedToken[j]);
          if (!occupiedToken[j] && (_main.playerType[j] == 1 || i == j)) {
            if (handPos[i].y > tokenPos[j].y - 20 && handPos[i].y < tokenPos[j].y + 20 && handPos[i].x > tokenPos[j].x - 20 && handPos[i].x < tokenPos[j].x + 20) {
              if (input[i][0].a && !input[i][1].a) {
                handType[i] = 2;
                whichTokenGrabbed[i] = j;
                setTokenPosValue(whichTokenGrabbed[i], new _Vec2D.Vec2D(handPos[i].x, handPos[i].y));
                tokenGrabbed[whichTokenGrabbed[i]] = true;
                occupiedToken[whichTokenGrabbed[i]] = true;
                break;
              }
            }
          }
        }
      }
    } else if (cpuGrabbed[i]) {
      handPos[i].y = cpuSlider[whichCpuGrabbed[i]].y + 15;
      if (handPos[i].x < 152 + 15 + whichCpuGrabbed[i] * 225) {
        handPos[i].x = 152 + 15 + whichCpuGrabbed[i] * 225;
      }
      if (handPos[i].x > 152 + 15 + 166 + whichCpuGrabbed[i] * 225) {
        handPos[i].x = 152 + 15 + 166 + whichCpuGrabbed[i] * 225;
      }
      cpuSlider[whichCpuGrabbed[i]].x = handPos[i].x;
      _main.cpuDifficulty[whichCpuGrabbed[i]] = Math.round((cpuSlider[whichCpuGrabbed[i]].x - whichCpuGrabbed[i] * 225 - 152 - 15) * 3 / 166) + 1;
      _main.player[whichCpuGrabbed[i]].difficulty = _main.cpuDifficulty[whichCpuGrabbed[i]];
      if (input[i][0].a && !input[i][1].a) {
        cpuGrabbed[i] = false;
        occupiedCpu[whichCpuGrabbed[i]] = false;
        whichCpuGrabbed[i] = -1;
        handType[i] = 0;
        allowRegrab = false;
      }
    } else {
      handType[i] = 0;

      setTokenPosValue(whichTokenGrabbed[i], new _Vec2D.Vec2D(518 + whichTokenGrabbed[i] % 2 * 40 + chosenChar[whichTokenGrabbed[i]] * 93, 268 + (whichTokenGrabbed[i] > 1 ? 40 : 0)));

      //tokenPos[i] = new Vec2D(518+(i%2)*40,268+(i>1?40:0));
      //tokenGrabbed[i] = false;
      if (whichTokenGrabbed[i] > -1 && tokenGrabbed[whichTokenGrabbed[i]] == true) {
        tokenGrabbed[whichTokenGrabbed[i]] = false;
        occupiedToken[whichTokenGrabbed[i]] = false;
      }
      whichTokenGrabbed[i] = -1;
      for (var j = 0; j < 4; j++) {
        if (handPos[i].y > 430 && handPos[i].y < 485 && handPos[i].x > 109 + j * 225 && handPos[i].x < 207 + j * 225) {
          if (input[i][0].a && !input[i][1].a) {
            _sfx.sounds.menuSelect.play();
            (0, _main.togglePort)(j);
            _main.hasTag[j] = false;
          }
        }
      }
    }
    if (handPos[i].y < 160 && handPos[i].x > 920) {
      if (input[i][0].a && !input[i][1].a) {
        _sfx.sounds.menuBack.play();
        (0, _main.changeGamemode)(1);
      }
    }

    var tok = void 0;
    if (input[i][0].x && !input[i][1].x) {
      _sfx.sounds.menuSelect.play();
      if (whichTokenGrabbed[i] != -1) {
        tok = whichTokenGrabbed[i];
      } else {
        tok = i;
      }
      _main.pPal[tok]++;
      if (_main.pPal[tok] > 6) {
        _main.pPal[tok] = 0;
      }
    }
    if (input[i][0].y && !input[i][1].y) {
      _sfx.sounds.menuSelect.play();
      if (whichTokenGrabbed[i] != -1) {
        tok = whichTokenGrabbed[i];
      } else {
        tok = i;
      }
      _main.pPal[tok]--;
      if (_main.pPal[tok] < 0) {
        _main.pPal[tok] = 6;
      }
    }
    if (handPos[i].y > 100 && handPos[i].y < 160 && handPos[i].x > 380 && handPos[i].x < 910) {
      if (input[i][0].a && !input[i][1].a) {
        _sfx.sounds.menuSelect.play();
        (0, _main.setVersusMode)(1 - _main.versusMode);
      }
    }
    if (!cpuGrabbed[i]) {
      for (var s = 0; s < 4; s++) {
        if (_main.playerType[s] == 1) {
          if (!occupiedCpu[s]) {
            if (handPos[i].y >= cpuSlider[s].y - 25 && handPos[i].y <= cpuSlider[s].y + 25 && handPos[i].x >= cpuSlider[s].x - 25 && handPos[i].x <= cpuSlider[s].x + 25) {
              if (input[i][0].a && !input[i][1].a && allowRegrab) {
                cpuGrabbed[i] = true;
                whichCpuGrabbed[i] = s;
                occupiedCpu[s] = true;
                handType[i] = 2;
                break;
              }
            }
          }
        }
      }
    }

    if (handPos[i].y > 640 && handPos[i].y < 680 && handPos[i].x > 130 + i * 225 && handPos[i].x < 310 + i * 225) {
      if (_main2.gameMode !== 2) {
        cancelSetTag();
      }
      if (input[i][0].a && !input[i][1].a) {
        // do tag
        if (handPos[i].x < 154 + i * 225) {
          // random
          _sfx.sounds.menuSelect.play();
          _main.hasTag[i] = true;
          _main.tagText[i] = _main.randomTags[Math.round((_main.randomTags.length - 1) * Math.random())];
          (0, _streamclient.syncTagText)(i, _main.tagText[i]);
        } else if (handPos[i].x > 286 + i * 225) {
          // remove
          _sfx.sounds.menuSelect.play();
          _main.hasTag[i] = false;
        } else {
          // set
          _sfx.sounds.menuSelect.play();
          _main.hasTag[i] = true;
          exports.choosingTag = choosingTag = i;
          _main.ui.fillStyle = "rgba(0,0,0,0.8)";
          _main.ui.fillRect(0, 0, _main.layers.UI.width, _main.layers.UI.height);
          $("#pTagEdit" + i).show().select();
        }
      }
    }
  } else if (choosingTag == i && (input[i][0].a && !input[i][1].a || _main.keys[13])) {
    cancelSetTag();
  }
  if (readyToFight && choosingTag == -1) {
    if (_main.pause[i][0] && !_main.pause[i][1]) {
      _sfx.sounds.menuForward.play();
      (0, _main.changeGamemode)(6);
      (0, _streamclient.syncGameMode)(6);
    }
  } else if (choosingTag == -1 && input[i][0].du && !input[i][1].du) {
    _sfx.sounds.menuForward.play();
    (0, _main.changeGamemode)(6);
    (0, _streamclient.syncGameMode)(6);
  } else if (choosingTag == -1 && input[i][0].dr && !input[i][1].dr) {
    chosenChar[i] = 3;
    changeCharacter(i, 3);
    _sfx.sounds.menuSelect.play();
  }
}

function drawCSSInit() {
  var bgGrad = _main.bg1.createLinearGradient(0, 0, 1200, 700);
  bgGrad.addColorStop(0, "rgb(17, 12, 56)");
  bgGrad.addColorStop(1, "black");
  _main.bg1.fillStyle = bgGrad;
  _main.bg1.fillRect(0, 0, _main.layers.BG1.width, _main.layers.BG1.height);
  _main.bg1.fillStyle = "rgb(85, 96, 107)";
  _main.bg1.strokeStyle = "rgb(144, 152, 161)";
  _main.bg1.save();
  _main.bg1.lineWidth = 2;
  _main.bg1.strokeStyle = "rgb(120, 127, 161)";
  _main.bg1.beginPath();
  _main.bg1.moveTo(-10, 200);
  _main.bg1.lineTo(290, 200);
  _main.bg1.arc(290, 225, 25, Math.PI * 1.5, Math.PI * 0.5);
  _main.bg1.lineTo(-10, 250);
  _main.bg1.closePath();
  _main.bg1.stroke();
  _main.bg1.fillStyle = "rgb(29, 144, 61)";
  _main.bg1.beginPath();
  _main.bg1.arc(145, 225, 20, 0, _render.twoPi);
  _main.bg1.closePath();
  _main.bg1.fill();
  _main.bg1.font = "900 31px Arial";
  _main.bg1.fillStyle = "rgb(120, 127, 161)";
  _main.bg1.fillText("Push     to join", 37, 235);
  _main.bg1.fillStyle = "rgb(17, 71, 32)";
  _main.bg1.fillText("A", 133, 235);
  _main.bg1.restore();
  _main.bg1.save();
  _main.bg1.lineWidth = 3;
  _main.bg1.translate(_main.layers.BG1.width / 2, _main.layers.BG1.height / 2 + 20);
  for (var i = 0; i < 2; i++) {
    _main.bg1.rotate(i * Math.PI);
    _main.bg1.beginPath();
    _main.bg1.moveTo(-10 - _main.layers.BG1.width / 2, -250);
    _main.bg1.lineTo(-300, -250);
    _main.bg1.bezierCurveTo(-240, -250, -240, -330, -180, -330);
    _main.bg1.lineTo(10 + _main.layers.BG1.width / 2, -330);
    _main.bg1.lineTo(10 + _main.layers.BG1.width / 2, -30 - _main.layers.BG1.height / 2);
    _main.bg1.lineTo(-10 - _main.layers.BG1.width / 2, -30 - _main.layers.BG1.height / 2);
    _main.bg1.closePath();
    _main.bg1.fill();
    _main.bg1.stroke();
  }
  _main.bg1.restore();
  _main.bg1.lineWidth = 3;
  _main.bg1.beginPath();
  _main.bg1.moveTo(410, 80);
  _main.bg1.lineTo(950, 80);
  _main.bg1.lineTo(955, 105);
  _main.bg1.lineTo(946, 130);
  _main.bg1.lineTo(406, 130);
  _main.bg1.lineTo(400, 105);
  _main.bg1.closePath();
  _main.bg1.stroke();
  _main.bg1.lineWidth = 5;
  _main.bg1.beginPath();
  _main.bg1.moveTo(412, 81);
  _main.bg1.lineTo(422, 81);
  _main.bg1.lineTo(412, 105);
  _main.bg1.lineTo(418, 129);
  _main.bg1.lineTo(408, 129);
  _main.bg1.lineTo(402, 105);
  _main.bg1.closePath();
  _main.bg1.fill();
  _main.bg1.stroke();
  _main.bg1.beginPath();
  _main.bg1.moveTo(938, 81);
  _main.bg1.lineTo(948, 81);
  _main.bg1.lineTo(953, 105);
  _main.bg1.lineTo(944, 129);
  _main.bg1.lineTo(934, 129);
  _main.bg1.lineTo(943, 105);
  _main.bg1.closePath();
  _main.bg1.fill();
  _main.bg1.stroke();
  _main.bg1.lineWidth = 3;
  _main.bg1.fillStyle = "black";
  _main.bg1.font = "italic 900 50px Arial";
  _main.bg1.save();
  _main.bg1.scale(1, 1.9);
  _main.bg1.fillText("MELEE", 50, 65);
  _main.bg1.restore();
  _main.bg1.beginPath();
  _main.bg1.arc(305, 85, 30, 0, _render.twoPi);
  _main.bg1.closePath();
  _main.bg1.fill();
  _main.bg1.stroke();
  _main.bg1.fillStyle = "rgb(144, 152, 161)";
  _main.bg1.font = "700 32px Arial";
  _main.bg1.fillText("VS", 284, 98);
  _main.bg1.fillStyle = "rgb(219, 219, 219)";
  _main.bg1.fillStyle = "rgba(0,0,0,0.65)";
  _main.bg1.beginPath();
  _main.bg1.moveTo(1100, 0);
  _main.bg1.lineTo(1000, 110);
  _main.bg1.lineTo(1020, 125);
  _main.bg1.lineTo(1200, 125);
  _main.bg1.lineTo(1200, 0);
  _main.bg1.closePath();
  _main.bg1.fill();
  _main.bg1.fillStyle = "rgb(255, 222, 0)";
  _main.bg1.beginPath();
  _main.bg1.moveTo(1100, 0);
  _main.bg1.lineTo(1000, 110);
  _main.bg1.lineTo(1020, 125);
  _main.bg1.lineTo(1200, 125);
  _main.bg1.lineTo(1200, 119);
  _main.bg1.lineTo(1015, 119);
  _main.bg1.lineTo(1002, 110);
  _main.bg1.lineTo(1102, 0);
  _main.bg1.closePath();
  _main.bg1.fill();
  _main.bg1.font = "700 27px Arial";
  _main.bg1.fillText("BACK", 1035, 112);
  _main.bg1.fillStyle = "rgb(194, 24, 8)";
  _main.bg1.beginPath();
  _main.bg1.moveTo(1025, 75);
  _main.bg1.lineTo(992, 110);
  _main.bg1.lineTo(1010, 125);
  _main.bg1.lineTo(972, 110);
  _main.bg1.closePath();
  _main.bg1.fill();
  var bgGrad = _main.bg1.createLinearGradient(0, 250, 0, 350);
  bgGrad.addColorStop(0, "rgb(41, 47, 68)");
  bgGrad.addColorStop(1, "rgb(85, 95, 128)");
  _main.bg1.lineWidth = 2;
  var o = 54;
  for (var j = 0; j < 5; j++) {
    _main.bg1.fillStyle = bgGrad;
    _main.bg1.beginPath();
    _main.bg1.moveTo(457 - o + j * 95, 265);
    _main.bg1.bezierCurveTo(457 - o + j * 95, 245, 457 - o + j * 95, 245, 477 - o + j * 95, 245);
    _main.bg1.lineTo(522 - o + j * 95, 245);
    _main.bg1.bezierCurveTo(542 - o + j * 95, 245, 542 - o + j * 95, 245, 542 - o + j * 95, 265);
    _main.bg1.lineTo(542 - o + j * 95, 310);
    _main.bg1.bezierCurveTo(542 - o + j * 95, 330, 542 - o + j * 95, 330, 522 - o + j * 95, 330);
    _main.bg1.lineTo(477 - o + j * 95, 330);
    _main.bg1.bezierCurveTo(457 - o + j * 95, 330, 457 - o + j * 95, 330, 457 - o + j * 95, 310);
    _main.bg1.closePath();
    _main.bg1.fill();
    _main.bg1.stroke();
    switch (j) {
      case 0:
        var add = 0;
        break;
      case 1:
        var add = 7;
        break;
      case 2:
        var add = 0;
        break;
      default:
        var add = 0;
        break;
    }
    _main.bg1.fillStyle = "black";
    _main.bg1.beginPath();
    _main.bg1.moveTo(540 - o + j * 95, 305 - add);
    _main.bg1.lineTo(540 - o + j * 95, 310 - add);
    _main.bg1.bezierCurveTo(540 - o + j * 95, 328, 540 - o + j * 95, 328, 522 - o + j * 95, 328);
    _main.bg1.lineTo(487 - o + j * 95, 328);
    _main.bg1.bezierCurveTo(459 - o + j * 95, 328, 459 - o + j * 95, 328, 459 - o + j * 95, 310 - add);
    _main.bg1.lineTo(459 - o + j * 95, 305 - add);
    _main.bg1.closePath();
    _main.bg1.fill();
    _main.bg1.fillStyle = "rgb(180, 180, 180)";
    _main.bg1.font = "700 18px Arial";
    switch (j) {
      case 0:
        _main.bg1.fillText("MARTH", 467 - o + j * 95, 323);
        _main.bg1.drawImage(marthPic, 459 - o + j * 95, 247, 81, 58);
        break;
      case 1:
        _main.bg1.fillText("JIGGLY-", 464 - o + j * 95, 313);
        _main.bg1.fillText("PUFF", 477 - o + j * 95, 326);
        _main.bg1.drawImage(puffPic, 459 - o + j * 95, 247, 81, 51);
        break;
      case 2:
        _main.bg1.fillText("  F O X ", 467 - o + j * 95, 323);
        _main.bg1.drawImage(foxPic, 459 - o + j * 95, 247, 81, 58);
        break;
      case 3:
        _main.bg1.fillText("FALCO", 470 - o + j * 95, 323);
        _main.bg1.drawImage(falcoPic, 459 - o + j * 95, 247, 81, 58);
        break;
      case 4:
        _main.bg1.font = "700 15px Arial";
        _main.bg1.fillText("C.FALCON", 462 - o + j * 95, 323);
        _main.bg1.drawImage(falconPic, 459 - o + j * 95, 247, 81, 58);
        _main.bg1.font = "700 18px Arial";
        break;
      default:
        break;
    }
  }
  _main.bg1.fillStyle = "rgb(49, 52, 56)";
  for (var i = 0; i < 4; i++) {
    _main.bg1.fillRect(145 + i * 225, 430, 210, 280);
    _main.bg1.strokeRect(145 + i * 225, 430, 210, 280);
  }
  _main.bg1.fillStyle = "rgb(55, 58, 62)";
  _main.bg1.strokeStyle = "rgb(72, 77, 85)";
  for (var i = 0; i < 4; i++) {
    _main.bg1.fillRect(158 + i * 225, 440, 184, 260);
    _main.bg1.strokeRect(158 + i * 225, 440, 184, 260);
  }
  _main.bg1.fillStyle = "rgba(255,255,255,0.1)";
  for (var i = 0; i < 4; i++) {
    _main.bg1.fillRect(158 + i * 225, 630, 184, 50);
  }
  _main.bg1.strokeStyle = "rgba(0,0,0,0.2)";
  _main.bg1.fillStyle = "rgba(0,0,0,0.2)";
  _main.bg1.lineWidth = 15;
  for (var i = 0; i < 4; i++) {
    _main.bg1.beginPath();
    _main.bg1.moveTo(150 + i * 225, 435);
    _main.bg1.lineTo(350 + i * 225, 705);
    _main.bg1.closePath();
    _main.bg1.stroke();
    _main.bg1.beginPath();
    _main.bg1.arc(250 + i * 225, 570, 60, 0, _render.twoPi);
    _main.bg1.closePath();
    _main.bg1.stroke();
    _main.bg1.beginPath();
    _main.bg1.moveTo(150 + i * 225, 570);
    _main.bg1.lineTo(350 + i * 225, 570);
    _main.bg1.closePath();
    _main.bg1.stroke();
  }
  _main.bg1.lineWidth = 3;
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 7; j++) {
      _main.bg1.beginPath();
      _main.bg1.arc(165 + i * 225 + j * 30, 450, 11, 0, _render.twoPi);
      _main.bg1.closePath();
      _main.bg1.fill();
      _main.bg1.beginPath();
      _main.bg1.arc(165 + i * 225 + j * 30, 690, 10, 0, _render.twoPi);
      _main.bg1.closePath();
      _main.bg1.stroke();
      if (j == 3) {
        _main.bg1.fill();
      }
    }
  }
}

function drawCSS() {
  (0, _main.clearScreen)();
  _main.ui.fillStyle = "rgb(219, 219, 219)";
  _main.ui.save();
  _main.ui.scale(1.25, 1);
  if (_main.versusMode) {
    _main.ui.fillText("An endless KO fest!", 393, 117);
  } else {
    _main.ui.fillText("4-man survival test!", 390, 117);
  }
  var bestHold = 0;
  _main.bg1.lineWidth = 3;
  _main.bg1.fillStyle = "rgb(255, 222, 0)";
  _main.bg1.beginPath();
  _main.bg1.moveTo(1100, 0);
  _main.bg1.lineTo(1000, 110);
  _main.bg1.lineTo(1020, 125);
  _main.bg1.lineTo(1200, 125);
  _main.bg1.lineTo(1200, 119);
  _main.bg1.lineTo(1015, 119);
  _main.bg1.lineTo(1002, 110);
  _main.bg1.lineTo(1102, 0);
  _main.bg1.closePath();
  _main.bg1.fill();
  for (var ia = 0; ia < 4; ia++) {
    if (bHold[ia] > bestHold) {
      bestHold = bHold[ia];
    }
  }
  if (bestHold > 0) {
    var abb = 1020 + bestHold * 6;
    _main.bg1.fillStyle = "rgb(194, 24, 8)";
    _main.bg1.beginPath();
    _main.bg1.moveTo(1020, 125);
    _main.bg1.lineTo(abb, 125);
    _main.bg1.lineTo(abb, 119);
    _main.bg1.lineTo(1015, 119);
    _main.bg1.closePath();
    _main.bg1.fill();
  }
  _main.ui.restore();
  for (var i = 0; i < 4; i++) {
    if (_main.playerType[i] > -1) {
      if (_main.playerType[i] == 0 || _main.playerType[i] == 2) {
        switch (i) {
          case 0:
            _main.ui.fillStyle = "rgb(218, 51, 51)";
            break;
          case 1:
            _main.ui.fillStyle = "rgb(51, 53, 218)";
            break;
          case 2:
            _main.ui.fillStyle = "rgb(226, 218, 34)";
            break;
          case 3:
            _main.ui.fillStyle = "rgb(44, 217, 29)";
            break;
          default:
            break;
        }
      } else {
        _main.ui.fillStyle = "rgb(91, 91, 91)";
      }
      _main.ui.fillRect(147 + i * 225, 432, 206, 276);
      _main.ui.fillStyle = "rgba(0,0,0,0.5)";
      _main.ui.beginPath();
      _main.ui.moveTo(152 + i * 225, 465);
      _main.ui.lineTo(210 + i * 225, 465);
      _main.ui.lineTo(230 + i * 225, 450);
      _main.ui.lineTo(318 + i * 225, 450);
      _main.ui.bezierCurveTo(338 + i * 225, 450, 338 + i * 225, 450, 338 + i * 225, 470);
      _main.ui.lineTo(338 + i * 225, 708);
      _main.ui.lineTo(152 + i * 225, 708);
      _main.ui.closePath();
      _main.ui.fill();
      _main.ui.save();
      _main.ui.fillStyle = "rgba(0, 0, 0, 0.3)";
      _main.ui.translate(250 + i * 225, 615);
      _main.ui.scale(1, 0.3);
      _main.ui.beginPath();
      _main.ui.arc(0, 0, 50, 0, _render.twoPi);
      _main.ui.closePath();
      _main.ui.fill();
      _main.ui.restore();
      _main.ui.fillStyle = "black";
      _main.ui.strokeStyle = "rgb(102, 102, 102)";
      _main.ui.fillRect(152 + i * 225, 640, 196, 60);
      _main.ui.strokeRect(152 + i * 225, 640, 196, 60);
      _main.ui.save();
      _main.ui.fillStyle = "rgb(84, 84, 84)";
      _main.ui.font = "italic 900 45px Arial";
      _main.ui.scale(14 / 8, 1);
      var text = "P" + (i + 1);
      if (_main.playerType[i] == 1) {
        text = "CP";
      }
      _main.ui.fillText(text, 87 + i * 225 / (14 / 8), 690);
      _main.ui.restore();

      _main.ui.textAlign = "start";
    }
  }
  _main.ui.fillStyle = "rgb(82, 81, 81)";
  for (var i = 0; i < 4; i++) {
    _main.ui.fillStyle = "rgb(82, 81, 81)";
    switch (_main.playerType[i]) {
      case 0:
        _main.ui.fillStyle = "rgb(201, 178, 20)";
        break;
      case 1:
        _main.ui.fillStyle = "rgb(161, 161, 161)";
        break;
      default:
        _main.ui.fillStyle = "rgb(82, 81, 81)";
        break;
    }
    _main.ui.beginPath();
    _main.ui.moveTo(139 + i * 225, 420);
    _main.ui.lineTo(220 + i * 225, 420);
    _main.ui.lineTo(237 + i * 225, 432);
    _main.ui.lineTo(215 + i * 225, 455);
    _main.ui.lineTo(142 + i * 225, 455);
    _main.ui.lineTo(139 + i * 225, 452);
    _main.ui.closePath();
    _main.ui.fill();
  }
  _main.ui.fillStyle = "rgba(0, 0, 0,0.7)";
  _main.ui.strokeStyle = "rgba(0, 0, 0,0.7)";
  _main.ui.lineWidth = 4;
  for (var i = 0; i < 4; i++) {
    _main.ui.beginPath();
    _main.ui.moveTo(160 + i * 225, 424);
    _main.ui.lineTo(215 + i * 225, 424);
    _main.ui.lineTo(228 + i * 225, 432);
    _main.ui.lineTo(210 + i * 225, 451);
    _main.ui.lineTo(160 + i * 225, 451);
    _main.ui.closePath();
    _main.ui.fill();
    _main.ui.beginPath();
    _main.ui.moveTo(139 + i * 225, 420);
    _main.ui.lineTo(151 + i * 225, 424);
    _main.ui.lineTo(151 + i * 225, 451);
    _main.ui.lineTo(140 + i * 225, 451);
    _main.ui.stroke();
  }
  _main.ui.fillStyle = "rgb(82, 81, 81)";
  _main.ui.font = "700 22px Arial";
  for (var i = 0; i < 4; i++) {
    _main.ui.fillStyle = "rgb(82, 81, 81)";
    var text = "N/A";
    switch (_main.playerType[i]) {
      case 0:
        text = "HMN";
        _main.ui.fillStyle = "rgb(201, 178, 20)";
        break;
      case 1:
        text = "CPU";
        _main.ui.fillStyle = "rgb(161, 161, 161)";
        break;
      case 2:
        text = "NET";
        _main.ui.fillStyle = "rgb(66, 241, 244)";
        break;
      default:
        break;
    }

    _main.ui.fillText(text, 163 + i * 225, 445);
  }
  for (var i = 0; i < 4; i++) {
    if (_main.playerType[i] > -1) {
      var frame = Math.floor(_main.player[i].timer);
      if (frame == 0) {
        frame = 1;
      }
      var face = _main.player[i].phys.face;

      var model = animations[_main.characterSelections[i]][_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].name][frame - 1];

      switch (_main.player[i].actionState) {
        case 15:
        case 17:
        case 20:
        case 25:
        case 61:
        case 72:
        case 94:
          var model = animations[_main.characterSelections[i]][_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].name][0];
          break;
        default:
          break;
      }
      if (_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].reverseModel) {
        face *= -1;
      } else if (_main.player[i].actionState == 4) {
        if (frame > 5) {
          face *= -1;
        }
      } else if (_main.player[i].actionState == 6) {
        if (frame > 18) {
          face *= -1;
        }
      } else if (_main.player[i].actionState == 34) {
        if (frame > 29) {
          face *= -1;
        }
      }

      var col = _main.palettes[_main.pPal[i]][0];
      if (tokenGrabbed[i]) {
        _main.ui.globalAlpha = 0.6;
      } else {
        _main.ui.globalAlpha = 1;
      }
      (0, _render.drawArrayPathCompress)(_main.ui, col, face, _main.player[i].phys.pos.x * 4.5 * 1.5 + 600, _main.player[i].phys.pos.y * -4.5 + 480, model, _main.player[i].charAttributes.charScale * 1.5, _main.player[i].charAttributes.charScale * 1.5, 0, 0, 0);
      if (_main.player[i].phys.shielding) {
        var sCol = _main.palettes[_main.pPal[i]][2];
        _main.ui.fillStyle = sCol + 0.6 * _main.player[i].phys.shieldAnalog + ")";
        _main.ui.beginPath();
        _main.ui.arc(_main.player[i].phys.shieldPositionReal.x * 4.5 * 1.5 + 600, _main.player[i].phys.shieldPositionReal.y * -4.5 + 460, _main.player[i].phys.shieldSize * 4.5 * 1.5, _render.twoPi, 0);
        _main.ui.fill();
      }
      _main.ui.globalAlpha = 1;
      if (_main.playerType[i] == 1) {
        _main.ui.fillStyle = "rgba(0,0,0,0.5)";
        _main.ui.strokeStyle = "rgb(102, 102, 102)";
        _main.ui.fillRect(152 + i * 225, 555, 196, 85);
        _main.ui.strokeRect(152 + i * 225, 555, 196, 85);
        _main.ui.fillStyle = "rgb(177, 177, 177)";
        _main.ui.save();
        _main.ui.font = "900 18px Arial";
        _main.ui.scale(1.2, 1);
        _main.ui.fillText("CPU Level", (152 + 10 + i * 225) / 1.2, 575);
        _main.ui.restore();
        var sliderGrad = _main.ui.createLinearGradient(152 + 10 + i * 225, 0, 152 + 196 - 20 + i * 225, 0);
        sliderGrad.addColorStop(0, "rgb(0, 47, 168)");
        sliderGrad.addColorStop(0.5, "rgb(168, 162, 0)");
        sliderGrad.addColorStop(1, "rgb(168, 0, 0)");
        _main.ui.fillStyle = sliderGrad;
        _main.ui.fillRect(152 + 15 + i * 225, 592, 166, 5);
        _main.ui.fillStyle = "black";
        _main.ui.fillRect(152 + 18 + i * 225, 594, 160, 1);
        _main.ui.fillStyle = "rgb(214, 35, 35)";
        _main.ui.beginPath();
        _main.ui.arc(cpuSlider[i].x, cpuSlider[i].y, 17, 0, _render.twoPi);
        _main.ui.closePath();
        _main.ui.fill();
        _main.ui.save();
        _main.ui.fillStyle = "black";
        _main.ui.strokeStyle = "white";
        _main.ui.lineWidth = 2;
        _main.ui.font = "900 30px Arial";
        _main.ui.textAlign = "center";
        _main.ui.strokeText(_main.player[i].difficulty, cpuSlider[i].x, cpuSlider[i].y + 11);
        _main.ui.fillText(_main.player[i].difficulty, cpuSlider[i].x, cpuSlider[i].y + 11);
        _main.ui.restore();
      }
      _main.ui.fillStyle = "black";
      _main.ui.strokeStyle = "rgb(102, 102, 102)";
      _main.ui.fillRect(160 + i * 225, 620, 180, 40);
      _main.ui.strokeRect(160 + i * 225, 620, 180, 40);
      _main.ui.font = "900 24px Arial";
      if (_main.playerType[i] == 0) {
        _main.ui.fillStyle = "rgb(42, 42, 42)";
        _main.ui.fillRect(162 + i * 225, 622, 22, 37);
        _main.ui.fillRect(316 + i * 225, 622, 22, 37);
        _main.ui.fillStyle = "rgb(83, 83, 83)";
        _main.ui.fillText("?", 166 + i * 225, 648);
        _main.ui.fillText("x", 319 + i * 225, 647);
      }
      _main.ui.font = "500 28px Arial";
      _main.ui.fillStyle = "white";
      switch (chosenChar[i]) {
        case 0:
          var text = "Marth";
          break;
        case 1:
          var text = "Jigglypuff";
          break;
        case 2:
          var text = "Fox";
          break;
        case 3:
          var text = "Falco";
          break;
        case 4:
          var text = "C.Falcon";
          break;
        default:
          var text = "Unknown";
          break;
      }
      if (_main.hasTag[i]) {
        var text = _main.tagText[i];
      }
      _main.ui.textAlign = "center";
      _main.ui.fillText(text, 250 + i * 225, 650);
      _main.ui.textAlign = "start";
    }
  }
  _main.ui.font = "900 31px Arial";
  _main.ui.lineWidth = 2;
  var alreadyDrawn = [false, false, false, false];
  for (var _i = 3; _i >= 0; _i--) {
    if (_main.playerType[_i] > -1) {
      if (tokenGrabbed[_i] === false) {
        alreadyDrawn[_i] = true;
      }
      var bgGrad = _main.ui.createLinearGradient(tokenPos[_i].x - 100, tokenPos[_i].y, tokenPos[_i].x + 50, tokenPos[_i].y);
      bgGrad.addColorStop(0, "rgb(255, 255, 255)");
      var text = "";
      switch (_main.playerType[_i]) {
        case 0:
          text = "P" + (_i + 1);
          switch (_i) {
            case 0:
              bgGrad.addColorStop(1, "rgb(233, 57, 57)");
              break;
            case 1:
              bgGrad.addColorStop(1, "rgb(62, 130, 233)");
              break;
            case 2:
              bgGrad.addColorStop(1, "rgb(255, 253, 47)");
              break;
            case 3:
              bgGrad.addColorStop(1, "rgb(36, 242, 45)");
              break;
            default:
              break;
          }
          break;
        case 1:
          text = "CP";
          bgGrad.addColorStop(1, "rgb(135, 135, 135)");
        default:
          break;
      }
      _main.ui.fillStyle = "rgba(0,0,0,0.4)";
      _main.ui.beginPath();
      _main.ui.arc(tokenPos[_i].x, tokenPos[_i].y, 34, 0, _render.twoPi);
      _main.ui.closePath();
      _main.ui.fill();
      _main.ui.fillStyle = bgGrad;
      _main.ui.beginPath();
      _main.ui.arc(tokenPos[_i].x, tokenPos[_i].y, 30, 0, _render.twoPi);
      _main.ui.closePath();
      _main.ui.fill();
      _main.ui.fillStyle = "rgba(0,0,0,0.4)";
      _main.ui.beginPath(tokenPos[_i].y);
      //ui.moveTo(tokenPos[i].x,tokenPos[i].y+4);
      _main.ui.arc(tokenPos[_i].x, tokenPos[_i].y, 26, 1.2 * Math.PI, 0.4 * Math.PI);
      _main.ui.arc(tokenPos[_i].x - 3, tokenPos[_i].y, 23, 0.5 * Math.PI, 1.2 * Math.PI, true);
      _main.ui.closePath();
      _main.ui.fill();
      _main.ui.strokeStyle = "rgb(57, 57, 57)";
      _main.ui.fillStyle = "rgb(207, 207, 207)";

      _main.ui.fillText(text, tokenPos[_i].x - 22, tokenPos[_i].y + 13);
      _main.ui.strokeText(text, tokenPos[_i].x - 22, tokenPos[_i].y + 13);
    }
  }
  for (var _i2 = 3; _i2 >= 0; _i2--) {
    if (alreadyDrawn[_i2] === false) {
      if (_main.playerType[_i2] > -1) {
        var bgGrad = _main.ui.createLinearGradient(tokenPos[_i2].x - 100, tokenPos[_i2].y, tokenPos[_i2].x + 50, tokenPos[_i2].y);
        bgGrad.addColorStop(0, "rgb(255, 255, 255)");
        var text = "";
        switch (_main.playerType[_i2]) {
          case 0:
            text = "P" + (_i2 + 1);
            switch (_i2) {
              case 0:
                bgGrad.addColorStop(1, "rgb(233, 57, 57)");
                break;
              case 1:
                bgGrad.addColorStop(1, "rgb(62, 130, 233)");
                break;
              case 2:
                bgGrad.addColorStop(1, "rgb(255, 253, 47)");
                break;
              case 3:
                bgGrad.addColorStop(1, "rgb(36, 242, 45)");
                break;
              default:
                break;
            }
            break;
          case 1:
            text = "CP";
            bgGrad.addColorStop(1, "rgb(135, 135, 135)");
          default:
            break;
        }
        _main.ui.fillStyle = "rgba(0,0,0,0.4)";
        _main.ui.beginPath();
        _main.ui.arc(tokenPos[_i2].x, tokenPos[_i2].y, 34, 0, _render.twoPi);
        _main.ui.closePath();
        _main.ui.fill();
        _main.ui.fillStyle = bgGrad;
        _main.ui.beginPath();
        _main.ui.arc(tokenPos[_i2].x, tokenPos[_i2].y, 30, 0, _render.twoPi);
        _main.ui.closePath();
        _main.ui.fill();
        _main.ui.fillStyle = "rgba(0,0,0,0.4)";
        _main.ui.beginPath(tokenPos[_i2].y);
        //ui.moveTo(tokenPos[i].x,tokenPos[i].y+4);
        _main.ui.arc(tokenPos[_i2].x, tokenPos[_i2].y, 26, 1.2 * Math.PI, 0.4 * Math.PI);
        _main.ui.arc(tokenPos[_i2].x - 3, tokenPos[_i2].y, 23, 0.5 * Math.PI, 1.2 * Math.PI, true);
        _main.ui.closePath();
        _main.ui.fill();
        _main.ui.strokeStyle = "rgb(57, 57, 57)";
        _main.ui.fillStyle = "rgb(207, 207, 207)";

        _main.ui.fillText(text, tokenPos[_i2].x - 22, tokenPos[_i2].y + 13);
        _main.ui.strokeText(text, tokenPos[_i2].x - 22, tokenPos[_i2].y + 13);
      }
    }
  }
  // 72 95
  for (var i = 0; i < _main.ports; i++) {

    switch (handType[i]) {
      case 0:
        _main.ui.drawImage(handPoint, handPos[i].x - 40, handPos[i].y - 30, 101, 133);
        break;
      case 1:
        _main.ui.drawImage(handOpen, handPos[i].x - 40, handPos[i].y - 30, 101, 133);
        break;
      case 2:
        _main.ui.drawImage(handGrab, handPos[i].x - 40, handPos[i].y - 30, 101, 133);
        break;
      default:
        break;
    }
    switch (i) {
      case 0:
        _main.ui.fillStyle = "rgb(233, 57, 57)";
        break;
      case 1:
        _main.ui.fillStyle = "rgb(62, 130, 233)";
        break;
      case 2:
        _main.ui.fillStyle = "rgb(255, 253, 47)";
        break;
      case 3:
        _main.ui.fillStyle = "rgb(36, 242, 45)";
        break;
      default:
        break;
    }
    _main.ui.fillText("P" + (i + 1), handPos[i].x - 15, handPos[i].y + 60);
    _main.ui.strokeText("P" + (i + 1), handPos[i].x - 15, handPos[i].y + 60);
  }
  var readyPlayers = 0;
  for (var k = 0; k < 4; k++) {
    if (_main.playerType[k] > -1) {
      readyPlayers++;
      if (readyPlayers >= 2) {
        exports.readyToFight = readyToFight = true;
      } else {
        exports.readyToFight = readyToFight = false;
      }
      if (occupiedToken[k]) {
        exports.readyToFight = readyToFight = false;
        break;
      }
    }
  }

  if (_streamclient.inServerMode) {
    _main.ui.fillStyle = "white";

    var keys = Object.keys(_settings.gameSettings);
    var spacer = 50;
    for (var j = 0; j < keys.length; j++) {
      if (gameSettingsText[keys[j]] !== "") {
        _main.ui.fillText(gameSettingsText[keys[j]] + ":" + gameSettingsValueTranslation[keys[j]](_settings.gameSettings[keys[j]]), 820, 130 + spacer);
        spacer = spacer + 30;
      }
    }
  }

  if (readyToFight) {
    _main.ui.save();
    _main.ui.fillStyle = "rgba(223, 31, 31, 0.8)";
    _main.ui.beginPath();
    _main.ui.moveTo(50, 300);
    _main.ui.bezierCurveTo(450, 270, 750, 270, 1150, 300);
    _main.ui.bezierCurveTo(750, 280, 450, 280, 50, 300);
    _main.ui.closePath();
    _main.ui.fill();
    _main.ui.beginPath();
    _main.ui.moveTo(50, 370);
    _main.ui.bezierCurveTo(450, 350, 750, 350, 1150, 370);
    //ui.bezierCurveTo(750,360,450,360,50,370);
    _main.ui.bezierCurveTo(750, 360, 900, 365, 900, 365);
    _main.ui.bezierCurveTo(850, 365, 830, 380, 800, 380);
    _main.ui.lineTo(400, 380);
    _main.ui.bezierCurveTo(370, 380, 350, 365, 300, 365);
    _main.ui.bezierCurveTo(300, 360, 450, 370, 0, 370);
    _main.ui.closePath();
    _main.ui.fill();
    _main.ui.fillStyle = "rgba(0,0,0,0.5)";
    _main.ui.beginPath();
    _main.ui.moveTo(50, 300);
    _main.ui.bezierCurveTo(450, 280, 750, 280, 1150, 300);
    _main.ui.arc(1150, 335, 35, Math.PI * 1.5, Math.PI * 0.5, true);
    //ui.lineTo(1150,370);
    _main.ui.bezierCurveTo(750, 350, 450, 350, 50, 370);
    _main.ui.arc(50, 335, 35, Math.PI * 0.5, Math.PI * 1.5, true);
    _main.ui.closePath();
    _main.ui.fill();
    _main.ui.scale(1.4, 1);
    exports.rtfFlash = rtfFlash += 0.5 * rtfFlashD;
    if (rtfFlash < 25) {
      exports.rtfFlashD = rtfFlashD = 1;
    }
    if (rtfFlash > 50) {
      exports.rtfFlashD = rtfFlashD = -1;
    }
    _main.ui.fillStyle = "hsl(52, 85%, " + rtfFlash + "%)";
    _main.ui.font = "italic 600 65px Arial";
    _main.ui.rotate(-0.03);
    _main.ui.fillText("READY", 120, 353);
    _main.ui.rotate(0.03);
    _main.ui.fillText("TO", 390, 342);
    _main.ui.rotate(0.03);
    _main.ui.fillText("FIGHT", 520, 329);
    _main.ui.rotate(-0.03);
    _main.ui.fillStyle = "rgb(193, 193, 193)";
    _main.ui.font = "900 15px Arial";
    _main.ui.scale(2.3 / 1.4, 1);
    _main.ui.fillText("PRESS START", 205, 373);
    _main.ui.restore();
  }

  if (choosingTag > -1) {
    _main.ui.fillStyle = "rgba(0,0,0,0.8)";
    _main.ui.fillRect(0, 0, _main.layers.UI.width, _main.layers.UI.height);
    _main.ui.fillStyle = "white";
    _main.ui.textAlign = "center";
    //ui.fillText(text,250+i*225,650);
    _main.ui.fillText("Type tag now", 250 + choosingTag * 225, 570);
    _main.ui.fillText("Press A to finish", 250 + choosingTag * 225, 600);
    _main.ui.textAlign = "start";
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/menus/css.js
// module id = 12
// module chunks = 1
//# sourceURL=webpack:///./src/menus/css.js?