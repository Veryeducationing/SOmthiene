"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyboardMap = exports.aiInputBank = exports.aiPlayer4 = exports.aiPlayer3 = exports.aiPlayer2 = exports.aiPlayer1 = exports.nullInputs = exports.nullInput = undefined;
exports.inputData = inputData;
exports.pollInputs = pollInputs;
exports.showButton = showButton;
exports.setCustomCenters = setCustomCenters;

var _Vec2D = __webpack_require__(22);

var _settings = __webpack_require__(14);

var _main = __webpack_require__(11);

var _retrieveGamepadInputs = __webpack_require__(50);

var _gamepadInfoList = __webpack_require__(51);

var _meleeInputs = __webpack_require__(65);

var _jquery = __webpack_require__(1);

var _jquery2 = _interopRequireDefault(_jquery);

var _replay = __webpack_require__(66);

var _streamclient = __webpack_require__(48);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inputData() {
  var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [false, false, false, false, false, false, false, false, false, false, false, false, 0, 0, 0, 0, 0, 0];

  return {
    a: list[0],
    b: list[1],
    x: list[2],
    y: list[3],
    z: list[4],
    r: list[5],
    l: list[6],
    s: list[7],
    du: list[8],
    dr: list[9],
    dd: list[10],
    dl: list[11],
    lsX: (0, _meleeInputs.deaden)(list[12]),
    lsY: (0, _meleeInputs.deaden)(list[13]),
    csX: (0, _meleeInputs.deaden)(list[14]),
    csY: (0, _meleeInputs.deaden)(list[15]),
    lA: list[16],
    rA: list[17],
    rawX: list[12],
    rawY: list[13],
    rawcsX: list[14],
    rawcsY: list[15]
  };
} /*eslint indent:0*/


;

var nullInput = exports.nullInput = function nullInput() {
  return new inputData();
};

var nullInputs = exports.nullInputs = function nullInputs() {
  return [new inputData(), new inputData(), new inputData(), new inputData(), new inputData(), new inputData(), new inputData(), new inputData()];
};
var aiPlayer1 = exports.aiPlayer1 = [new inputData(), new inputData(), new inputData(), new inputData(), new inputData(), new inputData(), new inputData(), new inputData()];
var aiPlayer2 = exports.aiPlayer2 = [new inputData(), new inputData(), new inputData(), new inputData(), new inputData(), new inputData(), new inputData(), new inputData()];
var aiPlayer3 = exports.aiPlayer3 = [new inputData(), new inputData(), new inputData(), new inputData(), new inputData(), new inputData(), new inputData(), new inputData()];

var aiPlayer4 = exports.aiPlayer4 = [new inputData(), new inputData(), new inputData(), new inputData(), new inputData(), new inputData(), new inputData(), new inputData()];

var aiInputBank = exports.aiInputBank = [aiPlayer1, aiPlayer2, aiPlayer3, aiPlayer4];

// should be able to move out the "frameByFrame" aspect of the following function
// it is only used to make z button mean "left trigger value = 0.35" + "A = true".
function pollInputs(gameMode, frameByFrame, controllerInfo, playerSlot, controllerIndex, keys, playertype) {
  // input is the input for player i in the current frame
  var input = nullInput(); // initialise with default values
  if (_replay.replayActive) {
    input = pollReplayInputs(gameMode, controllerInfo, playerSlot, controllerIndex, frameByFrame);
  } else if (playertype === 1 && gameMode === 3) {
    return aiInputBank[playerSlot][0];
  } else if (controllerInfo === "keyboard") {
    // keyboard controls
    input = pollKeyboardInputs(gameMode, frameByFrame, keys);
  } else if (playertype === 2 || controllerInfo === 99) {
    input = pollNetworkInputs(gameMode, controllerInfo, playerSlot, controllerIndex, frameByFrame);
  } else if (playertype === 0) {
    input = pollGamepadInputs(gameMode, controllerInfo, playerSlot, controllerIndex, frameByFrame);
  }
  return input;
}

function pollNetworkInputs(gameMode, controllerType, playerSlot, controllerIndex, frameByFrame) {
  return (0, _streamclient.retrieveNetworkInputs)(playerSlot, controllerIndex);
}

function pollReplayInputs(gameMode, controllerType, playerSlot, controllerIndex, frameByFrame) {
  return (0, _replay.retrieveReplayInputs)(playerSlot, controllerIndex);
}

function pollKeyboardInputs(gameMode, frameByFrame, keys) {
  var input = nullInput(); // initialise with default values

  var stickR = 1;
  var stickL = 1;
  var stickU = 1;
  var stickD = 1;
  if (gameMode === 3 || gameMode === 5) {
    stickR = _settings.keyMap.lstick.ranges[1];
    stickL = _settings.keyMap.lstick.ranges[2];
    stickU = _settings.keyMap.lstick.ranges[0];
    stickD = _settings.keyMap.lstick.ranges[3];
  }
  var lstickX = keys[_settings.keyMap.lstick.right[0]] || keys[_settings.keyMap.lstick.right[1]] ? keys[_settings.keyMap.lstick.left[0]] || keys[_settings.keyMap.lstick.left[1]] ? 0 : stickR : keys[_settings.keyMap.lstick.left[0]] || keys[_settings.keyMap.lstick.left[1]] ? -stickL : 0;
  var lstickY = keys[_settings.keyMap.lstick.up[0]] || keys[_settings.keyMap.lstick.up[1]] ? keys[_settings.keyMap.lstick.down[0]] || keys[_settings.keyMap.lstick.down[1]] ? 0 : stickU : keys[_settings.keyMap.lstick.down[0]] || keys[_settings.keyMap.lstick.down[1]] ? -stickD : 0;

  var lAnalog = keys[_settings.keyMap.shoulders.lAnalog[0]] || keys[_settings.keyMap.shoulders.lAnalog[1]] ? _settings.keyMap.shoulders.ranges[0] : 0;
  var rAnalog = keys[_settings.keyMap.shoulders.rAnalog[0]] || keys[_settings.keyMap.shoulders.rAnalog[1]] ? _settings.keyMap.shoulders.ranges[1] : 0;
  if (gameMode === 3 || gameMode === 5) {
    for (var j = 0; j < 5; j++) {
      if (keys[_settings.keyMap.lstick.modifiers[j][0]]) {
        lstickX *= _settings.keyMap.lstick.modifiers[j][1];
        lstickY *= _settings.keyMap.lstick.modifiers[j][2];
      }
      if (keys[_settings.keyMap.shoulders.modifiers[j][0]]) {
        lAnalog *= _settings.keyMap.shoulders.modifiers[j][1];
        rAnalog *= _settings.keyMap.shoulders.modifiers[j][2];
      }
    }
  }
  lstickX = Math.sign(lstickX) * Math.min(1, Math.abs(lstickX));
  lstickY = Math.sign(lstickY) * Math.min(1, Math.abs(lstickY));
  lAnalog = Math.min(1, Math.abs(lAnalog));
  rAnalog = Math.min(1, Math.abs(rAnalog));

  var cstickX = keys[_settings.keyMap.cstick.right[0]] || keys[_settings.keyMap.cstick.right[1]] ? keys[_settings.keyMap.cstick.left[0]] || keys[_settings.keyMap.cstick.left[1]] ? 0 : 1 : keys[_settings.keyMap.cstick.left[0]] || keys[_settings.keyMap.cstick.left[1]] ? -1 : 0;
  var cstickY = keys[_settings.keyMap.cstick.up[0]] || keys[_settings.keyMap.cstick.up[1]] ? keys[_settings.keyMap.cstick.down[0]] || keys[_settings.keyMap.cstick.down[1]] ? 0 : 1 : keys[_settings.keyMap.cstick.down[0]] || keys[_settings.keyMap.cstick.down[1]] ? -1 : 0;

  var rescaledLStick = (0, _meleeInputs.tasRescale)(lstickX, lstickY, true);
  input.lsX = (0, _meleeInputs.deaden)(rescaledLStick[0]);
  input.lsY = (0, _meleeInputs.deaden)(rescaledLStick[1]);
  input.rawX = rescaledLStick[0];
  input.rawY = rescaledLStick[1];
  var rescaledCStick = (0, _meleeInputs.tasRescale)(cstickX, cstickY, true);
  input.csX = (0, _meleeInputs.deaden)(rescaledCStick[0]);
  input.csY = (0, _meleeInputs.deaden)(rescaledCStick[1]);
  input.rawcsX = rescaledCStick[0];
  input.rawcsY = rescaledCStick[1];
  input.lA = lAnalog;
  input.rA = rAnalog;
  input.s = keys[_settings.keyMap.s[0]] || keys[_settings.keyMap.s[1]];
  input.x = keys[_settings.keyMap.x[0]] || keys[_settings.keyMap.x[1]];
  input.a = keys[_settings.keyMap.a[0]] || keys[_settings.keyMap.a[1]];
  input.b = keys[_settings.keyMap.b[0]] || keys[_settings.keyMap.b[1]];
  input.y = keys[_settings.keyMap.y[0]] || keys[_settings.keyMap.y[1]];
  input.r = keys[_settings.keyMap.r[0]] || keys[_settings.keyMap.r[1]];
  input.l = keys[_settings.keyMap.l[0]] || keys[_settings.keyMap.l[1]];
  input.z = keys[_settings.keyMap.z[0]] || keys[_settings.keyMap.z[1]];
  input.dl = keys[_settings.keyMap.dl[0]];
  input.dd = keys[_settings.keyMap.dd[0]];
  input.dr = keys[_settings.keyMap.dr[0]];
  input.du = keys[_settings.keyMap.du[0]];

  if (!frameByFrame && gameMode !== 4 && gameMode !== 14) {
    // not in target builder, calibration screen, or frame by frame mode
    if (input.z) {
      if (input.lA < 0.35) {
        input.lA = 0.35;
      }
      input.a = true;
    }
  }

  if (input.l) {
    input.lA = 1;
  }
  if (input.r) {
    input.rA = 1;
  }

  return input;
}

function pollGamepadInputs(gameMode, gamepadInfo, playerSlot, controllerIndex, frameByFrame) {

  var input = nullInput();

  if (navigator.getGamepads === undefined) {
    return input;
  }
  var gamepads = navigator.getGamepads();
  var gamepad = gamepads[controllerIndex];
  if (gamepad === null || gamepad === undefined) {
    return input;
  }

  // -------------------------------------------------------
  // analog sticks

  var lsVec = (0, _retrieveGamepadInputs.stickValue)(gamepad, gamepadInfo, "ls");
  var csVec = (0, _retrieveGamepadInputs.stickValue)(gamepad, gamepadInfo, "cs");
  var isGC = gamepadInfo.isGC;

  var lsCardinals = null;
  if (gamepadInfo.ls !== null) {
    lsCardinals = gamepadInfo.ls.cardinals;
  }
  var csCardinals = null;
  if (gamepadInfo.cs !== null) {
    csCardinals = gamepadInfo.cs.cardinals;
  }

  var lsticks = (0, _meleeInputs.scaleToMeleeAxes)(lsVec.x // x-axis data
  , lsVec.y // y-axis data
  , isGC, lsCardinals, custcent[playerSlot].ls.x // x-axis "custom center" offset
  , custcent[playerSlot].ls.y // y-axis "custom center" offset
  );
  var csticks = (0, _meleeInputs.scaleToMeleeAxes)(csVec.x, csVec.y, isGC, csCardinals, custcent[playerSlot].cs.x, custcent[playerSlot].cs.y);
  input.lsX = (0, _meleeInputs.deaden)(lsticks[0]);
  input.lsY = (0, _meleeInputs.deaden)(lsticks[1]);
  input.csX = (0, _meleeInputs.deaden)(csticks[0]);
  input.csY = (0, _meleeInputs.deaden)(csticks[1]);
  input.rawX = lsticks[0];
  input.rawY = lsticks[1];
  input.rawcsX = csticks[0];
  input.rawcsY = csticks[1];

  // -------------------------------------------------------
  // buttons

  input.s = (0, _retrieveGamepadInputs.buttonState)(gamepad, gamepadInfo, "s");
  input.x = (0, _retrieveGamepadInputs.buttonState)(gamepad, gamepadInfo, "x");
  input.a = (0, _retrieveGamepadInputs.buttonState)(gamepad, gamepadInfo, "a");
  input.b = (0, _retrieveGamepadInputs.buttonState)(gamepad, gamepadInfo, "b");
  input.y = (0, _retrieveGamepadInputs.buttonState)(gamepad, gamepadInfo, "y");
  input.z = (0, _retrieveGamepadInputs.buttonState)(gamepad, gamepadInfo, "z");

  // -------------------------------------------------------
  // triggers

  input.l = (0, _retrieveGamepadInputs.buttonState)(gamepad, gamepadInfo, "l");
  input.r = (0, _retrieveGamepadInputs.buttonState)(gamepad, gamepadInfo, "r");

  if (gamepadInfo.lA !== null) {
    var _lA = gamepadInfo.lA;
    if (_lA.kind === "light") {
      input.lA = (0, _retrieveGamepadInputs.triggerValue)(gamepad, gamepadInfo, "lA");
    } else {
      input.lA = (0, _meleeInputs.scaleToGCTrigger)((0, _retrieveGamepadInputs.triggerValue)(gamepad, gamepadInfo, "lA") // raw trigger value
      , -_lA.min - custcent[playerSlot].l // offset
      , _lA.max - _lA.min // scaling
      );
    }
  }

  if (gamepadInfo.rA !== null) {
    var _rA = gamepadInfo.rA;
    if (_rA.kind === "light") {
      input.rA = (0, _retrieveGamepadInputs.triggerValue)(gamepad, gamepadInfo, "rA");
    } else {
      input.rA = (0, _meleeInputs.scaleToGCTrigger)((0, _retrieveGamepadInputs.triggerValue)(gamepad, gamepadInfo, "rA") // raw trigger value
      , -_rA.min - custcent[playerSlot].r // offset
      , _rA.max - _rA.min // scaling
      );
    }
  }

  if (_main.controllerResetCountdowns[playerSlot] === 0) {
    setCustomCenters(playerSlot, lsVec, csVec, input.lA, input.rA);
  }

  if (!frameByFrame && gameMode !== 4 && gameMode !== 14) {
    // not in target builder or calibration screen
    if (input.z) {
      if (input.lA < 0.35) {
        input.lA = 0.35;
      }
      input.a = true;
    }
  }

  if (gameMode !== 14) {
    if (input.l) {
      input.lA = 1;
    }
    if (input.r) {
      input.rA = 1;
    }

    if (input.lA > 0.95) {
      input.l = true;
    }
    if (input.rA > 0.95) {
      input.r = true;
    }
  }

  // -------------------------------------------------------
  // d-pad

  var dPadData = (0, _retrieveGamepadInputs.dPadState)(gamepad, gamepadInfo);
  input.dl = dPadData.left;
  input.dd = dPadData.down;
  input.dr = dPadData.right;
  input.du = dPadData.up;

  return input;
};

function showButton(i, but, bool) {
  if (bool) {
    (0, _jquery2.default)("#" + i + "button" + but).show();
  } else {
    (0, _jquery2.default)("#" + i + "button" + but).hide();
  }
};

var keyboardMap = exports.keyboardMap = [[102, 186], [101, 76], [100, 75], [104, 79], [103, 73], [105, 80], [107, 192, 222], [109, 219], 71, 78, 66, 86];

var customCenters = function customCenters() {
  this.ls = new _Vec2D.Vec2D(0, 0);
  this.cs = new _Vec2D.Vec2D(0, 0);
  this.l = 0;
  this.r = 0;
};

var custcent = [new customCenters(), new customCenters(), new customCenters(), new customCenters()];

function setCustomCenters(i, ls0, cs0, l0, r0) {
  custcent[i].ls = ls0;
  custcent[i].cs = cs0;
  custcent[i].l = l0;
  custcent[i].r = r0;
}

//////////////////
// WEBPACK FOOTER
// ./src/input/input.js
// module id = 49
// module chunks = 1
//# sourceURL=webpack:///./src/input/input.js?