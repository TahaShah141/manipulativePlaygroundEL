
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

export type PolygonType = {
  points: Vertex[]
  filled: boolean
  color: string
}

export type LineType = {
  start: Vertex
  end: Vertex
  color: string
}

export type Vertex = {
  x: number
  y: number
}