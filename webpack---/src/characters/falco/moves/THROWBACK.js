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

var _sfx = __webpack_require__(120);

var _article = __webpack_require__(132);

var _actionStateShortcuts = __webpack_require__(10);

var _hitDetection = __webpack_require__(133);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "THROWBACK",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "THROWBACK";
    _main.player[p].timer = 0;
    _actionStateShortcuts.actionStates[_main.characterSelections[_main.player[p].phys.grabbing]].THROWNFALCOBACK.init(_main.player[p].phys.grabbing);
    var frame = _characters.framesData[_main.characterSelections[_main.player[p].phys.grabbing]].THROWNFALCOBACK;
    _main.player[p].phys.releaseFrame = frame + 1;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.throwback.id0;
    (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
    this.main(p, input);
  },
  main: function main(p, input) {
    var prevFrame = _main.player[p].timer;
    _main.player[p].timer += 9 / _main.player[p].phys.releaseFrame;
    if (!this.interrupt(p, input)) {
      if (prevFrame < 10 && _main.player[p].timer >= 10) {
        _main.player[p].phys.face *= -1;
      }
      if (prevFrame < 14 && _main.player[p].timer >= 14) {
        _sfx.sounds.foxlasercock.play();
      }
      if (prevFrame < 15 && _main.player[p].timer >= 15) {
        _article.articles.LASER.init({
          p: p,
          x: 5.2,
          y: 10,
          rotate: Math.PI * 0.22,
          isFox: false
        });
        _sfx.sounds.foxlaserfire.play();
        // 135
        (0, _drawVfx.drawVfx)({
          name: "laser",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 5.2 * _main.player[p].phys.face, _main.player[p].phys.pos.y + 10),
          face: _main.player[p].phys.face,
          f: Math.PI * 0.22,
          color1: { r: 137, g: 255, b: 255 },
          color2: { r: 157, g: 255, b: 255 }
        });
      } else if (prevFrame < 18 && _main.player[p].timer >= 18) {
        _article.articles.LASER.init({
          p: p,
          x: 5.4,
          y: 9.7,
          rotate: Math.PI * 0.20,
          isFox: false
        });
        _sfx.sounds.foxlaserfire.play();
        // 135
        (0, _drawVfx.drawVfx)({
          name: "laser",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 5.4 * _main.player[p].phys.face, _main.player[p].phys.pos.y + 9.7),
          face: _main.player[p].phys.face,
          f: Math.PI * 0.20,
          color1: { r: 137, g: 255, b: 255 },
          color2: { r: 157, g: 255, b: 255 }
        });
      } else if (prevFrame < 21 && _main.player[p].timer >= 21) {
        _article.articles.LASER.init({
          p: p,
          x: 5.3,
          y: 9.8,
          rotate: Math.PI * 0.22,
          isFox: false
        });
        _sfx.sounds.foxlaserfire.play();
        // 135
        (0, _drawVfx.drawVfx)({
          name: "laser",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 5.3 * _main.player[p].phys.face, _main.player[p].phys.pos.y + 9.8),
          face: _main.player[p].phys.face,
          f: Math.PI * 0.22,
          color1: { r: 137, g: 255, b: 255 },
          color2: { r: 157, g: 255, b: 255 }
        });
      }
      if (Math.floor(_main.player[p].timer + 0.01) >= 9 && Math.floor(prevFrame + 0.01) < 9) {
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
// ./src/characters/falco/moves/THROWBACK.js
// module id = 590
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/THROWBACK.js?