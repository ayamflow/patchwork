'use strict';

var bindAll = require('bindall-standalone');

module.exports = {
    /*
        Ensure all methods of the VM are bound
        to the correct context.
     */
    created: function() {
        bindAll(this);
    }
};