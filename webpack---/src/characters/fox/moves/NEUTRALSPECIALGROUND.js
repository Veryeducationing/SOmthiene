"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _article = __webpack_require__(132);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "NEUTRALSPECIALGROUND",
  canPassThrough: false,
  canEdgeCancel: true,
  disableTeeter: true,
  canBeGrabbed: true,
  airborneState: "NEUTRALSPECIALAIR",
  init: function init(p, input) {
    _main.player[p].actionState = "NEUTRALSPECIALGROUND";
    _main.player[p].timer = 0;
    _main.player[p].phys.laserCombo = false;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p);
      if (_main.player[p].timer >= 4 && _main.player[p].timer <= 16) {
        if (input[p][0].b && !input[p][1].b) {
          _main.player[p].phys.laserCombo = true;
        }
      }
      if (_main.player[p].timer === 17) {
        if (_main.player[p].phys.laserCombo) {
          _main.player[p].timer = 7;
          _main.player[p].phys.laserCombo = false;
        }
      }
      if (_main.player[p].timer === 9) {
        _sfx.sounds.foxlasercock.play();
      }
      if (_main.player[p].timer === 12) {
        _sfx.sounds.foxlaserfire.play();
        // laser instance
        (0, _drawVfx.drawVfx)({
          name: "laser",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 8 * _main.player[p].phys.face, _main.player[p].phys.pos.y + 7),
          face: _main.player[p].phys.face,
          f: 0,
          color1: { r: 255, g: 59, b: 59 },
          color2: { r: 255, g: 57, b: 87 }
        });
        _article.articles.LASER.init({
          p: p,
          x: 8,
          y: 7,
          rotate: 0
        });
      }
      if (_main.player[p].timer === 37) {
        _sfx.sounds.foxlaserholster.play();
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 40) {
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/fox/moves/NEUTRALSPECIALGROUND.js
// module id = 452
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/NEUTRALSPECIALGROUND.js?