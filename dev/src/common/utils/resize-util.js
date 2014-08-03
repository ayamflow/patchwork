'use strict';

/*
    Abstracts the `resize` event from the DOM.

    Holds window size, and dispatch debounced events.
 */

var EventEmitter = require('component-emitter'),
    debounce = require('debounce'),
    emitter = new EventEmitter();

var resize = module.exports;

resize.applyResize = function() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;
    emitter.emit('resize');
};

resize.addListener = function(listener) {
    emitter.on('resize', listener);
};

resize.removeListener = function(listener) {
    if(listener) emitter.removeListener('resize', listener);
};

resize.resize = debounce(resize.applyResize, 150);
resize.applyResize();
window.addEventListener('resize', resize.resize.bind(resize));