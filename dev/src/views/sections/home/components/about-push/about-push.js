'use strict';

var Vue = require('vue'),
    TweenMax = require('TweenMax'),
    bindAll = require('bindAll-standalone');

module.exports = {
    template: require('./about-push.html'),
    data: {
        snapIndex: 2
    },
    methods: {
        onSnapTweenComplete: function(snapIndex) {
            if(snapIndex != this.snapIndex) {
                this.transitionOut();
            }
        },
        onLaunchSnapTween: function(snapIndex) {
            if(snapIndex === this.snapIndex) {
                this.transitionIn();
            }
        },
        transitionIn: function() {
            this.tlTransition.play();
        },
        transitionOut: function() {
            this.tlTransition.gotoAndStop(0);
        }
    },
    ready: function() {
        bindAll(this, 'onSnapTweenComplete', 'onLaunchSnapTween');

        var start = 0.2;

        this.tlTransition = new TimelineMax();
        this.tlTransition.insert(TweenMax.from(this.$find('.separator'), 0.8, {scaleX: 0, ease: Expo.easeOut}), start);
        this.tlTransition.insert(TweenMax.from(this.$find('h2'), 0.8, {y: 50, alpha: 0, ease: Expo.easeOut}), start + 0.1);
        this.tlTransition.insert(TweenMax.from(this.$find('p'), 0.8, {y: -50, alpha: 0, ease: Expo.easeOut}), start + 0.2);
        this.tlTransition.insert(TweenMax.from(this.$find('.read-more-button'), 0.8, {y: 50, alpha: 0, ease: Expo.easeOut}), start + 0.3);
        this.tlTransition.gotoAndStop(0);

        this.$root.$on('$home.scrollSnap.snapTweenComplete', this.onSnapTweenComplete);
        this.$root.$on('$home.scrollSnap.onLaunchSnapTween', this.onLaunchSnapTween);
    },


};