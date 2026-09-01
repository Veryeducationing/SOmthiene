"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SIDESPECIALAIR = __webpack_require__(453);

var _SIDESPECIALAIR2 = _interopRequireDefault(_SIDESPECIALAIR);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALLSPECIAL = __webpack_require__(319);

var _FALLSPECIAL2 = _interopRequireDefault(_FALLSPECIAL);

var _article = __webpack_require__(132);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _drawVfx = __webpack_require__(134);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "SIDESPECIALGROUND",
  canPassThrough: false,
  canEdgeCancel: true,
  disableTeeter: true,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  airborneState: "SIDESPECIALAIR",
  init: function init(p, input) {
    _main.player[p].actionState = "SIDESPECIALGROUND";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel.x = 0;
    _main.player[p].phys.landingMultiplier = 1.5;
    (0, _drawVfx.drawVfx)({
      name: "dashDust",
      pos: _main.player[p].phys.pos,
      face: _main.player[p].phys.face
    });
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _sfx.sounds.star.play();
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].phys.grounded) {
        if (_main.player[p].timer === 21) {
          _article.articles.ILLUSION.init({
            p: p,
            type: 1
          });
          _main.player[p].phys.cVel.x = 18.72 * _main.player[p].phys.face;
          if ((input[p][0].b || input[p][1].b) && !input[p][2].b) {
            _main.player[p].timer = 24;
          }
        } else if (_main.player[p].timer === 22 || _main.player[p].timer === 23) {
          if (input[p][0].b && !input[p][1].b) {
            _main.player[p].timer = 24;
          }
        }
        if (_main.player[p].timer === 24) {
          _main.player[p].phys.cVel.x = 2.1 * _main.player[p].phys.face;
        }
        if (_main.player[p].timer > 24) {
          _main.player[p].phys.cVel.x -= 0.1 * _main.player[p].phys.face;
          if (_main.player[p].phys.cVel.x * _main.player[p].phys.face < 0) {
            _main.player[p].phys.cVel.x = 0;
          }
        }

        if (_main.player[p].timer === 20) {
          _sfx.sounds.foxillusion1.play();
          _sfx.sounds.foxillusion2.play();
        }
      } else {
        _main.player[p].actionState = "SIDESPECIALAIR";
        _main.player[p].timer--;
        _SIDESPECIALAIR2.default.main(p, input);
      }

      if (_main.player[p].timer >= 21 && _main.player[p].timer <= 24) {
        (0, _drawVfx.drawVfx)({
          name: "illusion",
          pos: _main.player[p].phys.posPrev,
          face: _main.player[p].phys.face
        });
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 63) {
      if (_main.player[p].phys.grounded) {
        _WAIT2.default.init(p, input);
      } else {
        _FALLSPECIAL2.default.init(p, input);
      }
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {}
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/fox/moves/SIDESPECIALGROUND.js
// module id = 454
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/SIDESPECIALGROUND.js?