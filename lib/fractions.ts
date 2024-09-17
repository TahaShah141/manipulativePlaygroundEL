import { Fraction, NumberFraction } from "./types";

export const toFractionArray = (row: Fraction[]): NumberFraction[] => {
  return row.map(f => ({numerator: 1, denominator: f.type}))
}

export const getFractionArraySum = (array: NumberFraction[]): number => {
  return (array.reduce((sum, f) => sum + f.numerator/f.denominator, 0))
}

export const addFractions = (f1: NumberFraction, f2: NumberFraction): NumberFraction => {
  const toReturn: NumberFraction = {
    numerator: f1.numerator * f2.denominator + f2.numerator * f1.denominator,
    denominator: f1.denominator * f2.denominator
  }
  return toReturn
}

export const GCD = (a: number, b: number): number => {
  if (b > a) return GCD(b, a)
  return b ? GCD(b, a % b) : a
}

export const simplifyFraction = (f: NumberFraction): NumberFraction => {
  const gcd = GCD(f.numerator, f.denominator)
  return {
    numerator: f.numerator / gcd,
    denominator: f.denominator / gcd
  }
}

export const getFractionString = (f: NumberFraction): string => {
  return `${f.numerator}/${f.denominator}`
}

export const composeFraction = (array: NumberFraction[]): NumberFraction => {
  let toReturn: NumberFraction = {
    numerator: 0,
    denominator: 1,
  }

  for (let i = 0; i < array.length; i++) {
    toReturn = addFractions(toReturn, array[i])
  }

  return simplifyFraction(toReturn)
}