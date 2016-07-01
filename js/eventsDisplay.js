// Draw messages in the event box
$YB.remoteLog = function (msg) {

    var box = document.getElementById('eventBox');

    if (msg.startsWith("[Youbora] n:")) {
        // Add the new events into the eventsBox
        box.innerHTML += (msg.substr(12) + '<br>');

        // Auto-scroll when new events are added
        box.scrollTop = box.scrollHeight;
    }
};

$YB.remoteLog.enabled = true;
