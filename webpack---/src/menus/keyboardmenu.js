"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disableStick = exports.keyboardPrompt = exports.keyboardPromptTimer = exports.menuScrollSpeed = exports.enterHeldTimer = exports.enterHeld = exports.settingRange = exports.settingModifierPart = exports.settingModifier = exports.keyListen = exports.kMenuKeyFlash = exports.kMenuSelected = exports.keymapItems = undefined;
exports.getKeyboardCookie = getKeyboardCookie;
exports.setKeyboardCookie = setKeyboardCookie;
exports.KeymapItem = KeymapItem;
exports.keyboardMenuControls = keyboardMenuControls;
exports.drawKeyboardMenuInit = drawKeyboardMenuInit;
exports.drawKeyboardMenu = drawKeyboardMenu;

var _main = __webpack_require__(11);

var _settings = __webpack_require__(14);

var _sfx = __webpack_require__(120);

var _keytest = __webpack_require__(256);

var _render = __webpack_require__(13);

var _menu = __webpack_require__(124);

var _Vec2D = __webpack_require__(22);

/* eslint-disable */

var keymapItems = exports.keymapItems = {
  "lstickUp1": new KeymapItem(0, new _Vec2D.Vec2D(150, 120), 87, _settings.keyMap.lstick.up, 0, "shoulderMod3", "lstickUp2", "lstickRight1", "cstickUp2"),
  "lstickUp2": new KeymapItem(0, new _Vec2D.Vec2D(230, 120), 0, _settings.keyMap.lstick.up, 1, "shoulderMod5", "lstickRangeUp", "lstickRight2", "lstickUp1"),
  "lstickRight1": new KeymapItem(0, new _Vec2D.Vec2D(150, 190), 68, _settings.keyMap.lstick.right, 0, "lstickUp1", "lstickRight2", "lstickLeft1", "cstickRight2"),
  "lstickRight2": new KeymapItem(0, new _Vec2D.Vec2D(230, 190), 0, _settings.keyMap.lstick.right, 1, "lstickUp2", "lstickRangeRight", "lstickLeft2", "lstickRight1"),
  "lstickLeft1": new KeymapItem(0, new _Vec2D.Vec2D(150, 260), 65, _settings.keyMap.lstick.left, 0, "lstickRight1", "lstickLeft2", "lstickDown1", "cstickLeft2"),
  "lstickLeft2": new KeymapItem(0, new _Vec2D.Vec2D(230, 260), 0, _settings.keyMap.lstick.left, 1, "lstickRight2", "lstickRangeLeft", "lstickDown2", "lstickLeft1"),
  "lstickDown1": new KeymapItem(0, new _Vec2D.Vec2D(150, 330), 83, _settings.keyMap.lstick.down, 0, "lstickLeft1", "lstickDown2", "lstickMod3", "cstickDown2"),
  "lstickDown2": new KeymapItem(0, new _Vec2D.Vec2D(230, 330), 0, _settings.keyMap.lstick.down, 1, "lstickLeft2", "lstickRangeDown", "lstickMod5", "lstickDown1"),
  "lstickRangeUp": new KeymapItem(2, new _Vec2D.Vec2D(310, 120), 1.00, _settings.keyMap.lstick.ranges, 0, "shoulderMod5", "a1", "lstickRangeRight", "lstickUp2"),
  "lstickRangeRight": new KeymapItem(2, new _Vec2D.Vec2D(310, 190), 1.00, _settings.keyMap.lstick.ranges, 1, "lstickRangeUp", "b1", "lstickRangeLeft", "lstickRight2"),
  "lstickRangeLeft": new KeymapItem(2, new _Vec2D.Vec2D(310, 260), 1.00, _settings.keyMap.lstick.ranges, 2, "lstickRangeRight", "x1", "lstickRangeDown", "lstickLeft2"),
  "lstickRangeDown": new KeymapItem(2, new _Vec2D.Vec2D(310, 330), 1.00, _settings.keyMap.lstick.ranges, 3, "lstickRangeLeft", "y1", "lstickMod5", "lstickDown2"),
  "lstickMod1": new KeymapItem(1, new _Vec2D.Vec2D(100, 430), 32, _settings.keyMap.lstick.modifiers, 0, "lstickDown1", "lstickMod2", "lAnalog1", "cstickDown2", 0),
  "lstickMod2": new KeymapItem(1, new _Vec2D.Vec2D(150, 430), 0, _settings.keyMap.lstick.modifiers, 1, "lstickDown1", "lstickMod3", "lAnalog1", "lstickMod1", 0),
  "lstickMod3": new KeymapItem(1, new _Vec2D.Vec2D(200, 430), 0, _settings.keyMap.lstick.modifiers, 2, "lstickDown1", "lstickMod4", "lAnalog1", "lstickMod2", 0),
  "lstickMod4": new KeymapItem(1, new _Vec2D.Vec2D(250, 430), 0, _settings.keyMap.lstick.modifiers, 3, "lstickDown2", "lstickMod5", "lAnalog2", "lstickMod3", 0),
  "lstickMod5": new KeymapItem(1, new _Vec2D.Vec2D(300, 430), 0, _settings.keyMap.lstick.modifiers, 4, "lstickRangeDown", "y1", "shoulderRangeL", "lstickMod4", 0),
  "lAnalog1": new KeymapItem(0, new _Vec2D.Vec2D(150, 520), 111, _settings.keyMap.shoulders.lAnalog, 0, "lstickMod3", "lAnalog2", "rAnalog1", "dpadRight"),
  "lAnalog2": new KeymapItem(0, new _Vec2D.Vec2D(230, 520), 0, _settings.keyMap.shoulders.lAnalog, 1, "lstickMod5", "shoulderRangeL", "rAnalog2", "lAnalog1"),
  "rAnalog1": new KeymapItem(0, new _Vec2D.Vec2D(150, 590), 106, _settings.keyMap.shoulders.rAnalog, 0, "lAnalog1", "rAnalog2", "shoulderMod3", "dpadLeft"),
  "rAnalog2": new KeymapItem(0, new _Vec2D.Vec2D(230, 590), 0, _settings.keyMap.shoulders.rAnalog, 1, "lAnalog2", "shoulderRangeR", "shoulderMod5", "rAnalog1"),
  "shoulderRangeL": new KeymapItem(2, new _Vec2D.Vec2D(310, 520), 1.00, _settings.keyMap.shoulders.ranges, 0, "lstickMod5", "l1", "shoulderRangeR", "lAnalog2"),
  "shoulderRangeR": new KeymapItem(2, new _Vec2D.Vec2D(310, 590), 1.00, _settings.keyMap.shoulders.ranges, 1, "shoulderRangeL", "r1", "shoulderMod5", "rAnalog2"),
  "shoulderMod1": new KeymapItem(1, new _Vec2D.Vec2D(100, 690), 0, _settings.keyMap.shoulders.modifiers, 0, "rAnalog1", "shoulderMod2", "lstickUp1", "dpadDown", 1),
  "shoulderMod2": new KeymapItem(1, new _Vec2D.Vec2D(150, 690), 0, _settings.keyMap.shoulders.modifiers, 1, "rAnalog1", "shoulderMod3", "lstickUp1", "shoulderMod1", 1),
  "shoulderMod3": new KeymapItem(1, new _Vec2D.Vec2D(200, 690), 0, _settings.keyMap.shoulders.modifiers, 2, "rAnalog2", "shoulderMod4", "lstickUp2", "shoulderMod2", 1),
  "shoulderMod4": new KeymapItem(1, new _Vec2D.Vec2D(250, 690), 0, _settings.keyMap.shoulders.modifiers, 3, "rAnalog2", "shoulderMod5", "lstickUp2", "shoulderMod3", 1),
  "shoulderMod5": new KeymapItem(1, new _Vec2D.Vec2D(300, 690), 0, _settings.keyMap.shoulders.modifiers, 4, "shoulderRangeR", "s1", "lstickUp2", "shoulderMod4", 1),
  "a1": new KeymapItem(0, new _Vec2D.Vec2D(550, 145), 76, _settings.keyMap.a, 0, "s1", "a2", "b1", "lstickRangeRight"),
  "a2": new KeymapItem(0, new _Vec2D.Vec2D(630, 145), 101, _settings.keyMap.a, 1, "s2", "cstickRight1", "b2", "a1"),
  "b1": new KeymapItem(0, new _Vec2D.Vec2D(550, 215), 75, _settings.keyMap.b, 0, "a1", "b2", "x1", "lstickRangeLeft"),
  "b2": new KeymapItem(0, new _Vec2D.Vec2D(630, 215), 100, _settings.keyMap.b, 1, "a2", "cstickLeft1", "x2", "b1"),
  "x1": new KeymapItem(0, new _Vec2D.Vec2D(550, 285), 186, _settings.keyMap.x, 0, "b1", "x2", "y1", "lstickRangeDown"),
  "x2": new KeymapItem(0, new _Vec2D.Vec2D(630, 285), 102, _settings.keyMap.x, 1, "b2", "cstickDown1", "y2", "x1"),
  "y1": new KeymapItem(0, new _Vec2D.Vec2D(550, 355), 79, _settings.keyMap.y, 0, "x1", "y2", "z1", "lstickMod5"),
  "y2": new KeymapItem(0, new _Vec2D.Vec2D(630, 355), 104, _settings.keyMap.y, 1, "x2", "cstickDown1", "z2", "y1"),
  "z1": new KeymapItem(0, new _Vec2D.Vec2D(550, 425), 192, _settings.keyMap.z, 0, "y1", "z2", "l1", "lstickMod5"),
  "z2": new KeymapItem(0, new _Vec2D.Vec2D(630, 425), 107, _settings.keyMap.z, 1, "y2", "dpadUp", "l2", "z1"),
  "l1": new KeymapItem(0, new _Vec2D.Vec2D(550, 495), 73, _settings.keyMap.l, 0, "z1", "l2", "r1", "shoulderRangeL"),
  "l2": new KeymapItem(0, new _Vec2D.Vec2D(630, 495), 103, _settings.keyMap.l, 1, "z2", "dpadRight", "r2", "l1"),
  "r1": new KeymapItem(0, new _Vec2D.Vec2D(550, 565), 80, _settings.keyMap.r, 0, "l1", "r2", "s1", "shoulderRangeR"),
  "r2": new KeymapItem(0, new _Vec2D.Vec2D(630, 565), 105, _settings.keyMap.r, 1, "l2", "dpadLeft", "s2", "r1"),
  "s1": new KeymapItem(0, new _Vec2D.Vec2D(550, 635), 219, _settings.keyMap.s, 0, "r1", "s2", "a1", "shoulderMod5"),
  "s2": new KeymapItem(0, new _Vec2D.Vec2D(630, 635), 109, _settings.keyMap.s, 1, "r2", "dpadDown", "a2", "s1"),
  "cstickUp1": new KeymapItem(0, new _Vec2D.Vec2D(950, 120), 38, _settings.keyMap.cstick.up, 0, "dpadDown", "cstickUp2", "cstickRight1", "a2"),
  "cstickUp2": new KeymapItem(0, new _Vec2D.Vec2D(1030, 120), 0, _settings.keyMap.cstick.up, 1, "dpadDown", "lstickUp1", "cstickRight2", "cstickUp1"),
  "cstickRight1": new KeymapItem(0, new _Vec2D.Vec2D(950, 190), 39, _settings.keyMap.cstick.right, 0, "cstickUp1", "cstickRight2", "cstickLeft1", "b2"),
  "cstickRight2": new KeymapItem(0, new _Vec2D.Vec2D(1030, 190), 0, _settings.keyMap.cstick.right, 1, "cstickUp2", "lstickRight1", "cstickLeft2", "cstickRight1"),
  "cstickLeft1": new KeymapItem(0, new _Vec2D.Vec2D(950, 260), 37, _settings.keyMap.cstick.left, 0, "cstickRight1", "cstickLeft2", "cstickDown1", "x2"),
  "cstickLeft2": new KeymapItem(0, new _Vec2D.Vec2D(1030, 260), 0, _settings.keyMap.cstick.left, 1, "cstickRight2", "lstickLeft1", "cstickDown2", "cstickLeft1"),
  "cstickDown1": new KeymapItem(0, new _Vec2D.Vec2D(950, 330), 40, _settings.keyMap.cstick.down, 0, "cstickLeft1", "cstickDown2", "dpadUp", "y2"),
  "cstickDown2": new KeymapItem(0, new _Vec2D.Vec2D(1030, 330), 0, _settings.keyMap.cstick.down, 1, "cstickLeft2", "lstickDown1", "dpadUp", "cstickDown1"),
  "dpadUp": new KeymapItem(0, new _Vec2D.Vec2D(950, 440), 71, _settings.keyMap.du, 0, "cstickDown1", "lAnalog1", "dpadRight", "z2"),
  "dpadRight": new KeymapItem(0, new _Vec2D.Vec2D(950, 510), 78, _settings.keyMap.dr, 0, "dpadUp", "lAnalog1", "dpadLeft", "l2"),
  "dpadLeft": new KeymapItem(0, new _Vec2D.Vec2D(950, 580), 86, _settings.keyMap.dl, 0, "dpadRight", "rAnalog1", "dpadDown", "r2"),
  "dpadDown": new KeymapItem(0, new _Vec2D.Vec2D(950, 650), 66, _settings.keyMap.dd, 0, "dpadLeft", "shoulderMod1", "cstickUp1", "s2")
};

var kMenuSelected = exports.kMenuSelected = "lstickUp1";
var kMenuKeyFlash = exports.kMenuKeyFlash = 0;
var keyListen = exports.keyListen = false;
var settingModifier = exports.settingModifier = false;
var settingModifierPart = exports.settingModifierPart = 0;
var settingRange = exports.settingRange = false;
var enterHeld = exports.enterHeld = false;
var enterHeldTimer = exports.enterHeldTimer = 0;
var menuScrollSpeed = exports.menuScrollSpeed = 10;
var keyboardPromptTimer = exports.keyboardPromptTimer = 0;
var keyboardPrompt = exports.keyboardPrompt = "";
var disableStick = exports.disableStick = [false, false, false, false];

function getKeyboardCookie() {
  var keys = Object.keys(keymapItems);
  for (var i = 0; i < keys.length; i++) {
    var keymapData = (0, _main.getCookie)(keys[i]);
    if (keymapData != undefined && keymapData != null && keymapData != "") {
      if (keymapItems[keys[i]].type == 1) {
        // if modifier
        var modVal = keymapData.split("-");
        keymapItems[keys[i]].binding[keymapItems[keys[i]].index][0] = parseInt(modVal[0]);
        keymapItems[keys[i]].binding[keymapItems[keys[i]].index][1] = parseFloat(modVal[1]);
        keymapItems[keys[i]].binding[keymapItems[keys[i]].index][2] = parseFloat(modVal[2]);
      } else if (keymapItems[keys[i]].type == 2) {
        // if range
        keymapItems[keys[i]].binding[keymapItems[keys[i]].index] = parseFloat((0, _main.getCookie)(keys[i]));
      } else {
        // if button
        keymapItems[keys[i]].binding[keymapItems[keys[i]].index] = parseInt((0, _main.getCookie)(keys[i]));
      }
    }
  }
}
function setKeyboardCookie() {
  var keys = Object.keys(keymapItems);
  for (var i = 0; i < keys.length; i++) {
    if (keymapItems[keys[i]].type == 1) {
      var modVal = keymapItems[keys[i]].binding[keymapItems[keys[i]].index];
      (0, _main.setCookie)(keys[i], "" + modVal[0] + "-" + modVal[1] + "-" + modVal[2], 36500);
    } else {
      (0, _main.setCookie)(keys[i], keymapItems[keys[i]].binding[keymapItems[keys[i]].index], 36500);
    }
  }
  console.log(document.cookie);
  console.log(localStorage);
}
function KeymapItem(type, pos, value, binding, index, above, toRight, below, toLeft, modType) {
  this.type = type;
  // 0 = keys, 1 = modifier
  this.pos = pos;
  this.value = value;
  this.binding = binding;
  this.index = index;
  this.above = above;
  this.toRight = toRight;
  this.below = below;
  this.toLeft = toLeft;
  this.modType = modType || 0;
}

function keyboardMenuControls(i, input) {
  var menuMove = false;
  var moveD = "";
  if (input[i][0].lsX == 0 && input[i][0].lsY == 0) {
    disableStick[i] = false;
  }
  if (keyboardPromptTimer > 0) {
    exports.keyboardPromptTimer = keyboardPromptTimer -= 1;
  }
  exports.kMenuKeyFlash = kMenuKeyFlash += 1;
  if (kMenuKeyFlash > 120) {
    exports.kMenuKeyFlash = kMenuKeyFlash = 0;
  }
  if (settingModifier) {
    if (enterHeldTimer > 60) {
      exports.enterHeldTimer = enterHeldTimer = 0;
      exports.settingModifier = settingModifier = false;
      exports.settingModifierPart = settingModifierPart = 0;
      keymapItems[kMenuSelected].value = 0;
      keymapItems[kMenuSelected].binding[keymapItems[kMenuSelected].index][0] = 0;
      keymapItems[kMenuSelected].binding[keymapItems[kMenuSelected].index][1] = 0.5;
      keymapItems[kMenuSelected].binding[keymapItems[kMenuSelected].index][2] = 0.5;
      _sfx.sounds.menuBack.play();
      exports.menuScrollSpeed = menuScrollSpeed = 10;
      exports.keyListen = keyListen = false;
    }
  } else {
    if (enterHeldTimer > 60) {
      if (keymapItems[kMenuSelected].type == 1) {
        // mod
        keymapItems[kMenuSelected].value = 0;
        keymapItems[kMenuSelected].binding[keymapItems[kMenuSelected].index][0] = 0;
        _sfx.sounds.menuBack.play();
      } else if (keymapItems[kMenuSelected].type == 2) {
        _sfx.sounds.deny.play();
      } else {
        // button
        switch (kMenuSelected) {
          case "lstickUp1":
          case "lstickDown1":
          case "lstickLeft1":
          case "lstickRight1":
          case "a1":
          case "b1":
          case "x1":
          case "y1":
          case "z1":
          case "l1":
          case "r1":
          case "s1":
            _sfx.sounds.deny.play();
            exports.keyboardPromptTimer = keyboardPromptTimer = 100;
            exports.keyboardPrompt = keyboardPrompt = "Cannot clear";
            break;
          default:
            keymapItems[kMenuSelected].value = 0;
            keymapItems[kMenuSelected].binding[keymapItems[kMenuSelected].index] = 0;
            _sfx.sounds.menuBack.play();
            break;
        }
      }
      exports.enterHeldTimer = enterHeldTimer = 0;
      exports.keyListen = keyListen = false;
    }
  }
  if (keyListen) {
    if (_main.keyBinding) {
      if (keymapItems[kMenuSelected].type) {
        // modifier
        _sfx.sounds.menuForward.play();
        keymapItems[kMenuSelected].value = _main.keyBind;
        keymapItems[kMenuSelected].binding[keymapItems[kMenuSelected].index][0] = _main.keyBind;
        exports.settingModifierPart = settingModifierPart += 1;
      } else {
        //key
        if (_main.keyBind == 13) {
          switch (kMenuSelected) {
            case "lstickUp1":
            case "lstickUp2":
            case "lstickDown1":
            case "lstickDown2":
            case "lstickLeft1":
            case "lstickLeft2":
            case "lstickRight1":
            case "lstickRight2":
            case "b1":
            case "b2":
            case "a1":
            case "a2":
              _sfx.sounds.deny.play();
              exports.keyboardPromptTimer = keyboardPromptTimer = 120;
              exports.keyboardPrompt = keyboardPrompt = "Not a good idea";
              break;
            default:
              _sfx.sounds.menuForward.play();
              keymapItems[kMenuSelected].value = _main.keyBind;
              keymapItems[kMenuSelected].binding[keymapItems[kMenuSelected].index] = _main.keyBind;
              break;
          }
        } else {
          _sfx.sounds.menuForward.play();
          keymapItems[kMenuSelected].value = _main.keyBind;
          keymapItems[kMenuSelected].binding[keymapItems[kMenuSelected].index] = _main.keyBind;
        }
      }
      //input[i].b[0] = true;
      //input[i].b[1] = true;
      disableStick[i] = true;
      exports.keyListen = keyListen = false;
    }
  } else {
    (0, _main.setKeyBinding)(false);
    if (_main.keys[13] && !keyListen && !enterHeld) {
      if (settingModifierPart > 0) {
        exports.settingModifierPart = settingModifierPart += 1;
        if (settingModifierPart > 2) {
          exports.settingModifierPart = settingModifierPart = 0;
          exports.settingModifier = settingModifier = false;
          exports.menuScrollSpeed = menuScrollSpeed = 10;
        }
      } else if (settingRange) {
        exports.settingRange = settingRange = false;
        exports.menuScrollSpeed = menuScrollSpeed = 10;
      } else {
        if (keymapItems[kMenuSelected].type == 2) {
          exports.settingRange = settingRange = true;
          exports.menuScrollSpeed = menuScrollSpeed = 5;
        } else {
          if (keymapItems[kMenuSelected].type == 1) {
            exports.settingModifier = settingModifier = true;
            exports.menuScrollSpeed = menuScrollSpeed = 5;
          }
          exports.keyListen = keyListen = true;
        }
      }
      _sfx.sounds.menuForward.play();
    } else if (input[i][0].b && !input[i][1].b) {
      if (!settingModifier && !settingRange) {
        _sfx.sounds.menuBack.play();
        input[i][1].b = true;
        (0, _main.changeGamemode)(1);
        setKeyboardCookie();
      }
    } else if (input[i][0].lsY > 0.7 && !disableStick[i]) {
      _menu.stickHoldEach[i] = true;
      if (_menu.stickHold == 0) {
        moveD = "u";
        menuMove = true;
        (0, _menu.increaseStick)();
      } else {
        (0, _menu.increaseStick)();
        if (_menu.stickHold % menuScrollSpeed == 0) {
          moveD = "u";
          menuMove = true;
        }
      }
    } else if (input[i][0].lsY < -0.7 && !disableStick[i]) {
      _menu.stickHoldEach[i] = true;
      if (_menu.stickHold == 0) {
        moveD = "d";
        menuMove = true;
        (0, _menu.increaseStick)();
      } else {
        (0, _menu.increaseStick)();
        if (_menu.stickHold % menuScrollSpeed == 0) {
          moveD = "d";
          menuMove = true;
        }
      }
    } else if (input[i][0].lsX > 0.7 && !disableStick[i]) {
      _menu.stickHoldEach[i] = true;
      if (_menu.stickHold == 0) {
        moveD = "r";
        menuMove = true;
        (0, _menu.increaseStick)();
      } else {
        (0, _menu.increaseStick)();
        if (_menu.stickHold % menuScrollSpeed == 0) {
          moveD = "r";
          menuMove = true;
        }
      }
    } else if (input[i][0].lsX < -0.7 && !disableStick[i]) {
      _menu.stickHoldEach[i] = true;
      if (_menu.stickHold == 0) {
        menuMove = true;
        moveD = "l";
        (0, _menu.increaseStick)();
      } else {
        (0, _menu.increaseStick)();
        if (_menu.stickHold % menuScrollSpeed == 0) {
          moveD = "l";
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
      _sfx.sounds.menuSelect.play();
      if (settingRange) {
        var rangeValue = keymapItems[kMenuSelected].binding;
        var index = keymapItems[kMenuSelected].index;
        switch (moveD) {
          case "l":
            rangeValue[index] -= 0.01;
            if (rangeValue[index] < 0) {
              rangeValue[index] = 0;
            }
            break;
          case "r":
            rangeValue[index] += 0.01;
            if (rangeValue[index] > 2) {
              rangeValue[index] = 2;
            }
            break;
          default:
            break;
        }
      } else if (settingModifier) {
        var modifierValue = keymapItems[kMenuSelected].binding[keymapItems[kMenuSelected].index];
        switch (moveD) {
          case "l":
            modifierValue[settingModifierPart] -= 0.01;
            if (modifierValue[settingModifierPart] < 0) {
              modifierValue[settingModifierPart] = 0;
            }
            break;
          case "r":
            modifierValue[settingModifierPart] += 0.01;
            if (modifierValue[settingModifierPart] > 2) {
              modifierValue[settingModifierPart] = 2;
            }
            break;
          default:
            break;
        }
      } else {
        exports.kMenuKeyFlash = kMenuKeyFlash = 0;
        switch (moveD) {
          case "u":
            exports.kMenuSelected = kMenuSelected = keymapItems[kMenuSelected].above;
            break;
          case "d":
            exports.kMenuSelected = kMenuSelected = keymapItems[kMenuSelected].below;
            break;
          case "l":
            exports.kMenuSelected = kMenuSelected = keymapItems[kMenuSelected].toLeft;
            break;
          case "r":
            exports.kMenuSelected = kMenuSelected = keymapItems[kMenuSelected].toRight;
            break;
          default:
            break;
        }
      }
    }
  }
  if (_main.keys[13]) {
    exports.enterHeld = enterHeld = true;
    exports.enterHeldTimer = enterHeldTimer += 1;
  } else {
    exports.enterHeld = enterHeld = false;
    exports.enterHeldTimer = enterHeldTimer = 0;
  }
}
function drawKeyboardMenuInit() {
  var bgGrad = _main.bg1.createLinearGradient(0, 0, 1200, 750);
  bgGrad.addColorStop(0, "rgb(11, 65, 39)");
  bgGrad.addColorStop(1, "rgb(8, 20, 61)");
  _main.bg1.fillStyle = bgGrad;
  _main.bg1.fillRect(0, 0, _main.layers.BG1.width, _main.layers.BG1.height);

  _main.fg1.lineWidth = 3;
  _main.fg1.textAlign = "center";
  _main.fg1.fillStyle = "rgba(255, 255, 255, 0.65)";
  _main.fg1.font = "italic 900 60px Arial";
  _main.fg1.fillText("Keyboard Controls", 600, 75);
  _main.fg1.font = "italic 900 30px Arial";
  _main.fg1.fillText("L-stick", 150, 100);
  _main.fg1.fillText("Shoulder Analog", 200, 495);
  _main.fg1.fillText("C-stick", 950, 100);
  _main.fg1.fillText("Dpad", 950, 420);
  var buttonLetters = ["A", "B", "X", "Y", "Z", "L", "R", "S"];
  for (var i = 0; i < buttonLetters.length; i++) {
    _main.fg1.fillText(buttonLetters[i], 510, 186 + i * 70);
  }
  _main.fg1.fillText("L", 95, 556);
  _main.fg1.fillText("R", 95, 626);
  _main.fg1.font = "italic 900 16px Arial";
  _main.fg1.fillText("Press Enter to listen for key bind    Hold Enter to clear", 600, 115);
  _main.fg1.font = "italic 900 20px Arial";
  _main.fg1.fillText("Modifiers", 200, 405);
  _main.fg1.fillText("Modifiers", 200, 665);
  _main.fg1.textAlign = "left";
  var directionPlacements = [new _Vec2D.Vec2D(75, 153), new _Vec2D.Vec2D(875, 153), new _Vec2D.Vec2D(875, 475)];
  for (var i = 0; i < 3; i++) {
    _main.fg1.fillText("Up", directionPlacements[i].x, directionPlacements[i].y);
    _main.fg1.fillText("Right", directionPlacements[i].x, directionPlacements[i].y + 70);
    _main.fg1.fillText("Left", directionPlacements[i].x, directionPlacements[i].y + 140);
    _main.fg1.fillText("Down", directionPlacements[i].x, directionPlacements[i].y + 210);
  }
};

function drawKeyboardMenu() {
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
  var keys = Object.keys(keymapItems);
  for (var i = 0; i < keys.length; i++) {
    if (keymapItems[keys[i]].type == 1) {
      if (keys[i] == kMenuSelected) {
        _main.ui.fillStyle = "black";
        _main.ui.fillRect(keymapItems[keys[i]].pos.x - 80, keymapItems[keys[i]].pos.y + 20, 160, 40);
        _main.ui.fillStyle = "white";
        var text = _keytest.keyText[keymapItems[keys[i]].binding[keymapItems[keys[i]].index][0]];
        _main.ui.font = "italic 900 " + Math.round(Math.max(8, 23 - 2 * text.length)) + "px Arial";
        if (keymapItems[keys[i]].binding[keymapItems[keys[i]].index][0] == 0) {
          _main.ui.fillText("empty", keymapItems[keys[i]].pos.x, keymapItems[keys[i]].pos.y + 45);
        } else {
          var modText = keymapItems[kMenuSelected].modType ? ["L", "R"] : ["X", "Y"];
          _main.ui.fillText(text + " " + modText[0] + ":" + keymapItems[keys[i]].binding[keymapItems[keys[i]].index][1].toFixed(2) + " " + modText[1] + ":" + keymapItems[keys[i]].binding[keymapItems[keys[i]].index][2].toFixed(2), keymapItems[keys[i]].pos.x, keymapItems[keys[i]].pos.y + 45);
        }
        _main.ui.fillStyle = "rgba(200,200,200, " + Math.abs(1 - kMenuKeyFlash / 60) + ")";
        _main.ui.strokeStyle = "rgba(255, 255, 255, 0.9)";
      } else if (keymapItems[keys[i]].binding[keymapItems[keys[i]].index][0] == 0) {
        _main.ui.fillStyle = "rgba(0, 0, 0, 0.5)";
        _main.ui.strokeStyle = "rgba(255, 255, 255, 0.2)";
      } else {
        _main.ui.fillStyle = "rgb(0, 0, 0)";
        _main.ui.strokeStyle = "rgba(255, 255, 255, 0.8)";
      }
      _main.ui.beginPath();
      _main.ui.arc(keymapItems[keys[i]].pos.x, keymapItems[keys[i]].pos.y, 15, 0, _render.twoPi);
      _main.ui.closePath();
      _main.ui.fill();
      _main.ui.stroke();
    } else if (keymapItems[keys[i]].type == 2) {
      if (keys[i] == kMenuSelected) {
        _main.ui.fillStyle = "rgba(200,200,200, " + Math.abs(1 - kMenuKeyFlash / 60) + ")";
        _main.ui.strokeStyle = "rgba(255, 255, 255, 0.9)";
      } else {
        _main.ui.fillStyle = "rgba(0, 0, 0, 0.65)";
        _main.ui.strokeStyle = "rgba(255, 255, 255, 0.6)";
      }
      var x = keymapItems[keys[i]].pos.x;
      var y = keymapItems[keys[i]].pos.y;
      _main.ui.beginPath();
      _main.ui.moveTo(x + 15, y + 10);
      _main.ui.lineTo(x + 65, y + 10);
      _main.ui.arc(x + 65, y + 25, 15, 1.5 * Math.PI, 0.5 * Math.PI);
      _main.ui.lineTo(x + 15, y + 40);
      _main.ui.arc(x + 15, y + 25, 15, 0.5 * Math.PI, 1.5 * Math.PI);
      _main.ui.closePath();
      _main.ui.fill();
      _main.ui.stroke();
      _main.ui.strokeStyle = "black";
      _main.ui.fillStyle = "white";
      _main.ui.font = "italic 900 20px Arial";
      _main.ui.strokeText(keymapItems[keys[i]].binding[keymapItems[keys[i]].index].toFixed(2), x + 37, y + 32);
      _main.ui.fillText(keymapItems[keys[i]].binding[keymapItems[keys[i]].index].toFixed(2), x + 37, y + 32);
      if (settingRange && keys[i] == kMenuSelected) {
        _main.ui.strokeText("<", x - 15, y + 32);
        _main.ui.fillText("<", x - 15, y + 32);
        _main.ui.strokeText(">", x + 90, y + 32);
        _main.ui.fillText(">", x + 90, y + 32);
        _main.ui.strokeText("Enter to Confirm", x + 37, y + 60);
        _main.ui.fillText("Enter to Confirm", x + 37, y + 60);
      }
    } else {
      if (keys[i] == kMenuSelected) {
        _main.ui.fillStyle = "rgba(255, 255, 255, " + Math.abs(1 - kMenuKeyFlash / 60) + ")";
        _main.ui.strokeStyle = "rgba(255, 255, 255, 0.9)";
      } else if (keymapItems[keys[i]].binding[keymapItems[keys[i]].index] == 0) {
        _main.ui.fillStyle = "rgba(31, 31, 31, 0.69)";
        _main.ui.strokeStyle = "rgba(182, 182, 182, 0.66)";
      } else {
        _main.ui.fillStyle = "rgba(255, 255, 255, 0.2)";
        _main.ui.strokeStyle = "rgba(255, 255, 255, 0.8)";
      }
      _main.ui.fillRect(keymapItems[keys[i]].pos.x, keymapItems[keys[i]].pos.y, 50, 50);
      _main.ui.strokeRect(keymapItems[keys[i]].pos.x, keymapItems[keys[i]].pos.y, 50, 50);
      _main.ui.fillStyle = "white";
      _main.ui.strokeStyle = "black";
      var text = _keytest.keyText[keymapItems[keys[i]].binding[keymapItems[keys[i]].index]];
      _main.ui.font = "italic 900 " + Math.round(Math.max(8, 25 - 2 * text.length)) + "px Arial";
      _main.ui.strokeText(text, keymapItems[keys[i]].pos.x + 22, keymapItems[keys[i]].pos.y + 32);
      _main.ui.fillText(text, keymapItems[keys[i]].pos.x + 22, keymapItems[keys[i]].pos.y + 32);
    }
  }
  if (settingModifier) {
    _main.ui.fillStyle = "black";
    _main.ui.fillRect(400, 200, 400, 420);
    _main.ui.font = "italic 900 40px Arial";
    _main.ui.fillStyle = "white";
    _main.ui.fillText("Setting Modifier", 600, 245);
    _main.ui.font = "italic 900 30px Arial";
    _main.ui.fillText("Key:", 460, 320);
    if (keymapItems[kMenuSelected].modType) {
      _main.ui.fillText("L:", 460, 400);
      _main.ui.fillText("R:", 460, 480);
    } else {
      _main.ui.fillText("X:", 460, 400);
      _main.ui.fillText("Y:", 460, 480);
    }
    if (keyListen) {
      _main.ui.fillText("Listening...", 660, 320);
    } else {
      _main.ui.fillText(_keytest.keyText[keymapItems[kMenuSelected].binding[keymapItems[kMenuSelected].index][0]], 660, 320);
      _main.ui.fillText("Enter to confirm", 600, 560);
    }
    for (var i = 0; i < 2; i++) {
      _main.ui.fillText("<", 580, 400 + i * 80);
      _main.ui.fillText(">", 740, 400 + i * 80);
      _main.ui.fillText(keymapItems[kMenuSelected].binding[keymapItems[kMenuSelected].index][i + 1].toFixed(2), 660, 400 + i * 80);
    }
    _main.ui.font = "italic 900 20px Arial";
    _main.ui.fillText("Hold Enter to remove settings", 600, 600);
    _main.ui.strokeStyle = "rgba(255, 255, 255, " + Math.abs(1 - kMenuKeyFlash / 60) + ")";
    _main.ui.strokeRect(550, 285 + 80 * settingModifierPart, 220, 50);
  } else if (keyListen) {
    _main.ui.fillStyle = "black";
    _main.ui.fillRect(keymapItems[kMenuSelected].pos.x - 75, keymapItems[kMenuSelected].pos.y + 55, 200, 45);
    _main.ui.fillStyle = "white";
    var text = _keytest.keyText[keymapItems[kMenuSelected].binding[keymapItems[kMenuSelected].index]];
    _main.ui.font = "italic 900 30px Arial";
    _main.ui.fillText("Listening...", keymapItems[kMenuSelected].pos.x + 25, keymapItems[kMenuSelected].pos.y + 90);
  }
  if (keyboardPromptTimer > 0) {
    _main.ui.fillStyle = "black";
    _main.ui.fillRect(400, 300, 400, 100);
    _main.ui.fillStyle = "white";
    _main.ui.font = "italic 900 40px Arial";
    _main.ui.fillText(keyboardPrompt, 600, 360);
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/menus/keyboardmenu.js
// module id = 255
// module chunks = 1
//# sourceURL=webpack:///./src/menus/keyboardmenu.js?