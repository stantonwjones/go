/**
 *  Defines the game object
 *
 *  A game has two players and keeps track of
 *  whose turn it is and evaluates the win
 *  conditions at the end of each turn.
 */
define(['backbone'], function(Backbone) {
    var Game = Backbone.Model.extend({
        nextTurn: function() {
            var current = this.get('currentPlayer');
            var other = this.get('players')[ (current.get('playerNum') + 1) % 2];
            current.canMove = false;
            other.canMove = true;
            this.set('currentPlayer', other);
            this.trigger('nextTurn');
        },
        defaults: {
            players: [],
            currentPlayer: null,
            turn: 0,
            board: null
        },
        initialize: function() {
            this.attributes.currentPlayer = this.attributes.players[0];
            this.attributes.currentPlayer.canMove = true;
        }
    });
    return {
        Game: Game
    };
});
