export enum CellStatus {
  Empty,
  Ship,
  Protected,
  Shot,
  Hit,
  Ignore,
}

export enum Direction {
  Up,
  Right,
  Down,
  Left,
}

export interface Cell {
  x: number;
  y: number;
  status: CellStatus;
}

export class Board {
  private _owner: string;
  private _body: Cell[];

  get owner(): string {
    return this._owner;
  }

  get body(): Cell[] {
    return this._body;
  }

  constructor(owner: string) {
    this._owner = owner;
    const labels: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this._body = [...new Array(100)].map(
      (_, i): Cell => ({
        x: labels[i % 10],
        y: labels[Math.floor(i / 10)],
        status: CellStatus.Empty,
      })
    );
  }

  getCell = (x = 0, y = 0): Cell => {
    const cell = this.body.find(el => el.x === x && el.y === y);
    if (!cell) throw Error('Cell not found');
    return cell;
  };

  getAdjecentCells = (cell: Cell) => {
    return this.body.filter(
      el =>
        el.x >= cell.x - 1 &&
        el.x <= cell.x + 1 &&
        el.y >= cell.y - 1 &&
        el.y <= cell.y + 1
    );
  };

  setCellShip = (cell: Cell) => {
    if (cell.status !== CellStatus.Empty) throw Error('Cell not empty');
    cell.status = CellStatus.Ship;
  };

  setAdjecentCellsProtected = (cell: Cell) => {
    this.getAdjecentCells(cell).forEach(
      el => el.status !== CellStatus.Ship && (el.status = CellStatus.Protected)
    );
  };

  fillInDirection = (startCell: Cell, howMany: number, dir: Direction) => {
    let y = startCell.y;
    let x = startCell.x;
    if (
      y + howMany > 9 ||
      x + howMany > 9 ||
      y - howMany < 0 ||
      x - howMany < 0
    )
      throw Error('Out of border');
    const modifiedCells = [];
    while (howMany > 0) {
      if (dir === Direction.Up || dir === Direction.Down) {
        const cell = this.getCell(x, y);
        this.setCellShip(cell);
        if (dir === Direction.Down) y++;
        else y--;
        modifiedCells.push(cell);
      } else {
        const cell = this.getCell(x, y);
        this.setCellShip(cell);
        if (dir === Direction.Right) x++;
        else x--;
        modifiedCells.push(cell);
      }
      howMany--;
    }
    for (const modified of modifiedCells)
      this.setAdjecentCellsProtected(modified);
  };

  setCellShot = (cell: Cell) => {
    cell.status = CellStatus.Shot;
  };

  setCellHit = (cell: Cell) => {
    cell.status = CellStatus.Hit;
    if (this.isShipDestroyed(cell)) {
      for (const adjecent of this.getAdjecentCells(cell))
        adjecent.status = CellStatus.Ignore;
    }
  };

  shoot = (cell: Cell) => {
    if (cell.status === CellStatus.Ship) return this.setCellHit(cell);
    if (
      cell.status !== CellStatus.Empty &&
      cell.status !== CellStatus.Protected
    )
      throw Error('Cell not empty');
    this.setCellShot(cell);
  };

  isShipDestroyed = (cell: Cell) => {
    let isDestroyed = true;
    console.log(this.getAdjecentCells(cell));
    for (const adjecent of this.getAdjecentCells(cell)) {
      if (
        adjecent.status !== CellStatus.Ignore &&
        adjecent.status !== CellStatus.Hit &&
        adjecent.status !== CellStatus.Protected
      )
        isDestroyed = false;
    }
    return isDestroyed;
  };

  isCleared = () => {
    return this.body.every(cell => cell.status !== CellStatus.Ship);
  };
}
