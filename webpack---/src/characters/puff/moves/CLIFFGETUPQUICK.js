"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _activeStage = __webpack_require__(18);

var _Vec2D = __webpack_require__(22);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFGETUPQUICK",
  canBeGrabbed: true,
  offset: [[-73.32063, -8.97483], [-73.806, -7.875], [-74.29, -6.36], [-74.51, -4.7], [-74.39, -2.91], [-74.06, -1.07], [-73.57, 0.48], [-72.954, 1.81], [-72.24, 3.06], [-71.46, 3.99], [-70.68, 4.36], [-69.75, 3.23], [-68.82, 1.13], [-67.98, 0], [-67.93, 0], [-67.77, 0], [-67.54, 0], [-67.25, 0], [-66.92, 0], [-66.57, 0], [-66.22, 0], [-65.89, 0], [-65.6, 0], [-65.37, 0], [-65.22, 0], [-65.16, 0], [-65.16, 0], [-65.16, 0], [-65.16, 0], [-65.16, 0], [-65.16, 0], [-65.16, 0], [-65.16, 0]],
  init: function init(p, input) {
    _main.player[p].actionState = "CLIFFGETUPQUICK";
    _main.player[p].timer = 0;
    _main.player[p].phys.intangibleTimer = 30;
    _index2.default.CLIFFGETUPQUICK.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.CLIFFGETUPQUICK.interrupt(p, input)) {
      var onLedge = _main.player[p].phys.onLedge;
      if (onLedge === -1) {
        this.canGrabLedge = false;
        return;
      }
      var l = _activeStage.activeStage.ledge[onLedge];
      var x = _activeStage.activeStage[l[0]][l[1]][l[2]].x;
      var y = _activeStage.activeStage[l[0]][l[1]][l[2]].y;
      if (_main.player[p].timer < 16) {
        _main.player[p].phys.pos = new _Vec2D.Vec2D(x + (_index2.default.CLIFFGETUPQUICK.offset[_main.player[p].timer - 1][0] + 68.4) * _main.player[p].phys.face, y + _index2.default.CLIFFGETUPQUICK.offset[_main.player[p].timer - 1][1]);
      } else {
        _main.player[p].phys.pos.x = x + (68.4 + _index2.default.CLIFFGETUPQUICK.offset[_main.player[p].timer - 1][0]) * _main.player[p].phys.face;
      }
      if (_main.player[p].timer === 16) {
        _main.player[p].phys.grounded = true;
        _main.player[p].phys.onSurface = [l[0] === "ground" ? 0 : 1, l[1]];
        _main.player[p].phys.airborneTimer = 0;
        _main.player[p].phys.pos.y = y;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 32) {
      _main.player[p].phys.onLedge = -1;
      _main.player[p].phys.ledgeRegrabCount = true;
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/CLIFFGETUPQUICK.js
// module id = 294
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/CLIFFGETUPQUICK.js?