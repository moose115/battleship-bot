import * as Canvas from 'canvas';
import {Cell, CellStatus} from './board';

const imgSize = 260;
const gridCellSize = 22;
const gridOffset = 20;
const labelSize = 12;

export const draw = (board: Cell[]): Buffer => {
  const canvas = Canvas.createCanvas(imgSize, imgSize);
  const ctx = canvas.getContext('2d');

  ctx.font = `${labelSize}px mono`;
  ctx.lineWidth = 1;

  board.forEach((cell, i) => {
    const rectStartX = (i % 10) * gridCellSize + gridOffset;
    const rectStartY = Math.floor((i + 1) / 10) * gridCellSize + gridOffset;

    switch (cell.status) {
      case CellStatus.Empty:
        ctx.fillStyle = '#ffffff';
        break;
      case CellStatus.Shot:
        ctx.fillStyle = '#aaaaaa';
        break;
      case CellStatus.Protected:
      case CellStatus.Ignore:
        ctx.fillStyle = '#ffa500';
        break;
      case CellStatus.Ship:
        ctx.fillStyle = '#aa8500';
        break;
      case CellStatus.Hit:
        ctx.fillStyle = '#cc0000';
        break;
      default:
        ctx.fillStyle = 'rgb(256, 256, 256)';
    }
    ctx.fillRect(rectStartX, rectStartY, gridCellSize, gridCellSize);
  });

  const labelsH = 'ABCDEFGHIJ'.split('');
  const labelsV = '0123456789'.split('');

  ctx.fillStyle = '#ffffff';

  labelsH.forEach((labelH, i) => {
    const {width} = ctx.measureText(labelH);
    const posX = i * gridCellSize + gridOffset + width / 2;
    ctx.fillText(labelH, posX, labelSize);
    ctx.fillText(labelH, posX, imgSize - gridOffset / 2);
  });

  const buffer = canvas.toBuffer('image/png');
  return buffer;
};

/* test image generation with ts-node
import * as fs from 'fs';import {draw} from './src/boardDrawer';const buffer = draw([{x:0, y:1, status: 0}, {x:0, y:0, status: 1}]);fs.writeFile('img.png', buffer, () => {});
*/
