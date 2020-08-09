import * as Board from '../src/board';

test('should return board', () => {
  const board: Board.Board = Board.createBoard('testOwner');
  console.log(board);
  expect(board).toBeDefined();
});

test('should fill cell with ship and adjecent with protected', () => {
  
})
