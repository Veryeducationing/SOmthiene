"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.land = land;
exports.physics = physics;

var _main = __webpack_require__(11);

var _characters = __webpack_require__(119);

var _sfx = __webpack_require__(120);

var _settings = __webpack_require__(14);

var _actionStateShortcuts = __webpack_require__(10);

var _hitDetection = __webpack_require__(133);

var _render = __webpack_require__(13);

var _environmentalCollision = __webpack_require__(28);

var _deepCopyObject = __webpack_require__(67);

var _drawVfx = __webpack_require__(134);

var _stage = __webpack_require__(242);

var _activeStage = __webpack_require__(18);

var _Box2D = __webpack_require__(21);

var _Vec2D = __webpack_require__(22);

var _toList = __webpack_require__(260);

var _lineAngle = __webpack_require__(32);

var _extremePoint = __webpack_require__(33);

var _ecbTransform = __webpack_require__(34);

var _linAlg = __webpack_require__(29);

// eslint-disable-next-line no-duplicate-imports

// eslint-disable-next-line no-duplicate-imports
function updatePosition(i, newPosition) {
  _main.player[i].phys.pos = newPosition;
};

function dealWithDamagingStageCollision(i, normal, corner, angular, damageType) {
  var collisionData = { normal: normal, angular: angular, corner: corner };
  var damageTypeIndex = -1;
  switch (damageType) {
    case "fire":
      damageTypeIndex = 3;
      break;
    case "electric":
      damageTypeIndex = 4;
      break;
    case "slash":
      damageTypeIndex = 1;
      break;
    case "darkness":
      damageTypeIndex = 5;
      break;
    default:
      break;
  }
  if (damageTypeIndex !== -1) {
    _hitDetection.hitQueue.push([i, collisionData, damageTypeIndex, false, false, true]);
  }
}

function dealWithWallCollision(i, newPosition, pt, wallType, wallIndex, input) {
  updatePosition(i, newPosition);

  var wallLabel = "L";
  var sign = -1;
  var isRight = 0;
  if (wallType[0].toLowerCase() === "r") {
    wallLabel = "R";
    sign = 1;
    isRight = 1;
  }

  var wall = (0, _stage.getSurfaceFromStage)([wallType, wallIndex], _activeStage.activeStage);
  var wallBottom = (0, _extremePoint.extremePoint)(wall, "b");
  var wallTop = (0, _extremePoint.extremePoint)(wall, "t");
  var wallNormal = (0, _environmentalCollision.outwardsWallNormal)(wallBottom, wallTop, wallType);
  var damageType = wall[2] === undefined ? null : wall[2].damageType;

  var inDamageState = _main.player[i].actionState === "DAMAGEFLYN" || _main.player[i].actionState === "WALLDAMAGE" || _main.player[i].actionState === "DAMAGEFALL";

  if (inDamageState && _main.player[i].phys.techTimer > 0) {
    _main.player[i].phys.face = sign;
    if (input[i][0].x || input[i][0].y || input[i][0].lsY > 0.7) {
      _actionStateShortcuts.actionStates[_main.characterSelections[i]].WALLTECHJUMP.init(i, input);
    } else {
      _actionStateShortcuts.actionStates[_main.characterSelections[i]].WALLTECH.init(i, input);
    }
  } else if (inDamageState && Math.sign(_main.player[i].phys.kVel) !== sign && _main.player[i].hit.hitlag === 0 && Math.pow(_main.player[i].phys.kVel.x, 2) + Math.pow(_main.player[i].phys.kVel.y, 2) >= 2.25) {
    _main.player[i].phys.face = sign;
    (0, _drawVfx.drawVfx)({
      name: "wallBounce",
      pos: new _Vec2D.Vec2D(_main.player[i].phys.pos.x, _main.player[i].phys.ECBp[1].y),
      face: sign,
      f: wallNormal
    });
    _actionStateShortcuts.actionStates[_main.characterSelections[i]].WALLDAMAGE.init(i, input, wallNormal);
  } else if (_main.player[i].hit.hitlag === 0) {
    if (damageType !== undefined && damageType !== null && _main.player[i].phys.hurtBoxState === 0) {
      // apply damage
      dealWithDamagingStageCollision(i, wallNormal, false, pt, damageType);
    } else if (_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].specialWallCollide) {
      _actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].onWallCollide(i, input, wallLabel, wallIndex);
    } else if (_main.player[i].phys.canWallJump) {
      if (_main.player[i].phys.wallJumpTimer === 254) {
        if (_main.player[i].phys.posDelta.x >= 0.5) {
          _main.player[i].phys.wallJumpTimer = 0;
        }
      }
    }
    if (_main.player[i].phys.wallJumpTimer >= 0 && _main.player[i].phys.wallJumpTimer < 120) {
      if (sign * input[i][0].lsX >= 0.7 && sign * input[i][3].lsX <= 0 && _main.player[i].charAttributes.walljump) {
        _main.player[i].phys.wallJumpTimer = 254;
        _main.player[i].phys.face = sign;
        _actionStateShortcuts.actionStates[_main.characterSelections[i]].WALLJUMP.init(i, input);
      } else {
        _main.player[i].phys.wallJumpTimer++;
      }
    }
  }
};

function dealWithPlatformCollision(i, alreadyGrounded, newPosition, ecbpBottom, platformIndex, input) {
  var platform = (0, _stage.getSurfaceFromStage)(["p", platformIndex], _activeStage.activeStage);
  var damageType = platform[2] === undefined ? null : platform[2].damageType;

  var platLeft = (0, _extremePoint.extremePoint)(platform, "l");
  var platRight = (0, _extremePoint.extremePoint)(platform, "r");
  var platNormal = (0, _environmentalCollision.outwardsWallNormal)(platLeft, platRight, "g");

  if (_main.player[i].hit.hitlag > 0 || alreadyGrounded || _main.player[i].phys.grabbedBy !== -1) {
    updatePosition(i, newPosition);
  } else {
    land(i, ecbpBottom, 1, platformIndex, platNormal, input);
  }
};

function dealWithGroundCollision(i, alreadyGrounded, newPosition, ecbpBottom, groundIndex, input) {
  var ground = (0, _stage.getSurfaceFromStage)(["g", groundIndex], _activeStage.activeStage);
  var damageType = ground[2] === undefined ? null : ground[2].damageType;

  var ignoreDamage = _main.player[i].actionState === "DAMAGEFLYN" || _main.player[i].actionState === "DAMAGEFALL" || _main.player[i].actionState === "WALLDAMAGE";
  var groundLeft = (0, _extremePoint.extremePoint)(ground, "l");
  var groundRight = (0, _extremePoint.extremePoint)(ground, "r");
  var groundNormal = (0, _environmentalCollision.outwardsWallNormal)(groundLeft, groundRight, "g");

  if (!ignoreDamage && damageType !== undefined && damageType !== null && _main.player[i].phys.hurtBoxState === 0) {
    // apply damage
    dealWithDamagingStageCollision(i, groundNormal, false, 0, damageType);
  } else {
    if (_main.player[i].hit.hitlag > 0 || alreadyGrounded || _main.player[i].phys.grabbedBy !== -1) {
      updatePosition(i, newPosition);
    } else {
      land(i, ecbpBottom, 0, groundIndex, groundNormal, input);
    }
  }
};

function fallOffGround(i, side, groundEdgePosition, disableFall, input) {
  var stillGrounded = true,
      backward = false;

  var sign = 1;
  if (side === "r") {
    sign = -1;
  }
  if (disableFall) {
    _main.player[i].phys.pos.y = Math.max(_main.player[i].phys.pos.y, groundEdgePosition.y) + _environmentalCollision.additionalOffset;
    _main.player[i].phys.pos.x = groundEdgePosition.x + (side === "l" ? _environmentalCollision.additionalOffset : -_environmentalCollision.additionalOffset);
    _main.player[i].phys.ECBp = (0, _ecbTransform.moveECB)(_main.player[i].phys.ECBp, (0, _linAlg.subtract)(_main.player[i].phys.pos, _main.player[i].phys.ECBp[0]));
  } else if (_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].canEdgeCancel) {
    if (_main.player[i].phys.face === sign) {
      stillGrounded = false;
      _main.player[i].phys.pos.y = Math.max(_main.player[i].phys.pos.y, groundEdgePosition.y) + _environmentalCollision.additionalOffset;
      backward = true;
    } else if (Math.abs(input[i][0].lsX) > 0.6 || _main.player[i].phys.cVel.x === 0 && _main.player[i].phys.kVel.x === 0 || _actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].disableTeeter || _main.player[i].phys.shielding) {
      stillGrounded = false;
      _main.player[i].phys.pos.y = Math.max(_main.player[i].phys.pos.y, groundEdgePosition.y) + _environmentalCollision.additionalOffset;
    } else {
      _main.player[i].phys.cVel.x = 0;
      _main.player[i].phys.pos.x = groundEdgePosition.x + sign * _environmentalCollision.additionalOffset;
      _actionStateShortcuts.actionStates[_main.characterSelections[i]].OTTOTTO.init(i, input);
    }
  } else if (_main.player[i].phys.cVel.x === 0 && _main.player[i].phys.kVel.x === 0 && !_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].inGrab) {
    stillGrounded = false;
    _main.player[i].phys.pos.y = Math.max(_main.player[i].phys.pos.y, groundEdgePosition.y) + _environmentalCollision.additionalOffset;
  } else {
    _main.player[i].phys.cVel.x = 0;
    _main.player[i].phys.pos.x = groundEdgePosition.x + sign * _environmentalCollision.additionalOffset;
  }
  return [stillGrounded, backward];
};

// ground type and index is a pair, either ["g", index] or ["p", index]
function dealWithGround(i, ground, groundTypeAndIndex, connected, input) {

  var damageType = ground[2] === undefined ? null : ground[2].damageType;

  var ignoreDamage = _main.player[i].actionState === "DAMAGEFLYN" || _main.player[i].actionState === "DAMAGEFALL" || _main.player[i].actionState === "WALLDAMAGE";

  var leftmostGroundPoint = (0, _extremePoint.extremePoint)(ground, "l");
  var rightmostGroundPoint = (0, _extremePoint.extremePoint)(ground, "r");
  var groundNormal = (0, _environmentalCollision.outwardsWallNormal)(leftmostGroundPoint, rightmostGroundPoint, "g");
  var stillGrounded = true,
      backward = false;

  var groundOrPlatform = 0;
  if (groundTypeAndIndex[0] === "p") {
    groundOrPlatform = 1;
  }
  var disableFall = false;

  var maybeLeftGroundTypeAndIndex = null;
  var maybeRightGroundTypeAndIndex = null;

  // first check if the player is allowed to move along the ground, by checking there are no low ceilings
  var ecb0Height = Math.max(_environmentalCollision.additionalOffset, _main.player[i].phys.ECB1[2].y - _main.player[i].phys.ECB1[0].y - _environmentalCollision.additionalOffset);
  var maybeNextPosX = (0, _environmentalCollision.moveAlongGround)(_main.player[i].phys.ECB1[0], _main.player[i].phys.ECBp[0], ecb0Height, ground, _activeStage.activeStage.ceiling);
  if (maybeNextPosX !== null) {
    // ceiling has obstructed grounded movement
    _main.player[i].phys.pos.x = maybeNextPosX;
    _main.player[i].phys.ECBp = (0, _ecbTransform.moveECB)(_main.player[i].phys.ECBp, new _Vec2D.Vec2D(maybeNextPosX - _main.player[i].phys.ECBp[0].x, 0));
  }
  if (_main.player[i].phys.ECBp[0].x < leftmostGroundPoint.x) {
    if (connected !== null && connected !== undefined) {
      maybeLeftGroundTypeAndIndex = groundTypeAndIndex[0] === "g" ? connected[0][groundTypeAndIndex[1]][0] : connected[1][groundTypeAndIndex[1]][0];
    }
    if (maybeLeftGroundTypeAndIndex === null || maybeLeftGroundTypeAndIndex === undefined) {
      var _fallOffGround = fallOffGround(i, "l", leftmostGroundPoint, disableFall, input); // no other ground to the left


      var _fallOffGround2 = _slicedToArray(_fallOffGround, 2);

      stillGrounded = _fallOffGround2[0];
      backward = _fallOffGround2[1];
    } else {
      var _maybeLeftGroundTypeA = maybeLeftGroundTypeAndIndex,
          _maybeLeftGroundTypeA2 = _slicedToArray(_maybeLeftGroundTypeA, 2),
          leftGroundType = _maybeLeftGroundTypeA2[0],
          leftGroundIndex = _maybeLeftGroundTypeA2[1];

      switch (leftGroundType) {
        case "g":
          var _dealWithGround = dealWithGround(i, _activeStage.activeStage.ground[leftGroundIndex], ["g", leftGroundIndex], connected, input);

          var _dealWithGround2 = _slicedToArray(_dealWithGround, 2);

          stillGrounded = _dealWithGround2[0];
          backward = _dealWithGround2[1];

          break;
        case "p":
          var _dealWithGround3 = dealWithGround(i, _activeStage.activeStage.platform[leftGroundIndex], ["p", leftGroundIndex], connected, input);

          var _dealWithGround4 = _slicedToArray(_dealWithGround3, 2);

          stillGrounded = _dealWithGround4[0];
          backward = _dealWithGround4[1];

          break;
        case "r":
          var rightWallToTheLeft = _activeStage.activeStage.wallR[leftGroundIndex];
          if ((0, _extremePoint.extremePoint)(rightWallToTheLeft, "l").y > leftmostGroundPoint.y) {
            disableFall = true;
          }

          var _fallOffGround3 = fallOffGround(i, "l", leftmostGroundPoint, disableFall, input);

          var _fallOffGround4 = _slicedToArray(_fallOffGround3, 2);

          stillGrounded = _fallOffGround4[0];
          backward = _fallOffGround4[1];

          break;
        default:
          var _fallOffGround5 = fallOffGround(i, "l", leftmostGroundPoint, disableFall, input); // surface to the left is neither ground, platform or right wall


          var _fallOffGround6 = _slicedToArray(_fallOffGround5, 2);

          stillGrounded = _fallOffGround6[0];
          backward = _fallOffGround6[1];

          break;
      }
    }
  } else if (_main.player[i].phys.ECBp[0].x > rightmostGroundPoint.x) {
    if (connected !== null && connected !== undefined) {
      maybeRightGroundTypeAndIndex = groundTypeAndIndex[0] === "g" ? connected[0][groundTypeAndIndex[1]][1] : connected[1][groundTypeAndIndex[1]][1];
    }
    if (maybeRightGroundTypeAndIndex === null || maybeRightGroundTypeAndIndex === undefined) {
      var _fallOffGround7 = fallOffGround(i, "r", rightmostGroundPoint, disableFall, input); // no other ground to the right


      var _fallOffGround8 = _slicedToArray(_fallOffGround7, 2);

      stillGrounded = _fallOffGround8[0];
      backward = _fallOffGround8[1];
    } else {
      var _maybeRightGroundType = maybeRightGroundTypeAndIndex,
          _maybeRightGroundType2 = _slicedToArray(_maybeRightGroundType, 2),
          rightGroundType = _maybeRightGroundType2[0],
          rightGroundIndex = _maybeRightGroundType2[1];

      switch (rightGroundType) {
        case "g":
          var _dealWithGround5 = dealWithGround(i, _activeStage.activeStage.ground[rightGroundIndex], ["g", rightGroundIndex], connected, input);

          var _dealWithGround6 = _slicedToArray(_dealWithGround5, 2);

          stillGrounded = _dealWithGround6[0];
          backward = _dealWithGround6[1];

          break;
        case "p":
          var _dealWithGround7 = dealWithGround(i, _activeStage.activeStage.platform[rightGroundIndex], ["p", rightGroundIndex], connected, input);

          var _dealWithGround8 = _slicedToArray(_dealWithGround7, 2);

          stillGrounded = _dealWithGround8[0];
          backward = _dealWithGround8[1];

          break;
        case "l":
          var leftWallToTheRight = _activeStage.activeStage.wallL[rightGroundIndex];
          if ((0, _extremePoint.extremePoint)(leftWallToTheRight, "r").y > rightmostGroundPoint.y) {
            disableFall = true;
          }

          var _fallOffGround9 = fallOffGround(i, "r", rightmostGroundPoint, disableFall, input);

          var _fallOffGround10 = _slicedToArray(_fallOffGround9, 2);

          stillGrounded = _fallOffGround10[0];
          backward = _fallOffGround10[1];

          break;
        default:
          var _fallOffGround11 = fallOffGround(i, "r", rightmostGroundPoint, disableFall, input); // surface to the right is neither ground, platform or left wall


          var _fallOffGround12 = _slicedToArray(_fallOffGround11, 2);

          stillGrounded = _fallOffGround12[0];
          backward = _fallOffGround12[1];

          break;
      }
    }
  } else {
    var ecbpBottom = _main.player[i].phys.ECBp[0];
    var yIntercept = (0, _environmentalCollision.coordinateIntercept)([ecbpBottom, new _Vec2D.Vec2D(ecbpBottom.x, ecbpBottom.y + 1)], ground);
    _main.player[i].phys.pos.y = _main.player[i].phys.pos.y + yIntercept.y - ecbpBottom.y + _environmentalCollision.additionalOffset;
    _main.player[i].phys.ECBp = (0, _ecbTransform.moveECB)(_main.player[i].phys.ECBp, new _Vec2D.Vec2D(0, yIntercept.y - ecbpBottom.y + _environmentalCollision.additionalOffset));
    _main.player[i].phys.onSurface = [groundOrPlatform, groundTypeAndIndex[1]];
    _main.player[i].phys.groundAngle = Math.atan2(groundNormal.y, groundNormal.x) || Math.PI / 2;
  }
  if (!ignoreDamage && damageType !== undefined && damageType !== null && _main.player[i].phys.hurtBoxState === 0) {
    // apply damage
    dealWithDamagingStageCollision(i, groundNormal, false, 0, damageType);
    stillGrounded = false;
  }
  return [stillGrounded, backward];
};

function dealWithCeilingCollision(i, newPosition, ecbTop, ceilingIndex, input) {
  updatePosition(i, newPosition);
  var ceiling = (0, _stage.getSurfaceFromStage)(["c", ceilingIndex], _activeStage.activeStage);
  var damageType = ceiling[2] === undefined ? null : ceiling[2].damageType;
  var ceilingLeft = (0, _extremePoint.extremePoint)(ceiling, "l");
  var ceilingRight = (0, _extremePoint.extremePoint)(ceiling, "r");
  var ceilingNormal = (0, _environmentalCollision.outwardsWallNormal)(ceilingLeft, ceilingRight, "c");

  var ignoreDamage = _main.player[i].actionState === "DAMAGEFLYN" || _main.player[i].actionState === "DAMAGEFALL" || _main.player[i].actionState === "WALLDAMAGE";

  if (!ignoreDamage && damageType !== undefined && damageType !== null && _main.player[i].phys.hurtBoxState === 0) {
    // apply damage
    dealWithDamagingStageCollision(i, ceilingNormal, false, 2, damageType);
  } else if (_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].headBonk && _main.player[i].phys.cVel.y + _main.player[i].phys.kVel.y > 0) {
    if (_main.player[i].hit.hitstun > 0) {
      if (_main.player[i].phys.techTimer > 0) {
        _actionStateShortcuts.actionStates[_main.characterSelections[i]].TECHU.init(i, input);
      } else {
        (0, _drawVfx.drawVfx)({
          name: "ceilingBounce",
          pos: ecbTop,
          face: 1,
          f: ceilingNormal
        });
        _sfx.sounds.bounce.play();
        _actionStateShortcuts.actionStates[_main.characterSelections[i]].STOPCEIL.init(i, input, ceilingNormal);
      }
    } else {
      _actionStateShortcuts.actionStates[_main.characterSelections[i]].STOPCEIL.init(i, input);
    }
  }
};

function dealWithCornerCollision(i, newPosition, ecb, angularParameter, damageType) {
  updatePosition(i, newPosition);
  var insideECBType = angularParameter < 2 ? "l" : "r";

  var _getSameAndOther = (0, _environmentalCollision.getSameAndOther)(angularParameter),
      _getSameAndOther2 = _slicedToArray(_getSameAndOther, 2),
      same = _getSameAndOther2[0],
      other = _getSameAndOther2[1];

  var lowerECBPoint = other === 2 ? ecb[same] : ecb[0];
  var upperECBPoint = other === 2 ? ecb[2] : ecb[same];
  var normal = (0, _environmentalCollision.outwardsWallNormal)(lowerECBPoint, upperECBPoint, insideECBType);
  if (_main.player[i].hit.hitlag === 0 && damageType !== undefined && damageType !== null && _main.player[i].phys.hurtBoxState === 0) {
    dealWithDamagingStageCollision(i, normal, true, angularParameter, damageType);
  }
};

function land(i, newPosition, t, j, normal, input) {
  _main.player[i].phys.pos = newPosition;
  _main.player[i].phys.grounded = true;
  _main.player[i].phys.doubleJumped = false;
  _main.player[i].phys.jumpsUsed = 0;
  _main.player[i].phys.airborneTimer = 0;
  _main.player[i].phys.fastfalled = false;
  _main.player[i].phys.chargeFrames = 0;
  _main.player[i].phys.charging = false;
  _main.player[i].phys.wallJumpCount = 0;
  _main.player[i].phys.thrownHitbox = false;
  _main.player[i].phys.sideBJumpFlag = true;
  _main.player[i].phys.onSurface = [t, j];
  _main.player[i].phys.onLedge = -1;
  _main.player[i].rotation = 0;
  _main.player[i].rotationPoint = new _Vec2D.Vec2D(0, 0);
  _main.player[i].colourOverlayBool = false;
  _main.player[i].hitboxes.active = [false, false, false, false];

  var newNormal = normal;
  if (newNormal === null || newNormal === undefined || newNormal.x === 0 && newNormal.y === 0) {
    newNormal = new _Vec2D.Vec2D(0, 1);
  }
  _main.player[i].phys.groundAngle = Math.atan2(newNormal.y, newNormal.x);

  switch (_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].landType) {
    case 0:
      // LANDING / NIL
      if (_main.player[i].phys.cVel.y >= -1) {
        _actionStateShortcuts.actionStates[_main.characterSelections[i]].WAIT.init(i, input);
      } else {
        _actionStateShortcuts.actionStates[_main.characterSelections[i]].LANDING.init(i, input);
      }
      break;
    case 1:
      // OWN FUNCTION
      _actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].land(i, input);
      break;
    case 2:
      // KNOCKDOWN / TECH
      if (_main.player[i].phys.techTimer > 0) {
        if (input[i][0].lsX * _main.player[i].phys.face > 0.5) {
          _actionStateShortcuts.actionStates[_main.characterSelections[i]].TECHF.init(i, input);
        } else if (input[i][0].lsX * _main.player[i].phys.face < -0.5) {
          _actionStateShortcuts.actionStates[_main.characterSelections[i]].TECHB.init(i, input);
        } else {
          _actionStateShortcuts.actionStates[_main.characterSelections[i]].TECHN.init(i, input);
        }
      } else {
        _actionStateShortcuts.actionStates[_main.characterSelections[i]].DOWNBOUND.init(i, input);
      }
      break;
    default:
      _actionStateShortcuts.actionStates[_main.characterSelections[i]].LANDING.init(i, input);
      break;
  }
  _main.player[i].phys.cVel.y = 0;
  _main.player[i].phys.kVel.y = 0;
  _main.player[i].hit.hitstun = 0;
};

function hitlagSwitchUpdate(i, input) {
  if (_main.player[i].hit.hitlag > 0) {
    _main.player[i].hit.hitlag--;
    if (_main.player[i].hit.hitlag === 0 && _main.player[i].hit.knockback > 0) {
      if (_main.player[i].phys.grabbedBy === -1 || _main.player[i].hit.knockback > 50) {
        var newAngle = (0, _hitDetection.getLaunchAngle)(_main.player[i].hit.angle, _main.player[i].hit.knockback, _main.player[i].hit.reverse, input[i][0].lsX, input[i][0].lsY, i);

        _main.player[i].phys.cVel.x = 0;
        _main.player[i].phys.cVel.y = 0;
        //console.log(newAngle);
        _main.player[i].phys.kVel.x = (0, _hitDetection.getHorizontalVelocity)(_main.player[i].hit.knockback, newAngle);
        _main.player[i].phys.kVel.y = (0, _hitDetection.getVerticalVelocity)(_main.player[i].hit.knockback, newAngle, _main.player[i].phys.grounded, _main.player[i].hit.angle);
        //console.log(player[i].phys.kVel);
        _main.player[i].phys.kDec.x = (0, _hitDetection.getHorizontalDecay)(newAngle);
        _main.player[i].phys.kDec.y = (0, _hitDetection.getVerticalDecay)(newAngle);
        //console.log(player[i].phys.kDec);
        //player[i].hit.hitstun = getHitstun(player[i].hit.knockback);

        _main.player[i].phys.onLedge = -1;
        _main.player[i].phys.charging = false;
        _main.player[i].phys.chargeFrames = 0;
        _main.player[i].phys.shielding = false;
        /*if (player[i].phys.grounded){
         if (newAngle == 0 || newAngle > 270){
         player[i].phys.kVel.y = 0;
         player[i].phys.kDec.x = player[i].charAttributes.traction;
         }
         else if (newAngle > 180){
         player[i].phys.kVel.y = 0;
         player[i].phys.kDec.x = -player[i].charAttributes.traction;
         }
         }*/
        if (_main.player[i].phys.kVel.y === 0) {
          if (_main.player[i].hit.knockback >= 80) {
            _main.player[i].phys.grounded = false;
            _main.player[i].phys.pos.y += 0.0001;
          }
        }
        if (_main.player[i].phys.kVel.y > 0) {
          _main.player[i].phys.grounded = false;
        }
      }
      _main.player[i].hit.knockback = 0;
    }

    //SDI / ASDI
    switch (_main.player[i].actionState) {
      case "DAMAGEN2":
      case "DAMAGEFLYN":
      case "GUARDON":
      case "GUARD":
      case "DOWNDAMAGE":
        if (_main.player[i].hit.hitlag > 0) {
          if (input[i][0].lsX > 0.7 && input[i][1].lsX < 0.7 || input[i][0].lsX < -0.7 && input[i][1].lsX > -0.7 || input[i][0].lsY > 0.7 && input[i][1].lsY < 0.7 || input[i][0].lsY < -0.7 && input[i][1].lsY > -0.7) {

            if (!(input[i][0].lsX * input[i][0].lsX + input[i][0].lsY * input[i][0].lsY < 0.49)) {

              _main.player[i].phys.pos.x += input[i][0].lsX * 6;
              _main.player[i].phys.pos.y += _main.player[i].phys.grounded ? 0 : input[i][0].lsY * 6;
            }
          }
        } else {
          _main.player[i].phys.pos.x += input[i][0].lsX * 3;
          _main.player[i].phys.pos.y += _main.player[i].phys.grounded ? 0 : input[i][0].lsY * 3;
        }
        break;
      default:
        break;
    }
    if (_main.player[i].hit.hitlag === 0) {
      // if hitlag just ended, do normal stuff as well
      hitlagSwitchUpdate(i, input);
    }
  } else {
    if (_main.player[i].hit.shieldstun > 0) {
      //console.log(player[i].hit.shieldstun);
      _main.player[i].hit.shieldstun--;
      if (_main.player[i].hit.shieldstun < 0) {
        _main.player[i].hit.shieldstun = 0;
      }
    }
    //console.log(actionStates[characterSelections[i]][player[i].actionState]);
    _main.player[i].phys.canWallJump = _actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].wallJumpAble;
    _main.player[i].phys.bTurnaroundTimer--;
    if (_main.player[i].phys.bTurnaroundTimer < 0) {
      _main.player[i].phys.bTurnaroundTimer = 0;
    }

    if (input[i][0].lsX > 0.9 && input[i][1].lsX < 0.9 || input[i][0].lsX < -0.9 && input[i][1].lsX > -0.9) {

      _main.player[i].phys.bTurnaroundTimer = 20;
      _main.player[i].phys.bTurnaroundDirection = Math.sign(input[i][0].lsX);
    }

    _main.player[i].prevActionState = _main.player[i].actionState;
    _actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].main(i, input);

    if (_main.player[i].shocked > 0) {
      _main.player[i].shocked--;
      if (_main.player[i].shocked % 5 === 0) {
        _sfx.sounds.electricfizz.play();
      }
      (0, _drawVfx.drawVfx)({
        name: "shocked",
        pos: new _Vec2D.Vec2D(_main.player[i].phys.pos.x, _main.player[i].phys.pos.y + 5),
        face: _main.player[i].phys.face
      });
    }

    if (_main.player[i].burning > 0) {
      _main.player[i].burning--;
      if (_main.player[i].burning % 6 === 0) {
        (0, _drawVfx.drawVfx)({
          name: "burning",
          pos: new _Vec2D.Vec2D(_main.player[i].phys.pos.x, _main.player[i].phys.pos.y + 5),
          face: _main.player[i].phys.face
        });
      }
    }

    // TURBO MODE
    // if just changed action states, remove ability to cancel
    if (_main.player[i].prevActionState !== _main.player[i].actionState) {
      _main.player[i].hasHit = false;
    }
    if (_settings.gameSettings.turbo && _main.gameMode !== 5) {
      if (_main.player[i].hasHit) {
        if (_main.player[i].actionState !== "CATCHATTACK") {
          if (_main.player[i].phys.grounded) {
            if ((0, _actionStateShortcuts.turboGroundedInterrupt)(i, input)) {
              _main.player[i].hasHit = false;
            }
          } else {
            if ((0, _actionStateShortcuts.turboAirborneInterrupt)(i, input)) {
              _main.player[i].hasHit = false;
            }
          }
        }
      }
    }

    if (Math.abs(_main.player[i].phys.kVel.x) > 0) {
      var oSign = Math.sign(_main.player[i].phys.kVel.x);
      if (_main.player[i].phys.grounded) {
        _main.player[i].phys.kVel.x -= oSign * _main.player[i].charAttributes.traction;
      } else {
        _main.player[i].phys.kVel.x -= _main.player[i].phys.kDec.x;
      }
      if (oSign !== Math.sign(_main.player[i].phys.kVel.x)) {
        _main.player[i].phys.kVel.x = 0;
      }
    }
    if (Math.abs(_main.player[i].phys.kVel.y) > 0) {
      var _oSign = Math.sign(_main.player[i].phys.kVel.y);
      if (_main.player[i].phys.grounded) {
        _main.player[i].phys.kVel.y = 0;
      }
      _main.player[i].phys.kVel.y -= _main.player[i].phys.kDec.y;
      if (_oSign !== Math.sign(_main.player[i].phys.kVel.y)) {
        _main.player[i].phys.kVel.y = 0;
      }
    }

    _main.player[i].phys.pos.x += _main.player[i].phys.cVel.x + _main.player[i].phys.kVel.x;
    _main.player[i].phys.pos.y += _main.player[i].phys.cVel.y + _main.player[i].phys.kVel.y;
  }
};

function hurtBoxStateUpdate(i) {
  if (_main.player[i].actionState === "REBIRTH" || _main.player[i].actionState === "REBIRTHWAIT") {
    _main.player[i].phys.hurtBoxState = 1;
  } else {
    _main.player[i].phys.hurtBoxState = 0;
  }
  if (_main.player[i].phys.invincibleTimer > 0) {
    _main.player[i].phys.invincibleTimer--;
    _main.player[i].phys.hurtBoxState = 2;
  }
  if (_main.player[i].phys.intangibleTimer > 0) {
    _main.player[i].phys.intangibleTimer--;
    _main.player[i].phys.hurtBoxState = 1;
  }
};

function outOfCameraUpdate(i) {
  if (_main.player[i].phys.outOfCameraTimer >= 60) {
    if (_main.player[i].percent < 150) {
      _main.player[i].percent++;
    }
    (0, _main.percentShake)(40, i);
    _sfx.sounds.outofcamera.play();
    _main.player[i].phys.outOfCameraTimer = 0;
  }
};

function lCancelUpdate(i, input) {

  // if smash 64 lcancel, put any landingattackair action states into landing
  if (_settings.gameSettings.lCancelType === 2 && _main.gameMode !== 5) {
    if (_main.player[i].phys.lCancel) {
      if (_main.player[i].actionState.substr(0, 16) === "LANDINGATTACKAIR") {
        _main.player[i].actionState = "LANDING";
        _main.player[i].timer = 1;
      }
    }
  }

  if (_main.player[i].phys.lCancelTimer > 0) {
    _main.player[i].phys.lCancelTimer--;
    if (_main.player[i].phys.lCancelTimer === 0) {
      _main.player[i].phys.lCancel = false;
    }
  }
  // l CANCEL
  if (_main.player[i].phys.lCancelTimer === 0 && (input[i][0].lA > 0 && input[i][1].lA === 0 || input[i][0].rA > 0 && input[i][1].rA === 0 || input[i][0].z && !input[i][1].z)) {

    // if smash 64 lcancel, increase window to 11 frames
    if (_settings.gameSettings.lCancelType === 2 && _main.gameMode !== 5) {
      _main.player[i].phys.lCancelTimer = 11;
    } else {
      _main.player[i].phys.lCancelTimer = 7;
    }
    _main.player[i].phys.lCancel = true;
  }

  // if auto lcancel is on, always lcancel
  if (_settings.gameSettings.lCancelType === 1 && _main.gameMode !== 5) {
    _main.player[i].phys.lCancel = true;
  }

  // V Cancel
  if (_main.player[i].phys.vCancelTimer > 0) {
    _main.player[i].phys.vCancelTimer--;
  }

  if (_main.player[i].phys.techTimer > 0) {
    _main.player[i].phys.techTimer--;
  }

  if (_main.player[i].phys.shoulderLockout > 0) {
    _main.player[i].phys.shoulderLockout--;
  }

  if (input[i][0].l && !input[i][1].l || input[i][0].r && !input[i][1].r) {

    if (!_main.player[i].phys.grounded) {
      if (_main.player[i].phys.shoulderLockout === 0) {
        _main.player[i].phys.vCancelTimer = 3;
        _main.player[i].phys.techTimer = 20;
      }
    }

    _main.player[i].phys.shoulderLockout = 40;
  }
};

var nullSquashDatum = { location: null, factor: 1 };

var ecbSquashData = [nullSquashDatum, nullSquashDatum, nullSquashDatum, nullSquashDatum];

function findAndResolveCollisions(i, input, oldBackward, oldNotTouchingWalls, ecbOffset) {

  var stillGrounded = true;
  var backward = oldBackward;
  var notTouchingWalls = oldNotTouchingWalls;
  var connected = _activeStage.activeStage.connected;

  // ------------------------------------------------------------------------------------------------------
  // grounded state movement

  if (_main.player[i].phys.grounded) {

    var oldPosition = new _Vec2D.Vec2D(_main.player[i].phys.pos.x, _main.player[i].phys.pos.y);

    var relevantGroundIndex = _main.player[i].phys.onSurface[1];
    var relevantGroundType = "g";
    var relevantGround = _activeStage.activeStage.ground[relevantGroundIndex];

    if (_main.player[i].phys.onSurface[0] === 1) {
      relevantGroundType = "p";
      relevantGround = _activeStage.activeStage.platform[relevantGroundIndex];
    }

    var relevantGroundTypeAndIndex = [relevantGroundType, relevantGroundIndex];

    var _dealWithGround9 = dealWithGround(i, relevantGround, relevantGroundTypeAndIndex, connected, input);

    var _dealWithGround10 = _slicedToArray(_dealWithGround9, 2);

    stillGrounded = _dealWithGround10[0];
    backward = _dealWithGround10[1];
  }

  // end of grounded state movement
  // ------------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------------
  // main collision detection routine

  var notIgnoringPlatforms = (!_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].canPassThrough || input[i][0].lsY > -0.56) && !_main.player[i].phys.passing;
  var isImmune = _main.player[i].phys.hurtBoxState !== 0;

  var playerStatusInfo = {
    ignoringPlatforms: !notIgnoringPlatforms,
    grounded: _main.player[i].phys.grounded,
    immune: isImmune
  };

  // type CollisionRoutineResult = { position : Vec2D, touching : null | SimpleTouchingDatum, squashDatum : SquashDatum, ecb : ECB};
  var collisionData = (0, _environmentalCollision.runCollisionRoutine)(_main.player[i].phys.ECB1, _main.player[i].phys.ECBp, _main.player[i].phys.pos, ecbSquashData[i], playerStatusInfo, _activeStage.activeStage);

  ecbSquashData[i] = collisionData.squashDatum;

  var newPosition = collisionData.position;
  var newECB = collisionData.ecb;
  var touchingDatum = collisionData.touching;

  if (touchingDatum === null) {
    updatePosition(i, newPosition);
  } else if (touchingDatum.kind === "surface") {
    var surfaceLabel = touchingDatum.type;
    var surfaceIndex = touchingDatum.index;
    var pt = touchingDatum.pt;
    switch (surfaceLabel[0].toLowerCase()) {
      case "l":
        // player touching left wall
        notTouchingWalls[0] = false;
        dealWithWallCollision(i, newPosition, pt, "l", surfaceIndex, input);
        break;
      case "r":
        // player touching right wall
        notTouchingWalls[1] = false;
        dealWithWallCollision(i, newPosition, pt, "r", surfaceIndex, input);
        break;
      case "g":
        // player landed on ground
        dealWithGroundCollision(i, _main.player[i].phys.grounded, newPosition, newECB[0], surfaceIndex, input);
        break;
      case "c":
        // player touching ceiling
        dealWithCeilingCollision(i, newPosition, newECB[2], surfaceIndex, input);
        break;
      case "p":
        // player landed on platform
        dealWithPlatformCollision(i, _main.player[i].phys.grounded, newPosition, newECB[0], surfaceIndex, input);
        break;
      default:
        console.log("error in 'findAndResolveCollisions': unrecognised surface type.");
        break;
    }
  } else if (touchingDatum.kind === "corner") {
    var angularParameter = touchingDatum.angular;
    var cornerDamageType = touchingDatum.damageType !== undefined ? touchingDatum.damageType : null;
    dealWithCornerCollision(i, newPosition, newECB, angularParameter, cornerDamageType);
  }

  _main.player[i].phys.ECB1 = newECB;

  // finally, calculate how much squashing is required by the ground
  if (_main.player[i].phys.grounded) {
    var groundSquashFactor = (0, _environmentalCollision.groundedECBSquashFactor)(new _Vec2D.Vec2D(_main.player[i].phys.pos.x, _main.player[i].phys.pos.y + ecbOffset[3]) //    top non-squashed ECBp point
    , new _Vec2D.Vec2D(_main.player[i].phys.pos.x, _main.player[i].phys.pos.y) // bottom non-squashed ECBp point, no offset as grounded
    , (0, _toList.toList)(_activeStage.activeStage.ceiling));
    if (groundSquashFactor !== null && groundSquashFactor < ecbSquashData[i].factor) {
      ecbSquashData[i] = { location: 0, factor: groundSquashFactor };
    }
    if (ecbSquashData[i] !== null) {
      ecbSquashData[i].location = 0;
    }
  }

  return [stillGrounded, backward, notTouchingWalls];
};

function dealWithLedges(i, input) {
  var playerPosX = _main.player[i].phys.pos.x;
  var playerPosY = _main.player[i].phys.pos.y;
  //TODO find out what these magic numbers are
  var ledgeSnapBoxOffset2 = _main.player[i].charAttributes.ledgeSnapBoxOffset[2];
  var ledgeSnapBoxOffset0 = _main.player[i].charAttributes.ledgeSnapBoxOffset[0];
  var ledgeSnapBoxOffset1 = _main.player[i].charAttributes.ledgeSnapBoxOffset[1];
  _main.player[i].phys.ledgeSnapBoxF = new _Box2D.Box2D([playerPosX, playerPosY + ledgeSnapBoxOffset2], [playerPosX + ledgeSnapBoxOffset0, playerPosY + ledgeSnapBoxOffset1]);

  _main.player[i].phys.ledgeSnapBoxB = new _Box2D.Box2D([playerPosX - ledgeSnapBoxOffset0, playerPosY + ledgeSnapBoxOffset2], [playerPosX, playerPosY + ledgeSnapBoxOffset1]);

  if (_main.player[i].phys.ledgeRegrabCount) {
    _main.player[i].phys.ledgeRegrabTimeout--;
    if (_main.player[i].phys.ledgeRegrabTimeout === 0) {
      _main.player[i].phys.ledgeRegrabCount = false;
    }
  }

  var lsBF = -1;
  var lsBB = -1;
  var foundLedge = 0;
  if (_main.player[i].phys.onLedge === -1 && !_main.player[i].phys.ledgeRegrabCount) {
    for (var j = 0; j < _activeStage.activeStage.ledge.length; j++) {
      var ledgeAvailable = true;
      for (var k = 0; k < 4; k++) {
        if (_main.playerType[k] > -1) {
          if (k !== i) {
            if (_main.player[k].phys.onLedge === j) {
              ledgeAvailable = false;
            }
          }
        }
      }
      if (ledgeAvailable && !_main.player[i].phys.grounded && _main.player[i].hit.hitstun <= 0) {
        var x = _activeStage.activeStage[_activeStage.activeStage.ledge[j][0]][_activeStage.activeStage.ledge[j][1]][_activeStage.activeStage.ledge[j][2]].x;
        var y = _activeStage.activeStage[_activeStage.activeStage.ledge[j][0]][_activeStage.activeStage.ledge[j][1]][_activeStage.activeStage.ledge[j][2]].y;

        if (x > _main.player[i].phys.ledgeSnapBoxF.min.x && x < _main.player[i].phys.ledgeSnapBoxF.max.x && y < _main.player[i].phys.ledgeSnapBoxF.min.y && y > _main.player[i].phys.ledgeSnapBoxF.max.y) {

          if (_activeStage.activeStage.ledge[j][2] === 0) {
            if (_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].canGrabLedge[0]) {
              lsBF = j;
            }
          } else if (_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].canGrabLedge[1]) {
            lsBF = j;
          }
        }
        if (x > _main.player[i].phys.ledgeSnapBoxB.min.x && x < _main.player[i].phys.ledgeSnapBoxB.max.x && y < _main.player[i].phys.ledgeSnapBoxB.min.y && y > _main.player[i].phys.ledgeSnapBoxF.max.y) {

          if (_activeStage.activeStage.ledge[j][2] === 1) {
            if (_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].canGrabLedge[0]) {
              lsBB = j;
            }
          } else if (_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].canGrabLedge[1]) {
            lsBB = j;
          }
        }
      }
      if (_main.player[i].phys.cVel.y < 0 && input[i][0].lsY > -0.5) {
        if (lsBF > -1) {
          foundLedge = _activeStage.activeStage.ledge[lsBF];
          if (foundLedge[2] * -2 + 1 === _main.player[i].phys.face || _actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].canGrabLedge[1]) {
            _main.player[i].phys.onLedge = lsBF;
            _main.player[i].phys.ledgeRegrabTimeout = 30;
            _main.player[i].phys.face = foundLedge[2] * -2 + 1;
            _main.player[i].phys.pos = new _Vec2D.Vec2D(_activeStage.activeStage[foundLedge[0]][foundLedge[1]][foundLedge[2]].x + _main.edgeOffset[0][0], _activeStage.activeStage[foundLedge[0]][foundLedge[1]][foundLedge[2]].y + _main.edgeOffset[0][1]);
            _actionStateShortcuts.actionStates[_main.characterSelections[i]].CLIFFCATCH.init(i, input);
          }
        } else if (lsBB > -1) {
          foundLedge = _activeStage.activeStage.ledge[lsBB];
          if (foundLedge[2] * -2 + 1 === _main.player[i].phys.face || _actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].canGrabLedge[1]) {
            _main.player[i].phys.onLedge = lsBB;
            _main.player[i].phys.ledgeRegrabTimeout = 30;
            _main.player[i].phys.face = foundLedge[2] * -2 + 1;
            _main.player[i].phys.pos = new _Vec2D.Vec2D(_activeStage.activeStage[foundLedge[0]][foundLedge[1]][foundLedge[2]].x + _main.edgeOffset[1][0], _activeStage.activeStage[foundLedge[0]][foundLedge[1]][foundLedge[2]].y + _main.edgeOffset[1][1]);
            _actionStateShortcuts.actionStates[_main.characterSelections[i]].CLIFFCATCH.init(i, input);
          }
        }
      }
    }
  }
};

function dealWithDeath(i, input) {
  if (!_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].dead && _main.player[i].actionState !== "SLEEP") {
    var state = 0;
    if (_main.player[i].phys.pos.x < _activeStage.activeStage.blastzone.min.x) {
      state = "DEADLEFT";
    } else if (_main.player[i].phys.pos.x > _activeStage.activeStage.blastzone.max.x) {
      state = "DEADRIGHT";
    } else if (_main.player[i].phys.pos.y < _activeStage.activeStage.blastzone.min.y) {
      state = "DEADDOWN";
    } else if (_main.player[i].phys.pos.y > _activeStage.activeStage.blastzone.max.y && _main.player[i].phys.kVel.y >= 2.4) {
      state = "DEADUP";
    }
    if (state !== 0) {
      _main.player[i].phys.outOfCameraTimer = 0;
      (0, _actionStateShortcuts.turnOffHitboxes)(i);
      _main.player[i].stocks--;
      _main.player[i].colourOverlayBool = false;
      _render.lostStockQueue.push([i, _main.player[i].stocks, 0]);
      if (_main.player[i].stocks === 0 && _main.versusMode) {
        _main.player[i].stocks = 1;
      }
      _actionStateShortcuts.actionStates[_main.characterSelections[i]][state].init(i, input);
    }
  }
};

function updateHitboxes(i) {
  _main.player[i].phys.isInterpolated = false;
  for (var j = 0; j < 4; j++) {
    if (_main.player[i].hitboxes.active[j] && _main.player[i].phys.prevFrameHitboxes.active[j]) {
      if (_main.player[i].phys.prevFrameHitboxes.id[j].offset[_main.player[i].phys.prevFrameHitboxes.frame] === undefined) {
        continue;
      }
      if (_main.player[i].hitboxes.id[j].offset[_main.player[i].hitboxes.frame] === undefined) {
        continue;
      }

      var h1 = new _Vec2D.Vec2D(_main.player[i].phys.posPrev.x + _main.player[i].phys.prevFrameHitboxes.id[j].offset[_main.player[i].phys.prevFrameHitboxes.frame].x * _main.player[i].phys.facePrev, _main.player[i].phys.posPrev.y + _main.player[i].phys.prevFrameHitboxes.id[j].offset[_main.player[i].phys.prevFrameHitboxes.frame].y);

      var h2 = new _Vec2D.Vec2D(_main.player[i].phys.pos.x + _main.player[i].hitboxes.id[j].offset[_main.player[i].hitboxes.frame].x * _main.player[i].phys.face, _main.player[i].phys.pos.y + _main.player[i].hitboxes.id[j].offset[_main.player[i].hitboxes.frame].y);

      var a = h2.x - h1.x;
      var b = h2.y - h1.y;
      var x = 0;
      if (!(a === 0 || b === 0)) {
        x = Math.atan(Math.abs(a) / Math.abs(b));
      }
      {
        var opp = Math.sin(x) * _main.player[i].hitboxes.id[j].size;
        var adj = Math.cos(x) * _main.player[i].hitboxes.id[j].size;
        var sigma = [h1.x, h1.y];
        var alpha1 = void 0;
        var alpha2 = void 0;
        var beta1 = void 0;
        var beta2 = void 0;
        if (a > 0 && b > 0 || a <= 0 && b <= 0) {
          alpha1 = new _Vec2D.Vec2D(sigma[0] + adj, sigma[1] - opp);
          alpha2 = new _Vec2D.Vec2D(alpha1.x + a, alpha1.y + b);
          beta1 = new _Vec2D.Vec2D(sigma[0] - adj, sigma[1] + opp);
          beta2 = new _Vec2D.Vec2D(beta1.x + a, beta1.y + b);
        } else {
          alpha1 = new _Vec2D.Vec2D(sigma[0] - adj, sigma[1] - opp);
          alpha2 = new _Vec2D.Vec2D(alpha1.x + a, alpha1.y + b);
          beta1 = new _Vec2D.Vec2D(sigma[0] + adj, sigma[1] + opp);
          beta2 = new _Vec2D.Vec2D(beta1.x + a, beta1.y + b);
        }
        _main.player[i].phys.interPolatedHitbox[j] = [alpha1, alpha2, beta2, beta1];
      }

      {
        var _opp = Math.sin(x) * _main.player[i].hitboxes.id[j].size - _settings.gameSettings.phantomThreshold;
        var _adj = Math.cos(x) * _main.player[i].hitboxes.id[j].size - _settings.gameSettings.phantomThreshold;
        var _sigma = [h1.x, h1.y];
        var _alpha = void 0;
        var _alpha2 = void 0;
        var _beta = void 0;
        var _beta2 = void 0;
        if (a > 0 && b > 0 || a <= 0 && b <= 0) {
          _alpha = new _Vec2D.Vec2D(_sigma[0] + _adj, _sigma[1] - _opp);
          _alpha2 = new _Vec2D.Vec2D(_alpha.x + a, _alpha.y + b);
          _beta = new _Vec2D.Vec2D(_sigma[0] - _adj, _sigma[1] + _opp);
          _beta2 = new _Vec2D.Vec2D(_beta.x + a, _beta.y + b);
        } else {
          _alpha = new _Vec2D.Vec2D(_sigma[0] - _adj, _sigma[1] - _opp);
          _alpha2 = new _Vec2D.Vec2D(_alpha.x + a, _alpha.y + b);
          _beta = new _Vec2D.Vec2D(_sigma[0] + _adj, _sigma[1] + _opp);
          _beta2 = new _Vec2D.Vec2D(_beta.x + a, _beta.y + b);
        }
        _main.player[i].phys.interPolatedHitboxPhantom[j] = [_alpha, _alpha2, _beta2, _beta];
        _main.player[i].phys.isInterpolated = true;
      }
    }
  }
};

function physics(i, input) {
  _main.player[i].phys.passing = false;
  _main.player[i].phys.posPrev = new _Vec2D.Vec2D(_main.player[i].phys.pos.x, _main.player[i].phys.pos.y);
  _main.player[i].phys.facePrev = _main.player[i].phys.face;
  (0, _deepCopyObject.deepObjectMerge)(true, _main.player[i].phys.prevFrameHitboxes, _main.player[i].hitboxes);

  hitlagSwitchUpdate(i, input);
  hurtBoxStateUpdate(i);
  outOfCameraUpdate(i);
  lCancelUpdate(i, input);

  if (!_main.player[i].phys.grounded) {
    _main.player[i].phys.airborneTimer++;
  }

  //console.log(player[i].timer);
  var frame = Math.floor(_main.player[i].timer);
  if (frame === 0) {
    frame = 1;
  }
  if (frame > _characters.framesData[_main.characterSelections[i]][_main.player[i].actionState]) {
    frame = _characters.framesData[_main.characterSelections[i]][_main.player[i].actionState];
  }
  //console.log(actionStates[characterSelections[i]][player[i].actionState].name+" "+(frame-1));

  /* global ecb */

  var ecbOffset = _actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].dead ? [0, 0, 0, 0] : [_characters.ecb[_main.characterSelections[i]][_main.player[i].actionState][frame - 1][0] * _main.player[i].charAttributes.ecbScale, _characters.ecb[_main.characterSelections[i]][_main.player[i].actionState][frame - 1][1] * _main.player[i].charAttributes.ecbScale, _characters.ecb[_main.characterSelections[i]][_main.player[i].actionState][frame - 1][2] * _main.player[i].charAttributes.ecbScale, _characters.ecb[_main.characterSelections[i]][_main.player[i].actionState][frame - 1][3] * _main.player[i].charAttributes.ecbScale];

  var playerPosX = _main.player[i].phys.pos.x;
  var playerPosY = _main.player[i].phys.pos.y;
  _main.player[i].phys.ECBp = [new _Vec2D.Vec2D(_main.player[i].phys.pos.x, _main.player[i].phys.pos.y + (_main.player[i].phys.grounded || _main.player[i].phys.airborneTimer < 10 ? 0 : ecbOffset[0])), new _Vec2D.Vec2D(_main.player[i].phys.pos.x + Math.max(1, ecbOffset[1]), _main.player[i].phys.pos.y + ecbOffset[2]), new _Vec2D.Vec2D(_main.player[i].phys.pos.x, _main.player[i].phys.pos.y + ecbOffset[3]), new _Vec2D.Vec2D(_main.player[i].phys.pos.x - ecbOffset[1], _main.player[i].phys.pos.y + ecbOffset[2])];

  if (ecbSquashData[i] !== null && ecbSquashData[i].factor < 1) {
    if (ecbSquashData[i].factor * 2 * ecbOffset[1] < _environmentalCollision.smallestECBWidth) {
      ecbSquashData[i].factor = (_environmentalCollision.smallestECBWidth + 2 * _environmentalCollision.additionalOffset) / (2 * ecbOffset[1]);
    }

    _main.player[i].phys.ECBp = (0, _ecbTransform.squashECBAt)(_main.player[i].phys.ECBp, { factor: ecbSquashData[i].factor, location: 0 });
    if (!_main.player[i].phys.grounded) {
      _main.player[i].phys.ECBp = (0, _ecbTransform.moveECB)(_main.player[i].phys.ECBp, new _Vec2D.Vec2D(0, (ecbSquashData[i].factor - 1) * ecbOffset[0]));
    }
  }

  if (!_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].ignoreCollision) {

    var notTouchingWalls = [true, true];
    var stillGrounded = true;
    var backward = false;

    var _findAndResolveCollis = findAndResolveCollisions(i, input, backward, notTouchingWalls, ecbOffset);

    var _findAndResolveCollis2 = _slicedToArray(_findAndResolveCollis, 3);

    stillGrounded = _findAndResolveCollis2[0];
    backward = _findAndResolveCollis2[1];
    notTouchingWalls = _findAndResolveCollis2[2];


    if (_main.player[i].phys.grabbedBy === -1) {

      if (notTouchingWalls[0] && notTouchingWalls[1] && _main.player[i].phys.canWallJump) {
        _main.player[i].phys.wallJumpTimer = 254;
      }
      if (!notTouchingWalls[0] || !notTouchingWalls[1]) {
        if (_main.player[i].phys.grounded) {
          var s = _main.player[i].phys.onSurface[1];
          var surface = _main.player[i].phys.onSurface[0] ? _activeStage.activeStage.platform[s] : _activeStage.activeStage.ground[s];
          if (_main.player[i].phys.pos.x < surface[0].x - 0.1 || _main.player[i].phys.pos.x > surface[1].x + 0.1) {
            stillGrounded = false;
          }
        }
      }
      if (!stillGrounded) {
        _main.player[i].phys.grounded = false;
        if (typeof _actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].airborneState !== 'undefined') {
          _main.player[i].actionState = _actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].airborneState;
        } else {
          if (_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].missfoot && backward) {
            _actionStateShortcuts.actionStates[_main.characterSelections[i]].MISSFOOT.init(i, input);
          } else {
            if (_main.player[i].phys.grabbing !== -1) {
              _actionStateShortcuts.actionStates[_main.characterSelections[_main.player[i].phys.grabbing]].FALL.init(_main.player[i].phys.grabbing, input, true);
              _main.player[_main.player[i].phys.grabbing].phys.grabbedBy = -1;
              _main.player[i].phys.grabbing = -1;
            }
            _actionStateShortcuts.actionStates[_main.characterSelections[i]].FALL.init(i, input);
          }
          if (Math.abs(_main.player[i].phys.cVel.x) > _main.player[i].charAttributes.aerialHmaxV) {
            _main.player[i].phys.cVel.x = Math.sign(_main.player[i].phys.cVel.x) * _main.player[i].charAttributes.aerialHmaxV;
          }
        }
        _main.player[i].phys.shielding = false;
      }
      if (_main.player[i].phys.grounded) {
        for (var j = 0; j < 4; j++) {
          if (_main.playerType[j] > -1) {
            if (i !== j) {
              if (_main.player[j].phys.grounded && _main.player[j].phys.onSurface[0] === _main.player[i].phys.onSurface[0] && _main.player[j].phys.onSurface[1] === _main.player[i].phys.onSurface[1]) {

                if (_main.player[i].phys.grabbing !== j && _main.player[i].phys.grabbedBy !== j) {
                  // TODO: this pushing code needs to account for players on slanted surfaces
                  var diff = Math.abs(_main.player[i].phys.pos.x - _main.player[j].phys.pos.x);
                  if (diff < 6.5 && diff > 0) {
                    _main.player[j].phys.pos.x += Math.sign(_main.player[i].phys.pos.x - _main.player[j].phys.pos.x) * -0.3;
                  } else if (diff === 0 && Math.abs(_main.player[i].phys.cVel.x) > Math.abs(_main.player[j].phys.cVel.x)) {
                    _main.player[j].phys.pos.x += Math.sign(_main.player[i].phys.cVel.x) * -0.3;
                  }
                }
              }
            }
          }
        }
      }
    }
  } else {
    // player ignoring collisions
    _main.player[i].phys.ECB1 = [new _Vec2D.Vec2D(_main.player[i].phys.pos.x, _main.player[i].phys.pos.y + (_main.player[i].phys.grounded || _main.player[i].phys.airborneTimer < 10 ? 0 : ecbOffset[0])), new _Vec2D.Vec2D(_main.player[i].phys.pos.x + ecbOffset[1], _main.player[i].phys.pos.y + ecbOffset[2]), new _Vec2D.Vec2D(_main.player[i].phys.pos.x, _main.player[i].phys.pos.y + ecbOffset[3]), new _Vec2D.Vec2D(_main.player[i].phys.pos.x - ecbOffset[1], _main.player[i].phys.pos.y + ecbOffset[2])];
  }

  if (_main.player[i].phys.shielding === false) {
    _main.player[i].phys.shieldHP += 0.07;
    if (_main.player[i].phys.shieldHP > 60) {
      _main.player[i].phys.shieldHP = 60;
    }
  }

  dealWithLedges(i, input);
  dealWithDeath(i, input);

  _main.player[i].phys.hurtbox = new _Box2D.Box2D([playerPosX - _main.player[i].charAttributes.hurtboxOffset[0], playerPosY + _main.player[i].charAttributes.hurtboxOffset[1]], [playerPosX + _main.player[i].charAttributes.hurtboxOffset[0], playerPosY]);

  if (_main.gameMode === 3 && _main.player[i].phys.posPrev.y > -80 && playerPosY <= -80) {
    _sfx.sounds.lowdown.play();
  }

  updateHitboxes(i);

  _main.player[i].phys.posDelta = new _Vec2D.Vec2D(Math.abs(playerPosX - _main.player[i].phys.posPrev.x), Math.abs(playerPosY - _main.player[i].phys.posPrev.y));

  if (_main.showDebug) {
    document.getElementById('actState' + i).innerHTML = _main.player[i].currentAction + " " + _main.player[i].currentSubaction + " : " + _main.player[i].actionState;
    document.getElementById('stateNum' + i).innerHTML = frame.toString();
    document.getElementById('face' + i).innerHTML = _main.player[i].phys.face;
    document.getElementById("velocityX" + i).innerHTML = _main.player[i].phys.cVel.x.toFixed(5);
    document.getElementById("velocityY" + i).innerHTML = _main.player[i].phys.cVel.y.toFixed(5);
    document.getElementById("kvelocityX" + i).innerHTML = _main.player[i].phys.kVel.x.toFixed(5);
    document.getElementById("kvelocityY" + i).innerHTML = _main.player[i].phys.kVel.y.toFixed(5);
    document.getElementById("pvelocityX" + i).innerHTML = playerPosX.toFixed(5);
    document.getElementById("pvelocityY" + i).innerHTML = playerPosY.toFixed(5);
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/physics/physics.js
// module id = 259
// module chunks = 1
//# sourceURL=webpack:///./src/physics/physics.js?