// Player helpers
var player;
var title = "YOUBORA YouTube Plugin"
var playerId = "player";
var playerCatalogUrl = "http://pre.smartplugin.youbora.com/src/v5/plugins/youtube/features.json";
var videoFiles = [{
    id: "0",
    label: "VoD - Google I/O Conference",
    file: "M7lc1UVf-VE" // Google I/O conference
}, {
    id: "1",
    label: "Live - Aljazeera English",
    file: "VBEmqvVPOX4" // Aljazeera live stream
}];

var options = {
    // Account code and enable YOUBORA Analytics
    accountCode: "qamini",
    enableAnalytics: true,
    //View parameters
    username: "userTest",
    transactionCode: "transactionTest",
    /*
    //Media info
    media: {
        title: "titleTest",
        duration: 3600,
        isLive: false,
        resource: "http://yourhost.com/yourmedia.m3u8"
    },
    //Media and device extra info
    properties: {
        filename: "test.m3u8",
        content_id: "contentTest",
        content_metadata: {
            genre: "genreTest",
            language: "languageTest",
            year: "yearTest",
            cast: "castTest",
            director: "directorTest",
            owner: "ownerTest",
            parental: "parentalTest",
            price: "priceTest",
            rating: "ratingTest",
            audioType: "typeTest",
            audioChannels: "channelTest"
        },
        transaction_type: "transactionTest",
        quality: "qualityTest",
        content_type: "contentTest",
        device: {
            manufacturer: "manufacturerTest",
            type: "typeTest",
            year: "yearTest",
            firmware: "firmwareTest"
        }
    },
    //Optional features
    parseHLS: false,
    parseCDNNodeHost: false,
    httpSecure: false,
    network: {
        cdn: "AKAMAI",
        ip: "1.1.1.1",
        isp: "ISPTest"
    }
    */
};

// YOUTUBE Player setup
function playerSetup() {
    var YTtag = document.createElement('script');
    YTtag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(YTtag, firstScriptTag);

    // Player will be loaded as soon as onYouTubeIframeAPIReady event is fired
    // Nothing needs to be done
}

// Loads the player following the specific player methods
function loadPlayer(videoId, playerId) {
    player = new YT.Player(playerId, {
        videoId: videoId,
        width: "585px",
        height: "329px",
        events: {
            'onReady': onPlayerReady,
        }
    });

    // Plugin declaration
    youbora = new $YB.plugins.Youtube(player, options);
}

// Removes the player and sets a new video element to track
function removePlayer(playerId, forceStop) {
    // Send a stop in order to see the view correctly closed if a stop is forced
    if (forceStop && forceStop != 'undefined') {
        try {
            youbora.stopHandler();
        } catch (err) {
            $YB.error(err);
        }
    }

    // Reset player container
    resetPlayerContainer(playerId);
}

// Changes the video element, based on the video id received when clicking in the navbar
function changeVideoElement(event) {
    removePlayer(playerId, true);
    loadPlayer(videoFiles[event.target.parentNode.id].file, playerId);
}

// YOUTUBE API specific functions
// Loads the player as soon as the iFrame API is ready
function onYouTubeIframeAPIReady() {
    loadPlayer(videoFiles[0].file, playerId);
}

// For the purpose of this demo,
function onPlayerReady(event) {
    event.target.playVideo();
    player.mute();
}