"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singGen = singGen;

var _vfxQueue = __webpack_require__(183);

var _main = __webpack_require__(11);

var _Vec2D = __webpack_require__(22);

var _activeStage = __webpack_require__(18);

var _drawArrayPathNew = __webpack_require__(199);

var _render = __webpack_require__(13);

var _index = __webpack_require__(136);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// singGen produces sing vfx according to different parameters
// rMin: initial note radius
// rMax: final note radius
// notePhase: angle offset for notes
// posScale: modifier to account for how much the sing vfx should move left to right to follow the animation
// posPhase : phase offset for the sing vfx left/right movement
function singGen(j, rMin, rMax, notePhase, posScale, posPhase) {
  var i = void 0;
  _main.fg2.save();
  var p = _vfxQueue.vfxQueue[j].face;
  // total 31
  // fade out on 26
  // 5 frames of fade in, full opacity on frame 6
  var frame = _vfxQueue.vfxQueue[j].timer;
  var pos = new _Vec2D.Vec2D(_main.player[p].phys.pos.x, _main.player[p].phys.pos.y + 8);
  var lrScaling = posScale * _main.player[p].phys.face;
  _main.fg2.translate((pos.x - 0.8) * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0] + lrScaling * Math.cos(frame / 6.5 + posPhase), pos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1] - 2.5 * Math.sin(frame / 8));
  // cos/sin functions account for the character animation moving the sing vfx
  var opaqMultiplier = 0.8;
  var opaq = opaqMultiplier; //opacity
  if (frame < 6) {
    opaq = opaqMultiplier * frame / 6;
  } else if (frame > 25) {
    opaq = opaqMultiplier * (1 - (frame - 25) / 6);
  }
  _main.fg2.globalCompositeOperation = "screen";
  _main.fg2.strokeStyle = "rgba(244, 212, 45," + opaq + ")";
  _main.fg2.lineWidth = 3;
  for (i = 0; i < 5; i++) {
    _main.fg2.beginPath();
    _main.fg2.arc(0, 0, (i + 1) * 1.6 * _activeStage.activeStage.scale, 0, _render.twoPi);
    _main.fg2.closePath();
    _main.fg2.stroke();
  }
  _main.fg2.fillStyle = "rgba(191, 82, 146," + opaq + ")";
  _main.fg2.beginPath();
  _main.fg2.arc(-4.5 * _activeStage.activeStage.scale * Math.sin(frame * 0.07 + 0.2), -4.5 * _activeStage.activeStage.scale * Math.cos(frame * 0.07 + 0.2), 3.5 * _activeStage.activeStage.scale, 0, _render.twoPi);
  _main.fg2.closePath();
  _main.fg2.fill();
  _main.fg2.beginPath();
  _main.fg2.arc(4.5 * _activeStage.activeStage.scale * Math.sin(frame * 0.07 + 0.2), 4.5 * _activeStage.activeStage.scale * Math.cos(frame * 0.07 + 0.2), 3.5 * _activeStage.activeStage.scale, 0, _render.twoPi);
  _main.fg2.closePath();
  _main.fg2.fill();
  _main.fg2.globalCompositeOperation = "source-over";
  var angles = [notePhase + frame * 0.1, notePhase + 2 * Math.PI / 3 + frame * 0.1, notePhase + 4 * Math.PI / 3 + frame * 0.1];
  var r = rMax; // distance of notes from center
  if (frame < 15) {
    r = rMin + frame * (rMax - rMin) / 15;
  }
  opaq += 0.2;
  var col = ["rgba(255,1,2," + opaq + ")", "rgba(5,255,0," + opaq + ")", "rgba(12,0,255," + opaq + ")"];
  for (i = 0; i < 3; i++) {
    (0, _drawArrayPathNew.drawArrayPathNew)(_main.fg2, col[i], 1, (r * Math.cos(angles[i]) - 3) * _activeStage.activeStage.scale, (r * Math.sin(angles[i]) + 3) * -_activeStage.activeStage.scale, _index2.default.sing.path, 0.7 * (_activeStage.activeStage.scale / 4.5), 0.7 * (_activeStage.activeStage.scale / 4.5), 0, 0, 0);
  }
  _main.fg2.restore();
}

//////////////////
// WEBPACK FOOTER
// ./src/main/vfx/singGen.js
// module id = 227
// module chunks = 1
//# sourceURL=webpack:///./src/main/vfx/singGen.js?