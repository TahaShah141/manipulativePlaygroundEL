import { Block, BlockTypes } from "@/lib/types";
import { getType, randomNumbers, splitBlock } from "@/lib/utils";
import { UniqueIdentifier } from "@dnd-kit/core";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as randomID } from "uuid"

interface MemoState {
  blocks: Block[]
  sorting: boolean
  grouping: boolean
  display: boolean
  mode: string
  role?: "text" | "board"
  question?: number | [number, number]
  operator?: "+" | "-" | "*" | "/"
}

const initialState: MemoState = {
  blocks: [],
  sorting: true,
  grouping: true,
  display: true,
  mode: 'sandbox'
}

export const MainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    selectBlock: (state, action: PayloadAction<{id: UniqueIdentifier}>) => {
      const { id } = action.payload
      if (state.role === 'text') return;
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
      if (state.role !== 'text') state.blocks = []
    },

    randomizeBoard: (state) => {
      const numbers = randomNumbers()

      state.blocks = numbers.map((num) => {
        return {
          id: randomID(),
          disabled: false,
          selected: false,
          source: state.mode,
          type: getType(num)
        }
      })
    },

    newBlock: (state, action: PayloadAction<{type: BlockTypes, source: string}>) => {
      const { type, source } = action.payload
      const toAdd: Block = {
        id: randomID(),
        type,
        source: state.mode === 'advanced maths' ? 'window' : source,
        selected: false,
        disabled: state.mode === 'advanced maths',
      }
      
      state.blocks.push(toAdd)
    },

    splitSelected: (state) => {
      state.blocks = state.blocks.map(b => !b.selected || b.type === "ONES" ? ({...b, selected: false}) : splitBlock(b)).flat()
    },

    groupSelected: (state, action: PayloadAction<{type: BlockTypes, source: string}>) => {
      const { type, source } = action.payload
      state.blocks = state.blocks.filter(b => !b.selected).concat([{
        id: randomID(),
        type,
        source: state.mode === 'advanced maths' ? 'window' : source,
        selected: false,
        disabled: state.mode === 'advanced maths',
      }])
    },

    clearSelected: (state) => {
      state.blocks = state.blocks.map(b => ({...b, selected: false}))
    },

    deleteSelected: (state) => {
      state.blocks = state.blocks.filter(b => !b.selected)
    },

    setMode: (state, action: PayloadAction<{mode: string}>) => {
      const { mode } = action.payload
      state.mode = mode
      state.blocks = []
      if (mode === 'trivia') {
        state.role = "board"
        state.question = Math.floor(Math.random() * 1000) + 1
      } else if (mode === "basic maths") {
        state.role = "board"
        const num1 = Math.floor(Math.random() * 500) + 1
        const num2 = Math.floor(Math.random() * 500) + 1
        state.question = [Math.max(num1, num2), Math.min(num1, num2)]
        state.operator = "+"
      } else if (mode === 'advanced maths') {
        state.role = 'board'
        const num1 = Math.floor(Math.random() * 100) + 1
        const num2 = Math.floor(Math.random() * 9) + 1
        state.question = [num1, num2]
        state.blocks = []
        state.operator = "*"
      }
    },
    
    switchRole: (state) => {
      const { mode, role } = state
      if (mode === 'trivia') {
        if (role === 'text') {
          state.role = 'board'
          state.blocks = []
          state.question = Math.floor(Math.random() * 1000) + 1
        } else {
          state.role = "text"
          const numbers = randomNumbers()
  
          state.blocks = numbers.map((num) => {
            return {
              id: randomID(),
              disabled: false,
              selected: false,
              source: state.mode,
              type: getType(num)
            }
          })
        }
      } else if (mode === 'basic maths') {
        state.operator = state.operator === '+' ? '-' : '+'
        state.blocks = []
      } else if (mode === 'advanced maths') {
        state.operator = state.operator === '*' ? '/' : '*'
        state.blocks = []
      }
    },

    nextQuestion: (state) => {
      const { role, mode } = state

      if (role === "board") {
        if (mode === 'trivia') {
          state.question = Math.floor(Math.random() * 1000) + 1
          state.blocks = []
        } else if (mode === 'basic maths') {
          const num1 = Math.floor(Math.random() * 500) + 1
          const num2 = Math.floor(Math.random() * 500) + 1
          state.question = [Math.max(num1, num2), Math.min(num1, num2)]
          state.blocks = []
        } else if (mode === 'advanced maths') {
          const num1 = Math.floor(Math.random() * 100) + 1
          const num2 = Math.floor(Math.random() * 9) + 1
          state.question = [num1, num2]
          state.blocks = []
          state.operator = "*"
        }
      } else {
        const numbers = randomNumbers()

        state.blocks = numbers.map((num) => {
          return {
            id: randomID(),
            disabled: false,
            selected: false,
            source: state.mode,
            type: getType(num)
          }
        })
      }
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
  deleteSelected,
  setMode,
  switchRole,
  nextQuestion
} = MainSlice.actions

export default MainSlice.reducer
