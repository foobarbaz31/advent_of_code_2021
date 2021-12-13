
function smallCave(cave: string) {
  if (cave.charCodeAt(0) >= 97 && cave !== "end") return true;
  return false;
}

function printPath(graph: Record<string, string[]>,node: string, pathsArr: string[], pathsIdx: number, overallRes: any, visited: Set<string>) {
  if(node === "end") {
    let temp = [];
    for(let i = 0; i < pathsIdx; i++) {
      temp.push(pathsArr[i]);
    }
    console.log(temp);
  } else {
    let adjacents = graph[node];
    for (let adj of adjacents) {
      if(!visited.has(adj)) {
        if(smallCave(adj)) { visited.add(adj) };
        pathsArr[pathsIdx] = adj;
        printPath(graph,adj, pathsArr, pathsIdx + 1, overallRes, visited);
        visited.delete(adj)
      }
    }
  }
}

function test() {
  const graph = {
    "start": ["A", "b"],
    "A": ["c", "b", "end"],
    "b": ["A","d", "end"],
    "c": ["A"],
    "d": ["b"],
  }
  let node = "start";
  let pathsArr: string[] = [];
  let pathsIdx: number = 0;
  let overallRes: any = [];
  let visited: Set<string> = new Set();

  printPath(graph, node, pathsArr, pathsIdx, overallRes, visited)
}

test()