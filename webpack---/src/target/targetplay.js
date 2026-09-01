"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.medalsEarned = exports.medalTimes = exports.devRecords = exports.targetRecords = exports.targetsDestroyed = exports.targetDestroyed = exports.targetStagePlaying = exports.targetPlayer = exports.targetTesting = undefined;
exports.setTargetStagePlaying = setTargetStagePlaying;
exports.setTargetPlayer = setTargetPlayer;
exports.getTargetCookies = getTargetCookies;
exports.giveMedals = giveMedals;
exports.startTargetGame = startTargetGame;
exports.destroyTarget = destroyTarget;
exports.targetHitDetection = targetHitDetection;
exports.hitTargetCollision = hitTargetCollision;
exports.articleTargetCollision = articleTargetCollision;
exports.targetTimerTick = targetTimerTick;

var _main = __webpack_require__(11);

var _render = __webpack_require__(13);

var _sfx = __webpack_require__(120);

var _targetbuilder = __webpack_require__(126);

var _stagerender = __webpack_require__(127);

var _article = __webpack_require__(132);

var _hitDetection = __webpack_require__(133);

var _drawVfx = __webpack_require__(134);

var _vfxQueue = __webpack_require__(183);

var _activeStage = __webpack_require__(18);

var _Vec2D = __webpack_require__(22);

/* eslint-disable */

var targetTesting = exports.targetTesting = false;
var targetPlayer = exports.targetPlayer = 0;
var targetStagePlaying = exports.targetStagePlaying = 0;
var targetDestroyed = exports.targetDestroyed = [false, false, false, false, false, false, false, false, false, false];
var targetsDestroyed = exports.targetsDestroyed = 0;

var targetRecords = exports.targetRecords = [[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]];
var devRecords = exports.devRecords = [[14.22, 10.42, 14.38, 12.20, 12.68, 9.15, 11.00, 11.63, 18.40, 11.35], [15.80, 13.93, 22.45, 14.85, 14.40, 10.22, 14.68, 14.55, 22.70, 12.80], [10.65, 9.98, 12.10, 7.37, 7.25, 9.47, 9.50, 8.33, 14.18, 8.83], [99.99, 99.99, 99.99, 99.99, 99.99, 99.99, 99.99, 99.99, 99.99, 99.99], [99.99, 99.99, 99.99, 99.99, 99.99, 99.99, 99.99, 99.99, 99.99, 99.99]];

var medalTimes = exports.medalTimes = [[[30, 21, 17], [29, 20, 15], [35, 24, 19], [32, 21, 15], [35, 23, 15], [30, 20, 13], [33, 21, 14], [35, 23, 15], [38, 27, 21], [30, 20, 14]], [[32, 22, 17], [32, 24, 18], [40, 32, 26], [33, 24, 18], [33, 25, 17], [30, 20, 13], [33, 25, 17], [33, 24, 18], [39, 30, 24], [29, 20, 15]], [[25, 18, 13], [27, 19, 13], [30, 21, 14], [29, 21, 11], [27, 18, 10], [30, 20, 12], [31, 21, 13], [30, 20, 11], [30, 22, 16], [28, 19, 11]], [[25, 18, 13], [27, 19, 13], [30, 21, 14], [29, 21, 11], [27, 18, 10], [30, 20, 12], [31, 21, 13], [30, 20, 11], [30, 22, 16], [28, 19, 11]], [[25, 18, 13], [27, 19, 13], [30, 21, 14], [29, 21, 11], [27, 18, 10], [30, 20, 12], [31, 21, 13], [30, 20, 11], [30, 22, 16], [28, 19, 11]]];

var medalsEarned = exports.medalsEarned = [[[false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false]], [[false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false]], [[false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false]], [[false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false]], [[false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false]]];

function setTargetStagePlaying(val) {
  exports.targetStagePlaying = targetStagePlaying = val;
}
function setTargetPlayer(val) {
  exports.targetPlayer = targetPlayer = val;
}
function getTargetCookies() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 20; j++) {
      var r = (0, _main.getCookie)(i + "target" + j);
      if (r != null && r != undefined && r != "null") {
        targetRecords[i][j] = Number(r);
      }
    }
  }
}

function giveMedals() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 10; j++) {
      for (var k = 0; k < 3; k++) {
        if (targetRecords[i][j] != -1 && targetRecords[i][j] <= medalTimes[i][j][k]) {
          medalsEarned[i][j][k] = true;
        }
      }
    }
  }
}

function startTargetGame(p, test) {
  (0, _main.setEndTargetGame)(false);
  if (test) {
    (0, _activeStage.setActiveStageBuilderTestStage)(_targetbuilder.stageTemp);
  }
  if (_main.holiday == 1) {
    (0, _stagerender.createSnow)();
  }
  exports.targetTesting = targetTesting = test;
  (0, _stagerender.setBackgroundType)(Math.round(Math.random()));
  (0, _main.changeGamemode)(5);
  exports.targetDestroyed = targetDestroyed = [false, false, false, false, false, false, false, false, false, false];
  exports.targetsDestroyed = targetsDestroyed = 0;
  (0, _vfxQueue.resetVfxQueue)();
  (0, _article.resetAArticles)();
  (0, _main.initializePlayers)(p, true);
  (0, _render.renderPlayer)(p);

  _main.player[p].phys.pos = new _Vec2D.Vec2D(_activeStage.activeStage.startingPoint[0].x, _activeStage.activeStage.startingPoint[0].y);
  (0, _main.setMatchTimer)(0);
  (0, _main.setStartTimer)(1.5);
  (0, _main.setStarting)(true);
  (0, _drawVfx.drawVfx)({
    name: "start",
    pos: new _Vec2D.Vec2D(0, 0)
  });
  (0, _main.setFindingPlayers)(false);
  (0, _main.setPlaying)(true);

  _main.player[p].inCSS = false;
  _main.player[p].stocks = 1;
}

function destroyTarget(i) {
  targetDestroyed[i] = true;
  exports.targetsDestroyed = targetsDestroyed += 1;
  (0, _drawVfx.drawVfx)({
    name: "targetDestroy",
    pos: _activeStage.activeStage.target[i]
  });
  _sfx.sounds.targetBreak.play();
  if (targetsDestroyed == _activeStage.activeStage.target.length) {
    (0, _main.setEndTargetGame)(true);
  }
}

function targetHitDetection(p) {
  for (var i = 0; i < _activeStage.activeStage.target.length; i++) {
    if (!targetDestroyed[i]) {
      for (var j = 0; j < 4; j++) {
        if (_main.player[p].hitboxes.active[j]) {
          if (hitTargetCollision(p, j, i, false) || _main.player[p].hitboxes.active[j] && _main.player[p].phys.prevFrameHitboxes.active[j] && (hitTargetCollision(p, j, i, true) || (0, _hitDetection.interpolatedHitCircleCollision)(new _Vec2D.Vec2D(_activeStage.activeStage.target[i].x, _activeStage.activeStage.target[i].y), 7, p, j))) {
            _main.player[p].hasHit = true;
            destroyTarget(i);
            break;
          }
        }
      }
      for (var a = 0; a < _article.aArticles.length; a++) {
        var articleDestroyed = false;
        if (_article.aArticles[a].instance.timer > 1) {
          var interpolate = true;
        } else {
          var interpolate = false;
        }
        if (articleTargetCollision(a, i, false) || interpolate && (articleTargetCollision(a, i, true) || (0, _article.interpolatedArticleCircleCollision)(a, new _Vec2D.Vec2D(_activeStage.activeStage.target[i].x, _activeStage.activeStage.target[i].y), 7))) {
          if (_article.articles[_article.aArticles[a].name].canTurboCancel) {
            _main.player[_article.aArticles[a].player].hasHit = true;
          }
          destroyTarget(i);
          _article.destroyArticleQueue.push(a);
          break;
        }
      }
    }
  }
}

function hitTargetCollision(p, j, t, previous) {
  if (previous) {
    var hbpos = new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x + _main.player[p].phys.prevFrameHitboxes.id[j].offset[_main.player[p].phys.prevFrameHitboxes.frame].x * _main.player[p].phys.facePrev, _main.player[p].phys.posPrev.y + _main.player[p].phys.prevFrameHitboxes.id[j].offset[_main.player[p].phys.prevFrameHitboxes.frame].y);
  } else {
    var hbpos = new _Vec2D.Vec2D(_main.player[p].phys.pos.x + _main.player[p].hitboxes.id[j].offset[_main.player[p].hitboxes.frame].x * _main.player[p].phys.face, _main.player[p].phys.pos.y + _main.player[p].hitboxes.id[j].offset[_main.player[p].hitboxes.frame].y);
  }
  var targetPos = new _Vec2D.Vec2D(_activeStage.activeStage.target[t].x, _activeStage.activeStage.target[t].y);

  return Math.pow(targetPos.x - hbpos.x, 2) + Math.pow(hbpos.y - targetPos.y, 2) <= Math.pow(_main.player[p].hitboxes.id[j].size + 7, 2);
}

function articleTargetCollision(a, t, previous) {
  if (previous) {
    var hbpos = _article.aArticles[a].instance.posPrev;
  } else {
    var hbpos = _article.aArticles[a].instance.pos;
  }
  var targetpos = new _Vec2D.Vec2D(_activeStage.activeStage.target[t].x, _activeStage.activeStage.target[t].y);

  return Math.pow(targetpos.x - hbpos.x, 2) + Math.pow(hbpos.y - targetpos.y, 2) <= Math.pow(_article.aArticles[a].instance.hb.size + 7, 2);
}

function targetTimerTick() {
  if (_main.matchTimer + 0.016667 < 6000) {
    (0, _main.addMatchTimer)(0.016667);
  }
  $("#matchMinutes").empty().append(Math.floor(_main.matchTimer / 60));
  var sec = (_main.matchTimer % 60).toFixed(2);
  $("#matchSeconds").empty().append(sec.length < 5 ? "0" + sec : sec);
}

//////////////////
// WEBPACK FOOTER
// ./src/target/targetplay.js
// module id = 125
// module chunks = 1
//# sourceURL=webpack:///./src/target/targetplay.js?