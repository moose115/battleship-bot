import {Game} from '../src/game';

test('should start game', () => {
  const game = new Game('test1', 'test2');
  expect(game).toBeDefined();
});

test("should should return if current player's won", () => {
  const game = new Game('test1', 'test2');
  expect(typeof game.hasCurrentPlayerWon() === 'boolean').toBeTruthy();
});
