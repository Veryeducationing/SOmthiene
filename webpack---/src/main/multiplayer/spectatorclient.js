'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logIntoServerAsSpectator = logIntoServerAsSpectator;
exports.saveNetworkInputs = saveNetworkInputs;
exports.connectAsSpectator = connectAsSpectator;

var _jquery = __webpack_require__(1);

var _jquery2 = _interopRequireDefault(_jquery);

var _input = __webpack_require__(49);

var _deepstream = __webpack_require__(87);

var _deepstream2 = _interopRequireDefault(_deepstream);

var _main = __webpack_require__(11);

var _deepCopyObject = __webpack_require__(67);

var _css = __webpack_require__(12);

var _pako = __webpack_require__(68);

var _pako2 = _interopRequireDefault(_pako);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ds = null; /*eslint-disable*/

var connectionReady = false;
var GAME_ID = void 0;
var playerID = void 0;
var HOST_GAME_ID = null;

function logIntoServerAsSpectator() {
  ds = (0, _deepstream2.default)("wss://deepml.herokuapp.com:443").login(null, onSpectate);
}

function startRoom() {
  GAME_ID = ds.getUid().replace("-", "");
  playerID = ds.getUid().replace("-", "");

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
  });
}

function onSpectate() {
  connectionReady = true;
  startRoom();

  (0, _jquery2.default)("#spectate").on('click', function (e) {
    var destId = prompt("Hosts's peer ID:");
    connectToUser(destId);
  });
}

var connectedPeers = {};
var peerConnections = {};
var playerInputBuffer = [(0, _input.nullInputs)(), (0, _input.nullInputs)(), (0, _input.nullInputs)(), (0, _input.nullInputs)()];

function saveNetworkInputs(playerSlot, inputBuffer) {
  playerInputBuffer[playerSlot][0] = inputBuffer;
}

function connectAsSpectator() {

  logIntoServerAsSpectator();
}

function syncSpectator(exactportnumber) {

  //add host players
  for (var i = 0; i < exactportnumber; i++) {
    (0, _main.setPlayerType)(i, 2);
    (0, _main.setMtype)(i, 99);
    (0, _main.setCurrentPlayer)(i, i);
  }
}

function clearRoster() {

  //add host players
  for (var i = 0; i < 4; i++) {
    (0, _main.setPlayerType)(i, -1);
    (0, _main.setMtype)(i, 99);
    (0, _main.setCurrentPlayer)(i, -1);
  }
}

function connect(record, name) {
  // Handle a join connection.

  ds.record.getRecord(name + 'totalPlayers').whenReady(function (totalPlayerRecord) {
    clearRoster();
    syncSpectator(totalPlayerRecord.get().totalPlayers);

    (0, _main.changeGamemode)(totalPlayerRecord.get().gameMode);
    (0, _main.setStageSelect)(totalPlayerRecord.get().stageSelect);

    ds.event.emit(name + 'getMatchTimer');

    if (totalPlayerRecord.get().gameMode === 3) {
      (0, _main.startGame)();
    }
  });

  ds.event.subscribe(name + 'totalPlayers', function (data) {
    clearRoster();
    syncSpectator(data.totalPlayers);
    (0, _main.changeGamemode)(data.gameMode);
    (0, _main.setStageSelect)(data.stageSelect);

    if (data.gameMode === 3) {
      (0, _main.startGame)();
    }
  });
  ds.event.subscribe(name + 'player/', function (answer) {
    var data = JSON.parse(answer.bstring);
    if (data) {
      if (data.playerID !== playerID) {
        if (data.inputBuffer && data.playerSlot !== undefined) {
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
      (0, _main.changeGamemode)(data.gameMode);
    }
  });

  ds.event.subscribe(name + 'startGame/', function (data) {
    if (data) {
      (0, _main.setStageSelect)(data.stageSelected);
      (0, _main.startGame)();
    }
  });

  ds.event.subscribe(name + 'matchTimer/', function (data) {
    if (data) {
      (0, _main.setMatchTimer)(data.stageSelected);
    }
  });
  peerConnections[name] = record;
}

function connectToUser(userName) {
  var requestedPeer = userName;
  if (!connectedPeers[requestedPeer]) {
    HOST_GAME_ID = requestedPeer;
    var playerRecord = ds.record.getRecord(requestedPeer + '-game').whenReady(function (statusRecord) {
      connect(statusRecord, requestedPeer);
    });

    peerConnections[requestedPeer] = playerRecord;
  }
  connectedPeers[requestedPeer] = 1;
}

//////////////////
// WEBPACK FOOTER
// ./src/main/multiplayer/spectatorclient.js
// module id = 243
// module chunks = 1
//# sourceURL=webpack:///./src/main/multiplayer/spectatorclient.js?