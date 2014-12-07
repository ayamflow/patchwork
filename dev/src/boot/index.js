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

var Vue = require('vue');

/*
    Plugins, lib config...
 */
require('./imports');

function init() {
    var app = new Vue({
        el: 'body',
        data: {

        },

        routes: {
          '/home': {
            componentId: 'home-section',
            isDefault: true
          }
        },

        components: {
            /* COMPONENTs */

            /* SECTIONS */
            'home-section': require('sections/home/home')
        },

        ready: function() {

        },

        methods: {

        }
    });
}

window.onload = init;
