'use strict';

/*
    Abstracts the `scroll` event from the DOM.

    Holds current & previous scroll position, and dispatch debounced events.
 */

var EventEmitter = require('component-emitter'),
    debounce = require('debounce'),
    emitter = new EventEmitter();

var scrollUtil = module.exports;

var frequency = 1000/60;

scrollUtil.doScroll = function() {
    this.ox = this.x;
    this.oy = this.y;
    this.x = window.scrollX;
    this.y = window.scrollY;

    this.direction = this.y - this.oy;
    emitter.emit('scroll');
};

scrollUtil.addListener = function(listener) {
    emitter.on('scroll', listener);
};

scrollUtil.removeListener = function(listener) {
    if(listener) emitter.removeListener('scroll', listener);
};

scrollUtil.scroll = debounce(scrollUtil.doScroll, frequency);
scrollUtil.doScroll();
window.addEventListener('scroll', scrollUtil.scroll.bind(scrollUtil));