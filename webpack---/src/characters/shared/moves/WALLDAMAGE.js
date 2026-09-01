"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _sfx = __webpack_require__(120);

var _characters = __webpack_require__(119);

var _drawVfx = __webpack_require__(134);

var _hitDetection = __webpack_require__(133);

var _linAlg = __webpack_require__(29);

var _Vec2D = __webpack_require__(22);

exports.default = {
  name: "WALLDAMAGE",
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  canBeGrabbed: true,
  headBonk: true,
  landType: 2,
  init: function init(p, input, normal) {
    _main.player[p].actionState = "WALLDAMAGE";
    _main.player[p].timer = 0;
    _sfx.sounds.bounce.play();
    _main.player[p].phys.hurtBoxState = 1;
    _main.player[p].phys.intangibleTimer = Math.max(_main.player[p].phys.intangibleTimer, 15);
    _main.player[p].phys.cVel.x = 0;
    _main.player[p].phys.cVel.y = 0;
    var tangent = new _Vec2D.Vec2D(-normal.y, normal.x);
    var totalVel = new _Vec2D.Vec2D(_main.player[p].phys.kVel.x + _main.player[p].phys.cVel.x, _main.player[p].phys.kVel.y + _main.player[p].phys.cVel.y);
    var reflectedDec = (0, _linAlg.dotProd)(totalVel, normal) < 0 ? (0, _linAlg.reflect)(_main.player[p].phys.kDec, tangent) : _main.player[p].phys.kDec;
    var reflectedVel = (0, _linAlg.dotProd)(totalVel, normal) < 0 ? (0, _linAlg.reflect)(totalVel, tangent) : _main.player[p].phys.kVel;
    _main.player[p].phys.kVel.x = reflectedVel.x * 0.8;
    _main.player[p].phys.kVel.y = reflectedVel.y * 0.8;
    _main.player[p].phys.kDec.x = reflectedDec.x;
    _main.player[p].phys.kDec.y = reflectedDec.y;

    _actionStateShortcuts.actionStates[_main.characterSelections[p]].WALLDAMAGE.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (_main.player[p].hit.hitstun % 10 === 0) {
      (0, _drawVfx.drawVfx)({
        name: "flyingDust",
        pos: _main.player[p].phys.pos
      });
    }
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].WALLDAMAGE.interrupt(p, input)) {
      _main.player[p].hit.hitstun--;
      _main.player[p].phys.cVel.y -= _main.player[p].charAttributes.gravity;
      if (_main.player[p].phys.cVel.y < -_main.player[p].charAttributes.terminalV) {
        _main.player[p].phys.cVel.y = -_main.player[p].charAttributes.terminalV;
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].WALLDAMAGE) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DAMAGEFALL.init(p, input);
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/WALLDAMAGE.js
// module id = 539
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/WALLDAMAGE.js?