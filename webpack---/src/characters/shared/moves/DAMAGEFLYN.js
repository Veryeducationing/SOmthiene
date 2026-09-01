"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(11);

var _actionStateShortcuts = __webpack_require__(10);

var _characters = __webpack_require__(119);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

exports.default = {
  name: "DAMAGEFLYN",
  canPassThrough: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: true,
  canBeGrabbed: true,
  landType: 2,
  init: function init(p, input, drawStuff) {
    _main.player[p].actionState = "DAMAGEFLYN";
    _main.player[p].timer = 0;
    _main.player[p].phys.grabbing = -1;
    _main.player[p].phys.grabbedBy = -1;
    _main.player[p].phys.fastfalled = false;
    _main.player[p].rotation = 0;
    _main.player[p].rotationPoint = new _Vec2D.Vec2D(0, 0);
    _main.player[p].colourOverlayBool = false;
    if (drawStuff) {
      // drawVfx("hitSparks",player[p].hit.hitPoint,player[p].phys.face);
      // drawVfx("hitFlair",player[p].hit.hitPoint,player[p].phys.face);
      // drawVfx("hitCurve",player[p].hit.hitPoint,player[p].phys.face,player[p].hit.angle);
    }
    _main.player[p].hitboxes.id[0] = _main.player[p].charHitboxes.thrown.id0;
    /*player[p].phys.grounded = false;
    player[p].phys.pos.y += 0.0001;*/
    (0, _actionStateShortcuts.turnOffHitboxes)(p);
    _actionStateShortcuts.actionStates[_main.characterSelections[p]].DAMAGEFLYN.main(p, input);
  },
  main: function main(p, input) {
    if (_main.player[p].phys.thrownHitbox) {
      if (_main.player[p].timer === 1 && _main.player[p].phys.cVel.y + _main.player[p].phys.kVel.y > 0) {
        _main.player[p].hitboxes.active = [true, false, false, false];
        _main.player[p].hitboxes.frame = 0;
      }
      if (_main.player[p].timer > 1 && _main.player[p].phys.cVel.y + _main.player[p].phys.kVel.y > 0) {
        //player[p].hitboxes.frame++;
      }
      if (_main.player[p].phys.cVel.y + _main.player[p].phys.kVel.y <= 0) {
        (0, _actionStateShortcuts.turnOffHitboxes)(p);
      }
    }
    if (_main.player[p].timer < _characters.framesData[_main.characterSelections[p]].DAMAGEFLYN) {
      _main.player[p].timer++;
    }
    if (_main.player[p].hit.hitstun % 10 === 0) {
      (0, _drawVfx.drawVfx)({
        name: "flyingDust",
        pos: _main.player[p].phys.pos
      });
    }
    if (!_actionStateShortcuts.actionStates[_main.characterSelections[p]].DAMAGEFLYN.interrupt(p, input)) {
      if (_main.player[p].timer > 1) {
        _main.player[p].hit.hitstun--;
        if (!_main.player[p].phys.grounded) {
          _main.player[p].phys.cVel.y -= _main.player[p].charAttributes.gravity;
          if (_main.player[p].phys.cVel.y < -_main.player[p].charAttributes.terminalV) {
            _main.player[p].phys.cVel.y = -_main.player[p].charAttributes.terminalV;
          }
        }
      }
    } else {
      _main.player[p].phys.thrownHitbox = false;
    }
  },
  interrupt: function interrupt(p, input) {
    if (_main.player[p].timer > 1 && _main.player[p].hit.hitstun === 0) {
      _actionStateShortcuts.actionStates[_main.characterSelections[p]].DAMAGEFALL.init(p, input);
      _main.player[p].phys.thrownHitbox = false;
      return true;
    } else {
      return false;
    }
  }
};

//////////////////
// WEBPACK FOOTER
// ./src/characters/shared/moves/DAMAGEFLYN.js
// module id = 516
// module chunks = 1
//# sourceURL=webpack:///./src/characters/shared/moves/DAMAGEFLYN.js?