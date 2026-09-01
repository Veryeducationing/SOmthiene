"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _DOWNSPECIALGROUNDENDAIR = __webpack_require__(659);

var _DOWNSPECIALGROUNDENDAIR2 = _interopRequireDefault(_DOWNSPECIALGROUNDENDAIR);

var _DOWNSPECIALGROUNDENDGROUND = __webpack_require__(660);

var _DOWNSPECIALGROUNDENDGROUND2 = _interopRequireDefault(_DOWNSPECIALGROUNDENDGROUND);

var _UPSPECIALTHROW = __webpack_require__(647);

var _UPSPECIALTHROW2 = _interopRequireDefault(_UPSPECIALTHROW);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "DOWNSPECIALGROUND",
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  canEdgeCancel: true,
  disableTeeter: true,
  specialWallCollide: true,
  airborneState: "DOWNSPECIALGROUND",
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALGROUND";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel.x = 0;
    _main.player[p].phys.cVel.y = 0;
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.falconkickgroundClean.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.falconkickgroundClean.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.falconkickgroundClean.id2;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _sfx.sounds.falconkickshout.play();
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer >= 12) {
        _main.player[p].phys.cVel.x = 2.67586 * _main.player[p].phys.face;
        if (_main.player[p].timer % 2) {
          (0, _drawVfx.drawVfx)({
            name: "firefoxtail",
            pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + 12 * _main.player[p].phys.face, _main.player[p].phys.pos.y + 3),
            face: _main.player[p].phys.face
          });
        }
      }
      if (_main.player[p].timer === 14) {
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.falconkick.play();
      }
      if (_main.player[p].timer > 14 && _main.player[p].timer < 33) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 17) {
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.falconkickgroundMid.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.falconkickgroundMid.id1;
        _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.falconkickgroundMid.id2;
      }
      if (_main.player[p].timer === 25) {
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.falconkickgroundLate.id0;
        _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.falconkickgroundLate.id1;
        _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.falconkickgroundLate.id2;
      }
      if (_main.player[p].timer === 33) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 39) {
      if (_main.player[p].phys.grounded) {
        _DOWNSPECIALGROUNDENDGROUND2.default.init(p, input);
      } else {
        _DOWNSPECIALGROUNDENDAIR2.default.init(p, input);
      }
      return true;
    } else {
      return false;
    }
  },
  onWallCollide: function onWallCollide(p, input, wallFace, wallNum) {
    if (wallFace === "R" && _main.player[p].phys.face === -1 || wallFace === "L" && _main.player[p].phys.face === 1) {
      _main.player[p].phys.grounded = false;
      _UPSPECIALTHROW2.default.init(p, input);
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/DOWNSPECIALGROUND.js
// module id = 658
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/DOWNSPECIALGROUND.js?