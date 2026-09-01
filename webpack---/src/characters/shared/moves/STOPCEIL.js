"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionStateShortcuts = __webpack_require__(10);

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

var _drawVfx = __webpack_require__(134);

var _linAlg = __webpack_require__(29);

var _Vec2D = __webpack_require__(22);

exports.default = {
  name: "STOPCEIL",
  canPassThrough: true,
  canGrabLedge: [true, false],
  wallJumpAble: false,
  headBonk: true,
  canBeGrabbed: true,
  landType: 1,
  init: function init(p, input) {
    var normal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _main.player[p].actionState = "STOPCEIL";
    _main.player[p].timer = 0;
    _main.player[p].phys.cVel.y = 0;
    if (normal !== null) {
      // knockback bounce
      _main.player[p].phys.hurtBoxState = 1;
      _main.player[p].phys.intangibleTimer = Math.max(_main.player[p].phys.intangibleTimer, 15);
      var tangent = new _Vec2D.Vec2D(-normal.y, normal.x);
      var reflectedDec = (0, _linAlg.dotProd)(_main.player[p].phys.kVel, normal) < 0 ? (0, _linAlg.reflect)(_main.player[p].phys.kDec, tangent) : _main.player[p].phys.kDec;
      var reflectedVel = (0, _linAlg.dotProd)(_main.player[p].phys.kVel, normal) < 0 ? (0, _linAlg.reflect)(_main.player[p].phys.kVel, tangent) : _main.player[p].phys.kVel;
      _main.player[p].phys.kVel.x = reflectedVel.x * 0.8;
      _main.player[p].phys.kVel.y = reflectedVel.y * 0.8;
      _main.player[p].phys.kDec.x = reflectedDec.x;
      _main.player[p].phys.kDec.y = reflectedDec.y;
    }
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].STOPCEIL.main(p, input);
  },
  main: function main(p, input) {
    _main.player[p].timer++;
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].STOPCEIL.interrupt(p, input)) {
      if (_main.player[p].hit.hitstun > 0) {
        if (_main.player[p].hit.hitstun % 10 === 0) {
          (0, _drawVfx.drawVfx)({
            name: "flyingDust",
            pos: _main.player[p].phys.pos
          });
        }
        _main.player[p].hit.hitstun--;
        _main.player[p].phys.cVel.y -= _main.player[p].charAttributes.gravity;
        if (_main.player[p].phys.cVel.y < -_main.player[p].charAttributes.terminalV) {
          _main.player[p].phys.cVel.y = -_main.player[p].charAttributes.terminalV;
        }
      } else {
        (0, _actionStateShortcuts.airDrift)(p, input);
      }
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 5 && _main.player[p].hit.hitstun <= 0) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].FALL.init(p, input);
    } else if (_main.player[p].timer > _characters.framesData[_main.characterSelections[p]].STOPCEIL) {
      if (_main.player[p].hit.hitstun <= 0) {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].DAMAGEFALL.init(p, input);
        return true;
      } else {
        _main.player[p].timer = _characters.framesData[_main.characterSelections[p]].STOPCEIL;
        return false;
      }
    } else {
      return false;
    }
  },
  land: function land(p, input) {
    if (_main.player[p].hit.hitstun > 0) {
      if (_main.player[p].phys.techTimer > 0) {
        if (input[p][0].lsX * _main.player[p].phys.face > 0.5) {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]].TECHF.init(p, input);
        } else if (input[p][0].lsX * _main.player[p].phys.face < -0.5) {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]].TECHB.init(p, input);
        } else {
          _actionStateShortcuts.actionStates[_main.characterSelections[p]].TECHN.init(p, input);
        }
      } else {
        _actionStateShortcuts.actionStates[_main.characterSelections[p]].DOWNBOUND.init(p, input);
      }
    } else {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].LANDING.init(p, input);
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/STOPCEIL.js
// module id = 549
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/STOPCEIL.js?