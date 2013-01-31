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
    var GO = {};
    window.GO = GO;
    // TODO: refractor all of the following into
    //  an 'app' module for central app logic
    GO.dispatcher = _.extend({}, Backbone.Events);
    // use the dispatcher to dispense application actions
    // change the below to local vars after test is finished
    window.models = lib.models;
    window.views = lib.views;
    window.board = new models.Board({
        size: 13
    });
    window.boardView = new views.Board({model: board});
    window.player1 = new lib.models.Player({
        playerNum: 0
    });
    window.player2 = new lib.models.Player({
        playerNum: 1
    });
    window.game = new lib.models.Game({
        players: [player1, player2]
    });
    GO.game = game;
    GO.dispatcher.on('placePiece', function(options) {
        GO.game.get('currentPlayer')
            .placePiece( board, options.x, options.y );
    });
    GO.dispatcher.on('render', function() {
        boardView.render();
    });
    GO.dispatcher.listenTo(board, 'piecePlaced', function() {
        GO.dispatcher.trigger('render');
        game.nextTurn();
    });
    GO.dispatcher.listenTo(boardView, 'placePiece', function(coords) {
        GO.game.get('currentPlayer')
            .placePiece( board, coords.x, coords.y );
    });
    boardView.render();
});
