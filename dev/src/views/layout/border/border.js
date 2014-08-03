'use strict';

var TweenMax = require('TweenMax'),
    bindAll = require('bindall-standalone');

module.exports = {
    replace: true,
    template: require('./border.html'),
    data: {

    },
    methods: {
        show: function() {
            this.addClass('active');
        },
        hide: function() {
            this.removeClass('active');
        },
        routeUpdated: function(route) {
            this.hide();
        }
    },

    ready: function() {
        bindAll(this, 'show', 'hide', 'routeUpdated');
        this.$root.$on('$border.show', this.show);
        this.$root.$on('$border.hide', this.hide);
        this.$root.$on('$route.update', this.routeUpdated);
    }
};