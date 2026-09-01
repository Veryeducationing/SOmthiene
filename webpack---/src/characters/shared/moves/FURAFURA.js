"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _drawVfx = __webpack_require__(134);

var _characters = __webpack_require__(119);

var _Vec2D = __webpack_require__(22);

exports.default = {
  name: "FURAFURA",
  canEdgeCancel: true,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "FURAFURA";
    _main.player[p].timer = 0;
    _main.player[p].phys.stuckTimer = 490;
    (0, _drawVfx.drawVfx)({
      name: "furaFura",
      pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + (4 + Math.random() * 2) * _main.player[p].phys.face, _main.player[p].phys.pos.y + 11 + Math.random() * 3),
      face: _main.player[p].phys.face
    });
    _main.player[p].furaLoopID = _sfx.sounds.furaloop.play();
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].FURAFURA.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].FURAFURA.interrupt(p, input)) {
      if (_main.player[p].timer % 100 === 65) {
        _sfx.sounds[_characters.actionSounds[_main.characterSelections[p]].FURAFURA[0][1]].play();
      }
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
      if (_main.player[p].timer % 49 === 0) {
        (0, _drawVfx.drawVfx)({
          name: "furaFura",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + (3 + Math.random() * 2) * _main.player[p].phys.face, _main.player[p].phys.pos.y + 11 + Math.random() * 3),
          face: _main.player[p].phys.face
        });
      }
      if (_main.player[p].timer % 49 === 20) {
        (0, _drawVfx.drawVfx)({
          name: "furaFura",
          pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + (5 + Math.random() * 2) * _main.player[p].phys.face, _main.player[p].phys.pos.y + 8 + Math.random() * 3),
          face: _main.player[p].phys.face
        });
      }
      if (_main.player[p].phys.shieldHP > 30) {
        _main.player[p].phys.shieldHP = 30;
      }
      _main.player[p].phys.stuckTimer--;
      if ((0, _actionStateShortcuts.mashOut)(p, input)) {
        _main.player[p].phys.stuckTimer -= 3;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].phys.stuckTimer <= 0) {
      _sfx.sounds.furaloop.stop(_main.player[p].furaLoopID);
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].WAIT.init(p, input);
      return true;
    } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].FURAFURA) {
      _main.player[p].timer = 1;
      return false;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/FURAFURA.js
// module id = 534
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/FURAFURA.js?