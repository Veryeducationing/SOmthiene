"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _activeStage = __webpack_require__(18);

var _main = __webpack_require__(11);

var _Box2D = __webpack_require__(21);

var _Vec2D = __webpack_require__(22);

/*eslint indent:0*/

exports.default = {
  name: "ystory",
  box: [],
  polygon: [[new _Vec2D.Vec2D(-56, -3.5), new _Vec2D.Vec2D(-39, 0), new _Vec2D.Vec2D(39, 0), new _Vec2D.Vec2D(56, -3.5), new _Vec2D.Vec2D(56, -7), new _Vec2D.Vec2D(55, -8), new _Vec2D.Vec2D(54, -11), new _Vec2D.Vec2D(53, -12), new _Vec2D.Vec2D(53, -27), new _Vec2D.Vec2D(54, -28), new _Vec2D.Vec2D(54, -30), new _Vec2D.Vec2D(53, -31), new _Vec2D.Vec2D(53, -46), new _Vec2D.Vec2D(54, -47), new _Vec2D.Vec2D(54, -100), new _Vec2D.Vec2D(-54, -100), new _Vec2D.Vec2D(-54, -47), new _Vec2D.Vec2D(-53, -46), new _Vec2D.Vec2D(-53, -31), new _Vec2D.Vec2D(-54, -30), new _Vec2D.Vec2D(-54, -28), new _Vec2D.Vec2D(-53, -27), new _Vec2D.Vec2D(-53, -12), new _Vec2D.Vec2D(-54, -11), new _Vec2D.Vec2D(-55, -8), new _Vec2D.Vec2D(-56, -7), new _Vec2D.Vec2D(-56, -3.5)]],
  platform: [[new _Vec2D.Vec2D(-103.6, -33.25), new _Vec2D.Vec2D(-91.7, -33.25)], [new _Vec2D.Vec2D(-59.5, 23.45), new _Vec2D.Vec2D(-28, 23.45)], [new _Vec2D.Vec2D(28, 23.45), new _Vec2D.Vec2D(59.5, 23.45)], [new _Vec2D.Vec2D(-15.75, 42), new _Vec2D.Vec2D(15.75, 42)]],
  ground: [[new _Vec2D.Vec2D(-56, -3.5), new _Vec2D.Vec2D(-39, 0)], [new _Vec2D.Vec2D(-39, 0), new _Vec2D.Vec2D(39, 0)], [new _Vec2D.Vec2D(39, 0), new _Vec2D.Vec2D(56, -3.5)]],
  ceiling: [],
  wallL: [[new _Vec2D.Vec2D(-56, -3.5), new _Vec2D.Vec2D(-56, -7)], [new _Vec2D.Vec2D(-56, -7), new _Vec2D.Vec2D(-55, -8)], [new _Vec2D.Vec2D(-55, -8), new _Vec2D.Vec2D(-54, -11)], [new _Vec2D.Vec2D(-54, -11), new _Vec2D.Vec2D(-53, -12)], [new _Vec2D.Vec2D(-53, -12), new _Vec2D.Vec2D(-53, -27)], [new _Vec2D.Vec2D(-53, -27), new _Vec2D.Vec2D(-54, -28)], [new _Vec2D.Vec2D(-54, -28), new _Vec2D.Vec2D(-54, -30)], [new _Vec2D.Vec2D(-54, -30), new _Vec2D.Vec2D(-53, -31)], [new _Vec2D.Vec2D(-53, -31), new _Vec2D.Vec2D(-53, -46)], [new _Vec2D.Vec2D(-53, -46), new _Vec2D.Vec2D(-54, -47)], [new _Vec2D.Vec2D(-54, -47), new _Vec2D.Vec2D(-54, -100)]],
  wallR: [[new _Vec2D.Vec2D(56, -3.5), new _Vec2D.Vec2D(56, -7)], [new _Vec2D.Vec2D(56, -7), new _Vec2D.Vec2D(55, -8)], [new _Vec2D.Vec2D(55, -8), new _Vec2D.Vec2D(54, -11)], [new _Vec2D.Vec2D(54, -11), new _Vec2D.Vec2D(53, -12)], [new _Vec2D.Vec2D(53, -12), new _Vec2D.Vec2D(53, -27)], [new _Vec2D.Vec2D(53, -27), new _Vec2D.Vec2D(54, -28)], [new _Vec2D.Vec2D(54, -28), new _Vec2D.Vec2D(54, -30)], [new _Vec2D.Vec2D(54, -30), new _Vec2D.Vec2D(53, -31)], [new _Vec2D.Vec2D(53, -31), new _Vec2D.Vec2D(53, -46)], [new _Vec2D.Vec2D(53, -46), new _Vec2D.Vec2D(54, -47)], [new _Vec2D.Vec2D(54, -47), new _Vec2D.Vec2D(54, -100)]],
  startingPoint: [new _Vec2D.Vec2D(-42, 30), new _Vec2D.Vec2D(42, 30), new _Vec2D.Vec2D(-15, 15), new _Vec2D.Vec2D(15, 15)],
  startingFace: [1, -1, 1, -1],
  respawnPoints: [new _Vec2D.Vec2D(-42, 30), new _Vec2D.Vec2D(42, 30), new _Vec2D.Vec2D(-20, 30), new _Vec2D.Vec2D(-20, 30)],
  respawnFace: [1, -1, 1, -1],
  blastzone: new _Box2D.Box2D([-175.7, -91], [173.6, 168]),
  ledge: [["ground", 0, 0], ["ground", 2, 1]],
  ledgePos: [new _Vec2D.Vec2D(-56, -3.5), new _Vec2D.Vec2D(56, -3.5)],
  scale: 5,
  offset: [600, 430],
  connected: [[[null, ["g", 1]], [["g", 0], ["g", 2]], [["g", 1], null]], [[null, null], [null, null], [null, null], [null, null]]],
  movingPlats: [0],
  movingPlatforms: function movingPlatforms() {
    var plat = _activeStage.activeStage.platform[0];
    var move = [0, 0];
    if (plat[0].x <= -103.6 && plat[0].y > -33.25) {
      plat[0].x = -103.6;
      plat[1].x = -91.7;
      plat[0].y -= 0.354845;
      plat[1].y -= 0.354845;
      move = [0, -0.354845];
    }
    if (plat[0].x >= 91.35 && plat[0].y < -13.65) {
      plat[0].x = 91.35;
      plat[1].x = 103.25;
      plat[0].y += 0.354845;
      plat[1].y += 0.354845;
      move = [0, 0.354845];
    }
    if (plat[0].y <= -33.25) {
      plat[0].y = -33.25;
      plat[1].y = -33.25;
      plat[0].x += 0.354845;
      plat[1].x += 0.354845;
      move = [0.354845, 0];
    }
    if (plat[0].y >= -13.65) {
      plat[0].y = -13.65;
      plat[1].y = -13.65;
      plat[0].x -= 0.354845;
      plat[1].x -= 0.354845;
      move = [-0.354845, 0];
    }

    for (var j = 0; j < 4; j++) {
      if (_main.player[j].phys.onSurface[0] === 1 && _main.player[j].phys.onSurface[1] === 0 && _main.player[j].phys.grounded) {
        _main.player[j].phys.pos.x += move[0];
        //player[j].phys.pos.y += move[1];
        _main.player[j].phys.pos.y = plat[0].y;
      }
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/stages/vs-stages/ystory.js
// module id = 25
// module chunks = 1
//# sourceURL=webpack:///./src/stages/vs-stages/ystory.js?