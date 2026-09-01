"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(628);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _Vec2D = __webpack_require__(22);

var _drawVfx = __webpack_require__(134);

var _FALLSPECIAL = __webpack_require__(319);

var _FALLSPECIAL2 = _interopRequireDefault(_FALLSPECIAL);

var _LANDINGFALLSPECIAL = __webpack_require__(320);

var _LANDINGFALLSPECIAL2 = _interopRequireDefault(_LANDINGFALLSPECIAL);

var _UPSPECIALTHROW = __webpack_require__(647);

var _UPSPECIALTHROW2 = _interopRequireDefault(_UPSPECIALTHROW);

var _hitDetection = __webpack_require__(133);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "UPSPECIALCATCH",
  canPassThrough: true,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: false,
  reverseModel: false,
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "UPSPECIALCATCH";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel = new _Vec2D.Vec2D(0, 0);
    _main.player[p].phys.fastfalled = false;
    _main.player[p].phys.upbAngleMultiplier = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.falcondivethrowextra.id0;
    _main.player[p].phys.landingMultiplier = 30 / 34;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      if (_main.player[p].timer == 2) {
        _main.player[p].hitboxes.active = [true, false, false, false];
        _main.player[p].hitboxes.frame = 0;
        for (var n = 0; n < 3; n++) {
          (0, _drawVfx.drawVfx)({
            name: "firefoxtail",
            pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + (-0.5 + Math.random()) * 17, _main.player[p].phys.pos.y + 5 + (-0.5 + Math.random()) * 17),
            face: _main.player[p].phys.face
          });
        }
      }
      if (_main.player[p].timer == 4) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 16) {
      if (_main.player[p].phys.grabbing != -1) {
        _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.falcondivethrow.id0;
        _main.player[p].hitboxes.active = [true, false, false, false];
        _hitDetection.hitQueue.push([_main.player[p].phys.grabbing, p, 0, false, true, false]);
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
      _UPSPECIALTHROW2.default.init(p, input);
      return true;
    } else {
      var grabbing = _main.player[p].phys.grabbing;
      if (grabbing === -1) {
        return;
      }
      if (_main.player[p].timer <= 16 && _main.player[grabbing].phys.grabbedBy !== p) {
        console.log("exiting");
        _UPSPECIALTHROW2.default.init(p, input);
        return true;
      } else {
        return false;
      }
    }
  },
  land: function land(p, input) {}
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/falcon/moves/UPSPECIALCATCH.js
// module id = 646
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falcon/moves/UPSPECIALCATCH.js?