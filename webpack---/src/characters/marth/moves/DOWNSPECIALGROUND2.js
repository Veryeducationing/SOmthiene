"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "DOWNSPECIALGROUND2",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    (0, _actionStateShortcuts.reduceByTraction)(p, true);
    _main.player[p].actionState = "DOWNSPECIALGROUND2";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 16;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.downspecialground2.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.downspecialground2.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.downspecialground2.id2;
    _main.player[p].hitboxes.id[3] = _main.player[p].charHitboxes.downspecialground2.id3;
    _sfx.sounds.powershield.play();
    _sfx.sounds.marthcounterclank.play();
    _sfx.sounds.marthcountershout.play();
    (0, _drawVfx.drawVfx)({
      name: "impactLand",
      pos: _main.player[p].phys.pos,
      face: _main.player[p].phys.face
    });
    (0, _drawVfx.drawVfx)({
      name: "powershield",
      pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x, _main.player[p].phys.pos.y + 8),
      face: _main.player[p].phys.face
    });
    _index2.default.DOWNSPECIALGROUND2.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.DOWNSPECIALGROUND2.interrupt(p, input)) {
      if (_main.player[p].timer === 4) {
        _main.player[p].hitboxes.active = [true, true, true, true];
        _main.player[p].hitboxes.frame = 0;
      } else if (_main.player[p].timer > 4 && _main.player[p].timer < 11) {
        _main.player[p].hitboxes.frame++;
      } else if (_main.player[p].timer === 11) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 36) {
      if (_main.player[p].phys.grounded) {
        _WAIT2.default.init(p, input);
      } else {
        _FALL2.default.init(p, input);
      }
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/DOWNSPECIALGROUND2.js
// module id = 377
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/DOWNSPECIALGROUND2.js?