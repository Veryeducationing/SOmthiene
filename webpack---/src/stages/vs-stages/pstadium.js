"use strict";

Object.defineProperty(exports, "__esModule", {
           value: true
});

var _Box2D = __webpack_require__(21);

var _Vec2D = __webpack_require__(22);

/*eslint indent:0*/

exports.default = {
           name: "pstadium",
           box: [],
           polygon: [[new _Vec2D.Vec2D(-87.75, 0), new _Vec2D.Vec2D(87.75, 0), new _Vec2D.Vec2D(87.75, -4), new _Vec2D.Vec2D(73.75, -15), new _Vec2D.Vec2D(73.75, -17.75), new _Vec2D.Vec2D(60, -17.75), new _Vec2D.Vec2D(60, -38), new _Vec2D.Vec2D(15, -60), new _Vec2D.Vec2D(15, -112), new _Vec2D.Vec2D(-15, -112), new _Vec2D.Vec2D(-15, -60), new _Vec2D.Vec2D(-60, -38), new _Vec2D.Vec2D(-60, -17.75), new _Vec2D.Vec2D(-73.75, -17.75), new _Vec2D.Vec2D(-73.75, -15), new _Vec2D.Vec2D(-87.75, -4)]],
           platform: [[new _Vec2D.Vec2D(-55, 25), new _Vec2D.Vec2D(-25, 25)], [new _Vec2D.Vec2D(25, 25), new _Vec2D.Vec2D(55, 25)]],
           ground: [[new _Vec2D.Vec2D(-87.75, 0), new _Vec2D.Vec2D(87.75, 0)]],
           ceiling: [[new _Vec2D.Vec2D(-73.75, -17.75), new _Vec2D.Vec2D(-60, -17.75)], [new _Vec2D.Vec2D(-60, -38), new _Vec2D.Vec2D(-15, -60)], [new _Vec2D.Vec2D(-15, -112), new _Vec2D.Vec2D(15, -112)], [new _Vec2D.Vec2D(15, -60), new _Vec2D.Vec2D(60, -38)], [new _Vec2D.Vec2D(60, -17.75), new _Vec2D.Vec2D(73.75, -17.75)]],
           wallL: [[new _Vec2D.Vec2D(-87.75, 0), new _Vec2D.Vec2D(-87.75, -4)], [new _Vec2D.Vec2D(-87.75, -4), new _Vec2D.Vec2D(-73.75, -15)], [new _Vec2D.Vec2D(-73.75, -15), new _Vec2D.Vec2D(-73.75, -17.75)], [new _Vec2D.Vec2D(-60, -17.75), new _Vec2D.Vec2D(-60, -38)], [new _Vec2D.Vec2D(-15, -60), new _Vec2D.Vec2D(-15, -112)]],
           wallR: [[new _Vec2D.Vec2D(87.75, 0), new _Vec2D.Vec2D(87.75, -4)], [new _Vec2D.Vec2D(87.75, -4), new _Vec2D.Vec2D(73.75, -15)], [new _Vec2D.Vec2D(73.75, -15), new _Vec2D.Vec2D(73.75, -17.75)], [new _Vec2D.Vec2D(60, -17.75), new _Vec2D.Vec2D(60, -38)], [new _Vec2D.Vec2D(15, -60), new _Vec2D.Vec2D(15, -112)]],
           startingPoint: [new _Vec2D.Vec2D(-45, 44), new _Vec2D.Vec2D(45, 44), new _Vec2D.Vec2D(-25, 44), new _Vec2D.Vec2D(25, 44)],
           startingFace: [1, -1, 1, -1],
           respawnPoints: [new _Vec2D.Vec2D(-45, 44), new _Vec2D.Vec2D(45, 44), new _Vec2D.Vec2D(-25, 44), new _Vec2D.Vec2D(25, 44)],
           respawnFace: [1, -1, 1, -1],
           blastzone: new _Box2D.Box2D([-230, -111], [230, 180]),
           ledge: [["ground", 0, 0], ["ground", 0, 1]],
           ledgePos: [new _Vec2D.Vec2D(-87.75, 0), new _Vec2D.Vec2D(87.75, 0)],
           scale: 4.2,
           offset: [600, 500],
           movingPlats: [],
           movingPlatforms: function movingPlatforms() {}
};

//////////////////
// WEBPACK FOOTER
// ./src/stages/vs-stages/pstadium.js
// module id = 24
// module chunks = 1
//# sourceURL=webpack:///./src/stages/vs-stages/pstadium.js?