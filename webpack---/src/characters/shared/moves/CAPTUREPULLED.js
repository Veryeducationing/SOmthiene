"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

exports.default = {
  name: "CAPTUREPULLED",
  canEdgeCancel: false,
  canBeGrabbed: false,
  inGrab: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CAPTUREPULLED";
    _main.player[p].timer = 0;
    _main.player[p].phys.grounded = true;
    var grabbedBy = _main.player[p].phys.grabbedBy;
    if (grabbedBy === -1) {
      return;
    }
    _main.player[p].phys.face = -1 * _main.player[grabbedBy].phys.face;
    _main.player[p].phys.onSurface = [_main.player[grabbedBy].phys.onSurface[0], _main.player[grabbedBy].phys.onSurface[1]];
    _main.player[p].phys.stuckTimer = 100 + 2 * _main.player[p].percent;
    _sfx.sounds.grabbed.play();
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].CAPTUREPULLED.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].CAPTUREPULLED.interrupt(p, input)) {
      if (_main.player[p].timer === 2) {
        var grabbedBy = _main.player[p].phys.grabbedBy;
        if (grabbedBy === -1) {
          return;
        }
        _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[grabbedBy].phys.pos.x + -16.41205 * _main.player[p].phys.face, _main.player[grabbedBy].phys.pos.y);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 2) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].CAPTUREWAIT.init(p, input);
      var grabbedBy = _main.player[p].phys.grabbedBy;
      if (grabbedBy === -1) {
        return;
      }
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].CATCHWAIT.init(grabbedBy, input);
      (0, _drawVfx.drawVfx)({
        name: "tech",
        pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x, _main.player[p].phys.pos.y + 10)
      });
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/CAPTUREPULLED.js
// module id = 535
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/CAPTUREPULLED.js?