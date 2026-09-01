"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

var _sfx = __webpack_require__(120);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "FORWARDTILT",
  canEdgeCancel: false,
  canBeGrabbed: true,
  init: function init(p, input) {
    _main.player[p].actionState = "FORWARDTILT";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.ftilt.id0;
    _main.player[p].hitboxes.id[1] = _main.player[p].charHitboxes.ftilt.id1;
    _main.player[p].hitboxes.id[2] = _main.player[p].charHitboxes.ftilt.id2;
    _main.player[p].hitboxes.id[3] = _main.player[p].charHitboxes.ftilt.id3;
    _index2.default.FORWARDTILT.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.FORWARDTILT.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
      if (_main.player[p].timer > 5 && _main.player[p].timer < 14) {
        (0, _drawVfx.drawVfx)({
          name: "swing",
          pos: new _Vec2D.Vec2D(0, 0),
          face: _main.player[p].phys.face,
          f: {
            pNum: p,
            swingType: "FORWARDTILT",
            frame: _main.player[p].timer - 6
          }
        });
      }
      if (_main.player[p].timer === 7) {
        _main.player[p].hitboxes.active = [true, true, true, true];
        _main.player[p].hitboxes.frame = 0;
        _sfx.sounds.sword2.play();
      }
      if (_main.player[p].timer > 7 && _main.player[p].timer < 11) {
        _main.player[p].hitboxes.frame++;
      }
      if (_main.player[p].timer === 11) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 35) {
      _WAIT2.default.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/FORWARDTILT.js
// module id = 380
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/FORWARDTILT.js?