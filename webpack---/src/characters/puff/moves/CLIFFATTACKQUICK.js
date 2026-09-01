"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _activeStage = __webpack_require__(18);

var _sfx = __webpack_require__(120);

var _Vec2D = __webpack_require__(22);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFATTACKQUICK",
  offset: [[-73.32, -8.97], [-73.81, -7.87], [-74.29, -6.36], [-74.51, -4.70], [-74.44, -2.88], [-74.22, -0.88], [-73.87, 1.08], [-73.40, 2.76], [-72.81, 3.94], [-72.11, 4.39], [-71.31, 3.70], [-70.42, 2.19], [-69.45, 0.69], [-67.35, 0]],
  setVelocities: [1.16, 1.27, 1.29, 1.24, 1.1, 0.89, 0.59, 0.21, -0.18, -0.34, -0.18, 0],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFATTACKQUICK";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 15;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.ledgegetupquick.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.ledgegetupquick.id1;
    _index2.default.CLIFFATTACKQUICK.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.CLIFFATTACKQUICK.interrupt(p, input)) {
      var onLedge = _main.player[p].phys.onLedge;
      if (onLedge === -1) {
        this.canGrabLedge = false;
        return;
      }
      var l = _activeStage.activeStage.ledge[onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 15) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (_index2.default.CLIFFATTACKQUICK.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + _index2.default.CLIFFATTACKQUICK.offset[_main.player[p].timer - 1][1]);
      } else if (_main.player[p].timer < 27) {
        _main.player[p].phys.cVel.x = _index2.default.CLIFFATTACKQUICK.setVelocities[_main.player[p].timer - 15] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 15) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }
      if (_main.player[p].timer === 19) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing2.play();
      } else if (_main.player[p].timer > 19 && _main.player[p].timer < 24) {
        _main.player[p].hitboxes.frame++;
      } else if (_main.player[p].timer === 24) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 55) {
      _main.player[p].phys.onLedge = -1;
      _main.player[p].phys.ledgeRegrabCount = false;
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }

};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/CLIFFATTACKQUICK.js
// module id = 290
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/CLIFFATTACKQUICK.js?