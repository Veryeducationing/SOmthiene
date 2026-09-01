'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dVfx = exports.vfx = exports.showVfx = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.isShowSFX = isShowSFX;
exports.toggleShowSFX = toggleShowSFX;

var _vfxData = __webpack_require__(136);

var _vfxData2 = _interopRequireDefault(_vfxData);

var _dVfx = __webpack_require__(181);

var _dVfx2 = _interopRequireDefault(_dVfx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var twoPi = Math.PI * 2;

var showVfx = exports.showVfx = true;

function isShowSFX() {
  return showVfx;
}
function toggleShowSFX() {
  exports.showVfx = showVfx = !showVfx;
}

var vfx = exports.vfx = _extends({}, _vfxData2.default);

vfx.wallBounce.path = vfx.groundBounce.path;
vfx.wallBounce.colour = vfx.groundBounce.colour;
vfx.wallBounce.frames = vfx.groundBounce.frames;
vfx.ceilingBounce.path = vfx.groundBounce.path;
vfx.ceilingBounce.colour = vfx.groundBounce.colour;
vfx.ceilingBounce.frames = vfx.groundBounce.frames;

var dVfx = exports.dVfx = _extends({}, _dVfx2.default);

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx.js
// module id = 135
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx.js?