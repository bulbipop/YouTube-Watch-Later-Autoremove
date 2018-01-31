// ==UserScript==
// @name         Youtube-Watch-Later-AutoRemove
// @namespace    https://github.com/bulbipop/youtube-WL-autoremove
// @version      0.2
// @match        https://www.youtube.com/playlist?list=WL
// @run-at       document-idle
// ==/UserScript==

function clickDeleteButton() {
    document.querySelectorAll('ytd-menu-service-item-renderer')[1].click()
}

function main() {
    document.addEventListener("mousedown", function(ev) {
        if (ev.button == 1) {
            console.log('clicked something')
            if (ev.target.className == 'style-scope ytd-playlist-video-renderer') {
                console.log('it\'s a video!')
                console.log(ev.target)
                ev.target.closest('ytd-playlist-video-renderer').querySelector('button').click()
                setTimeout(clickDeleteButton, 1000)
            }
        }
    })
}

setTimeout(main, 2000)
