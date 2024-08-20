import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Blocks } from "./types";

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

export const groupOnes = (blocks: number[], bound: number): Blocks => {

  let result: Blocks = []
  let count = 0

  for (let num of blocks) {
    if (num === 1) {
      count++
    }
    if (count === bound) {
      result.push(Array(bound).fill(1))
      count = 0
    } 
  }
  if (count !== 0) result.push(Array(count).fill(1))
  
  return result.concat(blocks.filter(n => n !== 1))
}

export const randomizeBoard = (): number[] => {
  const newBlocks = []
  const ones = Math.floor(Math.random() * 40) + 1
  const tens = Math.floor(Math.random() * 15) + 1
  const hundreds = Math.floor(Math.random() * 7) + 1
  newBlocks.push(Array(ones).fill(1))
  newBlocks.push(Array(tens).fill(10))
  newBlocks.push(Array(hundreds).fill(100))
  return shuffleArray(newBlocks.flat())
}