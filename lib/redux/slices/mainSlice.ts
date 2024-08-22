import { Block, BlockTypes } from "@/lib/types";
import { getNum, getType, randomNumbers, splitBlock } from "@/lib/utils";
import { UniqueIdentifier } from "@dnd-kit/core";
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
    selectBlock: (state, action: PayloadAction<{id: UniqueIdentifier}>) => {
      const { id } = action.payload
      state.blocks = state.blocks.map(b => b.id !== id ? b : {...b, selected: !b.selected})
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
          source: "sandbox",
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
        disabled: false,
        source: "sandbox"
      }
      state.blocks.push(toAdd)
    },

    splitSelected: (state) => {
      state.blocks = state.blocks.map(b => !b.selected || b.type === "ONES" ? ({...b, selected: false}) : splitBlock(b)).flat()
    },

    groupSelected: (state, action: PayloadAction<{type: BlockTypes}>) => {
      state.blocks = state.blocks.filter(b => !b.selected).concat([{
        id: randomID(),
        type: action.payload.type,
        selected: false,
        disabled: false,
        source: "sandbox"
      }])
    },

    clearSelected: (state) => {
      state.blocks = state.blocks.map(b => ({...b, selected: false}))
    },

    deleteSelected: (state) => {
      state.blocks = state.blocks.filter(b => !b.selected)
    }
  }
})


export const { 
  selectBlock, 
  newBlock, 
  clearBoard,
  randomizeBoard,
  toggleSorting, 
  toggleDisplay, 
  toggleGrouping,
  splitSelected,
  groupSelected,
  clearSelected,
  deleteSelected
} = MainSlice.actions

export default MainSlice.reducer
