// Page setup
function init(videoFiles) {
    // Set page title
    setPageTitle(title);

    // Build navbar
    buildNavbar(videoFiles);

    // Build plugin info through player catalog
    buildPluginInfo(playerCatalogUrl);

    // Sets the player
    playerSetup();
}

// Sets the page title programmatically
function setPageTitle(title) {
    document.title = title;
}

// Builds the navbar for the resources navigation
function buildNavbar(videoElements) {
    // Adds the diferent video elements in the
    var ul = document.getElementById("navbar");
    var li = document.createElement("li");
    var html = "";

    for (var i = 0; i < videoElements.length; i++) {
        html += "<li role = 'selector' id = '" + videoElements[i].id + "'> <a href = '#' >" + videoElements[i].label + "</a></li>";
    }
    ul.innerHTML = html;

    // Sets the first element as the active one
    ul.firstChild.className = "active";

    // Sets the listeners for the page navigation
    setNavbarListeners();
}

// Sets the listeners to switch the active navbar into the player
function setNavbarListeners() {
    var li = document.getElementById('navbar').getElementsByTagName('li');
    for (var i = 0; i < li.length; i++) {
        li[i].addEventListener('click', toggleVideo);
    }
}

// Sets the active class for the navbar and loads a new video element
function toggleVideo(event) {
    //Remove the active class from the active element and add it to the clicked one
    document.getElementsByClassName('active')[0].className = "";
    event.target.parentNode.className = "active";

    // Switch video player for the selected new video
    changeVideoElement(event);
}

// Accesses the catalog URL page and gets the table information
function buildPluginInfo(catalogUrl) {
    // Create an xhr request to the plugin catalog URL to draw the features table
    var xhr = new XMLHttpRequest();
    xhr.open("GET", catalogUrl, true);
    xhr.onload = function () {
        try {
            var code = '<table><tr><th>Name</th><th>Status</th><th>Comments</th></tr>';
            var resp = JSON.parse(xhr.responseText);
            for (var i = 0; i < resp.length; i++) {
                code += '<tr>';
                code += '<td>' + resp[i].name + '</td>';
                code += '<td class="' + resp[i].status + '">' + resp[i].status + '</td>';
                code += '<td class="comments">' + resp[i].comments + '</td>';
                code += '</tr>';
            }
            code += '</table>';

            document.getElementById('features').innerHTML = code;
        } catch (err) {
            document.getElementById('features').innerHTML = "features.json is missing or corrupted.";
        }
    };
    xhr.send();
}

// Resets the player container in order to be able to load a new player without reloading the full page
function resetPlayerContainer(playerId) {
    var playerHolder = document.getElementById(playerId);
    var playerContainer = playerHolder.parentNode;

    var div = document.createElement("div");
    div.id = playerId;
    div.className = "row no-padding";

    // Remove the previous iframe
    playerContainer.removeChild(playerHolder);

    // Reset the player placeholder
    playerContainer.insertBefore(div, playerContainer.childNodes[1]);

    // Add a separation line in the event box
    var eventBox = document.getElementById("eventBox");
    eventBox.innerHTML += '<hr>';
}

// Render page when the window gets loaded
window.onload = function () {
    init(videoFiles);
};
