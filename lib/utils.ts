import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Block, Blocks, BlockTypes, Fraction, NumberFraction } from "./types";
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
    const toChoose = getRandomExponentialInt(N)
    let sum: NumberFraction[] = []
    for (let i = 0; i < toChoose; i++) {
      const chosen = chooseRandom(harmonicNumbers)
      sum.push(chosen)
    }
    if (getFractionArraySum(sum) <= upper) return sum
  }
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

export const generateNewQuestions = (upper: number, n: number = 12, sorting: boolean=true): NumberFraction[][] => {
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