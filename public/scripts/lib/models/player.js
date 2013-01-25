/**
 *  Defines a player in the game.
 *
 *  A player can only move his own pieces during
 *  his turn.  A player can win or loose.
 *  A player can take actions:
 *      place a piece
 *      pass the turn
 */
/*
function Player( number ) {
    var self = this;

    self.number = number;
    
}
*/
define( ['backbone'], function(Backbone) {
    var Player = Backbone.Model.extend({
        getColor: function() {
            return this.get('playerNum') ? 'white' : 'black';
        },
        canMove: false,
        placePiece: function(board, x, y) {
            board.placePiece( this, x, y );
        }
    });
    return {
        Player: Player
    };
});
