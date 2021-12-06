import { readFileSync } from 'fs';
import { resolve, parse } from 'path';

function day6_part1(inputArray: number[], numDays: number) {
  let daysCountr = 0;
  let fishTimers = [...inputArray];

  while(daysCountr < numDays) {
    let resetFishCount = 0;
    for(let i = 0; i < fishTimers.length; i++) {
      if (fishTimers[i] === 0) {
        fishTimers[i] = 6;
        resetFishCount++;
      } else {
        fishTimers[i] = fishTimers[i] - 1;
      }
    }
    fishTimers = [...fishTimers, ...Array(resetFishCount).fill(8)];
    daysCountr++;
  }
  return fishTimers.length;
}

function day6_part2(inputArray: number[], numDays: number) {
  let fishQ = new Array(9).fill(0);
  for (let i = 0 ; i < inputArray.length; i++) {
    fishQ[inputArray[i]]++;  // so for sample day 0 this will be [0, 1, 1, 2, 1]
  }
  // now since every day the fish time will decrease we need to keep shifting them on the timer array to left
  for (let i = 0; i < numDays; i++) {
    const currentFish = fishQ.shift(); // this will always be the number of fish who are at zero timer
    fishQ.push(currentFish); // add the count of current fish back to array (which is pos 8 since they will create more fish)
    fishQ[6] += currentFish; // add these fish back to timer [6] since after 0 timer resets to 6
  }

  return fishQ.reduce((result, item) => { result+=item; return result;}, 0)
}

function day6(inputFileName: string) {
  const inputArray = readFileSync(resolve(`${__dirname}/${inputFileName}`), 'utf-8')
    .split(',')
    .map(item => parseInt(item))

    const day6Part1 = day6_part1(inputArray, 18);
    console.log(`day6Part1 is ${day6Part1}`)

    const day6Part2 = day6_part2(inputArray, 256);
    console.log(`day6Part1 is ${day6Part2}`)
}

day6('input.txt');