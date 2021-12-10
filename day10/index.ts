import { readFileSync } from 'fs';
import { resolve } from 'path';
import { get } from 'https';

const bracketMap = {
  '(' : ')',
  '[' : ']',
  '{' : '}',
  '<' : '>'
};

function getRemainderBracketScore(bracketString: string): number {
  const bracketPoints: Record<string, number> = {
    ')': 1,
    ']': 2,
    '}' : 3,
    '>' : 4
  };

  const chars = bracketString.split('');
  const stack: string[] = [];
  for (let char of chars) {
    if(char === '(' || char === '[' || char === '{' || char === '<') {
      stack.push(bracketMap[char])
    } else {
      let expectedBracket =stack.pop();
      if (expectedBracket !== char)  {
        return -1; // return 0 for corrupt strings, so it does not affect the sum
      }
    }
  }

  return stack.reverse().reduce((result, item) => {
    result = ( result * 5) + bracketPoints[item];
    return result;
  }, 0);
}

function validateBrackets(bracketString: string): string | null {
  const chars = bracketString.split('');
  const stack: string[] = [];
  for (let char of chars) {
    if(char === '(' || char === '[' || char === '{' || char === '<') {
      stack.push(bracketMap[char])
    } else {
      let expectedBracket =stack.pop();
      if (expectedBracket !== char)  {
        return char;
      }
    }
  }
  return null;
}

function day10_part1(inputArray: string[]) {
  const illegalPoints: Record<string, number> = {
    ')' : 3,
    ']' : 57,
    '}' : 1197,
    '>' : 25137
  };

  // let sum = 0;
  return inputArray.reduce((result, inputStr) => {
    const illegalBrack = validateBrackets(inputStr);
    if (illegalBrack) {
      result += illegalPoints[illegalBrack];
    }
    return result;
  }, 0);
}

function day10_part2(inputArray: string[]) {
  const updatedScores =  inputArray
    .map((item) => getRemainderBracketScore(item))
    .filter((item) => item !== -1)
    .sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      else return 0;
    })
  return updatedScores[Math.floor(updatedScores.length/2)];
}

function day10(inputFileName: string) {
  const inputArray = readFileSync(resolve(`${__dirname}/${inputFileName}`), 'utf-8')
  .split('\n').map(item => item.trim())

  const day10Part1 = day10_part1(inputArray)
  console.log(day10Part1)

  const day10Part2 = day10_part2(inputArray)
  console.log(day10Part2)
}

day10('input.txt');