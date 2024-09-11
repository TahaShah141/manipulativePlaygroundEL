import { Fraction } from "@/lib/types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FractionState {
  rows: Fraction[][]
  scale: number
  fullTray: boolean
  labels: boolean
}

const initialState: FractionState = {
  rows: Array.from({length: 12}, () => []),
  scale: 1,
  fullTray: true,
  labels: true
}

export const FractionSlice = createSlice({
  name: "fraction",
  initialState,
  reducers: {
    clearRows: (state) => {
      state.rows = state.rows.map(r => [])
    },

    toggleLabels: (state) => {
      state.labels = !state.labels
    },

    insertIntoRow: (state, action: PayloadAction<{index: number, fraction: Fraction}>) => {
      const { fraction, index } = action.payload
      const rowSum = state.rows[index].reduce((sum, f) => sum + 1/f.type, 0)
      if ((rowSum + 1/fraction.type > state.scale)) return;
      state.rows[index].push(fraction)
    },
    
    moveIntoRow: (state, action: PayloadAction<{index: number, fraction: Fraction}>) => {
      const { index, fraction } = action.payload
      
      const rowSum = state.rows[index].reduce((sum, f) => sum + 1/f.type, 0)
      if ((rowSum + 1/fraction.type > state.scale)) return;
      state.rows = state.rows.map((r, i) => i === index ? [...r, fraction] : r.filter(b => b.id !== fraction.id))
    },

    moveInsideRow: (state, action: PayloadAction<{rowIndex: number, activeId: UniqueIdentifier, overId: UniqueIdentifier}>) => {
      const { rowIndex, activeId, overId } = action.payload
      const currRow = state.rows[rowIndex]
      const activeIndex = currRow.findIndex(f => f.id === activeId)
      const overIndex = currRow.findIndex(f => f.id === overId)

      state.rows[rowIndex] = arrayMove(currRow, activeIndex, overIndex)
    },

    deleteFraction: (state, action: PayloadAction<{fraction: Fraction}>) => {
      const {fraction} = action.payload
      state.rows = state.rows.map(r => r.filter(f => f.id !== fraction.id))
    },

    toggleFullTray: (state) => {
      state.fullTray = !state.fullTray
    },

    toggleScale: (state) => {
      if (state.scale === 2) {
        const newRows: Fraction[][] = []
        for (let i = 0; i < state.rows.length; i++) {
          const row = state.rows[i]
          newRows.push([])
          let sum = 0
          let j = 0
          while (j < row.length && sum + 1/row[j].type <= 1) {
            sum += 1/row[j].type
            newRows[i].push(row[j])
            j++
          }
        }
        state.rows = newRows
      }
      state.scale = state.scale === 1 ? 2 : 1
    }
  }
})

export const { 
  clearRows,
  toggleLabels,
  insertIntoRow,
  moveIntoRow,
  moveInsideRow,
  deleteFraction,
  toggleScale,
  toggleFullTray
} = FractionSlice.actions

export default FractionSlice.reducer