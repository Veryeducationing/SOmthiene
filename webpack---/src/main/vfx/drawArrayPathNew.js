"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawArrayPathNew = drawArrayPathNew;
function drawArrayPathNew(can, col, face, tX, tY, path, scaleX, scaleY, rotate, rpX, rpY, extra) {
  can.save();
  if (extra !== undefined) {
    extra();
  }
  can.translate(tX - rpX, tY - rpY);
  can.rotate(rotate);
  for (var j = 0; j < path.length; j++) {
    var x = path[j][0] * scaleX * face + rpX;
    var y = path[j][1] * scaleY + rpY;
    if (j === 0) {
      can.fillStyle = col;
      can.beginPath();
      can.moveTo(x, y);
    } else {
      if (path[j].length === 2) {
        can.moveTo(x, y);
      } else {
        can.bezierCurveTo(x, y, path[j][2] * scaleX * face + rpX, path[j][3] * scaleY + rpY, path[j][4] * scaleX * face + rpX, path[j][5] * scaleY + rpY);
      }
    }
  }
  can.closePath();
  can.fill();
  can.restore();
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/drawArrayPathNew.js
// module id = 199
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/drawArrayPathNew.js?