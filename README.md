patchwork
=========

Patchwork is a mix between a boilerplate and a miniframework built on top of Vue.js
It allows to quickly build prototypes or websites using gulp, sass, vue.js and GSAP.

The boilerplate/workflow part is totally modular. For instance, you can easily switch node-sass for gem-sass or stylus.

#### What's included
- node-sass for lightning-fast styles compiling
- browserify + watchify for node-style `require`
- napa and browserify-shim so every dependency comes from npm/github (no bower)
- modular gulp tasks
- bourbon neat as grid system

- a set of js utils and vue directives
- enhanced v-view directive with transitions timing (in then Out, in and out together...)
- event-based vue router based on page.js

#### What's coming
* mediator/event bus
* manifest preloading
* git hooks (npm intall after pull...)
* gulp build task for images (scss sprites + svgo + imgo)
* test build (using tape + tap-spec)

## Getting started guide
Patchwork consists of a few files, all commented: `index.js`, `import.js`, `router.js`, `base/section.js`, `base/view.js`.

### Entry point
The application entry point is `src/index.js`. That's where the $root ViewModel is initialized. The routes and main components are defined there. The $root ViewModel then listens to the router events and update the currentPage accordingly - this property is bound to the `v-pw-view` in the DOM, which will trigger a page change with transition.

### Sections
Each page is a ViewModel inheriting from `base/section.js`. It allows to use all the Vue instances methods and hooks
but also offers some special methods like transitionIn or createTimeline, used to define the section's transitions.
Each section needs to be passed a `route` hash as follows:

```
/*
    Route params  
    Used by the router and the custom v-view
    id: page slug
    transitionMode: timing (see view for infos)
    params: injected by the view from router infos
*/
route: {
    id: 'home',
    transitionMode: 'outAndAfterIn',
    params: {}
},
```

### Routing
The different routes can be configured in the main file:

```
router.addRoute(require('./views/sections/home/home').route); // (1)
router.setDefaultRoute('home'); // (2)
```

(1) We pass to the router the `route` hash from our home section. The router will now listen to the `/home` route and call the transition with the `outAndAfterIn` timing (current section transitionOut, then next page transition in).

(2) When all the routes have been defined, we configure a default route, starting the router.

### Structure details
* `src/index.js`: entry point
* `src/imports.js`: global imports (adding plugins to TweenMax and Vue, setting defaults...)
* `src/router.js`: router built on top of page.js, customized for patchwork needs
* `src/base/section.js`: an abstract section ViewModel, used as a skeletton. Each section should inherit it to be able to use all the patchwork features (transition timings, manifest loader...).
* `src/base/view.js`: a custom `v-view` directive that make router and sections play nice.
* `src/common/**/*`: used to store components, directives and utils used app-wide.
* `src/views/**/*`: where the specifics components, layout (header/footer, ...) and sections (home, about, ...) are stored.