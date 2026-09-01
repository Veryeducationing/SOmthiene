"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Box2D = __webpack_require__(21);

var _Vec2D = __webpack_require__(22);

/*eslint indent:0*/

exports.default = {
  name: "dreamland",
  box: [],
  polygon: [[new _Vec2D.Vec2D(-77.25, 0), new _Vec2D.Vec2D(77.25, 0), new _Vec2D.Vec2D(76.5, -11), new _Vec2D.Vec2D(65.75, -36), new _Vec2D.Vec2D(-65.75, -36), new _Vec2D.Vec2D(-76.5, -11), new _Vec2D.Vec2D(-77.25, 0)]],
  platform: [[new _Vec2D.Vec2D(-61.393, 30.142), new _Vec2D.Vec2D(-31.725, 30.142)], [new _Vec2D.Vec2D(-19.018, 51.425), new _Vec2D.Vec2D(19.017, 51.425)], [new _Vec2D.Vec2D(31.704, 30.243), new _Vec2D.Vec2D(63.075, 30.243)]],
  ground: [[new _Vec2D.Vec2D(-77.25, 0), new _Vec2D.Vec2D(77.25, 0)]],
  ceiling: [[new _Vec2D.Vec2D(-65.75, -36), new _Vec2D.Vec2D(65.75, -36)]],
  wallL: [[new _Vec2D.Vec2D(-77.25, 0), new _Vec2D.Vec2D(-76.5, -11)], [new _Vec2D.Vec2D(-76.5, -11), new _Vec2D.Vec2D(-65.75, -36)]],
  wallR: [[new _Vec2D.Vec2D(77.25, 0), new _Vec2D.Vec2D(76.5, -11)], [new _Vec2D.Vec2D(76.5, -11), new _Vec2D.Vec2D(65.75, -36)]],
  startingPoint: [new _Vec2D.Vec2D(-60, 50), new _Vec2D.Vec2D(60, 50), new _Vec2D.Vec2D(-40, 50), new _Vec2D.Vec2D(40, 50)],
  startingFace: [1, -1, 1, -1],
  respawnPoints: [new _Vec2D.Vec2D(-60, 50), new _Vec2D.Vec2D(60, 50), new _Vec2D.Vec2D(-40, 50), new _Vec2D.Vec2D(40, 50)],
  respawnFace: [1, -1, 1, -1],
  blastzone: new _Box2D.Box2D([-255, -123], [255, 250]),
  ledge: [["ground", 0, 0], ["ground", 0, 1]],
  ledgePos: [new _Vec2D.Vec2D(-77.25, 0), new _Vec2D.Vec2D(77.25, 0)],
  scale: 3.5,
  offset: [600, 500],
  movingPlats: [],
  movingPlatforms: function movingPlatforms() {}
};

//////////////////
// WEBPACK FOOTER
// ./src/stages/vs-stages/dreamland.js
// module id = 23
// module chunks = 1
//# sourceURL=webpack:///./src/stages/vs-stages/dreamland.js?