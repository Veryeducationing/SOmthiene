"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodeInput = encodeInput;
exports.decodeInput = decodeInput;

var _input = __webpack_require__(49);

var _meleeInputs = __webpack_require__(65);

function axisToByte(value) {
  if (value <= -1) {
    return 0;
  } else if (value >= 1) {
    return 255;
  } else {
    return Math.round((value + 1) * 255 / 2);
  }
}

function triggerToByte(value) {
  if (value <= 0) {
    return 0;
  } else if (value >= 1) {
    return 255;
  } else {
    return Math.round(value * 255);
  }
}

function byteToAxis(byte) {
  return (0, _meleeInputs.meleeRound)(byte * 2 / 255 - 1);
}

function byteToTrigger(byte) {
  return (0, _meleeInputs.meleeRound)(byte / 255);
}

function inputToBytes(input) {
  var byte0 = boolsToByte(input.a, input.b, input.x, input.y, input.s, input.z, input.l, input.r);
  var byte1 = boolsToByte(input.du, input.dr, input.dd, input.dl, false, false, false, false);
  var byte2 = axisToByte(input.lsX);
  var byte3 = axisToByte(input.lsY);
  var byte4 = axisToByte(input.csX);
  var byte5 = axisToByte(input.csY);
  var byte6 = triggerToByte(input.lA);
  var byte7 = triggerToByte(input.rA);
  return [byte0, byte1, byte2, byte3, byte4, byte5, byte6, byte7];
}

function bytesToInput(bytes) {
  var input = new _input.inputData();

  var bools0 = byteToBools(bytes[0]);
  input.a = bools0[0];
  input.b = bools0[1];
  input.x = bools0[2];
  input.y = bools0[3];
  input.s = bools0[4];
  input.z = bools0[5];
  input.l = bools0[6];
  input.r = bools0[7];
  var bools1 = byteToBools(bytes[1]);
  input.du = bools1[0];
  input.dr = bools1[1];
  input.dd = bools1[2];
  input.dl = bools1[3];
  input.lsX = byteToAxis(bytes[2]);
  input.lsY = byteToAxis(bytes[3]);
  input.csX = byteToAxis(bytes[4]);
  input.csY = byteToAxis(bytes[5]);
  input.lA = byteToTrigger(bytes[6]);
  input.rA = byteToTrigger(bytes[7]);

  return input;
}

function boolsToByte(b0, b1, b2, b3, b4, b5, b6, b7) {
  return b0 ? 128 : 0 + b1 ? 64 : 0 + b2 ? 32 : 0 + b3 ? 16 : 0 + b4 ? 8 : 0 + b5 ? 4 : 0 + b6 ? 2 : 0 + b7 ? 1 : 0;
}

function byteToBools(byte) {
  var digits = byte.toString(2).split("");
  var lg = digits.length;
  var leadingZeroes = [];
  if (lg < 8) {
    for (var i = 0; i < 8 - lg; i++) {
      leadingZeroes.push(0);
    }
    digits = leadingZeroes.concat(digits);
  } else if (lg > 8) {
    digits = digits.slice(0, 8);
  }
  return digits.map(function (d) {
    return d === "1" ? true : false;
  });
}

function bytesToString(bytes) {
  return String.fromCharCode(bytes[0] + 256 * bytes[1], bytes[2] + 256 * bytes[3], bytes[4] + 256 * bytes[5], bytes[6] + 256 * bytes[7]);
}

function stringToBytes(string) {
  var bytePairs = [string.charCodeAt(0), string.charCodeAt(1), string.charCodeAt(2), string.charCodeAt(3)];
  return bytePairs.map(bytePairToBytes).reduce(function (b0, b1) {
    return b0.concat(b1);
  });
}

function bytePairToBytes(bytePair) {
  var byte0 = bytePair % 256;
  return [byte0, Math.round((bytePair - byte0) / 256)];
}

function encodeInput(input) {
  return bytesToString(inputToBytes(input));
}

function decodeInput(string) {
  return bytesToInput(stringToBytes(string));
}

//////////////////
// WEBPACK FOOTER
// ./src/main/multiplayer/encode.js
// module id = 86
// module chunks = 1
//# sourceURL=webpack:///./src/main/multiplayer/encode.js?