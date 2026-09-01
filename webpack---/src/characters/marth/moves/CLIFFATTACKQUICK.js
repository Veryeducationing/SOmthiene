"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _activeStage = __webpack_require__(18);

var _sfx = __webpack_require__(120);

var _Vec2D = __webpack_require__(22);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFATTACKQUICK",
  offset: [[-71.31, -23.71], [-71.32, -23.71], [-71.36, -23.71], [-71.41, -23.71], [-71.46, -23.71], [-71.49, -23.71], [-71.48, -23.71], [-71.42, -23.71], [-71.28, -23.71], [-71.06, -22.49], [-70.72, -19.41], [-70.33, -15.28], [-69.94, -11.06], [-69.55, -7.59], [-69.16, -4.33], [-68.77, -1.27], [-67.98, 0]],
  setVelocities: [0.39, 0.39, 0.38, 0.38, 0.38, 0.38, 0.37, 0.37, 0.36, 0.36, 0.35, 0.35, 0.29, 0.19, 0.11, 0.05, 0, -0.02, -0.03, -0.01, 0, -0.01, -0.01, -0.02, -0.02, -0.03, -0.03, -0.04, -0.04, -0.04, -0.04, -0.04, -0.04, -0.05, -0.04, -0.04, -0.04],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFATTACKQUICK";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 20;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.ledgegetupquick.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.ledgegetupquick.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.ledgegetupquick.id2;
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
      if (_main.player[p].timer < 18) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (_index2.default.CLIFFATTACKQUICK.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + _index2.default.CLIFFATTACKQUICK.offset[_main.player[p].timer - 1][1]);
      } else {
        _main.player[p].phys.cVel.x = _index2.default.CLIFFATTACKQUICK.setVelocities[_main.player[p].timer - 18] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 17) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }

      if (_main.player[p].timer === 24) {
        _main.player[p].hitboxes.active = [true, true, false, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing2.play();
        // needs 3
        (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
      } else if (_main.player[p].timer > 24 && _main.player[p].timer < 28) {
        _main.player[p].hitboxes.frame++;
      } else if (_main.player[p].timer === 28) {
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
// ./src/characters/marth/moves/CLIFFATTACKQUICK.js
// module id = 364
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/CLIFFATTACKQUICK.js?