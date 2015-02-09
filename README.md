patchwork
=========

Patchwork - 1.1 (Vue v0.11+)

Boilerplate with my usual tools for development of interactive websites.

Breaking changes since v0.2:

- Updated Vue to v0.11.
- Replaced custom router with `v-route` directive, see [repo](https://github.com/ayamflow/vue-route).
- Replaced all window utils with windowsill, see [repo](https://github.com/ayamflow/windowsill).
- Flatter folders/files tree.
- Added some mixins for Vue (loader, [resize](https://github.com/nk-components/vue-resize-mixin), bind).
- Added /static folder for all static stuff (.htaccess, index.html, images...)
- Simple router component if you need specific control that `v-route` doesn't offer (I'm thinking with prototyping in mind and quick hacking).
- Simpler, lighter and more modular structure since it now relies on more external components. Easier to dive in.
- Transitions between pages are now natively handled by `v-route` so no need to extend a custom class.

-------

## Tasks (gulp)

- node-sass (fast compilation)
- browserify + watchify for node-style `require`
- napa and browserify-shim so every dependency comes from npm/github (no bower)
- bourbon neat as grid system
- ...

## Getting started
Cloning, setting git and installing dependencies:
`git clone https://github.com/ayamflow/patchwork.git && cd patchwork && rm -rf .git && git init && npm i`

- `/src/boot` contains the $root VM, containing the routes definition.
The `import.js` allows to configure the different libraries, for instance installing Vue.plugins, setting the default ease for TweenMax...

- `/src/sections` contains the main sections of the website. For subsections and ui components, use `/src/components`.

- `/src/utils` offer some additional utils like browser sniffing, the folder can basically be replaced with lodash + modernizr. It has an additional `debug.js` file containing some flags, and `simple-router.js` which is a light wrapper around page.js, if you need access to a more low-level router.