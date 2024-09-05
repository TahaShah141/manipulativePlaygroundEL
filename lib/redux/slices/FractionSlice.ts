import { Fraction } from "@/lib/types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FractionState {
  rows: Fraction[][]
  scale: number
  labels: boolean
}

const initialState: FractionState = {
  rows: Array.from({length: 11}, () => []),
  scale: 1,
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

    insertIntoRow: (state, action: PayloadAction<{fraction: Fraction, index: number}>) => {
      const { fraction, index } = action.payload
      state.rows[index].push(fraction)
    },

    moveIntoRow: (state, action: PayloadAction<{index: number, fraction: Fraction}>) => {
      const { index, fraction } = action.payload

      state.rows = state.rows.map((r, i) => i === index ? [...r, fraction] : r.filter(b => b.id !== fraction.id))
    }
  }
})

export const { 
  clearRows,
  toggleLabels,
  insertIntoRow,
  moveIntoRow
} = FractionSlice.actions

export default FractionSlice.reducer