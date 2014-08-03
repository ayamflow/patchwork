patchwork
=========

A gulp + sass + vuejs boilerplate.

## What's included
- node-sass for lightning-fast styles compiling
- browserify + watchify for node-style `require`
- napa and browserify-shim so every dependency comes from npm/github (no bower)
- modular gulp tasks
- bourbon neat as grid system
- simple event-based vue router based on page.js
- enhanced v-view directive to allow to specify the transition timing (in then Out, in and out together...)

## What's coming
* git hooks (npm intall after pull...)
* gulp build task for images (scss sprites + svgo + imgo)
* test build (using tape + tap-spec)