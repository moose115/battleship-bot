import {Board} from './board';

interface PlayerData {
  name: string;
  board: Board;
}

export class Game {
  private _player1: PlayerData;
  private _player2: PlayerData;
  private _currentPlayerName: string;

  constructor(player1: string, player2: string) {
    this._player1 = {
      name: player1,
      board: new Board(player1),
    };
    this._player2 = {
      name: player2,
      board: new Board(player2),
    };
    this._currentPlayerName = player2;
  }

  putShip = (playerName: string, coordsRaw: string) => {};

  hasCurrentPlayerWon = (): boolean => {
    const player = this.getPlayerByName(this._currentPlayerName);
    return player.board.isCleared();
  };

  private getPlayerByName = (name: string): PlayerData => {
    if (name === this._player1.name) return this._player1;
    else return this._player2;
  };

  private switchPlayers = () => {
    if (this._currentPlayerName === this._player1.name)
      this._currentPlayerName = this._player2.name;
    else this._currentPlayerName = this._player1.name;
  };
}
