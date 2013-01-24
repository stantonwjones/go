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
function Board( size, player1, player2 ) {
    // set self variable for continued use
    var self = this;

    // initialize the game grid
    self.grid = new Array(size);
    for ( var i = 0; i < size; i++) {
        self.grid[i] = new Array(size);
    };

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

    self.setBoardState = function(stateString) {
        
    };

}
