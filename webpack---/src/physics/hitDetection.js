"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.phantomQueue = exports.hitQueue = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.resetHitQueue = resetHitQueue;
exports.setPhantonQueue = setPhantonQueue;
exports.hitDetect = hitDetect;
exports.setHasHit = setHasHit;
exports.hitHitCollision = hitHitCollision;
exports.interpolatedHitHitCollision = interpolatedHitHitCollision;
exports.hitShieldCollision = hitShieldCollision;
exports.interpolatedHitCircleCollision = interpolatedHitCircleCollision;
exports.segmentSegmentCollision = segmentSegmentCollision;
exports.interpolatedHitHurtCollision = interpolatedHitHurtCollision;
exports.hitHurtCollision = hitHurtCollision;
exports.cssHits = cssHits;
exports.executeShieldHit = executeShieldHit;
exports.bluntHit = bluntHit;
exports.executeRegularHit = executeRegularHit;
exports.hitEffectsAndSound = hitEffectsAndSound;
exports.hitEffect = hitEffect;
exports.executeHits = executeHits;
exports.executeGrabHits = executeGrabHits;
exports.executeGrabTech = executeGrabTech;
exports.getKnockback = getKnockback;
exports.getLaunchAngle = getLaunchAngle;
exports.getHorizontalVelocity = getHorizontalVelocity;
exports.getVerticalVelocity = getVerticalVelocity;
exports.getHorizontalDecay = getHorizontalDecay;
exports.getVerticalDecay = getVerticalDecay;
exports.getHitstun = getHitstun;
exports.knockbackSounds = knockbackSounds;
exports.checkPhantoms = checkPhantoms;

var _main = __webpack_require__(11);

var _settings = __webpack_require__(14);

var _sfx = __webpack_require__(120);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

var _Segment2D = __webpack_require__(238);

var _linAlg = __webpack_require__(29);

var _environmentalCollision = __webpack_require__(28);

var _interpolatedCollision = __webpack_require__(239);

/* eslint-disable */

var hitQueue = exports.hitQueue = [];
function resetHitQueue() {
  exports.hitQueue = hitQueue = [];
}
var phantomQueue = exports.phantomQueue = [];
function setPhantonQueue(val) {
  exports.phantomQueue = phantomQueue = val;
}
var angleConversion = Math.PI / 180;

function hitDetect(p, input) {
  var attackerClank = false;
  for (var i = 0; i < 4; i++) {
    if (_main.playerType[i] > -1) {
      if (i != p) {
        // check if victim is already in hitList
        var inHitList = false;
        for (var k = 0; k < _main.player[p].hitboxes.hitList.length; k++) {
          if (i == _main.player[p].hitboxes.hitList[k]) {
            inHitList = true;
            break;
          }
        }
        if (!inHitList) {
          var storedPhantom = -1;
          for (var j = 0; j < 4; j++) {
            if (_main.player[p].hitboxes.active[j] && _main.player[p].phys.prevFrameHitboxes.active[j]) {
              var interpolate = true;
            } else {
              var interpolate = false;
            }
            if (_main.player[p].hitboxes.active[j] && !(_main.player[p].phys.thrownHitbox && _main.player[p].phys.thrownHitboxOwner == i) && _main.player[p].hitboxes.id[j].type != 7) {
              //console.log(player[i].phys.shielding);
              // clank == 6 means special clank
              if (_main.player[p].hitboxes.id[j].clank == 1 || _main.player[p].hitboxes.id[j].clank == 2 && _main.player[p].phys.grounded || _main.player[p].hitboxes.id[j].clank == 6) {
                for (var k = 0; k < 4; k++) {
                  if (_main.player[i].hitboxes.active[k] && (_main.player[i].hitboxes.id[k].clank == 1 || _main.player[i].hitboxes.id[k].clank == 2 && _main.player[i].phys.grounded || _main.player[p].hitboxes.id[j].clank == 6 && _main.player[i].hitboxes.id[k].clank != 6)) {

                    var clankHit = interpolate && _main.player[i].phys.prevFrameHitboxes.active[k] ? interpolatedHitHitCollision(i, p, j, k) : hitHitCollision(i, p, j, k); // also need to do interpolated vs non-interpolated hitboxes
                    if (clankHit[0]) {

                      var diff = _main.player[p].hitboxes.id[j].dmg - _main.player[i].hitboxes.id[k].dmg;
                      if (_main.player[p].hitboxes.id[j].clank == 6) {
                        attackerClank = true;
                        (0, _drawVfx.drawVfx)({
                          name: "clank",
                          pos: clankHit[1]
                        });
                        _main.player[p].phys.hurtBoxState = 1;
                        _main.player[p].phys.intangibleTimer = 1;
                        // double check still in action state for some weird case
                        if (_actionStateShortcuts.actionStates[_main.characterSelections[p]][_main.player[p].actionState].specialClank) {
                          _actionStateShortcuts.actionStates[_main.characterSelections[p]][_main.player[p].actionState].onClank(p, input);
                        }
                      } else {
                        if (diff >= 9) {
                          // victim clank
                          // attacker cut through
                          _main.player[i].hit.hitlag = Math.floor(_main.player[p].hitboxes.id[j].dmg * (1 / 3) + 3);
                          (0, _actionStateShortcuts.turnOffHitboxes)(i);
                          _actionStateShortcuts.actionStates[_main.characterSelections[i]].CATCHCUT.init(i, input);
                        } else if (diff <= -9) {
                          // attacker clank
                          // victim cut through
                          _main.player[p].hit.hitlag = Math.floor(_main.player[i].hitboxes.id[k].dmg * (1 / 3) + 3);
                          attackerClank = true;
                          (0, _actionStateShortcuts.turnOffHitboxes)(p);
                          _actionStateShortcuts.actionStates[_main.characterSelections[p]].CATCHCUT.init(p, input);
                        } else {
                          // both clank
                          _main.player[i].hit.hitlag = Math.floor(_main.player[p].hitboxes.id[j].dmg * (1 / 3) + 3);
                          _main.player[p].hit.hitlag = Math.floor(_main.player[i].hitboxes.id[k].dmg * (1 / 3) + 3);
                          attackerClank = true;
                          (0, _actionStateShortcuts.turnOffHitboxes)(i);
                          _actionStateShortcuts.actionStates[_main.characterSelections[i]].CATCHCUT.init(i, input);
                          (0, _actionStateShortcuts.turnOffHitboxes)(p);
                          _actionStateShortcuts.actionStates[_main.characterSelections[p]].CATCHCUT.init(p, input);
                        }
                        _sfx.sounds.clank.play();
                        (0, _drawVfx.drawVfx)({
                          name: "clank",
                          pos: clankHit[1]
                        });
                        _main.player[p].hitboxes.hitList.push(i);
                        _main.player[p].hasHit = true;
                      }
                      break;
                    }
                  }
                }
              }
              if (!attackerClank) {
                if (_main.player[i].phys.shielding && _main.player[p].hitboxes.id[j].hitGrounded && (hitShieldCollision(i, p, j, false) || interpolate && (hitShieldCollision(i, p, j, true) || interpolatedHitCircleCollision(_main.player[i].phys.shieldPositionReal, _main.player[i].phys.shieldSize, p, j)))) {
                  hitQueue.push([i, p, j, true, false, false]);
                  _main.player[p].hitboxes.hitList.push(i);
                  setHasHit(p, j);
                  break;
                } else if (_main.player[i].phys.hurtBoxState != 1) {
                  //
                  if (_main.player[p].hitboxes.id[j].hitGrounded && _main.player[i].phys.grounded || _main.player[p].hitboxes.id[j].hitAirborne && !_main.player[i].phys.grounded) if (hitHurtCollision(i, p, j, false) || interpolate && (interpolatedHitHurtCollision(i, p, j) || hitHurtCollision(i, p, j, true))) {
                    if (!hitHurtCollision(i, p, j, false, true) && (interpolate ? !interpolatedHitHurtCollision(i, p, j, true) : true)) {
                      storedPhantom = j;
                    } else {
                      hitQueue.push([i, p, j, false, false, false, false]);
                      if (_main.player[p].hitboxes) if (_main.player[p].hitboxes.hitList) if (_main.player[p].hitboxes.hitList instanceof Array) _main.player[p].hitboxes.hitList.push(i);
                      setHasHit(p, j);
                      break;
                    }
                  }
                }
              }
            }
            if (storedPhantom > -1) {
              hitQueue.push([i, p, storedPhantom, false, false, false, true]);
              _main.player[p].hitboxes.hitList.push(i);
              setHasHit(p, storedPhantom);
            }
          }
        }
      }
    }
  }
}

function setHasHit(p, j) {
  // for turbo mode. if not a grab and not counter and not a midthrow hitbox.
  if (_main.player[p].hitboxes.id[j].type != 2 && _main.player[p].hitboxes.id[j].type != 6 && _main.player[p].actionState.substr(0, 5) != "THROW") {
    _main.player[p].hasHit = true;
  }
}

function hitHitCollision(i, p, j, k) {

  var framePos1 = _main.player[p].hitboxes.frame;
  if (framePos1 > 1) {
    framePos1 = 1;
  }
  var framePos2 = _main.player[i].hitboxes.frame;
  if (framePos2 > 1) {
    framePos2 = 1;
  }
  var hbpos = new _Vec2D.Vec2D(_main.player[p].phys.pos.x + _main.player[p].hitboxes.id[j].offset[framePos1].x * _main.player[p].phys.face, _main.player[p].phys.pos.y + _main.player[p].hitboxes.id[j].offset[framePos1].y);
  var hbpos2 = new _Vec2D.Vec2D(_main.player[i].phys.pos.x + _main.player[i].hitboxes.id[k].offset[framePos2].x * _main.player[i].phys.face, _main.player[i].phys.pos.y + _main.player[i].hitboxes.id[k].offset[framePos2].y);

  var hitPoint = new _Vec2D.Vec2D((hbpos.x + hbpos2.x) / 2, (hbpos.y + hbpos2.y) / 2);

  return [Math.pow(hbpos2.x - hbpos.x, 2) + Math.pow(hbpos.y - hbpos2.y, 2) <= Math.pow(_main.player[p].hitboxes.id[j].size + _main.player[i].hitboxes.id[k].size, 2), hitPoint];
}

function interpolatedHitHitCollision(i, p, j, k) {
  var h1p = new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x + _main.player[p].phys.prevFrameHitboxes.id[j].offset[_main.player[p].phys.prevFrameHitboxes.frame].x * _main.player[p].phys.facePrev, _main.player[p].phys.posPrev.y + _main.player[p].phys.prevFrameHitboxes.id[j].offset[_main.player[p].phys.prevFrameHitboxes.frame].y);
  var h2p = new _Vec2D.Vec2D(_main.player[p].phys.pos.x + _main.player[p].hitboxes.id[j].offset[_main.player[p].hitboxes.frame].x * _main.player[p].phys.face, _main.player[p].phys.pos.y + _main.player[p].hitboxes.id[j].offset[_main.player[p].hitboxes.frame].y);
  var h1i = new _Vec2D.Vec2D(_main.player[i].phys.posPrev.x + _main.player[i].phys.prevFrameHitboxes.id[k].offset[_main.player[i].phys.prevFrameHitboxes.frame].x * _main.player[i].phys.facePrev, _main.player[i].phys.posPrev.y + _main.player[i].phys.prevFrameHitboxes.id[k].offset[_main.player[i].phys.prevFrameHitboxes.frame].y);
  var h2i = new _Vec2D.Vec2D(_main.player[i].phys.pos.x + _main.player[i].hitboxes.id[k].offset[_main.player[i].hitboxes.frame].x * _main.player[p].phys.face, _main.player[i].phys.pos.y + _main.player[i].hitboxes.id[k].offset[_main.player[i].hitboxes.frame].y);
  var r = _main.player[p].hitboxes.id[j].size;
  var s = _main.player[i].hitboxes.id[k].size;

  var collision = (0, _interpolatedCollision.sweepCircleVsSweepCircle)(h1p, r, h2p, r, h1i, s, h2i, s);

  if (collision === null) {
    return [false, null];
  } else {
    return [true, collision];
  }
}

function hitShieldCollision(i, p, j, previous) {
  if (previous) {
    var checkPreviousFrame = _main.player[p].phys.prevFrameHitboxes.frame;
    if (checkPreviousFrame > 1) {
      checkPreviousFrame = 1;
    }
    var hbpos = new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x + _main.player[p].phys.prevFrameHitboxes.id[j].offset[checkPreviousFrame].x * _main.player[p].phys.facePrev, _main.player[p].phys.posPrev.y + _main.player[p].phys.prevFrameHitboxes.id[j].offset[checkPreviousFrame].y);
  } else {
    var checkFrame = _main.player[p].hitboxes.frame;
    if (checkFrame > 1) {
      checkFrame = 1;
    }
    var hbpos = new _Vec2D.Vec2D(_main.player[p].phys.pos.x + _main.player[p].hitboxes.id[j].offset[checkFrame].x * _main.player[p].phys.face, _main.player[p].phys.pos.y + _main.player[p].hitboxes.id[j].offset[checkFrame].y);
  }
  var shieldpos = _main.player[i].phys.shieldPositionReal;

  return Math.pow(shieldpos.x - hbpos.x, 2) + Math.pow(hbpos.y - shieldpos.y, 2) <= Math.pow(_main.player[p].hitboxes.id[j].size + _main.player[i].phys.shieldSize, 2);
}

function interpolatedHitCircleCollision(circlePos, r, p, j) {

  var prevPosFrame = _main.player[p].phys.prevFrameHitboxes.frame;
  if (prevPosFrame > 1) {
    prevPosFrame = 1;
  }
  var posFrame = _main.player[p].hitboxes.frame;
  if (posFrame > 1) {
    posFrame = 1;
  }
  var h1 = new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x + _main.player[p].phys.prevFrameHitboxes.id[j].offset[prevPosFrame].x * _main.player[p].phys.facePrev, _main.player[p].phys.posPrev.y + _main.player[p].phys.prevFrameHitboxes.id[j].offset[prevPosFrame].y);
  var h2 = new _Vec2D.Vec2D(_main.player[p].phys.pos.x + _main.player[p].hitboxes.id[j].offset[posFrame].x * _main.player[p].phys.face, _main.player[p].phys.pos.y + _main.player[p].hitboxes.id[j].offset[posFrame].y);
  var s = _main.player[p].hitboxes.id[j].size;
  var collision = (0, _interpolatedCollision.sweepCircleVsSweepCircle)(h1, s, h2, s, circlePos, r, circlePos, r);

  if (collision === null) {
    return false;
  } else {
    return true;
  }
}

function segmentSegmentCollision(a1, a2, b1, b2) {
  var intersection = new _Vec2D.Vec2D(0, 0);
  var b = new _Vec2D.Vec2D(a2.x - a1.x, a2.y - a1.y);
  var d = new _Vec2D.Vec2D(b2.x - b1.x, b2.y - b1.y);
  var bDotDPerp = b.x * d.y - b.y * d.x;
  // if b dot d == 0, it means the lines are parallel so have infinite intersection points
  if (bDotDPerp == 0) {
    return false;
  }
  var c = new _Vec2D.Vec2D(b1.x - a1.x, b1.y - a1.y);
  var t = (c.x * d.y - c.y * d.x) / bDotDPerp;
  if (t < 0 || t > 1) {
    return false;
  }
  var u = (c.x * b.y - c.y * b.x) / bDotDPerp;
  if (u < 0 || u > 1) {
    return false;
  }
  intersection = new _Vec2D.Vec2D(a1.x + t * b.x, a1.y + t * b.y);
  return true;
}

function interpolatedHitHurtCollision(i, p, j, phantom) {
  phantom = phantom || false;
  var hurt = _main.player[i].phys.hurtbox;
  var hb = void 0;
  if (phantom) {
    hb = _main.player[p].phys.interPolatedHitbox[j];
  } else {
    hb = _main.player[p].phys.interPolatedHitboxPhantom[j];
  }

  var h1 = new _Vec2D.Vec2D(0.5 * hb[0].x + 0.5 * hb[3].x, 0.5 * hb[0].y + 0.5 * hb[3].y);
  var h2 = new _Vec2D.Vec2D(0.5 * hb[1].x + 0.5 * hb[2].x, 0.5 * hb[1].y + 0.5 * hb[2].y);
  var r = 0.5 * (0, _linAlg.euclideanDist)(hb[0], hb[3]);

  var collision = (0, _interpolatedCollision.sweepCircleVsAABB)(h1, r, h2, r, hurt.min, hurt.max);

  if (collision === null) {
    return false;
  } else {
    return true;
  }
}

function hitHurtCollision(i, p, j, previous, phantom) {
  phantom = phantom || false;
  var playerframe = _main.player[p].hitboxes.frame;
  if (playerframe > 1) {
    playerframe = 1;
  }
  var offset = _main.player[p].hitboxes.id[j].offset[playerframe];
  if (offset === undefined) {
    return false;
  }
  if (_main.player[p].actionState == "DAMAGEFLYN") {
    offset = _main.player[p].hitboxes.id[j].offset[0];
  }
  if (previous) {
    var prevframe = _main.player[p].phys.prevFrameHitboxes.frame;
    if (prevframe > 1) {
      prevframe = 1;
    }
    var prevoffset = _main.player[p].phys.prevFrameHitboxes.id[j].offset[prevframe];
    if (prevoffset === undefined) {
      return false;
    }
    var hbpos = new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x + prevoffset.x * _main.player[p].phys.facePrev, _main.player[p].phys.posPrev.y + prevoffset.y);
  } else {
    var hbpos = new _Vec2D.Vec2D(_main.player[p].phys.pos.x + offset.x * _main.player[p].phys.face, _main.player[p].phys.pos.y + offset.y);
  }
  var hurtCenter = new _Vec2D.Vec2D((_main.player[i].phys.hurtbox.min.x + _main.player[i].phys.hurtbox.max.x) / 2, (_main.player[i].phys.hurtbox.min.y + _main.player[i].phys.hurtbox.max.y) / 2);

  var distance = new _Vec2D.Vec2D(Math.abs(hbpos.x - hurtCenter.x), Math.abs(hbpos.y - hurtCenter.y));

  var hurtWidth = 8;
  var hurtHeight = 18;

  if (distance.x > hurtWidth / 2 + _main.player[p].hitboxes.id[j].size - (phantom ? _settings.gameSettings.phantomThreshold : 0)) {
    return false;
  }
  if (distance.y > hurtHeight / 2 + _main.player[p].hitboxes.id[j].size - (phantom ? _settings.gameSettings.phantomThreshold : 0)) {
    return false;
  }

  if (distance.x <= hurtWidth / 2) {
    return true;
  }
  if (distance.y <= hurtHeight / 2) {
    return true;
  }

  var cornerDistance_sq = Math.pow(distance.x - hurtWidth / 2, 2) + Math.pow(distance.y - hurtHeight / 2, 2);

  return cornerDistance_sq <= Math.pow(_main.player[p].hitboxes.id[j].size - (phantom ? _settings.gameSettings.phantomThreshold : 0), 2);
}

function cssHits(input) {
  for (var i = 0; i < hitQueue.length; i++) {

    var v = hitQueue[i][0];
    if (v === -1) {
      continue;
    }
    var a = hitQueue[i][1];
    var h = hitQueue[i][2];
    var shieldHit = hitQueue[i][3];
    var isThrow = hitQueue[i][4];
    var drawBounce = hitQueue[i][5];
    var phantom = hitQueue[i][6] || false;
    var frame = _main.player[i].hitboxes.frame;
    if (frame > 1) {
      frame = 1;
    }
    var damage = _main.player[a].hitboxes.id[h].dmg;

    if (shieldHit) {
      _sfx.sounds.blunthit.play();
      _main.player[v].hit.hitlag = Math.floor(damage * (1 / 3) + 3);
      if (_main.player[v].phys.powerShieldActive) {
        _main.player[v].phys.powerShielded = true;
        _main.player[v].hit.powershield = true;
        (0, _drawVfx.drawVfx)({
          name: "impactLand",
          pos: _main.player[v].phys.pos,
          face: _main.player[v].phys.face
        });
        (0, _drawVfx.drawVfx)({
          name: "powershield",
          pos: _main.player[v].phys.shieldPositionReal,
          face: _main.player[v].phys.face
        });
        _sfx.sounds.powershield.play();
      }
      _main.player[v].hit.shieldstun = Math.floor(damage) * (0.65 * (1 - (_main.player[v].phys.shieldAnalog - 0.3) / 0.7) + 0.3) * 1.5 + 2;
    } else {
      _main.player[a].rpsPoints++;
      _main.player[v].hit.hitlag = Math.floor(damage * (1 / 3) + 3);
      _main.player[v].hit.knockback = getKnockback(_main.player[a].hitboxes.id[h], damage, damage, 0, _main.player[v].charAttributes.weight, false, false);
      _main.player[v].hit.hitPoint = new _Vec2D.Vec2D(_main.player[a].phys.pos.x + _main.player[a].hitboxes.id[h].offset[frame].x * _main.player[a].phys.face, _main.player[a].phys.pos.y + _main.player[a].hitboxes.id[h].offset[frame].y);
      if (_main.player[a].phys.pos.x < _main.player[v].phys.pos.x) {
        _main.player[v].hit.reverse = false;
        _main.player[v].phys.face = -1;
      } else {
        _main.player[v].hit.reverse = true;
        _main.player[v].phys.face = 1;
      }
      _actionStateShortcuts.actionStates[_main.characterSelections[v]].DAMAGEN2.init(v, input);
      (0, _main.screenShake)(_main.player[v].hit.knockback);
      _sfx.sounds.swordreallystronghit.play();
    }
  }
}

function executeShieldHit(input, v, a, h, damage) {
  if (!_main.player[v].phys.powerShieldActive) {
    _main.player[v].phys.shieldHP -= damage;
    if (_main.player[v].phys.shieldHP < 0) {
      _main.player[v].phys.shielding = false;
      _main.player[v].phys.cVel.y = 2.5;
      _main.player[v].phys.grounded = false;
      _main.player[v].phys.shieldHP = 0;
      (0, _drawVfx.drawVfx)({
        name: "breakShield",
        pos: _main.player[v].phys.pos,
        face: _main.player[v].phys.face
      });
      _actionStateShortcuts.actionStates[_main.characterSelections[v]].SHIELDBREAKFALL.init(v, input);
      _sfx.sounds.shieldbreak.play();
      return;
    }
  }
  _main.player[v].hit.hitlag = Math.floor(damage * (1 / 3) + 3);

  var vPushMultiplier = 0.6;
  if (_main.player[v].phys.powerShieldActive) {
    vPushMultiplier = 1;
    _main.player[v].phys.powerShielded = true;
    _main.player[v].hit.powershield = true;
    (0, _drawVfx.drawVfx)({
      name: "impactLand",
      pos: _main.player[v].phys.pos,
      face: _main.player[v].phys.face
    });
    (0, _drawVfx.drawVfx)({
      name: "powershield",
      pos: _main.player[v].phys.shieldPositionReal,
      face: _main.player[v].phys.face
    });
    _sfx.sounds.powershield.play();
  } else {
    var frame = _main.player[v].hitboxes.frame;
    if (frame > 1) {
      frame = 1;
    }
    (0, _drawVfx.drawVfx)({
      name: "clank",
      pos: new _Vec2D.Vec2D(_main.player[a].phys.pos.x + _main.player[a].hitboxes.id[h].offset[_main.player[a].hitboxes.frame].x * _main.player[a].phys.face, _main.player[a].phys.pos.y + _main.player[a].hitboxes.id[h].offset[_main.player[a].hitboxes.frame].y)
    });
  }
  _main.player[v].hit.shieldstun = Math.floor(damage) * (0.65 * (1 - (_main.player[v].phys.shieldAnalog - 0.3) / 0.7) + 0.3) * 1.5 + 2;
  var victimPush = (Math.floor(damage) * (0.195 * (1 - (_main.player[v].phys.shieldAnalog - 0.3) / 0.7) + 0.09) + 0.4) * vPushMultiplier;
  if (victimPush > 2) {
    victimPush = 2;
  }
  var attackerPush = Math.floor(damage) * ((_main.player[v].phys.shieldAnalog - 0.3) * 0.1) + 0.02;

  if (_main.player[a].phys.pos.x < _main.player[v].phys.pos.x) {
    _main.player[v].phys.cVel.x = victimPush;
    _main.player[a].phys.cVel.x -= attackerPush;
  } else {
    _main.player[v].phys.cVel.x = -victimPush;
    _main.player[a].phys.cVel.x += attackerPush;
  }

  _actionStateShortcuts.actionStates[_main.characterSelections[v]].GUARD.init(v, input);
}

function bluntHit(a, h) {
  _sfx.sounds.blunthit.play();
  var frame = _main.player[a].hitboxes.frame;
  if (frame > 1) {
    frame = 1;
  }
  (0, _drawVfx.drawVfx)("clank", new _Vec2D.Vec2D(_main.player[a].phys.pos.x + _main.player[a].hitboxes.id[h].offset[frame].x * _main.player[a].phys.face, _main.player[a].phys.pos.y + _main.player[a].hitboxes.id[h].offset[frame].y));
}

function executeRegularHit(input, v, a, h, shieldHit, isThrow, drawBounce, phantom, stageDamage, hitbox) {
  var damage = hitbox.dmg;
  _main.player[v].phys.grabTech = false;
  if (!stageDamage) {
    if (_main.player[a].phys.chargeFrames > 0) {
      damage *= 1 + _main.player[a].phys.chargeFrames * (0.3671 / 60);
    }
    if (_actionStateShortcuts.actionStates[_main.characterSelections[a]][_main.player[a].actionState].specialOnHit) {
      _actionStateShortcuts.actionStates[_main.characterSelections[a]][_main.player[a].actionState].onPlayerHit(a);
      if (hitbox.type === 8) return;
    }
    if (phantom) {
      phantomQueue.push([a, v]);
      _main.player[v].phys.phantomDamage = 0.5 * damage;
    } else {
      _main.player[a].hit.hitlag = Math.floor(damage * (1 / 3) + 3);
    }
  }
  // TODO: STALING + KNOCKBACK STACKING

  if (shieldHit) {
    executeShieldHit(input, v, a, h, damage);
    return;
  }
  // if invincible
  if (_main.player[v].phys.hurtboxState > 0 && !isThrow) {
    if (!stageDamage) {
      bluntHit(a, h);
    }
    return;
  }
  if (phantom) {
    _main.player[v].hit.hitlag = Math.floor(damage * (1 / 3) + 3);
    _main.player[v].hit.knockback = 0;
    var frame = _main.player[a].hitboxes.frame;
    if (frame > 1) {
      frame = 1;
    }
    _main.player[v].hit.hitPoint = new _Vec2D.Vec2D(_main.player[a].phys.pos.x + hitbox.offset[frame].x * _main.player[a].phys.face, _main.player[a].phys.pos.y + hitbox.offset[frame].y);
    hitEffectsAndSound(a, v, h, isThrow);
    return;
  }

  var crouching = _actionStateShortcuts.actionStates[_main.characterSelections[v]][_main.player[v].actionState].crouch;
  var vCancel = false;
  if (_main.player[v].phys.vCancelTimer > 0) {
    if (_actionStateShortcuts.actionStates[_main.characterSelections[v]][_main.player[v].actionState].vCancel) {
      vCancel = true;
      _sfx.sounds.vcancel.play();
    }
  }
  var jabReset = false;
  if (_actionStateShortcuts.actionStates[_main.characterSelections[v]][_main.player[v].actionState].downed && damage < 7) {
    jabReset = true;
  }
  _main.player[v].hit.knockback = getKnockback(hitbox, damage, damage, _main.player[v].percent, _main.player[v].charAttributes.weight, crouching, vCancel);
  _main.player[v].hit.angle = hitbox.angle;
  if (_main.player[v].hit.angle == 361) {
    if (_main.player[v].hit.knockback < 32.1) {
      _main.player[v].hit.angle = 0;
    } else if (_main.player[v].hit.knockback >= 32.1) {
      _main.player[v].hit.angle = 44;
    }
  }

  _main.player[v].hit.hitlag = Math.floor(damage * (1 / 3) + 3);

  if (!isThrow) {
    if (stageDamage) {
      var angularParameter = a.angular;
      var collisionPoint = void 0;
      if (a.corner) {
        var _getSameAndOther = (0, _environmentalCollision.getSameAndOther)(angularParameter),
            _getSameAndOther2 = _slicedToArray(_getSameAndOther, 2),
            same = _getSameAndOther2[0],
            other = _getSameAndOther2[1];

        var t = angularParameter - Math.floor(angularParameter);
        if (same === 1 && other === 2 || same === 3 && other === 0) {
          collisionPoint = new _Vec2D.Vec2D((1 - t) * _main.player[v].phys.ECBp[same].x + t * _main.player[v].phys.ECBp[other].x, (1 - t) * _main.player[v].phys.ECBp[same].y + t * _main.player[v].phys.ECBp[other].y);
        } else {
          collisionPoint = new _Vec2D.Vec2D((1 - t) * _main.player[v].phys.ECBp[other].x + t * _main.player[v].phys.ECBp[same].x, (1 - t) * _main.player[v].phys.ECBp[other].y + t * _main.player[v].phys.ECBp[same].y);
        }
      } else {
        collisionPoint = _main.player[v].phys.ECBp[angularParameter];
      }
      _main.player[v].hit.hitPoint = collisionPoint;
      _main.player[v].hit.reverse = false;
      _main.player[v].phys.stageDamageImmunity = 20;
    } else {
      var _frame = _main.player[a].hitboxes.frame;
      if (_frame > 1) {
        _frame = 1;
      }
      _main.player[v].hit.hitPoint = new _Vec2D.Vec2D(_main.player[a].phys.pos.x + hitbox.offset[_frame].x * _main.player[a].phys.face, _main.player[a].phys.pos.y + hitbox.offset[_frame].y);
      if (_main.player[a].phys.pos.x < _main.player[v].phys.pos.x) {
        _main.player[v].hit.reverse = false;
      } else {
        _main.player[v].hit.reverse = true;
      }
    }
    if (!jabReset && _main.player[v].phys.grabbedBy == -1) {
      _main.player[v].phys.face = _main.player[v].hit.reverse ? 1 : -1;
    }
  } else {
    _main.player[a].hasHit = true;
    _main.player[a].phys.grabbing = -1;
    _main.player[v].phys.thrownHitbox = true;
    _main.player[v].phys.thrownHitboxOwner = a;
    _main.player[v].phys.pos = new _Vec2D.Vec2D(_main.player[a].phys.pos.x + hitbox.offset.x * _main.player[a].phys.face, _main.player[a].phys.pos.y + hitbox.offset.y);
    _main.player[v].phys.grabbedBy = -1;
    _main.player[v].hit.hitlag = 1;
    _main.player[a].hit.hitlag = 1;
    if (_main.player[a].phys.face == 1) {
      _main.player[v].hit.reverse = false;
    } else {
      _main.player[v].hit.reverse = true;
    }
    if (drawBounce) {
      _sfx.sounds.bounce.play();
      (0, _drawVfx.drawVfx)({
        name: "groundBounce",
        pos: _main.player[v].phys.pos,
        face: _main.player[v].phys.face,
        f: Math.PI / 2
      });
    }
  }

  _main.player[v].percent += damage;

  // if victim is grabbing someone, put the victim's grab victim into a grab release
  if (_main.player[v].phys.grabbing > -1) {
    _main.player[_main.player[v].phys.grabbing].phys.grabbedBy = -1;
    _actionStateShortcuts.actionStates[_main.characterSelections[_main.player[v].phys.grabbing]].CAPTURECUT.init(_main.player[v].phys.grabbing, input);
  }

  if (_main.player[v].phys.grabbedBy == -1 || _main.player[v].phys.grabbedBy > -1 && _main.player[v].hit.knockback > 50 && !hitbox.throwextra) {
    if (_main.player[v].phys.grabbedBy > -1) {
      _main.player[_main.player[v].phys.grabbedBy].phys.grabbing = -1;
      _actionStateShortcuts.actionStates[_main.characterSelections[_main.player[v].phys.grabbedBy]].WAIT.init(_main.player[v].phys.grabbedBy, input);
    }
    _main.player[v].hit.hitstun = getHitstun(_main.player[v].hit.knockback);

    if (jabReset) {
      _actionStateShortcuts.actionStates[_main.characterSelections[v]].DOWNDAMAGE.init(v, input);
    } else if (_main.player[v].hit.knockback >= 80 || isThrow) {
      _actionStateShortcuts.actionStates[_main.characterSelections[v]].DAMAGEFLYN.init(v, input, !isThrow);
    } else {
      _actionStateShortcuts.actionStates[_main.characterSelections[v]].DAMAGEN2.init(v, input);
    }
  } else {
    if (!hitbox.throwextra) {
      //if (player[v].actionState != "THROWNPUFFDOWN" && player[v].actionState != "THROWNFALCONBACK" && player[v].actionState != "THROWNFALCONFORWARD" && player[v].actionState != "THROWNFALCONUP") {
      _actionStateShortcuts.actionStates[_main.characterSelections[v]].CAPTUREDAMAGE.init(v, input);
    }
  }

  if (_main.player[v].phys.grounded && _main.player[v].hit.angle > 180) {
    if (_main.player[v].hit.knockback >= 80) {
      _sfx.sounds.bounce.play();
      (0, _drawVfx.drawVfx)({
        name: "groundBounce",
        pos: _main.player[v].phys.pos,
        face: _main.player[v].phys.face,
        f: Math.PI / 2
      });
      _main.player[v].hit.angle = 360 - _main.player[v].hit.angle;
      _main.player[v].hit.knockback *= 0.8;
    }
  }
  (0, _main.screenShake)(_main.player[v].hit.knockback);
  (0, _main.percentShake)(_main.player[v].hit.knockback, v);
  hitEffectsAndSound(v, h, isThrow, hitbox.type);
}

function hitEffectsAndSound(v, h, isThrow, type) {
  if (!isThrow) {
    hitEffect(type, v);
    knockbackSounds(type, _main.player[v].hit.knockback, v);
  } else {
    _sfx.sounds.stronghit.play();
  }
}

function hitEffect(type, v) {
  switch (type) {
    case 0:
      // normal
      (0, _drawVfx.drawVfx)({
        name: "normalhit",
        pos: _main.player[v].hit.hitPoint,
        face: _main.player[v].phys.face
      });
      break;
    case 1:
      // slash
      (0, _drawVfx.drawVfx)({
        name: "hitSparks",
        pos: _main.player[v].hit.hitPoint,
        face: _main.player[v].phys.face
      });
      (0, _drawVfx.drawVfx)({
        name: "hitFlair",
        pos: _main.player[v].hit.hitPoint,
        face: _main.player[v].phys.face
      });
      (0, _drawVfx.drawVfx)({
        name: "hitCurve",
        pos: _main.player[v].hit.hitPoint,
        face: _main.player[v].phys.face,
        f: _main.player[v].hit.angle
      });
      break;
    case 3:
      // fire
      _main.player[v].burning = 20;
      (0, _drawVfx.drawVfx)({
        name: "firehit",
        pos: _main.player[v].hit.hitPoint,
        face: _main.player[v].phys.face
      });
      break;
    case 4:
      // electric
      _main.player[v].shocked = 20;
      (0, _drawVfx.drawVfx)({
        name: "electrichit",
        pos: _main.player[v].hit.hitPoint,
        face: _main.player[v].phys.face
      });
      break;
    default:
      break;
  }
}

function executeHits(input) {
  if (_main.gameMode === 2) {
    cssHits(input);
    return;
  }
  var grabQueue = [];
  var ignoreGrabs = [false, false, false, false];
  for (var i = 0; i < hitQueue.length; i++) {
    // start defining constants for hit
    var v = hitQueue[i][0];
    var a = hitQueue[i][1];
    // h will contain hitbox type for stage damage
    var h = hitQueue[i][2];
    var shieldHit = hitQueue[i][3];
    var isThrow = hitQueue[i][4];
    var drawBounce = hitQueue[i][5];
    var phantom = hitQueue[i][6] || false;
    // if a is a string, then it is stage damage
    var stageDamage = a >= 0 ? false : true;
    var hitbox = void 0;
    if (stageDamage) {
      var normalAngle = Math.atan2(a.normal.y, a.normal.x);
      if (normalAngle < 0) {
        normalAngle += 2 * Math.PI;
      }
      hitbox = { offset: new _Vec2D.Vec2D(0, 0),
        dmg: 10,
        angle: normalAngle * 180 / Math.PI, // why are we using degrees again?
        kg: 100,
        bk: 0,
        sk: 150,
        type: h
      };
    } else {
      hitbox = _main.player[a].hitboxes.id[h];
    }

    // if in furafura, make sure sfx stops
    if (_main.player[v].actionState == "FURAFURA") {
      _sfx.sounds.furaloop.stop(_main.player[v].furaLoopID);
    }
    switch (hitbox.type) {
      // if grab
      case 2:
        if (_actionStateShortcuts.actionStates[_main.characterSelections[v]][_main.player[v].actionState].canBeGrabbed) {
          grabQueue.push([a, v, false]);
        }
        break;
      // if sleep
      case 5:
        _actionStateShortcuts.actionStates[_main.characterSelections[v]].FURASLEEPSTART.init(v, input);
        break;
      default:
        ignoreGrabs[v] = true;
        executeRegularHit(input, v, a, h, shieldHit, isThrow, drawBounce, phantom, stageDamage, hitbox);
        break;
    }
  }
  executeGrabHits(input, grabQueue, ignoreGrabs);
}

function executeGrabHits(input, grabQueue, ignoreGrabs) {
  for (var j = 0; j < grabQueue.length; j++) {
    if (!ignoreGrabs[grabQueue[j][0]]) {
      if (!grabQueue[j][2]) {
        if (_main.player[grabQueue[j][1]].actionState == "GRAB" && _main.player[grabQueue[j][1]].timer > 0 && _main.player[grabQueue[j][1]].timer < 14 && _main.player[grabQueue[j][1]].phys.face != _main.player[grabQueue[j][0]].phys.face) {
          executeGrabTech(grabQueue[j][0], grabQueue[j][1], input);
          grabQueue[j][2] = true;
          ignoreGrabs[grabQueue[j][1]] = true;
        } else {
          for (var k = 0; k < grabQueue.length; k++) {
            if (k != j) {
              if (grabQueue[j][0] == grabQueue[k][1]) {
                executeGrabTech(grabQueue[j][0], grabQueue[k][0], input);
                grabQueue[j][2] = true;
                grabQueue[k][2] = true;
                break;
              }
            }
          }
        }
      }
      if (!grabQueue[j][2]) {
        var a = grabQueue[j][0];
        var v = grabQueue[j][1];
        if (_main.player[v].phys.grabbedBy == -1 && _main.player[a].phys.grabbing == -1 && _main.player[v].phys.hurtBoxState == 0 && !_main.player[v].phys.grabTech) {
          _main.player[v].phys.cVel = new _Vec2D.Vec2D(0, 0);
          _main.player[v].phys.kVel = new _Vec2D.Vec2D(0, 0);
          _main.player[a].phys.cVel = new _Vec2D.Vec2D(0, 0);
          _main.player[a].phys.kVel = new _Vec2D.Vec2D(0, 0);
          _main.player[v].phys.grabbedBy = a;
          _main.player[v].phys.shielding = false;
          _main.player[a].phys.grabbing = v;
          (0, _actionStateShortcuts.turnOffHitboxes)(a);
          (0, _actionStateShortcuts.turnOffHitboxes)(v);
          if (_main.player[a].actionState == "UPSPECIAL") {
            _main.player[v].phys.face = _main.player[a].phys.face * -1;
            _actionStateShortcuts.actionStates[_main.characterSelections[v]].THROWNFALCONDIVE.init(v, input);
          } else {
            _actionStateShortcuts.actionStates[_main.characterSelections[v]].CAPTUREPULLED.init(v, input);
          }
        }
      }
    }
  }
}

function executeGrabTech(a, v, input) {
  if (_main.player[a].phys.pos.x < _main.player[v].phys.pos.x) {
    _main.player[a].phys.face = 1;
    _main.player[v].phys.face = -1;
  } else {
    _main.player[a].phys.face = -1;
    _main.player[v].phys.face = 1;
  }
  _main.player[a].phys.grabTech = true;
  _main.player[v].phys.grabTech = true;
  (0, _actionStateShortcuts.turnOffHitboxes)(a);
  (0, _actionStateShortcuts.turnOffHitboxes)(v);
  _actionStateShortcuts.actionStates[_main.characterSelections[a]].CAPTURECUT.init(a, input);
  _actionStateShortcuts.actionStates[_main.characterSelections[v]].CAPTURECUT.init(v, input);
  _sfx.sounds.parry.play();
  (0, _drawVfx.drawVfx)({
    name: "shieldup",
    pos: new _Vec2D.Vec2D((_main.player[a].phys.pos.x + _main.player[v].phys.pos.x) / 2, _main.player[a].phys.pos.y + 12),
    face: _main.player[v].phys.face,
    f: 3
  });
}

function getKnockback(hb, damagestaled, damageunstaled, percent, weight, crouching, vCancel) {
  if (hb.sk == 0) {
    var kb = 0.01 * hb.kg * (1.4 * ((0.05 * (damageunstaled * (damagestaled + Math.floor(percent))) + (damagestaled + Math.floor(percent)) * 0.1) * (2.0 - 2.0 * (weight * 0.01) / (1.0 + weight * 0.01))) + 18) + hb.bk;
  } else {
    //var kb = ((((setKnockback * 10 / 20) + 1) * 1.4 * (200/(weight + 100)) + 18) * (growth / 100)) + base;
    var kb = ((hb.sk * 10 / 20 + 1) * 1.4 * (200 / (weight + 100)) + 18) * (hb.kg / 100) + hb.bk;
  }
  if (kb > 2500) {
    kb = 2500;
  }
  if (crouching) {
    kb *= 0.67;
  }
  if (vCancel) {
    kb *= 0.95;
  }

  return kb;
}

function getLaunchAngle(trajectory, knockback, reverse, x, y, v) {
  var deadzone = false;
  //console.log(trajectory);
  var diAngle;
  if (knockback < 80 && _main.player[v].phys.grounded && (trajectory == 0 || trajectory == 180)) {
    deadzone = true;
  }
  if (x < 0.2875 && x > -0.2875) {
    x = 0;
  }
  if (y < 0.2875 && y > -0.2875) {
    y = 0;
  }
  if (x == 0 && y < 0) {
    diAngle = 270;
  } else if (x == 0 && y > 0) {
    diAngle = 90;
  } else if (x == 0 && y == 0) {
    deadzone = true;
  } else {
    diAngle = Math.atan(y / x) * (180 / Math.PI) * 1;
    if (x < 0) {
      diAngle += 180;
    } else if (y < 0) {
      diAngle += 360;
    }
  }
  //console.log(deadzone);

  if (trajectory == 361) {
    if (knockback < 32.1) {
      if (reverse) {
        trajectory = 180;
      } else {
        trajectory = 0;
      }
    } else if (knockback >= 32.1) {
      if (reverse) {
        trajectory = 136;
      } else {
        trajectory = 44;
      }
    } else {
      prompt("Why would this ever get called?");
      trajectory = 440 * (knockback - 32);
      if (reverse) {
        trajectory = 180 - trajectory;
        if (trajectory < 0) {
          trajectory = 360 + trajectory;
        }
      }
    }
  } else {
    if (reverse) {
      trajectory = 180 - trajectory;
      if (trajectory < 0) {
        trajectory = 360 + trajectory;
      }
    }
  }

  //console.log(trajectory);

  if (!deadzone) {
    var rAngle = trajectory - diAngle;
    if (rAngle > 180) {
      rAngle -= 360;
    }

    var pDistance = Math.sin(rAngle * angleConversion) * Math.sqrt(x * x + y * y);

    var angleOffset = pDistance * pDistance * 18;
    if (angleOffset > 18) {
      angleOffset = 18;
    }

    if (rAngle < 0 && rAngle > -180) {
      angleOffset *= -1;
    }
  } else {
    var angleOffset = 0;
  }
  var newtraj = trajectory - angleOffset;
  if (newtraj < 0.01) {
    newtraj = 0;
  }
  return newtraj;
}

function getHorizontalVelocity(knockback, angle) {
  var initialVelocity = knockback * 0.03;
  var horizontalAngle = Math.cos(angle * angleConversion);
  var horizontalVelocity = initialVelocity * horizontalAngle;
  horizontalVelocity = Math.round(horizontalVelocity * 100000) / 100000;
  return horizontalVelocity;
}

function getVerticalVelocity(knockback, angle, grounded, trajectory) {
  var initialVelocity = knockback * 0.03;
  var verticalAngle = Math.sin(angle * angleConversion);
  var verticalVelocity = initialVelocity * verticalAngle;
  verticalVelocity = Math.round(verticalVelocity * 100000) / 100000;
  if (knockback < 80 && grounded && (trajectory == 0 || trajectory == 180)) {
    verticalVelocity = 0;
  }
  return verticalVelocity;
}

function getHorizontalDecay(angle) {
  var decay = 0.051 * Math.cos(angle * angleConversion);
  decay = Math.round(decay * 100000) / 100000;
  return decay;
}

function getVerticalDecay(angle) {
  var decay = 0.051 * Math.sin(angle * angleConversion);
  decay = Math.round(decay * 100000) / 100000;
  return decay;
}

function getHitstun(knockback) {
  //if (groundDownHitType == "Fly"){
  //knockback *= 1.25;
  //}
  return Math.floor(knockback * .4);
}

function knockbackSounds(type, knockback, v) {
  if (type == 4) {
    _sfx.sounds.firestronghit.play();
  }
  if (knockback < 50) {
    switch (type) {
      case 0:
        _sfx.sounds.normalweakhit.play();
        break;
      case 1:
        _sfx.sounds.swordweakhit.play();
        break;
      case 3:
        _sfx.sounds.fireweakhit.play();
        break;
      default:
        break;
    }
  } else if (knockback < 100) {
    switch (type) {
      case 0:
        _sfx.sounds.normalmediumhit.play();
        break;
      case 1:
        _sfx.sounds.swordmediumhit.play();
        break;
      case 3:
        _sfx.sounds.firemediumhit.play();
        break;
      default:
        break;
    }
  } else if (knockback < 140) {
    switch (type) {
      case 0:
        _sfx.sounds.normalstronghit.play();
        break;
      case 1:
        _sfx.sounds.swordstronghit.play();
        break;
      case 3:
        _sfx.sounds.firestronghit.play();
        break;
      default:
        break;
    }
  } else {
    switch (type) {
      case 0:
        _sfx.sounds.normalstronghit.play();
        break;
      case 1:
        _sfx.sounds.swordreallystronghit.play();
        break;
      case 3:
        _sfx.sounds.bathit.play();
        _sfx.sounds.firestronghit.play();
        break;
      default:
        break;
    }
    _sfx.sounds.cheer.play();
    if (knockback < 280) {
      _sfx.sounds.stronghit.play();
      switch (_main.characterSelections[v]) {
        case 0:
          _sfx.sounds.weakhurt.play();
          break;
        case 2:
          _sfx.sounds.foxweakhurt.play();
          break;
        case 3:
          _sfx.sounds.falcohurt1.play();
          break;
        default:
          break;
      }
    } else {
      _sfx.sounds.strongerhit.play();
      switch (_main.characterSelections[v]) {
        case 0:
          _sfx.sounds.stronghurt.play();
          break;
        case 1:
          _sfx.sounds.puffhurt.play();
          break;
        case 2:
          _sfx.sounds.foxstronghurt.play();
          break;
        case 3:
          _sfx.sounds.falcohurt2.play();
          break;
        default:
          break;
      }
    }
  }
}

function checkPhantoms() {
  for (var i = 0; i < phantomQueue.length; i++) {
    var v = phantomQueue[i][1];
    if (_main.player[v].hit.hitlag == 0 && _main.player[v].phys.hurtBoxState == 0) {
      _main.player[v].percent += _main.player[v].phys.phantomDamage;
      _main.player[v].phys.phantomDamage = 0;
      var a = phantomQueue[i][0];
      for (var j = 0; j < _main.player[a].hitboxes.hitList.length; j++) {
        if (_main.player[a].hitboxes.hitList[j] == v) {
          _main.player[a].hitboxes.hitList.splice(j, 1);
          break;
        }
      }
      phantomQueue.splice(i, 1);
    }
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/physics/hitDetection.js
// module id = 133
// module chunks = 1
//# sourceURL=webpack:///./src/physics/hitDetection.js?