$YB.plugins.YT = function(player, options) {
  // Name and version the plugin
  this.pluginName = 'youtube';
  this.pluginVersion = '5.1.0-1.0-youtube';

  // This method will start the library logic.
  this.init(player, options);

  // Register the listeners.
  this.registerListeners();
};

// Inherit from generic plugin
$YB.plugins.YT.prototype = new $YB.plugins.Generic();

$YB.plugins.YT.prototype.registerListeners = function() {
  var context = this;

  // TODO: Evaluate improvement on the buffering detection using buffering and playing events
  this.player.addEventListener("onStateChange", function(event) {
    switch (event.data) {
      case YT.PlayerState.UNSTARTED:
        context.playHandler();
        break;
      case YT.PlayerState.ENDED:
        context.endedHandler();
        break;
      case YT.PlayerState.PLAYING:
        context.playingHandler();
        break;
      case YT.PlayerState.PAUSED:
        context.pauseHandler();
        break;
      case YT.PlayerState.BUFFERING:
        break;
    }
  });

  this.player.addEventListener("onError", function(event) {
    var error = {
      "2": "Invalid ID",
      "5": "HTML5 content error",
      "100": "Video not found",
      "101": "Not allowed to play by owner",
    };

    var code = event.data;
    if (code === 150) {
      // Error 150 is the same as 101 as stated in the documentation
      code = 101;
    }

    if (error[code] !== undefined) {
      context.errorHandler(code, error[code]);
    } else {
      context.errorHandler(code, 'Unknown error');
    }
  });

  this.startAutobuffer();
};

$YB.plugins.YT.prototype.getResource = function() {
  return this.player.getVideoUrl();
};

$YB.plugins.YT.prototype.getMediaDuration = function() {
  return this.player.getDuration();
};

$YB.plugins.YT.prototype.getPlayhead = function() {
  return this.player.getCurrentTime();
};

$YB.plugins.YT.prototype.getRendition = function() {
  return this.player.getPlaybackQuality();
};

$YB.plugins.YT.prototype.getIsLive = function() {
  if (this.player.getDuration() !== 0) {
    return false;
  }
  return true;
};

$YB.plugins.YT.prototype.getTitle = function() {
  return this.player.getVideoData().title;
};
