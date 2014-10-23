'use strict';

var resizeUtil = require('common/utils/resize-util');

module.exports = {
    ready: function() {
        resizeUtil.addListener(this.resize);
        this.resize();
    },

    beforeDestroy: function() {
        resizeUtil.removeListener(this.resize);
    },

    methods: {
        resize: function() {

        }
    }
};