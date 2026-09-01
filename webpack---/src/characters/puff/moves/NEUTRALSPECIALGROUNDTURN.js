"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _drawVfx = __webpack_require__(134);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "NEUTRALSPECIALGROUNDTURN",
  canEdgeCancel: false,
  canBeGrabbed: true,
  specialOnHit: true,
  init: function init(p, input) {
    _main.player[p].actionState = "NEUTRALSPECIALGROUNDTURN";
    _main.player[p].timer = 0;
    _main.player[p].phys.rollOutTurnTimer = 0;
    _main.player[p].phys.face *= -1;
    _sfx.sounds.rolloutlaunch.play();
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _index2.default.NEUTRALSPECIALGROUNDTURN.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer += 3;
    if (_main.player[p].timer > 30) {
      _main.player[p].timer = 3;
    }
    _main.player[p].phys.rollOutTurnTimer++;
    _main.player[p].phys.rollOutDistance++;
    if (!_index2.default.NEUTRALSPECIALGROUNDTURN.interrupt(p, input)) {
      _main.player[p].phys.cVel.x = _main.player[p].phys.rollOutVel * _main.player[p].phys.face * -1 - _main.player[p].phys.rollOutVel * 0.045 * _main.player[p].phys.rollOutTurnTimer * _main.player[p].phys.face * -1;
      if (_main.player[p].phys.rollOutDistance % 5 === 0) {
        (0, _drawVfx.drawVfx)({
          name: "dashDust",
          pos: _main.player[p].phys.pos,
          face: _main.player[p].phys.face
        });
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].phys.rollOutDistance > 100) {
      _main.player[p].actionState = "NEUTRALSPECIALGROUND";
      _main.player[p].timer = 46;
      return true;
    } else if (_main.player[p].phys.rollOutTurnTimer > 28) {
      _main.player[p].phys.cVel.x = _main.player[p].phys.rollOutVel * _main.player[p].phys.face;
      _main.player[p].actionState = "NEUTRALSPECIALGROUND";
      _main.player[p].timer = 15 + _main.player[p].timer;
      if (_main.player[p].phys.rollOutCharge >= 19) {
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.neutralspecialground.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.neutralspecialground.id1;
        _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.neutralspecialground.id2;
        _main.player[p].hitboxes.active = [true, true, true, false];
      }
      _sfx.sounds.stronghit.play();
      return true;
    } else {
      return false;
    }
  },
  onPlayerHit: function onPlayerHit(p) {
    _main.player[p].actionState = "NEUTRALSPECIALAIR";
    _index2.default.NEUTRALSPECIALAIR.onPlayerHit(p);
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/NEUTRALSPECIALGROUNDTURN.js
// module id = 322
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/NEUTRALSPECIALGROUNDTURN.js?