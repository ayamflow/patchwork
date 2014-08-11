'use strict';

var Vue = require('vue');

module.exports = {
    /*
        Route params
        Used by the router and the custom v-view
        id: page slug
        transitionMode: timing (see view for infos)
        params: injected by the view from router infos
    */
    route: {
        id: '',
        transitionMode: 'outAndAfterIn',
        params: {}
    },
    methods: {
        /*
            PUBLIC API
            Overridable behavior
        */

        /*
            Starts the transitionIn
        */
        playTransitionIn: function() {
            this.tlTransition.play();
        },

        /*
            Starts the transitionOut
        */
        playTransitionOut: function() {
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
        transitionIn: function() {
            this.$el.style.visibility = 'visible';
            this.playTransitionIn();
        },
        onTransitionInComplete: function() {
            this.$emit('$page.transitionInComplete');
        },
        transitionOut: function() {
            this.playTransitionOut();
        },
        onTransitionOutComplete: function() {
            this.$emit('$page.transitionOutComplete');
            console.log('transitionOutComplete', this.$options.route.id);
        },
        createTimeline: function() {
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
        },
        transitionsReady: function() {
            this.$root.$emit('section:transitionsReady');
        },
        domReady: function() {
            // Double nextTick to wait for child VM to be rendered
            Vue.nextTick(function() {
                this.beforeTransitionIn(); // Override that bitch
                this.createTimeline();
                this.insertTweens(); // Override this
                Vue.nextTick(this.transitionsReady.bind(this));
            }.bind(this));
        }
    },
    created: function() {
        this.$el.style.visibility = 'hidden';
        this.$on('hook:ready', Vue.nextTick.bind(this, this.domReady.bind(this)));
    }
};