requirejs.config({
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        }
    }
});

requirejs(['backbone', 'lib/lib'], function(Backbone, lib) {
    window.models = lib.models;
    window.views = lib.views;
    window.board = new models.Board();
    window.boardView = new views.Board({model: board});
    window.player1 = new lib.models.Player({
        playerNum: 0
    });
    window.player2 = new lib.models.Player({
        playerNum: 1
    });
    window.GO = {};
    GO.game = new lib.models.Game({
        players: [player1, player2]
    });
    boardView.render();
});
