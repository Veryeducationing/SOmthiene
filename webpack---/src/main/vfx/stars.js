"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.stars = stars;

var _Vec2D = __webpack_require__(22);

var _randomAnnulusPoint3 = __webpack_require__(222);

var _drawStar = __webpack_require__(223);

var _drawVfx = __webpack_require__(134);

var _vfx = __webpack_require__(135);

function stars(tX, tY, n, minSpread, maxSpread) {

  for (var i = 0; i < n; i++) {
    var _randomAnnulusPoint = (0, _randomAnnulusPoint3.randomAnnulusPoint)(0, 0, minSpread, maxSpread),
        _randomAnnulusPoint2 = _slicedToArray(_randomAnnulusPoint, 2),
        deltaX = _randomAnnulusPoint2[0],
        deltaY = _randomAnnulusPoint2[1];

    (0, _drawVfx.drawVfx)({ name: "star", timer: 0, pos: new _Vec2D.Vec2D(tX, tY), face: [deltaX, deltaY], facing: 0.4 + 0.8 * Math.random() });
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/stars.js
// module id = 221
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/stars.js?