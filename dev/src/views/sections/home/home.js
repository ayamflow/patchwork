'use strict';

module.exports = extend(true, {}, section, {
    id: 'home',
    template: require('./home.html'),
    route: {
        transitionMode: 'outAndAfterIn',
        path: '/home'
    },
    data: {

    },
    methods: {
        insertTweens: function() {
            this.tlTransition.fromTo(this.$el, 0.7, {alpha: 0, y: 50}, {alpha: 1, y: 0, ease: Expo.easeOut}, 0.4);
        }
    },
    ready: function() {

    },

    beforeDestroy: function() {

    }
});