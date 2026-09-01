"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customGamepadInfo = undefined;
exports.setCustomGamepadInfo = setCustomGamepadInfo;
exports.storeCustomGamepadInfo = storeCustomGamepadInfo;
exports.getCustomGamepadInfo = getCustomGamepadInfo;

var _main = __webpack_require__(11);

var customGamepadInfo = exports.customGamepadInfo = [null, null, null, null];

function setCustomGamepadInfo(i, gamepadInfo) {
  customGamepadInfo[i] = gamepadInfo;
}

function storeCustomGamepadInfo(gamepadInfo, fullID, name, slot) {
  var customGamepadInfo = { gamepadInfo: gamepadInfo, fullID: fullID, name: name };
  (0, _main.setCookie)("customGamepad" + slot, JSON.stringify(customGamepadInfo), 365);
}

function getCustomGamepadInfo(slot) {
  var cookie = (0, _main.getCookie)("customGamepad" + slot);
  if (cookie === null || cookie === undefined || cookie === '') {
    return null;
  } else {
    var _customGamepadInfo = JSON.parse(cookie);
    if (_customGamepadInfo === undefined) {
      return null;
    } else {
      return _customGamepadInfo;
    }
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/input/gamepad/gamepads/custom.js
// module id = 249
// module chunks = 1
//# sourceURL=webpack:///./src/input/gamepad/gamepads/custom.js?