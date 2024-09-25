import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Block, Blocks, BlockTypes, Fraction, LineType, NumberFraction, PolygonType, Vertex } from "./types";
import { v4 as randomID } from "uuid"
import { getFractionArraySum } from "./fractions";

export const EPSILON = 0.0001

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

export const newRandomFraction = (upper: number, N: number = 12): NumberFraction[] => {
  const harmonicNumbers: NumberFraction[] = Array.from({length: N}, (_, i) => ({numerator: 1, denominator: i+1})) 
  
  while (true) {
    // const toChoose = Math.floor(Math.random()*12) + 1
    // const toChoose = getRandomTriangularInt(N)
    
    // const toChoose = getRandomExponentialInt(N)
    // let sum: NumberFraction[] = []
    // for (let i = 0; i < toChoose; i++) {
    //   const chosen = chooseRandom(harmonicNumbers)
    //   sum.push(chosen)
    // }
    // if (getFractionArraySum(sum) <= upper) return sum
    
    const denominator = randInt(12, 1)
    const numerator = randInt(denominator, 1)
    return Array.from({length: numerator}, () => ({numerator: 1, denominator}))
  }

}

export const randInt = (n: number, min: number = 0): number => {
  return Math.floor(Math.random() * n) + min
}

export const getRandomTriangularInt = (N: number): number => {
  let probabilities = Array.from({ length: N }, (_, i) => N - i);
  const totalSum = probabilities.reduce((sum, p) => sum + p, 0);
  probabilities = probabilities.map(p => p / totalSum);
  const randomValue = Math.random();
  
  let cumulativeProbability = 0;
  for (let i = 0; i < N; i++) {
      cumulativeProbability += probabilities[i];
      if (randomValue < cumulativeProbability) {
          return i + 1;
      }
  }
  
  return N;
}

export const getRandomExponentialInt = (N: number): number => {
  let probabilities = Array.from({ length: N }, (_, i) => Math.exp(-i / 4));
  const totalSum = probabilities.reduce((sum, p) => sum + p, 0);
  probabilities = probabilities.map(p => p / totalSum);
  const randomValue = Math.random();
  let cumulativeProbability = 0;
  for (let i = 0; i < N; i++) {
      cumulativeProbability += probabilities[i];
      if (randomValue < cumulativeProbability) {
          return i + 1;
      }
  }
  return N;
}

export const generateNewQuestions = (upper: number, n: number = 12, sorting: boolean=false): NumberFraction[][] => {
  if (sorting)
    return Array.from({length: n}, () => newRandomFraction(upper)).sort((a, b) => - getFractionArraySum(a) + getFractionArraySum(b))
  else
  return Array.from({length: n}, () => newRandomFraction(upper))
}

export const chooseRandom = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

export const isSameNumber = (a: number, b: number): boolean => {
  return Math.abs(a-b) < EPSILON
}

export const rowSum = (row: Fraction[]): number => {
  const sum = row.reduce((sum, f) => sum + 1/f.type, 0)
  return sum
}

export const groupOnes = (blocks: Block[], bound: number = 10): Blocks => {

  let result: Blocks = []
  let count = 0
  let toAdd: Block[] = []

  for (let block of blocks) {
    if (block.type === "ONES") {
      toAdd.push(block)
      count++
    }
    if (count === bound) {
      result.push(toAdd)
      count = 0
      toAdd = []
    } 
  }
  if (count !== 0) result.push(toAdd)
  
  return (blocks.filter(n => n.type !== "ONES") as Blocks).concat(result)
}

export const randomNumbers = (): number[] => {
  const newBlocks = []
  const ones = Math.floor(Math.random() * 40) + 1
  const tens = Math.floor(Math.random() * 15) + 1
  const hundreds = Math.floor(Math.random() * 7) + 1
  newBlocks.push(Array(ones).fill(1))
  newBlocks.push(Array(tens).fill(10))
  newBlocks.push(Array(hundreds).fill(100))
  return shuffleArray(newBlocks.flat())
}

export const getNum = (type: BlockTypes): number => {
  if (type === "ONES") return 1
  else if (type === "TENS") return 10
  else if (type === "HUNDREDS") return 100
  else return -1
}

export const getType = (num: number): BlockTypes => {
  if (num === 1) return "ONES"
  else if (num === 10) return "TENS"
  else return "HUNDREDS"
}

export const getWholeSum = (blocks: Block[]): number => {
  let sum = 0
  for (let block of blocks) {
    sum += getNum(block.type)
  }
  return sum
}

export const getSelected = (blocks: Block[]): Block[] => {
  return blocks.filter(block => block.selected)
}

export const splitBlock = (block: Block): Block[] => {
  return Array.from({length: 10}, () => ({
    id: randomID(),
    type: getType(getNum(block.type)/10),
    selected: false,
    disabled: block.disabled,
    source: block.source
  }))
}

export const getBlocks = (n: number): number[] => {
  const num = n <= 0 ? -n : n
  const newBlocks = []
  const digits = num.toString().padStart(4, '0').split("")
  const ones = +digits[digits.length - 1]
  const tens = +digits[digits.length - 2]
  const hundreds = (num - tens * 10 - ones) / 100
  newBlocks.push(Array(ones).fill(1))
  newBlocks.push(Array(tens).fill(10))
  newBlocks.push(Array(hundreds).fill(100))
  return shuffleArray(newBlocks.flat()) 
}

export const getLength = (line: LineType): number => {
  const { start, end } = line
  const dx = end.x - start.x
  const dy = end.y - start.y
  const d = Math.sqrt(dx*dx + dy*dy)
  return d
}

export const getAngle = (line: LineType): number => {
  const { start, end } = line
  const dx = end.x - start.x
  const dy = end.y - start.y
  const angle = Math.atan2(dy, dx)
  // return angle in degrees
  return angle * 180 / Math.PI
}

// const orientation = (p: Vertex, q: Vertex, r: Vertex): number => {
//   const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
//   if (val === 0) return 0; // collinear
//   return val > 0 ? 1 : 2; // 1 for clockwise, 2 for counterclockwise
// };

// const onSegment = (p: Vertex, q: Vertex, r: Vertex): boolean => {
//   return (
//     q.x <= Math.max(p.x, r.x) &&
//     q.x >= Math.min(p.x, r.x) &&
//     q.y <= Math.max(p.y, r.y) &&
//     q.y >= Math.min(p.y, r.y)
//   );
// };

// export const isIntersectingLines = (line1: LineType, line2: LineType): boolean => {
//   const { start: p1, end: p2 } = line1;
//   const { start: p3, end: p4 } = line2;

//   const o1 = orientation(p1, p2, p3);
//   const o2 = orientation(p1, p2, p4);
//   const o3 = orientation(p3, p4, p1);
//   const o4 = orientation(p3, p4, p2);

//   // General case
//   if (o1 !== o2 && o3 !== o4) {
//     return true;
//   }

//   // Special Cases: Check for collinearity and on-segment conditions
//   if (o1 === 0 && onSegment(p1, p3, p2)) return false; // line1 start is on line2
//   if (o2 === 0 && onSegment(p1, p4, p2)) return false; // line1 end is on line2
//   if (o3 === 0 && onSegment(p3, p1, p4)) return false; // line2 start is on line1
//   if (o4 === 0 && onSegment(p3, p2, p4)) return false; // line2 end is on line1

//   return false; // Doesn't fall in any of the above cases
// };

const isInsideLine = (p: Vertex, line: LineType): boolean => {
  const { start, end } = line

  const minX = Math.min(start.x, end.x)
  const maxX = Math.max(start.x, end.x)
  const minY = Math.min(start.y, end.y)
  const maxY = Math.max(start.y, end.y)

  return p.x > minX && p.x < maxX && p.y > minY && p.y < maxY
}

const isTerminalPoint = (p: Vertex, line: LineType): boolean => {
  const { start, end } = line
  return p.x === start.x && p.y === start.y || p.x === end.x && p.y === end.y
}

const isSameLines = (line1: LineType, line2: LineType): boolean => {
  return line1.start.x === line2.start.x && line1.start.y === line2.start.y && line1.end.x === line2.end.x && line1.end.y === line2.end.y
}

export const isIntersectingLines = (line1: LineType, line2: LineType): boolean => {
  
  //find equations of both lines then find intersecting point
  const { start: p1, end: p2 } = line1;
  const { start: p3, end: p4 } = line2;

  // if (p1.x === p2.x) { 
  //   const y = p3.y + (p4.y - p3.y) * (p1.x - p3.x) / (p4.x - p3.x)
  //   return (y > Math.min(p1.y, p2.y) && y < Math.max(p1.y, p2.y))
  // } else if (p3.x === p4.x) {
  //   const y = p1.y + (p2.y - p1.y) * (p3.x - p1.x) / (p2.x - p1.x)
  //   return (y > Math.min(p3.y, p4.y) && y < Math.max(p3.y, p4.y))
  // }

  const a1 = p2.y - p1.y
  const b1 = p1.x - p2.x
  const c1 = a1 * p1.x + b1 * p1.y
  const a2 = p4.y - p3.y
  const b2 = p3.x - p4.x
  const c2 = a2 * p3.x + b2 * p3.y
  const determinant = a1 * b2 - a2 * b1
  if (determinant === 0) {
    return (
      isInsideLine(p1, line2) ||
      isInsideLine(p2, line2) ||
      isInsideLine(p3, line1) ||
      isInsideLine(p4, line1) ||
      (isTerminalPoint(p1, line2) && isTerminalPoint(p2, line2)) ||
      (isTerminalPoint(p3, line1) && isTerminalPoint(p4, line1))
    )
  }
  const x = (b2 * c1 - b1 * c2) / determinant
  const y = (a1 * c2 - a2 * c1) / determinant
  const point = { x, y }

  return (
    ((a1 === 0 || a2 === 0) && (isInsideLine(point, line1) || isInsideLine(point, line2))) ||
    ((b1 === 0 || b2 === 0) && (isInsideLine(point, line1) || isInsideLine(point, line2))) ||
    (isInsideLine(point, line1) && isInsideLine(point, line2)) || 
    (isTerminalPoint(point, line1) && isInsideLine(point, line2)) || 
    (isInsideLine(point, line1) && isTerminalPoint(point, line2))
  ) 
  
}

export const MakePolygon = (coords: number[]): PolygonType => {
  
  const XCoords = coords.filter((coord, index) => index % 2 === 0)
  const YCoords = coords.filter((coord, index) => index % 2 === 1)
  
  const points = XCoords.map((x, index) => ({
    x: x,
    y: YCoords[index]
  }))
  
  return {
    color: "#f200f2",
    filled: false,
    points
  }
}

export const getPolygonLines = (points: Vertex[]): LineType[] => {
  const lines: LineType[] = points.map((point, index) => {
    const nextIndex = (index + 1) % points.length
    const nextPoint = points[nextIndex]

    return {
      color: "#f200f2",
      start: point,
      end: nextPoint
    }
  })

  return lines
}

export const canAddNewPoint = (polygon: PolygonType, newPoint: Vertex, index: number=-1): boolean => {
  const { points } = polygon

  const newPoints = [...points.slice(0, index + 1), newPoint, ...points.slice(index + 1)]

  const lines = getPolygonLines(newPoints)

  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      if (isIntersectingLines(lines[i], lines[j])) {
        return false
      }
    }
  }

  return true
}