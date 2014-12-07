'use strict';

/*
    IMPORTS

    Holdall for plugins and conf
    to avoid polluting the main.
 */

var Vue = require('vue'),
    viewport = require('common/directives/viewport'),
    route = require('vue-route'),
    TweenMax = require('TweenMax'),
    debugApp = require('common/debug');

/*
    TweenMax
*/
TweenLite.defaultEase = Expo.easeOut; // So I don't have to write it every time

/*
    Vue plugins
 */
Vue.directive('viewport', require('./common/directives/v-viewport'));
Vue.use(route);