'use strict';

/*
    Patchwork - a gulp, npm, vue.js, node-sass boilerplate.
    2014 - Florian Morel, Guillaume Gouessan
*/

/*
    App entry point.

    Creates the top-most viewmodel,
    registers the routes,
    registers all components,
    and start on page load.
 */

var Vue = require('vue'),
    debug = require('vue-debug'),
    query = require('vue-query'),
    router = require('./router'),
    TweenMax = require('TweenMax');

require('TweenMax.ScrollToPlugin'); // Add scrollToPlugin to TweenMax
TweenLite.defaultEase = Expo.easeOut; // So I don't have to write it every time

Vue.use(debug); // Add Vue.log method
Vue.use(query); // Add this.$findOne, this.$find, this.add/removeClass to any Vue instance

function init() {
    var app = new Vue({
        el: 'body',
        data: {
            currentPage: null, // Current page id, used by v-pw-view
            context: {} // reference to the router context
        },

        components: {
            /* LAYOUT */

            /* COMPONENTs */

            /* PAGES */

            /* COMMON */

        },

        directives: {
            'pw-view': require('base/view')
        },

        ready: function() {
            router.on('router:update', this.onRouteUpdate.bind(this));

            router.addRoute(require('./views/sections/home/home').route);
            router.setDefaultRoute('home');
        },

        methods: {
            onRouteUpdate: function(context) {
                this.context = context;
                this.currentPage = context.id;
                this.$root.$emit('$route.update', this.currentPage);
            }
        }
    });
}

window.onload = init;