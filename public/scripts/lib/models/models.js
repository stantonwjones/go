define(['./board', './game', './player'], function(board, game, player) {
    return {
        Board: board.Board,
        Game: game.Game,
        Player: player.Player
    };
});
