import { readFileSync } from 'fs';
import { resolve, parse } from 'path';

function getGeometricSum(n: number, k: number) {
  let sum = 0;
  while((n - k) > 0) {
    sum+= (n - k);
    k++;
  }
  return sum;
}

function day7_part1(inputArray: number[]) {
  const maxPosition = Math.max(...inputArray);
  const allAvailablePositions = [...Array(maxPosition+1).keys()];
  let minFuel = Number.POSITIVE_INFINITY;
  for(let position of allAvailablePositions) {
    let fuelCost = 0;
    for (let crab of inputArray) {
      fuelCost+= Math.abs(crab - position);
    }
    minFuel = Math.min(minFuel, fuelCost);
  }
  return minFuel
}

function day7_part2(inputArray: number[]) {
  const maxPosition = Math.max(...inputArray);
  const allAvailablePositions = [...Array(maxPosition+1).keys()];
  let minFuel = Number.POSITIVE_INFINITY;
  for(let position of allAvailablePositions) {
    let fuelCost = 0;
    for (let crab of inputArray) {
      fuelCost+= getGeometricSum(Math.abs(crab - position), 0);
    }
    minFuel = Math.min(minFuel, fuelCost);
  }
  return minFuel;
}

function day7(inputFileName: string) {
  const inputArray = readFileSync(resolve(`${__dirname}/${inputFileName}`), 'utf-8')
    .split(',')
    .map(item => parseInt(item))

  const day7Part1 = day7_part1(inputArray);
  console.log(`day7Part1 is ${day7Part1}`)

  const day7Part2 = day7_part2(inputArray);
  console.log(`day7Part2 is ${day7Part2}`)
}

day7('input.txt');
