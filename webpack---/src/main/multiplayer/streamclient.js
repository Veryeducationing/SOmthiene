"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.giveInputs = exports.meHost = exports.inServerMode = exports.HOST_GAME_ID = undefined;
exports.logIntoServer = logIntoServer;
exports.setNetInputFlag = setNetInputFlag;
exports.updateNetworkInputs = updateNetworkInputs;
exports.saveNetworkInputs = saveNetworkInputs;
exports.retrieveNetworkInputs = retrieveNetworkInputs;
exports.connectToMPServer = connectToMPServer;
exports.syncCharacter = syncCharacter;
exports.syncGameMode = syncGameMode;
exports.syncStartGame = syncStartGame;
exports.syncTagText = syncTagText;
exports.syncMatchTimer = syncMatchTimer;

var _jquery = __webpack_require__(1);

var _jquery2 = _interopRequireDefault(_jquery);

var _input = __webpack_require__(49);

var _encode = __webpack_require__(86);

var _deepstream = __webpack_require__(87);

var _deepstream2 = _interopRequireDefault(_deepstream);

var _main = __webpack_require__(11);

var _deepCopyObject = __webpack_require__(67);

var _css = __webpack_require__(12);

var _pako = __webpack_require__(68);

var _pako2 = _interopRequireDefault(_pako);

var _settings = __webpack_require__(14);

var _replay = __webpack_require__(66);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint-disable*/
var ds = null;
var peerId = null;
var connectionReady = false;
var GAME_ID = void 0;
var playerID = void 0;
var HOST_GAME_ID = exports.HOST_GAME_ID = null;
var inServerMode = exports.inServerMode = false;
var meHost = exports.meHost = false;
var joinedGame = false;
var lastRecievedPacket = 0;
var usServer = 'wss://deepml.herokuapp.com:443';
var eurServer = 'wss://deepmleur.herokuapp.com:443';
var pickedServer = 'america';
var packetNumber = 0;

(0, _jquery2.default)("#america").on("click", function () {
  localStorage.setItem('pickedServer', 'america');
  (0, _jquery2.default)("#europe").attr('checked', false);
  (0, _jquery2.default)("#localGame").attr('checked', false);
  ds = (0, _deepstream2.default)(usServer).login(null, _onLoggedIn);
  GAME_ID = ds.getUid().replace("-", "");
  playerID = ds.getUid().replace("-", "");
});

(0, _jquery2.default)("#europe").on("click", function () {
  localStorage.setItem('pickedServer', 'europe');
  (0, _jquery2.default)("#america").attr('checked', false);
  (0, _jquery2.default)("#localGame").attr('checked', false);
  ds = (0, _deepstream2.default)(eurServer).login(null, _onLoggedIn);
  GAME_ID = ds.getUid().replace("-", "");
  playerID = ds.getUid().replace("-", "");
});
(0, _jquery2.default)("#localGame").on("click", function () {
  localStorage.setItem('pickedServer', 'lan');
  (0, _jquery2.default)("#america").attr('checked', false);
  (0, _jquery2.default)("#europe").attr('checked', false);
  ds = (0, _deepstream2.default)(localStorage.getItem('lastLANIP') + ":6020").login(null, _onLoggedIn);
  GAME_ID = ds.getUid().replace("-", "");
  playerID = ds.getUid().replace("-", "");
});
(0, _jquery2.default)("#lanIP").on("click", function () {
  var hostIP = prompt("Hosts's IP ADDRESS (enter nothing or localhost to be host):");
  (0, _jquery2.default)("#lanIP").attr("value", hostIP);
  (0, _jquery2.default)("#america").attr('checked', false);
  (0, _jquery2.default)("#europe").attr('checked', false);
  (0, _jquery2.default)("#localGame").attr('checked', true);
  if (hostIP === null || hostIP === undefined || hostIP === "" || hostIP === "localhost") {
    localStorage.setItem('lastLANIP', "localhost");
  }
  localStorage.setItem('lastLANIP', hostIP);
  console.log("server set to :" + localStorage.getItem('lastLANIP') + ":6020");
});
if (localStorage.getItem('pickedServer') === 'america' || localStorage.getItem('pickedServer') === null) {
  (0, _jquery2.default)("#america").attr('checked', true);
  (0, _jquery2.default)("#europe").attr('checked', false);
  (0, _jquery2.default)("#localGame").attr('checked', false);
  localStorage.setItem('pickedServer', 'america');
} else if (localStorage.getItem('pickedServer') === 'europe') {
  (0, _jquery2.default)("#europe").attr('checked', true);
  (0, _jquery2.default)("#america").attr('checked', false);
  (0, _jquery2.default)("#localGame").attr('checked', false);
  localStorage.setItem('pickedServer', 'europe');
} else {
  (0, _jquery2.default)("#europe").attr('checked', false);
  (0, _jquery2.default)("#america").attr('checked', false);
  (0, _jquery2.default)("#localGame").attr('checked', true);
  localStorage.setItem('pickedServer', 'lan');
}
(0, _jquery2.default)("#lanIP").attr('value', localStorage.getItem('lastLANIP'));
function logIntoServer() {
  exports.meHost = meHost = true;
  if (localStorage.getItem('pickedServer') === 'america') {
    ds = (0, _deepstream2.default)(usServer).login(null, _onLoggedIn);
  } else if (localStorage.getItem('pickedServer') === 'europe') {
    ds = (0, _deepstream2.default)(eurServer).login(null, _onLoggedIn);
  } else {
    if (localStorage.getItem('lastLANIP') === null || localStorage.getItem('lastLANIP') === "") {
      localStorage.setItem('lastLANIP', "localhost");
      (0, _jquery2.default)("#lanIP").attr('value', localStorage.getItem('lastLANIP'));
    }
    ds = (0, _deepstream2.default)(localStorage.getItem('lastLANIP') + ":6020").login(null, _onLoggedIn);
  }
}

function getPlayerStatusRecord(playerID) {
  return playerStatusRecords[playerID];
}

var exclusions = ["charAttributes", "charHitboxes", "prevFrameHitboxes"];

function startRoom() {
  GAME_ID = ds.getUid().replace("-", "");
  playerID = ds.getUid().replace("-", "");
  exports.inServerMode = inServerMode = true;
  ds.on('connectionStateChanged', function (connectionState) {
    var cssClass;

    if (connectionState === 'ERROR' || connectionState === 'CLOSED') {
      cssClass = 'red';
    } else if (connectionState === 'OPEN') {
      cssClass = 'green';
    } else {
      cssClass = 'yellow';
    }
    //apply this to the front end at some point
    console.log("connection status : " + cssClass);
    (0, _jquery2.default)("#connstatus").css('background-color', cssClass);
  });

  ds.record.getRecord(GAME_ID + '-game').whenReady(function (statusRecord) {
    //  console.log("set up game status "+ GAME_ID);
    statusRecord.set(GAME_ID + 'playerStatus/', {
      "playerID": playerID,
      "ports": _main.ports,
      "currentPlayers": _main.currentPlayers,
      "gameSettings": _settings.gameSettings,
      "characterSelections": _main.characterSelections
    });
    playerStatusRecords[playerID] = statusRecord.get();
    (0, _jquery2.default)('#mpcode').prop("value", GAME_ID);

    var playerPayload = (0, _deepCopyObject.deepObjectMerge)(true, {}, _main.player[getPlayerStatusRecord(playerID).ports - 1], exclusions);

    statusRecord.set(GAME_ID + 'player/', {
      name: playerID,
      playerSlot: _main.ports - 1,
      inputBuffer: String.fromCharCode(0, 0, 32639, 32639),
      playerInfo: playerPayload

    });
    //TODO iterate over ports to establish inital group

    ds.event.subscribe(GAME_ID + 'playerStatus/', function (match) {
      if (match.playerID === playerID) {
        return;
      }

      playerStatusRecords[playerID] = statusRecord;
      syncHost(match);
      var totalPlayersRecord = ds.record.getRecord(GAME_ID + 'totalPlayers');
      totalPlayersRecord.set('totalPlayers', _main.ports);
      totalPlayersRecord.set('gameMode', _main.gameMode);
      totalPlayersRecord.set('currentPlayers', _main.currentPlayers);
      totalPlayersRecord.set('stageSelect', _main.stageSelect);
      totalPlayersRecord.set('characterSelections', _main.characterSelections);
      ds.event.emit(GAME_ID + 'totalPlayers', {
        'totalPlayers': _main.ports,
        "gameMode": _main.gameMode,
        "stageSelect": _main.stageSelect,
        "characterSelections": _main.characterSelections,
        "currentPlayers": _main.currentPlayers
      });
      statusRecord.set(GAME_ID + 'playerStatus/', {
        "playerID": playerID,
        "ports": _main.ports,
        "currentPlayers": _main.currentPlayers,
        "characterSelections": _main.characterSelections,
        "gameSettings": _settings.gameSettings
      });
      exports.HOST_GAME_ID = HOST_GAME_ID = GAME_ID;
    });

    ds.event.subscribe(GAME_ID + 'player/', function (answer) {

      var data = JSON.parse(answer.bstring);
      if (data) {
        if (data.playerID !== playerID) {

          if (data.inputBuffer && data.playerSlot !== undefined) {
            var now = performance.now();
            var frameDelay = now - lastRecievedPacket;
            if (frameDelay > 33) {
              frameDelay = 33;
            }
            lastRecievedPacket = now;
            (0, _replay.updateGameTickDelay)(frameDelay);
            saveNetworkInputs(data.playerSlot, data.inputBuffer);
            _main.player[data.playerSlot].phys.pos = data.position;
          }
        }
      }
    });

    ds.event.subscribe(GAME_ID + 'charSelection/', function (data) {
      if (data) {
        (0, _css.setChosenChar)(data.playerSlot, data.charSelected);
      }
    });
    ds.event.subscribe(GAME_ID + 'gameMode/', function (data) {
      if (data) {
        (0, _main.changeGamemode)(data.gameMode);
      }
    });
    ds.event.subscribe(GAME_ID + 'startGame/', function (data) {
      if (data) {
        (0, _main.setStageSelect)(data.stageSelected);
        ds.record.getRecord(GAME_ID + 'totalPlayers').set('stageSelect', data.stageSelected);
        (0, _jquery2.default)("#pTagEdit" + 0).hide();
        (0, _jquery2.default)("#pTagEdit" + 1).hide();
        (0, _jquery2.default)("#pTagEdit" + 2).hide();
        (0, _jquery2.default)("#pTagEdit" + 3).hide();
        (0, _jquery2.default)("#pTagEdit" + 4).hide();
        (0, _jquery2.default)("#pTagEdit" + 0).blur();
        (0, _jquery2.default)("#pTagEdit" + 1).blur();
        (0, _jquery2.default)("#pTagEdit" + 2).blur();
        (0, _jquery2.default)("#pTagEdit" + 3).blur();
        (0, _jquery2.default)("#pTagEdit" + 4).blur();
        document.getSelection().removeAllRanges();
        (0, _css.setChoosingTag)(-1);
        (0, _main.startGame)();
      }
    });
    ds.event.subscribe(GAME_ID + 'setTag/', function (data) {
      if (data) {
        (0, _main.setTagText)(data.playerSlot, data.tagText);
      }
    });

    ds.event.subscribe(GAME_ID + 'getMatchTimer/', function (data) {

      syncMatchTimer(_main.matchTimer);
    });
  });
}
function _onLoggedIn() {
  connectionReady = true;
  startRoom();

  (0, _jquery2.default)("#joinServer").on('click', function (e) {
    exports.meHost = meHost = false;
    var destId = prompt("Host's peer ID:");
    connectToUser(destId);
  });
}

var hostRoom = null;

var connectedPeers = {};
var peerConnections = {};
var playerStatusRecords = {};

var playerInputBuffer = [(0, _input.nullInputs)(), (0, _input.nullInputs)(), (0, _input.nullInputs)(), (0, _input.nullInputs)()];

var giveInputs = exports.giveInputs = {};

function setNetInputFlag(name, val) {
  giveInputs[name] = val;
}

function sendInputsOverNet(inputBuffer, playerSlot) {

  var payload = {
    "playerID": playerID,
    "playerSlot": playerSlot,
    "inputBuffer": (0, _encode.encodeInput)(inputBuffer),
    //"inputBuffer": inputBuffer,
    "position": _main.player[playerSlot].phys.pos

  };
  ds.event.emit(HOST_GAME_ID + 'player/', { "bstring": JSON.stringify(payload) });
}

function updateNetworkInputs(inputBuffer, playerSlot) {

  playerInputBuffer[playerSlot][0] = inputBuffer;

  sendInputsOverNet(inputBuffer, playerSlot);
}

function saveNetworkInputs(playerSlot, inputData) {

  playerInputBuffer[playerSlot][0] = (0, _encode.decodeInput)(inputData);
  //playerInputBuffer[playerSlot][0] = inputData;
}

function retrieveNetworkInputs(playerSlot) {
  return playerInputBuffer[playerSlot][0];
}

//connect to global chat
function connectToMPServer() {

  logIntoServer();
}

function getHostRoom() {
  return connectedPeers;
}

function syncClient(data) {
  var exactportnumber = data.ports;
  var charselected = data.characterSelections;
  var portSnapshot = _main.ports;
  if (joinedGame === false) {
    joinedGame = true;
    var tempCurrentPlayers = (0, _deepCopyObject.deepObjectMerge)(true, {}, _main.currentPlayers);
    var playersToBeReassigned = tempCurrentPlayers.length;
    var mTypeSnapshot = (0, _deepCopyObject.deepObjectMerge)(true, {}, _main.mType);
    var charSelectedSnapshot = (0, _deepCopyObject.deepObjectMerge)(true, {}, _main.characterSelections);
    //add host players
    for (var v = _main.ports; v <= exactportnumber - 1; v++) {

      (0, _main.addPlayer)(v, 99);
    }
    for (var i = 0; i < exactportnumber; i++) {
      (0, _main.setPlayerType)(i, 2);
      (0, _main.setMtype)(i, 99);
      (0, _main.setCurrentPlayer)(i, i);
      setNetInputFlag(i, false);
      (0, _main.setCS)(i, charselected[i]);
    }
    //reassign player 1
    //TODO figure out how to join wiht multiple in original party
    (0, _main.addPlayer)(tempCurrentPlayers[0], mTypeSnapshot[0]);
    setNetInputFlag(exactportnumber, true);
    (0, _main.setCS)(exactportnumber, charSelectedSnapshot[0]);
  } else {

    for (var j = _main.ports; _main.ports < exactportnumber + 1; j++) {
      (0, _main.addPlayer)(j, 99);
    }
  }
}

function syncHost(data) {

  //add joining players
  //TODO Currently assuming only one player joins
  (0, _main.setCS)(data.ports, data.characterSelections[data.ports]);
  setNetInputFlag(0, true);
  (0, _main.addPlayer)(_main.ports, 99);
  setNetInputFlag(_main.ports, false);
}

function connect(record, name) {
  // Handle a join connection.

  ds.record.getRecord(name + 'totalPlayers').whenReady(function (totalPlayerRecord) {

    var hostStateRecord = totalPlayerRecord.get();
    if (hostStateRecord.totalPlayers > 3) {
      alert("Host room is full.");
    } else {

      record.whenReady(function (data) {

        var result = data.get();

        if (Object.keys(result).length === 0 && result.constructor === Object) {
          alert("error room appears to be empty");
        } else if (result.gameMode === 3) {
          alert("The match is currently in progress. please wait until it has completed");
        } else if (_main.currentPlayers.length > 1) {
          alert("Too many players your current session. Only one player may join per browser until I figure out a solution");
        } else if (result.gameMode === 6) {
          alert("The host is already in stage select. Please wait until the match has completed or have the host return to character select");
        } else {
          var playerstatus = Object.keys(result)[0];
          playerStatusRecords[name] = record;

          syncClient(result[playerstatus]);
          exports.meHost = meHost = false;
          (0, _settings.updateGameSettings)(result[playerstatus].gameSettings);

          ds.event.emit(name + 'playerStatus/', {
            "playerID": playerID,
            "ports": _main.ports - 1,
            "currentPlayers": _main.currentPlayers,
            "characterSelections": _main.characterSelections
          });
          // let playerPayload = deepObjectMerge(true,{}, player[ports],exclusions);

          var payload = {
            "playerID": playerID,
            "playerSlot": _main.ports - 1,
            "inputBuffer": (0, _encode.encodeInput)(playerInputBuffer[0]),
            // "inputBuffer": playerInputBuffer[0],
            "position": _main.player[_main.ports].phys.pos
          };
          ds.event.emit(name + 'player/', { "bstring": JSON.stringify(payload) });
          // ds.event.emit(name + 'charSelection/', {"playerSlot": ports -1, "charSelected": characterSelections[0]});

          ds.event.subscribe(name + 'playerStatus/', function (match) {
            if (match.playerID === playerID) {
              return;
            }

            syncClient(match);
          });

          ds.event.subscribe(name + 'player/', function (answer) {

            var data = JSON.parse(answer.bstring);
            if (data) {
              if (data.playerID !== playerID) {
                if (data.inputBuffer && data.playerSlot !== undefined) {
                  var now = performance.now();
                  var frameDelay = now - lastRecievedPacket;
                  if (frameDelay > 33) {
                    frameDelay = 33;
                  }
                  lastRecievedPacket = now;
                  (0, _replay.updateGameTickDelay)(frameDelay);
                  saveNetworkInputs(data.playerSlot, data.inputBuffer);
                  _main.player[data.playerSlot].phys.pos = data.position;
                }
              }
            }
          });
          ds.event.subscribe(name + 'charSelection/', function (data) {
            if (data) {
              (0, _css.setChosenChar)(data.playerSlot, data.charSelected);
            }
          });
          ds.event.subscribe(name + 'gameMode/', function (data) {
            if (data) {
              if (data.gameMode === 2 || data.gameMode === 3 || data.gameMode === 6) {
                (0, _main.changeGamemode)(data.gameMode);
              }
            }
          });

          ds.event.subscribe(name + 'startGame/', function (data) {
            if (data) {
              (0, _main.setStageSelect)(data.stageSelected);
              (0, _main.startGame)();
            }
          });
          ds.event.subscribe(name + 'setTag/', function (data) {
            if (data) {
              (0, _main.setTagText)(data.playerSlot, data.tagText);
            }
          });
          peerConnections[name] = record;
        }
      });
    }
  });
}

function connectToUser(userName) {
  var requestedPeer = userName;
  if (!connectedPeers[requestedPeer]) {
    exports.HOST_GAME_ID = HOST_GAME_ID = requestedPeer;
    var playerRecord = ds.record.getRecord(requestedPeer + '-game').whenReady(function (statusRecord) {
      connect(statusRecord, requestedPeer);
    });

    peerConnections[requestedPeer] = playerRecord;
  }
  connectedPeers[requestedPeer] = 1;
}

function syncCharacter(index, charSelection) {
  if (HOST_GAME_ID !== null) {
    ds.event.emit(HOST_GAME_ID + 'charSelection/', { "playerSlot": index, "charSelected": charSelection });
  }
  if (meHost) {
    ds.record.getRecord(GAME_ID + '-game').whenReady(function (statusRecord) {
      //  console.log("set up game status "+ GAME_ID);
      statusRecord.set(GAME_ID + 'playerStatus/', {
        "playerID": playerID,
        "ports": _main.ports,
        "currentPlayers": _main.currentPlayers,
        "gameSettings": _settings.gameSettings,
        "characterSelections": _main.characterSelections
      });
    });
  }
}

function syncGameMode(gameMode) {
  if (HOST_GAME_ID !== null) {
    ds.event.emit(HOST_GAME_ID + 'gameMode/', { "gameMode": gameMode });
  }
}

function syncStartGame(stageSelected) {
  if (HOST_GAME_ID !== null) {
    ds.event.emit(HOST_GAME_ID + 'startGame/', { "stageSelected": stageSelected });
    ds.record.getRecord(HOST_GAME_ID + '-game').set('gameMode', _main.gameMode);
  }
}

function syncTagText(playerSlot, tagText) {
  if (HOST_GAME_ID !== null) {
    ds.event.emit(HOST_GAME_ID + 'setTag/', { "playerSlot": playerSlot, "tagText": tagText });
  }
}
function syncMatchTimer(timer) {
  if (HOST_GAME_ID !== null) {
    ds.event.emit(HOST_GAME_ID + 'matchTimer/', { "matchTimer": timer });
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/main/multiplayer/streamclient.js
// module id = 48
// module chunks = 1
//# sourceURL=webpack:///./src/main/multiplayer/streamclient.js?