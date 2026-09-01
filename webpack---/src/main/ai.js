"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NearestEnemy = NearestEnemy;
exports.generalAI = generalAI;
exports.marthAI = marthAI;
exports.runAI = runAI;
exports.isEnemyApproaching = isEnemyApproaching;
exports.NearestLedge = NearestLedge;
exports.NearestFloor = NearestFloor;
exports.isAboveGround = isAboveGround;
exports.CPUSHDL = CPUSHDL;
exports.CPUTech = CPUTech;
exports.CPUMissedTech = CPUMissedTech;
exports.CPUWaveshineAny = CPUWaveshineAny;
exports.CPUGrabRelease = CPUGrabRelease;
exports.CPUrecover = CPUrecover;

var _input = __webpack_require__(49);

var _main = __webpack_require__(11);

var _settings = __webpack_require__(14);

var _activeStage = __webpack_require__(18);

/* eslint-disable */

var a = 0;
function NearestEnemy(cpu, p) {
  var nearestEnemy = -1;
  var enemyDistance = 100000;
  for (var i = 0; i < 4; i++) {
    if (_main.playerType[i] > -1) {
      if (_main.playerType[i] > -1 && i != p && _main.player[i].actionState != "SLEEP") {
        if (i != p) {
          var dist = Math.pow(cpu.phys.pos.x - _main.player[i].phys.pos.x, 2) + Math.pow(cpu.phys.pos.y - _main.player[i].phys.pos.y, 2);
          if (dist < enemyDistance) {
            enemyDistance = dist;
            nearestEnemy = i;
          }
        }
      }
    }
  }
  if (nearestEnemy == -1) {
    nearestEnemy = 0;
    console.log("cant find nearest enemy");
    // fail safe so it doesnt crash at least
  }
  return nearestEnemy;
}
function generalAI(i) {
  _input.aiInputBank[i][0].lsX = 0;
  _input.aiInputBank[i][0].lsY = 0;
  _input.aiInputBank[i][0].x = false;
  _input.aiInputBank[i][0].b = false;
  _input.aiInputBank[i][0].l = 0;
  _input.aiInputBank[i][0].lA = 0;
  _input.aiInputBank[i][0].csX = 0;
  _input.aiInputBank[i][0].csY = 0;
  _input.aiInputBank[i][0].a = false;
  var willWalk = false;
  var paction = _main.player[i].actionState;
  var px = _main.player[i].phys.pos.x;
  var py = _main.player[i].phys.pos.y;
  var pcyx = _main.player[i].phys.cVel.x;
  var pcyy = _main.player[i].phys.cVel.y;
  var pdiff = _main.player[i].difficulty;
  var aerialAttacks = ["ATTACKAIRN", "ATTACKAIRF", "ATTACKAIRB", "ATTACKAIRU", "ATTACKAIRD"];
  var idleActions = ["WAIT", "OTTOTTOWAIT", "WALK", "LANDING"];
  //const tilts = ["DOWNTILT","UTILT","FTILT","JAB1"];
  var groundAttacks = ["DOWNTILT", "UTILT", "FTILT", "JAB1", "JAB2", "JAB3", "FSMASH", "DSMASH", "USMASH", "ATTACKDASH"];
  var ptimer = _main.player[i].timer;
  var pgrounded = _main.player[i].phys.grounded;
  // if (a > 5) {
  // if (cS[i] == 2) {
  // var distx = player[i].phys.pos.x - player[NearestEnemy(player[i],i)].phys.pos.x;
  // player[i].phys.pos.x = ((Math.random() * 50) - 25) + player[i].phys.pos.x - (Math.sign(player[i].phys.pos.x - player[NearestEnemy(player[i],i)].phys.pos.x) * 1.0 * Math.min(5,Math.abs(player[i].phys.pos.x - (player[NearestEnemy(player[i],i)].phys.pos.x + ((Math.random() * 50) - 20)))));
  // px = ((Math.random() * 50) - 25) + px - (Math.sign(px - player[NearestEnemy(player[i],i)].phys.pos.y) * 1.0 * Math.min(5,Math.abs(px - (player[NearestEnemy(player[i],i)].phys.pos.y + ((Math.random() * 50) - 20)))));
  // player[NearestEnemy(player[i],i)].phys.pos.x += ((Math.random() * 8) - 4);
  // player[NearestEnemy(player[i],i)].phys.pos.y += ((Math.random() * 8) - 4);
  // if (Math.abs(distx) < 50 && !(player[NearestEnemy(player[i],i)].actionState.substr(0,4) == "DEAD")) {
  // player[NearestEnemy(player[i],i)].hitstun = 50;
  // player[NearestEnemy(player[i],i)].actionState = "DAMAGEFLYN";
  // player[NearestEnemy(player[i],i)].phys.kVel.y = 1.0;
  // player[NearestEnemy(player[i],i)].phys.kVel.x = 1.0;
  // player[NearestEnemy(player[i],i)].phys.cVel.x = ((Math.random() * 10) - 5) / 4;
  // player[NearestEnemy(player[i],i)].phys.cVel.x = ((Math.random() * 10) - 5) / 4;
  // }
  // }
  // }
  //if (player[i].currentAction == "CLIFFWAIT")
  if (paction == "GRABRELEASE") {
    if (ptimer >= 2 && ["WAIT", "OTTOTTOWAIT", "DAMAGEFALL", "FALL", "JUMPF", "LANDING", "JAB1", "ESCAPEF", "ESCAPEB", "FORWARDSMASH", "DOWNTILT"].indexOf(paction) != -1) {
      _main.player[i].currentAction = "NONE";
      _main.player[i].currentSubaction = "NONE";
    }
  }
  if (paction == "CATCHWAIT") {
    //filler AI

    var randomSeed = Math.floor(Math.random() * 10 + 1);
    if (randomSeed <= 2) {
      _input.aiInputBank[i][0].lsX = 1.0;
    } else if (randomSeed <= 4) {
      _input.aiInputBank[i][0].lsX = -1.0;
    } else if (randomSeed <= 6) {
      _input.aiInputBank[i][0].lsY = 1.0;
    } else if (randomSeed <= 8) {
      _input.aiInputBank[i][0].lsY = -1.0;
    } else {
      _input.aiInputBank[i][0].a = 1.0;
    }
    return;
  }
  if (_main.player[i].currentAction == "DROPTHROUGHPLATFORM" && paction != "SQUAT") {
    _main.player[i].currentAction = "NONE";
    _main.player[i].currentSubaction = "NONE";
  } else if (_main.player[i].currentAction == "DROPTHROUGHPLATFORM") {
    //if (ptimer <= 2) {
    _input.aiInputBank[i][0].lsY = -1.0;
    //player[i].currentAction = "NONE";
    //}
    return;
  }
  if ((_main.player[i].currentSubaction == "LEFT" || _main.player[i].currentSubaction == "RIGHT") && _main.player[i].currentAction == "NONE") {
    _main.player[i].currentSubaction = "NONE";
  }
  if (_main.player[i].currentAction == "RUNOFFPLATFORM") {
    if (!pgrounded && isOffstage(_main.player[i])) {
      _main.player[i].currentAction = "NONE";
      _main.player[i].currentSubaction = "NONE";
    }
    if (["FALL", "DASH", "RUN", "SMASHTURN", "TURN", "WALK"].indexOf(paction) == -1) {
      _main.player[i].currentAction = "NONE";
      _main.player[i].currentSubaction = "NONE";
    } else {
      if (paction == "WALK") {
        //changed from phys.pos.face to phys.face
        _input.aiInputBank[i][0].lsX = _main.player[i].phys.face * -1.0;
      }
      if (paction == "SMASHTURN") {
        if (ptimer < 2) {
          return;
        }
      }
      if (_main.player[i].currentSubaction == "LEFT") {
        if (pgrounded) {
          _input.aiInputBank[i][0].lsX = -1.0;
        } else {
          _input.aiInputBank[i][0].lsX = -1.0;
          if (ptimer == 2 && _main.player[i].phys.cVel.y <= 0) {
            //fast fall
            _input.aiInputBank[i][0].lsY = -1.0;
          }
          return;
        }
      } else {
        if (pgrounded) {
          _input.aiInputBank[i][0].lsX = 1.0;
        } else {
          _input.aiInputBank[i][0].lsX = -1.0;
          if (ptimer == 2 && _main.player[i].phys.cVel.y <= 0) {
            //fast fall
            _input.aiInputBank[i][0].lsY = -1.0;
          }
          return;
        }
      }
    }
  }
  if (_main.player[i].currentSubaction == "UPTILT" && paction != "UPTILT") {
    _main.player[i].currentSubaction = "NONE";
  }
  var nearest = NearestEnemy(_main.player[i], i);
  if (pdiff >= 2) {
    if (_main.player[i].currentAction == "NONE") {
      if (["OTTOTTOWAIT", "WAIT", "SMASHTURN", "WALKF", "WALK", "SQUAT"].indexOf(paction) != -1 && isAboveGround(_main.player[i].phys.pos.x, px + 1.0)[1] == "platform" && pgrounded && py - _main.player[nearest].phys.pos.y > 0 && Math.abs(_main.player[nearest].phys.pos.x - _main.player[i].phys.pos.x) <= 40) {
        //is above platform
        //console.log("H");
        var randomSeed = Math.floor(Math.random() * 10 + 1);
        //randomSeed = 5;
        if (randomSeed <= 3) {
          _input.aiInputBank[i][0].lsY = -1.0;
          _main.player[i].currentAction = "DROPTHROUGHPLATFORM";
          return;
        } else if (randomSeed <= 5) {
          _main.player[i].currentAction = "SHIELD";
          _input.aiInputBank[i][0].l = 1.0;
          if (_input.aiInputBank[i][0].l) {
            _input.aiInputBank[i][0].lA = 1;
          }
          return;
        } else if (randomSeed >= 6) {
          _main.player[i].currentAction = "RUNOFFPLATFORM";
          var randomSeed = Math.floor(Math.random() * 2 + 1);
          if (randomSeed == 1) {
            _main.player[i].currentSubaction = "LEFT";
            _input.aiInputBank[i][0].lsX = -1.0;
            return;
          } else {
            _main.player[i].currentSubaction = "RIGHT";
            _input.aiInputBank[i][0].lsX = 1.0;
            return;
          }
        }
      }
    }
  }
  if (_main.player[i].currentAction == "SHIELD") {
    if (["GUARD", "GUARDON", "WAIT", "DASH", "OTTOTTOWAIT", "SMASHTURN"].indexOf(paction) == -1) {
      _main.player[i].currentAction = "NONE";
      _main.player[i].currentSubaction = "NONE";
    } else {
      //is shielding
      var inputs = CPUShield(_main.player[i], i);
      _input.aiInputBank[i][0].lsX = isNaN(inputs.lsX) ? 0 : inputs.lsX;
      _input.aiInputBank[i][0].lsY = isNaN(inputs.lsY) ? 0 : inputs.lsY;
      _input.aiInputBank[i][0].x = inputs.x;
      _input.aiInputBank[i][0].b = inputs.b;
      _input.aiInputBank[i][0].l = inputs.l;
      _input.aiInputBank[i][0].csX = isNaN(inputs.csX) ? 0 : inputs.csX;
      _input.aiInputBank[i][0].csY = isNaN(inputs.csY) ? 0 : inputs.csY;
      _input.aiInputBank[i][0].a = inputs.a;
      if (_input.aiInputBank[i][0].l) {
        _input.aiInputBank[i][0].lA = 1;
      }
      return;
    }
  }
  if (_main.player[i].currentAction == "LEDGESTALL") {
    if (_main.player[i].currentSubaction == "FALL") {
      if (["CLIFFWAIT", "JUMPF", "FALL", "FALLAERIAL", "JUMPAERIAL", "JUMPAERIALF", "JUMPAERIAL1", "JUMPAERIALB"].indexOf(paction) == -1) {
        _main.player[i].currentAction = "NONE";
        _main.player[i].currentSubaction = "NONE";
      }
    } else if (_main.player[i].currentSubaction == "GRAB") {
      //grab ledge
      if (["UPSPECIAL", "UPSPECIALCHARGE", "UPSPECIALLAUNCH", "JUMPAERIAL", "CLIFFWAIT", "FALL", "JUMPAERIAL1", "FALLAERIAL", "JUMPAERIALF", "JUMPAERIALB", "JUMPF"].indexOf(_main.player[i].currentAction) == -1) {
        _main.player[i].currentAction = "NONE";
        _main.player[i].currentSubaction = "NONE";
      }
    }
  }
  if (["TOURNAMENTWINNER", "LEDGEGETUP", "LEDGEATTACK", "LEDGEROLL"].indexOf(_main.player[i].currentAction) != -1) {
    if (!(paction.substr(0, 5) == "CLIFF")) {
      _main.player[i].currentAction = "NONE";
    }
  }
  if (_main.player[i].currentAction == "LEDGEDASH") {
    if (["CLIFFWAIT", "JUMPAERIALF", "JUMPAERIALB", "FALLAERIAL", "ESCAPEAIR", "FALL", "JUMPAERIAL1", "JUMPAERIAL"].indexOf(paction) == -1) {
      _main.player[i].currentAction = "NONE";
    } else {
      var inputs = CPULedge(_main.player[i], i);
      //do inputs
      _input.aiInputBank[i][0].lsX = isNaN(inputs.lsX) ? 0 : inputs.lsX;
      _input.aiInputBank[i][0].lsY = isNaN(inputs.lsY) ? 0 : inputs.lsY;
      _input.aiInputBank[i][0].x = inputs.x;
      _input.aiInputBank[i][0].b = inputs.b;
      _input.aiInputBank[i][0].l = inputs.l;
      _input.aiInputBank[i][0].csX = isNaN(inputs.csX) ? 0 : inputs.csX;
      _input.aiInputBank[i][0].csY = isNaN(inputs.csY) ? 0 : inputs.csY;
      _input.aiInputBank[i][0].a = inputs.a;
      if (_input.aiInputBank[i][0].l) {
        _input.aiInputBank[i][0].lA = 1;
      }
      return;
    }
  }
  if (pdiff == 4 && _main.player[i].hit.hitlag > 0 && isOffstage(_main.player[i]) && !pgrounded) {
    //SDI
    var inputs = CPUSDItoStage(_main.player[i], i);
    _input.aiInputBank[i][0].lA = 1;
    _input.aiInputBank[i][0].l = true;
    _input.aiInputBank[i][0].lsX = isNaN(inputs.lsX) ? 0 : inputs.lsX;
    _input.aiInputBank[i][0].lsY = isNaN(inputs.lsY) ? 0 : inputs.lsY;
    return;
  }
  if (!_main.player[i].grounded && isOffstage(_main.player[i]) && _main.player[i].currentAction == "NONE") {
    var inputs = CPUrecover(_main.player[i], i);
    //do inputs
    _input.aiInputBank[i][0].lsX = isNaN(inputs.lsX) ? 0 : inputs.lsX;
    _input.aiInputBank[i][0].lsY = isNaN(inputs.lsY) ? 0 : inputs.lsY;
    _input.aiInputBank[i][0].x = inputs.x;
    _input.aiInputBank[i][0].b = inputs.b;
  }
  if (_main.player[i].currentAction == "REVERSEUPTILT") {
    if (["SMASHTURN", "WAIT", "UPTILT", "LANDING", "OTTOTTOWAIT"].indexOf(paction) != -1) {
      _main.player[i].currentAction = "NONE";
      _main.player[i].currentSubaction = "NONE";
    } else {
      if (_main.player[i].currentSubaction == "REVERSE") {
        //smash turn
        _input.aiInputBank[i][0].lsX = -1.0 * _main.player[i].phys.face;
        _main.player[i].currentSubaction = "UPTILT";
        return;
      } else if (_main.player[i].currentSubaction == "UPTILT" && ptimer > 1) {
        _input.aiInputBank[i][0].lsX = 0.0;
        _main.player[i].currentAction = "NONE";
        _main.player[i].currentSubaction = "NONE";
        _input.aiInputBank[i][0].lsY = .50;
        _input.aiInputBank[i][0].a = true;
        return;
      }
    }
  }
  if (_main.player[i].currentAction == "MASHING" && paction == "WAIT" && ptimer > 2) {
    _main.player[i].currentAction = "NONE";
  }
  //if (player[i].currentSubaction.substr(0,2) == "TUMBLE" && !(paction == "DAMAGEFALL") {
  //	  player[i].currentSubaction = "NONE";
  //}
  if (_main.player[i].currentAction == "SMASHTURN") {
    if (paction == "WAIT" || ptimer > 0) {
      _main.player[i].currentAction = "NONE";
    }
  }
  if (_main.player[i].currentAction == "TECH" || _main.player[i].currentAction == "MISSEDTECH") {
    if (paction == "CLIFFWAIT" || paction == "FALLN" || paction == "WAIT") {
      _main.player[i].currentAction = "NONE";
    }
  }
  if ((paction == "DAMAGEFALL" || paction == "DAMAGEFLYN") && !isOffstage(_main.player[i]) && pdiff > 0) {
    //if ((px - (1.5 * player[i].phys.kVel.y)) - NearestFloor(player[i]) < 0) {
    //if (px - NearestFloor(player[i]) < 5 && player[i].phys.kVel > 0) {
    if (_main.player[i].hit.hitstun <= 0) {
      var extra = 0;
      if (!_main.player[i].phys.doubleJumped || _main.player[i].phys.jumpsUsed < 5 && _main.player[i].charAttributes.multiJump) {
        extra = 3;
      }
      var randomSeed = Math.floor(Math.random() * (2 + extra) + 1);
      if (randomSeed == 1) {
        //left
        _input.aiInputBank[i][0].lsX = -1.0;
      } else if (randomSeed == 2) {
        //right
        _input.aiInputBank[i][0].lsX = 1.0;
      } else {
        //jump
        _input.aiInputBank[i][0].x = true;
      }
      _main.player[i].currentAction = "NONE";
      return;
    }
    //console.log("SS");
    _main.player[i].currentAction = "TECH";
    var inputs = CPUTech(_main.player[i], i);
    _input.aiInputBank[i][0].lsX = isNaN(inputs.lsX) ? 0 : inputs.lsX;
    _input.aiInputBank[i][0].l = inputs.l;
    if (_input.aiInputBank[i][0].l) {
      _input.aiInputBank[i][0].lA = 1;
    }
    return;
    //}
  }
  //if (paction == "DAMAGEFALL") {
  //	var inputs = CPUTumble(player[i],i);
  //	player[i].inputs.lStickAxis[0].x = inputs.lstickX;
  //}
  if (paction == "DOWNWAIT") {
    //missed tech options
    _main.player[i].currentAction = "MISSEDTECH";
    var inputs = CPUMissedTech(_main.player[i], i);
    _input.aiInputBank[i][0].lsX = isNaN(inputs.lsX) ? 0 : inputs.lsX;
    _input.aiInputBank[i][0].lsY = isNaN(inputs.lsY) ? 0 : inputs.lsY;
    _input.aiInputBank[i][0].a = inputs.a;
  }
  if (paction != "DOWNWAIT") {

    if (paction.substr(0, 7) == "CAPTURE" && pdiff > 0 && paction != "CAPTURECUT") {
      //break out of grabs
      _main.player[i].currentAction = "MASHING";
      _main.player[i].lastMash += 1;
      if (_main.player[i].lastMash > 8 - 2 * pdiff) {
        _main.player[i].lastMash = 0;
        _input.aiInputBank[i][0].lsY = 1.0;
        _input.aiInputBank[i][0].lA = 1;
        if (!_input.aiInputBank[i][1].a) {
          _input.aiInputBank[i][0].a = true;
          _input.aiInputBank[i][0].x = true;
          _input.aiInputBank[i][0].lsX = -1.0;
          _input.aiInputBank[i][0].csX = -1.0;
          //aiInputBank[i][0].r = true;
        } else {
          _input.aiInputBank[i][0].y = true;
          _input.aiInputBank[i][0].lsX = 1.0;
          _input.aiInputBank[i][0].b = true;
          _input.aiInputBank[i][0].csX = 1.0;
          //aiInputBank[i][0].l = true;
        }
      }
    }
    if (_main.player[i].currentAction == "WAVESHINEANY") {
      var inputs = CPUWaveshineAny(_main.player[i], i);
      _input.aiInputBank[i][0].lsX = isNaN(inputs.lsX) ? 0 : inputs.lsX;
      _input.aiInputBank[i][0].lsY = isNaN(inputs.lsY) ? 0 : inputs.lsY;
      _input.aiInputBank[i][0].x = inputs.x;
      _input.aiInputBank[i][0].b = inputs.b;
      _input.aiInputBank[i][0].l = inputs.l;
      if (_input.aiInputBank[i][0].l) {
        _input.aiInputBank[i][0].lA = 1;
      }
      return;
    }
    if (_main.player[i].currentAction != "WAVESHINEANY" && (paction == "CAPTURECUT" || _main.player[i].currentAction == "GRABRELEASE")) {
      _main.player[i].currentAction = "GRABRELEASE";
      var inputs = CPUGrabRelease(_main.player[i], i);
      _input.aiInputBank[i][0].lsX = isNaN(inputs.lsX) ? 0 : inputs.lsX;
      _input.aiInputBank[i][0].lsY = isNaN(inputs.lsY) ? 0 : inputs.lsY;
      _input.aiInputBank[i][0].x = inputs.x;
      _input.aiInputBank[i][0].b = inputs.b;
      _input.aiInputBank[i][0].l = inputs.l;
      _input.aiInputBank[i][0].csX = isNaN(inputs.csX) ? 0 : inputs.csX;
      _input.aiInputBank[i][0].csY = isNaN(inputs.csY) ? 0 : inputs.csY;
      _input.aiInputBank[i][0].a = inputs.a;
      if (_input.aiInputBank[i][0].l) {
        _input.aiInputBank[i][0].lA = 1;
      }
      return;
    }
    if (_main.player[i].currentAction == "MASHING" && !(paction.substr(0, 7) == "CAPTURE")) {
      _main.player[i].currentAction == "NONE";
      _main.player[i].lastMash = 0;
    }
    if (_main.player[i].hit.hitstun > 0) {
      //stops action if they get interrupt. pretty simple? could also expand for DI
      _main.player[i].currentAction = "NONE";
    }
    if (paction == "REBIRTHWAIT") {
      _input.aiInputBank[i][0].lsY = -1.0;
    }
    if (_main.player[i].currentAction == "NONE" && paction == "CLIFFWAIT" || _main.player[i].currentAction == "LEDGEDASH" || _main.player[i].currentAction == "LEDGEAIRATTACK2" || _main.player[i].currentAction == "LEDGEAIRATTACK" || _main.player[i].currentAction == "LEDGEGETUP" || _main.player[i].currentAction == "LEDGEATTACK" || _main.player[i].currentAction == "LEDGEJUMP" || _main.player[i].currentAction == "LEDGEROLL" || _main.player[i].currentAction == "LEDGEJUMP" || _main.player[i].currentAction == "TOURNAMENTWINNER") {
      var inputs = CPULedge(_main.player[i], i);
      //do inputs
      _input.aiInputBank[i][0].lsX = isNaN(inputs.lsX) ? 0 : inputs.lsX;
      _input.aiInputBank[i][0].lsY = isNaN(inputs.lsY) ? 0 : inputs.lsY;
      _input.aiInputBank[i][0].x = inputs.x;
      _input.aiInputBank[i][0].b = inputs.b;
      _input.aiInputBank[i][0].l = inputs.l;
      _input.aiInputBank[i][0].csX = isNaN(inputs.csX) ? 0 : inputs.csX;
      _input.aiInputBank[i][0].csY = isNaN(inputs.csY) ? 0 : inputs.csY;
      _input.aiInputBank[i][0].a = inputs.a;
      if (_input.aiInputBank[i][0].l) {
        _input.aiInputBank[i][0].lA = 1;
      }
      return;
    }
  }
  if (_input.aiInputBank[i][0].l) {
    _input.aiInputBank[i][0].lA = 1;
  }
  if (pdiff > 1) {
    var distx = _main.player[i].phys.pos.x - _main.player[nearest].phys.pos.x;
    var disty = py - _main.player[nearest].phys.pos.y;
    if (_main.player[i].currentAction == "NONE" && _main.player[i].currentSubaction == "NONE" && (paction == "WAIT" || paction == "OTTOTTOWAIT" || paction == "WALK")) {
      //walk towards enemy
      if (Math.abs(distx) >= 23 && (_main.player[nearest].phys.grounded || isAboveGround(_main.player[nearest].phys.pos.x, _main.player[nearest].phys.pos.y)[0])) {
        _input.aiInputBank[i][0].lsX = 0.75 * (-1.0 * Math.sign(distx));
      }
    }
    //console.log(player[i].currentAction);
  }
  //run character specific stuff
  var ais = [marthAI, jiggsAI, foxAI, falcoAI, falconAI];
  ais[_main.characterSelections[i]](i); //calls that character's AI.
}
function marthAI(i) {
  var paction = _main.player[i].actionState;
  var px = _main.player[i].phys.pos.x;
  var py = _main.player[i].phys.pos.y;
  var pcyx = _main.player[i].phys.cVel.x;
  var pcyy = _main.player[i].phys.cVel.y;
  var pdiff = _main.player[i].difficulty;
  var aerialAttacks = ["ATTACKAIRN", "ATTACKAIRF", "ATTACKAIRB", "ATTACKAIRU", "ATTACKAIRD"];
  var idleActions = ["WAIT", "OTTOTTOWAIT", "WALK", "LANDING"];
  //const tilts = ["DOWNTILT","UTILT","FTILT","JAB1"];
  var groundAttacks = ["DOWNTILT", "UTILT", "FTILT", "JAB1", "JAB2", "JAB3", "FSMASH", "DSMASH", "USMASH", "ATTACKDASH"];
  var ptimer = _main.player[i].timer;
  var pgrounded = _main.player[i].phys.grounded;
  if (_main.player[i].currentAction == "LEDGESTALL") {
    _input.aiInputBank[i][0].lsX = 0.0;
    if (_main.player[i].currentSubaction == "FALL") {
      if (ptimer == 7) {
        //aiInputBank[i][0].lsY = -1.0;
        _input.aiInputBank[i][0].lsY = -1.0;
        _input.aiInputBank[i][0].x = 1.0;
        _main.player[i].currentSubaction = "GRAB";
      } else {
        _input.aiInputBank[i][0].lsY = -1.0;
      }
      return;
    } else if (_main.player[i].currentSubaction == "GRAB") {
      _input.aiInputBank[i][0].lsX = 0.0;
      if (paction.substr(0, 4) == "CLIFF" && paction == "CLIFFCATCH") {
        //end of action
        _main.player[i].currentAction = "NONE";
        _main.player[i].currentSubaction = "NONE";
      }
      return;
    }
  }
  var nearest = NearestEnemy(_main.player[i], i);
  if (_main.player[i].currentAction == "NONE") {
    var distx = px - _main.player[nearest].phys.pos.x;
    var disty = py - _main.player[nearest].phys.pos.y;
  }
  if (pdiff >= 2 && _main.player[i].currentAction == "NONE") {
    if (pgrounded && (paction == "WAIT" || pgrounded && _settings.gameSettings.turbo && _main.player[i].hasHit && Math.floor(Math.random() * 10 + 1) >= 8 - 2 * pdiff) && Math.abs(distx) > 15 || pdiff > 0 && _main.player[i].hasHit && _settings.gameSettings.turbo && pgrounded || paction == "WAIT" || paction == "LANDING" && ptimer > 3) {
      //smash turn to face enemy
      if (!(_main.player[i].phys.face == -1.0 * Math.sign(distx))) {
        _main.player[i].currentAction = "SMASHTURN";
        _input.aiInputBank[i][0].lsX = -1.0 * _main.player[i].phys.face;
        return;
      } else {
        if (_main.player[i].currentAction == "NONE" && ["WAIT", "WALK", "OTTOTTOWAIT", "LANDING"].indexOf(paction) != -1 && _main.player[nearest].phys.hurtBoxState == 0) {
          if (Math.abs(distx) < 23 && Math.abs(disty) < 15) {
            var randomSeed = Math.floor(Math.random() * 100 + 1);
            if (randomSeed <= 10) {
              //grab
              _input.aiInputBank[i][0].z = true;
              /*
              player[i].inputs.l[0] = true;
              player[i].inputs.lAnalog[0] = 1;
              player[i].inputs.a = true;
              */
            } else if (randomSeed <= 25) {
              //tilt
              var randomSeed1 = Math.floor(Math.random() * 100 + 1);
              if (randomSeed1 <= 25) {
                //f-tilt
                _input.aiInputBank[i][0].lsX = 0.50;
              } else if (randomSeed1 <= 50) {
                //d-tilt
                _input.aiInputBank[i][0].lsY = -0.50;
              } else if (randomSeed1 <= 75) {
                //up-tilt
                if (_main.characterSelections[i] == 1 || _main.characterSelections[i] == 2) {
                  if (!(1.0 * Math.sign(distx) == _main.player[i].phys.face)) {
                    _main.player[i].currentAction = "REVERSEUPTILT";
                    _main.player[i].currentSubaction = "REVERSE";
                    return;
                  } else {
                    _input.aiInputBank[i][0].lsY = 0.50;
                    _input.aiInputBank[i][0].a = true;
                  }
                } else {
                  //console.log(Math.sign(distx),":",player[i].phys.face)
                  _input.aiInputBank[i][0].lsY = 0.50;
                  _input.aiInputBank[i][0].a = true;
                }
              }
              _input.aiInputBank[i][0].a = true;
              return;
            }
            /* else if (randomSeed <= 20) {//shield
            player[i].inputs.l[0] = true;
            player[i].inputs.lAnalog[0] = 1;
            } */
          }
        }
      }
    }
  }
  if (pdiff >= 3) {
    if (_main.player[nearest].phys.hurtBoxState == 0) {
      if (["WAIT", "OTTOTTOWAIT", "WALK", "DASH", "RUN"].indexOf(paction) != -1) {
        if (Math.abs(py - _main.player[nearest].phys.pos.y) <= 3) {
          if (_main.player[i].phys.face == -1.0 * Math.sign(distx)) {
            var randomSeed = Math.floor(Math.random() * 100 + 1);
            if (randomSeed <= 40) {
              if (isEnemyApproaching(_main.player[i], _main.player[nearest]) || _main.player[nearest].actionState.substr(0, 5) == "GUARD") {
                if (Math.abs(px - _main.player[nearest].phys.pos.x) <= 20) {
                  _input.aiInputBank[i][0].l = true;
                  _input.aiInputBank[i][0].lA = 1.0;
                  _input.aiInputBank[i][0].a = true;
                }
              } else if (randomSeed <= 25 && Math.abs(px - _main.player[nearest].phys.pos.x) < 12.5 && ["DOWNBOUND", "DOWNSTANDF", "DOWNSTANDB", "DOWNSTANDN"].indexOf(paction) == -1) {
                _input.aiInputBank[i][0].l = true;
                _input.aiInputBank[i][0].lA = 1.0;
                _input.aiInputBank[i][0].a = true;
              }
            }
          }
        }
      }
    }
  }
}

function jiggsAI(i) {
  var paction = _main.player[i].actionState;
  var px = _main.player[i].phys.pos.x;
  var py = _main.player[i].phys.pos.y;
  var pcyx = _main.player[i].phys.cVel.x;
  var pcyy = _main.player[i].phys.cVel.y;
  var pdiff = _main.player[i].difficulty;
  var aerialAttacks = ["ATTACKAIRN", "ATTACKAIRF", "ATTACKAIRB", "ATTACKAIRU", "ATTACKAIRD"];
  var idleActions = ["WAIT", "OTTOTTOWAIT", "WALK", "LANDING"];
  //const tilts = ["DOWNTILT","UTILT","FTILT","JAB1"];
  var groundAttacks = ["DOWNTILT", "UTILT", "FTILT", "JAB1", "JAB2", "JAB3", "FSMASH", "DSMASH", "USMASH", "ATTACKDASH"];
  var ptimer = _main.player[i].timer;
  var pgrounded = _main.player[i].phys.grounded;
  var nearest = NearestEnemy(_main.player[i], i);
  if (_main.player[i].currentAction == "NONE") {
    var distx = px - _main.player[nearest].phys.pos.x;
    var disty = py - _main.player[nearest].phys.pos.y;

    if (pdiff >= 2 && _main.player[i].currentAction == "NONE") {
      if (pgrounded && (paction == "WAIT" || pgrounded && _settings.gameSettings.turbo && _main.player[i].hasHit && Math.floor(Math.random() * 10 + 1) >= 8 - 2 * pdiff) && Math.abs(distx) > 15 || pdiff > 0 && _main.player[i].hasHit && _settings.gameSettings.turbo && pgrounded || paction == "WAIT" || paction == "LANDING" && ptimer > 3) {
        //smash turn to face enemy
        if (!(_main.player[i].phys.face == -1.0 * Math.sign(distx))) {
          _main.player[i].currentAction = "SMASHTURN";
          _input.aiInputBank[i][0].lsX = -1.0 * _main.player[i].phys.face;
          return;
        } else {
          if (_main.characterSelections[i] == 2 && Math.abs(distx) > 80 && Math.abs(disty) < 15) {
            //is fox
            var randomSeed = Math.floor(Math.random() * 10 + 1);
            if (randomSeed == 1) {
              _main.player[i].currentAction = "SHDL";
              _main.player[i].currentSubaction = "LASER1";
            }
          }
          if (_main.player[i].currentAction == "NONE") {
            if (Math.abs(distx) < 23 && Math.abs(disty) < 15) {
              var randomSeed = Math.floor(Math.random() * 100 + 1);
              if (randomSeed <= 10) {
                //grab
                _input.aiInputBank[i][0].z = true;
                /*
                player[i].inputs.l[0] = true;
                player[i].inputs.lAnalog[0] = 1;
                player[i].inputs.a = true;
                */
              } else if (randomSeed <= 25) {
                //tilt
                var randomSeed1 = Math.floor(Math.random() * 100 + 1);
                if (randomSeed1 <= 25) {
                  //f-tilt
                  _input.aiInputBank[i][0].lsX = 0.50;
                } else if (randomSeed1 <= 50) {
                  //d-tilt
                  _input.aiInputBank[i][0].lsY = -0.50;
                } else if (randomSeed1 <= 75) {
                  //up-tilt
                  if (_main.characterSelections[i] == 1 || _main.characterSelections[i] == 2) {
                    if (!(1.0 * Math.sign(distx) == _main.player[i].phys.face)) {
                      _main.player[i].currentAction = "REVERSEUPTILT";
                      _main.player[i].currentSubaction = "REVERSE";
                      return;
                    } else {
                      _input.aiInputBank[i][0].lsY = 0.50;
                      _input.aiInputBank[i][0].a = true;
                    }
                  } else {
                    //console.log(Math.sign(distx),":",player[i].phys.face)
                    _input.aiInputBank[i][0].lsY = 0.50;
                    _input.aiInputBank[i][0].a = true;
                  }
                }
                _input.aiInputBank[i][0].a = true;
                return;
              }
              /* else if (randomSeed <= 20) {//shield
              player[i].inputs.l[0] = true;
              player[i].inputs.lAnalog[0] = 1;
              } */
            }
          }
        }
      }
    }
  }
  if (pdiff >= 3) {
    if (_main.player[nearest].phys.hurtBoxState == 0) {
      if (["WAIT", "OTTOTTOWAIT", "WALK", "DASH", "RUN"].indexOf(paction) != -1) {
        if (Math.abs(py - _main.player[nearest].phys.pos.y) <= 3) {
          if (_main.player[i].phys.face == -1.0 * Math.sign(distx)) {
            var randomSeed = Math.floor(Math.random() * 100 + 1);
            if (randomSeed <= 30) {
              if (isEnemyApproaching(_main.player[i], _main.player[nearest]) || _main.player[nearest].actionState.substr(0, 5) == "GUARD") {
                if (Math.abs(px - _main.player[nearest].phys.pos.x) <= 13) {
                  _input.aiInputBank[i][0].l = true;
                  _input.aiInputBank[i][0].lA = 1.0;
                  _input.aiInputBank[i][0].a = true;
                }
              } else if (randomSeed <= 20 && Math.abs(px - _main.player[nearest].phys.pos.x) < 8 && ["DOWNBOUND", "DOWNSTANDF", "DOWNSTANDB", "DOWNSTANDN"].indexOf(paction) == -1) {
                _input.aiInputBank[i][0].l = true;
                _input.aiInputBank[i][0].lA = 1.0;
                _input.aiInputBank[i][0].a = true;
              }
            }
          }
        }
      }
    }
  }
}

function foxAI(i) {
  var paction = _main.player[i].actionState;
  var px = _main.player[i].phys.pos.x;
  var py = _main.player[i].phys.pos.y;
  var pcyx = _main.player[i].phys.cVel.x;
  var pcyy = _main.player[i].phys.cVel.y;
  var pdiff = _main.player[i].difficulty;
  var aerialAttacks = ["ATTACKAIRN", "ATTACKAIRF", "ATTACKAIRB", "ATTACKAIRU", "ATTACKAIRD"];
  var idleActions = ["WAIT", "OTTOTTOWAIT", "WALK", "LANDING"];
  //const tilts = ["DOWNTILT","UTILT","FTILT","JAB1"];
  var groundAttacks = ["DOWNTILT", "UTILT", "FTILT", "JAB1", "JAB2", "JAB3", "FSMASH", "DSMASH", "USMASH", "ATTACKDASH"];
  var ptimer = _main.player[i].timer;
  var pgrounded = _main.player[i].phys.grounded;
  if (_main.player[i].currentAction == "LEDGESTALL") {
    _input.aiInputBank[i][0].lsX = 0.0;
    if (_main.player[i].currentSubaction == "FALL") {
      if (ptimer == 1) {
        //player[i].inputs.lStickAxis[0].y = -1.0;
        _input.aiInputBank[i][0].lsY = 1.0;
        _input.aiInputBank[i][0].b = true;
        _main.player[i].currentSubaction = "GRAB";
      } else {
        _input.aiInputBank[i][0].lsY = -1.0;
      }
      return;
    } else if (_main.player[i].currentSubaction == "GRAB") {
      _input.aiInputBank[i][0].lsX = 0.0;
      if (paction.substr(0, 4) == "CLIFF") {
        //end of action
        _main.player[i].currentAction = "NONE";
        _main.player[i].currentSubaction = "NONE";
      }
      return;
    }
  }
  var isDead = false;
  var deadDude = "NONE";
  for (var aa = 0; aa < 4; aa++) {
    if (_main.playerType[aa] != -1 && !(i == aa)) {
      if (_main.player[aa].actionState.substr(0, 4) == "DEAD" || _main.player[aa].actionState.substr(0, 7) == "REBIRTH") {
        //"DEADDOWN","REBIRTH","REBIRTHWAIT"]) {
        isDead = true;
        deadDude = aa;
      } else {
        //console.log(player[aa].actionState);
      }
    }
  }
  if (isDead) {
    if (_main.player[i].currentSubaction == "NONE" && _main.player[i].currentAction == "NONE" && pgrounded && pdiff >= 3) {
      //can do it
      _main.player[i].currentAction = "RESPAWNMULTISHINE";
      _main.player[i].currentSubaction = "SHINE";
      return;
    }
  }
  if (_main.player[i].currentAction == "SHIELDMULTISHINE") {
    if (_main.player[nearest].actionState.substr(0, 4) != "GUAR" || ["WAIT", "KNEEBEND", "JUMPF", "DOWNSPECIALGROUND", "DOWNSPECIALAIR"].indexOf(paction) || Math.abs(px - _main.player[nearest].phys.pos.x) >= 15) {
      //end MULTISHINE
      _main.player[i].currentAction = "NONE";
      _main.player[i].currentSubaction = "NONE";
    }
  }
  if (_main.player[i].currentAction == "RESPAWNMULTISHINE") {
    if (_main.player[i].currentSubaction == "NONE") {
      if (!isDead) {
        //should finish multishining
        _main.player[i].currentAction = "NONE";
      } else {
        _main.player[i].currentSubaction = "JUMP";
      }
    }
    if (["DOWNSPECIALGROUND", "DOWNSPECIALAIR", "KNEEBEND", "JUMPF", "JUMPB", "WAIT", "WALK", "WALKF", "OTTOTTOWAIT"].indexOf(paction) == -1.0) {
      _main.player[i].currentAction = "NONE";
      _main.player[i].currentSubaction = "NONE";
    }
    if (_main.player[i].currentSubaction == "SHINE") {
      _input.aiInputBank[i][0].lsY = -1.0;
      _input.aiInputBank[i][0].b = true;
      _main.player[i].currentSubaction = "JUMP";
    } else if (_main.player[i].currentSubaction == "JUMP") {
      _input.aiInputBank[i][0].b = true;
      if (ptimer == 3 && paction == "DOWNSPECIALGROUND" || ptimer == 6 && paction == "DOWNSPECIALGROUND") {
        _input.aiInputBank[i][0].x = true;
        _main.player[i].currentSubaction = "SHINE2";
      }
    } else if (_main.player[i].currentSubaction == "SHINE2") {
      if (paction == "KNEEBEND" && ptimer == 3) {
        _input.aiInputBank[i][0].lsY = -1.0;
        _input.aiInputBank[i][0].b = true;
        _main.player[i].currentSubaction = "NONE";
      }
    }
    if (_main.player[i].currentAction == "RESPAWNMULTISHINE") {
      return;
    }
    if (_main.player[i].currentSubaction in ["LASER1", "LASER2", "REVERSE"]) {
      if (_main.player[i].hit.hitstun >= 0) {
        _main.player[i].currentSubaction = "NONE";
      }
    }
  }
  var nearest = NearestEnemy(_main.player[i], i);
  if (_main.player[i].currentAction == "NONE") {
    var distx = px - _main.player[nearest].phys.pos.x;
    var disty = py - _main.player[nearest].phys.pos.y;
    if (pdiff >= 2 && _main.player[i].currentAction == "NONE") {
      if (pgrounded && (paction == "WAIT" || pgrounded && _settings.gameSettings.turbo && _main.player[i].hasHit && Math.floor(Math.random() * 10 + 1) >= 8 - 2 * pdiff) && Math.abs(distx) > 15 || pdiff > 0 && _main.player[i].hasHit && _settings.gameSettings.turbo && pgrounded || paction == "WAIT" || paction == "LANDING" && ptimer > 3) {
        //smash turn to face enemy
        if (!(_main.player[i].phys.face == -1.0 * Math.sign(distx))) {
          _main.player[i].currentAction = "SMASHTURN";
          _input.aiInputBank[i][0].lsX = -1.0 * _main.player[i].phys.face;
          return;
        } else {
          if (_main.characterSelections[i] == 2 && Math.abs(distx) > 80 && Math.abs(disty) < 15) {
            //is fox
            var randomSeed = Math.floor(Math.random() * 10 + 1);
            if (randomSeed == 1) {
              _main.player[i].currentAction = "SHDL";
              _main.player[i].currentSubaction = "LASER1";
            }
          }
          if (_main.player[i].currentAction == "NONE") {
            if (Math.abs(distx) < 23 && Math.abs(disty) < 15) {
              var randomSeed = Math.floor(Math.random() * 100 + 1);
              if (randomSeed <= 10) {
                //grab
                _input.aiInputBank[i][0].z = true;
              } else if (randomSeed <= 25) {
                //tilt
                var randomSeed1 = Math.floor(Math.random() * 100 + 1);
                if (randomSeed1 <= 25) {
                  //f-tilt
                  _input.aiInputBank[i][0].lsX = 0.50;
                } else if (randomSeed1 <= 50) {
                  //d-tilt
                  _input.aiInputBank[i][0].lsY = -0.50;
                } else if (randomSeed1 <= 75) {
                  //up-tilt
                  if (_main.characterSelections[i] == 1 || _main.characterSelections[i] == 2) {
                    if (!(1.0 * Math.sign(distx) == _main.player[i].phys.face)) {
                      _main.player[i].currentAction = "REVERSEUPTILT";
                      _main.player[i].currentSubaction = "REVERSE";
                      return;
                    } else {
                      _input.aiInputBank[i][0].lsY = 0.50;
                      _input.aiInputBank[i][0].a = true;
                    }
                  } else {
                    //console.log(Math.sign(distx),":",player[i].phys.face)
                    _input.aiInputBank[i][0].lsY = 0.50;
                    _input.aiInputBank[i][0].a = true;
                  }
                }
                _input.aiInputBank[i][0].a = true;
                return;
              }
            }
          }
        }
      }
    }
  }
  if (pdiff >= 3) {
    if (_main.player[nearest].phys.hurtBoxState == 0) {
      if (["WAIT", "OTTOTTOWAIT", "WALK", "DASH", "RUN"].indexOf(paction) != -1) {
        if (Math.abs(py - _main.player[nearest].phys.pos.y) <= 3) {
          if (_main.player[i].phys.face == -1.0 * Math.sign(distx)) {
            var randomSeed = Math.floor(Math.random() * 100 + 1);
            if (randomSeed <= 30) {
              if (isEnemyApproaching(_main.player[i], _main.player[nearest]) || _main.player[nearest].actionState.substr(0, 5) == "GUARD") {
                if (Math.abs(px - _main.player[nearest].phys.pos.x) <= 12) {
                  _input.aiInputBank[i][0].l = true;
                  _input.aiInputBank[i][0].lA = 1.0;
                  _input.aiInputBank[i][0].a = true;
                }
              } else if (randomSeed <= 20 && Math.abs(px - _main.player[nearest].phys.pos.x) < 8 && ["DOWNBOUND", "DOWNSTANDF", "DOWNSTANDB", "DOWNSTANDN"].indexOf(paction) == -1) {
                _input.aiInputBank[i][0].l = true;
                _input.aiInputBank[i][0].lA = 1.0;
                _input.aiInputBank[i][0].a = true;
              }
            }
          }
        }
      }
    }
  }
  if (_main.player[i].currentAction == "SHDL") {
    var inputs = CPUSHDL(_main.player[i], i);
    _input.aiInputBank[i][0].x = inputs.x;
    _input.aiInputBank[i][0].b = inputs.b;
  }
}

function falcoAI(i) {}
function falconAI(i) {}

function runAI(i) {
  generalAI(i); //calls general AI
  //console.log(player[i].difficulty);
  //These are the player Inputs
}

function isEnemyApproaching(cpu, player) {
  if (Math.abs(cpu.phys.pos.x - (player.phys.pos.x + player.phys.cVel.x)) < Math.abs(cpu.phys.pos.x - player.phys.pos.x)) {
    return true;
  } else {
    return false;
  }
}

function NearestLedge(cpu) {
  var closest = [0, 10000]; //used to measure which ledge is closer
  for (var i = 0; i < _activeStage.activeStage.ledgePos.length; i++) {
    var closeness = Math.abs(cpu.phys.pos.x - _activeStage.activeStage.ledgePos[i].x) + Math.abs(cpu.phys.pos.y - _activeStage.activeStage.ledgePos[i].y); //distance from ledge
    if (closeness < closest[1]) {
      //if closer to that ledge than others, update closest.
      closest = [i, closeness];
    }
  }
  //closestIndex = closest[0];
  closest = _activeStage.activeStage.ledgePos[closest[0]]; //updates closest to instead be the closest ledge.
  return closest;
}

function NearestFloor(cpu) {
  // for each platform
  var nearestDist = 1000;
  var nearestY = -1000;
  for (var i = 0; i < _activeStage.activeStage.platform.length; i++) {
    // if cpu is above platform
    if (cpu.phys.pos.y > _activeStage.activeStage.platform[i][0].y && cpu.phys.pos.x >= _activeStage.activeStage.platform[i][0].x && cpu.phys.pos.x <= _activeStage.activeStage.platform[i][1].x) {
      if (cpu.phys.pos.y - _activeStage.activeStage.platform[i][0].y < nearestDist) {
        nearestDist = cpu.phys.pos.y - _activeStage.activeStage.platform[i][0].y;
        nearestY = _activeStage.activeStage.platform[i][0].y;
      }
    }
  }
  for (var i = 0; i < _activeStage.activeStage.ground.length; i++) {
    // if cpu is above platform
    if (cpu.phys.pos.y > _activeStage.activeStage.ground[i][0].y && cpu.phys.pos.x >= _activeStage.activeStage.ground[i][0].x && cpu.phys.pos.x <= _activeStage.activeStage.ground[i][1].x) {
      if (cpu.phys.pos.y - _activeStage.activeStage.ground[i][0].y < nearestDist) {
        nearestDist = cpu.phys.pos.y - _activeStage.activeStage.ground[i][0].y;
        nearestY = _activeStage.activeStage.ground[i][0].y;
      }
    }
  }
  return nearestY;
}

function isAboveGround(x, y) {
  var returnValue = [false, "none", 0];
  var closest = 1000;
  var dist = void 0;
  for (var i = 0; i < _activeStage.activeStage.ground.length; i++) {
    if (x >= _activeStage.activeStage.ground[i][0].x && x <= _activeStage.activeStage.ground[i][1].x && y >= _activeStage.activeStage.ground[i][0].y) {
      dist = y - _activeStage.activeStage.ground[i][0].y;
      if (dist < closest) {
        closest = dist;
        returnValue = [true, "ground", _activeStage.activeStage.ground[i][0].y];
      }
    }
  }
  for (var i = 0; i < _activeStage.activeStage.platform.length; i++) {
    if (x >= _activeStage.activeStage.platform[i][0].x && x <= _activeStage.activeStage.platform[i][1].x && y >= _activeStage.activeStage.platform[i][0].y) {
      dist = y - _activeStage.activeStage.platform[i][0].y;
      if (dist < closest) {
        closest = dist;
        returnValue = [true, "platform", _activeStage.activeStage.platform[i][0].y];
      }
    }
  }
  return returnValue;
}

window.isOffstage = function (cpu) {
  // if on a ledge
  if (cpu.phys.onLedge > -1) {
    return false;
  }
  if (!cpu.phys.grounded) {
    for (var i = 0; i < _activeStage.activeStage.ground.length; i++) {
      if (cpu.phys.pos.x >= _activeStage.activeStage.ground[i][0].x && cpu.phys.pos.x <= _activeStage.activeStage.ground[i][1].x && cpu.phys.ECBp[0].y >= _activeStage.activeStage.ground[i][0].y) {
        return false;
      }
    }
    for (var i = 0; i < _activeStage.activeStage.platform.length; i++) {
      if (cpu.phys.pos.x >= _activeStage.activeStage.platform[i][0].x && cpu.phys.pos.x <= _activeStage.activeStage.platform[i][1].x && cpu.phys.ECBp[0].y >= _activeStage.activeStage.platform[i][0].y) {
        return false;
      }
    }
  }
  return true;
};
function CPUSHDL(cpu, p) {
  var returnInput = {
    x: false,
    b: false
  };
  if (cpu.actionState == "WAIT" || cpu.actionState == "DASH" || cpu.actionState == "LANDING" && cpu.timer > 3) {
    //jump
    returnInput.x = true;
  } else if (cpu.actionState == "KNEEBEND" && cpu.timer >= 3) {
    returnInput.b = true;
    cpu.currentSubaction = "LASER2";
  } else {
    if (cpu.timer == 10) {
      returnInput.b = true;
      cpu.currentSubaction = "NONE";
      cpu.currentAction = "NONE";
    }
  }
  return returnInput;
}
function CPUTech(cpu, p) {
  var returnInput = {
    lsX: 0.0,
    l: false,
    lAnalog: 0.0
  };
  //console.log("1");
  //console.log("pos" , cpu.phys.pos.y);
  //console.log("nearest" , NearestFloor(cpu));
  if (cpu.phys.pos.y - NearestFloor(cpu) <= 3 && cpu.phys.kVel.y + cpu.phys.cVel.y <= 0) {
    //console.log("trying to tech");
    var MissedTechPercent = 85 - cpu.difficulty * 20; //how often the CPU miss techs. difficulty: {1: 65%,2: 45%,3: 25%,4: 5%}
    var randomSeed = Math.floor(Math.random() * (100 + MissedTechPercent) + 1);
    if (randomSeed <= 34) {
      //inplace
      returnInput.lsX = 0.0;
      returnInput.l = true;
      returnInput.lA = 1.0;
      //console.log("techinplace");
    } else if (randomSeed <= 67) {
      //roll left
      returnInput.l = true;
      returnInput.lsX = -1.0;
      returnInput.lA = 1.0;
      //console.log("techrollleft");
    } else if (randomSeed <= 100) {
      //roll right
      returnInput.l = true;
      returnInput.lsX = 1.0;
      returnInput.lA = 1.0;
      //console.log("techrollright");
    } //otherwise miss tech
    //console.log("4");
  }
  return returnInput;
}
function CPUMissedTech(cpu, p) {
  var returnInput = {
    lsX: 0.0,
    lsY: 0.0,
    a: false
  };
  //console.log(randomSeed);
  var randomSeed = Math.floor(Math.random() * 10 + 1);
  //console.log(randomSeed);
  //console.log("2");
  if (randomSeed <= 2) {
    //getup attack
    returnInput.a = true;
    //returnInput.lstickX = -1.0;
  } else if (randomSeed <= 4) {
    //roll
    var randomSeeds = Math.floor(Math.random() * 2 + 1);
    if (randomSeeds == 1) {
      //left
      returnInput.lsX = -1.0;
    } else {
      //right
      returnInput.lsX = 1.0;
    }
  } else if (randomSeed <= 6) {
    //getup
    returnInput.lsY = 1.0;
  } //else do nothing
  //console.log("3");
  return returnInput;
}
function CPUWaveshineAny(cpu, p) {
  var returnInput = {
    lsX: 0.0,
    lsY: 0.0,
    x: false,
    b: false,
    l: false
  };

  if (cpu.actionState == "WAIT") {
    returnInput.lsY = -1.0;
    returnInput.b = true;
  }
  if (cpu.actionState == "DOWNSPECIALGROUND") {
    if (cpu.timer == 4) {
      returnInput.x = true;
    }
  } else if (cpu.actionState == "KNEEBEND" && cpu.timer == 3) {
    var randomSeed = Math.floor(Math.random() * 3 + 1);
    if (randomSeed == 1) {
      //foward
      returnInput.lsX = cpu.phys.face * 0.75;
      returnInput.lsY = -1.0;
      returnInput.l = true;
      cpu.currentAction = "NONE";
    } else if (randomSeed == 2) {
      //in place
      returnInput.lsX = 0;
      returnInput.lsY = -1.0;
      returnInput.l = true;
      cpu.currentAction = "NONE";
    } else {
      //backwards
      returnInput.lsX = cpu.phys.face * -0.75;
      returnInput.lsY = -1.0;
      returnInput.l = true;
      cpu.currentAction = "NONE";
    }
  }
  return returnInput;
}
function CPUGrabRelease(cpu, p) {
  var returnInput = {
    lsX: 0.0,
    lsY: 0.0,
    x: false,
    b: false,
    l: false,
    csX: 0.0,
    csY: 0.0,
    a: false
  };
  if (cpu.actionState == "WAIT" || cpu.actionState == "CAPTURECUT") {
    if (_main.characterSelections[p] == 2) {
      //is fox
      var randomSeed = Math.floor(Math.random() * 125 + 1);
      if (randomSeed < 4) {
        //waveshine
        returnInput.b = true;
        returnInput.lsY = -1.0;
        cpu.currentAction = "WAVESHINEANY";
        return returnInput;
      } else if (randomSeed < 45) {
        //jab
        returnInput.a = true;
        //cpu.currentAction = "NONE";
      } else if (randomSeed == 85) {
        //roll
        returnInput.l = true;
        var randomSeed1 = Math.floor(Math.random() * 3 + 1);
        if (randomSeed1 == 1) {
          returnInput.csX = 1.0;
        } else if (randomSeed1 == 2) {
          returnInput.csY = -1.0;
        } else {
          returnInput.csX = -1.0;
        }
        //cpu.currentAction = "NONE";
      } else if (randomSeed <= 125) {
        //jump
        returnInput.x = true;
        //cpu.currentAction = "NONE";
      }
    } else {
      //all other characters
      var randomSeed = Math.floor(Math.random() * 5 + 1);
      if (randomSeed == 1) {
        //f-smash
        returnInput.csX = cpu.phys.face;
        //cpu.currentAction = "NONE";
      } else if (randomSeed == 2) {
        //jab
        returnInput.a = true;
        //cpu.currentAction = "NONE";
      } else if (randomSeed == 3) {
        //roll
        returnInput.l = true;
        var randomSeed1 = Math.floor(Math.random() * 3 + 1);
        if (randomSeed1 == 1) {
          returnInput.csX = 1.0;
        } else if (randomSeed1 == 2) {
          returnInput.csY = -1.0;
        } else {
          returnInput.csX = -1.0;
        }
        //cpu.currentAction = "NONE";
      } else if (randomSeed == 4) {
        //jump
        returnInput.x = true;
        //cpu.currentAction = "NONE";
      }
    }
  }
  return returnInput;
}

function CPUSDItoStage(cpu, p) {
  var closest = NearestLedge(cpu);
  var returnInput = {
    lsX: 0.0,
    lsY: 0.0
  };
  if (cpu.timer % 2 == 0) {
    var theta = Math.atan((closest.y - 3.5 - cpu.phys.pos.y) / (closest.x - cpu.phys.pos.x)) + imperfection; //some trig to get angles //(cpu.phys.ledgeSnapBoxF.max.y-cpu.phys.ledgeSnapBoxF.min.y)/2
    var newX = Math.cos(theta); //* Math.sqrt(2);
    var newY = Math.sin(theta); //* Math.sqrt(2);
    if (closest.x < cpu.phys.pos.x) {
      newX *= -1;
      newY *= -1;
    }
    // dont go past 1.0 or -1.0
    newX = Math.sign(newX) * Math.min(1.0, Math.abs(newX));
    newY = Math.sign(newY) * Math.min(1.0, Math.abs(newY));

    returnInput.lsX = newX;
    returnInput.lsY = newY;
  } else {
    var imperfection = 0;
    var theta = Math.atan((closest.y - 3.5 - cpu.phys.pos.y) / (closest.x - cpu.phys.pos.x)) + imperfection; //some trig to get angles //(cpu.phys.ledgeSnapBoxF.max.y-cpu.phys.ledgeSnapBoxF.min.y)/2
    theta = theta + 0.25 * ((Math.floor(Math.random() * 2 + 1) - 1) * -1.0) * Math.PI;
    var newX = Math.cos(theta); //* Math.sqrt(2);
    var newY = Math.sin(theta); //* Math.sqrt(2);
    if (closest.x < cpu.phys.pos.x) {
      newX *= -1;
      newY *= -1;
    }
    // dont go past 1.0 or -1.0
    newX = Math.sign(newX) * Math.min(1.0, Math.abs(newX));
    newY = Math.sign(newY) * Math.min(1.0, Math.abs(newY));

    returnInput.lsX = newX;
    returnInput.lsY = newY;
  }
  return returnInput;
}

function CPUShield(cpu, p) {
  var returnInput = {
    lsX: 0.0,
    lsY: 0.0,
    x: false,
    b: false,
    a: false,
    l: true,
    csX: 0.0,
    csY: 0.0
  };
  var shouldDoSomething = false;
  var doSomethingChance = Math.min(100, 25 * Math.tan(Math.PI / 121 * (60 - cpu.phys.shieldHP)));
  //console.log(doSomethingChance);
  var randomSeed = Math.floor(Math.random() * 100 + 1);
  if (randomSeed <= doSomethingChance) {
    //do something
    returnInput.l = false;
    var extra = Math.max(0, 15 - cpu.difficulty);
    var randomSeed = Math.floor(Math.random() * 30 + 1) + extra;
    if (randomSeed <= 30) {
      //jump or shield drop
      if (isAboveGround(cpu.phys.pos.x, cpu.phys.pos.x)[1] == "platform" && cpu.difficulty >= 3) {
        //can shield drop
        var randomSeed = Math.floor(Math.random() * 2 + 1) + extra;
        if (randomSeed != 1) {
          //shield drop
          returnInput.lsY = -0.66;
          cpu.currentAction = "NONE";
        } else {
          returnInput.x = true;
          cpu.currentAction = "NONE";
        }
      } else {
        returnInput.x = true;
        cpu.currentAction = "NONE";
      }
    }
  }

  return returnInput;
}
function CPULedge(cpu, p) {
  //var returnInput = [0.0,0.0,false,false,0.0,0.0,0.0,false];
  var returnInput = {
    lsX: 0.0,
    lsY: 0.0,
    x: false,
    b: false,
    l: false,
    csX: 0.0,
    csY: 0.0,
    a: false
  }; //lsX,lsY,x,b,Lanalog,cStickX,cStickY,A
  if (cpu.actionState == "LANDINGFALLSPECIAL" && cpu.currentAction == "LEDGEDASH") {
    cpu.currentAction = "NONE";
    return returnInput;
  } else if (cpu.currentAction == "TOURNAMENTWINNER") {
    if (cpu.actionState == "FALLAERIAL") {
      cpu.curentAction = "NONE";
    }
  }
  if (cpu.currentAction == "NONE") {
    var randomSeed = Math.floor(Math.random() * 30 + 1); //highest number of randomSeed can be increased or decrease to add artificial "difficulty level". Higher seeds = less difficulty
    //var randomSeed = 20;
    //var randomSeed = 16;
    if (randomSeed <= 3) {
      //normal getup
      cpu.currentAction = "LEDGEGETUP";
      returnInput.lsX = cpu.phys.face;
    } else if (randomSeed <= 5) {
      //getup roll
      cpu.currentAction = "LEDGEROLL";
      returnInput.l = true;
    } else if (randomSeed <= 8) {
      //getup attack
      cpu.currentAction = "LEDGEATTACK";
      returnInput.a = true;
    } else if (randomSeed <= 9) {
      //tournament winner
      cpu.currentAction = "TOURNAMENTWINNER";
      returnInput.lsY = 1.0;
      /*} else if (randomSeed <= 12) { //ledge jump
        cpu.currentAction = "LEDGEJUMP";
        returnInput.lsY = -1.0;
        returnInput.x = true;*/
      /*} else if (randomSeed <= 16) { //ledgedash
        if (player[p].difficulty >= 1) {
          //cpu.timer = 0;
          cpu.currentAction = "LEDGEDASH";
          returnInput.lsY = -1.0;
          returnInput.x = true;
        }*/
    } else if (randomSeed <= 20) {
      //ledgeairattack
      if (_main.player[p].difficulty > 1) {
        cpu.currentAction = "LEDGEAIRATTACK";
        returnInput.lsY = -1.0;
      }
    } else if (randomSeed <= 22) {
      //ledgestall
      if (_main.player[p].difficulty >= 1) {
        if (_main.characterSelections[p] != 1) {
          cpu.currentAction = "LEDGESTALL";
          cpu.currentSubaction = "FALL";
          returnInput.lsY = -1.0;
        }
      }
    } //else does nothing
  } else if (cpu.currentAction == "LEDGEDASH") {
    //fox waits 4 frames
    //jiggs waits 5 frames
    //marth waits 17 frames...
    if (_main.characterSelections[p] == 0) {
      //is marth
      //might be one frame too late or early on timing on my end. pls fix?
      //if (player[i].timer == 18) {
      //	console.log(1.0 * Math.sign(cpu.phys.face));
      //returnInput.lstickX = cpu.phys.face;
      //returnInput.lstickY = -1.0;
      //returnInput.l = true;	
      //}

      /*if (cpu.timer == 18) {//ledgedash?
      	returnInput.lstickX = cpu.phys.face;
      	returnInput.lstickY = -1.0;
      	returnInput.l = true;
      } else if (cpu.timer == 1 && cpu.actionState == "FALL") {
      	returnInput.x = true;
      	returnInput.lstickX = cpu.phys.face;
      } else {
      	returnInput.lstickX = cpu.phys.face;
      }
      return returnInput;
      */
      if (cpu.timer == 18) {
        returnInput.lsX = cpu.phys.face;
        returnInput.lsY = -1.0;
        returnInput.l = true;
      } else {
        returnInput.x = true;
        returnInput.lsX = cpu.phys.face;
      }
    } else if (_main.characterSelections[p] == 1) {
      //is jiggsc
      if (cpu.timer == 6 && cpu.actionState == "JUMPAERIAL1") {
        returnInput.lsX = cpu.phys.face;
        returnInput.lsY = -1.0;
        returnInput.l = true;
      } else {
        returnInput.x = true;
        returnInput.lsX = cpu.phys.face;
      }
    } else if (_main.characterSelections[p] == 2) {
      //is fox
      if (cpu.timer == 5) {
        returnInput.lsX = cpu.phys.face;
        returnInput.lsY = -1.0;
        returnInput.l = true;
      } else {
        returnInput.x = true;
        returnInput.lsX = cpu.phys.face;
      }
    }
  } else if (cpu.currentAction == "LEDGEJUMP") {
    if (cpu.phys.grounded) {
      returnInput.lsX = 0;
      cpu.currentAction = "NONE";
    } else {
      if (cpu.actionState == "FALL") {
        returnInput.x = true;
      }
      returnInput.lsX = cpu.phys.face; //moves forward?
    }
  } else if (cpu.currentAction == "LEDGEAIRATTACK") {
    if (_main.characterSelections[p] == 0) {
      //marth
      if (cpu.timer == 1) {
        returnInput.x = true; // jump
      } else if (cpu.timer == 3) {
        var randomSeed = Math.floor(Math.random() * 4 + 1); //aerial to chose
        returnInput.lsX = cpu.phys.face;
        if (randomSeed <= 2) {
          //fair
          returnInput.csX = cpu.phys.face;
        } else if (randomSeed == 3) {
          //nair
          returnInput.lsX = 0;
          returnInput.a = true;
        } else {
          //uair
          returnInput.csY = 1.0;
        }
        cpu.currentAction = "LEDGEAIRATTACK2";
      } else {
        returnInput.lsX = cpu.phys.face;
      }
    } else if (_main.characterSelections[p] == 1) {
      //puff
      if (cpu.timer == 1) {
        returnInput.x = true; //jump
      } else if (cpu.timer == 3) {
        var randomSeed = Math.floor(Math.random() * 4 + 1); //aerial to chose
        returnInput.lsX = cpu.phys.face;
        if (randomSeed <= 2) {
          //fair
          returnInput.csX = cpu.phys.face;
        } else if (randomSeed == 3) {
          //nair
          returnInput.lsX = 0;
          returnInput.a = true;
        } else {
          //uair
          returnInput.csY = 1.0;
        }
        cpu.currentAction = "LEDGEAIRATTACK2";
      } else {
        returnInput.lsX = cpu.phys.face;
      }
    } else if (_main.characterSelections[p] == 2) {
      //fox
      if (cpu.timer == 3) {
        returnInput.x = true; //jump
      } else if (cpu.timer == 6) {
        var randomSeed = Math.floor(Math.random() * 4 + 1); //aerial to chose
        returnInput.csX = 0.0;
        returnInput.a = false;
        returnInput.lsX = cpu.phys.face;
        if (randomSeed <= 2) {
          //nair
          returnInput.lsX = 0;
          returnInput.a = true;
        } else if (randomSeed == 3) {
          //dair
          returnInput.csY = -1.0;
        } else {
          //uair
          returnInput.csY = 1.0;
        }
        cpu.currentAction = "LEDGEAIRATTACK2";
      } else {
        returnInput.lsX = cpu.phys.face;
      }
    }
  } else if (cpu.currentAction == "LEDGEAIRATTACK2") {
    returnInput.lsX = cpu.phys.face;
    //l cancel
    if (cpu.actionState == "ATTACKAIRN" || cpu.actionState == "ATTACKAIRF" || cpu.actionState == "ATTACKAIRB" || cpu.actionState == "ATTACKAIRU" || cpu.actionState == "ATTACKAIRD") {
      if (!isOffstage(cpu)) {
        if (cpu.phys.pos.y - NearestFloor(cpu) <= 5) {
          //press the fucking l button
          returnInput.l = true;
        }
        if (cpu.phys.cVel.y <= 0) {
          if (!cpu.phys.fastfalled) {
            if (cpu.phys.pos.y - NearestFloor(cpu) >= 0) {
              returnInput.lsY = -1.0;
            }
          }
        }
        //other shit
      }
    }
    //l cancel
    //fast fall
    //other shit
    if (cpu.phys.grounded || cpu.phys.onLedge > -1) {
      cpu.currentAction = "NONE";
    }
  }
  return returnInput;
}
//Recovering:
//cpu is a reference to the current cpu. Replace it if you want
//expect cases of jigglypuff's accidently battlefielding themselves sometimes.
//Fox angles should be perfectly imperfect.
function CPUrecover(cpu, p) {
  //Where ledges is a list of the ledges on the current stage in the following format. [[ledge1XPos, ledge1YPos],[ledge2XPos,ledge3Ypos],[...]...]
  //ledgepos is where a character can grab the ledge
  var closest = NearestLedge(cpu);
  var returnInput = [0.0, 0.0, false, false];
  var returnInput = {
    lsX: 0.0,
    lsY: 0.0,
    x: false,
    b: false
  }; //format is [x joystick float, y joystick float, x button, b button]
  // if charSelect of player num is 2 meaning Fox
  if (_main.characterSelections[p] == 2) {
    //perfect imperfect firefox angles
    if (cpu.actionState == "UPSPECIALCHARGE") {
      returnInput.lsX = 0.0;
      returnInput.lsY = 0.0;
      if (cpu.timer >= 40 && cpu.timer <= 43) {
        //var imperfection = Math.floor(((Math.random() * 20) + 1) - 10) / 2000;
        var imperfection = 0;
        var theta = Math.atan((closest.y - 3.5 - cpu.phys.pos.y) / (closest.x - cpu.phys.pos.x)) + imperfection; //some trig to get angles //(cpu.phys.ledgeSnapBoxF.max.y-cpu.phys.ledgeSnapBoxF.min.y)/2
        var newX = Math.cos(theta); //* Math.sqrt(2);
        var newY = Math.sin(theta); //* Math.sqrt(2);
        if (closest.x < cpu.phys.pos.x) {
          newX *= -1;
          newY *= -1;
        }
        // dont go past 1.0 or -1.0
        newX = Math.sign(newX) * Math.min(1.0, Math.abs(newX));
        newY = Math.sign(newY) * Math.min(1.0, Math.abs(newY));

        returnInput.lsX = newX;
        returnInput.lsY = newY;
        return returnInput;
      }
    } else if (cpu.actionState == "UPSPECIALLAUNCH") {
      returnInput.lsX = 0.0;
      returnInput.lsY = 0.0;
      return returnInput;
    }
  }
  if (cpu.actionState.substr(0, 4) == "JUMP" || cpu.actionState == "FALLAERIAL" || cpu.actionState == "DAMAGEFALL" || cpu.actionState == "FALL" || cpu.actionState == "FALLSPECIAL") {
    //not in up-b or some shit
    if (cpu.phys.pos.x < closest.x) {
      returnInput.lsX = 1.0;
    } else if (cpu.phys.pos.x > closest.x) {
      returnInput.lsX = -1.0;
    }
    if (_main.characterSelections[p] == 0 && Math.abs(closest.x - cpu.phys.pos.x) > 25 && (!cpu.phys.doubleJumped || cpu.phys.jumpsUsed < 5 && cpu.charAttributes.multiJump) && (closest.y - cpu.phys.pos.y < 5 || closest.y - cpu.phys.pos.y < 30 && Math.abs(closest.x - cpu.phys.pos.x) > 40)) {
      //side-b  
      //console.log("HI");
      if (Math.abs(cpu.phys.cVel.x) > 0.8) {
        if (cpu.phys.pos.x < closest.x) {
          returnInput.lsX = 1.0;
        } else if (cpu.phys.pos.x > closest.x) {
          returnInput.lsX = -1.0;
        } else {
          returnInput.lsX = 0.0;
        }
        if (!(cpu.actionState.substr(0, 7) == "SPECIAL")) {
          //console.log("HEY");
          returnInput.lsY = 0.0;
          returnInput.b = true;
          return returnInput;
        }
      }
    } else {
      if (cpu.phys.cVel.y <= 0 && (closest.y - cpu.phys.pos.y > 10 && Math.abs(closest.x - cpu.phys.pos.x) > 25 || closest.y - cpu.phys.pos.y > 25 && Math.abs(closest.x - cpu.phys.pos.x) <= 25)) {
        //is falling
        if (!cpu.phys.doubleJumped || cpu.phys.jumpsUsed < 5 && cpu.charAttributes.multiJump) {
          //if jumps isn't .jumps thats unintuitive on your part. only tries to jump if it can jump
          var randomSeed = Math.floor(Math.random() * 1000 + 1);

          if (randomSeed <= 300) {
            //will jump
            returnInput.x = true;
          } else if (randomSeed <= 301) {
            //will up-b
            if (_main.characterSelections[p] != 1) {
              //not jigglypuff
              returnInput.lsX = 0.0;
              returnInput.lsY = 1.0;
              returnInput.b = true;
            }
          }
        } else {
          if (_main.characterSelections[p] == 0) {
            //is marth
            if (Math.abs(closest.x - cpu.phys.pos.x) <= 20 && closest.y - cpu.phys.pos.y > 30 || closest.y - cpu.phys.pos.y > 60) {
              returnInput.lsY = 1.0;
              returnInput.b = true;
            } //else moves towards ledge
          }
          if (_main.characterSelections[p] == 2) {
            //is fox
            if (Math.abs(closest.y - cpu.phys.pos.y) <= 10 && Math.abs(closest.x - cpu.phys.pos.x) >= 30 && Math.abs(closest.x - cpu.phys.pos.x) <= 77) {
              //can side-b?
              randomSeed = Math.floor(Math.random() * 10 + 1);
              if (randomSeed <= 4) {
                returnInput.lsY = 0.0;
                returnInput.lsX = 1 * Math.sign(closest.x - cpu.phys.pos.x);
                returnInput.b = true;
                return returnInput;
              }
              /* else if (randomSeed <= 4) {
              					//returnInput.lstickX = 0.0;
              					//returnInput.lstickY = 1.0;
              					//returnInput.b = true;
              				}*/
            }
            if (closest.y - cpu.phys.pos.y >= 40 || Math.abs(closest.x - cpu.phys.pos.x) >= 50) {
              returnInput.lsX = 0.0;
              returnInput.lsY = 1.0;
              returnInput.b = true;
            }
          }
        }
      }
    }
    if (_main.characterSelections[p] == 2 && returnInput.lsY == 1.0) {
      returnInput.lsX = 0.0;
    }
  } else if (_main.characterSelections[p] == 0 && cpu.actionState == "UPSPECIAL") {
    returnInput.lsX = 0.35 * Math.sign(closest.x - cpu.phys.pos.x);
  }
  return returnInput;
}

//////////////////
// WEBPACK FOOTER
// ./src/main/ai.js
// module id = 258
// module chunks = 1
//# sourceURL=webpack:///./src/main/ai.js?