"use strict";

var scriptsLoaded = 0;
var scripts = [{
  path: "./js/main.js",
  text: "core code",
  size: 7.7436 * 1024 * 1024,
  loaded: 0
}];

var totalSize = scripts.reduce(function (prev, script) {
  return prev + script.size;
}, 0);

var screenEl = void 0;
var textEl = void 0;
var percentEl = void 0;

function loadNextScript() {
  var script = scripts[scriptsLoaded];
  updateLoadingText("Loading " + script.text);

  var req = new XMLHttpRequest();

  // Report progress
  req.addEventListener("progress", function (ev) {
    script.loaded = ev.loaded;
    updateLoadingPct(script.loaded / totalSize);
  });

  // Drop in to a script tag
  req.addEventListener("load", function (ev) {
    scriptsLoaded++;
    script.loaded = script.size;

    var finished = scriptsLoaded >= scripts.length;
    var scriptTag = document.createElement("script");
    scriptTag.innerHTML = ev.target.responseText;

    if (finished) {
      updateLoadingText("Initializing");
      setTimeout(function () {
        document.body.appendChild(scriptTag);
        screenEl.className = "fadeout";
        window.start();
        setTimeout(function () {
          screenEl.remove();
        }, 300);
      }, 50);
    } else {
      document.body.appendChild(scriptTag);
      loadNextScript();
    }
  });

  req.open("GET", script.path);
  req.send();
};

function updateLoadingText(text) {
  textEl.innerHTML = text + "...";
}

function updateLoadingPct(pct) {
  percentEl.innerHTML = parseInt(pct * 100, 10);
}

document.addEventListener("DOMContentLoaded", function () {
  screenEl = document.getElementById("loadScreen");
  textEl = document.getElementById("loadTextEdit");
  percentEl = document.getElementById("loadPercentEdit");
  loadNextScript();
});

//////////////////
// WEBPACK FOOTER
// ./src/main/loadscreen.js
// module id = 3
// module chunks = 0 1
//# sourceURL=webpack:///./src/main/loadscreen.js?