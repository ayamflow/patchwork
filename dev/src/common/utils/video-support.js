'use strict';

/*
    Video support detection, taken from Modernizr
    https://github.com/Modernizr/Modernizr/blob/master/feature-detects/video.js

    Useful to detect which video to preload with a custom preloader
    (not with the <video preload> tag)
*/

function detect() {
    var elem = document.createElement('video');
    var bool = false;

    try {
        if (bool = !!elem.canPlayType ) {
            bool = new Boolean(bool);

            bool.ogg = !!elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,'');

            // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
            bool.h264 = !!elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,'');

            bool.webm = !!elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');

            bool.vp9 = !!elem.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,'');

            bool.hls = !!elem.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,'');
        }
    } catch(e){}

    return bool;
}

module.exports = detect();