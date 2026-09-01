"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chromaticAberration = chromaticAberration;

var _makeColour = __webpack_require__(15);

function chromaticAberration(ctx, drawFunction, col1, col2, opacity, vec) {

  ctx.save();

  ctx.globalCompositeOperation = "screen";

  drawFunction((0, _makeColour.makeColour)(0, col1.g, 0, opacity), (0, _makeColour.makeColour)(0, col2.g, 0, opacity));

  ctx.translate(-vec.x, -vec.y);
  drawFunction((0, _makeColour.makeColour)(col1.r, 0, 0, opacity), (0, _makeColour.makeColour)(col2.r, 0, 0, opacity));

  ctx.translate(2 * vec.x, 2 * vec.y);
  drawFunction((0, _makeColour.makeColour)(0, 0, col1.b, opacity), (0, _makeColour.makeColour)(0, 0, col2.b, opacity));

  ctx.restore();
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/chromaticAberration.js
// module id = 213
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/chromaticAberration.js?