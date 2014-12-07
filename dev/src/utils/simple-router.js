'use strict';

var Vue = require('vue'),
    page = require('page'),
    extend = require('extend'),
    forEach = require('forEach'),
    EventEmitter = require('tiny-emitter'),
    verbose = true;

/*
    Router based on page.js,
    event-based, made to work with vue
 */
module.exports = extend({
    /*
        This object is dispatched on each locationChange.
        It holds the current path, the route params...
     */
    context: {
        path: ''
    },

    /*
        Default route (can be a 404, or the index)
     */
    defaultRoute: '/',

    /*
        Reference to all the routes
    */
    routeIds: [],

    /*
        Registers the route with the specified path/pattern (express-like regexp)
        route: infos as {id: "route-id", path: "/route"} or {id: "route-id", path: "/route/:id"}
     */
    addRoute: function(route) {
        this.routeIds.push({id: route.id, path: route.path});
        page(route.path, this.onRoute.bind(this));
        if(verbose) console.debug('[router] add route "' + route.path + '"');
    },

    /*
        Updates the default route.
        This method should be called after all routes were added,
        because it starts the routing.
     */
    setDefaultRoute: function(defaultRoute) {
        this.defaultRoute = defaultRoute;
        page('*', this.onDefaultRoute.bind(this));
        this.start();
    },

    /*
        Starts the router.
        Only needed to call if you didn't called `setDefaultRoute`.
     */
    start: function() {
        page.start();
        this.emit('router:start');
    },

    /*
        Internal method.
        Updates the context and amit the `router:update` event.
     */
    onRoute: function(context) {
        this.context.params = context.params;
        this.context.id = this.getCurrentRouteId(context.path);
        this.context.path = context.path;

        if(verbose) console.debug('[router] onRoute', this.context);
        this.emit('router:update', this.context);
    },

    /*
        Called when the requested route does not exists
        Redirects to proper default route
     */
    onDefaultRoute: function(c) {
        Vue.nextTick(function(){
            history.replaceState({}, '', '/' + this.defaultRoute);
            page('/' + this.defaultRoute);
        }.bind(this));
    },

    getCurrentRouteId: function(path) {
        var match, id;
        forEach(this.routeIds, function(value, index){
            match = path.match(new RegExp((value.path.replace(/:[a-z]+/g, '[a-z-]+')).replace(/\//g, '\\/'), 'g'));
            if(match && match.length > 0) {
                id = value.id;
            }
        });
        return id;
    },

    /*
        Manually set the path.
        Allow to press the `back`/`forward` buttons
     */
    update: function(path) {
        page.show(path, null, false);
    }
}, new EventEmitter());
