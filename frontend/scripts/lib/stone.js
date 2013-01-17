/**
 *  Defines a stone ( the game piece used in go )
 *
 *  A stone can has a player and places itself on
 *  the board unless the board determines the
 *  move is illegal.  The color of the stone
 *  reflects the player.
 */
function Stone( player, board ) {
    self = this;
    self.color = player.number > 1 ? 'white' : 'black';

    self.place = function( x, y ) {
        // TODO: wrap this in try catch depending
        // how we want to handle invalid stone
        // locations.
        board.placeStone( player, x, y );
        return true;
    };
}
