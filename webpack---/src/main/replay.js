"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playingReplay = exports.replaysOn = exports.gameTickDelay = exports.replayActive = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.updateGameTickDelay = updateGameTickDelay;
exports.saveGameState = saveGameState;
exports.loadReplay = loadReplay;
exports.retrieveReplayInputs = retrieveReplayInputs;
exports.isObject = isObject;
exports.default = mergeDeep;

var _main = __webpack_require__(11);

var _deepCopyObject = __webpack_require__(67);

var _pako = __webpack_require__(68);

var _pako2 = _interopRequireDefault(_pako);

var _jquery = __webpack_require__(1);

var _jquery2 = _interopRequireDefault(_jquery);

var _localforage = __webpack_require__(84);

var _localforage2 = _interopRequireDefault(_localforage);

var _input = __webpack_require__(49);

var _deepCopy = __webpack_require__(85);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fullGameState = {};
fullGameState.inputs = [];
fullGameState.playerData = [];
var frameCount = 0;
var snapShot = [];
var replayActive = exports.replayActive = false;
var result = [];
var playingFrame = 0;
var replayInputs = [];
var replayPlayerData = [];
var replayFrameData = [];
var lastFrametime = performance.now();
var gameTickDelay = exports.gameTickDelay = 0;
var replaysOn = exports.replaysOn = localStorage.getItem('replayson') || false;
var playingReplay = exports.playingReplay = false;
(0, _jquery2.default)("#replayson").on("click", function () {
  exports.replaysOn = replaysOn = !replaysOn;
  localStorage.setItem('replayson', replaysOn);
  (0, _jquery2.default)("#replayson").attr('checked', replaysOn);
});

(0, _jquery2.default)("#replayson").attr('checked', replaysOn);

function updateGameTickDelay(val) {
  exports.gameTickDelay = gameTickDelay = val;
}
var prevFramePlayer = [];

function compressObject(obj) {
  return _pako2.default.deflate(JSON.stringify(obj));
}
function decompressObject(obj) {
  return JSON.parse(_pako2.default.inflate(obj, { to: "string" }));
}
function saveGameState(input) {
  if (!playingReplay) {
    if (_main.playing && replaysOn && !_main.starting && !_main.pause[0][0]) {
      var now = performance.now();
      var frameDelay = now - lastFrametime;
      lastFrametime = now;
      for (var i = 0; i < _main.playerType.length; i++) {

        if (_main.playerType[i] === 1) {
          fullGameState.inputs[i] = (0, _deepCopyObject.deepObjectMerge)(true, {}, _input.aiInputBank[i][0]);
        } else if (_main.playerType[i] === 0) {
          fullGameState.inputs[i] = (0, _deepCopyObject.deepObjectMerge)(true, {}, input[i][0]);
        } else if (_main.playerType[i] === 2) {
          fullGameState.inputs[i] = (0, _deepCopyObject.deepObjectMerge)(true, {}, input[i][0]);
        }
        // const exclusions = ["charAttributes",
        //   "charHitboxes",
        //   "prevFrameHitboxes"];
        fullGameState.playerData[i] = _main.player[i].phys.pos;

        // prevFramePlayer[i] = deepObjectMerge(true, prevFramePlayer[i], player[i], exclusions);
      }
      // fullGameState.frameDelay = frameDelay;
      snapShot.push(compressObject({ frameCount: frameCount, fullGameState: fullGameState }));
      frameCount++;
    }
    if (!_main.playing && frameCount > 0 && replaysOn && _main.gameEnd) {
      frameCount = 0;
      var headerFrame = {};
      var replayname = 'replay-' + new Date() + '.json';
      var wholeReplay = [];
      wholeReplay.push(compressObject(_main.stageSelect));
      wholeReplay.push(compressObject(_main.playerType));
      wholeReplay.push(compressObject(_main.characterSelections));
      wholeReplay.push(snapShot);
      _localforage2.default.setItem(replayname, wholeReplay).then(function (value) {
        var resultAsUint8Array = void 0;
        _localforage2.default.getItem(replayname).then(function (value) {
          // This code runs once the value has been loaded
          // from the offline store.

          saveData(value, replayname);

          snapShot = [];
        }).catch(function (err) {
          // This code runs if there were any errors
          console.log(err);
        });
      }).catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
    }
  }
}
var saveData = function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (data, fileName) {
    var blob = new Blob([compressObject(data)], { type: "octet/stream" });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}();

function loadReplay(file) {

  var reader = new FileReader();

  reader.onload = function (event) {

    var decompressed = decompressObject(event.currentTarget.result);

    exports.replayActive = replayActive = true;
    (0, _main.setStageSelect)(decompressObject(decompressed[0]));

    var deplayerTypes = decompressObject(decompressed[1]);

    //ASSUMING PLAYER 1 IS ALWAYS POPULATED
    for (var j = 1; j < deplayerTypes.length; j++) {
      if (deplayerTypes[j] !== -1) {
        if (_main.ports < j + 1) {
          (0, _main.addPlayer)(j, 0);
        }
      }
    }

    var decharacterSelections = decompressObject(decompressed[2]);
    for (var _j = 0; _j < decharacterSelections.length; _j++) {
      (0, _main.setCS)(_j, decharacterSelections[_j]);
    }
    var replayInputPackage = decompressed[3];
    for (var n = 0; n < replayInputPackage.length; n++) {
      var stateData = decompressObject(replayInputPackage[n]);
      replayInputs.push(stateData.fullGameState.inputs);
      replayPlayerData.push(stateData.fullGameState.playerData);
      // replayFrameData.push(stateData.fullGameState.frameDelay);
    }
    exports.playingReplay = playingReplay = true;
    (0, _main.startGame)();
  };
  reader.readAsBinaryString(file);
}

function retrieveReplayInputs(playerSlot) {
  if (replayInputs[playingFrame] === undefined) {
    exports.playingReplay = playingReplay = false;
    exports.replayActive = replayActive = false;
    (0, _main.finishGame)();
    return new _input.nullInput();
  }
  var returnInput = replayInputs[playingFrame][playerSlot];
  _main.player[playerSlot].phys.pos = replayPlayerData[playingFrame][playerSlot];
  if (playerSlot === _main.ports - 1) {
    playingFrame++;
  }
  // gameTickDelay = replayFrameData[playingFrame];
  return returnInput;
}

var isEmptyObject = function isEmptyObject(obj) {
  var name = void 0;
  for (name in obj) {
    return false;
  }
  return true;
};

var diff = function diff(obj1, obj2, exclusions) {
  var result = {};
  var change = void 0;
  for (var key in obj1) {
    if (_typeof(obj2[key]) === 'object' && _typeof(obj1[key]) === 'object' && exclusions.indexOf(key) === -1) {
      change = diff(obj1[key], obj2[key], exclusions);
      if (isEmptyObject(change) === false) {
        result[key] = change;
      }
    } else if (obj2[key] !== obj1[key]) {
      result[key] = obj2[key];
    }
  }
  return result;
};

function isObject(item) {
  return item && (typeof item === "undefined" ? "undefined" : _typeof(item)) === 'object' && !Array.isArray(item) && item !== null;
}

function mergeDeep(target, source) {
  var output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(function (key) {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, _defineProperty({}, key, source[key]));else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, _defineProperty({}, key, source[key]));
      }
    });
  }
  return output;
}

//////////////////
// WEBPACK FOOTER
// ./src/main/replay.js
// module id = 66
// module chunks = 1
//# sourceURL=webpack:///./src/main/replay.js?