import { readFileSync } from 'fs';
import { resolve } from 'path';

// convert board to single array
function mapBoards(boardString: string): number[] {
  return boardString
    .split('\n')
    .map(item => item.trim().
      replace(/\s\s+/g, ' ')
    )
    .map(item => item.split(' '))
    .flat()
    .map(item => parseInt(item, 10))
    .filter(item => !isNaN(item))
}

function doesRowWin(board:number[], rowToCheck: number) {
  // i know my number is say in row == 3 and I know its' index is 16
  let startIdxToCheck = rowToCheck * 5;
  let cntr = 0;
  while (cntr < 5) {
    if(board[startIdxToCheck] >= 0) {
      return false;
    }
    startIdxToCheck++;
    cntr++;
  }
  return true;
}

function doesColWin(board: number[], colToCheck: number) {
  let startCol = colToCheck;
  let cntr = 0;
  while(cntr < 5) {
    if(board[startCol] >= 0) {
      return false;
    }
    startCol+=5;
    cntr++;
  }
  return true;
}

function checkIfBoardWins(board: number[], calledItem: number) {
  // check if calledItem exists on the board
  const idxOfCalledItem = board.indexOf(calledItem);
  if (idxOfCalledItem === -1) {
    return false; // does not exist on board
  }
  // mark current item as called
  board[idxOfCalledItem] = calledItem === 0 ? Number.NEGATIVE_INFINITY : calledItem * -1; // negative nos to indicate item is selected
  const currItemCol = idxOfCalledItem % 5;
  const currItemRow = Math.floor(idxOfCalledItem / 5);

  // now check if that row has all -ves or check if that col has all -ves
  const rowWin = doesRowWin(board, currItemRow);
  const colWin = doesColWin(board, currItemCol);

  return rowWin || colWin;
}

function calculateWinningScore(board: number[], calledNumber: number): number {
  let sum = 0;
  for(let item of board) {
    if (item >= 0) sum+=item;
  }
  return sum * calledNumber;
}

function day4_part1(calledNumbersArray: string[], allBoards: number[][]) {
  for(let calledNo of calledNumbersArray) {
    for(let board of allBoards) {
      const output = checkIfBoardWins(board, parseInt(calledNo));
      if(output) {
        const winningScore = calculateWinningScore(board, parseInt(calledNo));
        return winningScore;
      }
    }
  }
}

function day4_part2(calledNumbersArray: string[], allBoards: number[][]) {
  const boardsWonSoFar = new Set();
  for(let calledNo of calledNumbersArray) {
    for(let j=0; j < allBoards.length; j++) {
      // don't re-check an already won board
      const output = !boardsWonSoFar.has(j) && checkIfBoardWins(allBoards[j], parseInt(calledNo));
      if(output) {
        boardsWonSoFar.add(j);
        if(boardsWonSoFar.size === allBoards.length) {
          // all boards have won and this is the last won
          return calculateWinningScore(allBoards[j], parseInt(calledNo));
        }
      }
    }
  }
}

function day4(inputFileName: string): void {
  const [random, ...boards] = readFileSync(resolve(`${__dirname}/${inputFileName}`), 'utf-8').split('\n\n');

  const allBoards = boards.map(board => mapBoards(board));

  const calledNumbersArray = random.split(',');

  const day4Part1 = day4_part1(calledNumbersArray, allBoards)
  console.log(`day4_part1 soln is ${day4Part1}`)

  const day4Part2 = day4_part2(calledNumbersArray, allBoards);
  console.log(day4Part2)
}

day4('input.txt')