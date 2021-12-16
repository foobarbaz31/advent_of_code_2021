import { readFileSync } from 'fs';
import { resolve } from 'path';
import PriorityQueue from './PriorityQueue';

type Point = {
  x: number;
  y: number;
}

const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
]

function day15_part1(grid: number[][]) {
  const maxRow = grid.length;
  const maxCol = grid[0].length;

  // initial costs array with everything Infinity
  const costs: number[][] = new Array(grid.length).fill(Number.POSITIVE_INFINITY)
    .map(() => Array(grid[0].length).fill(Number.POSITIVE_INFINITY));

  // init PQ and add first starting point with zero cost to it
  const pq: PriorityQueue<Point> = new PriorityQueue();
  pq.insert({ x: 0, y: 0}, 0);

  const visited: Set<string> = new Set();

  // now we do the BFS -- reason for using PQ over regular Q is that PQ will always return minium cost adjacent
  while(!pq.isEmpty()) {
    const data  = pq.pop();
    if (data === undefined || data === null) return;

    let currentPoint = data[0];
    let costUptoThisPoint = data[1];

    const { x, y } = currentPoint;

    // if adjacent has been visited don't bother again
    if(visited.has(`${x}${y}`)) { continue; };

    visited.add(`${x}${y}`)


    if(x === maxRow && y === maxCol) {
      // we  reached the end 
      return;
    }

    if( costUptoThisPoint + grid[x][y] < costs[x][y]) {
      costs[x][y] = costUptoThisPoint + grid[x][y];
    }
    // add adjacents
    for (let dir of dirs) {
      let newRow = x + dir[0];
      let newCol = y + dir[1];
      if ( (newRow >=0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length)) {
        pq.insert({ x: newRow, y: newCol}, costs[x][y])
      }
    }
  }

  return costs[maxRow - 1][maxCol - 1] - grid[0][0];
}

/**
 * 
 * This function is very ugly
 * Pretty sure there is  better way to do this with % for col and / for row
 * #REVISIT
 */
function day15_part2(baseGrid: number[][]) {
  const maxRow = baseGrid.length;
  const maxCol = baseGrid[0].length;
  let newGrid: number[][] = []

  // fill out the 50 cols in the new grid for first max rows
  let newRow: number[][] = [];
  for (let i = 0; i < maxRow; i++) {
    newRow[i] = [];
    for(let mult = 0; mult < 5; mult++) {
      let newCostsPerStep = [];
      for(let j = 0; j < maxCol; j++) {
        let newCost = baseGrid[i][j] + mult > 9 ? ((baseGrid[i][j] + mult) % 9): baseGrid[i][j] + mult;
        newCostsPerStep.push(newCost)
      }
      newRow[i] = [...newRow[i], ...newCostsPerStep];
    }
  }

  newGrid = newRow;

  const veryNewGrid: number[][] = [];
  // now multiply rows 5 times
  for(let mult = 0; mult < 5; mult++) {
    for(let row = 0; row < newGrid.length; row++) {
      let newCostPerRow = [];
      for(let j = 0; j < newGrid[0].length; j++) {
        let newCost = newGrid[row][j] + mult > 9 ? ((newGrid[row][j] + mult) % 9): newGrid[row][j] + mult;
        newCostPerRow.push(newCost);
      }
      veryNewGrid.push(newCostPerRow)
    }
  }
  return day15_part1(veryNewGrid);
}

function day15(inputFileName: string) {
  const inputArray = readFileSync(resolve(`${__dirname}/${inputFileName}`), 'utf-8').split('\n');

  const grid = inputArray.map((row) => {
    return row.split('').map((col) => {
      return parseInt(col, 10);
    })
  });

  console.log(day15_part2(grid));
}

day15('input.txt');
