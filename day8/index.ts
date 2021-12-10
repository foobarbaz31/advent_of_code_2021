import { readFileSync } from 'fs';
import { resolve, parse } from 'path';

function isAnagram(s1: any, s2: any) {
  if (s1.length !== s2.length) return false;
  const seen: Record<string, number> = {};
  for (let i = 0; i < s1.length; i++) {
    seen[s1[i]] = (seen[s1[i]] || 0) + 1;
  }
  for (let i = 0; i < s2.length; i++) {
    if (!seen[s2[i]]) return false;
    seen[s2[i]]--;
  }
  return true;
}

function includesAll(str: string, chars: any) {
  for (const char of chars) {
    if (!str.includes(char)) return false;
  }
  return true;
}

/**
 * 
 * Inspired / derived from algorithms comments on reddit
 */
function generateCrazyMapOfNewCharToDigits(inputCodes: string): Record<number, string> {
  const map: Record<number, string> = {};
  const twoThreeFive = [];
  const zeroSixNine = [];

  for (let inputCode of inputCodes) {
    if (inputCode.length === 2) {
      map[1] = inputCode;
    } else if (inputCode.length === 3) {
      map[7] = inputCode;
    } else if (inputCode.length === 4) {
      map[4] = inputCode
    } else if (inputCode.length === 7) {
      map[8] = inputCode;
    } else if (inputCode.length === 5) {
      twoThreeFive.push(inputCode)
    } else {
      zeroSixNine.push(inputCode);
    }
  }
{


    // now notice pattern 3 includes all chars from 1 and 4, 2 includes chars only from 4 and 5 includes chars only from 1
    const charsFromOne = map[1].split('');
    const charsFromFour = map[4].split('');
    const charsInFourButNotInOne = charsFromFour.filter(
      (char) => !charsFromOne.includes(char)
    );

    for (let twoThreeFiveItem of twoThreeFive) {
      if(includesAll(twoThreeFiveItem, charsFromOne)) {
        map[3] = twoThreeFiveItem;
      } else if (includesAll(twoThreeFiveItem, charsInFourButNotInOne)) {
        map[5] = twoThreeFiveItem
      } else {
        map[2] = twoThreeFiveItem
      }
    }

    for (let zeroSixNineItem of zeroSixNine) {
      if(includesAll(zeroSixNineItem, charsFromFour)) {
        map[9] = zeroSixNineItem;
      } else if (includesAll(zeroSixNineItem, charsInFourButNotInOne)) {
        map[6] = zeroSixNineItem
      } else {
        map[0] = zeroSixNineItem
      }
    }


  }

  return map; // this will return something like { 1: 'ab', 7: 'acf', ...}
}

function day8_part2(inputArray: any): number {
  // for each input / output code
    // use each output code to build replacement mapping
    // reverse apply replacement mappint to each input (why not just build an elastic search ?!)
  let sum = 0;
  for(let item of inputArray) {
    const inputCodeMap = generateCrazyMapOfNewCharToDigits(item[0].split(' '));
    let decodedOutput = '';
    const outputCodeArray = item[1].split(' ');
    for (let outputCode of outputCodeArray) {
      for(let [key, val] of Object.entries(inputCodeMap)) {
        console.log(`-- ${key} maps to ${val}`)
        if(isAnagram(val, outputCode)) {
          decodedOutput = decodedOutput + `${key}`
        }
      }
      console.log(`decodedOutput for ${outputCode} is ${decodedOutput}`)
    }
    sum+=parseInt(decodedOutput, 10);
  }
  return sum;
}

function day8_part1(inputArray: any): number {
  const outputCodes = inputArray.map((item: any) => item[1].split(' ')).flat();

  let uniqueSegmentSum = 0;

  for(let code of outputCodes) {
    if(code.length === 2 || code.length === 4 || code.length === 3 || code.length === 7) {
      uniqueSegmentSum++
    }
  }
  return uniqueSegmentSum;
}

function day8(inputFileName: string) {
  const inputArray = readFileSync(resolve(`${__dirname}/${inputFileName}`), 'utf-8')
    .split('\n')
    .map(item => item.split('|').map(item => item.trim()))

  const day8Part1 = day8_part1(inputArray);
  console.log(day8Part1)

  const day8Part2 = day8_part2(inputArray);
  console.log(day8Part2)
}

day8('input.txt')

