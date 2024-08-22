import { Block, Blocks, BlockTypes } from "@/lib/types";
import { getType, randomNumbers } from "@/lib/utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as randomID } from "uuid"

interface MemoState {
  blocks: Block[]
  sorting: boolean
  grouping: boolean
  display: boolean
}

const initialState: MemoState = {
  blocks: [],
  sorting: true,
  grouping: true,
  display: true,
}

export const MainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    testSlice: (state, action: PayloadAction<string | number | undefined>) => {
      console.log(action.payload)
      console.log({state})
      return state
    },

    toggleSorting: (state) => {
      state.sorting = !state.sorting
    },

    toggleGrouping: (state) => {
      state.grouping = !state.grouping
    },

    toggleDisplay: (state) => {
      state.display = !state.display
    },

    clearBoard: (state) => {
      state.blocks = []
    },

    randomizeBoard: (state) => {
      const numbers = randomNumbers()

      state.blocks = numbers.map((num) => {
        return {
          id: randomID(),
          disabled: false,
          selected: false,
          type: getType(num)
        }
      })
    },

    newBlock: (state, action: PayloadAction<{type: BlockTypes}>) => {
      const { type } = action.payload
      const toAdd: Block = {
        id: randomID(),
        type,
        selected: false,
        disabled: false
      }
      state.blocks.push(toAdd)
    }
  }
})


export const { 
  testSlice, 
  newBlock, 
  clearBoard,
  randomizeBoard,
  toggleSorting, 
  toggleDisplay, 
  toggleGrouping
} = MainSlice.actions

export default MainSlice.reducer
