"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Box2D = __webpack_require__(21);

var _Vec2D = __webpack_require__(22);

var _activeStage = __webpack_require__(18);

var _main = __webpack_require__(11);

var _environmentalCollision = __webpack_require__(28);

/*eslint indent:0*/

var platL = 21;

var platR = 49.5;
var platYMin = 12.375;
var platYMax = 27.375;

var platformStates = [{ state: "moving", timer: 0, destination: 22.125 }, { state: "moving", timer: 0, destination: 16.125 }];

function updatePlatform(i, j) {
  var platformState = platformStates[j];
  if (platformState.state === "static") {
    if (platformState.timer < 1) {
      platformState.timer = 0;
      platformState.state = "moving";
      var t = Math.random();
      if (Math.abs(_activeStage.activeStage.platform[i][0].y) < 0.075) {
        platformState.destination = 19.875;
      } else if (t < 0.3) {
        platformState.destination = -_environmentalCollision.additionalOffset;
      } else {
        t = (t - 0.3) / 0.7;
        platformState.destination = platYMin + t * (platYMax - platYMin);
      }
    } else {
      platformState.timer--;
    }
  } else {
    var _destination = platformState.destination;
    if (_activeStage.activeStage.platform[i][0].y < _destination - 0.075) {
      _activeStage.activeStage.platform[i][0].y += 0.075;
      _activeStage.activeStage.platform[i][1].y += 0.075;
    } else if (_activeStage.activeStage.platform[i][0].y > _destination + 0.075) {
      _activeStage.activeStage.platform[i][0].y -= 0.075;
      _activeStage.activeStage.platform[i][1].y -= 0.075;
    } else {
      _activeStage.activeStage.platform[i][0].y = _destination;
      _activeStage.activeStage.platform[i][1].y = _destination;
      var newTimer = void 0;
      if (_destination < 0.075) {
        newTimer = 480 + 360 * Math.random();
      } else if (Math.abs(_destination - 19.875) < 0.075) {
        // platform returning to base height
        newTimer = 0;
      } else {
        newTimer = 240 + 360 * Math.random();
      }
      platformState.state = "static";
      platformState.timer = newTimer;
    }
  }
}

exports.default = {
  name: "fountain",
  box: [],
  polygon: [[new _Vec2D.Vec2D(-63.35, 0.62), new _Vec2D.Vec2D(-53.5, 0.62), new _Vec2D.Vec2D(-51.25, 0), new _Vec2D.Vec2D(51.25, 0), new _Vec2D.Vec2D(53.5, 0.62), new _Vec2D.Vec2D(63.35, 0.62), new _Vec2D.Vec2D(63.35, -4.5), new _Vec2D.Vec2D(59.33, -15), new _Vec2D.Vec2D(56.9, -19.5), new _Vec2D.Vec2D(55, -27), new _Vec2D.Vec2D(52, -32), new _Vec2D.Vec2D(48, -38), new _Vec2D.Vec2D(41, -42), new _Vec2D.Vec2D(19, -49.5), new _Vec2D.Vec2D(13, -54.5), new _Vec2D.Vec2D(10, -62), new _Vec2D.Vec2D(8.8, -72), new _Vec2D.Vec2D(8.8, -150), new _Vec2D.Vec2D(-8.8, -150), new _Vec2D.Vec2D(-8.8, -72), new _Vec2D.Vec2D(-10, -62), new _Vec2D.Vec2D(-13, -54.5), new _Vec2D.Vec2D(-19, -49.5), new _Vec2D.Vec2D(-41, -42), new _Vec2D.Vec2D(-48, -38), new _Vec2D.Vec2D(-52, -32), new _Vec2D.Vec2D(-55, -27), new _Vec2D.Vec2D(-56.9, -19.5), new _Vec2D.Vec2D(-59.33, -15), new _Vec2D.Vec2D(-63.35, -4.5)]],
  platform: [[new _Vec2D.Vec2D(-14.25, 42.75), new _Vec2D.Vec2D(14.25, 42.75)], [new _Vec2D.Vec2D(platL, 22.125), new _Vec2D.Vec2D(platR, 22.125)], [new _Vec2D.Vec2D(-platR, 16.125), new _Vec2D.Vec2D(-platL, 16.125)]],
  ground: [[new _Vec2D.Vec2D(-63.33, 0.62), new _Vec2D.Vec2D(-53.5, 0.62)], [new _Vec2D.Vec2D(-53.5, 0.62), new _Vec2D.Vec2D(-51, 0)], [new _Vec2D.Vec2D(-51, 0), new _Vec2D.Vec2D(51, 0)], [new _Vec2D.Vec2D(51, 0), new _Vec2D.Vec2D(53.5, 0.62)], [new _Vec2D.Vec2D(53.5, 0.62), new _Vec2D.Vec2D(63.33, 0.62)]],
  ceiling: [[new _Vec2D.Vec2D(-19, -49.5), new _Vec2D.Vec2D(-41, -42)], [new _Vec2D.Vec2D(19, -49.5), new _Vec2D.Vec2D(41, -42)]],
  wallL: [[new _Vec2D.Vec2D(-63.35, 0.62), new _Vec2D.Vec2D(-63.35, -4.5)], [new _Vec2D.Vec2D(-63.35, -4.5), new _Vec2D.Vec2D(-59.33, -15)], [new _Vec2D.Vec2D(-59.33, -15), new _Vec2D.Vec2D(-56.9, -19.5)], [new _Vec2D.Vec2D(-56.9, -19.5), new _Vec2D.Vec2D(-55, -27)], [new _Vec2D.Vec2D(-55, -27), new _Vec2D.Vec2D(-52, -32)], [new _Vec2D.Vec2D(-52, -32), new _Vec2D.Vec2D(-48, -38)], [new _Vec2D.Vec2D(-48, -38), new _Vec2D.Vec2D(-41, -42)], [new _Vec2D.Vec2D(-19, -49.5), new _Vec2D.Vec2D(-13, -54.5)], [new _Vec2D.Vec2D(-13, -54.5), new _Vec2D.Vec2D(-10, -62)], [new _Vec2D.Vec2D(-10, -62), new _Vec2D.Vec2D(-8.8, -72)], [new _Vec2D.Vec2D(-8.8, -72), new _Vec2D.Vec2D(-8.8, -150)]],
  wallR: [[new _Vec2D.Vec2D(63.35, 0.62), new _Vec2D.Vec2D(63.35, -4.5)], [new _Vec2D.Vec2D(63.35, -4.5), new _Vec2D.Vec2D(59.33, -15)], [new _Vec2D.Vec2D(59.33, -15), new _Vec2D.Vec2D(56.9, -19.5)], [new _Vec2D.Vec2D(56.9, -19.5), new _Vec2D.Vec2D(55, -27)], [new _Vec2D.Vec2D(55, -27), new _Vec2D.Vec2D(52, -32)], [new _Vec2D.Vec2D(52, -32), new _Vec2D.Vec2D(48, -38)], [new _Vec2D.Vec2D(48, -38), new _Vec2D.Vec2D(41, -42)], [new _Vec2D.Vec2D(19, -49.5), new _Vec2D.Vec2D(13, -54.5)], [new _Vec2D.Vec2D(13, -54.5), new _Vec2D.Vec2D(10, -62)], [new _Vec2D.Vec2D(10, -62), new _Vec2D.Vec2D(8.8, -72)], [new _Vec2D.Vec2D(8.8, -72), new _Vec2D.Vec2D(8.8, -150)]],
  startingPoint: [new _Vec2D.Vec2D(-41.25, 21), new _Vec2D.Vec2D(41.25, 27), new _Vec2D.Vec2D(0, 5.25), new _Vec2D.Vec2D(0, 48)],
  startingFace: [1, -1, -1, 1],
  respawnPoints: [new _Vec2D.Vec2D(0, 63.75), new _Vec2D.Vec2D(0, 63.75), new _Vec2D.Vec2D(0, 63.75), new _Vec2D.Vec2D(0, 63.75)],
  respawnFace: [1, 1, 1, 1],
  blastzone: new _Box2D.Box2D([-198.75, -146.25], [198.75, 202.5]),
  ledge: [["ground", 0, 0], ["ground", 4, 1]],
  ledgePos: [new _Vec2D.Vec2D(-66.35, 0.62), new _Vec2D.Vec2D(66.35, 0.62)],
  scale: 5,
  offset: [600, 450],
  connected: [[[null, ["g", 1]], [["g", 0], ["g", 2]], [["g", 1], ["g", 3]], [["g", 2], ["g", 4]], [["g", 3], null]], [[null, null], [null, null], [null, null]]],
  movingPlats: [1, 2],
  movingPlatforms: function movingPlatforms() {
    if (_main.starting) {
      // resets the stage
      platformStates = [{ state: "moving", timer: 0, destination: 22.125 }, { state: "moving", timer: 0, destination: 16.125 }];
      _activeStage.activeStage.platform[1][0].y = 22.125;
      _activeStage.activeStage.platform[1][1].y = 22.125;
      _activeStage.activeStage.platform[2][0].y = 16.125;
      _activeStage.activeStage.platform[2][1].y = 16.125;
    } else {
      updatePlatform(1, 0);
      updatePlatform(2, 1);
      for (var j = 0; j < 4; j++) {
        if (_main.player[j].phys.grounded) {
          if (_main.player[j].phys.onSurface[0] === 1 && (_main.player[j].phys.onSurface[1] === 1 || _main.player[j].phys.onSurface[1] === 2)) {
            var plat = _main.player[j].phys.onSurface[1];
            if (_activeStage.activeStage.platform[plat][0].y < _environmentalCollision.additionalOffset) {
              _main.player[j].phys.pos.y = _environmentalCollision.additionalOffset;
              _main.player[j].phys.onSurface = [0, 2]; // transfer player from platform to middle ground
            }
          } else if (_main.player[j].phys.onSurface[0] === 0 && _main.player[j].phys.onSurface[1] === 2) {
            var x = _main.player[j].phys.pos.x;
            if (platformStates[0].state === "moving" && _activeStage.activeStage.platform[1][0].y < 0.075 && platformStates[0].destination > 0.075 && x >= platL && x <= platR) {
              _main.player[j].phys.onSurface = [1, 1]; // transfer player from middle ground to right platform
            } else if (platformStates[1].state === "moving" && _activeStage.activeStage.platform[2][0].y < 0.075 && platformStates[1].destination > 0.075 && x >= -platR && x <= -platL) {
              _main.player[j].phys.onSurface = [1, 2]; // transfer player from middle ground to left platform
            }
          }
        }
      }
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/stages/vs-stages/fountain.js
// module id = 27
// module chunks = 1
//# sourceURL=webpack:///./src/stages/vs-stages/fountain.js?