'use strict';

var Vue = require('vue'),
    bindAll = require('bindall-standalone');

module.exports = {
    template: require('./footer.html'),
    components: {

    },
    methods: {
        hide: function() {
            this.removeClass('active');
        },
        show: function() {
            this.addClass('active');
        },
        routeUpdated: function(route) {
            this.show();

            /* TODO make transition from pinned to not pinned */
            switch(route) {
                case 'home':
                    this.addClass('pinned');
                    break;
                default:
                    this.removeClass('pinned');
                    break;
            }
        }
    },
    ready: function() {
        bindAll(this, 'hide', 'show', 'routeUpdated');
        // console.log('footer', this.$el);
        this.$root.$on('$footer.hide', this.hide);
        this.$root.$on('$footer.show', this.show);
        this.$root.$on('$route.update', this.routeUpdated);
    }
};