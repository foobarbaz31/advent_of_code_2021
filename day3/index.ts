import { readFileSync } from 'fs';
import { resolve } from 'path';

function calculateMaxBitInPosition(inputArray: string[], handleEquality: boolean= false): string[] {
  const results: string[] = new Array(inputArray[0].length);
  for(let position = 0; position < results.length; position++) {
    const bitsArray = inputArray.map(item => item[position]);
    const zerosLen = bitsArray.filter((item) => item === '0').length;
    const onesLen = bitsArray.filter((item) => item === '1').length;
    if (handleEquality && zerosLen === onesLen) {
      results[position] = '1';
    } else {
      results[position] = zerosLen > onesLen ? '0' : '1';
    }

  }
  return results;
}

function day3_part1(inputArray: string[]) {
  const results = calculateMaxBitInPosition(inputArray);
  const gamma = results.join('');
  const epsilon = results.map((item: any) =>  item ^ 1).join('');
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function runScrubber(inputArray: string[], positions: string[], currentPosition: number, scrubType: string): string {
  if(inputArray.length === 1) {
    return inputArray[0];
  } else {
    const bitToCheck = scrubType === 'oxygen' ? positions[currentPosition] : `${(parseInt(positions[currentPosition]) ^ 1)}`;
    const filteredList = inputArray.filter((item) => item[currentPosition] === bitToCheck);
    const newPositions = calculateMaxBitInPosition(filteredList, true);
    const positionToCheck = currentPosition + 1;
    return runScrubber(filteredList, newPositions, positionToCheck, scrubType);
  }
}

function day3_part2(inputArray: string[]) {
  const results = calculateMaxBitInPosition(inputArray);
  const oxygenScrubber = runScrubber(inputArray, results, 0, 'oxygen');
  const co2 = runScrubber(inputArray, results, 0, 'co2');
  return parseInt(oxygenScrubber,2) * parseInt(co2, 2);
}

function day3(inputFileName: string): void {
  const inputArray = readFileSync(resolve(`${__dirname}/${inputFileName}`), 'utf-8').split('\n');

  console.log(day3_part1(inputArray))

  console.log(day3_part2(inputArray))
}

day3('input.txt')