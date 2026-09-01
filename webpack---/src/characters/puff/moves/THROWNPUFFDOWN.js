"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _Vec2D = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "THROWNPUFFDOWN",
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  canBeGrabbed: false,
  offset: [[-10.26, 0.98], [-7.67, -0.31], [-4.94, -1.56], [-3.10, -2.50], [-0.94, -3.59], [-0.90, -3.57], [-1.00, -3.52], [-1.01, -3.56], [-0.94, -3.62], [-0.97, -3.60], [-1.02, -3.58], [-1.04, -3.56], [-1.00, -3.57], [-0.93, -3.58], [-0.91, -3.61], [-0.92, -3.64], [-0.91, -3.63], [-0.92, -3.60], [-0.92, -3.57], [-0.97, -3.57], [-1.00, -3.59], [-0.98, -3.62], [-0.96, -3.62], [-0.92, -3.59], [-0.89, -3.55], [-0.91, -3.54], [-0.96, -3.57], [-0.95, -3.62], [-0.93, -3.67], [-0.93, -3.65], [-0.95, -3.58], [-0.89, -3.52], [-0.84, -3.53], [-0.89, -3.59], [-0.94, -3.60], [-0.96, -3.59], [-0.96, -3.56], [-0.90, -3.54], [-0.86, -3.58], [-0.88, -3.63], [-0.88, -3.61], [-0.90, -3.58], [-0.92, -3.56], [-0.97, -3.56], [-1.00, -3.58], [-1.00, -3.62], [-0.98, -3.63], [-0.94, -3.60], [-0.91, -3.55], [-0.94, -3.53], [-0.99, -3.55], [-0.98, -3.59], [-0.98, -3.62], [-0.96, -3.61], [-0.95, -3.58], [-0.91, -3.53], [-0.90, -3.53], [-0.94, -3.59], [-0.93, -3.61], [-0.90, -3.65], [-0.93, -3.64], [-0.98, -3.62], [-0.98, -3.62]],
  init: function init(p, input) {
    _main.player[p].actionState = "THROWNPUFFDOWN";
    var grabbedBy = _main.player[p].phys.grabbedBy;
    if (grabbedBy === -1) {
      return;
    }
    if (grabbedBy < p) {
      _main.player[p].timer = -1;
    } else {
      _main.player[p].timer = 0;
    }
    _main.player[p].phys.grounded = false;

    _index2.default.THROWNPUFFDOWN.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.THROWNPUFFDOWN.interrupt(p, input)) {
      var timer = _main.player[p].timer;
      if (timer > 0) {
        var grabbedBy = _main.player[p].phys.grabbedBy;
        if (grabbedBy === -1) {
          return;
        }
        if (timer > _index2.default.THROWNPUFFDOWN.offset.length) {
          timer = _index2.default.THROWNPUFFDOWN.offset.length - 1;
        }
        _main.player[p].phys.pos = new _Vec2D.Vec2D(_main.player[grabbedBy].phys.pos.x + _index2.default.THROWNPUFFDOWN.offset[timer - 1][0] * _main.player[p].phys.face, _main.player[grabbedBy].phys.pos.y + _index2.default.THROWNPUFFDOWN.offset[timer - 1][1]);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    return false;
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/THROWNPUFFDOWN.js
// module id = 338
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/THROWNPUFFDOWN.js?