'use strict';

var Vue = require('vue'),
    forEach = require('forEach'),
    resize = require('common/utils/resize-util');

module.exports = {
    data: {
        mapOptions: {}
    },
    className: 'google-maps',
    ready: function() {
        this.$on('googlemaps:start', this.initMap);
    },

    beforeDestroy: function() {
        resize.removeListener(this.resize);
        window.removeEventListener('focus', this.resize);
    },

    methods: {
        resize: function() {
            this.map.setCenter(this.mapOptions.center);
        },

        convertLatLng: function() {
            forEach(this.mapOptions, function(value, key) {
                if(!value.longitude || !value.latitude) return;
                this.mapOptions[key] = new google.maps.LatLng(value.latitude, value.longitude);
                this.mapOptions[key].lat = value.latitude;
                this.mapOptions[key].lng = value.longitude;
            }, this);
        },

        initMap: function() {
            this.convertLatLng();

            this.map = new google.maps.Map(this.$el, this.mapOptions);

            google.maps.event.addListenerOnce(this.map, 'idle', function() {
                setTimeout(function() {
                    this.$parent.$emit('googlemaps:ready');
                }.bind(this), 400);
            }.bind(this));

            this.resize = Vue.nextTick.bind(this, this.resize.bind(this));
            resize.addListener(this.resize);
            window.addEventListener('focus', this.resize);

            Vue.nextTick(function() {
                this.$el.style.width = '100%';
                this.$el.style.height = '100%';
            }.bind(this));
        }
    }
};