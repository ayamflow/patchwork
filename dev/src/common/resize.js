'use strict';

var EventEmitter = require('events').EventEmitter,
    resizeEvent = new window.Event('resize', {bubbles: false, cancelable: false});

module.exports = new EventEmitter();

module.exports.resize = function() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;
    this.emit('resize');
};

module.exports.triggerResize = function() {
    window.dispatchEvent(resizeEvent);
};

module.exports.resize();
window.addEventListener('resize', module.exports.resize.bind(module.exports));