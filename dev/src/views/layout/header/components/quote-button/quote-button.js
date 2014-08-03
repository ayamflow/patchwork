'use strict';

var TweenMax = require('TweenMax');

module.exports = {
    replace: true,
    template: require('./quote-button.html'),
    data: {

    },
    methods: {
        onMouseOver: function(e) {
            this.tlOver.gotoAndPlay(0);
        }
    },

    ready: function() {
        this.tlOver = new TimelineMax();

        var st = 0.15;

        this.tlOver.insert(TweenMax.fromTo(this.$find('.line.top'), st, {width: '100%', left: 0}, {width: 0, left: '100%', ease: Expo.easeIn}));
        this.tlOver.insert(TweenMax.fromTo(this.$find('.line.right'), st, {height: '100%', top: 0}, {height: 0, top: '100%', ease: Linear.easeNone}), st);
        this.tlOver.insert(TweenMax.fromTo(this.$find('.line.bottom'), st, {width: '100%', right: 0}, {width: 0, right: '100%', ease: Linear.easeNone}), st * 2);
        this.tlOver.insert(TweenMax.fromTo(this.$find('.line.left'), st, {height: '100%', top: 0}, {height: 0, top: '1OO%', ease: Expo.easeOut}), st * 3);

        this.tlOver.insert(TweenMax.fromTo(this.$find('.line.top'), st, {width: 0, left: 0}, {width: '100%', left: 0, ease: Expo.easeIn}), st + 0.01);
        this.tlOver.insert(TweenMax.fromTo(this.$find('.line.right'), st, {height: 0, top: 0}, {height: '100%', top: 0, ease: Linear.easeNone}), st * 2 + 0.01);
        this.tlOver.insert(TweenMax.fromTo(this.$find('.line.bottom'), st, {width: 0, right: 0}, {width: '100%', right: 0, ease: Linear.easeNone}), st * 3 + 0.01);
        this.tlOver.insert(TweenMax.fromTo(this.$find('.line.left'), st, {height: 0, top: '100%'}, {height: '100%', top: 0, ease: Expo.easeOut}), st * 4 + 0.1);

        this.tlOver.gotoAndStop(this.tlOver.duration);
    }
};