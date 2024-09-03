import { Block, BlockTypes } from "@/lib/types";
import { getBlocks, getType, randomNumbers, splitBlock } from "@/lib/utils";
import { UniqueIdentifier } from "@dnd-kit/core";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as randomID } from "uuid";

interface BaseTenState {
  blocks: Block[]
  supply: Block[]
  sorting: boolean
  grouping: boolean
  display: boolean
  mode: string
  role?: "text" | "board"
  question?: number | [number, number]
  operator?: "+" | "-" | "*" | "/"
}

const initialState: BaseTenState = {
  blocks: [],
  supply: [],
  sorting: true,
  grouping: true,
  display: true,
  mode: 'sandbox'
}

export const BaseTenSlice = createSlice({
  name: "baseTen",
  initialState,
  reducers: {
    selectBlock: (state, action: PayloadAction<{id: UniqueIdentifier}>) => {
      const { id } = action.payload
      if (state.role === 'text') return;
      state.blocks = state.blocks.map(b => b.id !== id ? b : {...b, selected: !b.selected})
      state.supply = state.supply.map(b => b.id !== id ? b : {...b, selected: !b.selected})
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
        disabled: state.mode === 'advanced maths' || state.mode === 'basic maths',
      }
      
      if (state.mode === 'advanced maths' && state.operator === '/') {
        const divisor = (state.question as [number, number])[1]
        
        if (state.supply.filter(b => b.type === type).length >= divisor) {
          const newSupply = []
          let count = 0
          for (const b of state.supply) {
            if (b.type === type) {
              if (count >= divisor) {
                newSupply.push(b)
              } else count++
            } else newSupply.push(b)
          }
          state.supply = newSupply
          state.blocks.push(toAdd)
        }
      } else {
        state.blocks.push(toAdd)
      }
    },

    splitSelected: (state) => {
      state.blocks = state.blocks.map(b => !b.selected || b.type === "ONES" ? ({...b, selected: false}) : splitBlock(b)).flat()
    },

    splitSelectedSupply: (state) => {
      state.supply = state.supply.map(b => !b.selected || b.type === "ONES" ? ({...b, selected: false}) : splitBlock(b)).flat()
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
      if (state.mode === 'advanced maths' && state.operator === '/') {
        const divisor = (state.question as [number, number])[1]
        const toRemove = state.blocks.filter(b => b.selected)
        state.blocks = state.blocks.filter(b => !b.selected)
        for (const b of toRemove) {
          for (let i = 0; i < divisor; i++) {
            state.supply.push({
              id: randomID(),
              disabled: false,
              selected: false,
              source: 'supply',
              type: b.type
            })
          }
        }
      } else {
        state.blocks = state.blocks.filter(b => !b.selected)
      }
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

        if (state.operator === '*') {
          const num1 = (state.question as [number, number])[0]
          state.supply = getBlocks(num1).map(n => ({
            id: randomID(),
            disabled: false,
            selected: false,
            type: getType(n),
            source: 'supply'
          }))
        }

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
          const num1 = Math.floor(Math.random() * 200) + 1
          const num2 = Math.floor(Math.random() * 9) + 1
          state.question = [num1, num2]
          state.blocks = []

          if (state.operator === '/') {
            state.supply = getBlocks(num1).map(n => ({
              id: randomID(),
              disabled: false,
              selected: false,
              type: getType(n),
              source: 'supply'
            }))
          }
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
  splitSelectedSupply,
  groupSelected,
  clearSelected,
  deleteSelected,
  setMode,
  switchRole,
  nextQuestion
} = BaseTenSlice.actions

export default BaseTenSlice.reducer
