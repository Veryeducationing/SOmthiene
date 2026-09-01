"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vfxQueue = __webpack_require__(183);

var _general = __webpack_require__(189);

var _general2 = _interopRequireDefault(_general);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (posInQueue) {
  (0, _general2.default)(posInQueue, Math.PI / 2 - _vfxQueue.vfxQueue[posInQueue].facing);
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/groundBounce.js
// module id = 204
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/groundBounce.js?