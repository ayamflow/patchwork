'use strict';

var ImageProgress = require('image-progress'),
    TweenMax = require('TweenMax');

module.exports = {
    template: require('./background-image.html'),
    data: {
        image: ''
    },
    ready: function() {
        this.loader = new ImageProgress(this.image);

        this.$loader = this.$findOne('.background-image-loader');
        this.loader.on('progress', this.onProgress.bind(this));
        this.loader.on('load', this.onComplete.bind(this));

        this.loader.load();
    },

    methods: {
        onProgress: function(event) {
            TweenMax.to(this.$loader, 1, {scaleX: event.progress, delay: 1});
        },

        onComplete: function() {
            TweenMax.to(this.$loader, 0.1, {scaleX: 1});
            TweenMax.to(this.$loader, 0.2, {scaleY: 0, delay: 0.1});
        }
    },

    beforeDestroy: function() {
        this.loader.destroy();
    }
};