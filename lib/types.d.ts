
export type BlockTypes = "ONES" | "TENS" | "HUNDREDS"

export type Block = {
  id: UniqueIdentifier
  type: BlockTypes
  selected: boolean
  disabled: boolean
  source: string
}

export type Blocks = (Block | Block[])[]

export type Fraction = {
  id: UniqueIdentifier
  type: number
  selected: boolean
  disabled: boolean
  source: string
}

export type NumberFraction = {
  numerator: number
  denominator: number
}