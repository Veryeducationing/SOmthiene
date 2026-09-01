"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.articles = exports.articleHitQueue = exports.destroyArticleQueue = exports.aArticles = undefined;
exports.resetAArticles = resetAArticles;
exports.executeArticles = executeArticles;
exports.destroyArticles = destroyArticles;
exports.renderArticles = renderArticles;
exports.articlesHitDetection = articlesHitDetection;
exports.executeArticleHits = executeArticleHits;
exports.wallDetection = wallDetection;
exports.articleHitCollision = articleHitCollision;
exports.articleShieldCollision = articleShieldCollision;
exports.interpolatedArticleCircleCollision = interpolatedArticleCircleCollision;
exports.interpolatedArticleHurtCollision = interpolatedArticleHurtCollision;
exports.articleHurtCollision = articleHurtCollision;

var _main = __webpack_require__(11);

var _render = __webpack_require__(13);

var _sfx = __webpack_require__(120);

var _hitDetection = __webpack_require__(133);

var _environmentalCollision = __webpack_require__(28);

var _ecbTransform = __webpack_require__(34);

var _findSmallestWithin = __webpack_require__(30);

var _linAlg = __webpack_require__(29);

var _actionStateShortcuts = __webpack_require__(10);

var _drawVfx = __webpack_require__(134);

var _activeStage = __webpack_require__(18);

var _createHitBox = __webpack_require__(240);

var _Vec2D = __webpack_require__(22);

var _Segment2D = __webpack_require__(238);

var _laser = __webpack_require__(211);

var _chromaticAberration = __webpack_require__(213);

var _makeColour = __webpack_require__(15);

var _interpolatedCollision = __webpack_require__(239);

/* eslint-disable */

var aArticles = exports.aArticles = [];
var destroyArticleQueue = exports.destroyArticleQueue = [];
var articleHitQueue = exports.articleHitQueue = [];

function resetAArticles() {
    exports.aArticles = aArticles = [];
}
// 0.00390583333333333333333333333333 = hitbox size multiplier
var articles = exports.articles = {
    "LASER": {
        name: "LASER",
        canTurboCancel: false,
        init: function init(options) {
            var p = options.p;
            var x = options.x;
            var y = options.y;
            var rotate = options.rotate;
            var isFox = options.isFox !== undefined ? options.isFox : true;
            var partOfThrow = options.partOfThrow || false;
            this.strokeStyle = isFox ? "rgba(255, 59, 59,0.6)" : "rgba(73,130,234,0.6)";
            this.fillStyle = isFox ? "rgb(255, 193, 193)" : "rgb(225, 255, 255)";
            var obj = {
                hitList: [],
                rotate: rotate,
                destroyOnHit: true,
                clank: false,
                timer: 0,
                vel: new _Vec2D.Vec2D((isFox ? 7 : 5) * Math.cos(rotate) * _main.player[p].phys.face, (isFox ? 7 : 5) * Math.sin(rotate)),
                pos: new _Vec2D.Vec2D(_main.player[p].phys.pos.x + x * _main.player[p].phys.face, _main.player[p].phys.pos.y + y),
                posPrev1: new _Vec2D.Vec2D(_main.player[p].phys.pos.x, _main.player[p].phys.pos.y + y),
                posPrev2: new _Vec2D.Vec2D(_main.player[p].phys.pos.x, _main.player[p].phys.pos.y + y),
                posPrev3: new _Vec2D.Vec2D(_main.player[p].phys.pos.x, _main.player[p].phys.pos.y + y),
                posPrev: new _Vec2D.Vec2D(_main.player[p].phys.pos.x, _main.player[p].phys.pos.y + y),
                hb: new _createHitBox.createHitbox(new _Vec2D.Vec2D(0, 0), 1.172, 3, 361, isFox ? 0 : partOfThrow ? 0 : 100, 0, isFox ? 0 : partOfThrow ? 0 : 5, 0, 0, 1, 1),
                ecb: [new _Vec2D.Vec2D(_main.player[p].phys.pos.x + x * _main.player[p].phys.face, _main.player[p].phys.pos.y + y - 0.01), new _Vec2D.Vec2D(_main.player[p].phys.pos.x + x * _main.player[p].phys.face + 10, _main.player[p].phys.pos.y + y), new _Vec2D.Vec2D(_main.player[p].phys.pos.x + x * _main.player[p].phys.face, _main.player[p].phys.pos.y + y + 0.01), new _Vec2D.Vec2D(_main.player[p].phys.pos.x + x * _main.player[p].phys.face - 10, _main.player[p].phys.pos.y + y)]
            };
            aArticles.push({
                name: "LASER",
                player: p,
                instance: obj
            });
            articles.LASER.main(aArticles.length - 1);
        },
        main: function main(i) {
            aArticles[i].instance.timer++;
            if (aArticles[i].instance.timer > 4) {
                aArticles[i].instance.posPrev.x = aArticles[i].instance.posPrev3.x;
                aArticles[i].instance.posPrev.y = aArticles[i].instance.posPrev3.y;
            }
            if (aArticles[i].instance.timer > 3) {
                aArticles[i].instance.posPrev3.x = aArticles[i].instance.posPrev2.x;
                aArticles[i].instance.posPrev3.y = aArticles[i].instance.posPrev2.y;
            }
            if (aArticles[i].instance.timer > 2) {
                aArticles[i].instance.posPrev2.x = aArticles[i].instance.posPrev1.x;
                aArticles[i].instance.posPrev2.y = aArticles[i].instance.posPrev1.y;
            }
            if (aArticles[i].instance.timer > 1) {
                aArticles[i].instance.posPrev1.x = aArticles[i].instance.pos.x;
                aArticles[i].instance.posPrev1.y = aArticles[i].instance.pos.y;
            }
            aArticles[i].instance.pos.x += aArticles[i].instance.vel.x;
            aArticles[i].instance.ecb[0].x += aArticles[i].instance.vel.x;
            aArticles[i].instance.ecb[1].x += aArticles[i].instance.vel.x;
            aArticles[i].instance.ecb[2].x += aArticles[i].instance.vel.x;
            aArticles[i].instance.ecb[3].x += aArticles[i].instance.vel.x;
            aArticles[i].instance.pos.y += aArticles[i].instance.vel.y;
            aArticles[i].instance.ecb[0].y += aArticles[i].instance.vel.y;
            aArticles[i].instance.ecb[1].y += aArticles[i].instance.vel.y;
            aArticles[i].instance.ecb[2].y += aArticles[i].instance.vel.y;
            aArticles[i].instance.ecb[3].y += aArticles[i].instance.vel.y;
            if (wallDetection(i) || aArticles[i].instance.timer > 200) {
                destroyArticleQueue.push(i);
            }
        },
        draw: function draw(i) {
            _main.fg2.save();
            var h = new _Vec2D.Vec2D(aArticles[i].instance.pos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], aArticles[i].instance.pos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
            var t = new _Vec2D.Vec2D(aArticles[i].instance.posPrev.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], aArticles[i].instance.posPrev.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
            var d = h.x > t.x ? 1 : -1;
            var r = aArticles[i].instance.rotate;
            var v1 = (0, _render.rotateVector)(-4, 2, -r);
            var v2 = (0, _render.rotateVector)(4, 2, -r);
            var v3 = (0, _render.rotateVector)(4, -2, -r);
            var v4 = (0, _render.rotateVector)(-4, -2, -r);
            (0, _chromaticAberration.chromaticAberration)(_main.fg2, function (c1, c2) {
                return (0, _laser.drawLaserLine)(h, t, v1, v2, v3, v4, d, c1, c2);
            }, (0, _makeColour.unmakeColour)(this.strokeStyle), (0, _makeColour.unmakeColour)(this.fillStyle), 0.8, new _Vec2D.Vec2D(-0.3 * Math.sin(r) * _activeStage.activeStage.scale, -0.3 * Math.cos(r) * _activeStage.activeStage.scale));
            _main.fg2.restore();
        }
    },

    "ILLUSION": {
        name: "ILLUSION",
        noDraw: true,
        canTurboCancel: true,
        init: function init(options) {
            var p = options.p;
            var type = options.type;
            var isFox = options.isFox || true;
            var obj = {
                hitList: [],
                destroyOnHit: false,
                clank: true,
                timer: 0,
                pos: new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x, _main.player[p].phys.posPrev.y + 5),
                posPrev: new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x, _main.player[p].phys.posPrev.y + 5),
                hb: new _createHitBox.createHitbox(new _Vec2D.Vec2D(0, 0), 4.160, 7, isFox ? 80 : 270, isFox ? 60 : 70, isFox ? 68 : 70, 0, 1, 1, 1, 1),
                ecb: [new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x, _main.player[p].phys.posPrev.y - 10), new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x + 10, _main.player[p].phys.posPrev.y), new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x, _main.player[p].phys.posPrev.y + 10), new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x - 10, _main.player[p].phys.posPrev.y)]
            };
            // if ground
            if (type) {
                if (isFox) {
                    obj.hb.kg = 40;
                } else {
                    obj.hb.angle = 65;
                    obj.hb.kg = 60;
                    obj.hb.bk = 74;
                }
            }
            aArticles.push({
                name: "ILLUSION",
                player: p,
                instance: obj
            });
            articles.ILLUSION.main(aArticles.length - 1);
        },
        main: function main(i) {
            var p = aArticles[i].player;
            aArticles[i].instance.timer++;
            aArticles[i].instance.posPrev = new _Vec2D.Vec2D(aArticles[i].instance.pos.x, aArticles[i].instance.pos.y);
            aArticles[i].instance.pos = new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x, _main.player[p].phys.posPrev.y);
            aArticles[i].instance.ecb = [new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x, _main.player[p].phys.posPrev.y - 10), new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x + 10, _main.player[p].phys.posPrev.y), new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x, _main.player[p].phys.posPrev.y + 10), new _Vec2D.Vec2D(_main.player[p].phys.posPrev.x - 10, _main.player[p].phys.posPrev.y)];
            if (aArticles[i].instance.timer > 5) {
                destroyArticleQueue.push(i);
            }
        }
    }
};

function executeArticles() {
    exports.destroyArticleQueue = destroyArticleQueue = [];
    for (var i = 0; i < aArticles.length; i++) {
        articles[aArticles[i].name].main(i);
    }
}

function destroyArticles() {
    for (var k = 0; k < destroyArticleQueue.length; k++) {
        aArticles.splice(destroyArticleQueue[k] - k, 1);
    }
}

function renderArticles() {
    for (var i = 0; i < aArticles.length; i++) {
        if (!articles[aArticles[i].name].noDraw) {
            articles[aArticles[i].name].draw(i);
        }
    }
}

function articlesHitDetection() {
    exports.articleHitQueue = articleHitQueue = [];
    for (var a = 0; a < aArticles.length; a++) {
        var articleDestroyed = false;
        if (aArticles[a].instance.timer > 1) {
            var interpolate = true;
        } else {
            var interpolate = false;
        }
        for (var v = 0; v < 4; v++) {
            var inHitList = false;
            for (var n = 0; n < 4; n++) {
                if (v == aArticles[a].instance.hitList[n]) {
                    inHitList = true;
                    break;
                }
            }
            // if v isnt the owner, not destroyed and no in article's hitlist
            if (v != aArticles[a].player && !articleDestroyed && !inHitList && _main.playerType[v] != -1) {
                // if article is clankable
                var attackerClank = false;
                if (aArticles[a].instance.clank) {
                    for (var k = 0; k < 4; k++) {
                        if (_main.player[v].hitboxes.active[k] && (_main.player[v].hitboxes.id[k].clank == 1 || _main.player[v].hitboxes.id[k].clank == 2 && _main.player[v].phys.grounded)) {
                            // ILL DO CLANKS TOMOZ
                            /*var clankHit = articleHitCollision(a,v,k);
                             if (clankHit[0]){
                               var diff = player[p].hitboxes.id[j].dmg - player[i].hitboxes.id[k].dmg;
                             if (diff >= 9){
                             // victim clank
                             // attacker cut through
                             player[i].hit.hitlag = Math.floor(player[p].hitboxes.id[j].dmg * (1/3) + 3);
                             turnOffHitboxes(i);
                             actionStates[characterSelections[i]][78].init(i);
                             }
                             else if (diff <= -9){
                             // attacker clank
                             // victim cut through
                             player[p].hit.hitlag = Math.floor(player[i].hitboxes.id[k].dmg * (1/3) + 3);
                             attackerClank = true;
                             articleDestroyed = true;
                             turnOffHitboxes(p);
                             actionStates[characterSelections[p]][78].init(p,input);
                             }
                             else {
                             // both clank
                             player[i].hit.hitlag = Math.floor(player[p].hitboxes.id[j].dmg * (1/3) + 3);
                             player[p].hit.hitlag = Math.floor(player[i].hitboxes.id[k].dmg * (1/3) + 3);
                             attackerClank = true;
                             articleDestroyed = true;
                             turnOffHitboxes(i);
                             actionStates[characterSelections[i]][78].init(i);
                             turnOffHitboxes(p);
                             actionStates[characterSelections[p]][78].init(p,input);
                             }
                             sounds.clank.play();
                             drawVfx("clank",clankHit[1]);
                             player[p].hitboxes.hitList.push(i);
                             break;
                             }*/

                        }
                    }
                }
                if (!attackerClank) {
                    var reflected = false;
                    for (var i = 0; i < 4; i++) {
                        if (_main.player[v].hitboxes.active[i]) {
                            if (_main.player[v].hitboxes.id[i].type == 7) {
                                if (articleHitCollision(a, v, i) || interpolate && (articleHitCollision(a, v, i) || interpolatedArticleCircleCollision(a, new _Vec2D.Vec2D(_main.player[v].phys.pos.x + _main.player[v].hitboxes.id[i].offset[0].x, _main.player[v].phys.pos.y + _main.player[v].hitboxes.id[i].offset[0].y), _main.player[v].hitboxes.id[i].size))) {
                                    if (_main.player[v].actionState.substr(0, 11) == "DOWNSPECIAL") {
                                        // do shine reflect animation
                                        _sfx.sounds.foxshinereflect.play();
                                    }
                                    // change ownership
                                    aArticles[a].player = v;
                                    // increase damage
                                    aArticles[a].instance.hb.dmg *= 1.5;
                                    // reflect
                                    if (aArticles[a].instance.vel != undefined || aArticles[a].instance.vel != null) {
                                        aArticles[a].instance.vel.x *= -1;
                                        aArticles[a].instance.vel.y *= -1;
                                    }
                                    reflected = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (!reflected) {
                        if (_main.player[v].phys.shielding && (articleShieldCollision(a, v, false) || interpolate && (articleShieldCollision(a, v, true) || interpolatedArticleCircleCollision(a, _main.player[v].phys.shieldPositionReal, _main.player[v].phys.shieldSize)))) {
                            articleHitQueue.push([a, v, true]);
                            aArticles[a].instance.hitList.push(v);
                            if (articles[aArticles[a].name].canTurboCancel) {
                                _main.player[aArticles[a].player].hasHit = true;
                            }
                        } else if (_main.player[v].phys.hurtBoxState != 1) {
                            if (articleHurtCollision(a, v, false) || interpolate && (interpolatedArticleHurtCollision(a, v) || articleHurtCollision(a, v, true))) {
                                articleHitQueue.push([a, v, false]);
                                aArticles[a].instance.hitList.push(v);
                                if (articles[aArticles[a].name].canTurboCancel) {
                                    _main.player[aArticles[a].player].hasHit = true;
                                }
                                if (aArticles[a].instance.destroyOnHit) {
                                    destroyArticleQueue.push(a);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function executeArticleHits(input) {
    for (var i = 0; i < articleHitQueue.length; i++) {
        var a = articleHitQueue[i][0];
        var v = articleHitQueue[i][1];
        var shieldHit = articleHitQueue[i][2];
        var o = aArticles[a].player;
        var hb = aArticles[a].instance.hb;

        var damage = hb.dmg;

        if (shieldHit) {
            if (_main.player[v].phys.powerShieldReflectActive) {
                (0, _drawVfx.drawVfx)({
                    name: "powershieldreflect",
                    pos: _main.player[v].phys.shieldPositionReal,
                    face: _main.player[v].phys.face
                });
                _sfx.sounds.powershieldreflect.play();
                aArticles[a].player = v; // change ownership to victim
                // reflects velocity
                if (aArticles[a].instance.vel != undefined || aArticles[a].instance.vel != null) {
                    aArticles[a].instance.vel.x *= -1;
                    aArticles[a].instance.vel.y *= -1;
                }
                // cuts damage in half
                aArticles[a].instance.hb.dmg *= 0.5;
            } else {
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
                    break;
                }
                if (aArticles[a].instance.destroyOnHit) {
                    destroyArticleQueue.push(a);
                }
                (0, _drawVfx.drawVfx)({
                    name: "clank",
                    pos: aArticles[a].instance.pos,
                    face: 1
                });
                _main.player[v].hit.hitlag = Math.floor(damage * (1 / 3) + 3);
                _main.player[v].hit.shieldstun = Math.floor(damage) * (0.65 * (1 - (_main.player[v].phys.shieldAnalog - 0.3) / 0.7) + 0.3) * 1.5 + 2;
                var victimPush = (Math.floor(damage) * (0.195 * (1 - (_main.player[v].phys.shieldAnalog - 0.3) / 0.7) + 0.09) + 0.4) * 0.6;
                if (victimPush > 2) {
                    victimPush = 2;
                }
                if (aArticles[a].instance.pos.x < _main.player[v].phys.pos.x) {
                    _main.player[v].phys.cVel.x = victimPush;
                } else {
                    _main.player[v].phys.cVel.x = -victimPush;
                }
            }

            _actionStateShortcuts.actionStates[_main.characterSelections[v]].GUARD.init(v, input);
        } else {
            if (_main.player[v].phys.hurtBoxState == 0) {
                var crouching = _actionStateShortcuts.actionStates[_main.characterSelections[v]][_main.player[v].actionState].crouch;
                var vCancel = false;
                if (_main.player[v].phys.vCancelTimer > 0) {
                    if (_actionStateShortcuts.actionStates[_main.characterSelections[v]][_main.player[v].actionState].vCancel) {
                        vCancel = true;
                        _sfx.sounds.vcancel.play();
                    }
                }
                _main.player[v].hit.knockback = (0, _hitDetection.getKnockback)(hb, damage, damage, _main.player[v].percent, _main.player[v].charAttributes.weight, crouching, vCancel);

                _main.player[v].hit.hitPoint = aArticles[a].instance.pos;
                _main.player[v].percent += damage;

                switch (hb.type) {
                    case 0:
                        (0, _drawVfx.drawVfx)({
                            name: "normalhit",
                            pos: _main.player[v].hit.hitPoint,
                            face: _main.player[v].phys.face
                        });
                        break;
                    case 1:
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
                    default:
                        break;
                }

                (0, _hitDetection.knockbackSounds)(hb.type, _main.player[v].hit.knockback, v);

                if (_main.player[v].hit.knockback > 0) {
                    _main.player[v].hit.angle = hb.angle;
                    if (_main.player[v].hit.angle == 361) {
                        if (_main.player[v].hit.knockback < 32.1) {
                            _main.player[v].hit.angle = 0;
                        } else if (_main.player[v].hit.knockback >= 32.1) {
                            _main.player[v].hit.angle = 44;
                        }
                    }

                    _main.player[v].hit.hitlag = Math.floor(damage * (1 / 3) + 3);

                    if (aArticles[a].instance.pos.x < _main.player[v].phys.pos.x) {
                        _main.player[v].hit.reverse = false;
                        _main.player[v].phys.face = -1;
                    } else {
                        _main.player[v].hit.reverse = true;
                        _main.player[v].phys.face = 1;
                    }

                    var isThrow = false;
                    if (_main.player[v].phys.grabbedBy == -1 || _main.player[v].phys.grabbedBy > -1 && _main.player[v].hit.knockback > 50) {

                        _main.player[v].hit.hitstun = (0, _hitDetection.getHitstun)(_main.player[v].hit.knockback);

                        if (_main.player[v].hit.knockback >= 80 || isThrow) {
                            _actionStateShortcuts.actionStates[_main.characterSelections[v]].DAMAGEFLYN.init(v, input, !isThrow);
                        } else {
                            _actionStateShortcuts.actionStates[_main.characterSelections[v]].DAMAGEN2.init(v, input);
                        }
                    } else {
                        if (_main.player[v].actionState != "THROWNPUFFDOWN") {
                            _actionStateShortcuts.actionStates[_main.characterSelections[v]].CAPTUREDAMAGE.init(v, input);
                        }
                    }

                    if (_main.player[v].phys.grounded && _main.player[v].hit.angle > 180) {
                        if (_main.player[v].hit.knockback >= 80) {
                            _sfx.sounds.bounce.play();
                            (0, _drawVfx.drawVfx)({
                                name: "groundBounce",
                                pos: _main.player[v].phys.pos,
                                face: _main.player[v].phys.face
                            });
                            _main.player[v].hit.angle = 360 - _main.player[v].hit.angle;
                            _main.player[v].hit.knockback *= 0.8;
                        }
                    }
                    (0, _main.screenShake)(_main.player[v].hit.knockback);
                    (0, _main.percentShake)(_main.player[v].hit.knockback, v);
                }
            } else {
                _sfx.sounds.blunthit.play();
                (0, _drawVfx.drawVfx)({
                    name: "clank",
                    pos: aArticles[a].instance.pos
                });
            }
        }
    }
}

function wallDetection(i) {
    var article = aArticles[i].instance;
    var ecbp = article.ecb;
    var ecb1 = void 0;
    if (article.timer < 2) {
        var focus = article.posPrev;
        var offset = 0.0001;
        ecb1 = [new _Vec2D.Vec2D(focus.x, focus.y - offset), new _Vec2D.Vec2D(focus.x + offset, focus.y), new _Vec2D.Vec2D(focus.x, focus.y + offset), new _Vec2D.Vec2D(focus.x - offset, focus.y)];
    } else {
        ecb1 = (0, _ecbTransform.moveECB)(ecbp, (0, _linAlg.subtract)(article.posPrev, article.pos));
    }
    var collisions = [];
    var thisCollision = null;
    for (var j = 0; j < _activeStage.activeStage.wallL.length; j++) {
        thisCollision = (0, _environmentalCollision.findCollision)(ecb1, ecbp, [_activeStage.activeStage.wallL[j], ["l", j]]);
        if (thisCollision !== null) {
            collisions.push(thisCollision);
        }
    }
    for (var j = 0; j < _activeStage.activeStage.wallR.length; j++) {
        thisCollision = (0, _environmentalCollision.findCollision)(ecb1, ecbp, [_activeStage.activeStage.wallR[j], ["r", j]]);
        if (thisCollision !== null) {
            collisions.push(thisCollision);
        }
    }
    for (var j = 0; j < _activeStage.activeStage.ceiling.length; j++) {
        thisCollision = (0, _environmentalCollision.findCollision)(ecb1, ecbp, [_activeStage.activeStage.ceiling[j], ["c", j]]);
        if (thisCollision !== null) {
            collisions.push(thisCollision);
        }
    }
    for (var j = 0; j < _activeStage.activeStage.ground.length; j++) {
        thisCollision = (0, _environmentalCollision.findCollision)(ecb1, ecbp, [_activeStage.activeStage.ground[j], ["g", j]]);
        if (thisCollision !== null) {
            collisions.push(thisCollision);;
        }
    }
    for (var j = 0; j < _activeStage.activeStage.platform.length; j++) {
        thisCollision = (0, _environmentalCollision.findCollision)(ecb1, ecbp, [_activeStage.activeStage.platform[j], ["p", j]]);
        if (thisCollision !== null) {
            collisions.push(thisCollision);
        }
    }
    var firstCollision = (0, _findSmallestWithin.pickSmallestSweep)(collisions);
    if (firstCollision !== null) {
        return firstCollision.sweep;
    } else {
        return null;
    }
}

function articleHitCollision(a, v, k) {
    var hbpos = aArticles[a].instance.pos;
    var hbpos2 = new _Vec2D.Vec2D(_main.player[v].phys.pos.x + _main.player[v].hitboxes.id[k].offset[_main.player[v].hitboxes.frame].x * _main.player[v].phys.face, _main.player[v].phys.pos.y + _main.player[v].hitboxes.id[k].offset[_main.player[v].hitboxes.frame].y);
    var hitPoint = new _Vec2D.Vec2D((hbpos.x + hbpos2.x) / 2, (hbpos.y + hbpos2.y) / 2);
    return Math.pow(hbpos2.x - hbpos.x, 2) + Math.pow(hbpos.y - hbpos2.y, 2) <= Math.pow(aArticles[a].instance.hb.size + _main.player[v].hitboxes.id[k].size, 2);

    //return [(Math.pow(hbpos2.x-hbpos.x,2) + Math.pow(hbpos.y-hbpos2.y,2) <= Math.pow(aArticles[a].instance.hb.size+player[v].hitboxes.id[k].size,2)),hitPoint];
}

function articleShieldCollision(a, v, previous) {
    if (previous) {
        var hbpos = aArticles[a].instance.posPrev;
    } else {
        var hbpos = aArticles[a].instance.pos;
    }
    var shieldpos = _main.player[v].phys.shieldPositionReal;

    return Math.pow(shieldpos.x - hbpos.x, 2) + Math.pow(hbpos.y - shieldpos.y, 2) <= Math.pow(aArticles[a].instance.hb.size + _main.player[v].phys.shieldSize, 2);
}

function interpolatedArticleCircleCollision(a, circlePos, r) {
    var h1 = aArticles[a].instance.posPrev;
    var h2 = aArticles[a].instance.pos;
    var s = aArticles[a].instance.hb.size;

    var collision = (0, _interpolatedCollision.sweepCircleVsSweepCircle)(h1, s, h2, s, circlePos, r, circlePos, r);

    if (collision === null) {
        return false;
    } else {
        return true;
    }
}

function interpolatedArticleHurtCollision(a, v) {
    var hurt = _main.player[v].phys.hurtbox;
    var h1 = aArticles[a].instance.posPrev;
    var h2 = aArticles[a].instance.pos;
    var r = aArticles[a].instance.hb.size;

    var collision = (0, _interpolatedCollision.sweepCircleVsAABB)(h1, r, h2, r, hurt.min, hurt.max);

    if (collision === null) {
        return false;
    } else {
        return true;
    }
}

function articleHurtCollision(a, v, previous) {
    if (previous) {
        var hbpos = aArticles[a].instance.posPrev;
    } else {
        var hbpos = aArticles[a].instance.pos;
    }
    var hurtCenter = new _Vec2D.Vec2D((_main.player[v].phys.hurtbox.min.x + _main.player[v].phys.hurtbox.max.x) / 2, (_main.player[v].phys.hurtbox.min.y + _main.player[v].phys.hurtbox.max.y) / 2);
    var distance = new _Vec2D.Vec2D(Math.abs(hbpos.x - hurtCenter.x), Math.abs(hbpos.y - hurtCenter.y));

    var hurtWidth = 8;
    var hurtHeight = 18;

    if (distance.x > hurtWidth / 2 + aArticles[a].instance.hb.size) {
        return false;
    }
    if (distance.y > hurtHeight / 2 + aArticles[a].instance.hb.size) {
        return false;
    }

    if (distance.x <= hurtWidth / 2) {
        return true;
    }
    if (distance.y <= hurtHeight / 2) {
        return true;
    }

    var cornerDistance_sq = Math.pow(distance.x - hurtWidth / 2, 2) + Math.pow(distance.y - hurtHeight / 2, 2);

    return cornerDistance_sq <= Math.pow(aArticles[a].instance.hb.size, 2);
}

//////////////////
// WEBPACK FOOTER
// ./src/physics/article.js
// module id = 132
// module chunks = 1
//# sourceURL=webpack:///./src/physics/article.js?