"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _actionStateShortcuts = __webpack_require__(10);

var _puffMultiJumpDrift = __webpack_require__(264);

var _ESCAPEAIR = __webpack_require__(265);

var _ESCAPEAIR2 = _interopRequireDefault(_ESCAPEAIR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "AERIALTURN5",
  canPassThrough: true,
  canGrabLedge: [true, false],
  wallJumpAble: true,
  headBonk: true,
  canBeGrabbed: true,
  landType: 0,
  init: function init(p, input) {
    _main.player[p].actionState = "AERIALTURN5";
    _main.player[p].timer = 0;
    _main.player[p].phys.fastfalled = false;
    _main.player[p].phys.doubleJumped = true;
    _main.player[p].phys.cVel.y = 1.25;
    _main.player[p].phys.cVel.x = input[p][0].lsX * 0.5;
    _main.player[p].phys.jumpsUsed++;
    _sfx.sounds.jump2.play();
    _index2.default.AERIALTURN5.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (_main.player[p].timer === 13) {
      _main.player[p].timer--;
      _main.player[p].actionState = "JUMPAERIAL5";
      _index2.default.JUMPAERIAL5.main(p, input);
    } else {
      if (!_index2.default.AERIALTURN5.interrupt(p, input)) {
        (0, _actionStateShortcuts.fastfall)(p, input);
        (0, _puffMultiJumpDrift.puffMultiJumpDrift)(p, input);
        if (_main.player[p].timer === 6) {
          _main.player[p].phys.face *= -1;
        }
      }
    }
  },
  interrupt: function interrupt(p, input) {
    var a = (0, _actionStateShortcuts.checkForAerials)(p, input);
    var b = (0, _actionStateShortcuts.checkForSpecials)(p, input);
    if (a[0]) {
      _index2.default[a[1]].init(p, input);
      return true;
    } else if (input[p][0].l && !input[p][1].l || input[p][0].r && !input[p][1].r) {
      _ESCAPEAIR2.default.init(p, input);
      return true;
    } else if (b[0]) {
      _index2.default[b[1]].init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/puff/moves/AERIALTURN5.js
// module id = 269
// module chunks = 1
//# sourceURL=webpack:///./src/characters/puff/moves/AERIALTURN5.js?