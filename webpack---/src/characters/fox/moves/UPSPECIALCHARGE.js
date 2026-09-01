"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UPSPECIALLAUNCH = __webpack_require__(449);

var _UPSPECIALLAUNCH2 = _interopRequireDefault(_UPSPECIALLAUNCH);

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _drawVfx = __webpack_require__(134);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "UPSPECIALCHARGE",
  canPassThrough: false, // ???
  canGrabLedge: [true, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  canEdgeCancel: true,
  disableTeeter: true,
  airborneState: "UPSPECIALCHARGE",
  landType: 1,
  init: function init(p, input) {
    _main.player[p].actionState = "UPSPECIALCHARGE";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel.x *= 0.8;
    _main.player[p].phys.cVel.y = 0;
    _main.player[p].phys.fastfalled = false;
    _main.player[p].phys.landingMultiplier = 10;
    _sfx.sounds.foxupbburn.play();
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.upb1.id0;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      var frame = (_main.player[p].timer - 1) % 10;
      (0, _drawVfx.drawVfx)({
        name: "firefoxcharge",
        pos: _main.player[p].phys.pos,
        face: _main.player[p].phys.face,
        f: frame
      });

      if (_main.player[p].phys.grounded) {
        (0, _actionStateShortcuts.reduceByTraction)(p);
      } else {
        if (_main.player[p].phys.cVel.x > 0) {
          _main.player[p].phys.cVel.x -= _main.player[p].charAttributes.airFriction;
          if (_main.player[p].phys.cVel.x < 0) {
            _main.player[p].phys.cVel.x = 0;
          }
        } else if (_main.player[p].phys.cVel.x < 0) {
          _main.player[p].phys.cVel.x += _main.player[p].charAttributes.airFriction;
          if (_main.player[p].phys.cVel.x > 0) {
            _main.player[p].phys.cVel.x = 0;
          }
        }
      }

      if (_main.player[p].timer === 42) {
        var firefoxAngle = input[p][0].lsX === 0 && input[p][0].lsY === 0 ? Math.PI / 2 : Math.atan2(input[p][0].lsY, input[p][0].lsX);

        if (_main.player[p].phys.grounded && _main.player[p].phys.onSurface[0] === 0) {
          if (firefoxAngle < -Math.PI / 2) {
            // need the angle to go from -pi/2 to 3pi/2, important for the upcoming comparisons 
            firefoxAngle += 2 * Math.PI;
          }
          var groundedAngle = _main.player[p].phys.groundAngle || Math.PI / 2;
          if (firefoxAngle > groundedAngle + Math.PI / 2) {
            firefoxAngle = groundedAngle + Math.PI / 2;
          } else if (firefoxAngle < groundedAngle - Math.PI / 2) {
            firefoxAngle = groundedAngle - Math.PI / 2;
          }
        }
        if (firefoxAngle > Math.PI) {
          // return an angle between -pi and pi
          firefoxAngle -= 2 * Math.PI;
        }
        _main.player[p].phys.upbAngleMultiplier = firefoxAngle;
      } else if (_main.player[p].timer >= 16 && !_main.player[p].phys.grounded) {
        _main.player[p].phys.cVel.y -= 0.015;
      }

      if (_main.player[p].timer > 19 && _main.player[p].timer < 34) {
        switch (_main.player[p].timer % 2) {
          case 0:
            _main.player[p].hitboxes.active = [true, false, false, false];
            _main.player[p].hitboxes.frame = 0;
            break;
          case 1:
            (0, _actionStateShortcuts.turnOffHitboxes)(p);
            break;
        }
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 42) {
      _UPSPECIALLAUNCH2.default.init(p, input);
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    // do nothing
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/fox/moves/UPSPECIALCHARGE.js
// module id = 448
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/UPSPECIALCHARGE.js?