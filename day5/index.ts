import { readFileSync } from 'fs';
import { resolve } from 'path';

type Point = {
  key: string,
  x: number,
  y: number
};

type Line = {
  startPoint: Point,
  endPoint: Point
};

function getAllPointsOnDiagnol(line: Line): Point[] {
  let newStartPoint = line.startPoint.x < line.endPoint.x ? line.startPoint : line.endPoint // one with smaller x
  let newEndPoint = newStartPoint.x === line.startPoint.x ? line.endPoint : line.startPoint

  let newXes = [];
  for(let i=newStartPoint.x; i <= newEndPoint.x; i++) {
    newXes.push(i);
  }

  let newYes = [];
  if(newStartPoint.y > newEndPoint.y) { // downwards slope
    for(let i=newStartPoint.y; i >= newEndPoint.y; i--) {
      newYes.push(i);
    }
  } else { // upwards slope -- pretty sure there's a better way to do this
    for(let i=newStartPoint.y; i <= newEndPoint.y; i++) {
      newYes.push(i);
    }
  }


  let points = [];
  for(let i = 0; i < newXes.length; i++) {
    points.push({
      key: `${newXes[i]}-${newYes[i]}`,
      x: newXes[i],
      y: newYes[i]
    })
  }
  return points;
}

function getAllPointsOnLine(line: Line, getOnDiagonal: boolean = false) {
  let points: Point[] = [];
  if(isLineHorizontal(line)) {
    let startX = Math.min(line.startPoint.x, line.endPoint.x);
    let endX = Math.max(line.startPoint.x, line.endPoint.x);
    for(let i = startX; i <= endX; i++) {
      points.push({ 
        key: `${i}-${line.startPoint.y}`,
        x: i,
        y: line.startPoint.y
      })
    }
    return points;
  }

  else if(isLineVertical(line)) {
    let startY = Math.min(line.startPoint.y, line.endPoint.y);
    let endY = Math.max(line.startPoint.y, line.endPoint.y);
    for(let i = startY; i<= endY; i++) {
      points.push({ 
        key: `${line.startPoint.x}-${i}`,
        x: line.startPoint.x,
        y: i
      });
    }
    return points;
  }

  if(getOnDiagonal) {
    points = getAllPointsOnDiagnol(line);
    return points;
  }
  return points;
}

function isLineHorizontal(line: Line) {
  if(line.startPoint.y === line.endPoint.y) {
    return true;
  }
  return false;
}

function isLineVertical(line: Line) {
  if(line.startPoint.x === line.endPoint.x) {
    return true;
  }
  return false;
}

function day5_part1(lines: Line[], getPointsonDiagonal: boolean = false) {
  const pointsMap = new Map<string, number>();
  for(let line of lines) {
    const points = getAllPointsOnLine(line, getPointsonDiagonal);
    for (let point of points) {
      if(pointsMap.has(point.key)) {
        let frequency = pointsMap.get(point.key) as number;
        pointsMap.set(point.key, frequency + 1);
      } else {
        pointsMap.set(point.key, 1);
      }
    }
  }

  let sum = 0;
  pointsMap.forEach((value) => {
    if(value >= 2) sum++;
  })
  return sum;
}

function day5_part2(lines: Line[]) {
  return day5_part1(lines, true);
}

function day5(inputFileName: string): void {
  const inputArray = readFileSync(resolve(`${__dirname}/${inputFileName}`), 'utf-8').split('\n');

  const lines: Line[] = inputArray.map((item) => {
    const [startX, startY, endX, endY] = item.split('->').map(item => item.trim().split(',')).flat();
    return { 
      startPoint: { key: `${startX}-${startY}`, x: parseInt(startX), y: parseInt(startY)},
      endPoint: { key: `${endX}-${endY}`, x: parseInt(endX), y: parseInt(endY)}
    }
  });
  
  const day5Part1 = day5_part1(lines);
  console.log(`day5_part1 ${day5Part1}`)

  const day5Part2 = day5_part2(lines);
  console.log(`${day5Part2}`)
}

day5('input.txt');