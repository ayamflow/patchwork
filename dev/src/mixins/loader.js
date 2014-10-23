'use strict';

var preloadjs = require('preloadjs');

module.exports = {
    /*
        Properly stop & destroy the loader
     */
    beforeDestroy: function() {
        if(this.preloader) {
            this.preloader.setPaused(true);
            this.preloader.off();
            this.preloader.removeAll();
            this.preloader.close();
            this.preloader = null;
        }
    },

    methods: {
        /*
            Return an array containing all
            URL to load. Defaults to an object passed to the
            Vue constructor.
         */
        createManifest: function() {
            return this.$options.manifest;
        },

        load: function() {
            var manifest = this.createManifest();

            this.$emit('load:start');
            this.preloader = new createjs.LoadQueue();
            this.preloader.on('error', this.onLoadError);
            this.preloader.on('complete', this.onLoadComplete);
            this.preloader.on('complete', this.onLoadComplete);
            this.preloader.loadManifest(manifest);
        },

        onLoadProgress: function(event) {

        },

        onLoadComplete: function(event) {

        },

        onLoadError: function(event) {

        }
    }
};