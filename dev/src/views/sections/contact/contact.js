'use strict';

var Vue = require('vue'),
    TweenMax = require('TweenMax'),
    section = require('base/section'),
    extend = require('extend');

module.exports = extend(true, {}, section, {
    id: 'contact',
    template: require('./contact.html'),
    route: {
        transitionMode: 'outAndAfterIn',
        path: '/contact'
    },
    data: {
        mapOptions: {
            zoom: 16,
            center: {
                latitude: 21.5965309,
                longitude:  39.1395186
            },
            styles:  [{
                stylers: [
                    { saturation: -100 },
                    { gamma: 0.72 }
                ]
            }],
            disableDefaultUI: true,
            draggable: false, // TODO: only on mobile,
            panControl: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            mapTypeControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    },
    methods: {
        insertTweens: function() {
            this.tlTransition.fromTo(this.$el, 0.7, {alpha: 0, y: 50}, {alpha: 1, y: 0, ease: Expo.easeOut}, 0);
            this.tlTransition.to(this.$find('.hero .mask'), 0.6, {scaleY: 0, ease: Expo.easeInOut}, 0);
            this.tlTransition.fromTo(this.$find('.line'), 0.6, {scaleX: 0}, {scaleX: 1, ease: Expo.easeInOut}, 0.3);
            this.tlTransition.fromTo(this.$find('.line'), 0.6, {scaleX: 0}, {scaleX: 1, ease: Expo.easeInOut}, 0.3);
            this.tlTransition.staggerFrom(this.$find('p, .mail, h3'), 0.6, {y: 100, alpha: 0, ease: Expo.easeInOut}, 0.08, 0.3);
        }
    },
    components: {

    },
    ready: function() {
        TweenMax.to(window, 0.1, {scrollTo:{y:0}});

        this.$on('$page.transitionInComplete', function() {
            this.$broadcast('googlemaps:start');
        });

        var $mask = this.$findOne('.map-mask');
        this.$on('googlemaps:ready', function() {
            TweenMax.to($mask, 0.8, {scaleY: 0});
        });
    },

    beforeDestroy: function() {

    }
});