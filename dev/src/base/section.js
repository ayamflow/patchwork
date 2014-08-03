'use strict';

/*
    Section
    Default methods for proper integration with pk-view
    and transitions between pages.

    Each viewmodel of the application should inherit this.
 */

module.exports = {
    route: {
        transitionMode: 'outAndAfterIn',
        params: {}
    },
    methods: {
        transitionIn: function() {
            this.$el.style.display = 'block';
            this.tlTransition.play();
        },
        onTransitionInComplete: function() {
            this.$emit('$page.transitionInComplete');
        },
        transitionOut: function() {
            console.log('section transitionOut');
            this.tlTransition.reverse();
        },
        onTransitionOutComplete: function() {
            this.$emit('$page.transitionOutComplete');
        },
        createTimeline: function() {
            this.tlTransition = new TimelineMax({
                onComplete: this.onTransitionInComplete,
                onCompleteScope: this,
                onReverseComplete: this.onTransitionOutComplete,
                onReverseCompleteScope: this,
                paused: true
            });
        },
        domReady: function() {
            this.createTimeline();
            this.insertTweens(); // Override this
        }
    },
    created: function() {
        this.$el.style.display = 'none';
        this.$on('hook:ready', this.domReady);
    }
};