"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveHitbox = ActiveHitbox;
exports.createHitboxes = createHitboxes;
exports.physicsObject = physicsObject;
exports.inputObject = inputObject;
exports.playerObject = playerObject;

var _characters = __webpack_require__(119);

var _Vec2D = __webpack_require__(22);

var _Box2D = __webpack_require__(21);

/* eslint-disable */

function ActiveHitbox(size, offset, dmg, angle, kg, bk, sk, type) {
  this.size = size;
  this.offset = offset;
  this.dmg = dmg;
  this.angle = angle;
  this.kg = kg;
  this.bk = bk;
  this.sk = sk;
  this.type = type;
}
function createHitboxes() {
  this.active = [false, false, false, false];
  this.frame = 0;
  this.id = [new ActiveHitbox(0, new _Vec2D.Vec2D(0, 0), 0, 0, 0, 0, 0, 0), new ActiveHitbox(0, new _Vec2D.Vec2D(0, 0), 0, 0, 0, 0, 0, 0), new ActiveHitbox(0, new _Vec2D.Vec2D(0, 0), 0, 0, 0, 0, 0, 0), new ActiveHitbox(0, new _Vec2D.Vec2D(0, 0), 0, 0, 0, 0, 0, 0)];
  this.hitList = [];
}
function physicsObject(pos, face) {
  this.cVel = new _Vec2D.Vec2D(0, 0);
  this.kVel = new _Vec2D.Vec2D(0, 0);
  this.kDec = new _Vec2D.Vec2D(0, 0);
  this.pos = new _Vec2D.Vec2D(pos[0], pos[1]);
  this.posPrev = new _Vec2D.Vec2D(0, 0);
  this.posDelta = new _Vec2D.Vec2D(0, 0);
  this.grounded = false;
  this.airborneTimer = 0;
  this.fastfalled = false;
  this.face = face;
  this.ECBp = [new _Vec2D.Vec2D(0, 0), new _Vec2D.Vec2D(3, 7), new _Vec2D.Vec2D(0, 14), new _Vec2D.Vec2D(-3, 7)];
  this.ECB1 = [new _Vec2D.Vec2D(0, 0), new _Vec2D.Vec2D(3, 7), new _Vec2D.Vec2D(0, 14), new _Vec2D.Vec2D(-3, 7)];
  this.ECB2 = [new _Vec2D.Vec2D(0, 0), new _Vec2D.Vec2D(3, 7), new _Vec2D.Vec2D(0, 14), new _Vec2D.Vec2D(-3, 7)];
  this.onSurface = [0, 0];
  this.doubleJumped = false;
  this.shieldHP = 60;
  this.shieldSize = 0;
  this.shieldAnalog = 0;
  this.shielding = false;
  this.shieldPosition = new _Vec2D.Vec2D(0, 0);
  this.shieldPosition = new _Vec2D.Vec2D(0, 0);
  this.shieldPositionReal = new _Vec2D.Vec2D(0, 0);
  this.shieldPositionReal = new _Vec2D.Vec2D(0, 0);
  this.shieldStun = 0;
  this.powerShieldActive = false;
  this.powerShieldReflectActive = false;
  this.powerShielded = false;
  this.onLedge = -1;
  this.ledgeSnapBoxF = new _Box2D.Box2D([0, 5], [8, 10]);
  this.ledgeSnapBoxB = new _Box2D.Box2D([0, 5], [-8, 10]);
  this.ledgeRegrabTimeout = 0;
  this.ledgeRegrabCount = false;
  this.hurtbox = new _Box2D.Box2D([-4, 18], [4, 0]);
  this.hurtBoxState = 0;
  this.intangibleTimer = 0;
  this.invincibleTimer = 0;
  this.lCancel = false;
  this.lCancelTimer = 0;
  this.autoCancel = false;
  this.landingLagScaling = 1;
  this.passFastfall = false;
  this.jabCombo = false;
  this.sideBJumpFlag = true;
  this.charging = false;
  this.chargeFrames = 0;
  this.stuckTimer = 0;
  this.techTimer = 0;
  this.grabbedBy = -1;
  this.grabbing = -1;
  this.dashbuffer = false;
  this.jumpType = 0;
  this.jumpSquatType = 0;
  this.wallJumpTimer = 254;
  this.canWallJump = false;
  this.upbAngleMultiplier = 0;
  this.thrownHitbox = false;
  this.thrownHitboxOwner = -1;
  this.landingMultiplier = 15;
  this.wallJumpCount = 0;
  this.prevFrameHitboxes = new createHitboxes();
  this.interPolatedHitbox = [];
  this.interPolatedHitboxPhantom = [];
  this.isInterpolated = false;
  this.facePrev = 1;
  this.jumpsUsed = 0;
  this.releaseFrame = 0;
  this.vCancelTimer = 0;
  this.shoulderLockout = 0;
  this.inShine = 0;
  this.jabReset = false;
  this.outOfCameraTimer = 0;
  this.rollOutDistance = 0;
  this.bTurnaroundTimer = 0;
  this.bTurnaroundDirection = 1;
  this.groundAngle = Math.PI / 2;
  this.raptorBoost = false;
}
function inputObject() {

  this.lsX = [0, 0, 0, 0, 0, 0, 0, 0];
  this.lsY = [0, 0, 0, 0, 0, 0, 0, 0];
  this.rawX = [0, 0, 0, 0, 0, 0, 0, 0];
  this.rawY = [0, 0, 0, 0, 0, 0, 0, 0];
  this.csX = [0, 0, 0, 0, 0, 0, 0, 0];
  this.csY = [0, 0, 0, 0, 0, 0, 0, 0];
  this.lA = [0, 0, 0, 0, 0, 0, 0, 0];
  this.rA = [0, 0, 0, 0, 0, 0, 0, 0];
  this.s = [false, false, false, false, false, false, false, false];
  this.z = [false, false, false, false, false, false, false, false];
  this.a = [false, false, false, false, false, false, false, false];
  this.b = [false, false, false, false, false, false, false, false];
  this.x = [false, false, false, false, false, false, false, false];
  this.y = [false, false, false, false, false, false, false, false];
  this.r = [false, false, false, false, false, false, false, false];
  this.l = [false, false, false, false, false, false, false, false];
  this.dl = [false, false, false, false, false, false, false];
  this.dd = [false, false, false, false, false, false, false];
  this.dr = [false, false, false, false, false, false, false];
  this.du = [false, false, false, false, false, false, false];
}
function playerObject(character, pos, face) {
  this.phys = new physicsObject(pos, face);
  this.actionState = "ENTRANCE";
  this.prevActionState = "";
  this.timer = 0;
  this.charAttributes = _characters.chars[character].attributes;
  this.charHitboxes = _characters.chars[character].hitboxes;
  this.showLedgeGrabBox = false;
  this.showECB = false;
  this.showHitbox = false;
  this.spawnWaitTime = 0;
  this.hitboxes = new createHitboxes();
  this.hit = {
    knockback: 0,
    hitlag: 0,
    hitstun: 0,
    angle: 0,
    hitPoint: new _Vec2D.Vec2D(0, 0),
    powershield: false,
    shieldstun: 0
  };
  this.percent = 0;
  this.stocks = 4;
  this.miniView = false;
  this.miniViewPoint = new _Vec2D.Vec2D(0, 0);
  this.inCSS = true;
  this.furaLoopID = 0;
  this.percentShake = new _Vec2D.Vec2D(0, 0);
  this.shineLoop = 0;
  this.laserCombo = false;
  this.rotation = 0;
  this.rotationPoint = new _Vec2D.Vec2D(0, 0);
  this.colourOverlay = "";
  this.colourOverlayBool = false;
  this.currentAction = "NONE";
  this.currentSubaction = "NONE";
  this.difficulty = 4;
  this.lastMash = 0;
  this.hasHit = false;
  this.shocked = 0;
  this.burning = 0;
}

//////////////////
// WEBPACK FOOTER
// ./src/main/player.js
// module id = 122
// module chunks = 1
//# sourceURL=webpack:///./src/main/player.js?