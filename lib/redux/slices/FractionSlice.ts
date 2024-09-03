import { Fraction } from "@/lib/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FractionState {
  rows: Fraction[][]
}

const initialState: FractionState = {
  rows: [[], []],
}

export const FractionSlice = createSlice({
  name: "fraction",
  initialState,
  reducers: {
    addRow: (state) => {
      state.rows.push([])
    },

    insertIntoRow: (state, action: PayloadAction<{fraction: Fraction, index: number}>) => {
      const { fraction, index } = action.payload
      state.rows[index].push(fraction)
    }
  }
})

export const { 
  addRow,
  insertIntoRow
} = FractionSlice.actions

export default FractionSlice.reducer