"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setChars = setChars;
exports.setHitBoxes = setHitBoxes;
exports.setOffsets = setOffsets;
exports.setCharAttributes = setCharAttributes;
exports.setIntangibility = setIntangibility;
exports.setFrames = setFrames;
exports.setActionSounds = setActionSounds;
exports.charObject = charObject;
exports.getEcB = getEcB;
exports.setEcbData = setEcbData;
/* eslint-disable */
var CHARIDS = exports.CHARIDS = {
  MARTH_ID: 0,
  PUFF_ID: 1,
  FOX_ID: 2,
  FALCO_ID: 3,
  FALCON_ID: 4
};

var chars = exports.chars = [];
function setChars(index, val) {
  chars[index] = val;
}
var hitboxes = exports.hitboxes = [];
function setHitBoxes(index, val) {
  hitboxes[index] = val;
}

var offsets = exports.offsets = [];
function setOffsets(charId, val) {
  offsets[charId] = val;
}
var charAttributes = exports.charAttributes = [];
function setCharAttributes(charId, val) {
  charAttributes[charId] = val;
}
var intangibility = exports.intangibility = [];
function setIntangibility(charId, val) {
  intangibility[charId] = val;
}
var framesData = exports.framesData = [];
function setFrames(charId, val) {
  framesData[charId] = val;
}
var actionSounds = exports.actionSounds = [];
function setActionSounds(charId, val) {
  actionSounds[charId] = val;
}
function charObject(num) {
  this.attributes = charAttributes[num];
  this.animations = 0;
  this.hitboxes = hitboxes[num];
}

var ecb = exports.ecb = [];

function getEcB(index) {
  return ecb[index];
}

function setEcbData(index, val) {
  ecb[index] = val;
}

//////////////////
// WEBPACK FOOTER
// ./src/main/characters.js
// module id = 119
// module chunks = 1
//# sourceURL=webpack:///./src/main/characters.js?