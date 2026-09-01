"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawArrayPath = drawArrayPath;
function drawArrayPath(can, col, face, tX, tY, path, scaleX, scaleY) {
  for (var j = 0; j < path.length; j++) {
    var x = path[j][0] * scaleX * face + tX;
    var y = path[j][1] * scaleY + tY;
    if (j === 0) {
      can.fillStyle = col;
      can.beginPath();
      can.moveTo(x, y);
    } else {
      can.lineTo(x, y);
    }
  }
  can.closePath();
  can.fill();
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/drawArrayPath.js
// module id = 184
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/drawArrayPath.js?