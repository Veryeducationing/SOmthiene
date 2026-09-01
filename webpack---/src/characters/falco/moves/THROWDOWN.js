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
  name: "THROWDOWN",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "THROWDOWN";
    _main.player[p].timer = 0;
    _actionStateShortcuts.actionStates[_main.characterSelections[_main.player[p].phys.grabbing]].THROWNFALCODOWN.init(_main.player[p].phys.grabbing);
    var frame = _characters.framesData[_main.characterSelections[_main.player[p].phys.grabbing]].THROWNFALCODOWN;
    _main.player[p].phys.releaseFrame = frame + 1;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.throwdown.id0;
    (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
    this.main(p, input);
  },
  main: function main(p, input) {
    var prevFrame = _main.player[p].timer;
    _main.player[p].timer += 33 / _main.player[p].phys.releaseFrame;
    if (!this.interrupt(p, input)) {
      if (Math.floor(_main.player[p].timer + 0.01) >= 33 && Math.floor(prevFrame + 0.01) < 33) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.throwdown.id0;
        _hitDetection.hitQueue.push([_main.player[p].phys.grabbing, p, 0, false, true, true]);
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      if (prevFrame < 22 && _main.player[p].timer >= 22) {
        _sfx.sounds.foxlasercock.play();
      }
      if (prevFrame < 23 && _main.player[p].timer >= 23) {
        _article.articles.LASER.init({
          p: p,
          x: 1,
          y: 12,
          rotate: Math.PI * 275 / 180,
          isFox: false,
          partOfThrow: true
        });
        _sfx.sounds.foxlaserfire.play();
        // 275
        (0, _drawVfx.drawVfx)({
          name: "laser",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 1 * _main.player[p].phys.face, _main.player[p].phys.pos.y + 12),
          face: _main.player[p].phys.face,
          f: Math.PI * 275 / 180,
          color1: { r: 137, g: 255, b: 255 },
          color2: { r: 157, g: 255, b: 255 }
        });
      } else if (prevFrame < 25 && _main.player[p].timer >= 25) {
        _article.articles.LASER.init({
          p: p,
          x: 1,
          y: 16,
          rotate: Math.PI * 260 / 180,
          isFox: false,
          partOfThrow: true
        });
        _sfx.sounds.foxlaserfire.play();
        // 260
        (0, _drawVfx.drawVfx)({
          name: "laser",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 1 * _main.player[p].phys.face, _main.player[p].phys.pos.y + 16),
          face: _main.player[p].phys.face,
          f: Math.PI * 260 / 180,
          color1: { r: 137, g: 255, b: 255 },
          color2: { r: 157, g: 255, b: 255 }
        });
      } else if (prevFrame < 28 && _main.player[p].timer >= 28) {
        _article.articles.LASER.init({
          p: p,
          x: 2,
          y: 15,
          rotate: Math.PI * 290 / 180,
          isFox: false,
          partOfThrow: true
        });
        _sfx.sounds.foxlaserfire.play();
        // 290
        (0, _drawVfx.drawVfx)({
          name: "laser",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 2 * _main.player[p].phys.face, _main.player[p].phys.pos.y + 15),
          face: _main.player[p].phys.face,
          f: Math.PI * 290 / 180,
          color1: { r: 137, g: 255, b: 255 },
          color2: { r: 157, g: 255, b: 255 }
        });
      } else if (prevFrame < 31 && _main.player[p].timer >= 31) {
        _article.articles.LASER.init({
          p: p,
          x: 2,
          y: 17,
          rotate: Math.PI * 275 / 180,
          isFox: false,
          partOfThrow: true
        });
        _sfx.sounds.foxlaserfire.play();
        // 275
        (0, _drawVfx.drawVfx)({
          name: "laser",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 2 * _main.player[p].phys.face, _main.player[p].phys.pos.y + 17),
          face: _main.player[p].phys.face,
          f: Math.PI * 275 / 180,
          color1: { r: 137, g: 255, b: 255 },
          color2: { r: 157, g: 255, b: 255 }
        });
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 43) {
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
// ./src/characters/falco/moves/THROWDOWN.js
// module id = 591
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/THROWDOWN.js?