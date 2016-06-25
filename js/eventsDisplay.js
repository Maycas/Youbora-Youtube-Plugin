// Overwrite console
var prevConsole = $YB.notice;

$YB.notice = function (msg) {
    prevConsole(msg);

    var box = document.getElementById('eventBox');

    // Add the new events into the eventsBox
    box.innerHTML += (msg + '<br>');

    // Auto-scroll when new events are added
    box.scrollTop = box.scrollHeight;
};
