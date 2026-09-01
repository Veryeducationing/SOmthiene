"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _Vec2D = __webpack_require__(22);

var _activeStage = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFATTACKQUICK",
  offset: [[-71.04, -15.95], [-71.70, -14.85], [-72.18, -13.83], [-72.61, -12.68], [-72.8, -11], [-72.8, -7.73], [-72.8, -4.4], [-71.39, -2.28], [-68.40, -0.66], [-62.95, 0]],
  setVelocities: [0.22, 0.04, 1.83, 2.20, 2.43, 2.54, 2.51, 2.35, 2.06, 1.63, 1.08, 0.39, 0, 0, 0, -0.39, -0.71, -0.86, -1.25, -1.54, -1.74, -1.85, -1.86, -1.78, -1.62, -1.35, -1.00, -0.79, -0.74, -0.62, -0.43],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFATTACKQUICK";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 15;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.ledgegetupquick.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.ledgegetupquick.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.ledgegetupquick.id2;
    this.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!this.interrupt(p, input)) {
      var l = _activeStage.activeStage.ledge[_main.player[p].phys.onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 24) {
        if (_main.player[p].timer >= 14) {
          _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (this.offset[_main.player[p].timer - 14][0] + 68.4) * _main.player[p].phys.face, y + this.offset[_main.player[p].timer - 14][1]);
        }
      } else {
        _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 24] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 24) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }

      if (_main.player[p].timer === 25) {
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing2.play();
        // needs 3
        (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
      } else if (_main.player[p].timer > 25 && _main.player[p].timer < 35) {
        _main.player[p].hitboxes.frame++;
      } else if (_main.player[p].timer === 35) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 54) {
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
// ./src/characters/falco/moves/CLIFFATTACKQUICK.js
// module id = 621
// module chunks = 1
//# sourceURL=webpack:///./src/characters/falco/moves/CLIFFATTACKQUICK.js?