"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

var _settings = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
exports.default = {
  name: "DOWNSPECIALAIRENDGROUND",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALAIRENDGROUND";
    _main.player[p].timer = 0;
    _main.player[p].phys.fastfalled = false;
    _main.player[p].phys.cVel.y = 0;
    _main.player[p].phys.cVel.x = 0.98542 * _main.player[p].phys.face;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.falconkickland.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.falconkickland.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.falconkickland.id2;
    _sfx.sounds.land.play();
    (0, _drawVfx.drawVfx)({
      name: "groundBounce",
      pos: _main.player[p].phys.pos,
      face: _main.player[p].phys.face,
      f: _main.player[p].phys.groundAngle
    });
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      _main.player[p].phys.cVel.x = Math.sign(_main.player[p].phys.cVel.x) * Math.max(Math.abs(_main.player[p].phys.cVel.x) - 0.24, 0);
      if (_main.player[p].timer === 1) {
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer > 1 && _main.player[p].timer < 3) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 3) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 45) {
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/DOWNSPECIALAIRENDGROUND.js
// module id = 657
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/DOWNSPECIALAIRENDGROUND.js?