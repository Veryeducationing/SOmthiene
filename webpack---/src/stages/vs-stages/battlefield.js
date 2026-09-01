"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Box2D = __webpack_require__(21);

var _Vec2D = __webpack_require__(22);

/*eslint indent:0*/

exports.default = {
  name: "battlefield",
  box: [],
  polygon: [[new _Vec2D.Vec2D(-68.4, 0), new _Vec2D.Vec2D(68.4, 0), new _Vec2D.Vec2D(65, -6), new _Vec2D.Vec2D(36, -19), new _Vec2D.Vec2D(39, -21), new _Vec2D.Vec2D(33, -25), new _Vec2D.Vec2D(30, -29), new _Vec2D.Vec2D(29, -35), new _Vec2D.Vec2D(10, -40), new _Vec2D.Vec2D(10, -30), new _Vec2D.Vec2D(-10, -30), new _Vec2D.Vec2D(-10, -40), new _Vec2D.Vec2D(-29, -35), new _Vec2D.Vec2D(-30, -29), new _Vec2D.Vec2D(-33, -25), new _Vec2D.Vec2D(-39, -21), new _Vec2D.Vec2D(-36, -19), new _Vec2D.Vec2D(-65, -6)]],
  platform: [[new _Vec2D.Vec2D(-57.6, 27.2), new _Vec2D.Vec2D(-20, 27.2)], [new _Vec2D.Vec2D(20, 27.2), new _Vec2D.Vec2D(57.6, 27.2)], [new _Vec2D.Vec2D(-18.8, 54.4), new _Vec2D.Vec2D(18.8, 54.4)]],
  ground: [[new _Vec2D.Vec2D(-68.4, 0), new _Vec2D.Vec2D(68.4, 0)]],
  ceiling: [[new _Vec2D.Vec2D(-65, -6), new _Vec2D.Vec2D(-36, -19)], [new _Vec2D.Vec2D(-29, -35), new _Vec2D.Vec2D(-10, -40)], [new _Vec2D.Vec2D(-10, -30), new _Vec2D.Vec2D(10, -30)], [new _Vec2D.Vec2D(65, -6), new _Vec2D.Vec2D(36, -19)], [new _Vec2D.Vec2D(29, -35), new _Vec2D.Vec2D(10, -40)]],
  wallL: [[new _Vec2D.Vec2D(-68.4, 0), new _Vec2D.Vec2D(-65, -6)], [new _Vec2D.Vec2D(-36, -19), new _Vec2D.Vec2D(-39, -21)], [new _Vec2D.Vec2D(-39, -21), new _Vec2D.Vec2D(-33, -25)], [new _Vec2D.Vec2D(-33, -25), new _Vec2D.Vec2D(-30, -29)], [new _Vec2D.Vec2D(-30, -29), new _Vec2D.Vec2D(-29, -35)], [new _Vec2D.Vec2D(10, -30), new _Vec2D.Vec2D(10, -40)]],
  wallR: [[new _Vec2D.Vec2D(68.4, 0), new _Vec2D.Vec2D(65, -6)], [new _Vec2D.Vec2D(36, -19), new _Vec2D.Vec2D(39, -21)], [new _Vec2D.Vec2D(39, -21), new _Vec2D.Vec2D(33, -25)], [new _Vec2D.Vec2D(33, -25), new _Vec2D.Vec2D(30, -29)], [new _Vec2D.Vec2D(30, -29), new _Vec2D.Vec2D(29, -35)], [new _Vec2D.Vec2D(-10, -30), new _Vec2D.Vec2D(-10, -40)]],
  startingPoint: [new _Vec2D.Vec2D(-50, 50), new _Vec2D.Vec2D(50, 50), new _Vec2D.Vec2D(-25, 5), new _Vec2D.Vec2D(25, 5)],
  startingFace: [1, -1, 1, -1],
  respawnPoints: [new _Vec2D.Vec2D(-50, 50), new _Vec2D.Vec2D(50, 50), new _Vec2D.Vec2D(-25, 35), new _Vec2D.Vec2D(25, 35)],
  respawnFace: [1, -1, 1, -1],
  blastzone: new _Box2D.Box2D([-224, -108.8], [224, 200]),
  ledge: [["ground", 0, 0], ["ground", 0, 1]],
  ledgePos: [new _Vec2D.Vec2D(-68.4, 0), new _Vec2D.Vec2D(68.4, 0)],
  scale: 4.5,
  offset: [600, 480],
  movingPlats: [],
  movingPlatforms: function movingPlatforms() {}
};

//////////////////
// WEBPACK FOOTER
// ./src/stages/vs-stages/battlefield.js
// module id = 20
// module chunks = 1
//# sourceURL=webpack:///./src/stages/vs-stages/battlefield.js?