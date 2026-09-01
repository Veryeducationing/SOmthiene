"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vfxQueue = __webpack_require__(183);

var _sfx = __webpack_require__(120);

var _main = __webpack_require__(11);

var _makeColour = __webpack_require__(15);

exports.default = function (posInQueue) {
  // hack method to ensure sounds are played in 30fps mode
  // index 3 and 5 are unoccupied so i've made them say if the sound has played
  if (_vfxQueue.vfxQueue[posInQueue].face === undefined) {
    _sfx.sounds.ready.play();
    _vfxQueue.vfxQueue[posInQueue].face = true;
  }
  if (_vfxQueue.vfxQueue[posInQueue].timer >= 90) {
    if (_vfxQueue.vfxQueue[posInQueue][5] === undefined) {
      _sfx.sounds.go.play();
      _vfxQueue.vfxQueue[posInQueue][5] = true;
    }
  }
  if (_vfxQueue.vfxQueue[posInQueue].timer < 90) {
    var textGrad = _main.fg2.createLinearGradient(0, 200, 0, 500);
    textGrad.addColorStop(0, "rgb(255, 51, 51)");
    textGrad.addColorStop(0.6, "rgb(255, 51, 51)");
    textGrad.addColorStop(1, "rgb(121, 0, 0)");
    _main.fg2.save();
    _main.fg2.fillStyle = textGrad;
    _main.fg2.textAlign = "start";
    _main.fg2.lineWidth = 20;
    _main.fg2.strokeStyle = "black";
    _main.fg2.font = "italic 900 200px Arial";
    _main.fg2.strokeText("Ready", 240, 420);
    _main.fg2.lineWidth = 10;
    _main.fg2.strokeStyle = "white";
    _main.fg2.strokeText("Ready", 240, 420);
    _main.fg2.fillText("Ready", 240, 420);
    _main.fg2.fillStyle = "rgb(" + Math.round(_vfxQueue.vfxQueue[posInQueue].timer * 2.6) + "," + Math.round(140 - _vfxQueue.vfxQueue[posInQueue].timer * 1.5) + "," + Math.round(255 - _vfxQueue.vfxQueue[posInQueue].timer * 2.6) + ")";
    _main.fg2.font = "italic 700 70px Arial";
    var milli = ((0, _main.getStartTimer)() * 2 % 1).toFixed(2);
    _main.fg2.strokeStyle = "black";
    _main.fg2.strokeText(Math.floor((0, _main.getStartTimer)() * 2) + " " + milli[2] + milli[3], 900, 500);
    _main.fg2.fillText(Math.floor((0, _main.getStartTimer)() * 2) + " " + milli[2] + milli[3], 900, 500);
    _main.fg2.fillStyle = (0, _makeColour.makeColour)(255, 0, 0, 0.2);
    _main.fg2.fillRect(240, 450, 520, 15);
    textGrad = _main.fg2.createLinearGradient(240 + 500 * (_vfxQueue.vfxQueue[posInQueue].timer / 90), 450, 760 + 500 * (_vfxQueue.vfxQueue[posInQueue].timer / 90), 465);
    textGrad.addColorStop(0, "#ff0000");
    textGrad.addColorStop(0.16, "#ff00ff");
    textGrad.addColorStop(0.33, "#0000ff");
    textGrad.addColorStop(0.49, "#00ffff");
    textGrad.addColorStop(0.66, "#00ff00");
    textGrad.addColorStop(0.83, "#ffff00");
    textGrad.addColorStop(1, "#ff0000");
    _main.fg2.fillStyle = textGrad;
    _main.fg2.fillRect(240 + 500 * (_vfxQueue.vfxQueue[posInQueue].timer / 90), 450, 520 - 500 * (_vfxQueue.vfxQueue[posInQueue].timer / 90), 15);
    _main.fg2.restore();
  } else {
    var _textGrad = _main.fg2.createLinearGradient(0, 200, 0, 480);
    _textGrad.addColorStop(0, "black");
    _textGrad.addColorStop(0.6, "black");
    _textGrad.addColorStop(1, "rgb(221, 145, 57)");
    _main.fg2.save();
    _main.fg2.fillStyle = _textGrad;
    _main.fg2.textAlign = "start";
    _main.fg2.lineWidth = 40;
    _main.fg2.strokeStyle = "black";
    _main.fg2.font = "900 400px Arial";
    _main.fg2.strokeText("Go!", 240, 470);
    _main.fg2.lineWidth = 20;
    _main.fg2.strokeStyle = "white";
    _main.fg2.strokeText("Go!", 240, 470);
    _main.fg2.fillText("Go!", 240, 470);
    _main.fg2.restore();
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/dVfx/start.js
// module id = 231
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/dVfx/start.js?