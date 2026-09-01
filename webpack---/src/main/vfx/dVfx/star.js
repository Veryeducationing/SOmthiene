"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _vfxQueue = __webpack_require__(183);

var _main = __webpack_require__(11);

var _drawStar = __webpack_require__(223);

var _activeStage = __webpack_require__(18);

exports.default = function (posInQueue) {
  var tX = _vfxQueue.vfxQueue[posInQueue].newPos.x;
  var tY = _vfxQueue.vfxQueue[posInQueue].newPos.y;
  var t = _vfxQueue.vfxQueue[posInQueue].timer / _vfxQueue.vfxQueue[posInQueue].frames;

  var _vfxQueue$posInQueue$ = _slicedToArray(_vfxQueue.vfxQueue[posInQueue].face, 2),
      deltaX = _vfxQueue$posInQueue$[0],
      deltaY = _vfxQueue$posInQueue$[1];

  var scale = _vfxQueue.vfxQueue[posInQueue].facing;
  var x = tX + deltaX * (0.9 + 0.35 * t),
      y = tY + deltaY * (0.9 + 0.35 * t) + 0.8 * _activeStage.activeStage.scale * t * t;

  _main.fg2.fillStyle = "rgba(196,252,254," + (3 - 4 * t) + ")";
  (0, _drawStar.drawStar)(x, y, scale * 0.3 * _activeStage.activeStage.scale, scale * 1.1 * _activeStage.activeStage.scale, 4, 0);
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/star.js
// module id = 230
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/star.js?