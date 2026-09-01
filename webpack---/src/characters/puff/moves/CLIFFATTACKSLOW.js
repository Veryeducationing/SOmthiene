"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _activeStage = __webpack_require__(18);

var _Vec2D = __webpack_require__(22);

var _sfx = __webpack_require__(120);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFATTACKSLOW",
  offset: [[-73.10, -9.44], [-73.10, -9.56], [-73.10, -9.71], [-73.09, -9.87], [-73.09, -10.01], [-73.09, -10.12], [-73.09, -10.19], [-73.09, -10.23], [-73.09, -10.24], [-73.09, -10.21], [-73.09, -10.14], [-73.09, -10.04], [-73.09, -9.94], [-73.09, -9.89], [-73.09, -9.87], [-73.09, -9.87], [-73.09, -9.87], [-73.09, -9.63], [-73.09, -9.04], [-73.09, -8.28], [-73.09, -7.52], [-73.09, -6.76], [-73.09, -5.93], [-73.09, -5.07], [-73.09, -4.23], [-72.76, -3.35], [-71.98, -2.44], [-71.05, -1.60], [-70.28, -0.94], [-69.72, -0.50], [-69.22, -0.21], [-68.78, -0.05], [-68.02, 0]],
  setVelocities: [0.34, 0.34, 0.35, 0.38, 0.43, 0.50, 0.59, 0.69, 1.86, 2.03, 1.09, 1.02, 0.85, 0.58, 0.22, -0.07, -0.20, -0.31, -0.40, -0.47, -0.53, -0.57, -0.59, -0.59, -0.58, -0.55, -0.50, -0.43, -0.35, -0.25, -0.16, -0.09, -0.03, 0.002, 0.02, 0.03],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFATTACKSLOW";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 39;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.ledgegetupslow.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.ledgegetupslow.id1;
    _index2.default.CLIFFATTACKSLOW.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.CLIFFATTACKSLOW.interrupt(p, input)) {
      var onLedge = _main.player[p].phys.onLedge;
      if (onLedge === -1) {
        this.canGrabLedge = false;
        return;
      }
      var l = _activeStage.activeStage.ledge[onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 34) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (_index2.default.CLIFFATTACKSLOW.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + _index2.default.CLIFFATTACKSLOW.offset[_main.player[p].timer - 1][1]);
      } else {
        _main.player[p].phys.cVel.x = _index2.default.CLIFFATTACKSLOW.setVelocities[_main.player[p].timer - 34] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 33) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }

      if (_main.player[p].timer === 43) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing2.play();
      } else if (_main.player[p].timer > 43 && _main.player[p].timer < 60) {
        _main.player[p].hitboxes.frame++;
      } else if (_main.player[p].timer === 60) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 69) {
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
// ./src/characters/puff/moves/CLIFFATTACKSLOW.js
// module id = 291
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/CLIFFATTACKSLOW.js?