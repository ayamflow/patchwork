'use strict';

var Vue = require('vue'),
    TweenMax = require('TweenMax'),
    section = require('base/section'),
    forEach = require('forEach'),
    resizeUtil = require('common/resize-util'),
    bindAll = require('bindall-standalone'),
    extend = require('extend');

module.exports = extend(true, {}, section, {
    id: 'home',
    template: require('./home.html'),
    route: {
        transitionMode: 'outAndAfterIn',
        path: '/home'
    },
    data: {
        previousSnapIndex: 0
    },
    methods: {
        onLaunchSnapTween: function(snapIndex) {
            this.$root.$emit('$home.scrollSnap.onLaunchSnapTween', snapIndex);
            if(snapIndex > 0) {
                this.$root.$emit('$border.show');
                if(snapIndex === 2) {
                    this.$root.$emit('$footer.show');
                }
                else {
                    this.$root.$emit('$footer.hide');
                }
            }
            else {
                this.$root.$emit('$footer.show');
                this.$root.$emit('$border.hide');
            }
        },
        onSnapTweenComplete: function(snapIndex) {
            if(snapIndex === this.previousSnapIndex) return;

            this.$root.$emit('$home.scrollSnap.snapTweenComplete', snapIndex);
            this.previousSnapIndex = snapIndex;
        },
        insertTweens: function() {
            this.tlTransition.fromTo(this.$el, 0.7, {alpha: 0, y: 50}, {alpha: 1, y: 0, ease: Expo.easeOut}, 0.4);
        },
        resize: function() {
            forEach(this.$find('section .content'), function(value, index){
                value.style.top = (resizeUtil.halfHeight - value.offsetHeight * 0.5) + 'px';
            });
        }
    },
    components: {
        "brands-diaporama": require('./components/brands-diaporama/brands-diaporama'),
        "products-diaporama": require('./components/products-diaporama/products-diaporama'),
        "about-push": require('./components/about-push/about-push'),
        "draggable-diaporama": require('common/components/draggable-diaporama/draggable-diaporama')
    },
    ready: function() {
        bindAll(this, 'resize');

        this.$on('scrollSnap:start', this.onLaunchSnapTween);
        this.$on('scrollSnap:end', this.onSnapTweenComplete);

        this.$once('$page.transitionInComplete', this.resize);
        resizeUtil.addListener(this.resize);

    },

    beforeDestroy: function() {

    }
});