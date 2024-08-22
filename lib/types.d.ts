
export type BlockTypes = "ONES" | "TENS" | "HUNDREDS"

export type Block = {
  id: UniqueIdentifier
  type: BlockTypes
  selected: boolean
  disabled: boolean
}

export type Blocks = (Block | Block[])[]