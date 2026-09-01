"use strict";

var _jquery = __webpack_require__(1);

var _jquery2 = _interopRequireDefault(_jquery);

var _main = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */

window.mobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  mobile = true;
}
var windwidth = 0;
var windheight = 0;

window.resizeHeader = function () {
  windwidth = (0, _jquery2.default)(window).width();
  windheight = (0, _jquery2.default)(window).height();
  if (windwidth < 1500) {
    (0, _jquery2.default)("#main").addClass("smalltext");
  } else {
    (0, _jquery2.default)("#main").removeClass("smalltext");
  }
  if (windwidth < 1200) {
    (0, _jquery2.default)(".button").css({
      "font-size": "12px",
      "width": 70
    }).children("p").css("margin", "23px 0px");
    (0, _jquery2.default)(".longbutton").css("width", 90);
    (0, _jquery2.default)(".doublebutton").css("width", 80).children("p").css("margin", "16px 0px");
    (0, _jquery2.default)(".doublelongbutton").css("width", 90).children("p").css("margin", "16px 0px");
    (0, _jquery2.default)("#titlelogo").css({
      "width": 280,
      "height": 60,
      "margin-top": 0
    });
  } else {
    (0, _jquery2.default)(".button").css({
      "font-size": "16px",
      "width": 80
    }).children("p").css("margin", "21px 0px");
    (0, _jquery2.default)(".longbutton").css("width", 100);
    (0, _jquery2.default)(".doublebutton").css("width", 85).children("p").css("margin", "12px 0px");
    (0, _jquery2.default)(".doublelongbutton").css("width", 100).children("p").css("margin", "12px 0px");
    (0, _jquery2.default)("#titlelogo").css({
      "width": 280,
      "height": 60,
      "margin-top": 0
    });
  }
  if (windwidth < 1050) {
    (0, _jquery2.default)(".button").css({
      "font-size": "12px",
      "width": 65
    }).children("p").css("margin", "23px 0px");
    (0, _jquery2.default)(".longbutton").css("width", 75);
    (0, _jquery2.default)(".doublebutton").css("width", 70).children("p").css("margin", "16px 0px");
    (0, _jquery2.default)(".doublelongbutton").css("width", 75).children("p").css("margin", "16px 0px");
    (0, _jquery2.default)("#titlelogo").css({
      "width": 200,
      "height": 43,
      "margin-top": 10
    });
  }
  if (windwidth < 905) {
    (0, _jquery2.default)(".button").css({
      "font-size": "10px",
      "width": 50
    }).children("p").css("margin", "25px 0px");
    (0, _jquery2.default)(".longbutton").css("width", 60);
    (0, _jquery2.default)(".doublebutton").css("width", 55).children("p").css("margin", "19px 0px");
    (0, _jquery2.default)(".doublelongbutton").css("width", 60).children("p").css("margin", "19px 0px");
    (0, _jquery2.default)("#titlelogo").css({
      "width": 150,
      "height": 32,
      "margin-top": 16
    });
  }
  (0, _jquery2.default)("#main").css("min-height", windheight - 105 + "px");
};
var showHeader = true;
if (typeof offlineMode !== "undefined") {
  if (offlineMode) {
    // showHeader = false;
  }
}
window.resize = function () {
  resizeHeader();
  var head = showHeader ? 95 : 31;
  if (_main.showDebug) {
    head += 60;
  }
  var wW = (0, _jquery2.default)(window).width();
  var wH = (0, _jquery2.default)(window).height();
  var maxScale = (wH - head) / 750;
  var scale = Math.min(maxScale, wW / 1200);
  var mY = wH - head - scale * 750;
  var mX = wW - scale * 1200;
  (0, _jquery2.default)("#display").css({
    "margin-left": mX / 2 + "px",
    "margin-top": mY / 2 + "px",
    "-webkit-transform": "scale(" + scale + ", " + scale + ")",
    "transform": "scale(" + scale + ", " + scale + ")",
    "-ms-transform": "scale(" + scale + ", " + scale + ")"
  });
  (0, _jquery2.default)("body").height(wH);
};

(0, _jquery2.default)(window).resize(function () {
  resize();
});

//////////////////
// WEBPACK FOOTER
// ./src/main/resize.js
// module id = 704
// module chunks = 1
//# sourceURL=webpack:///./src/main/resize.js?