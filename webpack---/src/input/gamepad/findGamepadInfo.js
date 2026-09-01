"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
/*eslint indent:0*/

exports.getGamepadNameAndInfo = getGamepadNameAndInfo;

var _gamepadInfoList = __webpack_require__(51);

function getGamepadNameAndInfo(identifier) {

  var name = null;
  var info = null;
  for (var i = 0; i < _gamepadInfoList.gamepadInfoList.length; i++) {
    for (var j = 0; j < _gamepadInfoList.gamepadInfoList[i].ids.length; j++) {
      if (checkAgainstGamepadID(identifier, _gamepadInfoList.gamepadInfoList[i].ids[j])) {
        name = _gamepadInfoList.gamepadInfoList[i].ids[j].name;
        info = _gamepadInfoList.gamepadInfoList[i];
        break;
      }
    }
  }

  if (name === null || info === null) {
    return null;
  } else {
    return [name, info];
  }
}

function checkAgainstGamepadID(identifier, gamepadID) {
  var matchedVP = false;
  if (gamepadID.vendor !== undefined && gamepadID.product !== undefined) {
    var _ref = [gamepadID.vendor, gamepadID.product],
        gpdVendor = _ref[0],
        gpdProduct = _ref[1];

    var vendorAndProduct = getVendorAndProduct(identifier, gamepadID.allowedIDType);
    if (vendorAndProduct !== null) {
      var _vendorAndProduct = _slicedToArray(vendorAndProduct, 2),
          vendor = _vendorAndProduct[0],
          product = _vendorAndProduct[1];

      matchedVP = match(vendor, gpdVendor) && match(product, gpdProduct);
    }
  }

  var matchedID = false;
  if (gamepadID.id !== null && gamepadID.id !== undefined) {
    var gpdID = gamepadID.id;
    var id = getID(identifier, gamepadID.allowedIDType);
    var l = gpdID.length;
    matchedID = gpdID.toLowerCase() === id.toLowerCase().substring(0, l);
  }

  return matchedVP || matchedID;
}

function removeZeroes(s) {
  if (s.length < 2) {
    return s;
  } else {
    var _ref2 = [s[0], s.substring(1)],
        head = _ref2[0],
        tail = _ref2[1];

    if (head === "0") {
      return removeZeroes(tail);
    } else {
      return s;
    }
  }
}

function match(s1, s2) {
  return removeZeroes(s1).toLowerCase() === removeZeroes(s2).toLowerCase();
}

// hacky functions to get name, vendor and product by munging strings

function getVendorAndProduct(identifier, allowedIDType) {
  var l = identifier.length;
  var vendor = null,
      product = null;

  var allowFirefox = allowedIDType === undefined || allowedIDType === null || allowedIDType === "Firefox";
  var allowChrome = allowedIDType === undefined || allowedIDType === null || allowedIDType === "Chrome";
  if (allowFirefox && l > 9 && identifier[4] === "-" && identifier[9] === "-") {
    var _ref3 = [identifier.substring(0, 4), identifier.substring(5, 9)];
    vendor = _ref3[0];
    product = _ref3[1];
  } else if (allowChrome && l > 27 && identifier[l - 1] === ")" && identifier[l - 28] === "(") {
    var _ref4 = [identifier.substring(l - 19, l - 15), identifier.substring(l - 5, l - 1)];
    vendor = _ref4[0];
    product = _ref4[1];
  }

  if (vendor === null || vendor === undefined || product === null || product === undefined) {
    return null;
  } else {
    return [vendor, product];
  }
}

function getID(identifier, allowedIDType) {
  var l = identifier.length;
  var id = identifier;
  var allowFirefox = allowedIDType === undefined || allowedIDType === null || allowedIDType === "Firefox";
  var allowChrome = allowedIDType === undefined || allowedIDType === null || allowedIDType === "Chrome";
  if (allowFirefox && l > 9 && identifier[4] === "-" && identifier[9] === "-") {
    id = identifier.substring(10);
  } else if (allowChrome && l > 28 && identifier[l - 1] === ")" && identifier[l - 28] === "(") {
    id = identifier.substring(0, l - 29);
  }
  return id;
}

//////////////////
// WEBPACK FOOTER
// ./src/input/gamepad/findGamepadInfo.js
// module id = 250
// module chunks = 1
//# sourceURL=webpack:///./src/input/gamepad/findGamepadInfo.js?