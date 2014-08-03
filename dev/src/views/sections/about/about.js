'use strict';

var Vue = require('vue'),
    TweenMax = require('TweenMax'),
    section = require('base/section'),
    extend = require('extend');

module.exports = extend(true, {}, section, {
    id: 'about',
    template: require('./about.html'),
    route: {
        transitionMode: 'outAndAfterIn',
        path: '/about'
    },
    data: {

    },
    methods: {
        insertTweens: function() {
            this.tlTransition.to(this.$find('.hero .mask'), 0.6, {scaleY: 0, ease: Expo.easeInOut}, 0);
            this.tlTransition.fromTo(this.$find('.line'), 0.6, {scaleX: 0}, {scaleX: 1, ease: Expo.easeInOut}, 0.3);
            this.tlTransition.staggerFrom(this.$find('p'), 0.6, {y: 100, alpha: 0, ease: Expo.easeInOut}, 0.08, 0.3);
        }
    },
    ready: function() {

    }
});
