export enum CellStatus {
  Empty,
  Filled,
  Protected,
}

interface Cell {
  x: number;
  y: number;
  status: CellStatus;
}

export interface Board {
  owner: string;
  body: Cell[];
}

export const createBoard = (owner: string): Board => {
  const labels: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const body = [...new Array(100)].map(
    (_el, i): Cell => ({
      x: labels[i % 10],
      y: labels[Math.floor(i / 10)],
      status: CellStatus.Empty,
    })
  );
  return {
    owner,
    body,
  };
};
