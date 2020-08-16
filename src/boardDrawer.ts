import * as Canvas from 'canvas';
import {Cell, CellStatus} from './board';

const gridSize = 10;
const gridCellSize = 22;
const gridOffset = 20;
const imgSize = 2 * gridOffset + gridSize * gridCellSize;
const labelSize = gridOffset * 0.75;

export const draw = (board: Cell[]): Buffer => {
  const canvas = Canvas.createCanvas(imgSize, imgSize);
  const ctx = canvas.getContext('2d');

  ctx.font = `${labelSize}px mono`;
  ctx.lineWidth = 1;

  board.forEach((cell, i) => {
    const rectStartX = (i % gridSize) * gridCellSize + gridOffset;
    const rectStartY = Math.floor(i / gridSize) * gridCellSize + gridOffset;

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
    ctx.strokeStyle = '#333333';
    ctx.strokeRect(rectStartX, rectStartY, gridCellSize, gridCellSize);
    ctx.fillRect(rectStartX, rectStartY, gridCellSize, gridCellSize);
  });

  const labelsH = 'ABCDEFGHIJ'.split('');
  const labelsV = '0123456789'.split('');

  ctx.fillStyle = '#ffffff';

  labelsH.forEach((labelH, i) => {
    const posX = i * gridCellSize + gridOffset + labelSize / 3;
    ctx.fillText(labelH, posX, gridOffset * 0.75); // upper
    ctx.fillText(
      labelH,
      posX,
      (gridSize + 1) * gridCellSize + gridOffset * 0.75
    ); // bottom
  });

  labelsV.forEach((labelV, i) => {
    const posY = (i + 1) * gridCellSize + gridOffset * 0.75;
    ctx.fillText(labelV, labelSize / 2, posY); // left
    ctx.fillText(labelV, (gridSize + 1) * gridCellSize, posY); // right
  });

  const buffer = canvas.toBuffer('image/png');
  return buffer;
};

/* test image generation with ts-node
import * as fs from 'fs';import {draw} from './src/boardDrawer';const buffer = draw([{x:0, y:1, status: 0}, {x:0, y:0, status: 1}]);fs.writeFile('img.png', buffer, () => {});
*/
