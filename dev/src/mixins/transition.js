'use strict';

var Vue = require('vue'),
    TweenMax = require('TweenMax');

module.exports = {
    created: function() {
        TweenMax.set(this.$el, {opacity: 0});

        this.$once('hook:routed', function() {
            // If we want to handle preload or promises resolving
        });
    },

    ready: function() {
        this.beforeTransitionIn(); // Override that bitch
        this.createTimelines();
        this.insertTweens(); // Override this

        Vue.nextTick(this.transitionsReady.bind(this));
    },

    beforeDestroy: function() {
        if(this.tlTransition) {
            this.tlTransition.kill();
            this.tlTransition = null;
        }
        if(this.tlTransitionOut) {
            this.tlTransitionOut.kill();
            this.tlTransitionOut = null;
        }
    },

    methods: {
        /*
            PUBLIC API
            Overridable behavior
        */

        /*
            Can be overriden if the sections transition needs to be different depending on the previous route. Handle with care !
         */
        getTransitionMode: function(previousRoute) {
            return this.$options.route.transitionMode;
        },

        /*
            Starts the transitionIn, override it if you need to play something else than the default Timeline depending on previous route.
            ex:
                if(previousRoute && previousRoute.id === 'home') this.tlTransition.play();
                else TweenMax.fromTo(this.$el, 1, {alpha: 0}, {alpha: 1, onComplete: this.onTransitionInComplete, onCompleteScope: this});
        */
        playTransitionIn: function(previousRoute) {
            console.log('Section - playTransitionIn');
            this.tlTransition.play();
        },

        /*
            Starts the transitionOut, override it if you need to play something else than the default Timeline depending on next route.
        */
        playTransitionOut: function(nextRoute) {
            this.tlTransition.reverse();
        },

        /*
            Allow to resize and manipulate the DOM before creating the transitions
        */
        beforeTransitionIn: function() {
            console.warn('[section] - You need to override section.beforeTransitionIn:', this.$options.route.id);
        },

        /*
            Create the different tween into the transitionIn/Out Timelines
        */
        insertTweens: function() {
            console.warn('[section] - You need to override section.insertTweens:', this.$options.route.id);
            this.tlTransition.fromTo(this.$el, 0.4, {opacity: 0}, {opacity: 1});
        },

        /*
            PRIVATE API
            Internal behavior
        */
        transitionIn: function(previousRoute) {
            this.$el.style.visibility = 'visible';
            this.playTransitionIn(previousRoute);
        },

        onTransitionInComplete: function() {
            this.$emit('section:transitionInComplete');
        },

        transitionOut: function(nextRoute) {
            this.playTransitionOut(nextRoute);
        },

        onTransitionOutComplete: function() {
            this.$emit('section:transitionOutComplete');
        },

        createTimelines: function() {
            this.tlTransition = new TimelineMax({
                onComplete: this.onTransitionInComplete,
                onCompleteScope: this,
                onReverseComplete: this.onTransitionOutComplete,
                onReverseCompleteScope: this,
                paused: true
            });

            this.tlTransitionOut = new TimelineMax({
                onComplete: this.onTransitionOutComplete,
                onCompleteScope: this,
                paused: true
            });

            console.log('Section - createTimelines');
        },

        transitionsReady: function() {
            this.$root.$emit('section:transitionsReady');
            console.log('Section - transitionsReady');
        }
    }
};