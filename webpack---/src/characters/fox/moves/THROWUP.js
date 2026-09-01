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
    var grabbing = _main.player[p].phys.grabbing;
    if (grabbing === -1) {
      return;
    }
    _actionStateShortcuts.actionStates[_main.characterSelections[grabbing]].THROWNFOXUP.init(grabbing, input);
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    var frame = _characters.framesData[_main.characterSelections[grabbing]].THROWNFOXUP;
    _main.player[p].phys.releaseFrame = frame + 1;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.throwup.id0;
    this.main(p, input);
  },
  main: function main(p, input) {
    var prevFrame = _main.player[p].timer;
    _main.player[p].timer += 7 / _main.player[p].phys.releaseFrame;
    if (!this.interrupt(p, input)) {
      if (prevFrame < 13 && _main.player[p].timer >= 13) {
        _sfx.sounds.foxlasercock.play();
      } else if (prevFrame < 16 && _main.player[p].timer >= 16) {
        _article.articles.LASER.init({
          p: p,
          x: 1.6,
          y: 18,
          rotate: Math.PI * 85 / 180
        });
        // rotate 85
        _sfx.sounds.foxlaserfire.play();
        (0, _drawVfx.drawVfx)({
          name: "laser",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 1.6 * _main.player[p].phys.face, _main.player[p].phys.pos.y + 18),
          face: _main.player[p].phys.face,
          f: Math.PI * 85 / 180,
          color1: { r: 255, g: 59, b: 59 },
          color2: { r: 255, g: 57, b: 87 }
        });
      } else if (prevFrame < 18 && _main.player[p].timer >= 18) {
        _article.articles.LASER.init({
          p: p,
          x: 0.5,
          y: 18,
          rotate: Math.PI / 2
        });
        // rotate 90
        _sfx.sounds.foxlaserfire.play();
        (0, _drawVfx.drawVfx)({
          name: "laser",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 0.5 * _main.player[p].phys.face, _main.player[p].phys.pos.y + 18),
          face: _main.player[p].phys.face,
          f: Math.PI / 2,
          color1: { r: 255, g: 59, b: 59 },
          color2: { r: 255, g: 57, b: 87 }
        });
      } else if (prevFrame < 21 && _main.player[p].timer >= 21) {
        _article.articles.LASER.init({
          p: p,
          x: 0,
          y: 18,
          rotate: Math.PI * 87 / 180
        });
        // rotate 87
        _sfx.sounds.foxlaserfire.play();
        (0, _drawVfx.drawVfx)({
          name: "laser",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 0 * _main.player[p].phys.face, _main.player[p].phys.pos.y + 18),
          face: _main.player[p].phys.face,
          f: Math.PI * 87 / 180,
          color1: { r: 255, g: 59, b: 59 },
          color2: { r: 255, g: 57, b: 87 }
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
    if (_main.player[p].timer > 33) {
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
// ./src/characters/fox/moves/THROWUP.js
// module id = 459
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/THROWUP.js?