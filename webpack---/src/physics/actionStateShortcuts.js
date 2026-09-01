"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionStates = undefined;
exports.randomShout = randomShout;
exports.executeIntangibility = executeIntangibility;
exports.playSounds = playSounds;
exports.isFinalDeath = isFinalDeath;
exports.getAngle = getAngle;
exports.turnOffHitboxes = turnOffHitboxes;
exports.shieldTilt = shieldTilt;
exports.reduceByTraction = reduceByTraction;
exports.airDrift = airDrift;
exports.fastfall = fastfall;
exports.shieldDepletion = shieldDepletion;
exports.shieldSize = shieldSize;
exports.mashOut = mashOut;
exports.checkForSmashes = checkForSmashes;
exports.checkForTilts = checkForTilts;
exports.checkForIASA = checkForIASA;
exports.checkForSpecials = checkForSpecials;
exports.checkForAerials = checkForAerials;
exports.checkForDash = checkForDash;
exports.checkForSmashTurn = checkForSmashTurn;
exports.tiltTurnDashBuffer = tiltTurnDashBuffer;
exports.checkForTiltTurn = checkForTiltTurn;
exports.checkForJump = checkForJump;
exports.checkForDoubleJump = checkForDoubleJump;
exports.checkForMultiJump = checkForMultiJump;
exports.checkForSquat = checkForSquat;
exports.turboAirborneInterrupt = turboAirborneInterrupt;
exports.turboGroundedInterrupt = turboGroundedInterrupt;
exports.setupActionStates = setupActionStates;

var _main = __webpack_require__(11);

var _index = __webpack_require__(5);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(262);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(354);

var _index6 = _interopRequireDefault(_index5);

var _JUMPAERIALB = __webpack_require__(356);

var _JUMPAERIALB2 = _interopRequireDefault(_JUMPAERIALB);

var _JUMPAERIALF = __webpack_require__(357);

var _JUMPAERIALF2 = _interopRequireDefault(_JUMPAERIALF);

var _sfx = __webpack_require__(120);

var _characters = __webpack_require__(119);

var _drawVfx = __webpack_require__(134);

var _Vec2D = __webpack_require__(22);

var _settings = __webpack_require__(14);

var _deepCopy = __webpack_require__(85);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
function randomShout(char) {
  //playSfx("shout"+Math.round(0.5+Math.random()*5.99));
  switch (char) {
    case 0:
      var shout = Math.round(0.5 + Math.random() * 5.99);
      switch (shout) {
        case 1:
          _sfx.sounds.shout1.play();
          break;
        case 2:
          _sfx.sounds.shout2.play();
          break;
        case 3:
          _sfx.sounds.shout3.play();
          break;
        case 4:
          _sfx.sounds.shout4.play();
          break;
        case 5:
          _sfx.sounds.shout5.play();
          break;
        case 6:
          _sfx.sounds.shout6.play();
          break;
        default:
          break;
      }
      break;
    case 1:
      var shout = Math.round(0.5 + Math.random() * 4.99);
      switch (shout) {
        case 1:
          _sfx.sounds.puffshout1.play();
          break;
        case 2:
          _sfx.sounds.puffshout2.play();
          break;
        case 3:
          _sfx.sounds.puffshout3.play();
          break;
        case 4:
          _sfx.sounds.puffshout4.play();
          break;
        case 5:
          _sfx.sounds.puffshout5.play();
          break;
        default:
          break;
      }
      break;
    case 2:
      var shout = Math.round(0.5 + Math.random() * 4.99);
      switch (shout) {
        case 1:
          _sfx.sounds.foxshout1.play();
          break;
        case 2:
          _sfx.sounds.foxshout2.play();
          break;
        case 3:
          _sfx.sounds.foxshout3.play();
          break;
        case 4:
          _sfx.sounds.foxshout4.play();
          break;
        case 5:
          _sfx.sounds.foxshout5.play();
          break;
        default:
          break;
      }
      break;
    case 3:
      var shout = Math.round(0.5 + Math.random() * 4.99);
      switch (shout) {
        case 1:
          _sfx.sounds.falcoshout1.play();
          break;
        case 2:
          _sfx.sounds.falcoshout2.play();
          break;
        case 3:
          _sfx.sounds.falcoshout3.play();
          break;
        case 4:
          _sfx.sounds.falcoshout4.play();
          break;
        case 5:
          _sfx.sounds.falcoshout5.play();
          break;
        default:
          break;
      }
      break;
    case 4:
      var shout = Math.round(0.5 + Math.random() * 5.99);
      switch (shout) {
        case 1:
          _sfx.sounds.falconshout1.play();
          break;
        case 2:
          _sfx.sounds.falconshout2.play();
          break;
        case 3:
          _sfx.sounds.falconshout3.play();
          break;
        case 4:
          _sfx.sounds.falconshout4.play();
          break;
        case 5:
          _sfx.sounds.falconshout5.play();
          break;
        case 6:
          _sfx.sounds.falconshout6.play();
          break;
        default:
          break;
      }
    default:
      break;
  }
}

function executeIntangibility(actionStateName, p) {
  if (_main.player[p].timer == _characters.intangibility[_main.characterSelections[p]][actionStateName][0]) {
    _main.player[p].phys.intangibleTimer = _characters.intangibility[_main.characterSelections[p]][actionStateName][1];
    _main.player[p].phys.hurtBoxState = 1;
  }
}

function playSounds(actionStateName, p) {
  for (var i = 0; i < _characters.actionSounds[_main.characterSelections[p]][actionStateName].length; i++) {
    if (_main.player[p].timer == _characters.actionSounds[_main.characterSelections[p]][actionStateName][i][0]) {
      _sfx.sounds[_characters.actionSounds[_main.characterSelections[p]][actionStateName][i][1]].play();
    }
  }
}

function isFinalDeath() {
  if (_main.gameMode == 5) {
    return true;
  } else if (_main.versusMode) {
    return false;
  } else {
    var finalDeaths = 0;
    var totalPlayers = 0;
    for (var j = 0; j < 4; j++) {
      if (_main.playerType[j] > -1) {
        totalPlayers++;
        if (_main.player[j].stocks == 0) {
          finalDeaths++;
        }
      }
    }
    return finalDeaths >= Math.max(1, totalPlayers - 1);
  }
}

function getAngle(x, y) {
  var angle = 0;
  if (x != 0 || y != 0) {
    angle = Math.atan2(y, x);
  }
  return angle;
}
//aC = 180/Math.PI;
function turnOffHitboxes(p) {
  _main.player[p].hitboxes.active = [false, false, false, false];
  _main.player[p].hitboxes.hitList = [];
}

function shieldTilt(p, shieldstun, input) {
  if (!shieldstun && !_main.player[p].inCSS) {
    var x = input[p][0].lsX;
    var y = input[p][0].lsY;
    var targetOffset = Math.sqrt(x * x + y * y) * 3;
    var targetAngle = getAngle(x, y);
    var targetPosition = new _Vec2D.Vec2D(Math.cos(targetAngle) * targetOffset, Math.sin(targetAngle) * targetOffset);
    _main.player[p].phys.shieldPosition = new _Vec2D.Vec2D(_main.player[p].phys.shieldPosition.x + ((targetPosition.x - _main.player[p].phys.shieldPosition.x) / 5 + 0.01), _main.player[p].phys.shieldPosition.y + ((targetPosition.y - _main.player[p].phys.shieldPosition.y) / 5 + 0.01));
  }
  _main.player[p].phys.shieldPositionReal = new _Vec2D.Vec2D(_main.player[p].phys.pos.x + _main.player[p].phys.shieldPosition.x + _main.player[p].charAttributes.shieldOffset[0] * _main.player[p].phys.face / 4.5, _main.player[p].phys.pos.y + _main.player[p].phys.shieldPosition.y + _main.player[p].charAttributes.shieldOffset[1] / 4.5);
}

function reduceByTraction(p, applyDouble) {
  if (_main.player[p].phys.cVel.x > 0) {
    if (applyDouble && _main.player[p].phys.cVel.x > _main.player[p].charAttributes.maxWalk) {
      _main.player[p].phys.cVel.x -= _main.player[p].charAttributes.traction * 2;
    } else {
      _main.player[p].phys.cVel.x -= _main.player[p].charAttributes.traction;
    }
    if (_main.player[p].phys.cVel.x < 0) {
      _main.player[p].phys.cVel.x = 0;
    }
  } else {
    if (applyDouble && _main.player[p].phys.cVel.x < -_main.player[p].charAttributes.maxWalk) {
      _main.player[p].phys.cVel.x += _main.player[p].charAttributes.traction * 2;
    } else {
      _main.player[p].phys.cVel.x += _main.player[p].charAttributes.traction;
    }
    if (_main.player[p].phys.cVel.x > 0) {
      _main.player[p].phys.cVel.x = 0;
    }
  }
}

function airDrift(p, input) {
  if (Math.abs(input[p][0].lsX) < 0.3) {
    var tempMax = 0;
  } else {
    var tempMax = _main.player[p].charAttributes.aerialHmaxV * input[p][0].lsX;
  }

  if (tempMax < 0 && _main.player[p].phys.cVel.x < tempMax || tempMax > 0 && _main.player[p].phys.cVel.x > tempMax) {
    if (_main.player[p].phys.cVel.x > 0) {
      _main.player[p].phys.cVel.x -= _main.player[p].charAttributes.airFriction;
      if (_main.player[p].phys.cVel.x < 0) {
        _main.player[p].phys.cVel.x = 0;
      }
    } else {
      _main.player[p].phys.cVel.x += _main.player[p].charAttributes.airFriction;
      if (_main.player[p].phys.cVel.x > 0) {
        _main.player[p].phys.cVel.x = 0;
      }
    }
  } else if (Math.abs(input[p][0].lsX) > 0.3 && (tempMax < 0 && _main.player[p].phys.cVel.x > tempMax || tempMax > 0 && _main.player[p].phys.cVel.x < tempMax)) {
    _main.player[p].phys.cVel.x += _main.player[p].charAttributes.airMobA * input[p][0].lsX + Math.sign(input[p][0].lsX) * _main.player[p].charAttributes.airMobB;
  }

  if (Math.abs(input[p][0].lsX) < 0.3) {
    if (_main.player[p].phys.cVel.x > 0) {
      _main.player[p].phys.cVel.x -= _main.player[p].charAttributes.airFriction;
      if (_main.player[p].phys.cVel.x < 0) {
        _main.player[p].phys.cVel.x = 0;
      }
    } else {
      _main.player[p].phys.cVel.x += _main.player[p].charAttributes.airFriction;
      if (_main.player[p].phys.cVel.x > 0) {
        _main.player[p].phys.cVel.x = 0;
      }
    }
  }
}

function fastfall(p, input) {
  if (!_main.player[p].phys.fastfalled) {
    _main.player[p].phys.cVel.y -= _main.player[p].charAttributes.gravity;
    if (_main.player[p].phys.cVel.y < -_main.player[p].charAttributes.terminalV) {
      _main.player[p].phys.cVel.y = -_main.player[p].charAttributes.terminalV;
    }
    if (input[p][0].lsY < -0.65 && input[p][3].lsY > -0.1 && _main.player[p].phys.cVel.y < 0) {
      _sfx.sounds.fastfall.play();
      _main.player[p].phys.fastfalled = true;
      _main.player[p].phys.cVel.y = -_main.player[p].charAttributes.fastFallV;
    }
  }
}

function shieldDepletion(p, input) {
  //(0.28*input - (1-input/10))
  var input = Math.max(input[p][0].lA, input[p][0].rA);
  _main.player[p].phys.shieldHP -= 0.28 * input - (1 - input) / 10;
  if (_main.player[p].phys.shieldHP <= 0) {
    _main.player[p].phys.shielding = false;
    _main.player[p].phys.kVel.y = _main.player[p].charAttributes.shieldBreakVel;
    _main.player[p].phys.kDec.y = 0.051;
    _main.player[p].phys.kDec.x = 0;
    _main.player[p].phys.grounded = false;
    _main.player[p].phys.shieldHP = 0;
    (0, _drawVfx.drawVfx)({
      name: "breakShield",
      pos: _main.player[p].phys.pos,
      face: _main.player[p].phys.face
    });
    _sfx.sounds.shieldbreak.play();
    actionStates[_main.characterSelections[p]].SHIELDBREAKFALL.init(p, input);
  }
}

function shieldSize(p, lock, input) {
  //shield size * 0.575 * model scaling
  //(shield size * 0.575 * hp/60) + (1-input)*0.60714*shieldsize
  _main.player[p].phys.shieldAnalog = Math.max(input[p][0].lA, input[p][0].rA);
  if (_main.player[p].phys.shieldAnalog === 0) {
    _main.player[p].phys.shieldAnalog = 1;
  }
  if (lock && _main.player[p].phys.shieldAnalog == 0) {
    _main.player[p].phys.shieldAnalog = 1;
  }
  _main.player[p].phys.shieldSize = _main.player[p].charAttributes.shieldScale * 0.575 * _main.player[p].charAttributes.modelScale * (_main.player[p].phys.shieldHP / 60) + (1 - _main.player[p].phys.shieldAnalog) * 0.6 * _main.player[p].charAttributes.shieldScale + (60 - _main.player[p].phys.shieldHP) / 60 * 2;
}

function mashOut(p, input) {
  if (input[p][0].a && !input[p][1].a) {
    return true;
  } else if (input[p][0].b && !input[p][1].b) {
    return true;
  } else if (input[p][0].x && !input[p][1].x) {
    return true;
  } else if (input[p][0].y && !input[p][1].y) {
    return true;
  } else if (input[p][0].lsX > 0.8 && !input[p][1].lsX < 0.7) {
    return true;
  } else if (input[p][0].lsX < -0.8 && !input[p][1].lsX < -0.7) {
    return true;
  } else if (input[p][0].lsY > 0.8 && !input[p][1].lsY < 0.7) {
    return true;
  } else if (input[p][0].lsY < -0.8 && !input[p][1].lsY > -0.7) {
    return true;
  } else if (input[p][0].csX > 0.8 && !input[p][1].csX < 0.7) {
    return true;
  } else if (input[p][0].csX < -0.8 && !input[p][1].csX < -0.7) {
    return true;
  } else if (input[p][0].csY > 0.8 && !input[p][1].csY < 0.7) {
    return true;
  } else if (input[p][0].csY < -0.8 && !input[p][1].csY > -0.7) {
    return true;
  } else {
    return false;
  }
}

// Global Interrupts
function checkForSmashes(p, input) {
  if (input[p][0].a && !input[p][1].a) {
    if (Math.abs(input[p][0].lsX) >= 0.79 && input[p][2].lsX * Math.sign(input[p][0].lsX) < 0.3) {
      _main.player[p].phys.face = Math.sign(input[p][0].lsX);
      return [true, "FORWARDSMASH"];
    } else if (input[p][0].lsY >= 0.66 && input[p][2].lsY < 0.3) {
      return [true, "UPSMASH"];
    } else if (input[p][0].lsY <= -0.66 && input[p][2].lsY > -0.3) {
      return [true, "DOWNSMASH"];
    } else {
      return [false, false];
    }
  } else if (Math.abs(input[p][0].csX) >= 0.79 && Math.abs(input[p][1].csX) < 0.79) {
    _main.player[p].phys.face = Math.sign(input[p][0].csX);
    return [true, "FORWARDSMASH"];
  } else if (input[p][0].csY >= 0.66 && input[p][1].csY < 0.66) {
    return [true, "UPSMASH"];
  } else if (input[p][0].csY <= -0.66 && input[p][1].csY > -0.66) {
    return [true, "DOWNSMASH"];
  } else {
    return [false, false];
  }
}

function checkForTilts(p, input, reverse) {
  var reverse = reverse || 1;
  if (input[p][0].a && !input[p][1].a) {
    if (input[p][0].lsX * _main.player[p].phys.face * reverse > 0.3 && Math.abs(input[p][0].lsX) - Math.abs(input[p][0].lsY) > -0.05) {
      return [true, "FORWARDTILT"];
    } else if (input[p][0].lsY < -0.3) {
      return [true, "DOWNTILT"];
    } else if (input[p][0].lsY > 0.3) {
      return [true, "UPTILT"];
    } else {
      return [true, "JAB1"];
    }
  } else {
    return [false, false];
  }
}

function checkForIASA(p, input, isAerial) {
  if (_main.player[p].timer > _main.player[p].IASATimer) {
    if (isAerial) {
      var a = checkForAerials(p, input);
      if (checkForDoubleJump(p, input) && !_main.player[p].phys.doubleJumped || checkForMultiJump(p, input) && _main.player[p].phys.jumpsUsed < 5 && _main.player[p].charAttributes.multiJump) {
        if (input[p][0].lsX * _main.player[p].phys.face < -0.3) {
          _JUMPAERIALB2.default.init(p, input);
        } else {
          _JUMPAERIALF2.default.init(p, input);
        }
        return true;
      } else if (a[0]) {
        if (_main.characterSelections[p] == 0) {
          _index6.default[a[1]].init(p, input);
        } else if (_main.characterSelections[p] == 1) {
          _index4.default[a[1]].init(p, input);
        } else if (_main.characterSelections[p] == 2) {
          _index2.default[a[1]].init(p, input);
        }
        return true;
      } else {
        return false;
      }
    } else {//isn't aerial

    }
  }
}

function checkForSpecials(p, input) {
  if (input[p][0].b && !input[p][1].b) {
    if (_main.player[p].phys.grounded) {
      if (Math.abs(input[p][0].lsX) > 0.59 || input[p][0].lsY > 0.54 && Math.abs(input[p][0].lsX) > input[p][0].lsY - 0.2) {
        _main.player[p].phys.face = Math.sign(input[p][0].lsX);
        return [true, "SIDESPECIALGROUND"];
      } else if (input[p][0].lsY > 0.54) {
        return [true, "UPSPECIAL"];
      } else if (input[p][0].lsY < -0.54) {
        return [true, "DOWNSPECIALGROUND"];
      } else {
        return [true, "NEUTRALSPECIALGROUND"];
      }
    } else {
      if (input[p][0].lsY > 0.54 || Math.abs(input[p][0].lsX) > 0.59 && input[p][0].lsY > Math.abs(input[p][0].lsX) - 0.2) {
        return [true, "UPSPECIAL"];
      } else if (input[p][0].lsY < -0.54 || Math.abs(input[p][0].lsX) > 0.59 && -input[p][0].lsY > Math.abs(input[p][0].lsX) - 0.2) {
        return [true, "DOWNSPECIALAIR"];
      } else if (Math.abs(input[p][0].lsX) > 0.59) {
        _main.player[p].phys.face = Math.sign(input[p][0].lsX);
        return [true, "SIDESPECIALAIR"];
      } else {
        if (input[p][0].lsX * _main.player[p].phys.face < -0.25) {
          _main.player[p].phys.face *= -1;
        } else if (_main.player[p].phys.bTurnaroundTimer > 0) {
          _main.player[p].phys.face = _main.player[p].phys.bTurnaroundDirection;
        }
        return [true, "NEUTRALSPECIALAIR"];
      }
    }
  } else {
    return [false, false];
  }
}

function checkForAerials(p, input) {
  //console.log(p);
  //console.log(input);
  //console.log(input[p]);
  if (input[p][0].csX * _main.player[p].phys.face >= 0.3 && input[p][1].csX * _main.player[p].phys.face < 0.3 && Math.abs(input[p][0].csX) > Math.abs(input[p][0].csY) - 0.1) {
    return [true, "ATTACKAIRF"];
  } else if (input[p][0].csX * _main.player[p].phys.face <= -0.3 && input[p][1].csX * _main.player[p].phys.face > -0.3 && Math.abs(input[p][0].csX) > Math.abs(input[p][0].csY) - 0.1) {
    return [true, "ATTACKAIRB"];
  } else if (input[p][0].csY >= 0.3 && input[p][1].csY < 0.3) {
    return [true, "ATTACKAIRU"];
  } else if (input[p][0].csY < -0.3 && input[p][1].csY > -0.3) {
    return [true, "ATTACKAIRD"];
  } else if (input[p][0].a && !input[p][1].a || input[p][0].z && !input[p][1].z) {
    if (input[p][0].lsX * _main.player[p].phys.face > 0.3 && Math.abs(input[p][0].lsX) > Math.abs(input[p][0].lsY) - 0.1) {
      return [true, "ATTACKAIRF"];
    } else if (input[p][0].lsX * _main.player[p].phys.face < -0.3 && Math.abs(input[p][0].lsX) > Math.abs(input[p][0].lsY) - 0.1) {
      return [true, "ATTACKAIRB"];
    } else if (input[p][0].lsY > 0.3) {
      return [true, "ATTACKAIRU"];
    } else if (input[p][0].lsY < -0.3) {
      return [true, "ATTACKAIRD"];
    } else {
      return [true, "ATTACKAIRN"];
    }
  }
  return [false, 0];
}

function checkForDash(p, input) {
  return input[p][0].lsX * _main.player[p].phys.face > 0.79 && input[p][2].lsX * _main.player[p].phys.face < 0.3;
}

function checkForSmashTurn(p, input) {
  return input[p][0].lsX * _main.player[p].phys.face < -0.79 && input[p][2].lsX * _main.player[p].phys.face > -0.3;
}

function tiltTurnDashBuffer(p, input) {
  return input[p][1].lsX * _main.player[p].phys.face > -0.3;
}

function checkForTiltTurn(p, input) {
  return input[p][0].lsX * _main.player[p].phys.face < -0.3;
}

function checkForJump(p, input) {
  if (input[p][0].x && !input[p][1].x || input[p][0].y && !input[p][1].y) {
    return [true, 0];
  } else if (_settings.gameSettings["tapJumpOffp" + (p + 1)] == false && input[p][0].lsY > 0.66 && input[p][3].lsY < 0.2) {
    // == is on purpose
    return [true, 1];
  } else {
    return [false, false];
  }
}
function checkForDoubleJump(p, input) {
  return input[p][0].x && !input[p][1].x || input[p][0].y && !input[p][1].y || _settings.gameSettings["tapJumpOffp" + (p + 1)] == false && input[p][0].lsY > 0.69 && input[p][1].lsY <= 0.69;
}
function checkForMultiJump(p, input) {
  return !!(input[p][0].x || input[p][0].y || _settings.gameSettings["tapJumpOffp" + (p + 1)] == false && input[p][0].lsY > 0.7);
}
function checkForSquat(p, input) {
  return input[p][0].lsY < -0.69;
}

function turboAirborneInterrupt(p, input) {
  var a = checkForAerials(p, input);
  var b = checkForSpecials(p, input);
  if (a[0] && a[1] != _main.player[p].actionState) {
    turnOffHitboxes(p);
    actionStates[_main.characterSelections[p]][a[1]].init(p, input);
    return true;
  } else if (input[p][0].l && !input[p][1].l || input[p][0].r && !input[p][1].r) {
    turnOffHitboxes(p);
    actionStates[_main.characterSelections[p]].ESCAPEAIR.init(p, input);
    return true;
  } else if ((input[p][0].x && !input[p][1].x || input[p][0].y && !input[p][1].y || input[p][0].lsY > 0.7 && input[p][1].lsY <= 0.7) && (!_main.player[p].phys.doubleJumped || _main.player[p].phys.jumpsUsed < 5 && _main.player[p].charAttributes.multiJump)) {
    turnOffHitboxes(p);
    if (input[p][0].lsX * _main.player[p].phys.face < -0.3) {
      actionStates[_main.characterSelections[p]].JUMPAERIALB.init(p, input);
    } else {
      actionStates[_main.characterSelections[p]].JUMPAERIALF.init(p, input);
    }
    return true;
  } else if (b[0] && b[1] != _main.player[p].actionState) {
    turnOffHitboxes(p);
    actionStates[_main.characterSelections[p]][b[1]].init(p, input);
    return true;
  } else {
    return false;
  }
}

function turboGroundedInterrupt(p, input) {
  var b = checkForSpecials(p, input);
  var t = checkForTilts(p, input);
  var s = checkForSmashes(p, input);
  var j = checkForJump(p, input);
  if (j[0]) {
    turnOffHitboxes(p);
    actionStates[_main.characterSelections[p]].KNEEBEND.init(p, j[1], input);
    return true;
  } else if (input[p][0].l || input[p][0].r) {
    turnOffHitboxes(p);
    actionStates[_main.characterSelections[p]].GUARDON.init(p, input);
    return true;
  } else if (input[p][0].lA > 0 || input[p][0].rA > 0) {
    turnOffHitboxes(p);
    actionStates[_main.characterSelections[p]].GUARDON.init(p, input);
    return true;
  } else if (b[0] && b[1] != _main.player[p].actionState) {
    turnOffHitboxes(p);
    actionStates[_main.characterSelections[p]][b[1]].init(p, input);
    return true;
  } else if (s[0] && s[1] != _main.player[p].actionState) {
    turnOffHitboxes(p);
    actionStates[_main.characterSelections[p]][s[1]].init(p, input);
    return true;
  } else if (t[0] && t[1] != _main.player[p].actionState) {
    turnOffHitboxes(p);
    actionStates[_main.characterSelections[p]][t[1]].init(p, input);
    return true;
  } else if (checkForSquat(p, input)) {
    turnOffHitboxes(p);
    actionStates[_main.characterSelections[p]].SQUAT.init(p, input);
    return true;
  } else if (checkForDash(p, input)) {
    turnOffHitboxes(p);
    actionStates[_main.characterSelections[p]].DASH.init(p, input);
    return true;
  } else if (checkForSmashTurn(p, input)) {
    turnOffHitboxes(p);
    actionStates[_main.characterSelections[p]].SMASHTURN.init(p, input);
    return true;
  } else if (checkForTiltTurn(p, input)) {
    turnOffHitboxes(p);
    _main.player[p].phys.dashbuffer = tiltTurnDashBuffer(p, input);
    actionStates[_main.characterSelections[p]].TILTTURN.init(p, input);
    return true;
  } else if (Math.abs(input[p][0].lsX) > 0.3) {
    turnOffHitboxes(p);
    actionStates[_main.characterSelections[p]].WALK.init(p, true, input);
    return true;
  } else {
    return false;
  }
}

var actionStates = exports.actionStates = [];
function setupActionStates(index, val) {
  actionStates[index] = (0, _deepCopy.deepCopyObject)(true, val);
}

/* char id:
0 - marth
1 - jiggs
2 - fox
*/

//////////////////
// WEBPACK FOOTER
// ./src/physics/actionStateShortcuts.js
// module id = 10
// module chunks = 1
//# sourceURL=webpack:///./src/physics/actionStateShortcuts.js?