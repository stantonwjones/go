requirejs.config({
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }/*,
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        }*/
    }
});

requirejs(['backbone'], function(Backbone) {
});
