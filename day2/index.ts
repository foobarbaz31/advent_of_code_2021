import { readFileSync } from 'fs';
import { resolve } from 'path';

function day2_part1(inputArray: string[]): number {
  const day2Reduction = inputArray.reduce((results, item) => {
    const [direction, value] = item.split(' ');
    switch (direction) {
      case 'forward': 
        results.horizontal = results.horizontal + parseInt(value, 10);
        break; 
      case 'up':
        results.vertical = results.vertical - parseInt(value, 10);
        break;
      default:
        results.vertical = results.vertical + parseInt(value, 10);
    }
    return results;
  }, { horizontal: 0, vertical: 0});

  return day2Reduction.horizontal * day2Reduction.vertical;
}

function day2_part2(inputArray: string[]): number {
  const day2Reduction = inputArray.reduce((results, item) => {
    const [direction, value] = item.split(' ');
    switch (direction) {
      case 'forward': 
        results.horizontal = results.horizontal + parseInt(value, 10);
        results.depth = results.depth + (results.aim * parseInt(value, 10));
        break; 
      case 'up':
        results.aim = results.aim - parseInt(value, 10);
        break;
      default:
        results.aim = results.aim + parseInt(value, 10);
    }
    return results;
  }, { horizontal: 0, depth: 0, aim: 0 });

  return day2Reduction.horizontal * day2Reduction.depth;
}

function day2(inputFileName: string): void {
  const inputArray = readFileSync(resolve(`${__dirname}/${inputFileName}`), 'utf-8').split('\n');

  const day2Part1 = day2_part1(inputArray);
  console.log(`day2 part1 soln is ${day2Part1}`)

  const day2Part2 = day2_part2(inputArray);
  console.log(`day2 part 2 soln is ${day2Part2}`);
}

day2('input.txt');