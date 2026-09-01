"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.targetPointerPos = exports.promptTimer = exports.promptType = exports.targetSelectTimer = exports.targetSelected = undefined;
exports.setTargetPointerPos = setTargetPointerPos;
exports.tssControls = tssControls;
exports.redrawCustomStageBoxes = redrawCustomStageBoxes;
exports.drawTSSInit = drawTSSInit;
exports.drawTSS = drawTSS;
exports.getTargetStageCookies = getTargetStageCookies;

var _main = __webpack_require__(11);

var _targetplay = __webpack_require__(125);

var _targetbuilder = __webpack_require__(126);

var _sfx = __webpack_require__(120);

var _render = __webpack_require__(13);

var _css = __webpack_require__(12);

var _activeStage = __webpack_require__(18);

var _deepCopy = __webpack_require__(85);

var _Box2D = __webpack_require__(21);

var _Vec2D = __webpack_require__(22);

var _getConnected = __webpack_require__(129);

var _stage = __webpack_require__(242);

var _activeStage2 = __webpack_require__(18);

var _encode = __webpack_require__(130);

var _music = __webpack_require__(121);

/* eslint-disable */
var text = void 0;
var targetSelected = exports.targetSelected = 0;
var targetSelectTimer = exports.targetSelectTimer = 0;
var promptType = exports.promptType = 0;
var promptTimer = exports.promptTimer = 0;
var targetPointerPos = exports.targetPointerPos = [600, 635];
function setTargetPointerPos(val) {
  exports.targetPointerPos = targetPointerPos = val;
}
var cXSize = 1200;
var cYSize = 750;

var stopShowingCode = false;
function clickFunction() {
  stopShowingCode = true;
}

function tssControls(i, input) {
  if (!_targetbuilder.showingCode) {
    targetPointerPos[0] += input[i][0].lsX * 15;
    targetPointerPos[1] += input[i][0].lsY * -15;
    if (targetPointerPos[1] >= 45 && targetPointerPos[1] <= 420) {
      for (var _j = 0; _j < Math.min(20, 11 + _activeStage.customTargetStages.length); _j++) {
        if (targetPointerPos[0] >= 50 + Math.floor(_j / 5) * 260 + Math.floor(_j / 10) * 65 && targetPointerPos[0] <= 300 + Math.floor(_j / 5) * 260 + Math.floor(_j / 10) * 65 && targetPointerPos[1] >= 110 + _j % 5 * 60 && targetPointerPos[1] <= 160 + _j % 5 * 60) {
          if (targetSelected != _j) {
            _sfx.sounds.menuSelect.play();
          }
          exports.targetSelected = targetSelected = _j;
          break;
        }
      }
    }
    if (input[i][0].du && !input[i][1].du || input[i][0].l && !input[i][1].l) {
      var cSelected = _main.characterSelections[i];
      (0, _main.setCS)(i, cSelected - 1);
      if (_main.characterSelections[i] < 0) {
        (0, _main.setCS)(i, 4);
      }
      _sfx.sounds.menuSelect.play();
    } else if (input[i][0].dd && !input[i][1].dd || input[i][0].r && !input[i][1].r) {
      var elseSelected = _main.characterSelections[i];
      (0, _main.setCS)(i, elseSelected + 1);
      if (_main.characterSelections[i] > 4) {
        (0, _main.setCS)(i, 0);
      }
      _sfx.sounds.menuSelect.play();
    }
    if (input[i][0].b && !input[i][1].b) {
      _sfx.sounds.menuBack.play();
      _music.MusicManager.stopWhatisPlaying();
      _music.MusicManager.playMenuLoop();
      (0, _main.changeGamemode)(1);
      return;
    } else {
      if (targetSelected > 9 && targetSelected != 10 + _activeStage.customTargetStages.length) {
        if (input[i][0].z && !input[i][1].z) {
          //delete
          for (var n = targetSelected - 10; n < _activeStage.customTargetStages.length; n++) {
            (0, _main.setCookie)("custom" + n, (0, _main.getCookie)("custom" + (n + 1)), 36500);
          }
          (0, _main.setCookie)("custom" + _activeStage.customTargetStages.length, null, 36500);

          for (var j = 0; j < 4; j++) {
            _targetplay.targetRecords[j].splice(targetSelected, 1);
            _targetplay.targetRecords[j].push(-1);
            for (var k = targetSelected; k < 10 + _activeStage.customTargetStages.length; k++) {
              (0, _main.setCookie)(j + "target" + k, (0, _main.getCookie)(j + "target" + (k + 1)), 36500);
            }
            (0, _main.setCookie)(j + "target" + (10 + _activeStage.customTargetStages.length), null, 36500);
          }

          _activeStage.customTargetStages.splice(targetSelected - 10, 1);
          redrawCustomStageBoxes();
          return;
        } else if (input[i][0].x && !input[i][1].x) {
          //dupe
          if (_activeStage.customTargetStages.length < 10) {
            (0, _main.setCookie)("custom" + _activeStage.customTargetStages.length, (0, _main.getCookie)("custom" + (targetSelected - 10)), 36500);
            _activeStage.customTargetStages.push({});
            _activeStage.customTargetStages[_activeStage.customTargetStages.length - 1] = (0, _deepCopy.deepCopyObject)(true, _activeStage.customTargetStages[targetSelected - 10]);
            (0, _activeStage.setCustomTargetStages)(_activeStage.customTargetStages.length - 1, _activeStage.customTargetStages[_activeStage.customTargetStages.length - 1]);
          } else {
            exports.promptTimer = promptTimer = 60;
            exports.promptType = promptType = 1;
          }
          redrawCustomStageBoxes();
          return;
        } else if (input[i][0].y && !input[i][1].y) {
          //edit
          (0, _targetbuilder.resetStageTemp)();
          (0, _targetbuilder.setStageTemp)((0, _deepCopy.deepCopyObject)(true, _activeStage.customTargetStages[targetSelected - 10]));
          (0, _targetbuilder.setTargetBuilder)(i);
          (0, _targetbuilder.setEditingStage)(targetSelected - 10);
          //input[i][i].a[1] = true;
          (0, _main.changeGamemode)(4);
          _music.MusicManager.stopWhatisPlaying();
          _music.MusicManager.playMenuLoop();
          return;
        }
      }
      if (input[i][0].s && !input[i][1].s || input[i][0].a && !input[i][1].a) {
        _sfx.sounds.menuForward.play();
        if (targetSelected == 10 + _activeStage.customTargetStages.length) {
          // ADD CODE
          (0, _targetbuilder.setShowingCode)(true);
          document.getElementById('aButton').addEventListener('click', clickFunction);
          $("#customStageContainer").show();
          $("#cStageEdit").select().val("");
          $("#cStageTitleEdit").empty().append("Paste in your code");
          $("#cStageInfoEdit").empty();
        } else {
          if (targetSelected > 9) {
            (0, _activeStage2.setActiveStageCustomTarget)(targetSelected - 10);
          } else {
            (0, _activeStage.setActiveStageTarget)(targetSelected);
          }
          (0, _targetplay.setTargetStagePlaying)(targetSelected);
          (0, _targetplay.startTargetGame)(i, false);
        }
      }
    }
  } else {
    if (stopShowingCode || input[i][0].a && !input[i][1].a) {
      stopShowingCode = false;
      document.getElementById('aButton').removeEventListener('click', clickFunction);
      (0, _targetbuilder.setShowingCode)(false);
      var code = $("#cStageEdit").val();
      var newStage = (0, _encode.parseStageCode)(code);
      if (newStage === null) {
        // invalid code
        exports.promptTimer = promptTimer = 60;
        exports.promptType = promptType = 0;
      } else {
        (0, _main.setCookie)("custom" + _activeStage.customTargetStages.length, code, 36500);
        _activeStage.customTargetStages[_activeStage.customTargetStages.length - 1] = (0, _deepCopy.deepCopyObject)(true, newStage);
        (0, _activeStage.setCustomTargetStages)(_activeStage.customTargetStages.length, _activeStage.customTargetStages[_activeStage.customTargetStages.length - 1]);
        redrawCustomStageBoxes();
      }
      $("#customStageContainer").hide();
      _sfx.sounds.menuForward.play();
    }
  }
}

function redrawCustomStageBoxes() {
  _main.fg1.clearRect(50 + 260 + 260 + 65 - 5, 110 - 5, 530, 320);
  _main.fg1.fillStyle = "black";
  for (var i = 10; i < Math.min(11 + _activeStage.customTargetStages.length, 20); i++) {
    _main.fg1.fillRect(50 + Math.floor(i / 5) * 260 + Math.floor(i / 10) * 65, 110 + i % 5 * 60, 250, 50);
  }
}

function drawTSSInit() {
  var bgGrad = _main.bg1.createLinearGradient(0, 0, 1200, 750);
  bgGrad.addColorStop(0, "rgb(66, 42, 6)");
  bgGrad.addColorStop(1, "rgb(26, 2, 2)");
  _main.bg1.fillStyle = bgGrad;
  _main.bg1.fillRect(0, 0, _main.layers.BG1.width, _main.layers.BG1.height);
  _main.fg1.lineWidth = 4;
  _main.fg1.fillStyle = "rgba(255,255,255,0.7)";
  _main.fg1.textAlign = "start";
  _main.fg1.font = "800 35px Arial";
  _main.fg1.fillText("Select Target Stage", 50, 85);
  _main.fg1.fillText("Custom Stages", 640, 85);
  _main.fg1.fillStyle = "black";
  for (var i = 0; i < Math.min(11 + _activeStage.customTargetStages.length, 20); i++) {
    _main.fg1.fillRect(50 + Math.floor(i / 5) * 260 + Math.floor(i / 10) * 65, 110 + i % 5 * 60, 250, 50);
  }
  _main.fg1.font = "700 25px Arial";
  _main.fg1.fillStyle = "rgba(255,255,255,0.6)";
  for (var _i = 0; _i < 10; _i++) {
    _main.fg1.fillText("Target " + (_i + 1), 60 + Math.floor(_i / 5) * 260, 143 + _i % 5 * 60);
  }
  _main.fg1.strokeStyle = "rgba(255, 255, 255, 0.5)";
  _main.fg1.fillStyle = "rgba(0, 0, 0, 0.5)";
  _main.fg1.fillRect(200, 450, 800, 200);
  _main.fg1.strokeRect(200, 450, 800, 200);
  _main.fg1.strokeStyle = "rgb(157, 157, 157)";
  _main.fg1.lineWidth = 2;
  bgGrad = _main.fg1.createLinearGradient(0, 250, 0, 350);
  bgGrad.addColorStop(0, "rgb(41, 47, 68)");
  bgGrad.addColorStop(1, "rgb(85, 95, 128)");
  _main.fg1.lineWidth = 2;
  _main.fg1.fillStyle = bgGrad;
  _main.fg1.beginPath();
  _main.fg1.moveTo(100, 530);
  _main.fg1.bezierCurveTo(100, 510, 100, 510, 120, 510);
  _main.fg1.lineTo(165, 510);
  _main.fg1.bezierCurveTo(185, 510, 185, 510, 185, 530);
  _main.fg1.lineTo(185, 575);
  _main.fg1.bezierCurveTo(185, 595, 185, 595, 165, 595);
  _main.fg1.lineTo(120, 595);
  _main.fg1.bezierCurveTo(100, 595, 100, 595, 100, 575);
  _main.fg1.closePath();
  _main.fg1.fill();
  _main.fg1.stroke();
  _main.fg1.fillStyle = "rgb(180, 180, 180)";
  _main.fg1.beginPath();
  _main.fg1.moveTo(143, 480);
  _main.fg1.lineTo(168, 500);
  _main.fg1.lineTo(118, 500);
  _main.fg1.closePath();
  _main.fg1.fill();
  _main.fg1.stroke();
  _main.fg1.beginPath();
  _main.fg1.moveTo(143, 625);
  _main.fg1.lineTo(168, 605);
  _main.fg1.lineTo(118, 605);
  _main.fg1.closePath();
  _main.fg1.fill();
  _main.fg1.stroke();
}

function drawTSS() {
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
  _main.ui.textAlign = "start";
  _main.ui.lineWidth = 3;
  _main.ui.fillStyle = "black";
  exports.targetSelectTimer = targetSelectTimer += 1;
  // swap 3 for Math.max(10+customTargetStages.length+1,20)
  for (var _i2 = 0; _i2 < Math.min(11 + _activeStage.customTargetStages.length, 20); _i2++) {
    if (targetSelected == _i2) {
      if (targetSelectTimer % 8 > 4) {
        _main.ui.strokeStyle = "rgb(251, 116, 155)";
      } else {
        _main.ui.strokeStyle = "rgb(255, 182, 204)";
      }
    } else {
      _main.ui.strokeStyle = "rgb(166, 166, 166)";
    }
    if (_i2 > 10) {
      _main.ui.fillRect(50 + Math.floor(_i2 / 5) * 260 + Math.floor(_i2 / 10) * 65, 110 + _i2 % 5 * 60, 250, 50);
    }
    _main.ui.strokeRect(50 + Math.floor(_i2 / 5) * 260 + Math.floor(_i2 / 10) * 65, 110 + _i2 % 5 * 60, 250, 50);
  }
  _main.ui.font = "700 25px Arial";
  _main.ui.fillStyle = "rgba(255,255,255,0.6)";
  for (var _i3 = 0; _i3 < Math.min(_activeStage.customTargetStages.length + 1, 10); _i3++) {
    if (_i3 == _activeStage.customTargetStages.length) {
      //ui.textAlign = "center";
      _main.ui.fillText("+ Add Code", 645 + Math.floor(_i3 / 5) * 260, 143 + _i3 % 5 * 60);
    } else {
      _main.ui.fillText("Custom " + (_i3 + 1), 645 + Math.floor(_i3 / 5) * 260, 143 + _i3 % 5 * 60);
    }
  }
  _main.ui.save();
  _main.ui.setLineDash([5, 5]);
  _main.ui.strokeStyle = "rgb(157, 157, 157)";
  _main.ui.lineWidth = 2;
  for (var _i4 = 0; _i4 < 10; _i4++) {
    // if beaten dev record draw star
    if (_targetplay.targetRecords[_main.characterSelections[_targetplay.targetPlayer]][_i4] != -1 && Math.round(_targetplay.targetRecords[_main.characterSelections[_targetplay.targetPlayer]][_i4] * 100) / 100 <= _targetplay.devRecords[_main.characterSelections[_targetplay.targetPlayer]][_i4]) {
      var x = 190 + Math.floor(_i4 / 5) * 260;
      var y = 135 + _i4 % 5 * 60;
      _main.ui.fillStyle = "white";
      _main.ui.beginPath();
      _main.ui.moveTo(x, y - 9);
      _main.ui.lineTo(x + 3, y - 3.3);
      _main.ui.lineTo(x + 9, y - 2.1);
      _main.ui.lineTo(x + 4.8, y + 2.7);
      _main.ui.lineTo(x + 5.7, y + 9);
      _main.ui.lineTo(x, y + 6.1);
      _main.ui.lineTo(x - 5.7, y + 9);
      _main.ui.lineTo(x - 4.8, y + 2.7);
      _main.ui.lineTo(x - 9, y - 2.1);
      _main.ui.lineTo(x - 3, y - 3.3);
      _main.ui.closePath();
      _main.ui.fill();
    }
    _main.ui.beginPath();
    _main.ui.arc(220 + Math.floor(_i4 / 5) * 260, 135 + _i4 % 5 * 60, 10, 0, _render.twoPi);
    _main.ui.closePath();

    if (_targetplay.medalsEarned[_main.characterSelections[_targetplay.targetPlayer]][_i4][0]) {
      var medalGrad = _main.ui.createLinearGradient(210 + Math.floor(_i4 / 5) * 260, 125 + _i4 % 5 * 60, 230 + Math.floor(_i4 / 5) * 260, 145 + _i4 % 5 * 60);
      medalGrad.addColorStop(0, "rgb(180, 123, 65)");
      medalGrad.addColorStop(1, "rgb(236, 179, 120)");
      _main.ui.fillStyle = medalGrad;
      _main.ui.fill();
    } else {
      _main.ui.stroke();
    }
    _main.ui.beginPath();
    _main.ui.arc(250 + Math.floor(_i4 / 5) * 260, 135 + _i4 % 5 * 60, 10, 0, _render.twoPi);
    _main.ui.closePath();
    if (_targetplay.medalsEarned[_main.characterSelections[_targetplay.targetPlayer]][_i4][1]) {
      var _medalGrad = _main.ui.createLinearGradient(240 + Math.floor(_i4 / 5) * 260, 125 + _i4 % 5 * 60, 260 + Math.floor(_i4 / 5) * 260, 145 + _i4 % 5 * 60);
      _medalGrad.addColorStop(0, "rgb(161, 161, 161)");
      _medalGrad.addColorStop(1, "rgb(246, 246, 246)");
      _main.ui.fillStyle = _medalGrad;
      _main.ui.fill();
    } else {
      _main.ui.stroke();
    }
    _main.ui.beginPath();
    _main.ui.arc(280 + Math.floor(_i4 / 5) * 260, 135 + _i4 % 5 * 60, 10, 0, _render.twoPi);
    _main.ui.closePath();
    if (_targetplay.medalsEarned[_main.characterSelections[_targetplay.targetPlayer]][_i4][2]) {
      var _medalGrad2 = _main.ui.createLinearGradient(270 + Math.floor(_i4 / 5) * 260, 125 + _i4 % 5 * 60, 290 + Math.floor(_i4 / 5) * 260, 145 + _i4 % 5 * 60);
      _medalGrad2.addColorStop(0, "rgb(255, 221, 42)");
      _medalGrad2.addColorStop(1, "rgb(255, 237, 140)");
      _main.ui.fillStyle = _medalGrad2;
      _main.ui.fill();
    } else {
      _main.ui.stroke();
    }
  }
  _main.ui.restore();
  if (targetSelected < 10) {
    var _medalGrad3 = _main.ui.createLinearGradient(270, 470, 330, 530);
    _medalGrad3.addColorStop(0, "rgb(180, 123, 65)");
    _medalGrad3.addColorStop(1, "rgb(236, 179, 120)");
    _main.ui.fillStyle = _medalGrad3;
    _main.ui.beginPath();
    _main.ui.arc(300, 500, 30, 0, _render.twoPi);
    _main.ui.closePath();
    _main.ui.fill();
    _medalGrad3 = _main.ui.createLinearGradient(510, 470, 570, 530);
    _medalGrad3.addColorStop(0, "rgb(161, 161, 161)");
    _medalGrad3.addColorStop(1, "rgb(246, 246, 246)");
    _main.ui.fillStyle = _medalGrad3;
    _main.ui.beginPath();
    _main.ui.arc(540, 500, 30, 0, _render.twoPi);
    _main.ui.closePath();
    _main.ui.fill();
    _medalGrad3 = _main.ui.createLinearGradient(750, 470, 810, 530);
    _medalGrad3.addColorStop(0, "rgb(255, 221, 42)");
    _medalGrad3.addColorStop(1, "rgb(255, 237, 140)");
    _main.ui.fillStyle = _medalGrad3;
    _main.ui.beginPath();
    _main.ui.arc(780, 500, 30, 0, _render.twoPi);
    _main.ui.closePath();
    _main.ui.fill();
    _main.ui.fillStyle = "rgba(255,255,255,0.7)";
    _main.ui.font = "700 30px Arial";
    for (var _i5 = 0; _i5 < 3; _i5++) {
      var _text2 = "0" + Math.floor(_targetplay.medalTimes[_main.characterSelections[_targetplay.targetPlayer]][targetSelected][_i5] / 60) + ":";
      var _sec = (_targetplay.medalTimes[_main.characterSelections[_targetplay.targetPlayer]][targetSelected][_i5] % 60).toFixed(2);
      _text2 += _sec.length < 5 ? "0" + _sec : _sec;
      _main.ui.fillText(_text2, 345 + _i5 * 240, 513);
    }
    _main.ui.font = "italic 900 20px Arial";
    _main.ui.fillText("Developer Record", 340, 625);
    _main.ui.font = "700 20px Arial";
    _main.ui.textAlign = "center";
    var _text = "0" + Math.floor(_targetplay.devRecords[_main.characterSelections[_targetplay.targetPlayer]][targetSelected] / 60) + ":";
    var sec = (_targetplay.devRecords[_main.characterSelections[_targetplay.targetPlayer]][targetSelected] % 60).toFixed(2);
    _text += sec.length < 5 ? "0" + sec : sec;
    _main.ui.fillText(_text, 750, 625);
  }
  _main.ui.fillStyle = "rgba(255,255,255,0.7)";
  _main.ui.textAlign = "start";
  _main.ui.font = "italic 900 38px Arial";
  if (targetSelected == 10 + _activeStage.customTargetStages.length) {
    _main.ui.fillText("Add custom stage", 400, 560);
  } else {
    _main.ui.fillText("Personal Best", 250, 585 - (targetSelected > 9 ? 45 : 0));
    _main.ui.font = "700 38px Arial";
    _main.ui.textAlign = "center";
    if (_targetplay.targetRecords[_main.characterSelections[_targetplay.targetPlayer]][targetSelected] == -1) {
      text = "--:--:--";
    } else {
      text = "0" + Math.floor(_targetplay.targetRecords[_main.characterSelections[_targetplay.targetPlayer]][targetSelected] / 60) + ":";
      var _sec2 = (_targetplay.targetRecords[_main.characterSelections[_targetplay.targetPlayer]][targetSelected] % 60).toFixed(2);
      text += _sec2.length < 5 ? "0" + _sec2 : _sec2;
    }
    _main.ui.fillText(text, 750, 585 - (targetSelected > 9 ? 45 : 0));
    _main.ui.font = "900 35px Arial";
    if (targetSelected > 9 && targetSelected != _activeStage.customTargetStages.length - 1) {
      _main.ui.fillText("Play", 260, 610);
      _main.ui.fillText("Edit", 460, 610);
      _main.ui.fillText("Dupe", 660, 610);
      _main.ui.fillText("Delete", 860, 610);
      _main.ui.fillStyle = "rgb(84, 187, 58)";
      _main.ui.beginPath();
      _main.ui.arc(335, 600, 25, 0, _render.twoPi);
      _main.ui.closePath();
      _main.ui.fill();
      _main.ui.save();
      _main.ui.lineCap = "round";
      _main.ui.lineWidth = 27;
      _main.ui.strokeStyle = "rgb(79, 57, 185)";
      _main.ui.beginPath();
      _main.ui.moveTo(941, 600);
      _main.ui.lineTo(971, 600);
      _main.ui.stroke();
      _main.ui.closePath();
      _main.ui.strokeStyle = "rgb(116, 116, 116)";
      _main.ui.beginPath();
      _main.ui.arc(548, 629, 40, Math.PI * 1.3, Math.PI * 1.55);
      _main.ui.stroke();
      _main.ui.closePath();
      _main.ui.beginPath();
      _main.ui.arc(700, 602, 40, Math.PI * 1.8, Math.PI * 0.05);
      _main.ui.stroke();
      _main.ui.closePath();
      _main.ui.fillStyle = "rgba(0, 0, 0,0.6)";
      _main.ui.font = "900 35px Arial";
      _main.ui.fillText("A", 335, 611);
      _main.ui.font = "900 26px Arial";
      _main.ui.fillText("Y", 538, 601);
      _main.ui.fillText("X", 738, 604);
      _main.ui.fillText("Z", 956, 610);
      _main.ui.save();
    }
  }
  var add = 0;
  switch (_main.characterSelections[_targetplay.targetPlayer]) {
    case 0:
      add = 0;
      break;
    case 1:
      add = 7;
      break;
    case 2:
      add = 0;
      break;
    case 3:
      add = 0;
      break;
    default:
      add = 0;
      break;
  }
  _main.ui.fillStyle = "black";
  _main.ui.beginPath();
  _main.ui.moveTo(183, 570 - add);
  _main.ui.lineTo(183, 575 - add);
  _main.ui.bezierCurveTo(183, 593, 183, 593, 165, 593);
  _main.ui.lineTo(120, 593);
  _main.ui.bezierCurveTo(102, 593, 102, 593, 102, 575 - add);
  _main.ui.lineTo(102, 570 - add);
  _main.ui.closePath();
  _main.ui.fill();
  _main.ui.fillStyle = "rgb(180, 180, 180)";
  _main.ui.font = "700 18px Arial";
  _main.ui.textAlign = "left";
  switch (_main.characterSelections[_targetplay.targetPlayer]) {
    case 0:
      _main.ui.fillText("MARTH", 110, 588);
      _main.ui.drawImage(_css.marthPic, 102, 512, 81, 58);
      break;
    case 1:
      _main.ui.fillText("JIGGLY-", 107, 578);
      _main.ui.fillText("PUFF", 120, 591);
      _main.ui.drawImage(_css.puffPic, 102, 512, 81, 51);
      break;
    case 2:
      _main.ui.fillText("  F O X ", 110, 588);
      _main.ui.drawImage(_css.foxPic, 102, 512, 81, 58);
      break;
    case 3:
      _main.ui.fillText("FALCO", 113, 588);
      _main.ui.drawImage(_css.falcoPic, 102, 512, 81, 58);
      break;
    case 4:
      _main.ui.font = "700 15px Arial";
      _main.ui.fillText("C.FALCON", 105, 588);
      _main.ui.drawImage(_css.falconPic, 102, 512, 81, 58);
      _main.ui.font = "700 18px Arial";
    default:
      break;
  }
  _main.ui.textAlign = "center";
  // x 100 - 185
  // y 510 - 595
  _main.ui.lineWidth = 8;
  _main.ui.strokeStyle = "rgba(255,255,255,0.8)";
  _main.ui.beginPath();
  _main.ui.arc(targetPointerPos[0], targetPointerPos[1], 40, 0, _render.twoPi);
  _main.ui.closePath();
  _main.ui.stroke();
  if (promptTimer > 0) {
    exports.promptTimer = promptTimer -= 1;
    _main.ui.fillStyle = "rgba(0,0,0," + Math.max(0, promptTimer > 30 ? 1 : 1 - (30 - promptTimer) / 30) + ")";
    _main.ui.fillRect(400, 325, 400, 100);
    _main.ui.fillStyle = "rgba(255,255,255," + Math.max(0, promptTimer > 30 ? 1 : 1 - (30 - promptTimer) / 30) + ")";
    _main.ui.font = "700 38px Arial";
    _main.ui.textAlign = "center";
    if (promptType == 0) {
      text = "Invalid code";
    } else {
      text = "Limit reached";
    }
    _main.ui.fillText(text, 600, 385);
  }
}

function getTargetStageCookies() {
  for (var i = 0; i < 10; i++) {
    var s = (0, _main.getCookie)("custom" + i);
    if (s != null && s != undefined && s != "null") {
      var newStage = (0, _encode.parseStageCode)(s);
      if (newStage == null) {
        console.log(i + " invalid code");
      } else {
        _activeStage.customTargetStages[_activeStage.customTargetStages.length - 1] = (0, _deepCopy.deepCopyObject)(true, newStage);
        (0, _activeStage.setCustomTargetStages)(_activeStage.customTargetStages.length, _activeStage.customTargetStages[_activeStage.customTargetStages.length - 1]);
      }
    }
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/stages/targetselect.js
// module id = 241
// module chunks = 1
//# sourceURL=webpack:///./src/stages/targetselect.js?