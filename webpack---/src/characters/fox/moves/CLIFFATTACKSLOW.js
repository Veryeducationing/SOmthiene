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
  name: "CLIFFATTACKSLOW",
  offset: [[-70.32, -14.23684], [-70.32, -14.04406], [-70.32, -13.83467], [-70.32, -13.62174], [-70.32, -13.41828], [-70.32, -13.23734], [-70.32, -13.09195], [-70.32, -12.99516], [-70.32, -12.96], [-70.32, -12.96], [-70.32, -12.96], [-70.32, -12.96], [-70.32, -12.96], [-70.32, -12.96], [-70.32, -12.96], [-70.32, -12.96], [-70.32, -12.96], [-70.32, -12.94935], [-70.32, -12.91799], [-70.32, -12.86679], [-70.32, -12.79665], [-70.32, -12.70842], [-70.32, -12.603], [-70.32, -12.48127], [-70.32, -12.3441], [-70.32, -12.19237], [-70.32, -12.02697], [-70.32, -11.84876], [-70.32, -11.65864], [-70.32, -11.45747], [-70.32, -11.24615], [-70.32, -11.02554], [-70.32, -10.79653], [-70.32, -10.56], [-70.32, -10.31413], [-70.32, -10.05515], [-70.32, -9.78105], [-70.32, -9.48977], [-70.32, -9.17929], [-70.32, -8.84757], [-70.32, -8.49258], [-70.32, -8.11228], [-70.32, -7.70465], [-70.32, -7.26763], [-70.32, -6.79921], [-70.32, -6.29734], [-70.32, -5.76], [-70.17651, -4.94739], [-69.81816, -3.77266], [-69.35315, -2.46318], [-68.88966, -1.24633], [-68.53587, -0.34948], [-68.26413, 0]],
  setVelocities: [0.34921, 0.88711, 1.15682, 1.15835, 0.89168, 0.35682, 0, 0, 0, 0, 0, -0.16, -0.32, -0.350399, -0.385, -0.37701],
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFATTACKSLOW";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 53;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.ledgegetupslow.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.ledgegetupslow.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.ledgegetupslow.id1;
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
      if (_main.player[p].timer < 54) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (this.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + this.offset[_main.player[p].timer - 1][1]);
      } else {
        _main.player[p].phys.cVel.x = this.setVelocities[_main.player[p].timer - 54] * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 54) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }

      if (_main.player[p].timer === 57) {
        _main.player[p].hitboxes.active = [true, true, true, false];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.normalswing2.play();
        (0, _actionStateShortcuts.randomShout)(_main.characterSelections[p]);
      } else if (_main.player[p].timer > 57 && _main.player[p].timer < 60) {
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
// ./src/characters/fox/moves/CLIFFATTACKSLOW.js
// module id = 479
// module chunks = 1
//# sourceURL=webpack:///./src/characters/fox/moves/CLIFFATTACKSLOW.js?