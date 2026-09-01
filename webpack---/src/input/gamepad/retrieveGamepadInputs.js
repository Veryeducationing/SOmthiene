"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buttonState = buttonState;
exports.triggerValue = triggerValue;
exports.stickValue = stickValue;
exports.dPadState = dPadState;

var _Vec2D = __webpack_require__(22);

function buttonState(gamepad, gamepadInfo, but) {
  var info = gamepadInfo[but];
  var state = false;
  if (info !== null && info !== undefined) {
    if (info.kind === "pressed" && info.index <= gamepad.buttons.length) {
      state = gamepad.buttons[info.index].pressed;
    } else if (info.kind === "value" && info.index <= gamepad.buttons.length) {
      state = gamepad.buttons[info.index].value > info.threshold;
    } else if (info.kind === "axis" && info.index <= gamepad.axes.length) {
      state = gamepad.axes[info.index] > info.threshold;
    }
  }

  if (state === null || state === undefined) {
    state = false;
  }
  return state;
}

;

function triggerValue(gamepad, gamepadInfo, trig) {
  var info = gamepadInfo[trig];
  var val = 0;
  if (info !== null && info !== undefined) {
    if (info.kind === "axis" && info.index <= gamepad.axes.length) {
      val = gamepad.axes[info.index];
    } else if (info.kind === "value" && info.index <= gamepad.buttons.length) {
      val = gamepad.buttons[info.index].value;
    } else if (info.kind === "light" && info.index <= gamepad.buttons.length) {
      val = gamepad.buttons[info.index].pressed ? 0.35 : 0;
    }
  }

  if (val === null || val === undefined) {
    val = 0;
  }
  return val;
}

function stickValue(gamepad, gamepadInfo, stick) {
  var info = gamepadInfo[stick];
  var x = 0;
  var y = 0;
  if (info !== null && info !== undefined) {
    var isGC = gamepadInfo.isGC;
    if (info.kind === "axes") {
      if (info.xIndex <= gamepad.axes.length) {
        x = gamepad.axes[info.xIndex];
      }
      if (info.yIndex <= gamepad.axes.length) {
        y = gamepad.axes[info.yIndex];
      }
    } else {
      if (info.xIndex <= gamepad.buttons.length) {
        x = gamepad.buttons[info.xIndex].value;
      }
      if (info.yIndex <= gamepad.buttons.length) {
        y = gamepad.buttons[info.yIndex].value;
      }
    }
  }

  if (x === null || x === undefined) {
    x = 0;
  }
  if (y === null || y === undefined) {
    y = 0;
  }
  return new _Vec2D.Vec2D(x, y);
}

function dPadState(gamepad, gamepadInfo) {
  var info = gamepadInfo.dpad;
  var up = false;
  var down = false;
  var left = false;
  var right = false;
  if (info !== null && info !== undefined) {
    if (info.kind === "buttons") {
      var butts = gamepad.buttons;
      var l = gamepad.buttons.length;
      if (info.upIndex <= l) {
        up = butts[info.upIndex].pressed;
      }
      if (info.downIndex <= l) {
        down = butts[info.downIndex].pressed;
      }
      if (info.leftIndex <= l) {
        left = butts[info.leftIndex].pressed;
      }
      if (info.rightIndex <= l) {
        right = butts[info.rightIndex].pressed;
      }
    } else if (info.kind === "2axes") {
      if (info.xIndex <= gamepad.axes.length) {
        var x = gamepad.axes[info.xIndex];
        if (info.xFlip && x < -0.3 || !info.xFlip && x > 0.3) {
          right = true;
        }
        if (info.xFlip && x > 0.3 || !info.xFlip && x < -0.3) {
          left = true;
        }
      }
      if (info.yIndex <= gamepad.axes.length) {
        var y = gamepad.axes[info.yIndex];
        if (info.yFlip && y < -0.3 || !info.yFlip && y > 0.3) {
          up = true;
        }
        if (info.yFlip && y > 0.3 || !info.yFlip && y < -0.3) {
          down = true;
        }
      }
    } else if (info.kind === "axis") {
      // oh boy
      if (info.index <= gamepad.axes.length) {
        var val = gamepad.axes[info.index];
        left = val > 0.3 && val < 1.1;
        right = val > -0.8 && val < 0;
        down = val > -0.2 && val < 0.5;
        up = val < -0.5 || val > 0.9 && val < 1.1;
      }
    }
  }

  if (up === null || up === undefined) {
    up = false;
  }
  if (down === null || down === undefined) {
    down = false;
  }
  if (left === null || left === undefined) {
    left = false;
  }
  if (right === null || right === undefined) {
    right = false;
  }
  return { up: up, down: down, left: left, right: right };
}

//////////////////
// WEBPACK FOOTER
// ./src/input/gamepad/retrieveGamepadInputs.js
// module id = 50
// module chunks = 1
//# sourceURL=webpack:///./src/input/gamepad/retrieveGamepadInputs.js?