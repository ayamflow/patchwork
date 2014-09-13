'use strict';

/*
    Make a gross estimate of the
    current FPS.
    Handy if you want to check, when no other way possible,
    that some heavy task is done and the browser is smooth again
    (like waiting for chucks of DOM to be painted).
 */

var TweenMax = require('TweenMax'),
    bindAll = require('bindall-standalone');

var fpsCounter = module.exports = {
    startTime: 0,
    frameNumber: 0,
    fps: 0,
    update : function(){
        this.frameNumber++;
        var d = new Date().getTime(),
            currentTime = ( d - this.startTime ) / 1000,
            result = Math.floor( ( this.frameNumber / currentTime ) );

        if( currentTime > 1 ){
            this.startTime = new Date().getTime();
            this.frameNumber = 0;
        }
        
        this.fps = result;
    },
    start: function() {
        TweenLite.ticker.addEventListener('tick', fpsCounter.update);
    },

    stop: function() {
        TweenLite.ticker.removeEventListener('tick', fpsCounter.update);  
    }
};

bindAll(fpsCounter, 'update');