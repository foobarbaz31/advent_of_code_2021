import { readFileSync } from 'fs';
import { resolve } from 'path';

function isLowestPoint(grid: number[][], currentRow: number, currentCol: number) {
  const currPoint = grid[currentRow][currentCol];
  const otherPoints = [];

  // row above
  const dirs = [ [-1, 0], [1, 0], [0, -1], [0, 1]];
  for (let dir of dirs) {
    let newRow = currentRow + dir[0];
    let newCol = currentCol + dir[1];
    if ( (newRow >=0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length)) {
      otherPoints.push(grid[newRow][newCol]);
    }
  }
  const min = Math.min(...otherPoints);
  if (currPoint < min) {
    return true;
  }

  return false;
}

function getBasinSize(grid: number[][], currentRow: number, currentCol: number, result: any) {
  if(grid[currentRow][currentCol] !== 9) {
    result.countr++;
    grid[currentRow][currentCol] = 9;
    
    if (currentRow >= 1) getBasinSize(grid, currentRow - 1, currentCol, result);

    if (currentCol >= 1) getBasinSize(grid, currentRow, currentCol -1 , result)

    if (currentRow < grid.length - 1) getBasinSize (grid, currentRow+1, currentCol, result);

    if (currentCol < grid[0].length - 1) getBasinSize(grid, currentRow, currentCol + 1, result)
  }
}

function day9_part2(grid: number[][]): number {
  // first find all the lowest points
  // for every lowest point dfs until we find the size
  const m = grid.length;
  const n = grid[0].length;
  let basinSizes = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if(isLowestPoint(grid, i, j)) {
        let result = { countr: 0 }
        getBasinSize(grid, i, j, result);
        basinSizes.push(result.countr)
      }
    }
  }
  const sortedBasins = basinSizes.sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
    else return 0;
  })
  return (sortedBasins[0] * sortedBasins[1] * sortedBasins[2])
}

function day9_part1(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  let sum = 0;
  for(let i = 0; i < m; i++) {
    for(let j = 0; j < n; j++) {
      if(isLowestPoint(grid, i, j)) {
        sum += (grid[i][j] + 1)
      }
    }
  }
  return sum;
}

function day9(inputFileName: string) {
  const inputArray = readFileSync(resolve(`${__dirname}/${inputFileName}`), 'utf-8')
  .split('\n')
  .map(line => line.split('').map(item => parseInt(item, 10)))

  const day9Part1 = day9_part1(inputArray);
  console.log(day9Part1)
  
  const day9Part2 = day9_part2(inputArray);
  console.log(day9Part2)
}

day9('input.txt')