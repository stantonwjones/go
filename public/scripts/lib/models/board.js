/**
 *  Define the game board.
 *
 *  The board holds the game grid and uses it to
 *  store the location of game pieces.
 *  The board determines whether a move is legal.
 *  The board saves previous game states to
 *  insure the ko rule is followed.
 *  The board calculates territory and influence
 *  for use in determining the score.
 */
// TODO: change this to an implementation of Backbone.Model.extend({...})
function boardProt( size ) {
    // set self variable for continued use
    var self = this;

    // initialize the game grid
    self.grid = new Array(size);
    for ( var i = 0; i < size; i++) {
        self.grid[i] = new Array(size);
    };
    self.size = size;

    self.states = {};

    self.getBoardState = function()  {
        state = '';
        for ( var i = 0; i < size; i++ ) {
            for (var j = 0; j < size; j++ ) {
                if ( self.grid[i][j] ) {
                    state += self.grid[i][j];
                } else {
                    state += '0';
                }
            }
        }
    };

    self.placePiece = function(player, x, y) {
        self.grid[x][y] = player.getColor();
        self.assessTerritory();
        window.GO.game.nextTurn();
        this.trigger('piecePlaced');
    };
    
    self.assessTerritory = function() {
        // assess the territory and remove pieces as necessary
    };

    self.setBoardState = function(stateString) {
        
    };
}

define(['backbone'], function(Backbone) {
    window.bprot = new boardProt(9);
    var options = {};
    var Board = Backbone.Model.extend( bprot, options );
    return {
        Board: Board
    };
});
