"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Box2D = __webpack_require__(21);

var _Vec2D = __webpack_require__(22);

exports.default = {
  name: "fdest",
  box: [],
  polygon: [[new _Vec2D.Vec2D(-85.6, 0), new _Vec2D.Vec2D(85.6, 0), new _Vec2D.Vec2D(85.6, -10), new _Vec2D.Vec2D(65, -20), new _Vec2D.Vec2D(65, -30), new _Vec2D.Vec2D(60, -47), new _Vec2D.Vec2D(50, -55), new _Vec2D.Vec2D(45, -56), new _Vec2D.Vec2D(-45, -56), new _Vec2D.Vec2D(-50, -55), new _Vec2D.Vec2D(-60, -47), new _Vec2D.Vec2D(-65, -30), new _Vec2D.Vec2D(-65, -20), new _Vec2D.Vec2D(-85.6, -10)]],
  platform: [],
  ground: [[new _Vec2D.Vec2D(-85.6, 0), new _Vec2D.Vec2D(85.6, 0)]],
  ceiling: [[new _Vec2D.Vec2D(-50, -55), new _Vec2D.Vec2D(-45, -56)], [new _Vec2D.Vec2D(-45, -56), new _Vec2D.Vec2D(45, -56)], [new _Vec2D.Vec2D(45, -56), new _Vec2D.Vec2D(50, -55)]],
  wallL: [[new _Vec2D.Vec2D(-85.6, 0), new _Vec2D.Vec2D(-85.6, -10)], [new _Vec2D.Vec2D(-85.6, -10), new _Vec2D.Vec2D(-65, -20)], [new _Vec2D.Vec2D(-65, -20), new _Vec2D.Vec2D(-65, -30)], [new _Vec2D.Vec2D(-65, -30), new _Vec2D.Vec2D(-60, -47)], [new _Vec2D.Vec2D(-60, -47), new _Vec2D.Vec2D(-50, -55)]],
  wallR: [[new _Vec2D.Vec2D(85.6, 0), new _Vec2D.Vec2D(85.6, -10)], [new _Vec2D.Vec2D(85.6, -10), new _Vec2D.Vec2D(65, -20)], [new _Vec2D.Vec2D(65, -20), new _Vec2D.Vec2D(65, -30)], [new _Vec2D.Vec2D(65, -30), new _Vec2D.Vec2D(60, -47)], [new _Vec2D.Vec2D(60, -47), new _Vec2D.Vec2D(50, -55)]],
  startingPoint: [new _Vec2D.Vec2D(-60, 10), new _Vec2D.Vec2D(60, 10), new _Vec2D.Vec2D(-20, 10), new _Vec2D.Vec2D(20, 10)],
  startingFace: [1, -1, 1, -1],
  respawnPoints: [new _Vec2D.Vec2D(16, 45), new _Vec2D.Vec2D(-16, 45), new _Vec2D.Vec2D(50, 45), new _Vec2D.Vec2D(-50, 45)],
  respawnFace: [1, -1, 1, -1],
  blastzone: new _Box2D.Box2D([-246, -140], [246, 188]),
  ledge: [["ground", 0, 0], ["ground", 0, 1]],
  ledgePos: [new _Vec2D.Vec2D(-68.4, 0), new _Vec2D.Vec2D(68.4, 0)],
  scale: 4.5,
  offset: [600, 400],
  movingPlats: [],
  movingPlatforms: function movingPlatforms() {}
};

//////////////////
// WEBPACK FOOTER
// ./src/stages/vs-stages/fdest.js
// module id = 26
// module chunks = 1
//# sourceURL=webpack:///./src/stages/vs-stages/fdest.js?