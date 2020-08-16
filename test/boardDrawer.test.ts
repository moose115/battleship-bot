import * as fs from 'fs';
import {draw} from './../src/boardDrawer';
import {Board} from '../src/board';

//this test is for quick board drawing
test('should run', () => {
  const board = new Board('testOwner');
  expect(
    (() => {
      const buffer = draw(board.body);
      fs.writeFileSync('test/boardTest.png', buffer);
      return buffer;
    })()
  ).toBeInstanceOf(Buffer);
});
