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
    router = require('./router'),
    TweenMax = require('TweenMax');

/*
    Plugins, lib config...
 */
require('./imports');

function init() {
    var app = new Vue({
        el: 'body',
        data: {
            currentPage: null, // Current page id, used by v-pw-view
            context: {}, // reference to the router context
            home:{
                name: 'home'
            },
            about:{
                name: 'about'
            },
            pages:[
                    {
                      name:'home section',
                      link:'home'
                    },
                    {
                      name:'about section',
                      link:'about'
                    }
                ]
        },

        components: {
            /* LAYOUT */
            'pw-header': require('./views/layout/header/header'),
            'pw-footer': require('./views/layout/footer/footer'),

            /* COMPONENTs */

            /* PAGES */
            'home': require('./views/sections/home/home'),
            'about': require('./views/sections/about/about')

            /* COMMON */

        },

        directives: {
            'pw-view': require('base/view')
        },

        ready: function() {
            router.on('router:update', this.onRouteUpdate.bind(this));
            router.addRoute(require('./views/sections/home/home').route);
            router.addRoute(require('./views/sections/about/about').route);
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
