"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSurfaceFromStage = getSurfaceFromStage;

var _Vec2D = __webpack_require__(22);

var _Box2D = __webpack_require__(21);

function getSurfaceFromStage(surfaceTypeAndIndex, stage) {
  var surfaceType = surfaceTypeAndIndex[0];
  var surfaceIndex = surfaceTypeAndIndex[1];
  switch (surfaceType) {
    case "l":
      return stage.wallL[surfaceIndex];
    case "r":
      return stage.wallR[surfaceIndex];
    case "p":
      return stage.platform[surfaceIndex];
    case "g":
    default:
      return stage.ground[surfaceIndex];
    case "c":
      return stage.ceiling[surfaceIndex];
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/stages/stage.js
// module id = 242
// module chunks = 1
//# sourceURL=webpack:///./src/stages/stage.js?