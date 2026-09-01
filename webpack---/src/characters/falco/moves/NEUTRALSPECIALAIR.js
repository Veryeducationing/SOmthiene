"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

var _article = __webpack_require__(132);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "NEUTRALSPECIALAIR",
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 0,
  init: function init(p, input) {
    _main.player[p].actionState = "NEUTRALSPECIALAIR";
    _main.player[p].timer = 0;
    _main.player[p].phys.laserCombo = false;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      (0, _actionStateShortcuts.fastfall)(p, input);
      (0, _actionStateShortcuts.airDrift)(p, input);
      if (_main.player[p].timer >= 4 && _main.player[p].timer <= 16) {
        if (input[p][0].b && !input[p][1].b) {
          _main.player[p].phys.laserCombo = true;
        }
      }
      if (_main.player[p].timer === 21) {
        if (_main.player[p].phys.laserCombo) {
          _main.player[p].timer = 5;
          _main.player[p].phys.laserCombo = false;
        }
      }
      if (_main.player[p].timer === 7) {
        _sfx.sounds.foxlasercock.play();
      }
      if (_main.player[p].timer === 13) {
        _sfx.sounds.foxlaserfire.play();
        // laser instance
        (0, _drawVfx.drawVfx)({
          name: "laser",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 8 * _main.player[p].phys.face, _main.player[p].phys.pos.y + 9),
          face: _main.player[p].phys.face,
          f: 0,
          color1: { r: 137, g: 255, b: 255 },
          color2: { r: 157, g: 255, b: 255 }
        });

        _article.articles.LASER.init({
          p: p,
          x: 8,
          y: 9,
          rotate: 0,
          isFox: false
        });
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 42) {
      _FALL2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/NEUTRALSPECIALAIR.js
// module id = 576
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/NEUTRALSPECIALAIR.js?