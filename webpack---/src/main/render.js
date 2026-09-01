"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lostStockQueue = exports.twoPi = exports.hurtboxColours = undefined;
exports.rotateVector = rotateVector;
exports.drawArrayPathCompress = drawArrayPathCompress;
exports.renderPlayer = renderPlayer;
exports.renderOverlay = renderOverlay;
exports.setLostStockQueue = setLostStockQueue;
exports.renderForeground = renderForeground;
exports.resetLostStockQueue = resetLostStockQueue;

var _main = __webpack_require__(11);

var _settings = __webpack_require__(14);

var _makeColour = __webpack_require__(15);

var _actionStateShortcuts = __webpack_require__(10);

var _blendColours = __webpack_require__(17);

var _activeStage = __webpack_require__(18);

var _Vec2D = __webpack_require__(22);

var _characters = __webpack_require__(119);

/* eslint-disable */

var hurtboxColours = exports.hurtboxColours = [(0, _makeColour.makeColour)(255, 237, 70, 0.6), (0, _makeColour.makeColour)(42, 57, 255, 0.6), (0, _makeColour.makeColour)(54, 255, 37, 0.6)];
var twoPi = exports.twoPi = Math.PI * 2;

var lostStockQueue = exports.lostStockQueue = [];
function rotateVector(vecx, vecy, ang) {
    return new _Vec2D.Vec2D(vecx * Math.cos(ang) - vecy * Math.sin(ang), vecx * Math.sin(ang) + vecy * Math.cos(ang));
}

function drawArrayPathCompress(can, col, face, tX, tY, path, scaleX, scaleY, rotate, rpX, rpY, extra) {
    can.save();
    if (extra !== undefined) {
        extra();
    }
    can.translate(tX - rpX, tY - rpY);
    can.rotate(rotate);

    can.fillStyle = col;
    can.beginPath();
    // for each shape
    if (path !== undefined && path !== null && path.length !== undefined) {

        for (var j = 0; j < path.length; j++) {
            // first 2 numbers are starting vector points
            var x = path[j][0] * scaleX * face + rpX;
            var y = path[j][1] * scaleY + rpY;
            can.moveTo(x, y);
            // starting from index 2, each set of 6 numbers are bezier curve coords
            for (var k = 2; k < path[j].length; k += 6) {
                can.bezierCurveTo(path[j][k] * scaleX * face + rpX, path[j][k + 1] * scaleY + rpY, path[j][k + 2] * scaleX * face + rpX, path[j][k + 3] * scaleY + rpY, path[j][k + 4] * scaleX * face + rpX, path[j][k + 5] * scaleY + rpY);
            }
        }
    }
    can.closePath();
    can.fill();
    can.restore();
}

function renderPlayer(i) {
    var temX = _main.player[i].phys.pos.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0];
    var temY = _main.player[i].phys.pos.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1];
    var face = _main.player[i].phys.face;
    var frame = Math.floor(_main.player[i].timer);
    if (frame == 0) {
        frame = 1;
    }
    if (frame > _characters.framesData[_main.characterSelections[i]][_main.player[i].actionState]) {
        frame = _characters.framesData[_main.characterSelections[i]][_main.player[i].actionState];
    }
    if (animations[_main.characterSelections[i]][_main.player[i].actionState] === undefined) {
        return;
    }
    if (animations[_main.characterSelections[i]][_main.player[i].actionState][frame - 1] === undefined) {
        return;
    }

    var model = animations[_main.characterSelections[i]][_main.player[i].actionState][frame - 1];

    if (_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].reverseModel) {
        face *= -1;
    } else if (_main.player[i].actionState == "TILTTURN") {
        if (frame > 5) {
            face *= -1;
        }
    } else if (_main.player[i].actionState == "RUNTURN") {
        if (frame > _main.player[i].charAttributes.runTurnBreakPoint) {
            face *= -1;
        }
    }
    // JiGGS MULTIJUMP TURN
    else if (_main.player[i].actionState.substring(0, _main.player[i].actionState.length - 1) == "AERIALTURN" && _main.player[i].timer > 5) {
            face *= -1;
        }
        // MARTH BAIR
        else if (_main.player[i].actionState == "ATTACKAIRB" && _main.characterSelections[i] == 0) {
                if (frame > 29) {
                    face *= -1;
                }
            }
            // FOX BTHROW
            else if (_main.player[i].actionState == "THROWBACK" && (_main.characterSelections[i] == 2 || _main.characterSelections[i] == 3)) {
                    if (frame >= 10) {
                        face *= -1;
                    }
                }

    if (!_actionStateShortcuts.actionStates[_main.characterSelections[i]][_main.player[i].actionState].dead) {
        var col;
        if (_main.player[i].phys.shielding && _main.player[i].phys.powerShielded && _main.player[i].hit.hitlag > 0) {
            col = "rgb(255,255,255)";
        } else if (_settings.gameSettings.flashOnLCancel && _main.player[i].actionState.substr(0, 10) == "LANDINGATT" && _main.player[i].phys.landingLagScaling == 2 && Math.round(_main.player[i].timer) % 3 == 0) {
            col = "rgb(255,255,255)";
        } else if (_main.player[i].phys.intangibleTimer % 9 > 3 || _main.player[i].phys.invincibleTimer % 9 > 3 || _main.player[i].hit.hitlag > 0) {
            col = _main.palettes[_main.pPal[i]][1];
        } else if (_main.player[i].phys.charging && _main.player[i].phys.chargeFrames % 9 > 3) {
            col = "rgb(252, 255, 91)";
        } else if (_main.player[i].actionState == "FURAFURA" && _main.player[i].timer % 30 < 6) {
            col = _main.palettes[_main.pPal[i]][3];
        } else if (_main.player[i].colourOverlayBool) {
            col = _main.player[i].colourOverlay;
        } else if (_main.player[i].shocked > 0) {
            var originalColour = _main.palettes[_main.pPal[i]][0];
            originalColour = originalColour.substr(4, originalColour.length - 5);
            var colourArray = originalColour.split(",");
            if (_main.player[i].shocked % 2) {
                var newCol = (0, _blendColours.blendColours)(colourArray, [14, 0, 131], 0.7);
            } else {
                var newCol = (0, _blendColours.blendColours)(colourArray, [255, 255, 255], 0.7);
            }
            col = "rgb(" + newCol[0] + "," + newCol[1] + "," + newCol[2] + ")";
        } else if (_main.player[i].burning > 0) {
            var originalColour = _main.palettes[_main.pPal[i]][0];
            originalColour = originalColour.substr(4, originalColour.length - 5);
            var colourArray = originalColour.split(",");
            var part = _main.player[i].burning % 3;
            if (part) {
                if (part == 1) {
                    var newCol = (0, _blendColours.blendColours)(colourArray, [253, 255, 161], 0.7);
                } else {
                    var newCol = (0, _blendColours.blendColours)(colourArray, [198, 57, 5], 0.7);
                }
                col = "rgb(" + newCol[0] + "," + newCol[1] + "," + newCol[2] + ")";
            } else {
                col = _main.palettes[_main.pPal[i]][0];
            }
        } else {
            col = _main.palettes[_main.pPal[i]][0];
        }
        if (_main.player[i].phys.chargeFrames % 4 == 3) {
            temX += 2;
        } else if (_main.player[i].phys.chargeFrames % 4 == 1) {
            temX -= 2;
        }
        if (temX > 1220 || temX < -20 || temY > 880 || temY < -30) {
            var pA = new _Vec2D.Vec2D(temX - 600, temY - 375);
            var pB = new _Vec2D.Vec2D(0, 0);
            var s = (pA.y - pB.y) / (pA.x - pB.x);
            if (-375 <= s * 600 && s * 600 <= 375) {
                if (pA.x > pB.x) {
                    _main.player[i].miniViewPoint = new _Vec2D.Vec2D(1150, s * 600 + 375);
                    _main.player[i].miniViewSide = 0;
                } else {
                    _main.player[i].miniViewPoint = new _Vec2D.Vec2D(50, -s * 600 + 375);
                    _main.player[i].miniViewSide = 1;
                }
                _main.player[i].miniView = true;
                _main.player[i].phys.outOfCameraTimer++;
            } else if (-600 <= 375 / s && 375 / s <= 600) {
                if (pA.y > pB.y) {
                    if (temX < 50) {
                        _main.player[i].miniViewPoint = new _Vec2D.Vec2D(50, 700);
                    } else if (temX > 1150) {
                        _main.player[i].miniViewPoint = new _Vec2D.Vec2D(1150, 700);
                    } else {
                        //player[i].miniViewPoint = new Vec2D(375/s+stage.offset[0],700);
                        _main.player[i].miniViewPoint = new _Vec2D.Vec2D(temX, 700);
                    }
                    _main.player[i].miniViewSide = 2;
                } else {
                    _main.player[i].miniViewPoint = new _Vec2D.Vec2D(-375 / s + _activeStage.activeStage.offset[0], 50);
                    _main.player[i].miniViewSide = 2;
                }
                _main.player[i].miniView = true;
                _main.player[i].phys.outOfCameraTimer++;
            } else {
                _main.player[i].miniView = false;
                _main.player[i].phys.outOfCameraTimer = 0;
            }
        } else {
            _main.player[i].miniView = false;
            _main.player[i].phys.outOfCameraTimer = 0;
        }
        if (_main.player[i].miniView && _main.player[i].actionState != "SLEEP") {
            _main.fg2.fillStyle = "black";
            _main.fg2.strokeStyle = _main.palettes[_main.pPal[i]][0];
            _main.fg2.beginPath();
            _main.fg2.arc(_main.player[i].miniViewPoint.x, _main.player[i].miniViewPoint.y, 35, twoPi, 0);
            _main.fg2.fill();
            _main.fg2.lineWidth = 6;
            _main.fg2.stroke();
            _main.fg2.lineWidth = 1;

            drawArrayPathCompress(_main.fg2, col, face, _main.player[i].miniViewPoint.x, _main.player[i].miniViewPoint.y + 30, model, _main.player[i].charAttributes.miniScale, _main.player[i].charAttributes.miniScale, _main.player[i].rotation, _main.player[i].rotationPoint.x, _main.player[i].rotationPoint.y);
        } else {
            if (_main.player[i].actionState == "ENTRANCE") {
                drawArrayPathCompress(_main.fg2, col, face, temX, temY, model, _main.player[i].charAttributes.charScale * (_activeStage.activeStage.scale / 4.5), Math.min(_main.player[i].charAttributes.charScale, _main.player[i].charAttributes.charScale * (1.5 - _main.startTimer)) * (_activeStage.activeStage.scale / 4.5), _main.player[i].rotation, _main.player[i].rotationPoint.x, _main.player[i].rotationPoint.y);
            } else {
                drawArrayPathCompress(_main.fg2, col, face, temX, temY, model, _main.player[i].charAttributes.charScale * (_activeStage.activeStage.scale / 4.5), _main.player[i].charAttributes.charScale * (_activeStage.activeStage.scale / 4.5), _main.player[i].rotation, _main.player[i].rotationPoint.x, _main.player[i].rotationPoint.y);
            }
        }
    }
    if (_main.player[i].phys.shielding) {
        if (!(_main.player[i].phys.powerShielded && _main.player[i].hit.hitlag > 0)) {
            var sX = _main.player[i].phys.shieldPositionReal.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0];
            var sY = _main.player[i].phys.shieldPositionReal.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1];
            var sCol = _main.palettes[_main.pPal[i]][2];
            if (Math.floor(_main.player[i].hit.shieldstun) > 0) {
                sCol = _main.palettes[_main.pPal[i]][4];
            }
            _main.fg2.fillStyle = sCol + 0.6 * _main.player[i].phys.shieldAnalog + ")";
            _main.fg2.beginPath();
            _main.fg2.arc(sX, sY, _main.player[i].phys.shieldSize * _activeStage.activeStage.scale, twoPi, 0);
            _main.fg2.fill();
        }
    }
    if (_main.hasTag[i]) {
        _main.fg2.fillStyle = (0, _makeColour.makeColour)(0, 0, 0, 0.5);
        _main.fg2.strokeStyle = _main.palettes[_main.pPal[i]][0];
        var size = 10 * _main.tagText[i].length;
        _main.fg2.fillRect(temX - size / 2, temY - 130 * (_activeStage.activeStage.scale / 4.5), size, 20);
        _main.fg2.strokeRect(temX - size / 2, temY - 130 * (_activeStage.activeStage.scale / 4.5), size, 20);
        _main.fg2.font = "13px Lucida Console, monaco, monospace";
        _main.fg2.textAlign = "center";
        _main.fg2.fillStyle = "white";
        _main.fg2.fillText(_main.tagText[i], temX, temY + 15 - 130 * (_activeStage.activeStage.scale / 4.5));
        _main.fg2.fillStyle = _main.palettes[_main.pPal[i]][0];
        _main.fg2.beginPath();
        _main.fg2.moveTo(temX - 8, temY + 20 - 130 * (_activeStage.activeStage.scale / 4.5));
        _main.fg2.lineTo(temX + 8, temY + 20 - 130 * (_activeStage.activeStage.scale / 4.5));
        _main.fg2.lineTo(temX, temY + 28 - 130 * (_activeStage.activeStage.scale / 4.5));
        _main.fg2.closePath();
        _main.fg2.fill();
        _main.fg2.textAlign = "start";
    }
    if (_main.player[i].actionState == "REBIRTH" || _main.player[i].actionState == "REBIRTHWAIT") {
        _main.fg2.fillStyle = _main.palettes[_main.pPal[i]][1];
        _main.fg2.strokeStyle = _main.palettes[_main.pPal[i]][0];
        _main.fg2.beginPath();
        _main.fg2.moveTo(temX + 18 * (_activeStage.activeStage.scale / 4.5), temY + 13.5 * (_activeStage.activeStage.scale / 4.5));
        _main.fg2.lineTo(temX + 31.5 * (_activeStage.activeStage.scale / 4.5), temY);
        _main.fg2.lineTo(temX - 31.5 * (_activeStage.activeStage.scale / 4.5), temY);
        _main.fg2.lineTo(temX - 18 * (_activeStage.activeStage.scale / 4.5), temY + 13.5 * (_activeStage.activeStage.scale / 4.5));
        _main.fg2.closePath();
        _main.fg2.fill();
        _main.fg2.stroke();
    }
    if (_main.player[i].showLedgeGrabBox) {
        _main.fg2.strokeStyle = "#4478ff";
        _main.fg2.strokeRect(_main.player[i].phys.ledgeSnapBoxF.min.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _main.player[i].phys.ledgeSnapBoxF.min.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], 14 * _activeStage.activeStage.scale, 10 * _activeStage.activeStage.scale);
        _main.fg2.strokeStyle = "#ff4444";
        _main.fg2.strokeRect(_main.player[i].phys.ledgeSnapBoxB.min.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _main.player[i].phys.ledgeSnapBoxB.min.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], 14 * _activeStage.activeStage.scale, 10 * _activeStage.activeStage.scale);
    }
    if (_main.player[i].showECB) {
        _main.fg2.fillStyle = "#ff8d2f";
        _main.fg2.beginPath();
        _main.fg2.moveTo(_main.player[i].phys.ECB1[0].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _main.player[i].phys.ECB1[0].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
        _main.fg2.lineTo(_main.player[i].phys.ECB1[1].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _main.player[i].phys.ECB1[1].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
        _main.fg2.lineTo(_main.player[i].phys.ECB1[2].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _main.player[i].phys.ECB1[2].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
        _main.fg2.lineTo(_main.player[i].phys.ECB1[3].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _main.player[i].phys.ECB1[3].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
        _main.fg2.closePath();
        _main.fg2.fill();
        _main.fg2.strokeStyle = "white";
        _main.fg2.beginPath();
        _main.fg2.moveTo(_main.player[i].phys.ECBp[0].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _main.player[i].phys.ECBp[0].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
        _main.fg2.lineTo(_main.player[i].phys.ECBp[1].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _main.player[i].phys.ECBp[1].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
        _main.fg2.lineTo(_main.player[i].phys.ECBp[2].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _main.player[i].phys.ECBp[2].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
        _main.fg2.lineTo(_main.player[i].phys.ECBp[3].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _main.player[i].phys.ECBp[3].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
        _main.fg2.closePath();
        _main.fg2.stroke();
        _main.fg2.beginPath();
        _main.fg2.moveTo(temX, temY - 6);
        _main.fg2.lineTo(temX, temY + 6);
        _main.fg2.closePath();
        _main.fg2.stroke();
        _main.fg2.beginPath();
        _main.fg2.moveTo(temX + 6, temY);
        _main.fg2.lineTo(temX - 6, temY);
        _main.fg2.closePath();
        _main.fg2.stroke();
    }
    if (_main.player[i].showHitbox) {
        _main.fg2.fillStyle = hurtboxColours[_main.player[i].phys.hurtBoxState];
        _main.fg2.fillRect(_main.player[i].phys.hurtbox.min.x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _main.player[i].phys.hurtbox.min.y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], _main.player[i].charAttributes.hurtboxOffset[0] * 2 * _activeStage.activeStage.scale, _main.player[i].charAttributes.hurtboxOffset[1] * _activeStage.activeStage.scale);
        _main.fg2.fillStyle = (0, _makeColour.makeColour)(255, 29, 29, 0.69);
        for (var j = 0; j < 4; j++) {
            switch (j) {
                case 0:
                    _main.fg2.fillStyle = (0, _makeColour.makeColour)(255, 29, 29, 0.69);
                    _main.fg2.strokeStyle = (0, _makeColour.makeColour)(255, 126, 126, 0.69);
                    break;
                case 1:
                    _main.fg2.fillStyle = (0, _makeColour.makeColour)(47, 255, 29, 0.69);
                    _main.fg2.strokeStyle = (0, _makeColour.makeColour)(126, 252, 115, 0.69);
                    break;
                case 2:
                    _main.fg2.fillStyle = (0, _makeColour.makeColour)(29, 208, 255, 0.69);
                    _main.fg2.strokeStyle = (0, _makeColour.makeColour)(117, 226, 255, 0.69);
                    break;
                case 3:
                    _main.fg2.fillStyle = (0, _makeColour.makeColour)(203, 29, 255, 0.69);
                    _main.fg2.strokeStyle = (0, _makeColour.makeColour)(216, 116, 246, 0.69);
                    break;
                default:
                    break;
            }
            if (_main.player[i].hitboxes.active[j]) {
                var offset = _main.player[i].hitboxes.id[j].offset[_main.player[i].hitboxes.frame];
                if (_main.player[i].actionState == "DAMAGEFLYN") {
                    offset = _main.player[i].hitboxes.id[j].offset[0];
                }
                _main.fg2.beginPath();
                _main.fg2.arc((offset.x * _main.player[i].phys.face + _main.player[i].phys.pos.x) * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], (offset.y + _main.player[i].phys.pos.y) * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], _main.player[i].hitboxes.id[j].size * _activeStage.activeStage.scale, Math.PI * 2, 0);
                _main.fg2.fill();
                if (_main.player[i].phys.prevFrameHitboxes.active[j]) {
                    var offset = _main.player[i].phys.prevFrameHitboxes.id[j].offset[_main.player[i].phys.prevFrameHitboxes.frame];
                    if (_main.player[i].actionState == "DAMAGEFLYN") {
                        offset = _main.player[i].phys.prevFrameHitboxes.id[j].offset[0];
                    }
                    _main.fg2.beginPath();
                    _main.fg2.arc((offset.x * _main.player[i].phys.facePrev + _main.player[i].phys.posPrev.x) * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], (offset.y + _main.player[i].phys.posPrev.y) * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1], _main.player[i].phys.prevFrameHitboxes.id[j].size * _activeStage.activeStage.scale, Math.PI * 2, 0);
                    _main.fg2.fill();

                    //console.log(player[i].phys.interPolatedHitbox[j]);
                    _main.fg2.beginPath();
                    _main.fg2.moveTo(_main.player[i].phys.interPolatedHitbox[j][0].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _main.player[i].phys.interPolatedHitbox[j][0].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
                    _main.fg2.lineTo(_main.player[i].phys.interPolatedHitbox[j][1].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _main.player[i].phys.interPolatedHitbox[j][1].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
                    _main.fg2.lineTo(_main.player[i].phys.interPolatedHitbox[j][2].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _main.player[i].phys.interPolatedHitbox[j][2].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
                    _main.fg2.lineTo(_main.player[i].phys.interPolatedHitbox[j][3].x * _activeStage.activeStage.scale + _activeStage.activeStage.offset[0], _main.player[i].phys.interPolatedHitbox[j][3].y * -_activeStage.activeStage.scale + _activeStage.activeStage.offset[1]);
                    _main.fg2.closePath();
                    _main.fg2.fill();
                    _main.fg2.stroke();
                }
            }
        }
    }
}
function renderOverlay(showStock) {

    // stocks, percent, timer
    _main.fg2.strokeStyle = "black";
    if (!_main.versusMode || _main.gameMode == 5) {
        _main.fg2.fillStyle = "white";
        _main.fg2.lineWidth = 2;
        _main.fg2.font = "900 40px Arial";
        _main.fg2.textAlign = "center";
        var min = Math.floor(_main.matchTimer / 60).toString();
        var sec = (_main.matchTimer % 60).toFixed(2);
        _main.fg2.fillText((min.length < 2 ? "0" + min : min) + ":" + (sec.length < 5 ? "0" + sec[0] : sec[0] + sec[1]), 590, 70);
        _main.fg2.strokeText((min.length < 2 ? "0" + min : min) + ":" + (sec.length < 5 ? "0" + sec[0] : sec[0] + sec[1]), 590, 70);
        _main.fg2.font = "900 25px Arial";
        _main.fg2.fillText(sec.length < 5 ? sec[2] + sec[3] : sec[3] + sec[4], 670, 70);
        _main.fg2.strokeText(sec.length < 5 ? sec[2] + sec[3] : sec[3] + sec[4], 670, 70);
    }
    if (showStock) {
        _main.fg2.font = "900 53px Arial";
        _main.fg2.lineWidth = _main.holiday == 1 ? 3 : 2;
        _main.fg2.textAlign = "end";
        _main.fg2.save();
        _main.fg2.scale(0.8, 1);
        for (var i = 0; i < 4; i++) {
            if (_main.playerType[i] > -1) {
                _main.fg2.fillStyle = "rgb(255," + Math.max(255 - _main.player[i].percent, 0) + ", " + Math.max(255 - _main.player[i].percent, 0) + ")";
                _main.fg2.fillText(Math.floor(_main.player[i].percent) + "%", (450 + i * 145 + _main.player[i].percentShake.x) * 1.25, 670 + _main.player[i].percentShake.y);
                _main.fg2.strokeText(Math.floor(_main.player[i].percent) + "%", (450 + i * 145 + _main.player[i].percentShake.x) * 1.25, 670 + _main.player[i].percentShake.y);
            }
        }
        _main.fg2.restore();
        for (var i = 0; i < 4; i++) {
            if (_main.playerType[i] > -1) {
                _main.fg2.fillStyle = _main.palettes[_main.pPal[i]][0];
                for (var j = 0; j < _main.player[i].stocks; j++) {
                    _main.fg2.beginPath();
                    _main.fg2.arc(337 + i * 145 + j * 30, 600, 12, 0, twoPi);
                    _main.fg2.closePath();
                    _main.fg2.fill();
                    _main.fg2.stroke();
                }
            }
        }
        var lostStockPopQueue = [];
        _main.fg2.fillStyle = "white";
        _main.fg2.strokeStyle = "white";
        for (var i = 0; i < lostStockQueue.length; i++) {
            lostStockQueue[i][2]++;
            if (lostStockQueue[i][2] > 20) {
                lostStockPopQueue.push(i);
            } else {
                _main.fg2.save();
                _main.fg2.translate(337 + lostStockQueue[i][0] * 145 + lostStockQueue[i][1] * 30 - 2, 600 - 2);
                _main.fg2.fillRect(lostStockQueue[i][2], 0, 4, 4);
                _main.fg2.fillRect(lostStockQueue[i][2], lostStockQueue[i][2], 4, 4);
                _main.fg2.fillRect(-lostStockQueue[i][2], lostStockQueue[i][2], 4, 4);
                _main.fg2.fillRect(lostStockQueue[i][2], -lostStockQueue[i][2], 4, 4);
                _main.fg2.fillRect(-lostStockQueue[i][2], -lostStockQueue[i][2], 4, 4);
                _main.fg2.fillRect(-lostStockQueue[i][2], 0, 4, 4);
                _main.fg2.fillRect(0, lostStockQueue[i][2], 4, 4);
                _main.fg2.fillRect(0, -lostStockQueue[i][2], 4, 4);
                _main.fg2.beginPath();
                _main.fg2.arc(2, 2, lostStockQueue[i][2] / 2, 0, twoPi);
                _main.fg2.closePath();
                _main.fg2.stroke();
                _main.fg2.restore();
            }
        }
        for (var k = 0; k < lostStockPopQueue.length; k++) {
            lostStockQueue.splice(lostStockPopQueue[k] - k, 1);
        }
        _main.fg2.textAlign = "start";
    }
}
function setLostStockQueue(index, val) {
    lostStockQueue[index] = val;
}

function renderForeground() {
    // pause UI
    _main.fg2.textAlign = "start";
    _main.fg2.fillStyle = "#8e8e8e";
    _main.fg2.save();
    _main.fg2.fillRect(45, 48, 300, 24);
    _main.fg2.fillStyle = "#3724a6";
    _main.fg2.fillRect(60, 50, 50, 20);
    _main.fg2.beginPath();
    _main.fg2.arc(60, 60, 10, 0, twoPi);
    _main.fg2.closePath();
    _main.fg2.fill();
    _main.fg2.beginPath();
    _main.fg2.arc(110, 60, 10, 0, twoPi);
    _main.fg2.closePath();
    _main.fg2.fill();
    _main.fg2.restore();
    _main.fg2.save();
    _main.fg2.translate(950, 650);
    _main.fg2.fillRect(0, 0, 8, 45);
    _main.fg2.fillRect(0, 25, 200, 20);
    _main.fg2.fillRect(192, 0, 8, 45);
    _main.fg2.fillRect(0, 0, 12, 4);
    _main.fg2.fillRect(188, 0, 12, 4);
    var xPos = 54;
    for (var j = 0; j < 3; j++) {
        _main.fg2.fillRect(xPos - 2, -6, 4, 12);
        _main.fg2.fillRect(xPos - 6, -2, 12, 4);
        xPos += 46;
    }
    _main.fg2.beginPath();
    _main.fg2.arc(169, 2, 12, 0, twoPi);
    _main.fg2.closePath();
    _main.fg2.fill();
    _main.fg2.fillStyle = "#21792f";
    _main.fg2.beginPath();
    _main.fg2.arc(123, 2, 15, 0, twoPi);
    _main.fg2.closePath();
    _main.fg2.fill();
    _main.fg2.fillStyle = "#9a2622";
    _main.fg2.beginPath();
    _main.fg2.arc(40, 62, 12, 0, twoPi);
    _main.fg2.closePath();
    _main.fg2.fill();
    _main.fg2.fillStyle = "#636363";
    _main.fg2.beginPath();
    _main.fg2.arc(31, 2, 15, 0.8 * Math.PI, twoPi);
    _main.fg2.closePath();
    _main.fg2.fill();
    _main.fg2.beginPath();
    _main.fg2.arc(77, 2, 15, twoPi / 2, 0.2 * Math.PI);
    _main.fg2.closePath();
    _main.fg2.fill();
    //ui.fillRect(20,59,4,12)
    _main.fg2.fillRect(14, 55, 4, 12);
    _main.fg2.fillRect(10, 59, 12, 4);
    _main.fg2.fillRect(60, 52, 140, 20);
    _main.fg2.fillStyle = "black";
    _main.fg2.font = "800 20px Arial";
    _main.fg2.fillText("S", 158, 8);
    _main.fg2.fillText("B", 32, 70);
    _main.fg2.fillText("Z", -872, -583);
    _main.fg2.font = "800 17px Arial";
    _main.fg2.fillText("T", 170, 9);
    _main.fg2.scale(1.2, 1);
    _main.fg2.font = "900 24px Arial";
    _main.fg2.fillText("RESET", 72, 43);
    _main.fg2.fillText("L", 17, 7);
    _main.fg2.fillText("R", 56, 7);
    _main.fg2.fillText("A", 93, 9);
    _main.fg2.font = "900 20px Arial";
    _main.fg2.fillText("RUNBACK", 53, 70);
    _main.fg2.font = "900 18px Arial";
    _main.fg2.fillText("FRAME ADVANCE", -685, -584);
    _main.fg2.restore();
}
function resetLostStockQueue() {
    exports.lostStockQueue = lostStockQueue = [];
}

//////////////////
// WEBPACK FOOTER
// ./src/main/render.js
// module id = 13
// module chunks = 1
//# sourceURL=webpack:///./src/main/render.js?