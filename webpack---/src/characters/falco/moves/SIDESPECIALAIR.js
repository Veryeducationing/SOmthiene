"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FALLSPECIAL = __webpack_require__(319);

var _FALLSPECIAL2 = _interopRequireDefault(_FALLSPECIAL);

var _LANDINGFALLSPECIAL = __webpack_require__(320);

var _LANDINGFALLSPECIAL2 = _interopRequireDefault(_LANDINGFALLSPECIAL);

var _article = __webpack_require__(132);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _drawVfx = __webpack_require__(134);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "SIDESPECIALAIR",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [true, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "SIDESPECIALAIR";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel.x *= 0.667;
    _main.player[p].phys.cVel.y = 0;
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
      if (_main.player[p].timer <= 15) {
        if (_main.player[p].phys.cVel.x !== 0) {
          var dir = Math.sign(_main.player[p].phys.cVel.x);
          _main.player[p].phys.cVel.x -= dir * 0.05;
          if (_main.player[p].phys.cVel.x * dir < 0) {
            _main.player[p].phys.cVel.x = 0;
          }
        }
      }
      if (_main.player[p].timer >= 25) {
        _main.player[p].phys.cVel.y -= 0.08;
      }

      if (_main.player[p].timer === 16) {
        _sfx.sounds.phantasm.play();
        _sfx.sounds.phantasmshout.play();
      }

      if (_main.player[p].timer === 17) {
        _main.player[p].phys.cVel.x = 16.50 * _main.player[p].phys.face;
      }

      if (_main.player[p].timer === 18) {
        _article.articles.ILLUSION.init({
          p: p,
          type: 0,
          isFox: false
        });
        if ((input[p][0].b || input[p][1].b) && !input[p][2].b) {
          _main.player[p].timer = 20;
        }
      } else if (_main.player[p].timer >= 16 && _main.player[p].timer < 20) {
        if (input[p][0].b && !input[p][1].b) {
          _main.player[p].timer = 20;
        }
      }
      if (_main.player[p].timer === 20) {
        _main.player[p].phys.cVel.x = 2 * _main.player[p].phys.face;
      }
      if (_main.player[p].timer > 20) {
        _main.player[p].phys.cVel.x -= 0.07 * _main.player[p].phys.face;
        if (_main.player[p].phys.cVel.x * _main.player[p].phys.face < 0) {
          _main.player[p].phys.cVel.x = 0;
        }
      }

      if (_main.player[p].timer >= 18 && _main.player[p].timer <= 21) {
        (0, _drawVfx.drawVfx)({
          name: "phantasm",
          pos: _main.player[p].phys.posPrev,
          face: _main.player[p].phys.face
        });
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 58) {
      _FALLSPECIAL2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    if (_main.player[p].timer >= 20) {
      _LANDINGFALLSPECIAL2.default.init(p, input);
    } else {
      _main.player[p].actionState = "SIDESPECIALGROUND";
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/SIDESPECIALAIR.js
// module id = 578
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/SIDESPECIALAIR.js?