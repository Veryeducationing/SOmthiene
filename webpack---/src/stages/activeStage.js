'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customTargetStages = exports.activeStage = exports.targetStageMapping = undefined;
exports.setVsStage = setVsStage;
exports.setActiveStageTarget = setActiveStageTarget;
exports.setActiveStageBuilderTestStage = setActiveStageBuilderTestStage;
exports.getActiveStage = getActiveStage;
exports.setCustomTargetStages = setCustomTargetStages;
exports.setActiveStageCustomTarget = setActiveStageCustomTarget;

var _vsStages = __webpack_require__(19);

var _vsStages2 = _interopRequireDefault(_vsStages);

var _tstages = __webpack_require__(37);

var _tstages2 = _interopRequireDefault(_tstages);

var _Box2D = __webpack_require__(21);

var _Vec2D = __webpack_require__(22);

var _streamclient = __webpack_require__(48);

var _deepCopyObject = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// for stages to have connected grounds/platforms, they need to provide a 'connectednessFunction'
// input of a connectedness function: [ [type, index ], side ]
// type is either "g" (ground) or "p" (platform),
// index is the index of that surface in the stage's list of surfaces (grounds or platforms depending on type)
// side is either "l" (left) or "r" (right)
// given such an input, the function should return which ground/platform is connected to that side of the given ground/platform,
// in the format [ newType, newIndex ],
// or return 'false' if the ground/platform is not connected on that side to any other ground/platform
// if 'connectednessFunction' is not supplied, it is assumed that no grounds/platforms are connected to any other grounds/platforms


var stageMapping = {
  0: "battlefield",
  1: "ystory",
  2: "pstadium",
  3: "dreamland",
  4: "fdest",
  5: "fountain"
};

function setVsStage(val) {
  exports.activeStage = activeStage = _vsStages2.default[stageMapping[val]];
}

var targetStageMapping = exports.targetStageMapping = {
  0: "targetstage1",
  1: "targetstage2",
  2: "targetstage3",
  3: "targetstage4",
  4: "targetstage5",
  5: "targetstage6",
  6: "targetstage7",
  7: "targetstage8",
  8: "targetstage9",
  9: "targetstage10"
};

function setActiveStageTarget(val) {
  exports.activeStage = activeStage = _tstages2.default[targetStageMapping[val]];
}

var activeStage = exports.activeStage = {
  box: [new _Box2D.Box2D([-68.4, -108.8], [68.4, 0])],
  platform: [[new _Vec2D.Vec2D(-57.6, 27.2), new _Vec2D.Vec2D(-20, 27.2)], [new _Vec2D.Vec2D(20, 27.2), new _Vec2D.Vec2D(57.6, 27.2)], [new _Vec2D.Vec2D(-18.8, 54.4), new _Vec2D.Vec2D(18.8, 54.4)]],
  ground: [[new _Vec2D.Vec2D(-68.4, 0), new _Vec2D.Vec2D(68.4, 0)]],
  ceiling: [[new _Vec2D.Vec2D(-68.4, -108.8), new _Vec2D.Vec2D(68.4, -108.8)]],
  wallL: [[new _Vec2D.Vec2D(-68.4, 0), new _Vec2D.Vec2D(-68.4, -108.8)]],
  wallR: [[new _Vec2D.Vec2D(68.4, 0), new _Vec2D.Vec2D(68.4, -108.8)]],
  startingPoint: [new _Vec2D.Vec2D(-50, 50), new _Vec2D.Vec2D(50, 50), new _Vec2D.Vec2D(-25, 5), new _Vec2D.Vec2D(25, 5)],
  startingFace: [1, -1, 1, -1],
  respawnPoints: [new _Vec2D.Vec2D(-50, 50), new _Vec2D.Vec2D(50, 50), new _Vec2D.Vec2D(-25, 35), new _Vec2D.Vec2D(25, 35)],
  respawnFace: [1, -1, 1, -1],
  blastzone: new _Box2D.Box2D([-224, -108.8], [224, 200]),
  ledge: [["ground", 0, 0], ["ground", 0, 1]],
  ledgePos: [new _Vec2D.Vec2D(-68.4, 0), new _Vec2D.Vec2D(68.4, 0)],
  scale: 4.5,
  offset: [600, 480]
};

function setActiveStageBuilderTestStage(stageTemp) {
  exports.activeStage = activeStage = stageTemp;
}

function getActiveStage() {
  return activeStage;
}

var customTargetStages = exports.customTargetStages = [];
function setCustomTargetStages(index, val) {
  customTargetStages[index] = val;
}

function setActiveStageCustomTarget(val) {
  exports.activeStage = activeStage = customTargetStages[val];
}

//////////////////
// WEBPACK FOOTER
// ./src/stages/activeStage.js
// module id = 18
// module chunks = 1
//# sourceURL=webpack:///./src/stages/activeStage.js?