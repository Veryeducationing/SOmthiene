'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-undef */

var MusicManager = exports.MusicManager = function () {
  function MusicManager() {
    _classCallCheck(this, MusicManager);
  }

  _createClass(MusicManager, null, [{
    key: 'playLoop',
    value: function playLoop(track, sprite) {
      this.stopWhatisPlaying();
      console.log("starting sound");
      console.log(track._src);
      track.play(sprite);
      this.whatisPlaying = track;
      console.log("now what is playing");
      console.log(this.whatisPlaying._src);
    }
  }, {
    key: 'stopWhatisPlaying',
    value: function stopWhatisPlaying() {
      console.log("stopping sound");

      if (!this.whatisPlaying) {
        return;
      }
      console.log("waiting to stop playing");
      console.log(this.whatisPlaying._src);

      while (this.whatisPlaying.playing()) {
        this.whatisPlaying.stop();
        console.log("confirmed stopped sound");
      }
    }
  }, {
    key: 'playMenuLoop',
    value: function playMenuLoop() {
      this.playLoop(this.menu, "menuStart");
    }
  }, {
    key: 'playBattleFieldLoop',
    value: function playBattleFieldLoop() {
      this.playLoop(this.battlefield, "battlefieldStart");
    }
  }, {
    key: 'playyStoryLoop',
    value: function playyStoryLoop() {
      this.playLoop(this.yStory, "yStoryStart");
    }
  }, {
    key: 'playpStadiumLoop',
    value: function playpStadiumLoop() {
      this.playLoop(this.pStadium, "pStadiumStart");
    }
  }, {
    key: 'playDreamLandLoop',
    value: function playDreamLandLoop() {
      this.playLoop(this.dreamland, "dreamlandStart");
    }
  }, {
    key: 'playTargetTestLoop',
    value: function playTargetTestLoop() {
      this.playLoop(this.targettest, "targettestStart");
    }
  }, {
    key: 'playfinaldLoop',
    value: function playfinaldLoop() {
      this.playLoop(this.finald, "finaldStart");
    }
  }, {
    key: 'playfodLoop',
    value: function playfodLoop() {
      this.playLoop(this.fod, "fodStart");
    }
  }, {
    key: 'isWhatisPlaying',
    value: function isWhatisPlaying(track) {
      return this.whatisPlaying === track;
    }
  }, {
    key: 'setWhatisPlaying',
    value: function setWhatisPlaying(track) {
      this.whatisPlaying = track;
    }
  }]);

  return MusicManager;
}();

MusicManager.menu = new Howl({
  src: ['music/menu.ogg'],
  volume: 1,
  html5: true,
  sprite: {
    menuStart: [0, 7425],
    menuLoop: [7425, 173500]
    //end - 181070
  },
  onend: function onend() {
    if (MusicManager.isWhatisPlaying(MusicManager.menu)) {
      this.play("menuLoop");
    }
  }
});
MusicManager.battlefield = new Howl({
  src: ['music/battlefield.ogg'],
  sprite: {
    battlefieldStart: [0, 12366],
    battlefieldLoop: [12366, 184256]
    // 196622
  },
  volume: 1,
  html5: true,
  onend: function onend() {
    this.play("battlefieldLoop");
  }
});
MusicManager.yStory = new Howl({
  src: ['music/yStory.ogg'],
  sprite: {
    yStoryStart: [0, 2957],
    yStoryLoop: [2957, 252182]
    // 255139
  },
  volume: 1,
  html5: true,
  onend: function onend() {
    this.play("yStoryLoop");
  }
});
MusicManager.pStadium = new Howl({
  src: ['music/pStadium.ogg'],
  sprite: {
    pStadiumStart: [0, 1],
    pStadiumLoop: [0, 219496]
  },
  volume: 1,
  html5: true,
  onend: function onend() {
    this.play("pStadiumLoop");
  }
});
MusicManager.dreamland = new Howl({
  src: ['music/dreamland.ogg'],
  sprite: {
    dreamlandStart: [0, 16320],
    dreamlandLoop: [16320, 194782]
    // end 211102
  },
  volume: 1,
  html5: true,
  onend: function onend() {
    this.play("dreamlandLoop");
  }
});
MusicManager.fod = new Howl({
  src: ['music/fod.ogg'],
  sprite: {
    fodStart: [21320, 21321],
    fodLoop: [21320, 310782]
    // end 211102
  },
  volume: 1,
  html5: true,
  onend: function onend() {
    this.play("fodLoop");
  }
});
MusicManager.finald = new Howl({
  src: ['music/finald.ogg'],
  sprite: {
    finaldStart: [15000, 15001],
    finaldLoop: [15000, 210000]
    // end 211102
  },
  volume: 1,
  html5: true,
  onend: function onend() {
    this.play("finaldLoop");
  }
});
MusicManager.targettest = new Howl({
  src: ['music/targettest.ogg'],
  sprite: {
    targettestStart: [0, 1],
    targettestLoop: [0, 224459]
    //224459
  },
  volume: 1,
  html5: true,
  onend: function onend() {
    this.play("targettestLoop");
  }
});

//////////////////
// WEBPACK FOOTER
// ./src/main/music.js
// module id = 121
// module chunks = 1
//# sourceURL=webpack:///./src/main/music.js?