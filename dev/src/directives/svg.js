'use strict';

var Vue = require('vue'),
    request = require('superagent');

/*
    Allow to import inline SVG without the visual code bloat.
    v-svg="assets/logo.svg"
 */
module.exports = {
    isLiteral: true,
    bind: function() {
        request.get(this.expression, this.appendSvg.bind(this));
    },
    appendSvg: function(res) {
        Vue.nextTick(function() {
            if(res.status !== 200 || !res.text) return console.warn('v-svg resulted in 404 for "', this.expression + '".');
            if(!this.el) return console.log('v-svg has no element to append to', this.el);
            this.el.innerHTML = res.text;
        }.bind(this));
    }
};