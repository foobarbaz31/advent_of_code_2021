import { readFileSync } from 'fs';
import { resolve } from 'path';

function foldUp(dotPositions: string[][], median: number, maxRow: number, maxCol: number) {
  let fromRow = median + 1;
  let toRow = median - 1;
  for(let i = fromRow; i <= maxRow; i++) {
    for(let j = 0 ; j <= maxCol; j++) {
      if(toRow < 0) {
        return;
      } 
      if (dotPositions[toRow][j] === '#' && dotPositions[i][j] === '.') {
        continue;
      }
      dotPositions[toRow][j] = dotPositions[i][j]
    }
    toRow = toRow - 1;
  } 
  // after this round the new max row ==> median - 1
}

function foldLeft(dotPositions: string[][], median: number, maxRow: number, maxCol: number) {
  let fromCol = median + 1;
  let toCol = median - 1;
  for (let j = fromCol; j <= maxCol; j++) {
    for(let i = 0; i <= maxRow; i++) {
      if (toCol < 0) {
        return;
      }
      if (dotPositions[i][toCol] === '#' && dotPositions[i][j] === '.') {
        continue;
      }
      dotPositions[i][toCol] = dotPositions[i][j]
    }
    toCol = toCol - 1;
  }
}

function calculateDots(dotPositions: string[][], endRow: number, endCol: number) {
  let count = 0;
  for(let i = 0; i <= endRow; i++) {
    for (let j = 0; j <= endCol; j++) {
      if(dotPositions[i][j] === '#') {
        count++;
      }
    }
  }
  return count;
}

function day13_part1(dotPositions: string[][], foldInstruction: string) {
  const [vector, value] = foldInstruction.replace('fold along ', '').split('=');
  let maxRow = dotPositions.length - 1;
  let maxCol = dotPositions[0].length - 1;
  if (vector === 'y') {
    foldUp(dotPositions, parseInt(value, 10), maxRow, maxCol)
    maxRow = parseInt(value, 10) - 1;
  } else {
    foldLeft(dotPositions, parseInt(value, 10), maxRow, maxCol) 
    maxCol = parseInt(value, 10) - 1;
  }
  return calculateDots(dotPositions, maxRow, maxCol)
}

function day13_part2(dotPositions: string[][], foldInstructions: string[]) {
  const instructions = foldInstructions.map(item => item.replace('fold along ', ''));
  let maxRow = dotPositions.length - 1;
  let maxCol = dotPositions[0].length - 1;
  for(let instruction of instructions) {
    const [vector, value] = instruction.split('=');
    if (vector === 'y') {
      foldUp(dotPositions, parseInt(value, 10), maxRow, maxCol)
      maxRow = parseInt(value, 10) - 1;
    } else {
      foldLeft(dotPositions, parseInt(value, 10), maxRow, maxCol) 
      maxCol = parseInt(value, 10) - 1;
    }
  }

  for(let i = 0; i <= maxRow; i++) {
    let str = ""
    for(let j = 0; j <= maxCol; j++) {
      if(dotPositions[i][j] === '#') {
        str += "█";
      } else {
        str += "-";
      }
    }
    console.log(str);
  }
}

function day13(inputFileName:string) {
  const inputArray = readFileSync(resolve(`${__dirname}/${inputFileName}`), 'utf-8')
  .split('\n');

  const dotPositions: any[][] = [];
  const foldInstructions: string[] = [];
  let maxRow: number = -1;
  let maxCol: number = -1;
  for(let input of inputArray) {
    if (/^\d/.test(input)) {
      const cords = input.split(',');
      const row = parseInt(cords[1], 10);
      const col = parseInt(cords[0], 10);
      maxRow = Math.max(row, maxRow);
      maxCol = Math.max(col, maxCol);
      if (dotPositions[row]) {
        dotPositions[row][col] = '#' 
      } else {
        dotPositions[row] = [];
        dotPositions[row][col] = '#'
      }
    }
    if(input.startsWith('fold')) {
      foldInstructions.push(input);
    }
  }

  for(let i = 0; i <= maxRow; i++) {
    for(let j = 0; j <= maxCol; j++) {
      if(dotPositions[i] === undefined) {
        dotPositions[i] = new Array(maxCol);
      }
      if (dotPositions[i][j] === undefined) {
        dotPositions[i][j] = '.'
      }
    }
  }

  day13_part1(dotPositions, foldInstructions[0]);

  day13_part2(dotPositions, foldInstructions);
}

day13('input.txt');