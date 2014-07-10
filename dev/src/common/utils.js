'use strict';

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

exports.sign = function(value) {
    return value > 0 ? 1 : value < 0 ? -1 : 0;
};