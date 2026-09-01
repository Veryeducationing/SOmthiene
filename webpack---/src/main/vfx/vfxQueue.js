"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetVfxQueue = resetVfxQueue;
exports.addToVfxQueue = addToVfxQueue;
exports.dropFromVfxQueue = dropFromVfxQueue;
var vfxQueue = exports.vfxQueue = [];

function resetVfxQueue() {
  exports.vfxQueue = vfxQueue = [];
}

function addToVfxQueue(val) {
  vfxQueue.push(val);
}

function dropFromVfxQueue(start, count) {
  vfxQueue.splice(start, count);
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/vfxQueue.js
// module id = 183
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/vfxQueue.js?