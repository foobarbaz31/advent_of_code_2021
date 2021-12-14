
import { readFileSync } from 'fs';
import { resolve } from 'path';

function init(template: string) {
  const singleCharFreq: Record<string, number> = {};
  const pairFreq: Record<string, number> = {};

  for(let i = 0; i < template.length; i++) {
    singleCharFreq[template[i]] = singleCharFreq[template[i]] ? singleCharFreq[template[i]] + 1 : 1;
    if (template[i+1]) {
      pairFreq[`${template[i]}${template[i+1]}`] = pairFreq[`${template[i]}${template[i+1]}`] + 1 || 1;
    }
  }

  return { singleCharFreq, pairFreq }
}

function returnNewPairs(currentPair: string, insertionChar: string) {
  const [charOne, charTwo] = currentPair.split('');
  return [`${charOne}${insertionChar}`, `${insertionChar}${charTwo}`]
}

function day14_part1(template: string, rulesMap: Record<string, string>, steps: number) {
  const { singleCharFreq, pairFreq  } = init(template);
  let stepCntr = 0;
  while(stepCntr < steps) {
    let newPairsObj: Record<string, number> = {};
    for (let pairKey of Object.keys(pairFreq)) {
      const currentPairFreq = pairFreq[pairKey];
      pairFreq[pairKey] = 0;

      const insertionChar = rulesMap[pairKey];
      const [newPair1, newPair2] = returnNewPairs(pairKey, insertionChar);

      singleCharFreq[insertionChar] = singleCharFreq[insertionChar] ? singleCharFreq[insertionChar] + currentPairFreq : currentPairFreq;
      
      // reason why we add newpair obj and not directly to the og pair key is because that will not make the changes "simultaneous"
      // instead it will make pairFreq grow exponentially in the same step which is not desired
      newPairsObj[newPair1] = newPairsObj[newPair1] ? newPairsObj[newPair1] + currentPairFreq: currentPairFreq;
      newPairsObj[newPair2] = newPairsObj[newPair2] ? newPairsObj[newPair2] + currentPairFreq: currentPairFreq;
    }

    // now add the newly created pairs back to pairs
    for(let newPairKey of Object.keys(newPairsObj)) {
      pairFreq[newPairKey] = pairFreq[newPairKey] ? pairFreq[newPairKey] + newPairsObj[newPairKey] : newPairsObj[newPairKey]
    }
    stepCntr++;
  }

  let small = Number.POSITIVE_INFINITY;
  let big = Number.NEGATIVE_INFINITY;
  for(let key of Object.keys(singleCharFreq)) {
    small = Math.min(small, singleCharFreq[key]);
    big = Math.max(big, singleCharFreq[key]);
  }
  console.log(`small ${small} big ${big}`);
  return big - small;
}

function day14(inputFileName: string) {
  const [template, rules]= readFileSync(resolve(`${__dirname}/${inputFileName}`), 'utf-8').split('\n\n');

  const rulesMap: Record<string, string> = rules.split('\n').reduce((result, replacement) => {
    const [pair, charToInsert] = replacement.replace(/\s/g, '').split('->');
    result[pair] = charToInsert;
    return result;  
  }, {} as Record<string, string>);

  const day14Part1 = day14_part1(template, rulesMap, 10);
  console.log(`day14Part1 ${day14Part1}`)

  const day14Part2 = day14_part1(template, rulesMap, 40);
  console.log(`day14Part1 ${day14Part2}`)
}

day14('input.txt');
