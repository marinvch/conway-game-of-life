export const gameField = (rows: number, cols: number) => {
  return Array.from({ length: rows }, () => {
    return Array.from({ length: cols }, () => {
      return Math.floor(Math.random() * 2);
    });
  });
};

export const createEmptyGrid = (rows: number, cols: number) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0)
  );
};

export const totalPopulation = (canvas: number[][]) => {
  return canvas.reduce((acc, row) => {
    return (
      acc +
      row.reduce((rowAcc, cell) => {
        return rowAcc + cell;
      }, 0)
    );
  }, 0);
};

export const countNeighbors = (
  grid: number[][],
  x: number,
  y: number
): number => {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // Skip the cell itself
      const newX = x + i;
      const newY = y + j;

      if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
        count += grid[newX][newY];
      }
    }
  }

  return count;
};

export const getNextGeneration = (grid: number[][]): number[][] => {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = createEmptyGrid(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const neighbors = countNeighbors(grid, i, j);
      const isAlive = grid[i][j] === 1;

      if (isAlive) {
        // Conway's rules for live cells
        if (neighbors < 2) {
          newGrid[i][j] = 0; // Dies by underpopulation
        } else if (neighbors === 2 || neighbors === 3) {
          newGrid[i][j] = 1; // Lives on to next generation
        } else if (neighbors > 3) {
          newGrid[i][j] = 0; // Dies by overpopulation
        }
      } else {
        // Conway's rules for dead cells
        if (neighbors === 3) {
          newGrid[i][j] = 1; // Becomes alive by reproduction
        }
      }
    }
  }

  return newGrid;
};
