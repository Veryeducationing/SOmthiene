"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _CATCHCUT = __webpack_require__(326);

var _CATCHCUT2 = _interopRequireDefault(_CATCHCUT);

var _characters = __webpack_require__(119);

var _main = __webpack_require__(11);

var _article = __webpack_require__(132);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _hitDetection = __webpack_require__(133);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "THROWUP",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "THROWUP";
    _main.player[p].timer = 0;
    _actionStateShortcuts.actionStates[_main.characterSelections[_main.player[p].phys.grabbing]].THROWNFALCOUP.init(_main.player[p].phys.grabbing, input);
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    var frame = _characters.framesData[_main.characterSelections[_main.player[p].phys.grabbing]].THROWNFALCOUP;
    _main.player[p].phys.releaseFrame = frame + 1;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.throwup.id0;
    this.main(p, input);
  },
  main: function main(p, input) {
    var prevFrame = _main.player[p].timer;
    _main.player[p].timer += 7 / _main.player[p].phys.releaseFrame;
    if (!this.interrupt(p, input)) {
      if (prevFrame < 14 && _main.player[p].timer >= 14) {
        _sfx.sounds.foxlasercock.play();
      }
      if (prevFrame < 18 && _main.player[p].timer >= 18) {
        _article.articles.LASER.init({
          p: p,
          x: 0,
          y: 18,
          rotate: Math.PI / 2,
          isFox: false
        });
        _sfx.sounds.foxlaserfire.play();
        (0, _drawVfx.drawVfx)({
          name: "laser",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 0 * _main.player[p].phys.face, _main.player[p].phys.pos.y + 18),
          face: _main.player[p].phys.face,
          f: Math.PI / 2,
          color1: { r: 137, g: 255, b: 255 },
          color2: { r: 157, g: 255, b: 255 }
        });
      } else if (prevFrame < 20 && _main.player[p].timer >= 20) {
        _article.articles.LASER.init({
          p: p,
          x: 0,
          y: 18,
          rotate: Math.PI / 2,
          isFox: false
        });
        // rotate 90
        _sfx.sounds.foxlaserfire.play();
        (0, _drawVfx.drawVfx)({
          name: "laser",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 0 * _main.player[p].phys.face, _main.player[p].phys.pos.y + 18),
          face: _main.player[p].phys.face,
          f: Math.PI / 2,
          color1: { r: 137, g: 255, b: 255 },
          color2: { r: 157, g: 255, b: 255 }
        });
      } else if (prevFrame < 24 && _main.player[p].timer >= 24) {
        _article.articles.LASER.init({
          p: p,
          x: 0,
          y: 18,
          rotate: Math.PI / 2,
          isFox: false
        });
        _sfx.sounds.foxlaserfire.play();
        (0, _drawVfx.drawVfx)({
          name: "laser",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 0 * _main.player[p].phys.face, _main.player[p].phys.pos.y + 18),
          face: _main.player[p].phys.face,
          f: Math.PI / 2,
          color1: { r: 137, g: 255, b: 255 },
          color2: { r: 157, g: 255, b: 255 }
        });
      } else if (prevFrame < 33 && _main.player[p].timer >= 33) {
        _sfx.sounds.foxlaserholster.play();
      }
      if (Math.floor(_main.player[p].timer + 0.01) >= 7 && Math.floor(prevFrame + 0.01) < 7) {
        _hitDetection.hitQueue.push([_main.player[p].phys.grabbing, p, 0, false, true, false]);
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 38) {
      _main.player[p].phys.grabbing = -1;
      _WAIT2.default.init(p, input);
      return true;
    } else {
      var grabbing = _main.player[p].phys.grabbing;
      if (grabbing === -1) {
        return;
      }
      if (_main.player[p].timer < _main.player[p].phys.releaseFrame && _main.player[grabbing].phys.grabbedBy !== p) {
        _CATCHCUT2.default.init(p, input);
        return true;
      } else {
        return false;
      }
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falco/moves/THROWUP.js
// module id = 592
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/THROWUP.js?