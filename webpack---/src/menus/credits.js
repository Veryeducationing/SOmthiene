"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollingText = ScrollingText;
exports.credits = credits;
exports.drawCreditsInit = drawCreditsInit;
exports.cStar = cStar;
exports.cShot = cShot;
exports.drawCreditsInfo = drawCreditsInfo;
exports.drawCredits = drawCredits;

var _main = __webpack_require__(11);

var _sfx = __webpack_require__(120);

var _Vec2D = __webpack_require__(22);

/* eslint-disable */

var twoPi = Math.PI * 2;
//scrolling top down
var shoot_cooldown = 0;
var initc = true; //whether or not credits should be initialized. Should be set to true every time credits is activated
var cXSize = 1200; //not real values. Please update with real values of the size of the canvas
var cYSize = 750; //To consider when setting the cYSize. make room for bar at bottom showing information of that person?
//Current bar at bottom of screen is 50 pixels tall. Fill that shit out yourself.
var cScore = 0;
var cBoundX = cXSize * 1.2098; //credits stick bounding octagon roughly circumscribes canvas size square
var cBoundY = cYSize * 1.2098;
var cRectLength = 25;
var cRectSpace = 10;
var cDefaultAngles = [0, .5 * Math.PI, Math.PI, 1.5 * Math.PI];
var cCursorAngle = 0;
var cXPos = cXSize / 2;
var cYPos = cYSize / 2;
var cPlayerXPos = cXSize / 2;
var cPlayerYPos = cYSize / 2;
var cScrollingPos = 0;
var cShootBuffer = false;
var cScrollingMax = 5000; // max scrolling distance in y coords. Can change this when you want more names or w/e
var cScrollingSpeed = -2; //y pos per frame?             SEE THIS: maybe mess around with this a little. make it faster / slower
var lastHit = [0, 0, false]; //[timer,index of creditNames] timer is set whenever you hit a credit and counts down every frame. if it reaches 0, information is no longer displayed.
//lasthit[2] is for whether or not bottom bar is cleared.
var currentLaserColor = 0; //laser color vars
var laserColors = ["rgb(255, 15, 5)", "rgb(15, 5, 255)", "rgb(5, 255, 15)", "rgb(255, 85, 3)"];
var laserColor = laserColors[currentLaserColor];

function ScrollingText(text, yPos, position, information) {
  this.Text = text;
  this.xPos = Math.floor(Math.random() * Math.round(cXSize * 0.5) + cXSize * .25);
  this.yPos = yPos;
  this.fontSize = 36;
  //this.fontSize = fontSize; //font should always be Consolas. Font size IS 36px
  this.position = position; //position in development
  this.information = information; //more information?
  this.isShot = false; //whether or not it has been shot
  this.xMax = Math.floor(Math.random() * 150 + 50);
  this.xVal = 0;
  this.xDirection = Math.floor(Math.random() + 1);
  this.canRender = false;
  this.size = function () {
    return [[this.xPos, this.xPos + 20 * this.Text.length], [this.yPos - 23, this.yPos]]; //returns [[xMin,xMax],[yMin,yMax]]
  };
  this.checkIfShouldRender = function (cY) {
    //                      SEE PLEASE?:  takes cYPos. if it can actually access that variable inside this scope, remove arguments.
    var size = this.size();
    if (size[1][0] < cY && size[1][1] > 0) {
      //can render
      this.canRender = true;
    } else {
      this.canRender = false;
    }
  };
  this.isHovering = function (x, y) {
    var size = this.size();
    if (x >= size[0][0] && x <= size[0][1] && y >= size[1][0] && y <= size[1][1]) {
      return true;
    }
    return false;
  };
  this.checkIfShot = function (x, y) {
    //updates this.isShot respectively
    if (this.isShot == false) {
      if (this.isHovering(x, y)) {
        this.isShot = true;
        return true;
      } else {
        return false;
      }
    } else {
      return false; //can't be shot twice
    }
  };
  this.scrollY = function (y) {
    if (this.xVal == this.xMax && this.xDirection == 1) {
      this.xDirection = 0;
    } else if (this.xVal == -1 * this.xMax && this.xDirection == 0) {
      this.xDirection = 1;
    }
    this.xPos += -1 + 2 * this.xDirection;
    this.xVal += -1 + 2 * this.xDirection;
    this.yPos += y;
  };
}

var creditNames = []; //list of scrollingText objects SEE PLEASE:                FILL THIS SHIT IN

//font MUST be Courier because its a monospaced font and every letter in it is the same width. Wouldn't be able to calculate size without it
function credits(p, input) {
  //called once every frame

  if (input[p][0].x && !input[p][1].x) {
    currentLaserColor = currentLaserColor === laserColors.length - 1 ? 0 : currentLaserColor + 1;
    laserColor = laserColors[currentLaserColor];
  }
  if (input[p][0].y && !input[p][1].y) {
    currentLaserColor = currentLaserColor === 0 ? laserColors.length - 1 : currentLaserColor - 1;
    laserColor = laserColors[currentLaserColor];
  }
  if (initc) {
    cScrollingPos = 0;
    lastHit = [0, 0, false]; //see notes above
    creditNames = [new ScrollingText("Schmoo", 800, "Creator, Main Developer", "Made the game."), new ScrollingText("Tatatat0", 1100, "Programmer", "Created the AI and credits."), new ScrollingText("bites", 1400, "Animation Assistant, Level Design", "Helped develop animation process & designed target stages."), new ScrollingText("shf", 1700, "Programmer, Mathematician", "Input conversion and environmental collision."), new ScrollingText("Nehgromancer", 2000, "Programmer", "Refactoring and networking."), new ScrollingText("BonesMalones", 2300, "Programmer", "Refactoring and optimization."), new ScrollingText("TJohnW", 2400, "Programmer", "Refactoring and code quality."), new ScrollingText("WwwWario", 2700, "Support", "Helping users troubleshoot and being a homie!"), new ScrollingText("Mrjhrock2010", 3000, "Support", "Helping people out and trash talking in netplay."), new ScrollingText("zircon", 3300, "Musician", "Smash Superstars (Menu Theme)"), new ScrollingText("Buoy", 3600, "Musician", "Rush of the Rainforest (YStory Theme) & Target Blitz (Target Theme)"), new ScrollingText("Tom Mauritzon", 3900, "Musician", "Mega Helix (PStadium Theme)"), new ScrollingText("Rozen", 4200, "Musician", "Kumite (Battlefield Theme)"), new ScrollingText("Zack Parrish", 4500, "Musician", "Sunny Side Up (Dreamland Theme)")];
    cScore = 0;
    cShootBuffer = false;
    cCursorAngle = 0;
    initc = false;
  }
  //cScore = 9;

  if (cCursorAngle >= 360) {
    cCursorAngle = 0;
  }
  cScrollingPos -= cScrollingSpeed;
  var yDif = 0;
  if (input[p][0].s === true || input[p][0].l === true || input[p][0].r === true) {
    //is holding down start. Should increase speed
    cCursorAngle += 4.5;
    yDif = Math.round(cScrollingSpeed * 1.5);
  } else {
    cCursorAngle += 3;
    yDif = Math.round(cScrollingSpeed);
  }
  // iterate through creditNames and change y pos based on y dif
  for (var i = 0; i < creditNames.length; i++) {
    creditNames[i].scrollY(yDif); //scrolls credit names
    creditNames[i].checkIfShouldRender(cYSize); //updates render state
  }
  //draw credit information
  if (lastHit[0] > 0) {
    lastHit[0] -= 1;
  } else {
    //credit information timer is up
    if (lastHit[2] == false) {
      //CLEAR BOTTOM BAR. Do this yourself.
      lastHit[2] = true;
    }
  }

  //l stick to pos
  cPlayerXPos = Math.round(cBoundX / 2 + input[p][0].rawX * (cBoundX / 2) - (cBoundX - cXSize) / 2);
  cPlayerYPos = Math.round(cBoundY / 2 + -1 * input[p][0].rawY * (cBoundY / 2) - (cBoundY - cYSize) / 2);
  //cast positions to canvas size
  if (cPlayerXPos < 0) {
    cPlayerXPos = 0;
  }
  if (cPlayerXPos > cXSize) {
    cPlayerXPos = cXSize;
  }
  if (cPlayerYPos < 0) {
    cPlayerYPos = 0;
  }
  if (cPlayerYPos > cYSize) {
    cPlayerYPos = cYSize;
  }

  if (shoot_cooldown == 0) {

    if (input[p][0].a && !input[p][1].a || cShootBuffer) {
      //is shooting
      _sfx.sounds.foxlaserfire.play();
      cShots.push(new cShot(new _Vec2D.Vec2D(cPlayerXPos, cPlayerYPos), new _Vec2D.Vec2D(0, 0), 0));
      cShots.push(new cShot(new _Vec2D.Vec2D(cPlayerXPos, cPlayerYPos), new _Vec2D.Vec2D(1200, 0), 1));
      shoot_cooldown = 8;
      cShootBuffer = false;
    }
  } else {
    if (input[p][0].a && !input[p][1].a) {
      cShootBuffer = true;
    }
    shoot_cooldown -= 1;
  }

  for (var n = 0; n < cShots.length; n++) {
    if (cShots[n].life == 15) {
      var madeShot = [false, 0];
      for (var _i = 0; _i < creditNames.length; _i++) {
        if (!creditNames[_i].isShot) {
          if (creditNames[_i].checkIfShot(cShots[n].target.x, 750 - cShots[n].target.y)) {
            madeShot = [true, _i];
          }
        }
      }
      if (madeShot[0]) {
        _sfx.sounds.targetBreak.play();
        lastHit[2] = false;
        lastHit[0] = 600;
        lastHit[1] = madeShot[1];
        cScore += 1;
        drawCreditsInfo();
      }
    }
  }

  if (cScrollingPos >= cScrollingMax) {
    if (cScore === creditNames.length) {
      _sfx.sounds.complete.play();
    } else {
      _sfx.sounds.failure.play();
    }
    initc = true;
    input[p][1].b = true;
    cShots = [];
    lastHit = [0, 0, false];
    creditNames = [];
    (0, _main.changeGamemode)(1);
  } else if (input[p][0].b && !input[p][1].b) {
    initc = true;
    _sfx.sounds.menuBack.play();
    input[p][1].b = true;
    cShots = [];
    lastHit = [0, 0, false];
    creditNames = [];
    (0, _main.changeGamemode)(1);
  }
}

function drawCreditsInit() {
  _main.bg2.clearRect(0, 0, 1200, 750);
  _main.fg1.clearRect(0, 0, 1200, 750);
  _main.fg2.clearRect(0, 0, 1200, 750);
  _main.ui.clearRect(0, 0, 1200, 750);
  drawCreditsInfo();
}

function cStar() {
  this.vel = 4 + Math.random() * 4;
  this.life = Math.round(Math.random() * 100 + 10 * (this.vel - 4));
  this.angle = twoPi * Math.random();
  this.pos = new _Vec2D.Vec2D(600 + this.vel * Math.cos(this.angle) * this.life, 375 + this.vel * Math.sin(this.angle) * this.life);
}
var cStars = [];
for (var n = 0; n < 100; n++) {
  cStars.push(new cStar());
}

var cShots = [];
function cShot(target, position, type) {
  this.vel = 0.3;
  this.life = 0;
  this.target = new _Vec2D.Vec2D(target.x, 750 - target.y);
  this.position = position;
  this.lastPosition = position;
  this.lastPosition2 = position;
  this.angle = Math.atan((this.target.y - this.position.y) / (this.target.x - this.position.x));
  if (type) {
    this.angle = Math.PI + this.angle;
  }
  this.distance = Math.sqrt(Math.pow(this.target.y - this.position.y, 2) + Math.pow(this.target.x - this.position.x, 2));
}

function drawCreditsInfo() {
  _main.ui.clearRect(0, 0, 1200, 750);
  _main.ui.font = "900 40px Consolas";
  _main.ui.strokeStyle = "rgba(255, 255, 255, 0.7)";
  _main.ui.lineWidth = 2;
  _main.ui.fillStyle = "rgba(0,0,0,0.7)";
  _main.ui.fillRect(100, 640, 1000, 60);
  _main.ui.strokeRect(100, 640, 1000, 60);
  _main.ui.fillRect(100, 560, 330, 70);
  _main.ui.fillRect(430, 560, 670, 70);
  _main.ui.strokeRect(100, 560, 330, 70);
  _main.ui.strokeRect(430, 560, 670, 70);
  _main.ui.fillRect(1000, 50, 150, 50);
  _main.ui.strokeRect(1000, 50, 150, 50);
  _main.ui.fillStyle = "white";
  _main.ui.textAlign = "center";
  if (!lastHit[2]) {
    if (typeof creditNames[lastHit[1]] != "undefined") {
      _main.ui.fillText(creditNames[lastHit[1]].Text, 265, 610);
      _main.ui.font = "900 35px Consolas";
      _main.ui.fillText(creditNames[lastHit[1]].position, 765, 610);
      _main.ui.font = "900 25px Consolas";
      _main.ui.fillText(creditNames[lastHit[1]].information, 600, 680);
    }
  }
  _main.ui.font = "900 35px Consolas";
  _main.ui.fillText(cScore + " Hit", 1075, 85);
}

function drawCredits() {
  _main.fg1.clearRect(0, 0, 1200, 750);
  _main.bg2.fillStyle = "rgba(0,0,0,0.4)";
  _main.bg2.fillRect(0, 0, 1200, 750);
  for (var _n = 0; _n < 100; _n++) {
    cStars[_n].life++;
    if (cStars[_n].life == 200) {
      cStars[_n].vel = 4 + Math.random() * 4;
      cStars[_n].life = Math.round(10 * (cStars[_n].vel - 4));
      cStars[_n].angle = twoPi * Math.random();
      cStars[_n].pos = new _Vec2D.Vec2D(600 + cStars[_n].vel * Math.cos(cStars[_n].angle) * cStars[_n].life, 375 + cStars[_n].vel * Math.sin(cStars[_n].angle) * cStars[_n].life);
    }
    cStars[_n].pos.x += cStars[_n].vel * Math.cos(cStars[_n].angle);
    cStars[_n].pos.y += cStars[_n].vel * Math.sin(cStars[_n].angle);
    var col = Math.min(255, cStars[_n].life * 3);
    _main.bg2.fillStyle = "rgb(" + col + "," + col + "," + col + ")";
    _main.bg2.fillRect(cStars[_n].pos.x, cStars[_n].pos.y, 3, 3);
  }
  var cShotDestroyQueue = [];
  for (var m = 0; m < cShots.length; m++) {
    cShots[m].life++;
    cShots[m].vel *= 0.77;
    cShots[m].lastPosition2 = new _Vec2D.Vec2D(cShots[m].lastPosition.x, cShots[m].lastPosition.y);
    cShots[m].lastPosition = new _Vec2D.Vec2D(cShots[m].position.x, cShots[m].position.y);
    cShots[m].position.x += cShots[m].vel * cShots[m].distance * Math.cos(cShots[m].angle);
    cShots[m].position.y += cShots[m].vel * cShots[m].distance * Math.sin(cShots[m].angle);
    if (cShots[m].life == 25) {
      cShotDestroyQueue.push(m);
    } else {
      _main.bg2.lineWidth = Math.max(1, 20 - cShots[m].life);
      _main.bg2.strokeStyle = laserColor;
      _main.bg2.beginPath();
      _main.bg2.moveTo(cShots[m].lastPosition2.x, 750 - cShots[m].lastPosition2.y);
      _main.bg2.lineTo(cShots[m].position.x, 750 - cShots[m].position.y);
      _main.bg2.closePath();
      _main.bg2.stroke();
    }
  }
  var del = 0;
  for (var k = 0; k < cShotDestroyQueue.length; k++) {
    cShots.splice(cShotDestroyQueue[k] - del, 1);
    del++;
  }

  _main.fg1.font = "500 36px Consolas";
  _main.fg1.fillStyle = "white";
  _main.fg1.textAlign = "start";
  for (var i = 0; i < creditNames.length; i++) {
    if (creditNames[i].canRender) {
      if (creditNames[i].isShot) {
        _main.fg1.fillStyle = "rgb(227, 89, 89)";
      } else {
        _main.fg1.fillStyle = "white";
      }
      _main.fg1.fillText(creditNames[i].Text, creditNames[i].xPos, creditNames[i].yPos);
    }
  }
  _main.fg1.strokeStyle = "rgba(255, 255, 255, 0.7)";
  if (initc === false) {
    for (var _i2 = 0; _i2 < creditNames.length; _i2++) {
      if (!creditNames[_i2].isShot) {
        if (creditNames[_i2].isHovering(cPlayerXPos, cPlayerYPos)) {
          _main.fg1.strokeStyle = "rgba(204, 0, 0, 0.7)";
        }
      }
    }
  }
  if (initc === true) {
    _main.fg1.lineWidth = 9;
    _main.fg1.beginPath();
    _main.fg1.arc(cPlayerXPos, cPlayerYPos, 35, 0, twoPi);
    _main.fg1.moveTo(cPlayerXPos, cPlayerYPos + 35);
    _main.fg1.lineTo(cPlayerXPos, cPlayerYPos + 10);
    _main.fg1.moveTo(cPlayerXPos, cPlayerYPos - 35);
    _main.fg1.lineTo(cPlayerXPos, cPlayerYPos - 10);
    _main.fg1.moveTo(cPlayerXPos + 35, cPlayerYPos);
    _main.fg1.lineTo(cPlayerXPos + 10, cPlayerYPos);
    _main.fg1.moveTo(cPlayerXPos - 35, cPlayerYPos);
    _main.fg1.lineTo(cPlayerXPos - 10, cPlayerYPos);
    _main.fg1.closePath();
    _main.fg1.stroke();
  } else {
    _main.fg1.lineWidth = 9;
    _main.fg1.beginPath();
    _main.fg1.arc(cPlayerXPos, cPlayerYPos, 35, 0, twoPi);
    //const cRectLength = 25;
    //const cRectSpace = 10;
    //const cDefaultAngles = [0,.5 * Math.PI, Math.PI, 1.5 * Math.PI,twoPi];
    var radiansAngle = cCursorAngle / 180 * Math.PI;
    var cRectPos = [[[0, 0], [0, 0]], [[0, 0], [0, 0]], [[0, 0], [0, 0]], [[0, 0], [0, 0]]];
    for (var _i3 = 0; _i3 < cDefaultAngles.length; _i3++) {
      cRectPos[_i3][0][0] = Math.cos(cDefaultAngles[_i3] + radiansAngle) * cRectSpace;
      cRectPos[_i3][0][1] = Math.sin(cDefaultAngles[_i3] + radiansAngle) * cRectSpace;
      cRectPos[_i3][1][0] = Math.cos(cDefaultAngles[_i3] + radiansAngle) * (cRectLength + cRectSpace);
      cRectPos[_i3][1][1] = Math.sin(cDefaultAngles[_i3] + radiansAngle) * (cRectLength + cRectSpace);
    }
    for (var _i4 = 0; _i4 < cRectPos.length; _i4++) {
      _main.fg1.moveTo(cPlayerXPos + cRectPos[_i4][0][0], cPlayerYPos + cRectPos[_i4][0][1]);
      _main.fg1.lineTo(cPlayerXPos + cRectPos[_i4][1][0], cPlayerYPos + cRectPos[_i4][1][1]);
    }
    //for (let ia = 0; ia < cDefaultAngles.length; i++) {
    //	 fg1.moveTo(cPlayerXPos + (Math.cos((cDefaultAngles[ia] + radiansAngle)) * (cRectSpace)), cPlayerYPos + (Math.sin((cDefaultAngles[ia] + radiansAngle)) * (cRectSpace)));
    //  fg1.lineTo(cPlayerXPos + (Math.cos((cDefaultAngles[ia] + radiansAngle)) * (cRectLength + cRectSpace)), cPlayerYPos + (Math.sin((cDefaultAngles[ia] + radiansAngle)) * (cRectLength + cRectSpace)));
    //}
    _main.fg1.closePath();
    _main.fg1.stroke();
  }
}

//////////////////
// WEBPACK FOOTER
// ./src/menus/credits.js
// module id = 257
// module chunks = 1
//# sourceURL=webpack:///./src/menus/credits.js?