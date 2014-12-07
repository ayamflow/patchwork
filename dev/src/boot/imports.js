'use strict';

/*
    IMPORTS

    Holdall for plugins and conf
    to avoid polluting the main.
 */

var Vue = require('vue'),
    viewport = require('directives/viewport'),
    route = require('vue-route'),
    TweenMax = require('TweenMax');

/*
    TweenMax
*/
TweenLite.defaultEase = Expo.easeOut; // So I don't have to write it every time

/*
    Vue plugins
 */
Vue.directive('viewport', viewport);
Vue.use(route);