import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Block, Blocks, BlockTypes } from "./types";
import { v4 as randomID } from "uuid"

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
  
  return result.concat(blocks.filter(n => n.type !== "ONES"))
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
    disabled: false,
    source: block.source
  }))
}

export const getBlocks = (n: number) => {
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