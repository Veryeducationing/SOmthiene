"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _activeStage = __webpack_require__(18);

var _Vec2D = __webpack_require__(22);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "CLIFFGETUPQUICK",
  canBeGrabbed: true,
  offset: [[-71.33, -23.71], [-71.38, -23.71], [-71.42, -23.71], [-71.45, -23.71], [-71.46, -23.71], [-71.44, -23.71], [-71.38, -23.71], [-71.26, -23.71], [-71.07, -22.69], [-70.80, -19.99], [-70.47, -16.19], [-70.11, -11.83], [-69.71, -7.48], [-69.28, -3.68], [-68.83, -1.01], [-67.88, 0], [-67.38, 0], [-66.87, 0], [-66.35, 0], [-65.81, 0], [-65.27, 0], [-64.73, 0], [-64.19, 0], [-63.65, 0], [-63.12, 0], [-62.59, 0], [-62.08, 0], [-61.60, 0], [-61.17, 0], [-60.80, 0], [-60.50, 0], [-60.28, 0]],
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
// ./src/characters/marth/moves/CLIFFGETUPQUICK.js
// module id = 368
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/CLIFFGETUPQUICK.js?