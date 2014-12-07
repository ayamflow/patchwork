'use strict';

/*
    Utility functions
    "The poor man's underscore"
 */

/*
    Cheap array.filter
 */
exports.item = function(array, id, property) {
    property = property || 'id';
    for(var i = 0; i < array.length; i++) {
        if(array[i][property] === id) return array[i];
    }
};

exports.clamp = function(value, min, max) {
    return Math.max(min, Math.min(value, max));
};

exports.rand = function(min, max) {
    return Math.random() * (max - min) + min;
};

exports.round = function(value) {
    return (value + 0.5) << 0;
};

exports.randItem = function(array) {
    var index = ~~(Math.random() * array.length);
    return array[index];
};

exports.pad = function(number, pad) {
    var padded = number.toString();
    pad = pad || 2;
    for(var i = padded.length; i < pad; i++) {
        padded = '0' + padded;
    }
    return padded;
};

exports.distSq = function(p1, p2) {
    var dx = (p2.x - p1.x) * (p2.x - p1.x);
    var dy = (p2.y - p1.y) * (p2.y - p1.y);
    return dx + dy;
};

exports.dist = function(p1, p2) {
    var dx = (p2.x - p1.x) * (p2.x - p1.x);
    var dy = (p2.y - p1.y) * (p2.y - p1.y);
    return Math.sqrt(dx + dy);
};

exports.sign = function(value) {
    return value > 0 ? 1 : value < 0 ? -1 : 0;
};

exports.toInt = function(value) {
    return +value;
};

exports.sign = function(number) {
    return typeof number === 'number' ? number ? number < 0 ? -1 : 1 : number === number ? 0 : NaN : NaN;
};

exports.toFixed = function(value, fixed) {
    return +value.toFixed(fixed);
};

exports.floor = function(number) {
    return ~~number;
};

exports.normalize = function(number, min, max) {
    return (number - min) / (max - min);
};

// http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
exports.shadeColor = function(color, percent) {  
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
};

exports.bind = function(fn, context) {
    return function (arg) {
        return fn.call(context, arg);
    };
};