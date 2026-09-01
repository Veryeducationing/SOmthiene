"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _index = __webpack_require__(354);

var _index2 = _interopRequireDefault(_index);

var _sfx = __webpack_require__(120);

var _WAIT = __webpack_require__(9);

var _WAIT2 = _interopRequireDefault(_WAIT);

var _FALL = __webpack_require__(271);

var _FALL2 = _interopRequireDefault(_FALL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "DOWNSPECIALGROUND",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  specialClank: true,
  init: function init(p, input) {
    _main.player[p].actionState = "DOWNSPECIALGROUND";
    _main.player[p].timer = 0;
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.downspecialground.id0;
    _index2.default.DOWNSPECIALGROUND.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_index2.default.DOWNSPECIALGROUND.interrupt(p, input)) {
      (0, _actionStateShortcuts.reduceByTraction)(p, true);
      if (_main.player[p].timer === 5) {
        _sfx.sounds.marthcounter.play();
        _main.player[p].colourOverlayBool = true;
        _main.player[p].colourOverlay = "white";
        _main.player[p].hitboxes.active = [true, false, false, false];
        _main.player[p].hitboxes.frame = 0;
      } else if (_main.player[p].timer === 30) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }

      if (_main.player[p].timer >= 6 && _main.player[p].timer <= 28) {
        if (_main.player[p].timer % 6 < 2) {
          _main.player[p].colourOverlayBool = true;
          _main.player[p].colourOverlay = "rgb(122, 122, 122)";
        } else if (_main.player[p].timer % 6 < 4) {
          _main.player[p].colourOverlayBool = true;
          _main.player[p].colourOverlay = "rgb(200, 120, 255)";
        } else {
          _main.player[p].colourOverlayBool = false;
        }
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 59) {
      if (_main.player[p].phys.grounded) {
        _WAIT2.default.init(p, input);
      } else {
        _FALL2.default.init(p, input);
      }
      return true;
    } else {
      return false;
    }
  },
  onClank: function onClank(p, input) {
    _main.player[p].hit.hitlag = 11;
    _main.player[p].colourOverlayBool = false;
    _index2.default.DOWNSPECIALGROUND2.init(p, input);
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/marth/moves/DOWNSPECIALGROUND.js
// module id = 376
// module chunks = 1
//# sourceURL=webpack:///./src/characters/marth/moves/DOWNSPECIALGROUND.js?