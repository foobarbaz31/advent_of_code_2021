import { readFileSync } from 'fs';
import { resolve } from 'path';

function dfsFlash(grid: number[][], currentRow: number, currentCol: number, visited: Set<string>, resultCount:  Record<string, number>) {
  if (currentRow >= 0 && currentCol >=0 && currentRow < grid.length && currentCol < grid[0].length) {
  // check if current cell is 9 - is so make it 0 and dfs over it's adjacnets; if not increment life
    if (grid[currentRow][currentCol] === 9) {
      resultCount.result = resultCount.result + 1;
      grid[currentRow][currentCol] = 0
      visited.add(`${currentRow}-${currentCol}`); // so that we don't make this 0 1 in the same step
      
      // now dfs
      dfsFlash(grid, currentRow - 1, currentCol, visited, resultCount); // row above
      dfsFlash(grid, currentRow + 1, currentCol, visited, resultCount); // row below
      dfsFlash(grid, currentRow, currentCol - 1, visited, resultCount); // col left
      dfsFlash(grid, currentRow, currentCol + 1, visited, resultCount); // col right
      dfsFlash(grid, currentRow - 1, currentCol - 1, visited, resultCount);  // diagonal top left
      dfsFlash(grid, currentRow + 1, currentCol - 1, visited, resultCount);  // diagonal botton left
      dfsFlash(grid, currentRow - 1, currentCol + 1, visited, resultCount);  // diagonal top right
      dfsFlash(grid, currentRow + 1, currentCol + 1, visited, resultCount);  // diagonal botton right
    } else {
      if(!visited.has(`${currentRow}-${currentCol}`)) {
        grid[currentRow][currentCol] += 1; 
      }
    }
  }
}

function day11_part1(inputArray: number[][]) {
  const maxStepCount = 100;
  const resultCount: Record<string, number> = { result: 0 };

  let steps = 0;
  while (steps < maxStepCount) {
    const visited: Set<string> = new Set();
    for(let i = 0; i < inputArray.length; i++) {
      for (let j = 0; j < inputArray[i].length; j++) {
        dfsFlash(inputArray, i, j, visited, resultCount);
      }
    }
    steps++;
  }
  return resultCount.result;
}

function day11_part2(inputArray: number[][]) {
  let allFlashed = false;
  let stepCounter = 0;
  const resultCount: Record<string, number> = { result: 0 };
  const totalOctopi = 100;
  while (!allFlashed) {
    const visited: Set<string> = new Set();
    for(let i = 0; i < inputArray.length; i++) {
      for(let j = 0; j < inputArray[i].length; j++) {
        dfsFlash(inputArray, i, j, visited, resultCount);
        if (visited.size === totalOctopi) {
          allFlashed = true;
        }
      }
    }
    stepCounter++;
  }
  return stepCounter;
}

function day11(inputFileName: string) {
  const inputArray = readFileSync(resolve(`${__dirname}/${inputFileName}`), 'utf-8')
  .split('\n')
  .map(line => line.split('').map(item => parseInt(item, 10)))


  const day11Part1 = day11_part1(inputArray);
  console.log(`day11Part1 is ${day11Part1}`);

  // Note: comment out part L83-84 before running part 2 since inputarray has mutated in part 1
  const day11Part2 = day11_part2(inputArray);
  console.log(`day11Part2 ${day11Part2}`);
}

day11('input.txt')