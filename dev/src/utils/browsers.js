'use strict';

var browsers = {},
    browsersList = ['firefox', 'chrome',  'msie', 'safari', 'webkit'];

var ua = navigator.userAgent.toLowerCase();
for(var i = 0; i < browsersList.length; i++) {
    var b = browsersList[i];
    browsers[b] = ua.indexOf(b) > -1;
}

module.exports = function(browser) {
    return browsers[browser];
};