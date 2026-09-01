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
  offset: [[-70.70355, -13.91997], [-71.27906, -12.96], [-71.69882, -12.06759], [-72.07618, -11.06843], [-72.24, -9.6], [-72.24, -6.74399], [-72.24, -3.84], [-71.01049, -1.99348], [-68.39889, -0.57355], [-63.64237, 0]],
  setVelocities: [0.1943, 0.03352, 1.59986, 1.91979, 2.12469, 2.21458, 2.18944, 2.04928, 1.79411, 1.42391, 0.93869, 0.33846, 0, 0, 0, -0.34, -0.61998, -0.75406, -1.08875, -1.3431, -1.5171, -1.61075, -1.62405, -1.557, -1.4096, -1.18185, -0.87376, -0.69279, -0.65007, -0.54367, -0.3736],
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
      var onLedge = _main.player[p].phys.onLedge;
      if (onLedge === -1) {
        this.canGrabLedge = false;
        return;
      }
      var l = _activeStage.activeStage.ledge[onLedge];
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
// ./src/characters/fox/moves/CLIFFATTACKQUICK.js
// module id = 480
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/CLIFFATTACKQUICK.js?