import { readFileSync } from 'fs';
import { resolve } from 'path';

function isSmallCave(cave: string) {
  if (cave.charCodeAt(0) >= 97) return true;
  return false;
}

function convertInputToAdjacencyGraph(inputArray: string[]): Record<string, string[]> {
  const graph: Record<string, string[]> = {};
  for(let inputString of inputArray) {
    const [source, destination] = inputString.split('-');
    if(!graph[source]) { graph[source] = []};
    if(!graph[destination]) { graph[destination] = []};
    graph[source] = [...graph[source], destination];
    graph[destination] = [...graph[destination], source];
  }
  return graph;
};

function alreadyVisitedTwice(visited: Map<string, number>) {
  // returns true if we already have a small cave that has been visited twice
  let moreThanTwoSmallCaves = []
  for( let [key, value] of visited.entries()) {
    if (value >= 2 && isSmallCave(key)) {
      moreThanTwoSmallCaves.push(key)
    }
  }
  return moreThanTwoSmallCaves;
}


function printPath(graph: Record<string, string[]>,node: string, pathsArr: string[], pathsIdx: number, overallRes: any, visited: Set<string>) {
  visited.add(node);
  if(node === "end") {
    overallRes.push(pathsArr.slice(0, pathsIdx))
    return;
  } 
  let adjacents = graph[node];
  for (let adj of adjacents) {
    if(isSmallCave(adj) && visited.has(adj)) {
      continue;
    } else {
      pathsArr[pathsIdx] = adj;
      printPath(graph,adj, pathsArr, pathsIdx + 1, overallRes, visited);
      visited.delete(adj); // we want to backtrack hence remove the added node from the set
    }
  }
}

function printPathsPart2(graph: Record<string, string[]>, node: string, pathsArr: string[], pathIdx: number, overallRes: string[], visitedMap: Map<string, number>) {
  visitedMap.set(node, visitedMap.get(node)! + 1); // add so we get correct counts in recursion
  if (node === "end") {
    overallRes.push(pathsArr.slice(0, pathIdx).join(","))
    return;
  } else {
    let adjacents = graph[node];
    for (let adj of adjacents) {
      if(adj === "start") {
        continue;
      }
      if(isSmallCave(adj)) {
        const moreThanTwoSmallCaves = alreadyVisitedTwice(visitedMap);
        if (moreThanTwoSmallCaves.includes(adj)) {
          continue;
        }
        if (visitedMap.get(adj)! >= 1 && moreThanTwoSmallCaves.length > 0) {
          continue; 
        }
      } 
      pathsArr[pathIdx] = adj
      printPathsPart2(graph, adj, pathsArr, pathIdx+ 1,overallRes, visitedMap);
      visitedMap.set(adj, visitedMap.get(adj)! - 1); // reset so we backtrack
    }
  }
}

function day12_part2(graph: Record<string, string[]>) {
  const visitedFrequencyMap: Map<string, number> = new Map();
  for(let node of Object.keys(graph)) {
    visitedFrequencyMap.set(node, 0);
  }

  let node = "start";
  let pathsArr: string[] = [];
  let overallRes: any = [];

  printPathsPart2(graph, node, pathsArr, 0, overallRes, visitedFrequencyMap);
  return(overallRes.length)
}

function day12_part1(graph: Record<string, string[]>) {
  let node = "start";
  let pathsArr: string[] = [];
  let pathsIdx: number = 0;
  let overallRes: any = [];
  let visited: Set<string> = new Set();

  printPath(graph, node, pathsArr, pathsIdx, overallRes, visited);
  return overallRes.length;
}

function day12(inputFileName: string) {
  const inputArray = readFileSync(resolve(`${__dirname}/${inputFileName}`), 'utf-8')
    .split('\n');

  const graph = convertInputToAdjacencyGraph(inputArray);

  const day12Part1 = day12_part1(graph);
  console.log(`day12Part1 ${day12Part1}`)

  const day12Part2 = day12_part2(graph);
  console.log(`day12Part2 ${day12Part2}`)
} 

day12('input.txt');