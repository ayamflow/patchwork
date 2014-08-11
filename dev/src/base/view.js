'use strict';

/*
    View
    Enhanced v-view allowing to manage timing between transitions
    - transition In then Out,
    - transition In and Out together,
    - transition In only
 */

var TweenMax = require('TweenMax');

module.exports = {
    /*
        Origin v-view - must be kept in sync with the vue repo
    */
    bind: function () {
        // track position in DOM with a ref node
        var el       = this.raw = this.el,
            parent   = el.parentNode,
            ref      = this.ref = document.createComment('pw-view');
        if(!parent) return;

        parent.insertBefore(ref, el);
        parent.removeChild(el);

        // cache original content
        /* jshint boss: true */
        var node,
            frag = this.inner = document.createElement('div');
        while (node = el.firstChild) {
            frag.appendChild(node);
        }
    },

    update: function(value) {
        if(!this.inner || this.isTransitionning) return;

        var Ctor  = this.compiler.getOption('components', value);
        if (!Ctor) return;

        if(this.childVM) {
            this.previousChildVM = this.childVM;
        }

        this.nextChildVM = new Ctor({
            el: this.raw.cloneNode(true),
            parent: this.vm,
            compilerOptions: {
                rawContent: this.inner.cloneNode(true)
            }
        });

        // Add router params to nextChildVM
        this.nextChildVM.$options.route.params = this.vm.context.params;

        // check if nextChildVM & previousChildVM are transition compatible, if not throw error
        this.el = this.nextChildVM.$el;
        if (this.compiler.init) {
            this.ref.parentNode.insertBefore(this.el, this.ref);
        } else {
            this.nextChildVM.$before(this.ref);
        }

        this.transition();
    },

    unbind: function() {
        if (this.childVM) {
            this.childVM.$destroy();
        }
    },

    /*
        Transition timings stuff
    */

    transition: function() {
        if(!this.nextChildVM) return;
        this.isTransitionning = true;
        if(this.previousChildVM) {
            switch(this.nextChildVM.$options.route.transitionMode) {
                case 'inAndAfterOut':
                    this.transitionInAndAfterOut();
                    break;
                case 'inAndOutTogether':
                    this.transitionInAndOutTogether();
                    break;
                case 'transitionInOnly':
                    this.previousChildVM.$destroy();
                    this.transitionInOnly();
                    break;
                default:
                    this.transitionOutAndAfterIn();
                    break;
            }
        }
        else {
            this.transitionInOnly();
        }
    },

    transitionInOnly: function() {
        console.log('transitionInOnly');
        this.scrollToTop();
        this.nextChildVM.$once('$page.transitionInComplete', function(){
            this.onTransitionComplete();
        }.bind(this));
        this.nextChildVM.transitionIn();
    },

    transitionOutAndAfterIn: function() {
        this.previousChildVM.$once('$page.transitionOutComplete', function(){
            this.previousChildVM.$destroy();
            this.scrollToTop();
            this.transitionInOnly();
        }.bind(this));
        this.previousChildVM.transitionOut();
    },

    transitionInAndAfterOut: function() {
        this.scrollToTop();
        this.nextChildVM.$once('$page.transitionInComplete', function(){
            this.previousChildVM.$on('$page.transitionOutComplete', function(){
                this.previousChildVM.$destroy();
                this.onTransitionComplete();
            }.bind(this));
            this.previousChildVM.$broadcast('$page.transitionOutStart');
            this.previousChildVM.transitionOut();
        }.bind(this));
        this.nextChildVM.transitionIn();
    },

    transitionInAndOutTogether: function() {
        this.scrollToTop();
        this.previousChildVM.$once('$page.transitionOutComplete', function(){
            this.previousChildVM.$destroy();
            this.onTransitionComplete();
        }.bind(this));
        this.previousChildVM.transitionOut();
        this.nextChildVM.transitionIn();
    },

    scrollToTop: function() {
        TweenMax.set(window, {scrollTo: {y: 0, x: 0}});
    },

    onTransitionComplete: function() {
        this.isTransitionning = false;
        this.childVM = this.nextChildVM;
    }
};