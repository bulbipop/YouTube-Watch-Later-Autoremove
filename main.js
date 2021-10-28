// ==UserScript==
// @name         Youtube-Watch-Later-AutoRemove
// @namespace    https://github.com/bulbipop/youtube-WL-autoremove
// @version      0.6
// @match        https://www.youtube.com/playlist?list=WL
// @run-at       document-idle
// ==/UserScript==

function clickDeleteButton() {
    document.querySelectorAll('ytd-menu-service-item-renderer')[2].click()
    calcLength();
}

function calcLength() {
    let total = 0
    document.querySelectorAll('span.ytd-thumbnail-overlay-time-status-renderer').forEach(function(el) {
        let length = el.innerText.split(':');
        if (length.length == 3) {
            total += (parseInt(length[0]) * 3600) + parseInt(length[1]) * 60 + parseInt(length[2]);
        } else {
            total += parseInt(length[0]) * 60 + parseInt(length[1]);
        }
    });

    let days = Math.floor(total / 86400);
    let hours = Math.floor(total % 86400 / 3600).toString().padStart(2, '0');
    let minutes = Math.floor(total % 3600 / 60).toString().padStart(2, '0');
    let seconds = Math.floor(total % 60).toString().padStart(2, '0');
    let result = days + ' days ' + hours + ':' + minutes + ':' + seconds;
    document.querySelector('.ytd-badge-supported-renderer').innerText = result;
}

function main() {
    let nbVideos = document.querySelector('#stats .ytd-playlist-sidebar-primary-info-renderer').innerText.split(' ')[0];
    nbVideos = parseInt(nbVideos) / 100;
    for (let i=0; i < nbVideos + 1; i++) {
        setTimeout(function() {window.scrollTo(0,document.querySelector("#contents").scrollHeight)}, i * 2000);
    }
    setTimeout(calcLength, nbVideos * 2000);
    setTimeout(function() {window.scrollTo(0, 0);}, nbVideos * 2500);
    document.addEventListener("mousedown", function(ev) {
        if (ev.button == 1) {
            if (ev.target.id == 'video-title') {
                ev.target.__dataHost.querySelector('#menu  button').click();
                setTimeout(clickDeleteButton, 1000)
            }
        }
    })
}

setTimeout(main, 2000)
