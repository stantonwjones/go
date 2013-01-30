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
define(['backbone'], function(Backbone) {
    var Board = Backbone.Model.extend({
        // initialize the game grid
        initialize: function() {
            var size = this.get('size');
            this.grid = new Array(size);
            for ( var i = 0; i < size; i++) {
                this.grid[i] = new Array(size);
                for (var j = 0; j < size; j++) {
                    this.grid[i][j] = 0;
                }
            };
            this.on('piecePlaced', function() {
                this.storeBoardState();
            });
        },
        defaults: {
            size: 9,
            turn: 0
        },
        states: {},

        getBoardState: function()  {
            var state = '';
            var size = this.get('size');
            for ( var i = 0; i < size; i++ ) {
                for (var j = 0; j < size; j++ ) {
                    if ( this.grid[i][j] ) {
                        state += this.grid[i][j];
                    } else {
                        state += '0';
                    }
                }
            }
            return state;
        },

        placePiece: function(player, x, y) {
            var isLegalMove = this.isLegalMove(player, x, y);
            if (isLegalMove) {
                this.grid[x][y] = this.gridState(player);
                this.assessTerritory(x, y, player);
                this.trigger('piecePlaced');
            }
            return isLegalMove;
        },
        // A bunch of methods which operate on the grid follow.
        // May want to abstract grid to its own class
        gridState: function(player) {
            return player.get('playerNum') + 1;
        },
        opponentGridState: function(player) {
            var ostate = {
                1: 2,
                2: 1
            };
            return ostate[this.gridState(player)];
        },
        
        assessTerritory: function( x, y, player ) {

            var captured = [];
            var playerGridVal = this.gridState(player);
            var opponentVal = this.opponentGridState(player);
            var adjacentEnemies = this.coordsOfVal( this.adjacentCoords(x, y), opponentVal );
            if (this.getGrid(x, y) == playerGridVal) {
                for ( var i = 0; i < adjacentEnemies.length; i++ ) {
                    captured = captured.concat(this.capturedStones(
                        adjacentEnemies[i][0],
                        adjacentEnemies[i][1]
                    ));
                }
            } else {
                captured = capturedStones(x, y);
            }
            this.captureStones(this.uniqCoords(captured));

        },
        capturedStones: function( x, y, gridVal, visited ) {
            var vis = visited ? visited : [[x, y]];
            if (vis.length > 100) throw 'going to deep';
            var gv = typeof(gridVal) == 'number' ? gridVal : this.getGrid(x,y);
            if (gv == 0) return [];

            var adjCoords = this.adjacentCoords(x, y);
            // get adjacent stones which are not visited but also
            // the same color
            var adjStones = this.coordsOfVal(adjCoords, gv);
            var adjEmpty = this.emptyCoords(adjCoords);
            var adjCaptureable = this.coordsNot(adjStones, vis);
            if (adjEmpty.length) return [];
            if (adjCaptureable.length) {
                for ( var i = 0; i < adjCaptureable.length; i++ ) {
                    var adjCoord = adjCaptureable[i];
                    vis.push(adjCoord);
                    if (this.capturedStones(adjCoord[0], adjCoord[1], gv, vis).length == 0)
                        return [];
                }
            }
            return vis;
        },

        // returns coordinates adjacent to the given x and y value
        // excludes coordinates not on the grid
        adjacentCoords: function(x, y) {
            var xint = parseInt(x);
            var yint = parseInt(y);
            var xhigh = xint + 1.0;
            var xlow = xint - 1.0;
            var yhigh = yint + 1.0;
            var ylow = yint - 1.0;
            var coords = [
                [xhigh, yint],
                [xlow, yint],
                [xint, yhigh],
                [xint, ylow]
            ];
            return this.coordsOnGrid(coords);
        },
        check: function(x, y) {
            if (typeof(parseInt(x)) != 'number' && typeof(parseInt(y)) != 'number') {
                throw 'not getting a fucking number here';
            }
        },
        coordsOnGrid: function( coords ) {
            var self = this;
            return _.filter(coords, function(coord) {
                return self.isOnGrid(coord);
            });
        },
        isOnGrid: function( coord ) {
            return (coord[0] >= 0 &&
                coord[1] >=0 &&
                coord[0] < this.get('size') &&
                coord[1] < this.get('size')
            );
        },
        coordsNot: function(coords, notCoords) {
            var self = this;
            var results = [];
            var store = {};
            _.forEach(notCoords, function(c) {
                self.intergize(c);
                store[c.toString()] = true;
            });
            _.forEach(coords, function(c) {
                self.intergize(c);
                if (!store[c.toString()]){
                    results.push(c);
                }
            });
            return results;
        },
        // Parse the values of this coordinate as integers
        intergize: function(coord) {
            coord[0] = parseInt(coord[0]);
            coord[1] = parseInt(coord[1]);
        },
        uniqCoords: function(coords) {
            var store = {};
            var uCoords = [];
            var key;
            for ( var i = 0; i < coords.length; i++ ) {
                key = coords[i].toString();
                if (store[key]) continue;
                store[key] = true;
                uCoords.push(coords[i]);
            }
            return uCoords;
        },
        emptyCoords: function(coords) {
            return this.coordsOfVal(coords, 0);
        },
        coordsOfVal: function(coords, val) {
            var self = this;
            var results = [];
            for(var i = 0; i < coords.length; i++) {
                var c = coords[i];
                var ex = c[0];
                var ey = c[1];
                if (self.getGrid(ex, ey) == val) results.push(c);
            };
            return results;

        },
        sameCoord: function(c1, c2) {
            return c1[0] == c2[0] && c1[1] == c2[1];
        },
        getGrid: function(x, y) {
            if (this.grid[x] != undefined) return this.grid[x][y];
            return undefined;
        },
        cloneGrid: function() {
            var newGrid = this.grid.slice(0);
            for ( var i = 0; i < newGrid.length; i++) {
                newGrid[i] = this.grid[i].slice(0);
            }
            return newGrid;
        },
             
        captureStones: function(coords) {
            for (var i = 0; i < coords.length; i++) {
                var x = coords[i][0];
                var y = coords[i][1];
                this.grid[x][y] = 0;
            }
        },

        // Store the board state in the state hash and increment the turn
        storeBoardState: function() {
            var boardState = this.getBoardState();
            var turn = this.get('turn');
            this.states[boardState] = turn;
            this.set('turn', turn + 1);
        },

        setBoardState: function(stateString) {
        },

        isLegalMove: function(player, x, y) {
            if (this.getGrid(x, y)) return false; // space is occupied so move is illegal
            // Create a board as possible next state
            window.nextBoard = this.clone();
            nextBoard.grid = this.cloneGrid();
            nextBoard.grid[x][y] = this.gridState( player );
            // first asses possible capture
            nextBoard.assessTerritory(x, y, player);
            // begin check for suicidal move
            if ( nextBoard.capturedStones(x, y).length )
                return false;
            // check ko rule against final nextBoard State
            var previousState = this.states[nextBoard.getBoardState()];
            if ( previousState )
                return false;
            return true;
        }
    });
    return {
        Board: Board
    };
});
