"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManger = void 0;
class GameManger {
    constructor() {
        this.games = [];
    }
    addGame(game) {
        this.games.push(game);
    }
    getGames() {
        return this.games;
    }
    addMove(gameId, move) {
        const game = this.games.find(game => game.id === gameId);
        if (game) {
            game.moves.push(move);
        }
    }
}
exports.GameManger = GameManger;
