'use strict';

var Vue = require('vue'),
    scrollUtil = require('common/scroll-util'),
    bindAll = require('bindall-standalone');

module.exports = {
    template: require('./header.html'),
    data: {
        route: ''
    },
    components: {
        'menu-button': require('./components/menu-button/menu-button.js'),
        'quote-button': require('./components/quote-button/quote-button.js'),
        'search-bar': require('./components/search-bar/search-bar.js')
    },
    methods: {
        onMouseEnter: function(e) {
            this.showMenu();
        },
        onMouseLeave: function(e) {
            this.hideMenu();
        },
        showMenu: function() {
            this.addClass('active');
        },
        hideMenu: function() {
            this.removeClass('active');
        },
        showBackground: function() {
            this.addClass('show-background');
        },
        hideBackground: function() {
            this.removeClass('show-background');
        },
        addScrollEvent: function() {
            scrollUtil.addListener(this.scrollHandler);
        },
        removeScrollEvent: function() {
            scrollUtil.removeListener(this.scrollHandler);
        },
        scrollHandler: function() {
            if(scrollUtil.y === 0) {
                this.hideBackground();
            }
            else {
                this.showBackground();
            }
        },
        routeUpdated: function(route) {
            this.hideBackground();
            this.route = route;
            switch(route) {
                case 'home':
                    this.removeScrollEvent();
                    break;
                default:
                    this.removeClass('pinned');
                    this.addScrollEvent();
                    break;
            }
        }
    },
    ready: function() {
        bindAll(this, 'hideMenu', 'routeUpdated', 'scrollHandler');


        this.$root.$on('$route.update', this.routeUpdated);

        setTimeout(this.hideMenu, 1000);
    }
};