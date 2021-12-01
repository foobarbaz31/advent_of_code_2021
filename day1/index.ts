import { readFileSync } from 'fs';
import { resolve } from 'path';

function day1_part1(inputArray: number[]): number {
  return inputArray.reduce((previousValue, currentValue, currentIndex, array) => {
    if(array[currentIndex] > array[currentIndex-1]) {
      previousValue++;
    }
    return previousValue;
  }, 0);
}

function day1_part2(inputArray: number[]): number {
  let i = 0;
  let windows = [];
  while(i < inputArray.length - 2) {
    windows.push(inputArray[i] + inputArray[i+1] + inputArray[i+2]);
    i++;
  }
  return day1_part1(windows);
}

function day1(): void {
  //const sampleInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
  const inputArray = readFileSync(resolve(`${__dirname}/input.txt`), 'utf-8').split('\n').map(item => parseInt(item, 10))

  const day1Part1 = day1_part1(inputArray);
  console.log(`day1Part1 soln is ${day1Part1}`);

  const day2Part2 = day1_part2(inputArray);
  console.log(`day2Part2 soln is ${day2Part2}`)
}

day1()