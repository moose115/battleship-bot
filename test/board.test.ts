import {Board, CellStatus, Direction} from '../src/board';

test('should return board', () => {
  const board = new Board('testOwner');
  expect(board).toBeDefined();
});

test('should fill cell with ship', () => {
  const board = new Board('testOwner');
  const randomX = Math.floor(Math.random() * 10);
  const randomY = Math.floor(Math.random() * 10);
  board.setCellShip(board.getCell(randomX, randomY));
  expect(board.getCell(randomX, randomY).status).toBe(CellStatus.Ship);
});

test('should throw no cell error', () => {
  const board = new Board('testOwner');
  expect(() => {
    board.getCell(1000, 1000);
  }).toThrow();
});

test('should fill cells with ships in one direction', () => {
  const board = new Board('testOwner');
  const startCell = board.getCell(3, 3);
  board.fillInDirection(startCell, 3, Direction.Right);
  for (let i = 3; i < 5; i++) {
    expect(board.getCell(i, 3).status).toBe(CellStatus.Ship);
  }
});

test('should throw cell not empty error', () => {
  const board = new Board('testOwner');
  board.setCellShip(board.getCell(3, 3));
  expect(() => {
    board.fillInDirection(board.getCell(2, 3), 3, Direction.Right);
  }).toThrow();
});

test('should throw out of border error', () => {
  const board = new Board('testOwner');
  expect(() => {
    board.fillInDirection(board.getCell(9, 9), 4, Direction.Down);
  }).toThrow();
});

test('should shoot ship into hit and empty into shot', () => {
  const board = new Board('testOwner');
  const emptyCell = board.getCell(0, 0);
  const shipCell = board.getCell(0, 5);
  board.setCellShip(shipCell);
  board.shoot(emptyCell);
  board.shoot(shipCell);
  expect(emptyCell.status).toBe(CellStatus.Shot);
  expect(shipCell.status).toBe(CellStatus.Hit);
});

test("should throw can't hit error", () => {
  const board = new Board('testOwner');
  const shipCell = board.getCell(3, 3);
  board.fillInDirection(shipCell, 1, Direction.Right);
  const ignoreCell = board.getCell(4, 3);
  board.shoot(shipCell);
  expect(() => {
    board.shoot(shipCell);
  }).toThrow();
  expect(() => {
    console.log(ignoreCell.status);
    board.shoot(ignoreCell);
  }).toThrow();
});

test('should return if board is cleared', () => {
  const board = new Board('testOwner');
  expect(board.isCleared()).toBe(true);
  board.fillInDirection(board.getCell(3, 3), 3, Direction.Right);
  expect(board.isCleared()).toBe(false);
});
