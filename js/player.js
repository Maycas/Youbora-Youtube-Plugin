// Player helpers
var player; // Global variable to declare the player
var title = "YOUBORA YouTube Plugin"; // Page title
var playerId = "player"; // Player HTML id tag
var playerCatalogUrl = "js/features.json"; // JSON player catalog to build the Features table
var videoFiles = [{
    id: "0",
    label: "VoD - Google I/O Conference",
    file: "M7lc1UVf-VE", // Google I/O conference
    isLive: false
}, {
    id: "1",
    label: "Live - Aljazeera English",
    file: "VBEmqvVPOX4", // Aljazeera live stream
    isLive: true
}]; // Video file objects to load

// YOUBORA Options
var options = {
    // Account code and enable YOUBORA Analytics
    accountCode: "qamini",
    enableAnalytics: true,

    //View parameters
    username: "userTest",
    transactionCode: "transactionTest",

    //Media info
    media: {
        //title: "titleTest",
        //duration: 3600,
        isLive: false,
        //resource: "http://yourhost.com/yourmedia.m3u8"
    },

    //Media and device extra info
    /*
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
    */
    //Optional features
    /*
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

// Player setup
function playerSetup() {
    var YTtag = document.createElement('script');
    YTtag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(YTtag, firstScriptTag);

    // Player will be loaded as soon as onYouTubeIframeAPIReady event is fired
    // Nothing needs to be done here
}

// Loads the player following the specific player methods
function loadPlayer(videoId, playerId) {
    // This code gets called as soon as YouTubeIframeAPI is ready
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
            youbora.endedHandler();
        } catch (err) {
            $YB.error(err);
        }
    }

    // Reset player container
    resetPlayerContainer(playerId);
}

// Changes the video element, based on the video id received when clicking in the navbar
function changeVideoElement(event) {
    // Remove the player holder
    removePlayer(playerId, true);

    // Correctly set isLive depending on the file being loaded
    options.media.isLive = videoFiles[event.target.parentNode.id].isLive;

    // Load the player with the new configuration
    loadPlayer(videoFiles[event.target.parentNode.id].file, playerId);
}

// YOUTUBE API specific functions
// Loads the player as soon as the iFrame API is ready
function onYouTubeIframeAPIReady() {
    loadPlayer(videoFiles[0].file, playerId);
}

// For the purpose of this demo, the player is autoplayed and muted
function onPlayerReady(event) {
    event.target.playVideo();
    player.mute();
}
