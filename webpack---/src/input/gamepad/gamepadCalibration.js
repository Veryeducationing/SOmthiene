"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customGamepadInfoIsUsable = undefined;
exports.setClickObject = setClickObject;
exports.setClickObjectNumber = setClickObjectNumber;
exports.setCustomGamepadInfoIsUsable = setCustomGamepadInfoIsUsable;
exports.runCalibration = runCalibration;

var _Vec2D = __webpack_require__(22);

var _deepCopy = __webpack_require__(85);

var _main = __webpack_require__(11);

var _controllermenu = __webpack_require__(245);

var _gamepadInfo = __webpack_require__(247);

var _gamepad = __webpack_require__(248);

var _custom = __webpack_require__(249);

var _findGamepadInfo = __webpack_require__(250);

var _sfx = __webpack_require__(120);

// eslint-disable-next-line no-duplicate-imports

// eslint-disable-next-line no-duplicate-imports
var calibrationInProgress = [false, false, false, false];
/*eslint indent:0*/

function setCalibrationInProgress(i, bool) {
  calibrationInProgress[i] = bool;
}

var nullSnapshots = {
  b0: [], bL: [], bR: [], bU: [],
  a0: [], aL: [], aR: [], aU: []
};

var clickObject = null;

function setClickObject(click) {
  if (clickObject === null) {
    clickObject = click;
  }
}

var clickObjectNumber = 0;

function setClickObjectNumber(k) {
  clickObjectNumber = k;
}

var customGamepadInfoIsUsable = exports.customGamepadInfoIsUsable = [true, null, null, null, null, null, null, null];

var listening = false;

var ids = ["a", "b", "x", "y", "s", "r", "l", "z", "dpad", "icon", "ls", "cs"];

// add listeners for click
// these turn off when the SVG is not displayed, so shouldn't impact performance
function listen() {
  // $FlowFixMe ignore the following type error
  var svgDoc = document.getElementById("gamepadSVGCalibration").contentDocument;

  var _loop = function _loop(i) {
    var id = ids[i];
    // eslint-disable-next-line no-loop-func
    svgDoc.getElementById(id).addEventListener('click', function () {
      clickObject = id;
    });
  };

  for (var i = 0; i < ids.length; i++) {
    _loop(i);
  }
  listening = true;
}

var defaultTexts = ["Click button, trigger or analog stick to rebind."];
var errorText = ["Error: no controller detected"];
// figure out which custom gamepad infos are usable by the current controller
// sets the value for customGamepadInfoIsUsable
function setCustomGamepadInfoIsUsable(j) {
  var currentGamepad = (0, _gamepad.getGamepad)(j);
  if (currentGamepad) {
    var currentGamepadId = currentGamepad.id;
    if ((0, _findGamepadInfo.getGamepadNameAndInfo)(currentGamepadId) === null) {
      customGamepadInfoIsUsable[0] = null;
    } else {
      customGamepadInfoIsUsable[0] = true;
    }
    for (var k = 1; k < 8; k++) {
      var maybeCustomGamepadInfo = (0, _custom.getCustomGamepadInfo)(k);
      if (maybeCustomGamepadInfo === null) {
        customGamepadInfoIsUsable[k] = null;
      } else {
        if (currentGamepadId === maybeCustomGamepadInfo.fullID) {
          customGamepadInfoIsUsable[k] = true;
        } else {
          customGamepadInfoIsUsable[k] = false;
        }
      }
    }
  } else {
    customGamepadInfoIsUsable[0] = null;
  }
}

function runCalibration(i) {
  if (!calibrationInProgress[i]) {
    setCalibrationInProgress(i, true);

    var interval = 2000;

    var j = _main.currentPlayers[i];

    var prevGamepadInfo = _main.mType[i] === null || _main.mType[i] === "keyboard" ? _gamepadInfo.nullGamepadInfo : _main.mType[i];
    var gamepadInfo = (0, _deepCopy.deepCopyObject)(true, prevGamepadInfo);

    setCustomGamepadInfoIsUsable(j);

    clickObject = null;
    if (listening === false) {
      listen();
    }
    (0, _controllermenu.updateControllerMenu)(false, ["Mouse-click the start button to begin calibration."], 0);
    preCalibrationLoop(i, j, gamepadInfo, interval);
  }
}

function resetGamepadInfo(j) {
  var gamepad = (0, _gamepad.getGamepad)(j);
  var baseGamepadInfo = _gamepadInfo.nullGamepadInfo;
  if (gamepad !== undefined && gamepad !== null && gamepad.id !== undefined && gamepad.id !== null) {
    var maybeNameAndInfo = (0, _findGamepadInfo.getGamepadNameAndInfo)(gamepad.id);
    if (maybeNameAndInfo !== null) {
      baseGamepadInfo = (0, _deepCopy.deepCopyObject)(true, maybeNameAndInfo[1]);
    }
  }
  return baseGamepadInfo;
}

function saveSound() {
  _sfx.sounds.star.play();
}

function preCalibrationLoop(i, j, gamepadInfo, interval) {
  if (clickObject === "s") {
    _sfx.sounds.blunthit.play();
    (0, _custom.setCustomGamepadInfo)(j, gamepadInfo);
    (0, _main.setUsingCustomControls)(i, true);
    (0, _controllermenu.updateControllerMenu)(false, ["Finding controller neutral point.", "Do not press anything."], interval);
    // take null snapshot
    setTimeout(function () {
      (0, _main.setControllerReset)(i);
      saveSound();
      var gamepad = (0, _gamepad.getGamepad)(j);
      if (gamepad !== undefined && gamepad !== null) {
        var snapshots = nullSnapshots;
        snapshots.b0 = (0, _deepCopy.deepCopyArray)(true, gamepad.buttons);
        snapshots.a0 = (0, _deepCopy.deepCopyArray)(true, gamepad.axes);
        calibrationLoop(i, j, gamepadInfo, snapshots, interval);
        (0, _controllermenu.updateControllerMenu)(false, defaultTexts, 0);
      } else {
        (0, _controllermenu.updateControllerMenu)(false, errorText, 0);
      }
    }, interval);
  } else if (clickObject === "exit") {
    _sfx.sounds.menuBack.play();
    (0, _controllermenu.updateControllerMenu)(true, ["Quitting calibration menu."], interval);
    setCalibrationInProgress(i, false);
  } else if (clickObject === "reset") {
    _sfx.sounds.loudelectricfizz.play();
    (0, _controllermenu.setCustomInUse)(0);
    var baseGamepadInfo = resetGamepadInfo(j);
    (0, _main.setUsingCustomControls)(i, false, baseGamepadInfo);
    (0, _controllermenu.updateControllerMenu)(false, ["Controller bindings have been reset.", "Click the start button to begin calibration."], 0);
    setTimeout(function () {
      return preCalibrationLoop(i, j, baseGamepadInfo, interval);
    }, 16);
  } else if (clickObject === "center") {
    saveSound();
    (0, _main.setControllerReset)(i);
    (0, _controllermenu.updateControllerMenu)(false, ["Controller has been re-centered.", "Click the start button to begin calibration."], 0);
    setTimeout(function () {
      return preCalibrationLoop(i, j, gamepadInfo, interval);
    }, 16);
  } else if (clickObject === "loadCustom") {
    if (clickObjectNumber === 0) {
      (0, _controllermenu.setCustomInUse)(0);
      var _baseGamepadInfo = resetGamepadInfo(j);
      (0, _main.setUsingCustomControls)(i, false, _baseGamepadInfo);
      (0, _controllermenu.updateControllerMenu)(false, ["Now using default controller bindings.", "Click the start button to begin calibration."], 0);
      setTimeout(function () {
        return preCalibrationLoop(i, j, _baseGamepadInfo, interval);
      }, 16);
    } else {
      var newCustomGamepadInfo = (0, _custom.getCustomGamepadInfo)(clickObjectNumber);
      if (newCustomGamepadInfo === null || customGamepadInfoIsUsable[clickObjectNumber] !== true) {
        _sfx.sounds.deny.play();
        setTimeout(function () {
          return preCalibrationLoop(i, j, gamepadInfo, interval);
        }, 16);
      } else {
        var newGamepadInfo = newCustomGamepadInfo.gamepadInfo;
        (0, _controllermenu.setCustomInUse)(clickObjectNumber);
        (0, _custom.setCustomGamepadInfo)(j, newGamepadInfo);
        (0, _main.setUsingCustomControls)(i, true);
        (0, _controllermenu.updateControllerMenu)(false, ["Now using custom bindings #" + clickObjectNumber + ".", "Click the start button to begin calibration."], 0);
        setTimeout(function () {
          return preCalibrationLoop(i, j, newGamepadInfo, interval);
        }, 16);
      }
    }
  } else if (clickObject === "saveCustom") {
    if (clickObjectNumber < 1) {
      _sfx.sounds.deny.play();
    } else {
      customGamepadInfoIsUsable[clickObjectNumber] = true;
      (0, _custom.storeCustomGamepadInfo)(gamepadInfo, (0, _gamepad.getGamepad)(j).id, "custom" + clickObjectNumber, clickObjectNumber);
      (0, _controllermenu.setCustomInUse)(clickObjectNumber);
    }
    setTimeout(function () {
      return preCalibrationLoop(i, j, gamepadInfo, interval);
    }, 16);
  } else {
    if (clickObject === "icon") {
      _sfx.sounds.shout8.play();
      _sfx.sounds.sword3.play();
    }
    setTimeout(function () {
      return preCalibrationLoop(i, j, gamepadInfo, interval);
    }, 16);
  }
  clickObject = null;
};

function calibrationLoop(i, j, gamepadInfo, snapshots, interval) {
  if (clickObject === null) {
    setTimeout(function () {
      calibrationLoop(i, j, gamepadInfo, snapshots, interval);
    }, 16);
  } else {
    calibrateObject(i, j, gamepadInfo, snapshots, interval);
  }
};

function calibrateObject(i, j, gamepadInfo, snapshots, interval) {
  var texts = void 0;
  var gamepad = void 0;
  var totalInterval = interval + 16;

  if (clickObject === null) {
    console.log("error in function 'calibrateObject': calibration called on null object");
  } else if (clickObject === "icon") {
    _sfx.sounds.shout8.play();
    _sfx.sounds.sword3.play();
  } else if (clickObject === "exit") {
    _sfx.sounds.menuBack.play();
    setCalibrationInProgress(i, false);
    (0, _controllermenu.updateControllerMenu)(true, ["Quitting calibration menu."], interval);
  } else if (clickObject === "reset") {
    _sfx.sounds.loudelectricfizz.play();
    (0, _controllermenu.setCustomInUse)(0);
    var baseGamepadInfo = resetGamepadInfo(j);
    (0, _custom.setCustomGamepadInfo)(j, baseGamepadInfo);
    (0, _main.setUsingCustomControls)(i, false, baseGamepadInfo);
    (0, _controllermenu.updateControllerMenu)(false, ["Controller bindings have been reset.", "Click the start button to begin calibration."], 0);
    setTimeout(function () {
      return preCalibrationLoop(i, j, baseGamepadInfo, interval);
    }, 16);
  } else if (clickObject === "center") {
    saveSound();
    (0, _main.setControllerReset)(i);
    (0, _controllermenu.updateControllerMenu)(false, ["Controller has been re-centered.", "Click the start button to continue calibration."], 0);
    setTimeout(function () {
      return preCalibrationLoop(i, j, gamepadInfo, interval);
    }, 16);
    totalInterval = 16;
  } else if (clickObject === "loadCustom") {
    if (clickObjectNumber === 0) {
      (0, _controllermenu.setCustomInUse)(0);
      var _baseGamepadInfo2 = resetGamepadInfo(j);
      (0, _main.setUsingCustomControls)(i, false, _baseGamepadInfo2);
      (0, _controllermenu.updateControllerMenu)(false, ["Now using default controller bindings.", "Click the start button to begin calibration."], 0);
      setTimeout(function () {
        return preCalibrationLoop(i, j, _baseGamepadInfo2, interval);
      }, 16);
    } else {
      var newCustomGamepadInfo = (0, _custom.getCustomGamepadInfo)(clickObjectNumber);
      if (newCustomGamepadInfo === null || customGamepadInfoIsUsable[clickObjectNumber] !== true) {
        _sfx.sounds.deny.play();
        setTimeout(function () {
          return preCalibrationLoop(i, j, gamepadInfo, interval);
        }, 16);
      } else {
        var newGamepadInfo = newCustomGamepadInfo.gamepadInfo;
        (0, _controllermenu.setCustomInUse)(clickObjectNumber);
        (0, _custom.setCustomGamepadInfo)(j, newGamepadInfo);
        (0, _main.setUsingCustomControls)(i, true);
        (0, _controllermenu.updateControllerMenu)(false, ["Now using custom bindings #" + clickObjectNumber + ".", "Click the start button to begin calibration."], 0);
        setTimeout(function () {
          return preCalibrationLoop(i, j, newGamepadInfo, interval);
        }, 16);
      }
    }
  } else if (clickObject === "saveCustom") {
    if (clickObjectNumber < 1) {
      _sfx.sounds.deny.play();
    } else {
      customGamepadInfoIsUsable[clickObjectNumber] = true;
      (0, _custom.storeCustomGamepadInfo)(gamepadInfo, (0, _gamepad.getGamepad)(j).id, "custom" + clickObjectNumber, clickObjectNumber);
      (0, _controllermenu.setCustomInUse)(clickObjectNumber);
    }
  } else if (clickObject === "l" || clickObject === "r") {
    texts = ["Fully depress " + clickObject.toUpperCase() + " trigger.", "Keep holding down the trigger."];
    var t = clickObject; // passed as-is in the closure
    var tA = clickObject + "A";
    (0, _controllermenu.updateControllerMenu)(false, texts, interval);
    setTimeout(function () {
      saveSound();
      gamepad = (0, _gamepad.getGamepad)(j);
      gamepadInfo[t] = scanForButton(snapshots.b0, gamepad.buttons, snapshots.a0, gamepad.axes, true);
      gamepadInfo[tA] = scanForTrigger(snapshots.b0, gamepad.buttons, snapshots.a0, gamepad.axes);
      (0, _controllermenu.updateControllerMenu)(false, defaultTexts, 0);
      if (t === "l" && gamepadInfo.lA !== null && (gamepadInfo.lA.kind === "value" || gamepadInfo.lA.kind === "axis")) {
        gamepadInfo.isGC = Math.abs(gamepadInfo.lA.min + 0.866) < 0.01 ? true : false; // hacky but hey
      }
    }, interval);
  } else if (clickObject === "ls" || clickObject === "cs" || clickObject === "dpad") {
    var sep = ",";
    if (clickObject === "ls") {
      texts = ["Move left analog stick all the way ", "and keep it there."];
    } else if (clickObject === "cs") {
      texts = ["Move c-stick all the way ", "and keep it there."];
    } else {
      sep = ".";
      texts = ["Press and hold d-pad "];
    }
    totalInterval += 5 * interval;
    (0, _controllermenu.updateControllerMenu)(false, [texts[0] + "left" + sep, texts[1]], 1.5 * interval);
    setTimeout(function () {
      saveSound();
      gamepad = (0, _gamepad.getGamepad)(j);
      snapshots.bL = (0, _deepCopy.deepCopyArray)(true, gamepad.buttons);
      snapshots.aL = (0, _deepCopy.deepCopyArray)(true, gamepad.axes);
      (0, _controllermenu.updateControllerMenu)(false, [texts[0] + "right" + sep, texts[1]], 1.5 * interval);
    }, 1.5 * interval);
    setTimeout(function () {
      saveSound();
      gamepad = (0, _gamepad.getGamepad)(j);
      snapshots.bR = (0, _deepCopy.deepCopyArray)(true, gamepad.buttons);
      snapshots.aR = (0, _deepCopy.deepCopyArray)(true, gamepad.axes);
      (0, _controllermenu.updateControllerMenu)(false, [texts[0] + "up" + sep, texts[1]], 1.5 * interval);
    }, 3 * interval);
    setTimeout(function () {
      saveSound();
      gamepad = (0, _gamepad.getGamepad)(j);
      snapshots.bU = (0, _deepCopy.deepCopyArray)(true, gamepad.buttons);
      snapshots.aU = (0, _deepCopy.deepCopyArray)(true, gamepad.axes);
      (0, _controllermenu.updateControllerMenu)(false, [texts[0] + "down" + sep, texts[1]], 1.5 * interval);
    }, 4.5 * interval);
    if (clickObject === "dpad") {
      setTimeout(function () {
        saveSound();
        gamepad = (0, _gamepad.getGamepad)(j);
        gamepadInfo.dpad = scanForDPad(snapshots.b0, snapshots.bL, snapshots.bR, snapshots.bU, gamepad.buttons, snapshots.a0, snapshots.aL, snapshots.aR, snapshots.aU, gamepad.axes);
        (0, _controllermenu.updateControllerMenu)(false, defaultTexts, 0);
      }, 6 * interval);
    } else {
      var clickNow = clickObject; // passed as-is in the closure
      setTimeout(function () {
        saveSound();
        gamepad = (0, _gamepad.getGamepad)(j);
        gamepadInfo[clickNow] = scanForStick(snapshots.b0, snapshots.bL, snapshots.bR, snapshots.bU, gamepad.buttons, snapshots.a0, snapshots.aL, snapshots.aR, snapshots.aU, gamepad.axes);
        (0, _controllermenu.updateControllerMenu)(false, defaultTexts, 0);
      }, 6 * interval);
    }
  } else {
    // only plain buttons left now
    var buttonName = clickObject === "s" ? "start" : clickObject.toUpperCase();
    texts = ["Press and hold " + buttonName + "."];
    var _clickNow = clickObject;
    (0, _controllermenu.updateControllerMenu)(false, texts, interval);
    setTimeout(function () {
      saveSound();
      gamepad = (0, _gamepad.getGamepad)(j);
      gamepadInfo[_clickNow] = scanForButton(snapshots.b0, gamepad.buttons, snapshots.a0, gamepad.axes);
      (0, _controllermenu.updateControllerMenu)(false, defaultTexts, 0);
    }, interval);
  }

  if (clickObject !== "exit" && clickObject !== "reset" && clickObject !== "center" && clickObject !== "loadCustom") {
    if (clickObject !== null) {
      _sfx.sounds.blunthit.play();
      setTimeout(function () {
        (0, _custom.setCustomGamepadInfo)(j, gamepadInfo);
        calibrationLoop(i, j, gamepadInfo, snapshots, interval);
      }, totalInterval);
    } else {
      setTimeout(function () {
        calibrationLoop(i, j, gamepadInfo, snapshots, interval);
      }, totalInterval);
    }
  }

  if (clickObject !== null && clickObject !== "saveCustom" && clickObject !== "loadCustom" && clickObject !== "center" && clickObject !== "icon" && clickObject !== "exit" && clickObject !== "reset") {
    (0, _controllermenu.setCustomInUse)(null);
  }

  if (clickObject !== null) {
    clickObject = null;
  }
}

function scanForButton(buttons0, buttons1, axes0, axes1) {
  var onlyPressed = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;


  var buttonInfo = null;

  var bLg = buttons1.length;
  for (var i = 0; i < bLg; i++) {
    if (detectedButtonPressed(buttons0[i].pressed, buttons1[i].pressed)) {
      buttonInfo = { kind: "pressed", index: i };
      break;
    } else if (!onlyPressed && detectedButtonValue(buttons0[i].value, buttons1[i].value)) {
      buttonInfo = { kind: "value", index: i, threshold: 0.75 };
      break;
    }
  }

  if (!onlyPressed && buttonInfo === null) {
    var aLg = axes1.length;
    for (var j = 0; j < aLg; j++) {
      if (detectedButtonValue(axes0[j], axes1[j])) {
        buttonInfo = { kind: "axis", index: j, threshold: 0.75 };
        break;
      }
    }
  }

  return buttonInfo;
};

function detectedButtonPressed(pressed0, pressed1) {
  return pressed1 && !pressed0;
};

function detectedButtonValue(value0, value1) {
  return value0 < 0.25 && value1 > 0.75;
};

function scanForTrigger(buttons0, buttons1, axes0, axes1) {
  var minMax = void 0;
  var triggerInfo = null;

  var aLg = axes1.length;
  for (var i = 0; i < aLg && triggerInfo === null; i++) {
    minMax = detectedTrigger(axes0[i], axes1[i]);
    if (minMax !== null) {
      triggerInfo = { kind: "axis", index: i, min: minMax[0], max: minMax[1] };
      break;
    }
  }

  if (triggerInfo === null) {
    var bLg = buttons1.length;
    for (var j = 0; j < bLg && triggerInfo === null; j++) {
      minMax = detectedTrigger(buttons0[j].value, buttons1[j].value);
      if (minMax !== null) {
        triggerInfo = { kind: "value", index: j, min: minMax[0], max: minMax[1] };
        break;
      }
    }
  }

  return triggerInfo;
}

function detectedTrigger(axis0, axis1) {
  if (Math.abs(axis1 - axis0) < 0.5) {
    return null;
  } else {
    return getMinAndMax(axis0, axis1);
  }
}

function getMinAndMax(axis0, axis1) {
  var min = axis0 < -0.87 ? -1 : axis0 < -0.5 ? -0.866 : axis0 > 0.87 ? 1 : axis0 > 0.5 ? 0.8667 : 0;
  var max = min === 0 ? Math.sign(axis1) : -min;
  return [min, max];
}

function scanForStick(buttons0, buttonsL, buttonsR, buttonsU, buttonsD, axes0, axesL, axesR, axesU, axesD) {
  var stickInfo = null;

  var xDiff = 0;
  var yDiff = 0;
  var newXDiff = 0;
  var newYDiff = 0;
  var xIndex = void 0;
  var yIndex = void 0;
  var kind = void 0;
  var cardinals = null;

  var aLg = axes0.length;
  kind = "axes";

  for (var i = 0; i < aLg; i++) {
    newXDiff = axesR[i] - axesL[i];
    if (Math.abs(newXDiff) > Math.abs(xDiff)) {
      xDiff = newXDiff;
      xIndex = i;
    }
    newYDiff = axesU[i] - axesD[i];
    if (Math.abs(newYDiff) > Math.abs(yDiff)) {
      yDiff = newYDiff;
      yIndex = i;
    }
  }
  if (xIndex !== undefined && yIndex !== undefined && Math.abs(xDiff) > 0.5 && Math.abs(yDiff) > 0.5) {
    cardinals = {
      center: new _Vec2D.Vec2D(axes0[xIndex], axes0[yIndex]),
      left: axesL[xIndex],
      right: axesR[xIndex],
      up: axesU[yIndex],
      down: axesD[yIndex]
    };
  }

  if (Math.abs(xDiff) < 0.5 || Math.abs(yDiff) < 0.5) {
    var bLg = buttons0.length;
    kind = "value";
    for (var j = 0; j < bLg; j++) {
      newXDiff = buttonsR[j].value - buttonsL[j].value;
      if (Math.abs(newXDiff) > Math.abs(xDiff)) {
        xDiff = newXDiff;
        xIndex = j;
      }
      newYDiff = buttonsU[j].value - buttonsD[j].value;
      if (Math.abs(newYDiff) > Math.abs(yDiff)) {
        yDiff = newYDiff;
        yIndex = j;
      }
    }
    if (xIndex !== undefined && yIndex !== undefined && Math.abs(xDiff) > 0.5 && Math.abs(yDiff) > 0.5) {
      cardinals = {
        center: new _Vec2D.Vec2D(buttons0[xIndex].value, buttons0[yIndex].value),
        left: buttonsL[xIndex].value,
        right: buttonsR[xIndex].value,
        up: buttonsU[yIndex].value,
        down: buttonsD[yIndex].value
      };
    }
  }

  if (xIndex !== undefined && yIndex !== undefined) {
    if (kind === "axes") {
      stickInfo = { kind: "axes", xIndex: xIndex, yIndex: yIndex, cardinals: cardinals };
    } else {
      stickInfo = { kind: "value", xIndex: xIndex, yIndex: yIndex, cardinals: cardinals };
    }
  }
  return stickInfo;
}

function scanForDPad(buttons0, buttonsL, buttonsR, buttonsU, buttonsD, axes0, axesL, axesR, axesU, axesD) {
  var dPadInfo = null;

  var bLg = buttons0.length;

  var lIndex = void 0;
  var rIndex = void 0;
  var uIndex = void 0;
  var dIndex = void 0;

  for (var i = 0; i < bLg; i++) {
    if (lIndex === undefined && detectedButtonPressed(buttons0[i].pressed, buttonsL[i].pressed)) {
      lIndex = i;
    }
    if (rIndex === undefined && detectedButtonPressed(buttons0[i].pressed, buttonsR[i].pressed)) {
      rIndex = i;
    }
    if (uIndex === undefined && detectedButtonPressed(buttons0[i].pressed, buttonsU[i].pressed)) {
      uIndex = i;
    }
    if (dIndex === undefined && detectedButtonPressed(buttons0[i].pressed, buttonsD[i].pressed)) {
      dIndex = i;
    }
  }

  if (lIndex !== undefined && rIndex !== undefined && uIndex !== undefined && dIndex !== undefined) {
    dPadInfo = {
      kind: "buttons",
      upIndex: uIndex, downIndex: dIndex,
      leftIndex: lIndex, rightIndex: rIndex
    };
  } else {
    var xDiff = 0;
    var yDiff = 0;
    var newXDiff = 0;
    var newYDiff = 0;
    var xIndex = void 0;
    var yIndex = void 0;

    var aLg = axes0.length;

    for (var _i = 0; _i < aLg; _i++) {
      newXDiff = axesR[_i] - axesL[_i];
      if (Math.abs(newXDiff) > Math.abs(xDiff)) {
        xDiff = newXDiff;
        xIndex = _i;
      }
      newYDiff = axesU[_i] - axesD[_i];
      if (Math.abs(newYDiff) > Math.abs(yDiff)) {
        yDiff = newYDiff;
        yIndex = _i;
      }
    }

    if (xIndex !== undefined && yIndex !== undefined) {

      if (Math.abs(xDiff) > 0.5 && Math.abs(yDiff) > 0.5 && xIndex !== yIndex) {
        dPadInfo = {
          kind: "2axes",
          xIndex: xIndex, yIndex: yIndex,
          xFlip: xDiff < 0, yFlip: yDiff < 0
        };
      } else {
        // lol
        dPadInfo = { kind: "axis", index: xIndex };
      }
    }
  }
  return dPadInfo;
}

//////////////////
// WEBPACK FOOTER
// ./src/input/gamepad/gamepadCalibration.js
// module id = 244
// module chunks = 1
//# sourceURL=webpack:///./src/input/gamepad/gamepadCalibration.js?